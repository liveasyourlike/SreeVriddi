import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(x => x);

  if (pathnames.length === 0) return null;

  return (
    <nav className="flex items-center text-xs text-slate-400 py-3 px-4 sm:px-8 bg-slate-900/60 border-b border-gold-500/10">
      <div className="max-w-7xl w-full mx-auto flex items-center gap-2 flex-wrap">
        <Link to="/" className="hover:text-gold-400 flex items-center gap-1 transition-colors">
          <Home className="w-3.5 h-3.5 text-gold-400" />
          <span>Home</span>
        </Link>
        {pathnames.map((name, index) => {
          const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
          const isLast = index === pathnames.length - 1;
          const formattedName = name.replace(/-/g, ' ').toUpperCase();

          return (
            <React.Fragment key={name}>
              <ChevronRight className="w-3 h-3 text-slate-600" />
              {isLast ? (
                <span className="text-gold-300 font-semibold tracking-wide">{formattedName}</span>
              ) : (
                <Link to={routeTo} className="hover:text-gold-400 transition-colors">
                  {formattedName}
                </Link>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </nav>
  );
};

export default Breadcrumbs;
