import React, { useState } from 'react';
import { useSreeVriddhi } from '../../context/SreeVriddhiContext';
import { PackageCheck, Save, Clock, ShieldCheck, AlertTriangle, Edit3 } from 'lucide-react';

const ProductManager = () => {
  const { products, updateProduct } = useSreeVriddhi();
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});

  const startEdit = (prod) => {
    setEditingId(prod.id);
    setEditForm({ ...prod });
  };

  const handleSave = (id) => {
    updateProduct(id, editForm);
    setEditingId(null);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-slate-900 border border-amber-500/20 p-6 rounded-2xl space-y-2">
        <span className="text-xs text-amber-400 font-bold uppercase tracking-wider block">Admin Rate & Status Control</span>
        <h1 className="text-2xl font-bold font-serif-brand text-white">Dynamic Product & Commercial Parameter Configuration</h1>
        <p className="text-xs text-slate-400 leading-relaxed max-w-2xl">
          Modify product status, proposed monthly return assumptions, contract tenures, and notice periods live without touching frontend code.
        </p>
      </div>

      {/* Products Config Cards */}
      <div className="space-y-6">
        {products.map(prod => {
          const isEditing = editingId === prod.id;
          return (
            <div key={prod.id} className="glass-card p-6 sm:p-8 space-y-6 border-amber-500/30">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-800 pb-4">
                <div>
                  <span className="font-mono text-xs text-amber-400 font-bold">{prod.id}</span>
                  <h3 className="text-xl font-bold text-white font-serif-brand">{prod.name}</h3>
                </div>

                {!isEditing ? (
                  <button
                    onClick={() => startEdit(prod)}
                    className="px-4 py-2 rounded-xl bg-slate-900 border border-amber-500/30 text-amber-300 text-xs font-bold flex items-center gap-1.5 hover:bg-slate-800"
                  >
                    <Edit3 className="w-4 h-4" />
                    <span>Edit Product Config</span>
                  </button>
                ) : (
                  <button
                    onClick={() => handleSave(prod.id)}
                    className="px-5 py-2 rounded-xl bg-amber-500 text-slate-950 text-xs font-extrabold flex items-center gap-1.5 shadow-lg"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save & Deploy Live</span>
                  </button>
                )}
              </div>

              {!isEditing ? (
                /* View Mode */
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs">
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                    <span className="text-slate-400 block font-semibold">Public Regulatory Status:</span>
                    <span className="badge-approved px-2.5 py-0.5 rounded-full uppercase text-[10px] inline-block">{prod.status}</span>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                    <span className="text-slate-400 block font-semibold">Proposed Monthly Assumption:</span>
                    <span className="text-lg font-bold text-amber-300">{prod.proposedMonthlyReturn}% / Month</span>
                    <span className="text-[10px] text-slate-500 block">Fortnightly: {prod.proposedFortnightlyReturn}%</span>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                    <span className="text-slate-400 block font-semibold">Tenure & Notice Period:</span>
                    <span className="text-white font-bold">{prod.tenure}</span>
                    <span className="text-[10px] text-slate-500 block">Notice: {prod.noticePeriodDays} Days</span>
                  </div>
                </div>
              ) : (
                /* Edit Mode */
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
                  <div>
                    <label className="text-slate-300 font-semibold block mb-1">Product Status *</label>
                    <select
                      value={editForm.status}
                      onChange={e => setEditForm({ ...editForm, status: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-slate-100 font-bold"
                    >
                      <option value="Draft">Draft</option>
                      <option value="Under Legal Review">Under Legal Review</option>
                      <option value="Compliance Approved">Compliance Approved</option>
                      <option value="Active">Active</option>
                      <option value="Temporarily Suspended">Temporarily Suspended</option>
                      <option value="Retired">Retired</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-slate-300 font-semibold block mb-1">Proposed Monthly Return (%) *</label>
                    <input
                      type="number"
                      step="0.1"
                      value={editForm.proposedMonthlyReturn}
                      onChange={e => setEditForm({ ...editForm, proposedMonthlyReturn: Number(e.target.value) })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-amber-300 font-bold font-mono"
                    />
                  </div>

                  <div>
                    <label className="text-slate-300 font-semibold block mb-1">Proposed Fortnightly Return (%) *</label>
                    <input
                      type="number"
                      step="0.1"
                      value={editForm.proposedFortnightlyReturn}
                      onChange={e => setEditForm({ ...editForm, proposedFortnightlyReturn: Number(e.target.value) })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-amber-300 font-bold font-mono"
                    />
                  </div>

                  <div>
                    <label className="text-slate-300 font-semibold block mb-1">Contract Tenure *</label>
                    <input
                      type="text"
                      value={editForm.tenure}
                      onChange={e => setEditForm({ ...editForm, tenure: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-slate-100"
                    />
                  </div>

                  <div>
                    <label className="text-slate-300 font-semibold block mb-1">Notice Period (Days) *</label>
                    <input
                      type="number"
                      value={editForm.noticePeriodDays}
                      onChange={e => setEditForm({ ...editForm, noticePeriodDays: Number(e.target.value) })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-slate-100 font-mono"
                    />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductManager;
