import ButtonIcon from "../../ui/ButtonIcon";
import { HiArrowRightOnRectangle } from "react-icons/hi2";
import useLogout from "./useLogout";
function Logout() {
  const { isPending, logout } = useLogout();
  return (
    <ButtonIcon disabled={isPending} onClick={() => logout()}>
      <HiArrowRightOnRectangle />
    </ButtonIcon>
  );
}

export default Logout;
