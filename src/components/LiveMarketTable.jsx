import React from 'react';
import ComingSoonNotice from './ComingSoonNotice';

export default function LiveMarketTable() {
  return (
    <section aria-labelledby="live-market-title" className="rounded-2xl border border-amber-500/20 bg-slate-950/60 p-4 sm:p-6 shadow-lg">
      <div className="mb-4 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 id="live-market-title" className="text-sm font-extrabold uppercase tracking-widest text-amber-300">India Market Snapshot</h2>
          <p className="mt-1 text-xs text-slate-500">Live market values are temporarily paused until the data sources are fully verified.</p>
        </div>
        <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-600">Data verification in progress</span>
      </div>
      <ComingSoonNotice
        compact
        title="Live market data is coming soon"
        message="NIFTY 50, USD/INR, gold, petrol, diesel and selected India investment reference rates will appear here after each data source passes accuracy and freshness checks. No placeholder values are shown."
      />
    </section>
  );
}
