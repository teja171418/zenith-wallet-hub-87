import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import ExpenseChart from "@/components/ExpenseChart";
import StatsCard from "@/components/StatsCard";
import { TrendingUp, TrendingDown, Calendar, PieChart, BarChart3, Target, Wallet, Users, Download, Filter } from "lucide-react";
interface AnalyticsProps {
  mode?: 'group' | 'personal';
}
const Analytics = ({
  mode = 'group'
}: AnalyticsProps) => {
  const [timeRange, setTimeRange] = useState('thisMonth');
  const [chartType, setChartType] = useState<'pie' | 'bar' | 'line'>('pie');

  // Analytics data
  const analyticsStats = {
    group: [{
      title: "Group Efficiency",
      value: "92%",
      icon: Target,
      trend: {
        value: 8.2,
        label: "vs last month"
      },
      color: 'success' as const
    }, {
      title: "Avg. Settlement Time",
      value: "2.3 days",
      icon: Calendar,
      trend: {
        value: -15.4,
        label: "faster than before"
      },
      color: 'primary' as const
    }, {
      title: "Most Active Spender",
      value: "Rahul",
      icon: Users,
      subtitle: "₹18,400 this month"
    }, {
      title: "Largest Expense",
      value: "₹8,400",
      icon: TrendingUp,
      subtitle: "Goa Trip - Travel"
    }],
    personal: [{
      title: "Spending Efficiency",
      value: "87%",
      icon: Target,
      trend: {
        value: 12.8,
        label: "improvement"
      },
      color: 'success' as const
    }, {
      title: "Daily Average",
      value: "₹956",
      icon: Calendar,
      trend: {
        value: -8.2,
        label: "vs last month"
      },
      color: 'success' as const
    }, {
      title: "Top Category",
      value: "Food",
      icon: PieChart,
      subtitle: "₹8,200 this month"
    }, {
      title: "Savings Rate",
      value: "68%",
      icon: Wallet,
      trend: {
        value: 5.4,
        label: "vs target"
      },
      color: 'primary' as const
    }]
  };
  const categoryTrends = {
    group: [{
      name: 'Food & Dining',
      current: 12400,
      previous: 10800,
      change: 14.8,
      color: '#10b981'
    }, {
      name: 'Travel',
      current: 8900,
      previous: 12200,
      change: -27.0,
      color: '#3b82f6'
    }, {
      name: 'Entertainment',
      current: 4200,
      previous: 3800,
      change: 10.5,
      color: '#8b5cf6'
    }, {
      name: 'Housing',
      current: 15000,
      previous: 15000,
      change: 0,
      color: '#ef4444'
    }, {
      name: 'Shopping',
      current: 3200,
      previous: 4100,
      change: -22.0,
      color: '#f59e0b'
    }],
    personal: [{
      name: 'Food & Dining',
      current: 8200,
      previous: 9100,
      change: -9.9,
      color: '#10b981'
    }, {
      name: 'Transportation',
      current: 3400,
      previous: 4200,
      change: -19.0,
      color: '#3b82f6'
    }, {
      name: 'Entertainment',
      current: 2100,
      previous: 2800,
      change: -25.0,
      color: '#8b5cf6'
    }, {
      name: 'Shopping',
      current: 4800,
      previous: 3900,
      change: 23.1,
      color: '#f59e0b'
    }, {
      name: 'Bills & Utilities',
      current: 6200,
      previous: 6800,
      change: -8.8,
      color: '#ef4444'
    }]
  };
  const chartData = {
    group: [{
      name: 'Food & Dining',
      value: 12400,
      color: '#10b981'
    }, {
      name: 'Travel & Transport',
      value: 8900,
      color: '#3b82f6'
    }, {
      name: 'Entertainment',
      value: 4200,
      color: '#8b5cf6'
    }, {
      name: 'Housing',
      value: 15000,
      color: '#ef4444'
    }, {
      name: 'Shopping',
      value: 3200,
      color: '#f59e0b'
    }],
    personal: [{
      name: 'Food & Dining',
      value: 8200,
      color: '#10b981'
    }, {
      name: 'Transportation',
      value: 3400,
      color: '#3b82f6'
    }, {
      name: 'Entertainment',
      value: 2100,
      color: '#8b5cf6'
    }, {
      name: 'Shopping',
      value: 4800,
      color: '#f59e0b'
    }, {
      name: 'Bills & Utilities',
      value: 6200,
      color: '#ef4444'
    }]
  };
  const monthlyData = [{
    month: 'Aug',
    income: 45000,
    expense: 32000,
    savings: 13000
  }, {
    month: 'Sep',
    income: 48000,
    expense: 29000,
    savings: 19000
  }, {
    month: 'Oct',
    income: 45000,
    expense: 31000,
    savings: 14000
  }, {
    month: 'Nov',
    income: 52000,
    expense: 28000,
    savings: 24000
  }, {
    month: 'Dec',
    income: 65000,
    expense: 35000,
    savings: 30000
  }, {
    month: 'Jan',
    income: 65000,
    expense: 28680,
    savings: 36320
  }];
  const currentStats = analyticsStats[mode];
  const currentTrends = categoryTrends[mode];
  const currentChart = chartData[mode];
  return <div className="space-y-8 py-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            {mode === 'group' ? 'Group Analytics' : 'Personal Analytics'}
          </h1>
          <p className="text-muted-foreground">
            Detailed insights into your {mode === 'group' ? 'group spending' : 'financial'} patterns
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Time Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="thisWeek">This Week</SelectItem>
              <SelectItem value="thisMonth">This Month</SelectItem>
              <SelectItem value="last3Months">Last 3 Months</SelectItem>
              <SelectItem value="thisYear">This Year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm" className="text-gray-950">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {currentStats.map((stat, index) => <StatsCard key={index} {...stat} />)}
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview" className="text-zinc-950">Overview</TabsTrigger>
          <TabsTrigger value="trends" className="text-slate-950">Trends</TabsTrigger>
          <TabsTrigger value="categories" className="text-zinc-950">Categories</TabsTrigger>
          <TabsTrigger value="insights" className="text-zinc-950">Insights</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Chart Controls */}
            <Card className="glass-card">
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">Expense Distribution</h3>
                  <div className="flex gap-2">
                    <Button variant={chartType === 'pie' ? 'default' : 'outline'} size="sm" onClick={() => setChartType('pie')}>
                      <PieChart className="w-4 h-4" />
                    </Button>
                    <Button variant={chartType === 'bar' ? 'default' : 'outline'} size="sm" onClick={() => setChartType('bar')}>
                      <BarChart3 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <ExpenseChart type="bar" data={currentChart} title="Expense Distribution" />
              </div>
            </Card>

            {/* Monthly Trends */}
            <Card className="glass-card">
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-4">Monthly Trends</h3>
                <ExpenseChart type="bar" data={monthlyData} title="Income vs Expenses" />
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="trends" className="mt-6">
          <div className="grid grid-cols-1 gap-6">
            <Card className="glass-card">
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-6">Category Trends</h3>
                <div className="space-y-4">
                  {currentTrends.map((trend, index) => <div key={index} className="flex items-center justify-between p-4 rounded-lg border">
                      <div className="flex items-center gap-4">
                        <div className="w-4 h-4 rounded-full" style={{
                      backgroundColor: trend.color
                    }} />
                        <div>
                          <p className="font-medium">{trend.name}</p>
                          <p className="text-sm text-muted-foreground">₹{trend.current.toLocaleString()}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`flex items-center gap-1 ${trend.change > 0 ? 'text-destructive' : 'text-success'}`}>
                          {trend.change > 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                          <span className="font-medium">
                            {Math.abs(trend.change)}%
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground">vs last month</p>
                      </div>
                    </div>)}
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="categories" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentChart.map((category, index) => <Card key={index} className="glass-card hover-scale">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-semibold">{category.name}</h4>
                    <div className="w-6 h-6 rounded-full" style={{
                  backgroundColor: category.color
                }} />
                  </div>
                  <div className="space-y-2">
                    <p className="text-2xl font-bold">₹{category.value.toLocaleString()}</p>
                    <div className="w-full bg-secondary h-2 rounded-full">
                      <div className="h-full rounded-full transition-all duration-500" style={{
                    backgroundColor: category.color,
                    width: `${category.value / Math.max(...currentChart.map(c => c.value)) * 100}%`
                  }} />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {(category.value / currentChart.reduce((sum, c) => sum + c.value, 0) * 100).toFixed(1)}% of total
                    </p>
                  </div>
                </div>
              </Card>)}
          </div>
        </TabsContent>

        <TabsContent value="insights" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="glass-card">
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-4">Smart Insights 🧠</h3>
                <div className="space-y-4">
                  <div className="p-4 bg-success/10 rounded-lg border border-success/20">
                    <h4 className="font-medium text-success mb-1">Best Performance 📈</h4>
                    <p className="text-sm text-muted-foreground">
                      {mode === 'group' ? 'Your group settles expenses 40% faster than average' : 'Transportation costs reduced by 35% this quarter'}
                    </p>
                  </div>
                  <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
                    <h4 className="font-medium text-primary mb-1">Optimization Tip 💡</h4>
                    <p className="text-sm text-muted-foreground">
                      {mode === 'group' ? 'Consider using recurring payments for regular group expenses' : 'Set up automatic transfers to reach savings goal faster'}
                    </p>
                  </div>
                  <div className="p-4 bg-warning/10 rounded-lg border border-warning/20">
                    <h4 className="font-medium text-warning mb-1">Watch Out ⚠️</h4>
                    <p className="text-sm text-muted-foreground">
                      {mode === 'group' ? 'Food expenses increased 15% - discuss budget limits' : 'Shopping expenses above average - review recent purchases'}
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="glass-card">
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-4">Goals & Targets 🎯</h3>
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Monthly Budget</span>
                      <span className="text-sm">₹28,680 / ₹35,000</span>
                    </div>
                    <div className="w-full bg-secondary h-2 rounded-full">
                      <div className="bg-success h-full rounded-full" style={{
                      width: '82%'
                    }} />
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Savings Goal</span>
                      <span className="text-sm">₹31,000 / ₹40,000</span>
                    </div>
                    <div className="w-full bg-secondary h-2 rounded-full">
                      <div className="bg-primary h-full rounded-full" style={{
                      width: '78%'
                    }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Investment Target</span>
                      <span className="text-sm">₹18,000 / ₹25,000</span>
                    </div>
                    <div className="w-full bg-secondary h-2 rounded-full">
                      <div className="bg-blue-500 h-full rounded-full" style={{
                      width: '72%'
                    }} />
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>;
};
export default Analytics;