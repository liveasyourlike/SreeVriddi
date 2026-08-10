import React from 'react';
import { useSreeVriddhi } from '../../context/SreeVriddhiContext';
import { ShieldCheck, Eye, Target, Compass, Award, Scale, CheckCircle2, Lock, Building } from 'lucide-react';

const About = () => {
  const { brandSettings } = useSreeVriddhi();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-bold uppercase tracking-widest text-amber-400">About Sree Vriddhi</span>
        <h1 className="text-4xl font-extrabold font-serif-brand text-white">Who We Are & What We Believe</h1>
        <p className="text-lg text-amber-200/90 font-serif italic">
          "At Sree Vriddhi, we believe value should be managed with responsibility, transparency and purpose."
        </p>
      </div>

      {/* Vision & Mission Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="glass-card p-8 space-y-4 border-amber-500/30">
          <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <Target className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold font-serif-brand text-white">Our Mission</h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            To create structured, transparent and responsible value-management solutions for eligible asset owners, transforming dormant value into consistent, legally governed returns.
          </p>
        </div>

        <div className="glass-card p-8 space-y-4 border-amber-500/30">
          <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <Eye className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold font-serif-brand text-white">Our Vision</h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            To build a trusted platform where value, responsibility and sustainable growth come together, establishing new benchmarks in asset governance and customer protection.
          </p>
        </div>
      </div>

      {/* Core Pillars */}
      <div className="space-y-8">
        <h3 className="text-2xl font-bold font-serif-brand text-center text-white">Our 6 Pillars of Governance</h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: 'Who We Are',
              icon: Building,
              text: 'Sree Vriddhi is a premium structured value-management platform built by seasoned legal, risk, and financial engineers.'
            },
            {
              title: 'Our Philosophy',
              icon: Compass,
              text: '"Your Value. Our Responsibility. Your Returns." We honor the intrinsic worth of customer assets with institutional-grade custodianship.'
            },
            {
              title: 'Our Responsibility',
              icon: ShieldCheck,
              text: 'We mandate independent valuation, biometric purity testing, 30-year legal searches, and continuous risk monitoring.'
            },
            {
              title: 'Our Approach',
              icon: Scale,
              text: 'Every customer contract is custom-crafted to align with applicable regulatory statutes, clear titles, and verified asset eligibility.'
            },
            {
              title: 'Our Future',
              icon: Award,
              text: 'Expanding our legal product catalogue across capital, physical gold, and commercial real estate while maintaining 100% compliance integrity.'
            },
            {
              title: 'Protection Promise',
              icon: Lock,
              text: 'Clear separation of custody, zero speculative leverage, and full transparency across every contractual settlement.'
            }
          ].map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div key={idx} className="glass-card p-6 space-y-3 hover:border-amber-500/40 transition-all">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                  <Icon className="w-5 h-5" />
                </div>
                <h4 className="text-lg font-bold text-white font-serif-brand">{pillar.title}</h4>
                <p className="text-xs text-slate-400 leading-relaxed">{pillar.text}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Telugu Tagline Showcase */}
      <div className="glass-card-gold p-8 text-center space-y-3">
        <h3 className="text-2xl font-serif text-amber-300 font-bold">"విలువకు వృద్ధి — వృద్ధికి విశ్వాసం"</h3>
        <p className="text-xs text-slate-300 max-w-xl mx-auto">
          Delivering sustainable value growth through unwavering institutional trust, legal compliance, and transparent customer service.
        </p>
      </div>

    </div>
  );
};

export default About;
