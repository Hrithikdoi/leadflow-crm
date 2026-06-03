import clsx from 'clsx';

const STATUS_CONFIG = {
  New: {
    dot: 'bg-blue-500',
    pill: 'bg-blue-50 text-blue-700 ring-blue-200 dark:bg-blue-500/10 dark:text-blue-400 dark:ring-blue-500/20',
  },
  Contacted: {
    dot: 'bg-yellow-500',
    pill: 'bg-yellow-50 text-yellow-700 ring-yellow-200 dark:bg-yellow-500/10 dark:text-yellow-400 dark:ring-yellow-500/20',
  },
  Qualified: {
    dot: 'bg-purple-500',
    pill: 'bg-purple-50 text-purple-700 ring-purple-200 dark:bg-purple-500/10 dark:text-purple-400 dark:ring-purple-500/20',
  },
  Converted: {
    dot: 'bg-emerald-500',
    pill: 'bg-emerald-50 text-emerald-700 ring-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:ring-emerald-500/20',
  },
  Lost: {
    dot: 'bg-red-500',
    pill: 'bg-red-50 text-red-700 ring-red-200 dark:bg-red-500/10 dark:text-red-400 dark:ring-red-500/20',
  },
};

export const StatusBadge = ({ status, size = 'sm' }) => {
  const config = STATUS_CONFIG[status] || STATUS_CONFIG.New;
  return (
    <span className={clsx(
      'inline-flex items-center gap-1.5 font-medium ring-1 ring-inset',
      size === 'sm' ? 'px-2 py-0.5 text-xs rounded-full' : 'px-3 py-1 text-sm rounded-full',
      config.pill
    )}>
      <span className={clsx('w-1.5 h-1.5 rounded-full flex-shrink-0', config.dot)} />
      {status}
    </span>
  );
};

export const STATUS_OPTIONS = ['New', 'Contacted', 'Qualified', 'Converted', 'Lost'];
export { STATUS_CONFIG };
