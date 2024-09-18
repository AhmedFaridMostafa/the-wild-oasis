import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");
  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }
  return data;
}

export async function createEditCabin(newCabin, id, oldImage) {
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);
  const isDuplicate = newCabin?.duplicate;
  const imageName = isDuplicate
    ? newCabin.image.split("/").pop()
    : `${Math.random()}-${newCabin.image.name}`.replaceAll("/", "");

  const imagePath = hasImagePath
    ? isDuplicate
      ? `${supabaseUrl}/storage/v1/object/public/cabin-images/copyOf${imageName}`
      : newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  if (hasImagePath && isDuplicate) {
    const error = await duplicateImage(imageName, `copyOf${imageName}`);
    if (error) {
      console.error(error);
      throw new Error(error);
    }
    delete newCabin.duplicate;
  }

  let query = supabase.from("cabins");
  if (!id) {
    query = query.insert([{ ...newCabin, image: imagePath }]);
  } else {
    query = query.update({ ...newCabin, image: imagePath }).eq("id", id);
  }

  const { data, error } = await query.select().single();
  if (error) {
    console.error(error);
    throw new Error("Cabins could not be created");
  }

  if (!hasImagePath) {
    const { error: uploadError } = await supabase.storage
      .from("cabin-images")
      .upload(imageName, newCabin.image);

    if (uploadError) {
      if (!id) await supabase.from("cabins").delete().eq("id", data.id);
      console.error(uploadError);
      throw new Error(
        "Cabins Image could not be uploaded, and the cabin was not created"
      );
    }
    if (oldImage && oldImage !== imagePath)
      await deleteImageFromStorage(oldImage);
  }

  return data;
}

export async function deleteCabin(id) {
  const { data: cabin } = await supabase
    .from("cabins")
    .select("image")
    .eq("id", id)
    .single();

  const { data, error } = await supabase.from("cabins").delete().eq("id", id);
  if (error) {
    console.error(error);
    throw new Error("Cabin could not be deleted");
  }

  if (cabin?.image) {
    await deleteImageFromStorage(cabin.image);
  }

  return data;
}

async function deleteImageFromStorage(imageURL) {
  const imagePath = imageURL.split("/").pop();
  const { error: deleteError } = await supabase.storage
    .from("cabin-images")
    .remove([imagePath]);

  if (deleteError) {
    console.error("Error deleting image:", deleteError.message);
    throw new Error("Cabin image could not be deleted");
  }
}

async function duplicateImage(originalImagePath, newImageName) {
  // Step 1: Download the original image
  const { data: downloadData, error: downloadError } = await supabase.storage
    .from("cabin-images")
    .download(originalImagePath);

  if (downloadError) {
    return `Failed to download image: ${downloadError.message}`;
  }

  // Step 2: Upload the new image with a different name
  const { error: uploadError } = await supabase.storage
    .from("cabin-images")
    .upload(newImageName, downloadData);

  if (uploadError) {
    return `Failed to upload duplicated image: ${uploadError.message}`;
  }
}
