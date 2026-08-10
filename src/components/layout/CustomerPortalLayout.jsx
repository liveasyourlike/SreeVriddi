import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { useSreeVriddhi } from '../../context/SreeVriddhiContext';
import { LayoutDashboard, FileSpreadsheet, Coins, FileCheck, CreditCard, FolderArchive, Bell, User, HelpCircle, LogOut, ArrowLeft } from 'lucide-react';

const CustomerPortalLayout = () => {
  const { brandSettings } = useSreeVriddhi();
  const location = useLocation();

  const menuItems = [
    { name: 'Dashboard', path: '/portal', icon: LayoutDashboard },
    { name: 'My Applications', path: '/portal/applications', icon: FileSpreadsheet },
    { name: 'My Assets', path: '/portal/assets', icon: Coins },
    { name: 'My Contracts', path: '/portal/contracts', icon: FileCheck },
    { name: 'Settlement History', path: '/portal/settlements', icon: CreditCard },
    { name: 'Documents Vault', path: '/portal/documents', icon: FolderArchive },
    { name: 'Notifications', path: '/portal/notifications', icon: Bell },
    { name: 'Profile', path: '/portal/profile', icon: User },
    { name: 'Support', path: '/portal/support', icon: HelpCircle }
  ];

  const isActive = (path) => {
    if (path === '/portal' && location.pathname === '/portal') return true;
    if (path !== '/portal' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col md:flex-row">
      {/* Customer Sidebar */}
      <aside className="w-full md:w-64 bg-slate-900 border-r border-amber-500/20 p-4 flex flex-col justify-between flex-shrink-0">
        <div>
          {/* Brand Header */}
          <div className="pb-6 mb-6 border-b border-slate-800">
            <Link to="/" className="flex items-center gap-3">
              <img src={brandSettings.primaryLogo} alt="Sree Vriddhi" className="w-28 object-contain" />
              <div>
                <span className="font-serif-brand font-bold tracking-widest text-white text-base">SREE VRIDDHI</span>
                <span className="block text-[9px] text-amber-400 font-semibold tracking-wider">CUSTOMER PORTAL</span>
              </div>
            </Link>
          </div>

          {/* Nav Items */}
          <nav className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all ${
                    active
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30 shadow-md'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${active ? 'text-amber-400' : 'text-slate-500'}`} />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer Actions */}
        <div className="pt-6 border-t border-slate-800 space-y-2">
          <Link
            to="/"
            className="flex items-center gap-2 text-xs text-slate-400 hover:text-amber-400 px-3 py-2 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Website</span>
          </Link>
          <Link
            to="/login"
            className="flex items-center gap-2 text-xs text-rose-400 hover:text-rose-300 px-3 py-2 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </Link>
        </div>
      </aside>

      {/* Main Content View */}
      <main className="flex-1 overflow-y-auto p-4 sm:p-8 bg-slate-950">
        <Outlet />
      </main>
    </div>
  );
};

export default CustomerPortalLayout;
