import { useMemo, useState } from 'react'
import { ShieldCheck, FileText, ClipboardCheck, PenLine, History, Languages, LockKeyhole, AlertTriangle, CheckCircle2, Clock3, ArrowRight, Download, UserCheck } from 'lucide-react'

const copy = {
  en: {
    eyebrow: 'SREE VRIDDHI · PREVIEW WORKSPACE', title: 'Virtual Agreement System', subtitle: 'Prepare, review and track agreement documents in one controlled workflow.',
    preview: 'Preview only', noFunds: 'Investment collection is disabled', noFundsText: 'This prototype uses sample records only. It does not collect money, issue investment offers, or promise returns.',
    journey: 'Agreement workflow', steps: ['Evaluation received', 'Admin verification', 'Draft prepared', 'Legal review', 'Ready for e-sign', 'Signed & archived'],
    records: 'Sample cases', pending: 'Needs review', approved: 'Legal review queue', signed: 'Signed records',
    selected: 'Selected case', sample: 'Sample record · no real customer data', caseName: 'Sample applicant', caseId: 'SV-DEMO-0001',
    details: 'Form details', asset: 'Asset category', frequency: 'Proposed schedule', duration: 'Proposed duration', preferredDate: 'Preferred credit date', startDate: 'Business interest date', documents: 'Supporting documents',
    notSet: 'Not set — requires approved terms', dateNote: 'Sunday dates must be moved to the next permitted business date, subject to the final contract.',
    docNote: 'PAN, bank and UPI details are intentionally not shown or collected in this preview.',
    draft: 'Agreement draft', draftText: 'Draft generation is a preview. Financial clauses stay blank until a qualified reviewer approves the exact wording and figures.',
    language: 'Document language', both: 'English + Telugu', enOnly: 'English', teOnly: 'Telugu',
    clauses: 'Draft sections', clauseList: ['Parties and verified identity', 'Purpose and asset description', 'Valuation method and assumptions', 'Term, dates and settlement schedule', 'Fees, tax treatment and deductions', 'Risk disclosures and no-guarantee statement', 'Default, termination and dispute process', 'Privacy, consent and document retention'],
    adminOnly: 'Admin-only creation', adminOnlyText: 'Agreement creation is unavailable until real server-side admin authentication, database permissions and audit logging are configured. No demo credentials are accepted.',
    create: 'Create draft agreement', disabled: 'Unavailable in preview', security: 'Security & audit', securityList: ['Role-based access enforced server-side', 'Sensitive fields encrypted and masked', 'Versioned agreement templates', 'Append-only audit events', 'E-sign provider webhook verification', 'Retention and deletion policy'],
    audit: 'Audit trail preview', auditRows: [['09:10', 'Evaluation received', 'System'], ['09:12', 'Identity review required', 'Admin queue'], ['—', 'Draft generation', 'Blocked pending admin authentication']],
    legal: 'Legal review checklist', legalList: ['Confirm legal entity and authority to contract', 'Review applicable RBI / SEBI / state and other regulatory requirements', 'Approve interest, return, tax and fee clauses', 'Review enforceability of e-sign method and stamp duty', 'Approve bilingual version and precedence clause', 'Approve privacy notice, consent and retention schedule'],
    legalNote: 'Do not send an agreement for signature until every applicable legal review is complete.',
    next: 'Next implementation phase', nextText: 'Connect server-side admin identity, database, document storage and an approved e-sign provider. These integrations are not connected in this preview.',
    back: 'Back to website', form: 'Open evaluation form'
  },
  te: {
    eyebrow: 'శ్రీ వృద్ధి · ప్రివ్యూ వర్క్‌స్పేస్', title: 'వర్చువల్ అగ్రిమెంట్ సిస్టమ్', subtitle: 'ఒక నియంత్రిత విధానంలో ఒప్పంద పత్రాలను సిద్ధం చేయడం, సమీక్షించడం, ట్రాక్ చేయడం.',
    preview: 'ప్రివ్యూ మాత్రమే', noFunds: 'పెట్టుబడి సేకరణ నిలిపివేయబడింది', noFundsText: 'ఈ నమూనాలో ఉదాహరణ డేటా మాత్రమే ఉంది. డబ్బు సేకరణ, పెట్టుబడి ఆఫర్లు లేదా రాబడి హామీలు ఇవ్వబడవు.',
    journey: 'ఒప్పంద ప్రక్రియ', steps: ['మూల్యాంకనం అందింది', 'అడ్మిన్ ధృవీకరణ', 'డ్రాఫ్ట్ సిద్ధం', 'న్యాయ సమీక్ష', 'ఈ-సైన్‌కు సిద్ధం', 'సంతకం & భద్రపరచడం'],
    records: 'నమూనా కేసులు', pending: 'సమీక్ష అవసరం', approved: 'న్యాయ సమీక్ష క్యూ', signed: 'సంతకం చేసిన రికార్డులు',
    selected: 'ఎంచుకున్న కేసు', sample: 'నమూనా రికార్డు · నిజమైన కస్టమర్ డేటా కాదు', caseName: 'నమూనా దరఖాస్తుదారు', caseId: 'SV-DEMO-0001',
    details: 'ఫారమ్ వివరాలు', asset: 'ఆస్తి వర్గం', frequency: 'ప్రతిపాదిత షెడ్యూల్', duration: 'ప్రతిపాదిత కాలం', preferredDate: 'ఇష్టమైన క్రెడిట్ తేదీ', startDate: 'వ్యాపార ఆసక్తి తేదీ', documents: 'సహాయక పత్రాలు',
    notSet: 'నిర్ధారించలేదు — ఆమోదించిన నిబంధనలు అవసరం', dateNote: 'ఆదివారం తేదీని తుది ఒప్పందం ప్రకారం అనుమతించిన తదుపరి పని తేదీకి మార్చాలి.',
    docNote: 'ఈ ప్రివ్యూలో PAN, బ్యాంక్ మరియు UPI వివరాలను చూపడం లేదా సేకరించడం లేదు.',
    draft: 'ఒప్పంద డ్రాఫ్ట్', draftText: 'ఇది ప్రివ్యూ మాత్రమే. అర్హత కలిగిన సమీక్షకుడు ఖచ్చితమైన పదజాలం, మొత్తాలను ఆమోదించే వరకు ఆర్థిక నిబంధనలు ఖాళీగా ఉంటాయి.',
    language: 'పత్ర భాష', both: 'ఇంగ్లీష్ + తెలుగు', enOnly: 'ఇంగ్లీష్', teOnly: 'తెలుగు',
    clauses: 'డ్రాఫ్ట్ విభాగాలు', clauseList: ['పక్షాలు మరియు ధృవీకరించిన గుర్తింపు', 'ఉద్దేశ్యం మరియు ఆస్తి వివరణ', 'విలువ నిర్ధారణ పద్ధతి మరియు అంచనాలు', 'కాలపరిమితి, తేదీలు, సెటిల్‌మెంట్ షెడ్యూల్', 'ఫీజులు, పన్ను విధానం, తగ్గింపులు', 'రిస్క్ వెల్లడింపులు మరియు హామీ లేదనే ప్రకటన', 'డిఫాల్ట్, రద్దు, వివాద పరిష్కారం', 'గోప్యత, సమ్మతి, పత్రాల నిల్వ'],
    adminOnly: 'అడ్మిన్ మాత్రమే సృష్టించగలరు', adminOnlyText: 'సర్వర్-సైడ్ అడ్మిన్ ధృవీకరణ, డేటాబేస్ అనుమతులు, ఆడిట్ లాగింగ్ సిద్ధమయ్యే వరకు ఒప్పంద సృష్టి అందుబాటులో ఉండదు. డెమో లాగిన్ వివరాలు అంగీకరించబడవు.',
    create: 'డ్రాఫ్ట్ ఒప్పందం సృష్టించండి', disabled: 'ప్రివ్యూలో అందుబాటులో లేదు', security: 'భద్రత & ఆడిట్', securityList: ['సర్వర్-సైడ్ పాత్ర ఆధారిత అనుమతులు', 'సున్నితమైన వివరాల ఎన్‌క్రిప్షన్ మరియు మాస్కింగ్', 'వెర్షన్ నియంత్రణ ఉన్న టెంప్లేట్లు', 'మార్చలేని ఆడిట్ ఈవెంట్లు', 'ఈ-సైన్ వెబ్‌హుక్ ధృవీకరణ', 'డేటా నిల్వ మరియు తొలగింపు విధానం'],
    audit: 'ఆడిట్ ట్రైల్ ప్రివ్యూ', auditRows: [['09:10', 'మూల్యాంకనం అందింది', 'సిస్టమ్'], ['09:12', 'గుర్తింపు సమీక్ష అవసరం', 'అడ్మిన్ క్యూ'], ['—', 'డ్రాఫ్ట్ సృష్టి', 'అడ్మిన్ ధృవీకరణ కోసం నిలిపివేసింది']],
    legal: 'న్యాయ సమీక్ష చెక్‌లిస్ట్', legalList: ['చట్టబద్ధ సంస్థ మరియు ఒప్పంద అధికారాన్ని నిర్ధారించండి', 'వర్తించే RBI / SEBI / రాష్ట్ర మరియు ఇతర నియంత్రణ నిబంధనలు సమీక్షించండి', 'వడ్డీ, రాబడి, పన్ను, ఫీజు నిబంధనలను ఆమోదించండి', 'ఈ-సైన్ విధానం మరియు స్టాంప్ డ్యూటీ చెల్లుబాటును సమీక్షించండి', 'ద్విభాషా పత్రం మరియు భాషా ప్రాధాన్యత నిబంధనను ఆమోదించండి', 'గోప్యత, సమ్మతి, డేటా నిల్వ షెడ్యూల్‌ను ఆమోదించండి'],
    legalNote: 'అన్ని వర్తించే న్యాయ సమీక్షలు పూర్తయ్యే వరకు సంతకం కోసం ఒప్పందాన్ని పంపకండి.',
    next: 'తదుపరి అమలు దశ', nextText: 'సర్వర్-సైడ్ అడ్మిన్ గుర్తింపు, డేటాబేస్, పత్రాల నిల్వ మరియు ఆమోదిత ఈ-సైన్ సేవను అనుసంధానించాలి. ఈ ప్రివ్యూలో అవి కనెక్ట్ కాలేదు.',
    back: 'వెబ్‌సైట్‌కు తిరిగి', form: 'మూల్యాంకన ఫారమ్ తెరవండి'
  }
}

const workflowStatus = ['Received', 'Verification', 'Draft', 'Legal review', 'E-sign', 'Archived']

function Panel({ icon: Icon, title, children, className = '' }) {
  return <section className={`rounded-2xl border border-white/10 bg-slate-950/75 p-4 sm:p-5 shadow-lg ${className}`}><div className="mb-4 flex items-center gap-2"><Icon className="h-4 w-4 text-amber-300"/><h2 className="text-sm font-extrabold text-white">{title}</h2></div>{children}</section>
}

export default function AgreementSystemPreview() {
  const [language, setLanguage] = useState('en')
  const [stage, setStage] = useState(1)
  const [docLanguage, setDocLanguage] = useState('both')
  const [checked, setChecked] = useState([])
  const t = copy[language]
  const progress = useMemo(() => Math.round((stage / (t.steps.length - 1)) * 100), [stage, t.steps.length])

  return <div className="min-h-screen bg-[#050b16] text-slate-100">
    <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8 space-y-5">
      <header className="flex flex-col gap-4 rounded-2xl border border-amber-400/20 bg-gradient-to-br from-[#101b2e] via-[#091222] to-[#0b1020] p-5 sm:p-7 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0"><p className="text-[9px] font-black tracking-[.22em] text-amber-300">{t.eyebrow}</p><h1 className="mt-2 text-2xl sm:text-3xl font-black font-serif-brand text-white">{t.title}</h1><p className="mt-2 max-w-2xl text-xs sm:text-sm leading-6 text-slate-300">{t.subtitle}</p></div>
        <div className="flex flex-wrap items-center gap-2"><span className="inline-flex items-center gap-1.5 rounded-full border border-amber-400/30 bg-amber-400/10 px-3 py-2 text-[10px] font-bold text-amber-200"><AlertTriangle size={13}/>{t.preview}</span><button type="button" onClick={() => setLanguage(language === 'en' ? 'te' : 'en')} className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-slate-950/70 px-3 py-2 text-[10px] font-bold"><Languages size={14}/>{language === 'en' ? 'తెలుగు' : 'English'}</button></div>
      </header>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {[[FileText, t.records, '04', 'from form'], [ClipboardCheck, t.pending, '02', 'admin review'], [PenLine, t.signed, '00', 'none in preview']].map(([Icon, label, count, note]) => <div key={label} className="rounded-xl border border-white/10 bg-slate-950/70 p-4"><div className="flex items-center justify-between"><Icon className="h-4 w-4 text-amber-300"/><span className="text-2xl font-black text-white">{count}</span></div><p className="mt-3 text-xs font-bold text-slate-200">{label}</p><p className="mt-1 text-[10px] text-slate-500">{note}</p></div>)}
      </div>

      <Panel icon={ClipboardCheck} title={t.journey}>
        <div className="mb-4 h-1.5 overflow-hidden rounded-full bg-slate-800"><div className="h-full rounded-full bg-gradient-to-r from-amber-300 to-emerald-400 transition-all" style={{ width: `${progress}%` }}/></div>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">{t.steps.map((item, i) => <button type="button" key={item} onClick={() => setStage(i)} className={`min-h-16 rounded-xl border p-3 text-left transition ${stage === i ? 'border-amber-300/60 bg-amber-300/10' : 'border-white/10 bg-slate-900/60 hover:border-white/20'}`}><span className="block text-[9px] font-black text-amber-300">0{i + 1}</span><span className="mt-1 block text-[10px] font-bold leading-4 text-slate-200">{item}</span></button>)}</div>
      </Panel>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <Panel icon={UserCheck} title={t.selected}>
          <div className="mb-4 flex items-center justify-between gap-2 rounded-xl border border-slate-800 bg-slate-900/60 p-3"><div><p className="text-xs font-bold text-white">{t.caseName}</p><p className="mt-1 text-[9px] text-slate-500">{t.caseId}</p></div><span className="rounded-full border border-amber-400/20 bg-amber-400/10 px-2 py-1 text-[9px] text-amber-200">{t.sample}</span></div>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">{[[t.asset, 'Not selected'], [t.frequency, t.notSet], [t.duration, t.notSet], [t.preferredDate, '—'], [t.startDate, '—'], [t.documents, 'Not uploaded']].map(([label, value]) => <div key={label} className="rounded-xl border border-white/5 bg-slate-900/50 p-3"><p className="text-[9px] text-slate-500">{label}</p><p className="mt-1 text-[11px] font-semibold leading-5 text-slate-200">{value}</p></div>)}</div>
          <p className="mt-3 text-[10px] leading-5 text-slate-500">{t.dateNote}</p><p className="mt-2 text-[10px] leading-5 text-amber-200/80">{t.docNote}</p>
        </Panel>

        <Panel icon={FileText} title={t.draft}>
          <p className="mb-4 text-[11px] leading-5 text-slate-400">{t.draftText}</p>
          <label className="mb-2 block text-[10px] font-bold text-slate-300">{t.language}</label>
          <select value={docLanguage} onChange={e => setDocLanguage(e.target.value)} className="mb-4 w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2.5 text-xs text-white"><option value="both">{t.both}</option><option value="en">{t.enOnly}</option><option value="te">{t.teOnly}</option></select>
          <p className="mb-2 text-[10px] font-bold text-slate-300">{t.clauses}</p><div className="space-y-2">{t.clauseList.map((item, i) => <div key={item} className="flex items-start gap-2 rounded-lg bg-slate-900/60 px-3 py-2"><span className="mt-0.5 text-[9px] font-black text-amber-300">{String(i + 1).padStart(2, '0')}</span><p className="text-[10px] leading-4 text-slate-300">{item}</p></div>)}</div>
          <button type="button" disabled className="mt-4 inline-flex w-full cursor-not-allowed items-center justify-center gap-2 rounded-xl bg-slate-800 px-4 py-3 text-xs font-extrabold text-slate-500"><LockKeyhole size={14}/>{t.create} · {t.disabled}</button>
          <p className="mt-2 text-[10px] leading-5 text-slate-500">{t.adminOnlyText}</p>
        </Panel>
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <Panel icon={ShieldCheck} title={t.security}>
          <div className="space-y-2">{t.securityList.map(item => <div key={item} className="flex items-start gap-2 text-[11px] leading-5 text-slate-300"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300"/>{item}</div>)}</div>
          <div className="mt-4 rounded-xl border border-amber-400/20 bg-amber-400/5 p-3"><p className="text-[10px] font-bold text-amber-200">{t.adminOnly}</p><p className="mt-1 text-[10px] leading-5 text-slate-400">{t.adminOnlyText}</p></div>
        </Panel>
        <Panel icon={History} title={t.audit}>
          <div className="space-y-2">{t.auditRows.map(([time, event, actor]) => <div key={event} className="grid grid-cols-[48px_1fr_auto] gap-2 rounded-lg border border-white/5 bg-slate-900/60 px-3 py-3"><span className="text-[10px] font-mono text-slate-500">{time}</span><span className="text-[10px] font-semibold text-slate-200">{event}</span><span className="text-[9px] text-slate-500">{actor}</span></div>)}</div>
          <p className="mt-3 text-[10px] leading-5 text-slate-500">These are illustrative sample events, not a live audit log. Production audit records must be created server-side and protected against editing.</p>
        </Panel>
      </div>

      <Panel icon={ShieldCheck} title={t.legal}>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">{t.legalList.map((item, i) => <label key={item} className="flex items-start gap-2 rounded-xl border border-white/5 bg-slate-900/50 p-3 text-[10px] leading-5 text-slate-300"><input type="checkbox" checked={checked.includes(i)} onChange={e => setChecked(old => e.target.checked ? [...old, i] : old.filter(x => x !== i))} className="mt-1 accent-amber-400"/>{item}</label>)}</div>
        <p className="mt-3 rounded-lg border border-amber-400/20 bg-amber-400/5 p-3 text-[10px] leading-5 text-amber-100/90">{t.legalNote}</p>
      </Panel>

      <footer className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-slate-950/70 p-4 sm:flex-row sm:items-center sm:justify-between"><div className="flex items-start gap-2"><Clock3 className="mt-0.5 h-4 w-4 shrink-0 text-amber-300"/><div><p className="text-xs font-bold text-white">{t.next}</p><p className="mt-1 max-w-3xl text-[10px] leading-5 text-slate-400">{t.nextText}</p></div></div><div className="flex flex-wrap gap-2"><a href="/" className="rounded-xl border border-white/15 px-3 py-2 text-[10px] font-bold text-slate-300">{t.back}</a><a href="/eligibility" className="inline-flex items-center gap-1 rounded-xl bg-amber-400 px-3 py-2 text-[10px] font-extrabold text-slate-950">{t.form}<ArrowRight size={12}/></a></div></footer>
    </div>
  </div>
}
