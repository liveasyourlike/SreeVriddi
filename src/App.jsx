import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { SreeVriddhiProvider } from './context/SreeVriddhiContext'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import Breadcrumbs from './components/layout/Breadcrumbs'
import SectionErrorBoundary from './components/SectionErrorBoundary'
import ComingSoonFeature from './components/ComingSoonFeature'

import Home from './pages/public/Home'
import About from './pages/public/About'
import HowItWorks from './pages/public/HowItWorks'
import Assets from './pages/public/Assets'
import AssetDetail from './pages/public/AssetDetail'
import Products from './pages/public/Products'
import ProductDetail from './pages/public/ProductDetail'
import EligibilityChecker from './pages/public/EligibilityChecker'
import WhyUs from './pages/public/WhyUs'
import Protection from './pages/public/Protection'
import Gallery from './pages/public/Gallery'
import FAQ from './pages/public/FAQ'
import Insights from './pages/public/Insights'
import ArticleDetail from './pages/public/ArticleDetail'
import Contact from './pages/public/Contact'
import Grievances from './pages/public/Grievances'
import ChatWidget from './components/ChatWidget'

const crmFeatures = [
  'Customer and lead management', 'Customer 360 profile', 'Asset and valuation management',
  'Application and product management', 'Contracts and settlements', 'Risk and compliance workflows',
  'Document management', 'Gallery and content management', 'Reports and dashboards', 'Audit logs and settings'
]

const portalFeatures = [
  'Secure customer login', 'Application tracking', 'Asset and contract details', 'Settlement information',
  'Document vault', 'Notifications', 'Profile management', 'Support tickets'
]

function App() {
  return (
    <SreeVriddhiProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)]">
          <Header />
          <Breadcrumbs />
          <main className="min-h-[70vh]">
            <SectionErrorBoundary>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/how-it-works" element={<HowItWorks />} />
                <Route path="/assets" element={<Assets />} />
                <Route path="/assets/:type" element={<AssetDetail />} />
                <Route path="/products" element={<Products />} />
                <Route path="/products/:slug" element={<ProductDetail />} />
                <Route path="/eligibility" element={<EligibilityChecker />} />
                <Route path="/why-us" element={<WhyUs />} />
                <Route path="/protection" element={<Protection />} />
                <Route path="/gallery" element={<Gallery />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/insights" element={<Insights />} />
                <Route path="/insights/:slug" element={<ArticleDetail />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/grievances" element={<Grievances />} />
                <Route path="/login" element={<ComingSoonFeature secure title="Customer Login & Portal" description="Secure customer login and the complete customer CRM portal are being prepared for launch. All portal capabilities remain part of the product, but account data and values are intentionally hidden until final security and workflow validation is complete." features={portalFeatures} />} />
                <Route path="/portal/*" element={<ComingSoonFeature secure title="Customer CRM Portal" description="Your secure customer workspace is coming soon. The full portal experience is retained for launch, but no customer records, balances, contracts or financial values are displayed at this stage." features={portalFeatures} />} />
                <Route path="/admin/*" element={<ComingSoonFeature secure title="Admin CRM" description="The complete internal CRM is being prepared for controlled launch. All planned CRM modules remain in the application, but administrative records, reports, valuations and operational values are hidden from public access until final security and permission validation." features={crmFeatures} />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </SectionErrorBoundary>
          </main>
          <Footer />
          <ChatWidget />
        </div>
      </BrowserRouter>
    </SreeVriddhiProvider>
  )
}

export default App
