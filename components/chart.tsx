// Re-export Recharts components as values with distinct names
export {
  BarChart as RechartsBarChart,
  Bar as RechartsBar,
  LineChart as RechartsLineChart,
  Line as RechartsLine,
  PieChart as RechartsPieChart,
  Pie as RechartsPie,
  Cell as RechartsCell,
  XAxis as RechartsXAxis,
  YAxis as RechartsYAxis,
  CartesianGrid as RechartsCartesianGrid,
  Tooltip as RechartsTooltip,
  Legend as RechartsLegend,
  ResponsiveContainer as RechartsResponsiveContainer,
} from "recharts";

// Import the original Recharts types
import type {
  BarChart as BarChartRecharts,
  Bar as BarRecharts,
  LineChart as LineChartRecharts,
  Line as LineRecharts,
  PieChart as PieChartRecharts,
  Pie as PieRecharts,
  Cell as CellRecharts,
  XAxis as XAxisRecharts,
  YAxis as YAxisRecharts,
  CartesianGrid as CartesianGridRecharts,
  Tooltip as TooltipRecharts,
  Legend as LegendRecharts,
  ResponsiveContainer as ResponsiveContainerRecharts,
} from "recharts";

// Define and export type aliases
export type BarChartType = typeof BarChartRecharts;
export type BarType = typeof BarRecharts;
export type LineChartType = typeof LineChartRecharts;
export type LineType = typeof LineRecharts;
export type PieChartType = typeof PieChartRecharts;
export type PieType = typeof PieRecharts;
export type CellType = typeof CellRecharts;
export type XAxisType = typeof XAxisRecharts;
export type YAxisType = typeof YAxisRecharts;
export type CartesianGridType = typeof CartesianGridRecharts;
export type TooltipType = typeof TooltipRecharts;
export type LegendType = typeof LegendRecharts;
export type ResponsiveContainerType = typeof ResponsiveContainerRecharts;