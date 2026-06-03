import { useRef, useEffect } from 'react';
import { Search, X, Filter } from 'lucide-react';
import { STATUS_OPTIONS } from './StatusBadge';
import clsx from 'clsx';

const SearchBar = ({ search, status, onSearchChange, onStatusChange }) => {
  const inputRef = useRef(null);

  const clearSearch = () => {
    onSearchChange('');
    inputRef.current?.focus();
  };

  return (
    <div className="flex flex-col sm:flex-row gap-3">
      {/* Search input */}
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          ref={inputRef}
          type="text"
          placeholder="Search by name, email, or company..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="input-field pl-9 pr-8"
        />
        {search && (
          <button
            onClick={clearSearch}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 p-0.5 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-400 transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Status filter */}
      <div className="relative">
        <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
        <select
          value={status}
          onChange={(e) => onStatusChange(e.target.value)}
          className="input-field pl-9 pr-8 sm:w-44 appearance-none cursor-pointer"
        >
          <option value="">All Statuses</option>
          {STATUS_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>
    </div>
  );
};

export default SearchBar;
