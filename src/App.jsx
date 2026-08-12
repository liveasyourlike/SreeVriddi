import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { SreeVriddhiProvider } from './context/SreeVriddhiContext'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import Breadcrumbs from './components/layout/Breadcrumbs'
import AdminLayout from './components/layout/AdminLayout'
import CustomerPortalLayout from './components/layout/CustomerPortalLayout'
import SectionErrorBoundary from './components/SectionErrorBoundary'
import InvestmentAllocationShowcase from './components/InvestmentAllocationShowcase'

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
import Login from './pages/public/Login'
import Grievances from './pages/public/Grievances'

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

import AdminDashboard from './pages/admin/AdminDashboard'
import LeadManagement from './pages/admin/LeadManagement'
import Customer360 from './pages/admin/Customer360'
import AssetManagement from './pages/admin/AssetManagement'
import ValuationEngine from './pages/admin/ValuationEngine'
import ApplicationManager from './pages/admin/ApplicationManager'
import ProductManager from './pages/admin/ProductManager'
import ContractManager from './pages/admin/ContractManager'
import SettlementEngine from './pages/admin/SettlementEngine'
import RiskMatrix from './pages/admin/RiskMatrix'
import ComplianceManager from './pages/admin/ComplianceManager'
import DocumentManager from './pages/admin/DocumentManager'
import InsightsCMS from './pages/admin/InsightsCMS'
import GalleryManager from './pages/admin/GalleryManager'
import CRMReports from './pages/admin/CRMReports'
import AuditLog from './pages/admin/AuditLog'
import AdminSettings from './pages/admin/AdminSettings'
import AdminTranslations from './pages/admin/AdminTranslations'
import ChatWidget from './components/ChatWidget'

function HomeStep1() {
  return (
    <>
      <Home />
      <InvestmentAllocationShowcase />
    </>
  )
}

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
                <Route path="/" element={<HomeStep1 />} />
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
                <Route path="/login" element={<Login />} />
                <Route path="/grievances" element={<Grievances />} />
                <Route path="/portal" element={<CustomerPortalLayout />}>
                  <Route index element={<CustomerDashboard />} /><Route path="applications" element={<MyApplications />} /><Route path="applications/new" element={<NewApplication />} /><Route path="assets" element={<MyAssets />} /><Route path="contracts" element={<MyContracts />} /><Route path="settlements" element={<MySettlements />} /><Route path="documents" element={<DocumentsVault />} /><Route path="notifications" element={<Notifications />} /><Route path="profile" element={<Profile />} /><Route path="support" element={<SupportTickets />} />
                </Route>
                <Route path="/admin" element={<AdminLayout />}>
                  <Route index element={<AdminDashboard />} /><Route path="leads" element={<LeadManagement />} /><Route path="customers" element={<Customer360 />} /><Route path="assets" element={<AssetManagement />} /><Route path="valuations" element={<ValuationEngine />} /><Route path="applications" element={<ApplicationManager />} /><Route path="products" element={<ProductManager />} /><Route path="contracts" element={<ContractManager />} /><Route path="settlements" element={<SettlementEngine />} /><Route path="risk" element={<RiskMatrix />} /><Route path="compliance" element={<ComplianceManager />} /><Route path="documents" element={<DocumentManager />} /><Route path="content" element={<InsightsCMS />} /><Route path="gallery" element={<GalleryManager />} /><Route path="reports" element={<CRMReports />} /><Route path="audit" element={<AuditLog />} /><Route path="settings" element={<AdminSettings />} /><Route path="translations" element={<AdminTranslations />} />
                </Route>
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
