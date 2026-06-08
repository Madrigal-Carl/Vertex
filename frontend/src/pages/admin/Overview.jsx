import { KPICard } from "@/components/admin/KPICard";
import { ChartCard } from "@/components/admin/ChartCard";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { StarRating } from "@/components/admin/StarRating";
import {
  kpiData,
  revenueTrend,
  productVsService,
  recentOrders,
  lowStockProducts,
  recentReviews,
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
import {
  LuArrowRight as ArrowRight,
  LuEye as Eye,
  LuTriangleAlert as AlertTriangle,
} from "react-icons/lu";
import { Link } from "react-router-dom";

export default function Overview() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Welcome back, Admin. Here's what's happening today.
          </p>
        </div>
        <p className="text-xs text-muted-foreground hidden sm:block">
          Last updated: Today, 10:42 AM
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3">
        <KPICard
          title="Total Revenue"
          value={`$${kpiData.totalRevenue.toLocaleString()}`}
          trend={12.5}
          trendLabel="vs last month"
        />
        <KPICard
          title="Product Sales"
          value={`$${kpiData.productSales.toLocaleString()}`}
          trend={8.2}
          trendLabel="vs last month"
        />
        <KPICard
          title="Service Sales"
          value={`$${kpiData.serviceSales.toLocaleString()}`}
          trend={15.3}
          trendLabel="vs last month"
        />
        <KPICard
          title="Total Orders"
          value={kpiData.totalOrders.toLocaleString()}
          trend={5.1}
          trendLabel="vs last month"
        />
        <KPICard
          title="Pending Orders"
          value={kpiData.pendingOrders}
          trend={-2.4}
          trendLabel="needs attention"
        />
        <KPICard
          title="Total Customers"
          value={kpiData.totalCustomers.toLocaleString()}
          trend={10.8}
          trendLabel="vs last month"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <ChartCard
          title="Revenue Trend"
          subtitle="Monthly revenue over the last 6 months"
          className="lg:col-span-2"
        >
          <div className="h-[240px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={revenueTrend}
                margin={{ top: 4, right: 8, bottom: 0, left: -8 }}
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
                  tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                  dy={8}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                  tickFormatter={(v) => `$${v / 1000}k`}
                  width={40}
                />
                <RechartsTooltip
                  contentStyle={{
                    borderRadius: "6px",
                    border: "1px solid hsl(var(--border))",
                    fontSize: "12px",
                    boxShadow: "0 4px 6px -1px rgba(0,0,0,0.08)",
                  }}
                  formatter={(v) => [`$${v.toLocaleString()}`, "Revenue"]}
                />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#E60000"
                  strokeWidth={2.5}
                  dot={false}
                  activeDot={{
                    r: 4,
                    fill: "#E60000",
                    strokeWidth: 2,
                    stroke: "white",
                  }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        <ChartCard
          title="Products vs Services"
          subtitle="Revenue split by category"
        >
          <div className="h-[240px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={productVsService}
                margin={{ top: 4, right: 4, bottom: 0, left: -16 }}
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
                  tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                  dy={8}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                  tickFormatter={(v) => `$${v / 1000}k`}
                  width={36}
                />
                <RechartsTooltip
                  cursor={{ fill: "hsl(var(--muted))", opacity: 0.5 }}
                  contentStyle={{
                    borderRadius: "6px",
                    border: "1px solid hsl(var(--border))",
                    fontSize: "12px",
                  }}
                />
                <Legend
                  iconType="circle"
                  iconSize={6}
                  wrapperStyle={{ fontSize: "11px", paddingTop: "8px" }}
                />
                <Bar
                  dataKey="product"
                  name="Products"
                  fill="#111"
                  radius={[3, 3, 0, 0]}
                />
                <Bar
                  dataKey="service"
                  name="Services"
                  fill="#ccc"
                  radius={[3, 3, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 bg-card border border-border rounded-[6px] overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-border">
            <div>
              <p className="text-sm font-semibold">Recent Orders</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                Latest 5 orders placed
              </p>
            </div>
            <Link to="/admin/orders">
              <button className="inline-flex items-center justify-center gap-1 text-xs font-medium cursor-pointer border border-transparent bg-transparent rounded-[4px] h-7 px-2 text-[#E60000] hover:bg-red-50">
                View all <ArrowRight className="w-3 h-3" />
              </button>
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="border-b border-border bg-secondary/40">
                  <th className="px-5 py-2.5 text-xs font-semibold text-muted-foreground">
                    Order ID
                  </th>
                  <th className="px-5 py-2.5 text-xs font-semibold text-muted-foreground">
                    Customer
                  </th>
                  <th className="px-5 py-2.5 text-xs font-semibold text-muted-foreground">
                    Date
                  </th>
                  <th className="px-5 py-2.5 text-xs font-semibold text-muted-foreground">
                    Status
                  </th>
                  <th className="px-5 py-2.5 text-xs font-semibold text-muted-foreground text-right">
                    Amount
                  </th>
                  <th className="px-5 py-2.5 w-12"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {recentOrders.map((order) => (
                  <tr
                    key={order.id}
                    className="hover:bg-secondary/30 transition-colors group"
                  >
                    <td className="px-5 py-3 font-medium text-[#E60000] text-sm">
                      {order.id}
                    </td>
                    <td className="px-5 py-3 text-sm">{order.customer}</td>
                    <td className="px-5 py-3 text-xs text-muted-foreground">
                      {order.date}
                    </td>
                    <td className="px-5 py-3">
                      <StatusBadge status={order.status} />
                    </td>
                    <td className="px-5 py-3 text-right font-semibold text-sm">
                      ${order.amount.toFixed(2)}
                    </td>
                    <td className="px-5 py-3">
                      <Link
                        to="/admin/orders"
                        className="inline-flex items-center justify-center h-7 w-7 rounded-[4px] border border-transparent bg-transparent hover:bg-secondary cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Eye className="w-3.5 h-3.5 text-muted-foreground" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-card border border-border rounded-[6px] overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-border">
              <div>
                <p className="text-sm font-semibold">Low Stock Alerts</p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {lowStockProducts.length} products need restocking
                </p>
              </div>
              <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0" />
            </div>
            <div className="divide-y divide-border">
              {lowStockProducts.map((product) => (
                <div
                  key={product.id}
                  className="flex items-center justify-between px-5 py-3 hover:bg-secondary/20 transition-colors"
                >
                  <div>
                    <p className="text-sm font-medium">{product.name}</p>
                    <p className="text-[11px] text-muted-foreground mt-0.5">
                      {product.id}
                    </p>
                  </div>
                  <span className="text-xs font-bold bg-red-50 text-[#E60000] ring-1 ring-red-200 px-2 py-0.5 rounded-full shrink-0">
                    {product.stock} left
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-card border border-border rounded-[6px] overflow-hidden">
            <div className="px-5 py-4 border-b border-border">
              <p className="text-sm font-semibold">Recent Reviews</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                Latest customer feedback
              </p>
            </div>
            <div className="divide-y divide-border">
              {recentReviews.map((review) => (
                <div
                  key={review.id}
                  className="px-5 py-3 hover:bg-secondary/20 transition-colors"
                >
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <p className="text-sm font-medium leading-tight">
                      {review.product}
                    </p>
                    <StarRating rating={review.rating} />
                  </div>
                  <p className="text-[11px] text-muted-foreground">
                    by {review.customer} · {review.date}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
