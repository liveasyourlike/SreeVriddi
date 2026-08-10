import React, { useState } from 'react';
import { useSreeVriddhi } from '../../context/SreeVriddhiContext';
import { Users, LayoutGrid, List, Plus, Search, Filter, Phone, Mail, MapPin } from 'lucide-react';

const LeadManagement = () => {
  const { leads, updateLeadStage, addLead } = useSreeVriddhi();
  const [viewMode, setViewMode] = useState('kanban'); // 'kanban' | 'table'
  const [searchTerm, setSearchTerm] = useState('');

  const stages = [
    'New',
    'Contacted',
    'Qualified',
    'Eligibility Submitted',
    'Application Started',
    'Converted',
    'Lost'
  ];

  const filteredLeads = leads.filter(l =>
    l.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    l.assetType.toLowerCase().includes(searchTerm.toLowerCase()) ||
    l.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold font-serif-brand text-white">Lead Management & CRM Pipeline</h1>
          <p className="text-xs text-slate-400 mt-1">Track prospective asset owners through the lead qualification funnel.</p>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-3">
          <div className="bg-slate-900 border border-slate-800 p-1 rounded-xl flex items-center">
            <button
              onClick={() => setViewMode('kanban')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                viewMode === 'kanban' ? 'bg-amber-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Kanban</span>
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                viewMode === 'table' ? 'bg-amber-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              <List className="w-3.5 h-3.5" />
              <span>Table</span>
            </button>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-md">
        <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search leads by name, asset, or location..."
          className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-10 pr-4 py-3 text-xs text-slate-100 outline-none focus:border-amber-400"
        />
      </div>

      {/* KANBAN BOARD VIEW */}
      {viewMode === 'kanban' ? (
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-7 gap-4 overflow-x-auto pb-4">
          {stages.map(stage => {
            const stageLeads = filteredLeads.filter(l => l.stage === stage);
            return (
              <div key={stage} className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 space-y-3 min-w-[240px]">
                <div className="flex justify-between items-center pb-2 border-b border-slate-800">
                  <h3 className="text-xs font-bold text-amber-300 tracking-wider uppercase">{stage}</h3>
                  <span className="w-5 h-5 rounded-full bg-slate-800 text-[10px] font-bold text-slate-300 flex items-center justify-center">
                    {stageLeads.length}
                  </span>
                </div>

                <div className="space-y-3">
                  {stageLeads.map(lead => (
                    <div key={lead.id} className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2 hover:border-amber-500/40 transition-all text-xs">
                      <div className="flex justify-between items-start">
                        <span className="font-mono text-[10px] text-amber-400 font-bold">{lead.id}</span>
                        <span className="text-[10px] text-slate-500">{lead.source}</span>
                      </div>

                      <h4 className="font-bold text-white text-sm">{lead.name}</h4>
                      <p className="text-slate-400 text-[11px] flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-amber-400" />
                        <span>{lead.location}</span>
                      </p>

                      <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-[11px]">
                        <span className="text-slate-400">Asset:</span> <strong className="text-slate-200">{lead.assetType}</strong>
                        <span className="block text-amber-300 font-bold">₹{(lead.approxValue / 100000).toFixed(1)} Lakhs</span>
                      </div>

                      {/* Move Stage Selector */}
                      <div className="pt-2">
                        <label className="text-[10px] text-slate-500 block mb-1">Move Stage:</label>
                        <select
                          value={lead.stage}
                          onChange={(e) => updateLeadStage(lead.id, e.target.value)}
                          className="w-full bg-slate-900 border border-slate-700 rounded-lg p-1.5 text-[10px] text-amber-300 font-bold"
                        >
                          {stages.map(s => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* TABLE VIEW */
        <div className="glass-card overflow-hidden border-amber-500/20">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-900 text-amber-300 uppercase font-bold text-[10px] border-b border-slate-800">
                <tr>
                  <th className="p-4">Lead ID</th>
                  <th className="p-4">Name</th>
                  <th className="p-4">Contact</th>
                  <th className="p-4">Asset Type</th>
                  <th className="p-4">Approx Value</th>
                  <th className="p-4">Current Stage</th>
                  <th className="p-4">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {filteredLeads.map(lead => (
                  <tr key={lead.id} className="hover:bg-slate-900/60">
                    <td className="p-4 font-mono font-bold text-amber-400">{lead.id}</td>
                    <td className="p-4 font-bold text-white">{lead.name}</td>
                    <td className="p-4">{lead.mobile} <br/><span className="text-slate-500">{lead.email}</span></td>
                    <td className="p-4">{lead.assetType}</td>
                    <td className="p-4 font-bold text-amber-300">₹{(lead.approxValue / 100000).toFixed(1)}L</td>
                    <td className="p-4">
                      <span className="badge-review px-2.5 py-0.5 rounded-full uppercase text-[10px]">{lead.stage}</span>
                    </td>
                    <td className="p-4">
                      <select
                        value={lead.stage}
                        onChange={(e) => updateLeadStage(lead.id, e.target.value)}
                        className="bg-slate-900 border border-slate-700 rounded-lg p-1.5 text-xs text-amber-300"
                      >
                        {stages.map(s => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeadManagement;
