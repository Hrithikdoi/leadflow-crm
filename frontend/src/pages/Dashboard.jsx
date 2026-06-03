import { useNavigate } from 'react-router-dom';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend, LineChart, Line, Area, AreaChart,
} from 'recharts';
import { useStats } from '../hooks/useLeads';
import StatsCards from '../components/StatsCards';
import { StatusBadge } from '../components/StatusBadge';
import { ArrowRight, RefreshCw } from 'lucide-react';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const STATUS_COLORS = {
  New: '#3b82f6',
  Contacted: '#f59e0b',
  Qualified: '#8b5cf6',
  Converted: '#10b981',
  Lost: '#ef4444',
};

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl p-3 shadow-lg text-xs">
      <p className="font-semibold text-gray-700 dark:text-gray-300 mb-1">{label}</p>
      {payload.map((p) => (
        <p key={p.name} style={{ color: p.color }}>{p.name}: <span className="font-bold">{p.value}</span></p>
      ))}
    </div>
  );
};

const Dashboard = () => {
  const { stats, loading, refresh } = useStats();
  const navigate = useNavigate();

  const pieData = stats
    ? Object.entries(stats.byStatus)
        .filter(([, v]) => v > 0)
        .map(([name, value]) => ({ name, value }))
    : [];

  const barData = stats
    ? Object.entries(stats.byStatus).map(([name, value]) => ({ name, value, fill: STATUS_COLORS[name] }))
    : [];

  const lineData = stats?.monthlyLeads?.map((m) => ({
    name: MONTHS[m._id.month - 1],
    leads: m.count,
  })) || [];

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">Track and manage your leads pipeline</p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={refresh} className="btn-secondary">
            <RefreshCw className="w-4 h-4" />
            <span className="hidden sm:inline">Refresh</span>
          </button>
          <button onClick={() => navigate('/leads')} className="btn-primary">
            View All Leads
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Stats */}
      <StatsCards stats={stats} loading={loading} />

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Bar chart */}
        <div className="card p-5 lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-display font-bold text-gray-900 dark:text-white text-sm">Leads by Status</h3>
              <p className="text-xs text-gray-400 dark:text-gray-500">Distribution overview</p>
            </div>
          </div>
          {loading ? (
            <div className="h-48 bg-gray-100 dark:bg-gray-800 rounded-xl animate-pulse" />
          ) : (
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={barData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" className="dark:[stroke:#1f2937]" />
                <XAxis dataKey="name" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} allowDecimals={false} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="value" name="Leads" radius={[6, 6, 0, 0]}>
                  {barData.map((entry, i) => (
                    <Cell key={i} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Pie chart */}
        <div className="card p-5">
          <div className="mb-4">
            <h3 className="font-display font-bold text-gray-900 dark:text-white text-sm">Lead Mix</h3>
            <p className="text-xs text-gray-400 dark:text-gray-500">Status breakdown</p>
          </div>
          {loading ? (
            <div className="h-48 bg-gray-100 dark:bg-gray-800 rounded-xl animate-pulse" />
          ) : pieData.length ? (
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="45%"
                  innerRadius={55}
                  outerRadius={80}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {pieData.map((entry, i) => (
                    <Cell key={i} fill={STATUS_COLORS[entry.name]} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend
                  iconType="circle"
                  iconSize={8}
                  formatter={(value) => <span className="text-xs text-gray-500 dark:text-gray-400">{value}</span>}
                />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-48 flex items-center justify-center text-sm text-gray-400">No data yet</div>
          )}
        </div>
      </div>

      {/* Monthly trend */}
      <div className="card p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-display font-bold text-gray-900 dark:text-white text-sm">Monthly Trend</h3>
            <p className="text-xs text-gray-400 dark:text-gray-500">Lead acquisition over last 6 months</p>
          </div>
        </div>
        {loading ? (
          <div className="h-40 bg-gray-100 dark:bg-gray-800 rounded-xl animate-pulse" />
        ) : lineData.length ? (
          <ResponsiveContainer width="100%" height={160}>
            <AreaChart data={lineData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="leadGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" className="dark:[stroke:#1f2937]" />
              <XAxis dataKey="name" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} allowDecimals={false} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="leads" name="Leads" stroke="#6366f1" strokeWidth={2} fill="url(#leadGrad)" dot={{ r: 4, fill: '#6366f1' }} />
            </AreaChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-40 flex items-center justify-center text-sm text-gray-400">No monthly data available</div>
        )}
      </div>

      {/* Conversion rate callout */}
      {stats && (
        <div className="card p-5 bg-gradient-to-r from-brand-600 to-purple-600 border-0">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-brand-100 text-sm font-medium">Overall Conversion Rate</p>
              <p className="font-display text-4xl font-bold text-white mt-1">{stats.conversionRate}%</p>
              <p className="text-brand-200 text-xs mt-1">
                {stats.byStatus.Converted} converted out of {stats.total} total leads
              </p>
            </div>
            <div className="text-white/20 font-display text-8xl font-bold select-none">%</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
