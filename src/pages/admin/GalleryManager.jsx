import React, { useRef, useState } from 'react';
import { Image as ImageIcon, Plus, Trash2, Upload, X } from 'lucide-react';
import { useSreeVriddhi } from '../../context/SreeVriddhiContext';

const MAX_FILE_BYTES = 8 * 1024 * 1024;
const MAX_DATA_URL_CHARS = 900000;

async function compressImage(file) {
  if (!file.type.startsWith('image/')) throw new Error('Please choose an image file.');
  if (file.size > MAX_FILE_BYTES) throw new Error('Image is larger than 8 MB. Please choose a smaller image.');

  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, 1600 / Math.max(bitmap.width, bitmap.height));
  const canvas = document.createElement('canvas');
  canvas.width = Math.max(1, Math.round(bitmap.width * scale));
  canvas.height = Math.max(1, Math.round(bitmap.height * scale));
  const ctx = canvas.getContext('2d');
  ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  bitmap.close();

  const dataUrl = canvas.toDataURL('image/webp', 0.82);
  if (dataUrl.length > MAX_DATA_URL_CHARS) {
    throw new Error('This image is still too large after compression. Please choose a smaller image.');
  }
  return dataUrl;
}

const GalleryManager = () => {
  const { galleryItems, addGalleryItem, deleteGalleryItem } = useSreeVriddhi();
  const fileRef = useRef(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [previewUrl, setPreviewUrl] = useState('');
  const [uploading, setUploading] = useState(false);
  const [feedback, setFeedback] = useState({ type: '', message: '' });
  const [formData, setFormData] = useState({
    title: '',
    category: 'Facilities',
    imageUrl: '',
    caption: '',
    featured: false
  });

  const resetForm = () => {
    setFormData({ title: '', category: 'Facilities', imageUrl: '', caption: '', featured: false });
    setPreviewUrl('');
    if (fileRef.current) fileRef.current.value = '';
  };

  const handleFile = async (file) => {
    if (!file) return;
    setUploading(true);
    setFeedback({ type: '', message: '' });
    try {
      const dataUrl = await compressImage(file);
      setPreviewUrl(dataUrl);
      setFormData(prev => ({ ...prev, imageUrl: dataUrl }));
      setFeedback({ type: 'success', message: 'Image ready. Review the preview and publish it.' });
    } catch (error) {
      setPreviewUrl('');
      setFormData(prev => ({ ...prev, imageUrl: '' }));
      setFeedback({ type: 'error', message: error.message || 'Unable to process this image.' });
    } finally {
      setUploading(false);
    }
  };

  const handleAdd = (e) => {
    e.preventDefault();
    if (!formData.imageUrl) {
      setFeedback({ type: 'error', message: 'Choose an image or provide a public image URL before publishing.' });
      return;
    }
    addGalleryItem(formData);
    setShowAddModal(false);
    setFeedback({ type: 'success', message: 'Media item published to this browser\'s Sree Vriddhi gallery successfully.' });
    resetForm();
  };

  const openModal = () => {
    resetForm();
    setFeedback({ type: '', message: '' });
    setShowAddModal(true);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 bg-slate-900 border border-amber-500/20 p-6 rounded-2xl">
        <div>
          <span className="text-xs text-amber-400 font-bold uppercase tracking-wider block">Media CMS & Brand Asset Management</span>
          <h1 className="text-2xl font-bold font-serif-brand text-white">Gallery Media Manager</h1>
          <p className="text-xs text-slate-400 mt-1">Select photos directly from your computer, preview them, categorize them, and publish them to the gallery.</p>
        </div>
        <button onClick={openModal} className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-600 text-slate-950 font-extrabold text-xs uppercase tracking-wider shadow-lg flex items-center justify-center gap-1.5 hover:scale-105 transition-all">
          <Plus className="w-4 h-4" />
          <span>Upload Media Asset</span>
        </button>
      </div>

      {feedback.message && !showAddModal && (
        <div className={`rounded-xl border px-4 py-3 text-sm ${feedback.type === 'error' ? 'border-rose-500/40 bg-rose-500/10 text-rose-200' : 'border-emerald-500/40 bg-emerald-500/10 text-emerald-200'}`}>
          {feedback.message}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {galleryItems.map(item => (
          <div key={item.id} className="glass-card overflow-hidden border-amber-500/20 space-y-3 p-4 flex flex-col justify-between">
            <div className="relative h-48 rounded-xl overflow-hidden bg-slate-950">
              <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" loading="lazy" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
              <span className="absolute top-2 left-2 bg-slate-950/80 px-2 py-0.5 rounded text-[10px] text-amber-300 font-bold uppercase border border-amber-500/30">{item.category}</span>
            </div>
            <div className="space-y-1">
              <h3 className="font-bold text-white text-sm font-serif-brand">{item.title}</h3>
              <p className="text-slate-400 text-xs">{item.caption}</p>
            </div>
            <div className="pt-2 border-t border-slate-800 flex justify-between items-center text-xs">
              <span className="text-emerald-400 font-semibold text-[10px]">STATUS: PUBLISHED</span>
              <button onClick={() => deleteGalleryItem(item.id)} className="p-1.5 rounded-lg bg-rose-500/20 text-rose-300 hover:bg-rose-500/40" title="Delete Media" aria-label={`Delete ${item.title}`}>
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm p-4 flex items-center justify-center overflow-auto">
          <form onSubmit={handleAdd} className="bg-slate-900 border border-amber-500/40 rounded-2xl p-6 max-w-lg w-full space-y-4 text-xs max-h-[90vh] overflow-auto">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-amber-400 text-[10px] font-bold uppercase tracking-wider">Gallery CMS</span>
                <h3 className="text-lg font-bold text-white font-serif-brand">Upload New Media Asset</h3>
              </div>
              <button type="button" onClick={() => { setShowAddModal(false); resetForm(); }} className="p-2 rounded-lg text-slate-400 hover:bg-slate-800" aria-label="Close upload dialog"><X className="w-4 h-4" /></button>
            </div>

            <div className="border border-dashed border-amber-500/40 rounded-2xl p-4 bg-slate-950/60">
              {previewUrl ? (
                <div className="space-y-3">
                  <img src={previewUrl} alt="Selected gallery preview" className="w-full h-56 object-cover rounded-xl" />
                  <button type="button" onClick={() => { setPreviewUrl(''); setFormData(prev => ({ ...prev, imageUrl: '' })); if (fileRef.current) fileRef.current.value = ''; }} className="text-rose-300 hover:text-rose-200 text-xs">Remove selected image</button>
                </div>
              ) : (
                <label className="min-h-40 flex flex-col items-center justify-center gap-2 cursor-pointer text-center">
                  <Upload className="w-8 h-8 text-amber-400" />
                  <span className="text-white font-bold">Choose an image from your computer</span>
                  <span className="text-slate-500">JPG, PNG, WEBP • up to 8 MB</span>
                  <input ref={fileRef} type="file" accept="image/jpeg,image/png,image/webp" className="hidden" onChange={e => handleFile(e.target.files?.[0])} />
                </label>
              )}
              {uploading && <div className="text-amber-300 mt-2">Optimising image…</div>}
            </div>

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
              <label className="text-slate-300 font-semibold block mb-1">Or use a public Image URL</label>
              <input type="url" value={formData.imageUrl.startsWith('data:') ? '' : formData.imageUrl} onChange={e => { setPreviewUrl(e.target.value); setFormData({ ...formData, imageUrl: e.target.value }); }} placeholder="https://example.com/photo.jpg" className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-slate-100 outline-none" />
            </div>

            <div>
              <label className="text-slate-300 font-semibold block mb-1">Caption / Description *</label>
              <textarea rows="3" required value={formData.caption} onChange={e => setFormData({ ...formData, caption: e.target.value })} placeholder="Short description for public display..." className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-slate-100 outline-none" />
            </div>

            {feedback.message && <div className={`rounded-xl border px-3 py-2 ${feedback.type === 'error' ? 'border-rose-500/40 bg-rose-500/10 text-rose-200' : 'border-emerald-500/40 bg-emerald-500/10 text-emerald-200'}`}>{feedback.message}</div>}

            <div className="flex justify-end gap-2 pt-2">
              <button type="button" onClick={() => { setShowAddModal(false); resetForm(); }} className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300">Cancel</button>
              <button type="submit" disabled={uploading || !formData.imageUrl} className="px-5 py-2 rounded-xl bg-amber-500 text-slate-950 font-bold disabled:opacity-50 flex items-center gap-2"><ImageIcon className="w-4 h-4" /> Publish to Website</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default GalleryManager;
