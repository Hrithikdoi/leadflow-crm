import { useState, useEffect, useCallback } from 'react';
import { leadService } from '../services/leadService';
import toast from 'react-hot-toast';

export const useLeads = () => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({ total: 0, page: 1, limit: 10, pages: 1 });
  const [filters, setFilters] = useState({ status: '', search: '', sortBy: 'createdAt', order: 'desc' });
  const [page, setPage] = useState(1);

  const fetchLeads = useCallback(async () => {
    setLoading(true);
    try {
      const params = { page, limit: 10, ...filters };
      let res;
      if (filters.search?.trim()) {
        res = await leadService.search({ q: filters.search, status: filters.status, page, limit: 10 });
      } else {
        res = await leadService.getAll(params);
      }
      setLeads(res.data.data);
      setPagination(res.data.pagination);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  }, [page, filters]);

  useEffect(() => {
    fetchLeads();
  }, [fetchLeads]);

  const createLead = async (data) => {
    console.log('[useLeads] createLead called with data:', data);
    try {
      console.log('[useLeads] Calling leadService.create...');
      const res = await leadService.create(data);
      console.log('[useLeads] Create response:', res);
      toast.success('Lead created successfully!');
      console.log('[useLeads] Refreshing leads list...');
      fetchLeads();
      return res.data.data;
    } catch (err) {
      console.error('[useLeads] createLead error:', err);
      throw err;
    }
  };

  const updateLead = async (id, data) => {
    const res = await leadService.update(id, data);
    toast.success('Lead updated successfully!');
    fetchLeads();
    return res.data.data;
  };

  const deleteLead = async (id) => {
    await leadService.delete(id);
    toast.success('Lead deleted successfully!');
    fetchLeads();
  };

  const updateFilters = (newFilters) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
    setPage(1);
  };

  return {
    leads,
    loading,
    pagination,
    filters,
    page,
    setPage,
    updateFilters,
    createLead,
    updateLead,
    deleteLead,
    refresh: fetchLeads,
  };
};

export const useStats = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchStats = useCallback(async () => {
    setLoading(true);
    try {
      const res = await leadService.getStats();
      setStats(res.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  return { stats, loading, refresh: fetchStats };
};
