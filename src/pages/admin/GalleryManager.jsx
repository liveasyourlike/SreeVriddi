import React, { useState } from 'react';
import { useSreeVriddhi } from '../../context/SreeVriddhiContext';
import { Image as ImageIcon, Plus, Trash2, CheckCircle2, Sparkles } from 'lucide-react';

const GalleryManager = () => {
  const { galleryItems, addGalleryItem, deleteGalleryItem } = useSreeVriddhi();

  const [showAddModal, setShowAddModal] = useState(false);
  const [feedback, setFeedback] = useState({ type: '', message: '' });
  const [formData, setFormData] = useState({
    title: '',
    category: 'Facilities',
    imageUrl: '',
    caption: '',
    featured: false
  });

  const handleAdd = (e) => {
    e.preventDefault();
    if (!formData.imageUrl) {
      setFeedback({ type: 'error', message: 'Please provide an image URL before publishing the gallery item.' });
      return;
    }
    addGalleryItem(formData);
    setShowAddModal(false);
    setFeedback({ type: 'success', message: 'Media item published to the public gallery successfully.' });
    setFormData({ title: '', category: 'Facilities', imageUrl: '', caption: '', featured: false });
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center bg-slate-900 border border-amber-500/20 p-6 rounded-2xl">
        <div>
          <span className="text-xs text-amber-400 font-bold uppercase tracking-wider block">Media CMS & Brand Asset Management</span>
          <h1 className="text-2xl font-bold font-serif-brand text-white">Gallery Media Manager</h1>
          <p className="text-xs text-slate-400 mt-1">Upload office photographs, corporate event media, and certificates directly to the public website.</p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-600 text-slate-950 font-extrabold text-xs uppercase tracking-wider shadow-lg flex items-center gap-1.5 hover:scale-105 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Upload Media Asset</span>
        </button>
      </div>

      {feedback.message && (
        <div className={`rounded-xl border px-4 py-3 text-sm ${feedback.type === 'error' ? 'border-rose-500/40 bg-rose-500/10 text-rose-200' : 'border-emerald-500/40 bg-emerald-500/10 text-emerald-200'}`}>
          {feedback.message}
        </div>
      )}

      {/* Media Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {galleryItems.map(item => (
          <div key={item.id} className="glass-card overflow-hidden border-amber-500/20 space-y-3 p-4 flex flex-col justify-between">
            <div className="relative h-48 rounded-xl overflow-hidden bg-slate-950">
              <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
              <span className="absolute top-2 left-2 bg-slate-950/80 px-2 py-0.5 rounded text-[10px] text-amber-300 font-bold uppercase border border-amber-500/30">
                {item.category}
              </span>
            </div>

            <div className="space-y-1">
              <h3 className="font-bold text-white text-sm font-serif-brand">{item.title}</h3>
              <p className="text-slate-400 text-xs">{item.caption}</p>
            </div>

            <div className="pt-2 border-t border-slate-800 flex justify-between items-center text-xs">
              <span className="text-emerald-400 font-semibold text-[10px]">STATUS: PUBLISHED</span>
              <button
                onClick={() => deleteGalleryItem(item.id)}
                className="p-1.5 rounded-lg bg-rose-500/20 text-rose-300 hover:bg-rose-500/40"
                title="Delete Media"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Upload Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm p-4 flex items-center justify-center">
          <form onSubmit={handleAdd} className="bg-slate-900 border border-amber-500/40 rounded-2xl p-6 max-w-md w-full space-y-4 text-xs">
            <h3 className="text-lg font-bold text-white font-serif-brand">Upload New Media Asset</h3>
            
            <div>
              <label className="text-slate-300 font-semibold block mb-1">Asset Title *</label>
              <input type="text" required value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} placeholder="e.g. Hyderabad Headquarters Vault" className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-slate-100 outline-none" />
            </div>

            <div>
              <label className="text-slate-300 font-semibold block mb-1">Category *</label>
              <select value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })} className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-slate-100 outline-none">
                <option value="Facilities">Facilities & Vault</option>
                <option value="Events">Events & Conferences</option>
                <option value="Customer Education">Customer Education</option>
                <option value="Certificates">Certificates & Awards</option>
              </select>
            </div>

            <div>
              <label className="text-slate-300 font-semibold block mb-1">Image URL *</label>
              <input type="url" required value={formData.imageUrl} onChange={e => setFormData({ ...formData, imageUrl: e.target.value })} placeholder="https://images.unsplash.com/..." className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-slate-100 outline-none" />
            </div>

            <div>
              <label className="text-slate-300 font-semibold block mb-1">Caption / Description *</label>
              <textarea rows="3" required value={formData.caption} onChange={e => setFormData({ ...formData, caption: e.target.value })} placeholder="Short description for public display..." className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-slate-100 outline-none" />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button type="button" onClick={() => setShowAddModal(false)} className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300">Cancel</button>
              <button type="submit" className="px-5 py-2 rounded-xl bg-amber-500 text-slate-950 font-bold">Publish to Website</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default GalleryManager;
