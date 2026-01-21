'use client';
import { useState } from 'react';
import { Search, X } from 'lucide-react';
import { cn } from '@/lib/utils';

export function SearchBar({ 
  placeholder = 'Search...', 
  onSearch,
  className 
}) {
  const [query, setQuery] = useState('');
  
  const handleSearch = (value) => {
    setQuery(value);
    onSearch?.(value);
  };
  
  const clearSearch = () => {
    setQuery('');
    onSearch?.('');
  };
  
  return (
    <div className={cn('relative', className)}>
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
        <input
          type="text"
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder={placeholder}
          className="glass-input w-full pl-12 pr-12"
        />
        {query && (
          <button
            onClick={clearSearch}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
}