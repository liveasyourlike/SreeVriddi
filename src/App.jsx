import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { SreeVriddhiProvider } from './context/SreeVriddhiContext'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import Breadcrumbs from './components/layout/Breadcrumbs'
import SectionErrorBoundary from './components/SectionErrorBoundary'
import MobileJourneyBar from './components/MobileJourneyBar'
import ScrollToTop from './components/ScrollToTop'
import ChatWidget from './components/ChatWidget'
import ComingSoonNotice from './components/ComingSoonNotice'
import WebsiteExperienceLayer from './components/WebsiteExperienceLayer'
import PersistentExperienceDock from './components/PersistentExperienceDock'
import PolicyLaunchNotice from './components/PolicyLaunchNotice'
import GoogleEvaluationForm from './pages/public/GoogleEvaluationForm'
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
import './styles/preview-quality-overrides.css'

function CRMComingSoon({ title, message }) {
  return <section className="min-h-[70vh] flex items-center justify-center px-4 py-12"><ComingSoonNotice title={title} message={message} /></section>
}

function SiteChrome() {
  const location = useLocation()
  const isHome = location.pathname === '/'
  return <>
    {!isHome && <><Header /><Breadcrumbs /></>}
    <main className="min-h-[70vh]"><SectionErrorBoundary><Routes>
      <Route path="/" element={<HomeHub />} />
      <Route path="/home-details" element={<HomeHub />} />
      <Route path="/home-original" element={<Home />} />
      <Route path="/market-snapshot" element={<Navigate to="/assets" replace />} />
      <Route path="/about" element={<About />} />
      <Route path="/how-it-works" element={<HowItWorks />} />
      <Route path="/assets" element={<Assets />} />
      <Route path="/assets/:type" element={<AssetDetail />} />
      <Route path="/products" element={<Products />} />
      <Route path="/products/:slug" element={<ProductDetail />} />
      <Route path="/eligibility" element={<GoogleEvaluationForm />} />
      <Route path="/eligibility/evaluation" element={<GoogleEvaluationForm />} />
      <Route path="/why-us" element={<WhyUs />} />
      <Route path="/protection" element={<Protection />} />
      <Route path="/gallery" element={<Gallery />} />
      <Route path="/faq" element={<FAQ />} />
      <Route path="/insights" element={<Insights />} />
      <Route path="/insights/:slug" element={<ArticleDetail />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/login" element={<CRMComingSoon title="Portal & CRM Login — Coming Soon" message="Customer portal and CRM access are temporarily unavailable while secure authentication is being prepared." />} />
      <Route path="/admin" element={<CRMComingSoon title="Admin & CRM — Coming Soon" message="Admin and CRM access will be enabled after the secure authentication and data services are ready." />} />
      <Route path="/portal/*" element={<CRMComingSoon title="Customer Portal — Coming Soon" message="Customer portal access is temporarily closed. Your public evaluation and contact options remain available." />} />
      <Route path="/grievances" element={<Grievances />} />
      <Route path="/privacy" element={<Privacy />} />
      <Route path="/terms" element={<Terms />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes></SectionErrorBoundary></main>
    <Footer />
    <ChatWidget />
    {!isHome && <MobileJourneyBar />}
  </>
}

function App() {
  return <SreeVriddhiProvider><BrowserRouter><ScrollToTop /><div className="compact-site min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)]"><WebsiteExperienceLayer /><PolicyLaunchNotice /><SiteChrome /><PersistentExperienceDock /></div></BrowserRouter></SreeVriddhiProvider>
}

export default App
