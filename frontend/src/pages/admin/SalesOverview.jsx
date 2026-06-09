import { KPICard } from "@/components/admin/KPICard";
import { ChartCard } from "@/components/admin/ChartCard";
import {
  revenueTrend,
  productVsService,
  salesByCategory,
} from "@/constants/mockData";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
} from "recharts";

export default function SalesOverview() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between">
        <h1 className="text-2xl font-bold">Sales Overview</h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          Analyze sales performance, revenue trends, and product vs service
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard title="Total Revenue" value="$124,500" trend={12.5} />
        <KPICard title="Product Revenue" value="$89,000" trend={8.2} />
        <KPICard title="Service Revenue" value="$35,500" trend={15.3} />
        <KPICard title="Total Orders" value="1,450" trend={5.1} />
        <KPICard title="Product Orders" value="1,120" trend={4.2} />
        <KPICard title="Service Bookings" value="330" trend={18.4} />
        <KPICard title="Avg Order Value" value="$85.86" trend={2.1} />
        <KPICard title="Conversion Rate" value="3.4%" trend={0.5} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard title="Revenue Trend (Last 6 Months)">
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={revenueTrend}
                margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="hsl(var(--border))"
                />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
                  dy={10}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
                  tickFormatter={(value) => `$${value / 1000}k`}
                />
                <RechartsTooltip
                  contentStyle={{
                    borderRadius: "6px",
                    border: "1px solid hsl(var(--border))",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#e63946"
                  strokeWidth={3}
                  dot={{
                    r: 4,
                    fill: "#e63946",
                    strokeWidth: 2,
                    stroke: "white",
                  }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        <ChartCard title="Sales by Category">
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={salesByCategory}
                layout="vertical"
                margin={{ top: 5, right: 20, bottom: 5, left: 20 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  horizontal={false}
                  stroke="hsl(var(--border))"
                />
                <XAxis
                  type="number"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
                />
                <YAxis
                  type="category"
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: "hsl(var(--foreground))" }}
                />
                <RechartsTooltip
                  cursor={{ fill: "hsl(var(--muted))", opacity: 0.4 }}
                  contentStyle={{
                    borderRadius: "6px",
                    border: "1px solid hsl(var(--border))",
                  }}
                />
                <Bar
                  dataKey="sales"
                  fill="hsl(var(--chart-2))"
                  radius={[0, 4, 4, 0]}
                  barSize={24}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
      </div>

      <ChartCard title="Product vs Service Breakdown">
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={productVsService}
              margin={{ top: 5, right: 5, bottom: 5, left: -20 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="hsl(var(--border))"
              />
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
                dy={10}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
                tickFormatter={(value) => `$${value / 1000}k`}
              />
              <RechartsTooltip
                cursor={{ fill: "hsl(var(--muted))", opacity: 0.4 }}
                contentStyle={{
                  borderRadius: "6px",
                  border: "1px solid hsl(var(--border))",
                }}
              />
              <Legend iconType="circle" wrapperStyle={{ fontSize: "12px" }} />
              <Bar
                dataKey="product"
                name="Products"
                fill="#E60000"
                radius={[4, 4, 0, 0]}
              />
              <Bar
                dataKey="service"
                name="Services"
                fill="#6b7280"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </ChartCard>
    </div>
  );
}
