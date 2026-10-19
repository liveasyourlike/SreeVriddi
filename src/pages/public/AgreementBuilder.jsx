import { useEffect, useRef, useState } from 'react'
import { FileSignature, Printer, RotateCcw, ShieldCheck, Download, ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'

const SUPPORT_EMAIL = 'sreevriddhiforwealth@gmail.com'
const SUPPORT_PHONE = '+91 9640352929'

const initial = {
  date: new Date().toISOString().slice(0, 10),
  customerName: '', phone: '', email: '', pan: '', address: '',
  assetType: 'Capital / Money', assetDescription: '',
  amount: '', rate: '', frequency: 'Monthly', settlementDate1: '', settlementDate2: '',
  startDate: '', tenure: 'More than 1 year', maturityDate: '',
  paymentMode: 'Bank transfer', paymentDetails: '',
  businessPurpose: '', specialTerms: '',
}

const esc = (value = '') => String(value).replace(/[&<>"']/g, (ch) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[ch])
const prettyDate = (value) => value ? new Date(value + 'T00:00:00').toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) : 'To be agreed in writing'
const money = (value) => value ? new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 2 }).format(Number(value)) : 'As stated in the signed agreement'

function SignaturePad({ title, value, onChange }) {
  const canvasRef = useRef(null)
  const drawing = useRef(false)
  const lastPoint = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const ratio = Math.max(window.devicePixelRatio || 1, 1)
    const rect = canvas.getBoundingClientRect()
    canvas.width = Math.round(rect.width * ratio)
    canvas.height = Math.round(150 * ratio)
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0)
    ctx.lineWidth = 2.2
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
    ctx.strokeStyle = '#111827'
    if (value) {
      const img = new Image()
      img.onload = () => ctx.drawImage(img, 0, 0, rect.width, 150)
      img.src = value
    }
  }, [])

  const point = (event) => {
    const rect = canvasRef.current.getBoundingClientRect()
    return { x: event.clientX - rect.left, y: event.clientY - rect.top }
  }
  const start = (event) => {
    event.preventDefault()
    const canvas = canvasRef.current
    canvas.setPointerCapture?.(event.pointerId)
    drawing.current = true
    lastPoint.current = point(event)
  }
  const move = (event) => {
    if (!drawing.current) return
    event.preventDefault()
    const ctx = canvasRef.current.getContext('2d')
    const next = point(event)
    ctx.beginPath()
    ctx.moveTo(lastPoint.current.x, lastPoint.current.y)
    ctx.lineTo(next.x, next.y)
    ctx.stroke()
    lastPoint.current = next
  }
  const end = () => {
    if (!drawing.current) return
    drawing.current = false
    lastPoint.current = null
    onChange(canvasRef.current.toDataURL('image/png'))
  }
  const clear = () => {
    const canvas = canvasRef.current
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
    onChange('')
  }

  return <div className="rounded-2xl border border-slate-700 bg-white p-3">
    <div className="mb-2 flex items-center justify-between gap-2"><span className="text-xs font-bold text-slate-800">{title}</span><button type="button" onClick={clear} className="inline-flex items-center gap-1 rounded-lg px-2 py-1 text-[10px] font-bold text-slate-600 hover:bg-slate-100"><RotateCcw size={12}/> Clear</button></div>
    <canvas ref={canvasRef} onPointerDown={start} onPointerMove={move} onPointerUp={end} onPointerCancel={end} onPointerLeave={end} aria-label={title + ' signature pad'} className="block h-[150px] w-full cursor-crosshair touch-none rounded-lg border border-dashed border-slate-300 bg-white"/>
    <p className="mt-2 text-[10px] text-slate-500">Draw with your finger, stylus or mouse.</p>
  </div>
}

function field(label, key, data, setData, options = {}) {
  const common = 'mt-1 w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2.5 text-sm text-slate-100 outline-none transition focus:border-amber-400 focus:ring-2 focus:ring-amber-400/10'
  return <label key={key} className={options.className || 'block text-xs font-semibold text-slate-300'}>{label}{options.required && <span className="text-amber-300"> *</span>}{options.type === 'select' ? <select required={options.required} value={data[key]} onChange={(e) => setData({ ...data, [key]: e.target.value })} className={common}>{options.choices.map((item) => <option key={item} value={item}>{item}</option>)}</select> : options.type === 'textarea' ? <textarea required={options.required} rows={options.rows || 3} value={data[key]} onChange={(e) => setData({ ...data, [key]: e.target.value })} placeholder={options.placeholder || ''} className={common}/> : <input required={options.required} type={options.type || 'text'} min={options.min} max={options.max} step={options.step} value={data[key]} onChange={(e) => setData({ ...data, [key]: e.target.value })} placeholder={options.placeholder || ''} className={common}/>}</label>
}

export default function AgreementBuilder() {
  const [data, setData] = useState(initial)
  const [customerSignature, setCustomerSignature] = useState('')
  const [representativeSignature, setRepresentativeSignature] = useState('')
  const [accepted, setAccepted] = useState(false)
  const [message, setMessage] = useState('')

  const generateAgreement = () => {
    if (!data.customerName.trim() || !data.phone.trim() || !data.amount || !data.startDate || !data.tenure || !customerSignature || !representativeSignature || !accepted) {
      setMessage('Complete the required fields, draw both signatures, and acknowledge the terms before creating the document.')
      return
    }
    const ref = 'SV-' + new Date().toISOString().slice(0, 10).replaceAll('-', '') + '-' + Math.random().toString(36).slice(2, 6).toUpperCase()
    const rows = [
      ['Agreement reference', ref], ['Agreement date', prettyDate(data.date)], ['Customer full name', data.customerName],
      ['Phone', data.phone], ['Email', data.email || 'Not provided'], ['PAN', data.pan || 'Not provided'],
      ['Permanent address', data.address || 'To be recorded separately'], ['Asset / arrangement category', data.assetType],
      ['Asset / business details', data.assetDescription || 'As mutually documented'], ['Agreed amount', money(data.amount)],
      ['Agreed rate / settlement terms', data.rate || 'Must be expressly completed and agreed by both parties'],
      ['Settlement frequency', data.frequency], ['Preferred settlement date(s)', [data.settlementDate1, data.settlementDate2].filter(Boolean).join(' and ') || 'As agreed in writing'],
      ['Start date', prettyDate(data.startDate)], ['Contract tenure', data.tenure], ['Maturity / end date', prettyDate(data.maturityDate)],
      ['Payment method', data.paymentMode], ['Payment reference/details', data.paymentDetails || 'To be recorded on payment'],
      ['Business purpose', data.businessPurpose || 'As mutually agreed'], ['Additional written terms', data.specialTerms || 'None specified'],
    ]
    const rowHtml = rows.map(([k, v]) => '<tr><th>' + esc(k) + '</th><td>' + esc(v) + '</td></tr>').join('')
    const html = `<!doctype html><html><head><meta charset="utf-8"><title>Sree Vriddhi Agreement ${esc(ref)}</title><style>
      @page{size:A4;margin:16mm}*{box-sizing:border-box}body{font-family:Arial,sans-serif;color:#172033;font-size:10.5pt;line-height:1.5}h1{font-size:23pt;margin:0;color:#111827}h2{font-size:13pt;margin:20px 0 6px;color:#172033}.brand{color:#9a6700;font-size:10pt;font-weight:bold;letter-spacing:2px;text-transform:uppercase}.sub{color:#5b6472;font-size:9pt;margin:5px 0 18px}.notice{background:#fff8e6;border:1px solid #ead49a;padding:10px;border-radius:6px;font-size:9pt}table{width:100%;border-collapse:collapse;margin-top:14px}th,td{border:1px solid #d8dee8;padding:7px;text-align:left;vertical-align:top}th{width:34%;background:#f5f6f8;font-weight:bold}.clause{margin:8px 0}.signatures{display:grid;grid-template-columns:1fr 1fr;gap:24px;margin-top:18px}.signature{border:1px solid #d8dee8;border-radius:6px;padding:10px;min-height:150px}.signature img{display:block;max-width:100%;height:80px;object-fit:contain;object-position:left center;border-bottom:1px solid #9ca3af}.signline{margin-top:8px;font-weight:bold}.small{font-size:8.5pt;color:#4b5563}.footer{border-top:1px solid #d8dee8;margin-top:22px;padding-top:9px;font-size:8pt;color:#6b7280}@media print{button{display:none}}
      </style></head><body><div class="brand">Sree Vriddhi Value Management</div><h1>Business Arrangement Agreement</h1><p class="sub">Reference: ${esc(ref)} · Prepared on ${esc(prettyDate(data.date))}</p><div class="notice"><strong>Important:</strong> This is a draft record of the terms entered by the parties. It is not a substitute for legal review, regulatory checks, or any mandatory stamp duty / registration. Do not sign until all material terms are completed, understood, and accepted by both parties.</div><h2>1. Agreed details</h2><table>${rowHtml}</table><h2>2. Terms and acknowledgements</h2>
      <p class="clause"><strong>2.1 Written terms.</strong> The parties should rely only on the final terms recorded in this agreement and its duly signed attachments. Any change must be recorded in writing and accepted by both parties.</p>
      <p class="clause"><strong>2.2 Risk and no unsupported promises.</strong> The customer acknowledges that business arrangements may involve financial, operational, liquidity, counterparty and loss risks. No return, repayment, capital protection or payment date should be treated as guaranteed unless expressly stated in a legally valid agreement and permitted by applicable law.</p>
      <p class="clause"><strong>2.3 Settlement and maturity.</strong> The agreed rate, calculation basis, settlement dates, deductions (if any), maturity amount, withdrawal / early termination conditions and consequences of delayed payment must be completed clearly before signing. If any item is unclear or blank, the parties should not sign until it is resolved.</p>
      <p class="clause"><strong>2.4 Customer information and payment safety.</strong> Each party confirms that details supplied by them are accurate. Payments must be made only to independently verified payment details. Neither party should request or disclose OTPs, PINs, CVVs or online banking passwords.</p>
      <p class="clause"><strong>2.5 Voluntary decision and advice.</strong> Each party confirms they had the opportunity to ask questions, read the document and seek independent legal, financial and tax advice. This document does not waive rights or protections available under applicable law.</p>
      <p class="clause"><strong>2.6 Disputes and governing law.</strong> The governing law, jurisdiction, notice method and dispute-resolution process should be completed by qualified counsel for the specific arrangement before execution.</p>
      <h2>3. Signatures</h2><p>By signing, each party confirms that they have reviewed the details above and agree to the completed terms, subject to applicable law.</p><div class="signatures"><div class="signature"><img src="${customerSignature}" alt="Customer signature"><div class="signline">Customer / Investor</div><div>${esc(data.customerName)}</div><div class="small">Date: ${esc(prettyDate(data.date))}</div></div><div class="signature"><img src="${representativeSignature}" alt="Business representative signature"><div class="signline">Sree Vriddhi Representative</div><div>Authorized representative</div><div class="small">Date: ${esc(prettyDate(data.date))}</div></div></div>
      <div class="footer">Sree Vriddhi · ${esc(SUPPORT_PHONE)} · ${esc(SUPPORT_EMAIL)}<br>This document was generated from information entered by the parties. Keep a copy of the completed agreement and all attachments.</div><script>window.onload=()=>setTimeout(()=>window.print(),350)</script></body></html>`
    const popup = window.open('', '_blank')
    if (!popup) {
      setMessage('Your browser blocked the document window. Allow pop-ups for this website and try again.')
      return
    }
    popup.document.open()
    popup.document.write(html)
    popup.document.close()
    setMessage('Agreement opened in a new tab. Choose “Save as PDF” in the print dialog to keep a copy.')
  }

  const reset = () => {
    setData({ ...initial, date: new Date().toISOString().slice(0, 10) })
    setCustomerSignature('')
    setRepresentativeSignature('')
    setAccepted(false)
    setMessage('')
  }

  return <main className="min-h-[70vh] bg-slate-950 px-4 py-8 sm:px-6 lg:px-8 text-slate-100">
    <div className="mx-auto max-w-5xl">
      <Link to="/" className="mb-5 inline-flex items-center gap-2 text-xs font-bold text-amber-300 hover:text-amber-200"><ArrowLeftIcon/> Back to Sree Vriddhi</Link>
      <section className="rounded-2xl border border-amber-400/25 bg-gradient-to-br from-slate-900 to-slate-950 p-5 sm:p-7 shadow-2xl">
        <div className="flex items-start gap-3"><div className="rounded-xl border border-amber-300/30 bg-amber-300/10 p-2.5 text-amber-300"><FileSignature size={22}/></div><div><p className="text-[10px] font-black uppercase tracking-[.2em] text-amber-300">Sree Vriddhi · Document Workspace</p><h1 className="mt-1 text-2xl sm:text-3xl font-extrabold font-serif-brand">Business Arrangement Agreement</h1><p className="mt-2 max-w-3xl text-sm leading-6 text-slate-300">Complete the details, review the acknowledgements, and collect both signatures directly on screen. The document is generated in a new tab for printing or saving as PDF.</p></div></div>
        <div className="mt-5 rounded-xl border border-amber-300/20 bg-amber-300/[.06] p-3 text-xs leading-5 text-amber-100"><ShieldCheck size={15} className="mr-1 inline"/> Drafting tool only. It does not verify identity, store a signed record on a server, or provide DocuSign-equivalent audit evidence. Have an Indian lawyer review the final terms and execution requirements before using it for a real transaction.</div>
      </section>

      <form className="mt-5 space-y-5" onSubmit={(e) => { e.preventDefault(); generateAgreement() }}>
        <section className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 sm:p-6"><h2 className="text-lg font-bold">1. Agreement and customer details</h2><div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {field('Agreement date','date',data,setData,{type:'date',required:true})}
          {field('Customer / investor full name','customerName',data,setData,{required:true})}
          {field('Phone number','phone',data,setData,{type:'tel',required:true,placeholder:'+91'})}
          {field('Email address','email',data,setData,{type:'email'})}
          {field('PAN (optional; avoid sharing unless required)','pan',data,setData,{placeholder:'PAN'})}
          {field('Permanent address','address',data,setData,{className:'block text-xs font-semibold text-slate-300 sm:col-span-2 lg:col-span-3',type:'textarea',rows:2})}
        </div></section>
        <section className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 sm:p-6"><h2 className="text-lg font-bold">2. Arrangement and settlement terms</h2><div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {field('Asset / arrangement category','assetType',data,setData,{type:'select',required:true,choices:['Capital / Money','Physical Gold','Land & Property','Financial Assets','Other']})}
          {field('Agreed amount (₹)','amount',data,setData,{type:'number',min:'1',step:'0.01',required:true,placeholder:'Amount in INR'})}
          {field('Agreed rate and calculation basis','rate',data,setData,{required:true,placeholder:'Enter the expressly agreed rate and calculation basis'})}
          {field('Settlement frequency','frequency',data,setData,{type:'select',required:true,choices:['Monthly','Twice in a month','Weekly','Other / as written in agreement']})}
          {field('Preferred settlement date 1 (no Sunday)','settlementDate1',data,setData,{type:'date'})}
          {field('Preferred settlement date 2 (if applicable; no Sunday)','settlementDate2',data,setData,{type:'date'})}
          {field('Business / investment start date','startDate',data,setData,{type:'date',required:true})}
          {field('Contract tenure','tenure',data,setData,{type:'select',required:true,choices:['More than 1 year','20 Months','30 Months','40 Months','Other — see special terms']})}
          {field('Maturity / end date','maturityDate',data,setData,{type:'date'})}
          {field('Payment method','paymentMode',data,setData,{type:'select',required:true,choices:['Bank transfer','UPI','Other — record in special terms']})}
          {field('Asset / business details','assetDescription',data,setData,{className:'block text-xs font-semibold text-slate-300 sm:col-span-2 lg:col-span-3',type:'textarea',rows:2,placeholder:'Describe the asset or arrangement relevant to this agreement'})}
          {field('Payment reference / verified payment details','paymentDetails',data,setData,{className:'block text-xs font-semibold text-slate-300 sm:col-span-2 lg:col-span-3',type:'textarea',rows:2,placeholder:'Record only the details required for the agreement. Do not enter PINs, OTPs or passwords.'})}
          {field('Business purpose','businessPurpose',data,setData,{className:'block text-xs font-semibold text-slate-300 sm:col-span-2 lg:col-span-3',type:'textarea',rows:2})}
          {field('Additional agreed terms / early exit / delay handling','specialTerms',data,setData,{className:'block text-xs font-semibold text-slate-300 sm:col-span-2 lg:col-span-3',type:'textarea',rows:3,placeholder:'Record all material conditions; do not leave settlement or withdrawal conditions ambiguous.'})}
        </div></section>
        <section className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 sm:p-6"><h2 className="text-lg font-bold">3. Signature collection</h2><p className="mt-1 text-xs leading-5 text-slate-400">Each signer should review the final terms before signing. Use the signature pads with a finger, stylus or mouse.</p><div className="mt-4 grid gap-4 lg:grid-cols-2"><SignaturePad title="Customer / Investor signature *" value={customerSignature} onChange={setCustomerSignature}/><SignaturePad title="Sree Vriddhi representative signature *" value={representativeSignature} onChange={setRepresentativeSignature}/></div>
          <label className="mt-5 flex items-start gap-3 rounded-xl border border-slate-700 bg-slate-950/70 p-4 text-xs leading-5 text-slate-300"><input type="checkbox" checked={accepted} onChange={(e)=>setAccepted(e.target.checked)} className="mt-1 accent-amber-400"/><span>I confirm that the entered details are accurate, both parties have reviewed the material terms, and the risk, settlement, maturity and early-exit conditions have been explained. I understand this generated draft must be reviewed for legal and regulatory suitability before it is relied upon.</span></label>
          {message && <p role="status" className="mt-4 rounded-xl border border-amber-300/20 bg-amber-300/[.06] p-3 text-xs text-amber-100">{message}</p>}
          <div className="mt-5 flex flex-col gap-3 sm:flex-row"><button type="submit" className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-400 to-amber-600 px-5 py-3 text-xs font-extrabold uppercase tracking-wider text-slate-950"><Printer size={16}/> Generate / Save as PDF</button><button type="button" onClick={reset} className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-700 px-5 py-3 text-xs font-bold text-slate-300 hover:bg-slate-800"><RotateCcw size={15}/> Clear form</button></div>
          <p className="mt-3 text-[10px] leading-5 text-slate-500">The information and drawn signatures remain in this browser page only; this prototype does not upload them or retain a server-side signed copy. Use a proper e-signature provider or secure backend with identity verification, timestamps, tamper-evident audit logs and controlled document storage before handling live customer agreements.</p>
        </section>
      </form>
      <p className="mt-5 text-center text-[10px] text-slate-500">Support: {SUPPORT_PHONE} · {SUPPORT_EMAIL}</p>
    </div>
  </main>
}

function ArrowLeftIcon() {
  return <span aria-hidden="true">←</span>
}
