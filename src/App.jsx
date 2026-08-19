import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { SreeVriddhiProvider } from './context/SreeVriddhiContext'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import Breadcrumbs from './components/layout/Breadcrumbs'
import CustomerPortalLayout from './components/layout/CustomerPortalLayout'
import SectionErrorBoundary from './components/SectionErrorBoundary'
import MobileJourneyBar from './components/MobileJourneyBar'
import ScrollToTop from './components/ScrollToTop'
import ChatWidget from './components/ChatWidget'
import ComingSoonNotice from './components/ComingSoonNotice'
import WebsiteExperienceLayer from './components/WebsiteExperienceLayer'
import PersistentExperienceDock from './components/PersistentExperienceDock'
import EligibilityFormPage from './pages/public/EligibilityFormPage'
import HomeHub from './pages/public/HomeHub'
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
import Terms from './pages/public/Terms'
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

function CRMComingSoon({ title, message }) { return <section className="min-h-[70vh] flex items-center justify-center px-4 py-12"><ComingSoonNotice title={title} message={message} /></section> }

function SiteChrome() {
  const location = useLocation()
  const isHome = location.pathname === '/'
  return <>
    {!isHome && <><Header /><Breadcrumbs /></>}
    <main className="min-h-[70vh]"><SectionErrorBoundary><Routes>
      <Route path="/" element={<HomeHub />} /><Route path="/home-details" element={<HomeHub />} /><Route path="/home-original" element={<Home />} />
      <Route path="/market-snapshot" element={<Navigate to="/assets" replace />} /><Route path="/about" element={<About />} /><Route path="/how-it-works" element={<HowItWorks />} /><Route path="/assets" element={<Assets />} /><Route path="/assets/:type" element={<AssetDetail />} /><Route path="/products" element={<Products />} /><Route path="/products/:slug" element={<ProductDetail />} /><Route path="/eligibility" element={<EligibilityFormPage />} /><Route path="/eligibility/evaluation" element={<Navigate to="/eligibility" replace />} /><Route path="/why-us" element={<WhyUs />} /><Route path="/protection" element={<Protection />} /><Route path="/gallery" element={<Gallery />} /><Route path="/faq" element={<FAQ />} /><Route path="/insights" element={<Insights />} /><Route path="/insights/:slug" element={<ArticleDetail />} /><Route path="/contact" element={<Contact />} /><Route path="/login" element={<CRMComingSoon title="Portal & CRM Login — Coming Soon" message="Portal and CRM login are temporarily unavailable. The existing CRM implementation is preserved and will be re-enabled in a future release." />} /><Route path="/grievances" element={<Grievances />} /><Route path="/privacy" element={<Privacy />} /><Route path="/terms" element={<Terms />} />
      <Route path="/portal" element={<CustomerPortalLayout />}><Route index element={<CustomerDashboard />} /><Route path="applications" element={<MyApplications />} /><Route path="applications/new" element={<NewApplication />} /><Route path="assets" element={<MyAssets />} /><Route path="contracts" element={<MyContracts />} /><Route path="settlements" element={<MySettlements />} /><Route path="documents" element={<DocumentsVault />} /><Route path="notifications" element={<Notifications />} /><Route path="profile" element={<Profile />} /><Route path="support" element={<SupportTickets />} /></Route>
      <Route path="/admin" element={<CRMComingSoon title="Admin & CRM — Coming Soon" message="The Admin and CRM workspace is temporarily unavailable. Existing CRM features are preserved for a future release." />} /><Route path="*" element={<Navigate to="/" replace />} />
    </Routes></SectionErrorBoundary></main>
    <Footer />
    <ChatWidget />
    {!isHome && <MobileJourneyBar />}
  </>
}

function App() { return <SreeVriddhiProvider><BrowserRouter><ScrollToTop /><div className="compact-site min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)]"><WebsiteExperienceLayer /><SiteChrome /><PersistentExperienceDock /></div></BrowserRouter></SreeVriddhiProvider> }
export default App
