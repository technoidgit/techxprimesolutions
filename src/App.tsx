import { useState, useEffect, lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeContext } from "./context/ThemeContext";
import { ContentContext } from "./context/ContentContext";
import { Service, Project, CaseStudy, BlogPost, Job, Testimonial, Partner } from "./types";
import { MessageCircle, Loader2 } from "lucide-react";

// Common Components
import ScrollToTop from "./components/common/ScrollToTop";
import ScrollToTopButton from "./components/common/ScrollToTopButton";
import Reveal from "./components/common/Reveal";

// Layout
import Layout from "./components/layout/Layout";

// Sections (Homepage)
import Hero from "./components/sections/Hero";
import About from "./components/sections/About";
import OurValues from "./components/sections/OurValues";
import WhyChooseUs from "./components/sections/WhyChooseUs";
import Expertise from "./components/sections/Expertise";
import GlobalReach from "./components/sections/GlobalReach";
import Services from "./components/sections/Services";
import Projects from "./components/sections/Projects";
import FeaturedBlogPosts from "./components/sections/FeaturedBlogPosts";
import Process from "./components/sections/Process";
import Testimonials from "./components/sections/Testimonials";
import QuotationCTA from "./components/sections/QuotationCTA";
import Contact from "./components/sections/Contact";

// Modals
import SearchModal from "./components/modals/SearchModal";
import EnquiryModal from "./components/modals/EnquiryModal";
import WelcomePopup from "./components/modals/WelcomePopup";
import AIChatModal from "./components/modals/AIChatModal";

// Pages (Lazy Loaded)
const ServiceDetailPage = lazy(() => import("./pages/ServiceDetailPage"));
const ProjectDetailPage = lazy(() => import("./pages/ProjectDetailPage"));
const ProjectsPage = lazy(() => import("./pages/ProjectsPage"));
const BlogPage = lazy(() => import("./pages/BlogPage"));
const BlogDetailPage = lazy(() => import("./pages/BlogDetailPage"));
const CaseStudies = lazy(() => import("./pages/CaseStudies"));
const CaseStudyDetailPage = lazy(() => import("./pages/CaseStudyDetailPage"));
const TestimonialDetailPage = lazy(() => import("./pages/TestimonialDetailPage"));
const CareerDetailPage = lazy(() => import("./pages/CareerDetailPage"));
const Careers = lazy(() => import("./pages/Careers"));
const PartnersPage = lazy(() => import("./pages/PartnersPage"));
const PartnerDetailPage = lazy(() => import("./pages/PartnerDetailPage"));
const SecretContent = lazy(() => import("./pages/SecretContent"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const TermsAndConditions = lazy(() => import("./pages/TermsAndConditions"));
const CookiePolicy = lazy(() => import("./pages/CookiePolicy"));

const PageLoader = () => (
  <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4">
    <Loader2 className="w-12 h-12 text-orange-500 animate-spin" />
    <p className="text-muted-foreground animate-pulse font-medium">Loading experience...</p>
  </div>
);

export default function App() {
  const [isDark, setIsDark] = useState(false);
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isWelcomeOpen, setIsWelcomeOpen] = useState(false);
  const [isAIChatOpen, setIsAIChatOpen] = useState(false);

  const [services, setServices] = useState<Service[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [partners, setPartners] = useState<Partner[]>([]);
  const [settings, setSettings] = useState<Record<string, string>>({});

  const refreshContent = async () => {
    try {
      const res = await fetch("/api/all-content");
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to fetch content");
      }
      const data = await res.json();
      setServices((data.services || []).map((s: any) => ({ ...s, features: JSON.parse(s.features || '[]') })));
      setProjects((data.projects || []).map((p: any) => ({ ...p, results: JSON.parse(p.results || '[]'), keyPoints: JSON.parse(p.keyPoints || '[]'), isFeatured: !!p.isFeatured })));
      setCaseStudies((data.caseStudies || []).map((c: any) => ({ ...c, results: JSON.parse(c.results || '[]'), keyPoints: JSON.parse(c.keyPoints || '[]'), isFeatured: !!c.isFeatured })));
      setBlogPosts((data.blogPosts || []).map((b: any) => ({ ...b, results: JSON.parse(b.results || '[]'), keyPoints: JSON.parse(b.keyPoints || '[]'), isFeatured: !!b.isFeatured })));
      setJobs(data.jobs || []);
      setTestimonials((data.testimonials || []).map((t: any) => ({ ...t, isFeatured: !!t.isFeatured })));
      setPartners((data.partners || []).map((p: any) => ({ ...p, isFeatured: !!p.isFeatured })));
      const settingsMap: Record<string, string> = {};
      (data.settings || []).forEach((s: any) => {
        settingsMap[s.key] = s.value;
      });
      setSettings(settingsMap);
    } catch (err) {
      console.error("Failed to fetch content:", err);
    }
  };

  useEffect(() => {
    refreshContent();
  }, []);

  const toggleTheme = () => setIsDark(!isDark);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  useEffect(() => {
    // Welcome popup for new users
    const hasVisited = localStorage.getItem('hasVisitedTechxPrime');
    if (!hasVisited) {
      const timer = setTimeout(() => {
        setIsWelcomeOpen(true);
        localStorage.setItem('hasVisitedTechxPrime', 'true');
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    // Auto-popup enquiry modal after 15 seconds (increased from 8 for better UX)
    const timer = setTimeout(() => {
      const hasSeenPopup = sessionStorage.getItem('hasSeenEnquiryPopup');
      if (!hasSeenPopup) {
        setIsEnquiryOpen(true);
        sessionStorage.setItem('hasSeenEnquiryPopup', 'true');
      }
    }, 15000);

    return () => clearTimeout(timer);
  }, []);

  const layoutProps = {
    onOpenEnquiry: () => setIsEnquiryOpen(true),
    onOpenSearch: () => setIsSearchOpen(true),
    setIsAIChatOpen,
  };

  return (
    <ThemeContext.Provider value={{ isDark, toggle: toggleTheme }}>
      <ContentContext.Provider value={{ services, projects, caseStudies, blogPosts, jobs, testimonials, partners, settings, refreshContent }}>
        <BrowserRouter>
          <ScrollToTop />
          <div className={`${isDark ? "dark" : ""} min-h-screen selection:bg-orange-500 selection:text-white bg-background text-foreground transition-colors duration-500`}>
            <Suspense fallback={<Layout {...layoutProps}><PageLoader /></Layout>}>
              <Routes>
                <Route path="/" element={
                  <Layout {...layoutProps}>
                    <Hero />
                    <Reveal><About /></Reveal>
                    <Reveal><OurValues /></Reveal>
                    <Reveal><WhyChooseUs /></Reveal>
                    <Reveal><Expertise /></Reveal>
                    <Reveal><GlobalReach /></Reveal>
                    <Reveal><Services /></Reveal>
                    <Reveal><Projects /></Reveal>
                    <Reveal><FeaturedBlogPosts /></Reveal>
                    <Reveal><Process /></Reveal>
                    <Reveal><Testimonials /></Reveal>
                    <Reveal><QuotationCTA /></Reveal>
                    <Reveal><Contact /></Reveal>
                  </Layout>
                } />
                <Route path="/services" element={<Layout {...layoutProps}><Services isPage={true} /></Layout>} />
                <Route path="/services/:id" element={<Layout {...layoutProps}><ServiceDetailPage /></Layout>} />
                <Route path="/projects" element={<Layout {...layoutProps}><ProjectsPage /></Layout>} />
                <Route path="/projects/:id" element={<Layout {...layoutProps}><ProjectDetailPage /></Layout>} />
                <Route path="/testimonials" element={<Layout {...layoutProps}><Testimonials isPage={true} /></Layout>} />
                <Route path="/testimonials/:id" element={<Layout {...layoutProps}><TestimonialDetailPage /></Layout>} />
                <Route path="/about" element={<Layout {...layoutProps}><About isPage={true} /></Layout>} />
                <Route path="/career" element={<Layout {...layoutProps}><Careers /></Layout>} />
                <Route path="/partners" element={<Layout {...layoutProps}><PartnersPage /></Layout>} />
                <Route path="/partners/:id" element={<Layout {...layoutProps}><PartnerDetailPage /></Layout>} />
                <Route path="/career/:id" element={<Layout {...layoutProps}><CareerDetailPage /></Layout>} />
                <Route path="/blog" element={<Layout {...layoutProps}><BlogPage /></Layout>} />
                <Route path="/blog/:id" element={<Layout {...layoutProps}><BlogDetailPage /></Layout>} />
                <Route path="/case-studies" element={<Layout {...layoutProps}><CaseStudies /></Layout>} />
                <Route path="/case-studies/:id" element={<Layout {...layoutProps}><CaseStudyDetailPage /></Layout>} />
                <Route path="/secret-content" element={<Layout {...layoutProps}><SecretContent /></Layout>} />
                <Route path="/privacy-policy" element={<Layout {...layoutProps}><PrivacyPolicy /></Layout>} />
                <Route path="/terms-and-conditions" element={<Layout {...layoutProps}><TermsAndConditions /></Layout>} />
                <Route path="/cookie-policy" element={<Layout {...layoutProps}><CookiePolicy /></Layout>} />
                <Route path="/contact" element={<Layout {...layoutProps}><Contact isPage={true} /></Layout>} />
              </Routes>
            </Suspense>

            <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
            <EnquiryModal isOpen={isEnquiryOpen} onClose={() => setIsEnquiryOpen(false)} />
            <WelcomePopup isOpen={isWelcomeOpen} onClose={() => setIsWelcomeOpen(false)} />
            <AIChatModal isOpen={isAIChatOpen} onClose={() => setIsAIChatOpen(false)} />

            <ScrollToTopButton />

            <a
              href="https://wa.me/917906055529"
              target="_blank"
              rel="noopener noreferrer"
              className="fixed bottom-8 right-8 z-[60] w-16 h-16 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform group"
            >
              <MessageCircle className="w-8 h-8" />
              <span className="absolute right-full mr-4 bg-foreground text-background px-4 py-2 rounded-xl text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                Chat with us
              </span>
            </a>
          </div>
        </BrowserRouter>
      </ContentContext.Provider>
    </ThemeContext.Provider>
  );
}
