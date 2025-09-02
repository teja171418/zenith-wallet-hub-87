import { Card } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
interface ExpenseChartProps {
  type: 'pie' | 'bar';
  data: any[];
  title: string;
}
const ExpenseChart = ({
  type,
  data,
  title
}: ExpenseChartProps) => {
  const COLORS = ['hsl(258 90% 66%)', 'hsl(142 76% 36%)', 'hsl(38 92% 50%)', 'hsl(0 84% 60%)', 'hsl(267 84% 56%)'];
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent
  }: any) => {
    if (percent < 0.05) return null; // Don't show label for slices less than 5%

    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    return <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central" fontSize="12" fontWeight="bold">
        {`${(percent * 100).toFixed(0)}%`}
      </text>;
  };
  return <Card className="glass-card animate-fade-in">
      <div className="p-6 bg-slate-50">
        <h3 className="text-lg font-semibold mb-4 text-card-foreground">{title}</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            {type === 'pie' ? <PieChart>
                <Pie data={data} cx="50%" cy="50%" labelLine={false} label={renderCustomizedLabel} outerRadius={80} fill="#8884d8" dataKey="value">
                  {data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                </Pie>
                <Tooltip formatter={(value: any) => [`₹${value.toLocaleString()}`, 'Amount']} contentStyle={{
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              border: 'none',
              borderRadius: '12px',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)'
            }} />
              </PieChart> : <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                <XAxis dataKey="name" tick={{
              fontSize: 12,
              fill: 'hsl(var(--muted-foreground))'
            }} />
                <YAxis tick={{
              fontSize: 12,
              fill: 'hsl(var(--muted-foreground))'
            }} tickFormatter={value => `₹${value}`} />
                <Tooltip formatter={(value: any) => [`₹${value.toLocaleString()}`, 'Amount']} contentStyle={{
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              border: 'none',
              borderRadius: '12px',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)'
            }} />
                <Legend />
                <Bar dataKey="value" fill="hsl(258 90% 66%)" radius={[4, 4, 0, 0]} />
              </BarChart>}
          </ResponsiveContainer>
        </div>
      </div>
    </Card>;
};
export default ExpenseChart;