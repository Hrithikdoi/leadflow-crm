import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { X, User, Mail, Phone, Building2, FileText, Tag } from 'lucide-react';
import { STATUS_OPTIONS } from './StatusBadge';

const FIELDS = [
  { name: 'name', label: 'Full Name', icon: User, placeholder: 'John Doe', type: 'text',
    rules: { required: { value: true, message: 'Name is required' }, maxLength: { value: 100, message: 'Max 100 characters' } } },
  { name: 'email', label: 'Email Address', icon: Mail, placeholder: 'john@company.com', type: 'email',
    rules: { required: { value: true, message: 'Email is required' }, pattern: { value: /^\S+@\S+\.\S+$/, message: 'Invalid email address' } } },
  { name: 'phone', label: 'Phone Number', icon: Phone, placeholder: '+1 (555) 000-0000', type: 'tel',
    rules: { required: { value: true, message: 'Phone is required' }, pattern: { value: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/, message: 'Invalid phone number' } } },
  { name: 'company', label: 'Company Name', icon: Building2, placeholder: 'Acme Corp', type: 'text',
    rules: { required: { value: true, message: 'Company is required' }, maxLength: { value: 150, message: 'Max 150 characters' } } },
];

const LeadFormModal = ({ open, onClose, onSubmit, lead }) => {
  const isEdit = !!lead;
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      company: '',
      status: 'New',
      notes: '',
    },
  });

  useEffect(() => {
    if (open) {
      const defaultValues = lead ? { name: lead.name, email: lead.email, phone: lead.phone, company: lead.company, status: lead.status, notes: lead.notes || '' }
        : { name: '', email: '', phone: '', company: '', status: 'New', notes: '' };
      console.log('[LeadFormModal] useEffect: Resetting form with values:', defaultValues);
      reset(defaultValues);
    }
  }, [open, lead, reset]);

  const onFormSubmit = async (data) => {
    console.log('[LeadFormModal] Form submit handler called with data:', data);
    console.log('[LeadFormModal] Calling onSubmit prop...');
    try {
      await onSubmit(data);
      console.log('[LeadFormModal] onSubmit completed, closing modal');
      onClose();
    } catch (err) {
      console.error('[LeadFormModal] Error in form submission:', err);
      throw err;
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative w-full max-w-lg bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-800 animate-scale-in max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-gray-800">
          <div>
            <h2 className="font-display text-lg font-bold text-gray-900 dark:text-white">
              {isEdit ? 'Edit Lead' : 'Add New Lead'}
            </h2>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
              {isEdit ? 'Update lead information' : 'Fill in the details to create a new lead'}
            </p>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onFormSubmit)} className="p-6 space-y-4">
          {Object.keys(errors).length > 0 && (
            <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              <p className="text-xs font-semibold text-red-600 dark:text-red-400">Validation Errors:</p>
              {Object.entries(errors).map(([field, error]) => (
                <p key={field} className="text-xs text-red-600 dark:text-red-400 mt-1">
                  • {field}: {error.message}
                </p>
              ))}
            </div>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {FIELDS.map(({ name, label, icon: Icon, placeholder, type, rules }) => (
              <div key={name}>
                <label className="label">{label}</label>
                <div className="relative">
                  <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type={type}
                    placeholder={placeholder}
                    {...register(name, rules)}
                    className={`input-field pl-9 ${errors[name] ? 'border-red-400 focus:border-red-400 focus:ring-red-400/20' : ''}`}
                  />
                </div>
                {errors[name] && (
                  <p className="mt-1 text-xs text-red-500">{errors[name].message}</p>
                )}
              </div>
            ))}
          </div>

          {/* Status */}
          <div>
            <label className="label">Lead Status</label>
            <div className="relative">
              <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <select {...register('status', { required: { value: true, message: 'Status is required' } })} className="input-field pl-9 appearance-none cursor-pointer">
                {STATUS_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            {errors.status && <p className="mt-1 text-xs text-red-500">{errors.status.message}</p>}
          </div>

          {/* Notes */}
          <div>
            <label className="label">Notes</label>
            <div className="relative">
              <FileText className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <textarea
                rows={3}
                placeholder="Any additional notes about this lead..."
                {...register('notes', { maxLength: { value: 1000, message: 'Max 1000 characters' } })}
                className="input-field pl-9 resize-none"
              />
            </div>
            {errors.notes && <p className="mt-1 text-xs text-red-500">{errors.notes.message}</p>}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 pt-2">
            <button type="button" onClick={onClose} className="btn-secondary flex-1 justify-center">
              Cancel
            </button>
            <button type="submit" disabled={isSubmitting} className="btn-primary flex-1 justify-center">
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Saving...
                </span>
              ) : isEdit ? 'Update Lead' : 'Create Lead'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LeadFormModal;
