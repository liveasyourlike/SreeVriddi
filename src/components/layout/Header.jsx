import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSreeVriddhi } from '../../context/SreeVriddhiContext';
import { MessageSquare, Phone, Sun, Moon, Menu, X, ShieldCheck, UserCheck, Lock, BookOpen } from 'lucide-react';
import LanguageSelector from '../LanguageSelector';

const Header = () => {
  const { brandSettings, theme, language, toggleTheme, toggleLanguage } = useSreeVriddhi();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);

  const translations = {
    en: {
      banner: 'Compliance First: Product structures & returns subject to legal verification and regulatory terms.',
      whatsapp: 'WhatsApp Direct',
      login: 'Login / CRM',
      eligibility: 'Check Eligibility',
      mobileLogin: 'Customer & Admin Portal Login',
      themeLabel: 'Theme',
      languageLabel: 'Language'
    },
    hi: {
      banner: 'अनुशंसा प्रथम: उत्पाद संरचनाएँ और रिटर्न कानूनी सत्यापन एवं नियमों के अधीन हैं।',
      whatsapp: 'व्हाट्सएप डायरेक्ट',
      login: 'लॉगिन / CRM',
      eligibility: 'पात्रता जांचें',
      mobileLogin: 'ग्राहक एवं व्यवस्थापक पोर्टल लॉगिन',
      themeLabel: 'थीम',
      languageLabel: 'भाषा'
    },
    te: {
      banner: 'క్రమబద్ధత మొదట: ఉత్పత్తి నిర్మాణాలు మరియు రిటర్న్లు कानूनी ధ్రువీకరణ మరియు réglementationకు లోబడి ఉంటాయి.',
      whatsapp: 'వాట్సాప్ డైరెక్ట్',
      login: 'లాగిన్ / CRM',
      eligibility: 'అర్హత తనిఖీ',
      mobileLogin: 'వినియోగదారు మరియు అడ్మిన్ పోర్టల్ లాగిన్',
      themeLabel: 'థీమ్',
      languageLabel: 'భాష'
    }
  };

  const t = translations[language] || translations.en;

  const navLinks = [
    { name: language === 'hi' ? 'होम' : language === 'te' ? 'హోమ్' : 'Home', path: '/' },
    { name: language === 'hi' ? 'हमारे बारे में' : language === 'te' ? 'మా గురించి' : 'About', path: '/about' },
    { name: language === 'hi' ? 'यह कैसे काम करता है' : language === 'te' ? 'ఇది ఎలా పని చేస్తుంది' : 'How It Works', path: '/how-it-works' },
    { name: language === 'hi' ? 'मूल्य और परिसंपत्तियाँ' : language === 'te' ? 'విలువ మరియు ఆస్తులు' : 'Value & Assets', path: '/assets' },
    { name: language === 'hi' ? 'उत्पाद' : language === 'te' ? 'ఉత్పత్తులు' : 'Products', path: '/products' },
    { name: language === 'hi' ? 'पात्रता' : language === 'te' ? 'అర్హత' : 'Eligibility', path: '/eligibility' },
    { name: language === 'hi' ? 'स्री व्रिद्धी क्यों' : language === 'te' ? 'Sree Vriddhi ఎందుకు' : 'Why Sree Vriddhi', path: '/why-us' },
    { name: language === 'hi' ? 'सुरक्षा' : language === 'te' ? 'రక్షణ' : 'Protection', path: '/protection' },
    { name: language === 'hi' ? 'गैलरी' : language === 'te' ? 'గ్యాలరీ' : 'Gallery', path: '/gallery' },
    { name: language === 'hi' ? 'FAQ' : language === 'te' ? 'FAQ' : 'FAQ', path: '/faq' },
    { name: language === 'hi' ? 'अंतर्दृष्टियाँ' : language === 'te' ? 'ఇన్‌సైట్ల్' : 'Insights', path: '/insights' },
    { name: language === 'hi' ? 'संपर्क' : language === 'te' ? 'సంపర్కం' : 'Contact', path: '/contact' }
  ];

  const isActive = (path) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="sticky top-0 z-50 bg-slate-950/90 backdrop-blur-md border-b border-amber-500/20 shadow-2xl">
      {/* Top Banner Notice */}
      <div className="bg-gradient-to-r from-navy-950 via-slate-900 to-navy-950 border-b border-amber-500/10 py-1.5 px-4 text-xs text-slate-300">
        <div className="max-w-7xl mx-auto flex justify-between items-center flex-wrap gap-2">
          <div className="flex items-center gap-2 text-amber-300/90 font-medium">
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            <span>{t.banner}</span>
          </div>
          <div className="flex items-center gap-4">
            <a href={`tel:${brandSettings.phone}`} className="hover:text-amber-400 transition-colors flex items-center gap-1">
              <Phone className="w-3.5 h-3.5 text-amber-400" />
              <span>{brandSettings.phone}</span>
            </a>
            <a href={brandSettings.whatsappUrl} target="_blank" rel="noopener noreferrer" 
               className="bg-emerald-600/90 hover:bg-emerald-500 text-white px-2.5 py-0.5 rounded-full flex items-center gap-1 font-semibold transition-all text-[11px] shadow-sm">
              <MessageSquare className="w-3 h-3" />
              <span>{t.whatsapp}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Header Nav */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
        {/* Brand Logo: small mark for compact header, full primary logo for larger displays */}
        <Link to="/" className="flex items-center gap-3 group">
          <img src={brandSettings.logoMark || brandSettings.primaryLogo} alt="Sree Vriddhi Mark" className="h-10 object-contain block sm:hidden" />
          <img src={brandSettings.primaryLogo || brandSettings.logoMark} alt="Sree Vriddhi" className="h-10 object-contain hidden sm:block" />
          <div className="hidden sm:block">
            <div className="font-serif-brand text-xl sm:text-2xl font-bold tracking-widest text-white flex items-center gap-1">
              <span>SREE</span>
              <span className="text-amber-400">VRIDDHI</span>
            </div>
            <p className="text-[10px] text-amber-200/80 tracking-widest uppercase font-medium">
              {brandSettings.tagline}
            </p>
          </div>
        </Link>

        {/* Desktop Nav Links (compact with More dropdown) */}
        <nav className="hidden lg:flex items-center gap-1.5">
          {navLinks.slice(0, 6).map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wider uppercase transition-all ${
                isActive(link.path)
                  ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              {link.name}
            </Link>
          ))}

          {navLinks.length > 6 && (
            <div className="relative">
              <button
                onClick={() => setMoreOpen(!moreOpen)}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wider uppercase transition-all text-slate-300 hover:text-white hover:bg-slate-800/60"
              >
                More
              </button>

              {moreOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-slate-900 border border-slate-800 rounded-lg shadow-lg z-50">
                  {navLinks.slice(6).map((m) => (
                    <Link
                      key={m.path}
                      to={m.path}
                      onClick={() => setMoreOpen(false)}
                      className="block px-3 py-2 text-xs text-slate-300 hover:bg-slate-800/60 hover:text-white"
                    >
                      {m.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )}
        </nav>

        {/* Action Buttons */}
        <div className="hidden lg:flex items-center gap-3">
          <div className="p-0">
            <LanguageSelector className="bg-transparent text-slate-300" />
          </div>

          <button 
            onClick={toggleTheme}
            className="p-2 rounded-lg bg-slate-900 border border-slate-700 text-slate-300 hover:text-amber-400 transition-colors"
            title={t.themeLabel}
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : theme === 'light' ? <Moon className="w-4 h-4 text-slate-300" /> : <BookOpen className="w-4 h-4 text-amber-400" />}
          </button>

          <Link
            to="/login"
            className="px-3.5 py-1.5 rounded-lg bg-slate-900 border border-amber-500/30 text-amber-300 hover:bg-amber-500/10 text-xs font-bold tracking-wider uppercase transition-all flex items-center gap-1.5"
          >
            <Lock className="w-3.5 h-3.5" />
            <span>{t.login}</span>
          </Link>

          <Link
            to="/eligibility"
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 hover:from-amber-400 hover:to-amber-600 text-slate-950 text-xs font-extrabold uppercase tracking-wider shadow-lg shadow-amber-500/20 hover:scale-[1.02] transition-all"
          >
            {t.eligibility}
          </Link>
        </div>

        {/* Mobile menu button */}
        <div className="lg:hidden flex items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg bg-slate-900 border border-amber-500/30 text-amber-400"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-950 border-b border-amber-500/20 px-4 pt-2 pb-6 space-y-2">
          <div className="grid grid-cols-2 gap-2 mb-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`p-2.5 rounded-lg text-xs font-semibold tracking-wider transition-all ${
                  isActive(link.path)
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                    : 'text-slate-300 bg-slate-900/60'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="pt-2 border-t border-slate-800 space-y-2">
            <Link
              to="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-2.5 rounded-lg bg-slate-900 text-amber-300 border border-amber-500/30 text-xs font-bold text-center block"
            >
              {t.mobileLogin}
            </Link>
            <Link
              to="/eligibility"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-2.5 rounded-lg bg-gradient-to-r from-amber-500 to-amber-700 text-slate-950 font-extrabold text-xs text-center block shadow-lg"
            >
              {t.eligibility}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
