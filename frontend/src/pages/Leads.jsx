import { useState, useCallback } from 'react';
import { Plus, Download } from 'lucide-react';
import { useLeads } from '../hooks/useLeads';
import LeadTable from '../components/LeadTable';
import LeadFormModal from '../components/LeadFormModal';
import DeleteModal from '../components/DeleteModal';
import SearchBar from '../components/SearchBar';
import Pagination from '../components/Pagination';
import { StatusBadge } from '../components/StatusBadge';
import toast from 'react-hot-toast';

const Leads = () => {
  const {
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
  } = useLeads();

  const [modalOpen, setModalOpen] = useState(false);
  const [editLead, setEditLead] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const handleSort = (field) => {
    if (filters.sortBy === field) {
      updateFilters({ order: filters.order === 'asc' ? 'desc' : 'asc' });
    } else {
      updateFilters({ sortBy: field, order: 'asc' });
    }
  };

  const handleEdit = (lead) => {
    setEditLead(lead);
    setModalOpen(true);
  };

  const handleDelete = (lead) => setDeleteTarget(lead);

  const handleFormSubmit = async (data) => {
    console.log('[Leads.jsx] Form submitted with data:', data);
    try {
      if (editLead) {
        console.log('[Leads.jsx] Updating lead:', editLead._id);
        await updateLead(editLead._id, data);
      } else {
        console.log('[Leads.jsx] Creating new lead with data:', data);
        await createLead(data);
        console.log('[Leads.jsx] Lead created successfully');
      }
      setEditLead(null);
    } catch (err) {
      console.error('[Leads.jsx] Form submission error:', err);
      toast.error('Failed to save lead: ' + err.message);
      throw err;
    }
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await deleteLead(deleteTarget._id);
      setDeleteTarget(null);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setDeleting(false);
    }
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditLead(null);
  };

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-gray-900 dark:text-white">Lead Management</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
            {pagination.total} leads total
          </p>
        </div>
        <button
          onClick={() => { setEditLead(null); setModalOpen(true); }}
          className="btn-primary"
        >
          <Plus className="w-4 h-4" />
          Add Lead
        </button>
      </div>

      {/* Filter tabs */}
      <div className="flex items-center gap-1 overflow-x-auto pb-1">
        {['', 'New', 'Contacted', 'Qualified', 'Converted', 'Lost'].map((s) => (
          <button
            key={s}
            onClick={() => updateFilters({ status: s })}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
              filters.status === s
                ? 'bg-brand-600 text-white shadow-sm'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            {s || 'All'}
          </button>
        ))}
      </div>

      {/* Main card */}
      <div className="card overflow-hidden">
        {/* Search toolbar */}
        <div className="p-4 border-b border-gray-100 dark:border-gray-800">
          <SearchBar
            search={filters.search}
            status={filters.status}
            onSearchChange={(v) => updateFilters({ search: v })}
            onStatusChange={(v) => updateFilters({ status: v })}
          />
        </div>

        {/* Table */}
        <LeadTable
          leads={leads}
          loading={loading}
          sortBy={filters.sortBy}
          order={filters.order}
          onSort={handleSort}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

        {/* Pagination */}
        <Pagination pagination={pagination} page={page} onPageChange={setPage} />
      </div>

      {/* Modals */}
      <LeadFormModal
        open={modalOpen}
        onClose={closeModal}
        onSubmit={handleFormSubmit}
        lead={editLead}
      />
      <DeleteModal
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={confirmDelete}
        leadName={deleteTarget?.name}
        loading={deleting}
      />
    </div>
  );
};

export default Leads;
