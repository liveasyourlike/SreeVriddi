import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { SreeVriddhiProvider } from './context/SreeVriddhiContext'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import Breadcrumbs from './components/layout/Breadcrumbs'
import CustomerPortalLayout from './components/layout/CustomerPortalLayout'
import SectionErrorBoundary from './components/SectionErrorBoundary'
import InvestmentAllocationHero3D from './components/InvestmentAllocationHero3D'
import MobileJourneyBar from './components/MobileJourneyBar'
import ScrollToTop from './components/ScrollToTop'
import ChatWidget from './components/ChatWidget'
import AdvancedHomeExplorer from './components/AdvancedHomeExplorer'
import LiveMarketTable from './components/LiveMarketTable'
import ComingSoonNotice from './components/ComingSoonNotice'
import EligibilityFormPage from './pages/public/EligibilityFormPage'
import './styles/ux-business-journey-2.css'

import Home from './pages/public/Home'
import About from './pages/public/About'
import HowItWorks from './pages/public/HowItWorks'
import Assets from './pages/public/Assets'
import AssetDetail from './pages/public/AssetDetail'
import Products from './pages/public/Products'
import ProductDetail from './pages/public/ProductDetail'
import WhyUs from './pages/public/WhyUs'
import Protection from './pages/public/Protection'
import Gallery from './pages/public/Gallery'
import FAQ from './pages/public/FAQ'
import Insights from './pages/public/Insights'
import ArticleDetail from './pages/public/ArticleDetail'
import Contact from './pages/public/Contact'
import Grievances from './pages/public/Grievances'
import Privacy from './pages/public/Privacy'

import CustomerDashboard from './pages/portal/CustomerDashboard'
import MyApplications from './pages/portal/MyApplications'
import NewApplication from './pages/portal/NewApplication'
import MyAssets from './pages/portal/MyAssets'
import MyContracts from './pages/portal/MyContracts'
import MySettlements from './pages/portal/MySettlements'
import DocumentsVault from './pages/portal/DocumentsVault'
import Notifications from './pages/portal/Notifications'
import Profile from './pages/portal/Profile'
import SupportTickets from './pages/portal/SupportTickets'

function HomeExplorerLanding() {
  return (
    <div className="space-y-8 pb-16">
      <InvestmentAllocationHero3D />
      <AdvancedHomeExplorer />
      <section className="max-w-4xl mx-auto px-4 text-center">
        <div className="rounded-2xl border border-slate-800 bg-slate-950/60 px-6 py-5">
          <p className="text-xs text-slate-400">Want to read the complete original homepage content in one place?</p>
          <a href="/home-details" className="mt-2 inline-flex items-center gap-2 text-xs font-bold text-amber-300 hover:text-amber-200">Open complete homepage details →</a>
        </div>
      </section>
    </div>
  )
}

function MarketSnapshot() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-6">
        <span className="text-xs font-extrabold uppercase tracking-widest text-amber-400">India Market Snapshot</span>
        <h1 className="mt-2 text-3xl font-bold font-serif-brand text-white">India Market Snapshot</h1>
        <p className="mt-2 text-sm text-slate-400">The existing market snapshot component is shown here without changing its underlying content or values.</p>
      </div>
      <LiveMarketTable />
    </section>
  )
}

function CRMComingSoon({ title, message }) {
  return (
    <section className="min-h-[70vh] flex items-center justify-center px-4 py-12">
      <ComingSoonNotice title={title} message={message} />
    </section>
  )
}

function App() {
  return (
    <SreeVriddhiProvider>
      <BrowserRouter>
        <ScrollToTop />
        <div className="compact-site min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)]">
          <Header />
          <Breadcrumbs />
          <main className="min-h-[70vh]">
            <SectionErrorBoundary>
              <Routes>
                <Route path="/" element={<HomeExplorerLanding />} />
                <Route path="/home-details" element={<Home />} />
                <Route path="/market-snapshot" element={<MarketSnapshot />} />
                <Route path="/about" element={<About />} />
                <Route path="/how-it-works" element={<HowItWorks />} />
                <Route path="/assets" element={<Assets />} />
                <Route path="/assets/:type" element={<AssetDetail />} />
                <Route path="/products" element={<Products />} />
                <Route path="/products/:slug" element={<ProductDetail />} />
                <Route path="/eligibility" element={<EligibilityFormPage />} />
                <Route path="/eligibility/evaluation" element={<Navigate to="/eligibility" replace />} />
                <Route path="/why-us" element={<WhyUs />} />
                <Route path="/protection" element={<Protection />} />
                <Route path="/gallery" element={<Gallery />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/insights" element={<Insights />} />
                <Route path="/insights/:slug" element={<ArticleDetail />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/login" element={<CRMComingSoon title="Portal & CRM Login — Coming Soon" message="Portal and CRM login are temporarily unavailable. The existing CRM implementation is preserved and will be re-enabled in a future release." />} />
                <Route path="/grievances" element={<Grievances />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/portal" element={<CustomerPortalLayout />}>
                  <Route index element={<CustomerDashboard />} /><Route path="applications" element={<MyApplications />} /><Route path="applications/new" element={<NewApplication />} /><Route path="assets" element={<MyAssets />} /><Route path="contracts" element={<MyContracts />} /><Route path="settlements" element={<MySettlements />} /><Route path="documents" element={<DocumentsVault />} /><Route path="notifications" element={<Notifications />} /><Route path="profile" element={<Profile />} /><Route path="support" element={<SupportTickets />} />
                </Route>
                <Route path="/admin" element={<CRMComingSoon title="Admin & CRM — Coming Soon" message="The Admin and CRM workspace is temporarily unavailable. Existing CRM features are preserved for a future release." />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </SectionErrorBoundary>
          </main>
          <Footer />
          <ChatWidget />
          <MobileJourneyBar />
        </div>
      </BrowserRouter>
    </SreeVriddhiProvider>
  )
}

export default App
