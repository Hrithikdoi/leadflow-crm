import { Users, TrendingUp, Target, XCircle, UserCheck, Percent } from 'lucide-react';
import clsx from 'clsx';

const CARDS = [
  {
    key: 'total',
    label: 'Total Leads',
    icon: Users,
    gradient: 'from-brand-500 to-indigo-500',
    bg: 'bg-brand-50 dark:bg-brand-500/10',
    text: 'text-brand-600 dark:text-brand-400',
    getValue: (s) => s?.total ?? 0,
  },
  {
    key: 'new',
    label: 'New Leads',
    icon: Target,
    gradient: 'from-sky-400 to-blue-500',
    bg: 'bg-sky-50 dark:bg-sky-500/10',
    text: 'text-sky-600 dark:text-sky-400',
    getValue: (s) => s?.byStatus?.New ?? 0,
  },
  {
    key: 'qualified',
    label: 'Qualified',
    icon: UserCheck,
    gradient: 'from-violet-400 to-purple-500',
    bg: 'bg-violet-50 dark:bg-violet-500/10',
    text: 'text-violet-600 dark:text-violet-400',
    getValue: (s) => s?.byStatus?.Qualified ?? 0,
  },
  {
    key: 'converted',
    label: 'Converted',
    icon: TrendingUp,
    gradient: 'from-emerald-400 to-green-500',
    bg: 'bg-emerald-50 dark:bg-emerald-500/10',
    text: 'text-emerald-600 dark:text-emerald-400',
    getValue: (s) => s?.byStatus?.Converted ?? 0,
  },
  {
    key: 'lost',
    label: 'Lost',
    icon: XCircle,
    gradient: 'from-red-400 to-rose-500',
    bg: 'bg-red-50 dark:bg-red-500/10',
    text: 'text-red-600 dark:text-red-400',
    getValue: (s) => s?.byStatus?.Lost ?? 0,
  },
  {
    key: 'rate',
    label: 'Conversion Rate',
    icon: Percent,
    gradient: 'from-amber-400 to-orange-500',
    bg: 'bg-amber-50 dark:bg-amber-500/10',
    text: 'text-amber-600 dark:text-amber-400',
    getValue: (s) => `${s?.conversionRate ?? 0}%`,
  },
];

const StatCard = ({ card, stats, loading }) => {
  const Icon = card.icon;
  const value = card.getValue(stats);

  return (
    <div className="card p-5 hover:shadow-md transition-shadow duration-200 group">
      <div className="flex items-start justify-between mb-4">
        <div className={clsx('p-2.5 rounded-xl', card.bg)}>
          <Icon className={clsx('w-5 h-5', card.text)} />
        </div>
        <div className={clsx('text-xs font-medium px-2 py-0.5 rounded-full', card.bg, card.text)}>
          Live
        </div>
      </div>
      <div>
        {loading ? (
          <div className="h-8 w-16 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse mb-1" />
        ) : (
          <p className="font-display text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
        )}
        <p className="text-sm text-gray-500 dark:text-gray-400 font-medium mt-0.5">{card.label}</p>
      </div>
    </div>
  );
};

const StatsCards = ({ stats, loading }) => (
  <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-4">
    {CARDS.map((card) => (
      <StatCard key={card.key} card={card} stats={stats} loading={loading} />
    ))}
  </div>
);

export default StatsCards;
