import React, { useEffect, useState } from 'react';
import { Download, File, History, Paperclip, UserCheck } from 'lucide-react';
import { useSreeVriddhi } from '../../context/SreeVriddhiContext';

const CONTACTS_KEY = 'sreevriddhi-ai-contacts-v1';
const DB_NAME = 'sreevriddhi-customer-files';
const STORE_NAME = 'attachments';

const openDb = () => new Promise((resolve,reject) => {
  if (!window.indexedDB) return reject(new Error('IndexedDB unavailable'));
  const req = indexedDB.open(DB_NAME,1);
  req.onupgradeneeded = () => {
    const db=req.result;
    if(!db.objectStoreNames.contains(STORE_NAME)){
      const store=db.createObjectStore(STORE_NAME,{keyPath:'id'});
      store.createIndex('email','email',{unique:false});
    }
  };
  req.onsuccess=()=>resolve(req.result);
  req.onerror=()=>reject(req.error);
});

const loadFiles = async email => {
  if(!email) return [];
  const db=await openDb();
  return new Promise((resolve,reject)=>{
    const tx=db.transaction(STORE_NAME,'readonly');
    const req=tx.objectStore(STORE_NAME).index('email').getAll(email.toLowerCase().trim());
    req.onsuccess=()=>{db.close();resolve(req.result||[]);};
    req.onerror=()=>{db.close();reject(req.error);};
  });
};

const Customer360 = () => {
  const { customers } = useSreeVriddhi();
  const c = customers[0] || {};
  const [chatContacts,setChatContacts] = useState([]);
  const [selectedEmail,setSelectedEmail] = useState('');
  const [attachments,setAttachments] = useState([]);

  useEffect(()=>{
    try {
      const saved=JSON.parse(localStorage.getItem(CONTACTS_KEY)||'[]');
      setChatContacts(saved);
      if(saved[0]?.email)setSelectedEmail(saved[0].email);
    } catch { setChatContacts([]); }
  },[]);

  useEffect(()=>{
    if(!selectedEmail){setAttachments([]);return;}
    loadFiles(selectedEmail).then(setAttachments).catch(()=>setAttachments([]));
  },[selectedEmail]);

  const downloadFile=file=>{
    const url=URL.createObjectURL(file.blob);
    const a=document.createElement('a');
    a.href=url;a.download=file.name;a.click();
    setTimeout(()=>URL.revokeObjectURL(url),1000);
  };

  const chatCustomer = chatContacts.find(x=>x.email===selectedEmail);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold font-serif-brand text-white">Customer 360° Profile Manager</h1>
        <p className="text-xs text-slate-400 mt-1">Full customer lifecycle view, KYC audit trails, and website AI conversation attachments.</p>
      </div>

      <div className="glass-card p-8 border-amber-500/30 space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-800 pb-4">
          <div>
            <span className="font-mono text-xs text-amber-400 font-bold">{c.id}</span>
            <h2 className="text-xl font-bold text-white font-serif-brand">{c.name}</h2>
            <p className="text-xs text-slate-400">{c.location} | {c.phone} | {c.email}</p>
          </div>
          <span className="badge-approved px-3 py-1 rounded-full text-xs font-bold uppercase">KYC Verified (LOW RISK)</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs text-slate-300 bg-slate-950 p-4 rounded-xl border border-slate-800">
          <div><span>PAN Number:</span> <strong className="block font-mono text-white">{c.panNumber}</strong></div>
          <div><span>Aadhaar Last 4:</span> <strong className="block font-mono text-white">{c.aadhaarLast4}</strong></div>
          <div><span>Bank Name:</span> <strong className="block text-white">{c.bankName}</strong></div>
          <div><span>Active Contracts:</span> <strong className="block text-emerald-400">{c.activeContractsCount}</strong></div>
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-bold text-amber-300 font-serif-brand flex items-center gap-1.5"><History className="w-4 h-4" /><span>Customer Timeline Audit History</span></h3>
          <div className="space-y-2 pl-4 border-l-2 border-amber-500/30">
            {c.timeline?.map((t,idx)=>(
              <div key={idx} className="bg-slate-900 p-3 rounded-xl border border-slate-800 text-xs text-slate-300 flex justify-between items-center">
                <div><span className="font-bold text-white">{t.event}</span><span className="block text-[10px] text-slate-500">By: {t.user}</span></div>
                <span className="text-[10px] font-mono text-amber-400">{t.date}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="glass-card p-6 border-slate-700 space-y-5">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2"><UserCheck className="w-5 h-5 text-emerald-400" />Website AI Contacts & Attachments</h2>
            <p className="text-xs text-slate-400 mt-1">Customer files are associated to the exact email captured in the AI pre-chat form.</p>
          </div>
          <span className="text-xs rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 px-3 py-1">{chatContacts.length} contact{chatContacts.length===1?'':'s'}</span>
        </div>

        {!chatContacts.length ? (
          <div className="rounded-xl border border-slate-800 bg-slate-950 p-5 text-xs text-slate-400">No website AI contacts have been created yet. Complete the chatbot pre-chat form once, then return here.</div>
        ) : (
          <div className="grid lg:grid-cols-[300px_1fr] gap-5">
            <div className="space-y-2">
              {chatContacts.map(contact=>(
                <button key={contact.email} onClick={()=>setSelectedEmail(contact.email)} className={`w-full text-left rounded-xl border p-3 ${selectedEmail===contact.email?'border-emerald-400 bg-emerald-500/10':'border-slate-800 bg-slate-950 hover:border-slate-600'}`}>
                  <strong className="block text-sm text-white">{contact.fullName}</strong>
                  <span className="block text-[11px] text-slate-400 mt-1">{contact.email}</span>
                  <span className="block text-[10px] text-slate-500 mt-2">{contact.asset || 'Asset not selected'} · {contact.amount || 'Amount not provided'}</span>
                </button>
              ))}
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
              <div className="flex items-center justify-between gap-3 border-b border-slate-800 pb-3 mb-3">
                <div>
                  <h3 className="text-sm font-bold text-white">{chatCustomer?.fullName || selectedEmail}</h3>
                  <p className="text-[11px] text-slate-400">{selectedEmail}</p>
                </div>
                <Paperclip className="w-5 h-5 text-emerald-400" />
              </div>
              {!attachments.length ? (
                <p className="text-xs text-slate-500 py-6">No attachments stored for this customer.</p>
              ) : (
                <div className="space-y-2">
                  {attachments.map(file=>(
                    <div key={file.id} className="flex items-center gap-3 rounded-lg border border-slate-800 bg-slate-900 p-3">
                      <File className="w-5 h-5 text-slate-300 shrink-0" />
                      <div className="min-w-0 flex-1">
                        <strong className="block text-xs text-white truncate">{file.name}</strong>
                        <span className="block text-[10px] text-slate-500 mt-1">{(file.size/1024/1024).toFixed(2)} MB · {new Date(file.uploadedAt).toLocaleString('en-IN')} · {file.type || 'unknown type'}</span>
                      </div>
                      <button onClick={()=>downloadFile(file)} className="rounded-lg border border-slate-700 p-2 text-slate-300 hover:text-white hover:border-emerald-400" title="Download attachment"><Download className="w-4 h-4" /></button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
        <p className="text-[10px] text-slate-500">Preview storage note: files are stored in the browser's IndexedDB and linked by customer email. For cross-device/staff production storage, connect a persistent storage service such as Vercel Blob or another object store.</p>
      </div>
    </div>
  );
};

export default Customer360;
