import styled from "styled-components";
import DashboardBox from "./DashboardBox";
import Heading from "../../ui/Heading";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useDarkMode } from "../../context/DarkModeContext";
import { useMemo } from "react";
import { eachDayOfInterval, format, isSameDay, subDays } from "date-fns";
const StyledSalesChart = styled(DashboardBox)`
  grid-column: 1 / -1;
  height: fit-content;
  /* Hack to change grid line colors */
  & .recharts-cartesian-grid-horizontal line,
  & .recharts-cartesian-grid-vertical line {
    stroke: var(--color-grey-300);
  }
`;

function SalesChart({ bookings, numDays }) {
  const { isDarkMode } = useDarkMode();
  const colors = useMemo(
    () =>
      isDarkMode
        ? {
            totalSales: { stroke: "#4f46e5", fill: "#4f46e5" },
            extrasSales: { stroke: "#22c55e", fill: "#22c55e" },
            text: "#e5e7eb",
            background: "#18212f",
          }
        : {
            totalSales: { stroke: "#4f46e5", fill: "#c7d2fe" },
            extrasSales: { stroke: "#16a34a", fill: "#dcfce7" },
            text: "#374151",
            background: "#fff",
          },
    [isDarkMode]
  );
  const allDays = eachDayOfInterval({
    start: subDays(new Date(), numDays - 1),
    end: new Date(),
  });
  const data = allDays.map((date) => {
    return {
      label: format(date, "MMM dd"),
      totalSales: bookings
        .filter((booking) => isSameDay(date, new Date(booking.created_at)))
        .reduce((acc, cur) => acc + cur.totalPrice, 0),
      extrasSales: bookings
        .filter((booking) => isSameDay(date, new Date(booking.created_at)))
        .reduce((acc, cur) => acc + cur.extrasPrice, 0),
    };
  });
  return (
    <StyledSalesChart>
      <Heading as="h2">
        Sales from {format(allDays.at(0), "MMM dd yyyy")} &mdash;{" "}
        {format(allDays.at(-1), "MMM dd yyyy")}
      </Heading>
      <ResponsiveContainer height={300} width="100%">
        <AreaChart data={data}>
          <XAxis
            dataKey="label"
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
          />
          <YAxis
            unit="$"
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
          />
          <CartesianGrid strokeDasharray="3" />
          <Tooltip contentStyle={{ backgroundColor: colors.background }} />
          <Area
            dataKey="totalSales"
            name="Total sales"
            unit="$"
            type="monotone"
            strokeWidth={2}
            stroke={colors.totalSales.stroke}
            fill={colors.totalSales.fill}
          />
          <Area
            dataKey="extrasSales"
            name="Extras sales"
            unit="$"
            type="monotone"
            strokeWidth={2}
            stroke={colors.extrasSales.stroke}
            fill={colors.extrasSales.fill}
          />
        </AreaChart>
      </ResponsiveContainer>
    </StyledSalesChart>
  );
}

export default SalesChart;
