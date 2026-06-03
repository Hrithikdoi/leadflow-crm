import { useState } from 'react';
import { Edit2, Trash2, ChevronUp, ChevronDown, ChevronsUpDown, Mail, Phone, Building2 } from 'lucide-react';
import { StatusBadge } from './StatusBadge';
import clsx from 'clsx';

const SortIcon = ({ field, currentSort, order }) => {
  if (currentSort !== field) return <ChevronsUpDown className="w-3 h-3 text-gray-300 dark:text-gray-600" />;
  return order === 'asc'
    ? <ChevronUp className="w-3 h-3 text-brand-500" />
    : <ChevronDown className="w-3 h-3 text-brand-500" />;
};

const COLS = [
  { key: 'name', label: 'Lead' },
  { key: 'company', label: 'Company' },
  { key: 'status', label: 'Status' },
  { key: 'createdAt', label: 'Created' },
];

const LeadTable = ({ leads, loading, sortBy, order, onSort, onEdit, onDelete }) => {
  const fmt = (d) => new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

  if (loading) {
    return (
      <div className="space-y-2 p-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-16 bg-gray-100 dark:bg-gray-800 rounded-xl animate-pulse" />
        ))}
      </div>
    );
  }

  if (!leads.length) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="w-16 h-16 rounded-2xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-4">
          <Building2 className="w-8 h-8 text-gray-300 dark:text-gray-600" />
        </div>
        <p className="font-display font-semibold text-gray-700 dark:text-gray-300">No leads found</p>
        <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">Try adjusting your search or filters</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-100 dark:border-gray-800">
            {COLS.map((col) => (
              <th key={col.key} className="px-4 py-3 text-left">
                <button
                  onClick={() => onSort(col.key)}
                  className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors group"
                >
                  {col.label}
                  <SortIcon field={col.key} currentSort={sortBy} order={order} />
                </button>
              </th>
            ))}
            <th className="px-4 py-3 text-right">
              <span className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">Actions</span>
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50 dark:divide-gray-800/50">
          {leads.map((lead) => (
            <tr key={lead._id} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/30 transition-colors group">
              {/* Name & contact */}
              <td className="px-4 py-3.5">
                <div>
                  <p className="font-semibold text-sm text-gray-900 dark:text-white">{lead.name}</p>
                  <div className="flex items-center gap-3 mt-0.5">
                    <span className="flex items-center gap-1 text-xs text-gray-400 dark:text-gray-500">
                      <Mail className="w-3 h-3" />
                      {lead.email}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-gray-400 dark:text-gray-500">
                      <Phone className="w-3 h-3" />
                      {lead.phone}
                    </span>
                  </div>
                </div>
              </td>
              {/* Company */}
              <td className="px-4 py-3.5">
                <span className="text-sm text-gray-600 dark:text-gray-300 font-medium">{lead.company}</span>
              </td>
              {/* Status */}
              <td className="px-4 py-3.5">
                <StatusBadge status={lead.status} />
              </td>
              {/* Date */}
              <td className="px-4 py-3.5">
                <span className="text-xs text-gray-400 dark:text-gray-500 font-mono">{fmt(lead.createdAt)}</span>
              </td>
              {/* Actions */}
              <td className="px-4 py-3.5">
                <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => onEdit(lead)}
                    className="p-1.5 rounded-lg hover:bg-brand-50 dark:hover:bg-brand-500/10 text-gray-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
                    title="Edit lead"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => onDelete(lead)}
                    className="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-500/10 text-gray-400 hover:text-red-500 transition-colors"
                    title="Delete lead"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeadTable;
