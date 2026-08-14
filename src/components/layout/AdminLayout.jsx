import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { useSreeVriddhi } from '../../context/SreeVriddhiContext';
import {
  LayoutDashboard, Coins, Calculator, FileCheck2, PackageCheck,
  FileText, Banknote, ShieldAlert, Scale, FolderGit2, Image, Newspaper,
  History, Settings, ArrowLeft, LogOut
} from 'lucide-react';

const AdminLayout = () => {
  const { brandSettings } = useSreeVriddhi();
  const location = useLocation();

  // CRM is temporarily hidden from the Admin UI. Its implementation and
  // Coming Soon routes remain preserved for a future release.
  const adminMenu = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { name: 'Asset Registry', path: '/admin/assets', icon: Coins },
    { name: 'Valuation Engine', path: '/admin/valuations', icon: Calculator },
    { name: 'Applications', path: '/admin/applications', icon: FileCheck2 },
    { name: 'Product Rates', path: '/admin/products', icon: PackageCheck },
    { name: 'Contracts Engine', path: '/admin/contracts', icon: FileText },
    { name: 'Settlement Engine', path: '/admin/settlements', icon: Banknote },
    { name: 'Risk Management', path: '/admin/risk', icon: ShieldAlert },
    { name: 'Compliance & Legal', path: '/admin/compliance', icon: Scale },
    { name: 'Document Vault', path: '/admin/documents', icon: FolderGit2 },
    { name: 'Gallery CMS', path: '/admin/gallery', icon: Image },
    { name: 'Insights CMS', path: '/admin/content', icon: Newspaper },
    { name: 'System Audit Log', path: '/admin/audit', icon: History },
    { name: 'Brand & Settings', path: '/admin/settings', icon: Settings }
  ];

  const isActive = (path) => {
    if (path === '/admin' && location.pathname === '/admin') return true;
    if (path !== '/admin' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col md:flex-row">
      <aside className="w-full md:w-64 bg-slate-950 border-r border-amber-500/20 p-4 flex flex-col justify-between flex-shrink-0">
        <div>
          <div className="pb-4 mb-4 border-b border-slate-800 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3">
              <img src={brandSettings.primaryLogo} alt="Sree Vriddhi" className="w-28 object-contain" />
              <div>
                <span className="font-serif-brand font-bold text-white text-base">SREE VRIDDHI</span>
                <span className="block text-[9px] text-emerald-400 font-bold tracking-widest uppercase">ADMIN</span>
              </div>
            </Link>
          </div>

          <nav className="space-y-1 max-h-[calc(100vh-200px)] overflow-y-auto pr-1">
            {adminMenu.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all ${
                    active
                      ? 'bg-gradient-to-r from-amber-500/20 to-amber-700/20 text-amber-300 border border-amber-500/30 shadow-md'
                      : 'text-slate-400 hover:text-white hover:bg-slate-900'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${active ? 'text-amber-400' : 'text-slate-500'}`} />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="pt-4 border-t border-slate-800 space-y-2">
          <Link to="/" className="flex items-center gap-2 text-xs text-slate-400 hover:text-amber-400 px-3 py-1.5 transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Public Website</span>
          </Link>
          <Link to="/login" className="flex items-center gap-2 text-xs text-rose-400 hover:text-rose-300 px-3 py-1.5 transition-colors">
            <LogOut className="w-3.5 h-3.5" />
            <span>Exit Admin</span>
          </Link>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto p-4 sm:p-8 bg-slate-950">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
