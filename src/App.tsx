import React, { useState, useEffect, useRef } from 'react';
import {
  Cpu,
  Users,
  TrendingUp,
  Workflow,
  Shield,
  FileText,
  CheckCircle2,
  ArrowRight,
  ChevronRight,
  Play,
  RefreshCw,
  Check,
  Sparkles,
  Lock,
  ChevronDown,
  Menu,
  X,
  Mail,
  Calendar,
  Activity
} from 'lucide-react';

// Interfaces & Types
interface Agent {
  id: string;
  name: string;
  role: string;
  shortDesc: string;
  description: string;
  colorClass: string;
  borderColor: string;
  glowColor: string;
  textColor: string;
  icon: React.ReactNode;
  tags: string[];
  capabilities: string[];
  integrations: string[];
  sopSample: string;
}

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
  metrics: string;
  agentUsed: string;
  gradient: string;
  hoverEffectClass: string;
}

// Google Apps Script Web App endpoint linked to your Google Sheet:
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwdARLx4pXorWxTOKjhQkTvMii-xCWvbxNHd1l6xtZlpSM26OG3EzVKESoXQqQhF4hI/exec";

export default function App() {
  // Navigation & States
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeMarketplaceAgent, setActiveMarketplaceAgent] = useState<string>('sales');
  const [watchDemoOpen, setWatchDemoOpen] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [bookDemoOpen, setBookDemoOpen] = useState(false);

  // Demo Booking form states
  const [bookingStep, setBookingStep] = useState(1);
  const [selectedAgentTypes, setSelectedAgentTypes] = useState<string[]>(['Sales Agent']);
  const [bookingEmail, setBookingEmail] = useState('');
  const [bookingName, setBookingName] = useState('');
  const [bookingCompany, setBookingCompany] = useState('');
  const [bookingSuccess, setBookingSuccess] = useState(false);

  // Early access footer form states
  const [earlyAccessEmail, setEarlyAccessEmail] = useState('');
  const [earlyAccessSuccess, setEarlyAccessSuccess] = useState(false);
  const [earlyAccessLoading, setEarlyAccessLoading] = useState(false);

  // How it works interactive step
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  // ROI Calculator State
  const [roiFTEs, setRoiFTEs] = useState(4);
  const [roiSalary, setRoiSalary] = useState(6500);

  // FAQ Accordion State
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Custom Agent Role State
  const [customRole, setCustomRole] = useState('');
  const [isGeneratingCustomAgent, setIsGeneratingCustomAgent] = useState(false);
  const [customAgentStep, setCustomAgentStep] = useState(0);
  const [customAgentDone, setCustomAgentDone] = useState(false);

  const handleGenerateCustomAgent = async () => {
    if (!customRole.trim()) return;
    setIsGeneratingCustomAgent(true);
    setCustomAgentDone(false);
    setCustomAgentStep(1);

    // Save custom agent role description to Google sheet
    const payload = {
      formType: 'Custom Agent Role',
      email: 'anonymous@cofoundr.world',
      name: 'Anonymous Visitor',
      company: '',
      selectedAgents: `Custom Role Description: ${customRole}`
    };

    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });
    } catch (err) {
      console.error("Error submitting custom agent role to sheet:", err);
    }

    setTimeout(() => {
      setCustomAgentStep(2);
      setTimeout(() => {
        setCustomAgentStep(3);
        setTimeout(() => {
          setCustomAgentStep(4);
          setTimeout(() => {
            setIsGeneratingCustomAgent(false);
            setCustomAgentDone(true);
          }, 1200);
        }, 1200);
      }, 1200);
    }, 1200);
  };

  // Dashboard Live Simulation logs
  const [dashboardLogs, setDashboardLogs] = useState<Array<{
    time: string;
    agent: string;
    action: string;
    status: 'success' | 'info' | 'pending';
  }>>([
    { time: '12:00:00', agent: 'System', action: 'COFOUNDR OS Kernel v4.2 fully booted.', status: 'info' },
    { time: '12:00:02', agent: 'System', action: 'Connected to Slack Webhook and HubSpot API.', status: 'success' },
    { time: '12:00:05', agent: 'Sales Agent', action: 'Detected incoming lead: marcus@vertex.io.', status: 'info' },
    { time: '12:00:08', agent: 'Sales Agent', action: 'Lead enriched. Vertex Inc ($42M ARR). Objections parsed.', status: 'success' },
  ]);

  const terminalContainerRef = useRef<HTMLDivElement>(null);

  // Simulate dashboard logs running in background
  useEffect(() => {
    const actions = [
      { agent: 'Sales Agent', action: 'Drafted tailored objection handling email for marcus@vertex.io.', status: 'success' as const },
      { agent: 'Marketing Agent', action: 'Scanned search engine keywords. Unlocked low-CPC gaps in tech recruiting.', status: 'success' as const },
      { agent: 'Ops Agent', action: 'Dispatched post-sales onboarding link & Slack invite automation.', status: 'success' as const },
      { agent: 'Compliance Agent', action: 'Audited updated SOC-2 logs. Flagged 0 permission discrepancies.', status: 'success' as const },
      { agent: 'Finance Agent', action: 'Stripe webhook received. Reconciled invoice #8892 and auto-generated ledger PDF.', status: 'success' as const },
      { agent: 'Sales Agent', action: 'Lead rich enrichment: company size = 120, funding round = Series A.', status: 'info' as const },
      { agent: 'Marketing Agent', action: 'Published A/B headline test to production: variant B CTR is +18.4%.', status: 'success' as const },
      { agent: 'Ops Agent', action: 'Synced database drift. Updated 14 HubSpot contact records.', status: 'success' as const }
    ];

    const interval = setInterval(() => {
      const randomIdx = Math.floor(Math.random() * actions.length);
      const randomLog = actions[randomIdx];
      const timeStr = new Date().toLocaleTimeString();

      setDashboardLogs(prev => {
        const next = [...prev, { time: timeStr, ...randomLog }];
        if (next.length > 50) next.shift(); // Keep logs clean
        return next;
      });
    }, 4500);

    return () => clearInterval(interval);
  }, []);

  // Scroll to bottom of terminal when logs update
  useEffect(() => {
    if (terminalContainerRef.current) {
      terminalContainerRef.current.scrollTo({
        top: terminalContainerRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [dashboardLogs]);

  // Scroll reveal animation observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.05,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    const elements = document.querySelectorAll('.reveal');
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  // Handle Book Demo Submission
  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingEmail || !bookingName) return;

    const payload = {
      formType: 'Book Demo',
      email: bookingEmail,
      name: bookingName,
      company: bookingCompany,
      selectedAgents: selectedAgentTypes.join(', ') + (customRole ? ` | Custom Role: ${customRole}` : '')
    };

    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });
    } catch (err) {
      console.error("Error submitting demo booking to sheet:", err);
    }

    setBookingSuccess(true);
    setTimeout(() => {
      setBookDemoOpen(false);
      setBookingSuccess(false);
      setBookingStep(1);
      setBookingEmail('');
      setBookingName('');
      setBookingCompany('');
    }, 3000);
  };

  // Handle Early Access Form Submission
  const handleEarlyAccessSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!earlyAccessEmail) return;
    setEarlyAccessLoading(true);

    const payload = {
      formType: 'Early Access',
      email: earlyAccessEmail,
      name: '',
      company: '',
      selectedAgents: ''
    };

    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });
      setEarlyAccessSuccess(true);
    } catch (err) {
      console.error("Error submitting early access to sheet:", err);
      setEarlyAccessSuccess(true);
    } finally {
      setEarlyAccessLoading(false);
    }
  };

  const toggleAgentType = (type: string) => {
    setSelectedAgentTypes(prev =>
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
  };

  // Close watch demo modal helper
  const closeWatchDemoModal = () => {
    setWatchDemoOpen(false);
    setIsVideoPlaying(false);
  };

  // Agents Definition with Clay styles & hover micro-interactions
  const agentsList: Agent[] = [
    {
      id: 'sales',
      name: 'Sales Agent',
      role: 'Outbound Prospecting & Objections Closer',
      shortDesc: 'Scrapes leads, enriches prospects, and handles CRM data entry and complex objections 24/7.',
      description: 'The Sales Agent acts as your autonomous business development representative. It works directly inside your tools, scanning lists, personalizing emails, and writing custom objections handlers to drive revenue pipeline.',
      colorClass: 'bg-clay-lavender-bg border-clay-lavender-border text-clay-lavender-text hover:border-clay-lavender-text hover:shadow-[0_8px_30px_rgba(79,70,229,0.14)]',
      borderColor: 'border-clay-lavender-border hover:border-clay-lavender-text',
      glowColor: 'bg-clay-lavender-bg',
      textColor: 'text-clay-lavender-text',
      icon: <Users className="w-5 h-5 text-clay-lavender-text" />,
      tags: ['Salesforce / HubSpot', 'Cold Outreach', 'LinkedIn Enlarger', 'Objection Resolver'],
      capabilities: [
        'Enriches pipeline prospects with real-time financial & tech stack data.',
        'Responds to product questions & price objections instantly using pre-approved playbooks.',
        'Saves contact detail drifts and schedules calendars on autopilot.'
      ],
      integrations: ['HubSpot', 'Salesforce', 'Gmail', 'Cal.com', 'Apollo.io'],
      sopSample: 'If inbound company ARR > $10M, enrich profile via LinkedIn, draft customized value prop email addressing operational overhead, and create contact in HubSpot.'
    },
    {
      id: 'marketing',
      name: 'Marketing Agent',
      role: 'Growth Campaigns & Content Director',
      shortDesc: 'Drafts newsletters, monitors search ranking gaps, and launches localized paid ad tests.',
      description: 'The Marketing Agent serves as an autonomous content copywriter and media buyer. It audits search trends, handles newsletter dispatch drafts, and analyzes paid channels to optimize spend metrics.',
      colorClass: 'bg-clay-peach-bg border-clay-peach-border text-clay-peach-text hover:border-clay-peach-text hover:shadow-[0_8px_30px_rgba(234,88,12,0.14)]',
      borderColor: 'border-clay-peach-border hover:border-clay-peach-text',
      glowColor: 'bg-clay-peach-bg',
      textColor: 'text-clay-peach-text',
      icon: <TrendingUp className="w-5 h-5 text-clay-peach-text" />,
      tags: ['SEO Auditing', 'Copywriting', 'Ad Campaign Management', 'Substack & Mailchimp'],
      capabilities: [
        'Maintains uniform brand-voice guidelines across social, email, and blog posts.',
        'Builds keyword lists and monitors search ranking opportunities.',
        'Drafts monthly and weekly product update newsletters for review.'
      ],
      integrations: ['Mailchimp', 'Substack', 'Google Ads', 'Meta Business Manager', 'Webflow'],
      sopSample: 'Scan SEO competitors once a week. Identify keyword trends with keyword difficulty < 40, draft a 1,200-word educational outline, and save to Webflow drafts.'
    },
    {
      id: 'operations',
      name: 'Operations Agent',
      role: 'SOP Execution & Workflow Reconciler',
      shortDesc: 'Automates data syncs, triggers tools workflows, and alerts teammates on Slack.',
      description: 'The Operations Agent binds your digital systems together. It watches Stripe payments, database changes, or webhook payloads, executing custom multi-step checklists and logging anomalies.',
      colorClass: 'bg-clay-emerald-bg border-clay-emerald-border text-clay-emerald-text hover:border-clay-emerald-text hover:shadow-[0_8px_30px_rgba(22,163,74,0.14)]',
      borderColor: 'border-clay-emerald-border hover:border-clay-emerald-text',
      glowColor: 'bg-clay-emerald-bg',
      textColor: 'text-clay-emerald-text',
      icon: <Workflow className="w-5 h-5 text-clay-emerald-text" />,
      tags: ['Webhook Triggering', 'Database Reconciling', 'Slack Alert Pipelines', 'Notion Syncs'],
      capabilities: [
        'Processes webhook events and executes downstream tasks in sub-seconds.',
        'Verifies data synchronicity between internal inventory databases and external billing portals.',
        'Pipes real-time alert summaries directly to team channels.'
      ],
      integrations: ['Slack', 'Stripe', 'Notion', 'Zapier APIs', 'Postgres'],
      sopSample: 'When a new Stripe subscription is active, create a corresponding onboarding workspace in Notion, invite the user email, and notify the #sales-ops channel on Slack.'
    },
    {
      id: 'compliance',
      name: 'Compliance Agent',
      role: 'SOC-2 Integrity & Audit Logger',
      shortDesc: 'Monitors permissions, generates reports, and runs continuous compliance checks.',
      description: 'The Compliance Agent operates as a continuous auditor. It tracks repository access permissions, scans logs for database drifts, and compiles security frameworks for compliance officers.',
      colorClass: 'bg-clay-pink-bg border-clay-pink-border text-clay-pink-text hover:border-clay-pink-text hover:shadow-[0_8px_30px_rgba(219,39,119,0.14)]',
      borderColor: 'border-clay-pink-border hover:border-clay-pink-text',
      glowColor: 'bg-clay-pink-bg',
      textColor: 'text-clay-pink-text',
      icon: <Shield className="w-5 h-5 text-clay-pink-text" />,
      tags: ['SOC-2 Integrity', 'Access Log Auditor', 'GitHub Scanners', 'Audit Reports'],
      capabilities: [
        'Audits file modifications and permissions daily to isolate configuration slips.',
        'Ensures proper encryption flags are set on database objects.',
        'Auto-compiles compliance documentation with clear execution evidence.'
      ],
      integrations: ['GitHub', 'AWS IAM', 'Vanta', 'Google Cloud Console', 'Jira'],
      sopSample: 'Every 24 hours, extract access logs from AWS IAM and GitHub. Verify that no non-admin user has write access to the prod database, and log the audit report.'
    },
    {
      id: 'finance',
      name: 'Finance & Billing Agent',
      role: 'Ledger Audit & Invoice Reconciler',
      shortDesc: 'Generates invoices, performs Stripe audits, and checks ledger balances.',
      description: 'The Finance Agent operates as a virtual billing clerk. It reconciles transaction logs, monitors accounting slips, generates invoices, and flags unpaid entries automatically.',
      colorClass: 'bg-clay-amber-bg border-clay-amber-border text-clay-amber-text hover:border-clay-amber-text hover:shadow-[0_8px_30px_rgba(217,119,6,0.14)]',
      borderColor: 'border-clay-amber-border hover:border-clay-amber-text',
      glowColor: 'bg-clay-amber-bg',
      textColor: 'text-clay-amber-text',
      icon: <FileText className="w-5 h-5 text-clay-amber-text" />,
      tags: ['Stripe Invoicing', 'Ledger Audit', 'QBO Syncing', 'Receipt Auditing'],
      capabilities: [
        'Generates and dispatches custom PDF invoices on closed deals.',
        'Verifies bank payments against Quickbooks Online (QBO) invoices.',
        'Flags billing anomalies and sets alerts for unpaid balances.'
      ],
      integrations: ['Stripe', 'QuickBooks', 'Xero', 'Google Drive', 'Brex'],
      sopSample: 'On the first day of each month, extract active Stripe contracts, verify that payment amounts match invoice ledgers, and compile an Excel overview report in Google Drive.'
    }
  ];

  // Testimonial List with Clay colorful card styling and custom shadow effects
  const testimonials: Testimonial[] = [
    {
      quote: "Within two weeks, our Sales Agent enriched 1,400 inbound leads, categorized them based on custom pricing profiles, and booked 82 meetings. It operates exactly like a high-performing human representative.",
      author: "Sarah Jenkins",
      role: "VP of Revenue",
      company: "Aether Analytics",
      metrics: "82 demos booked in 14 days",
      agentUsed: "Sales Agent",
      gradient: "from-clay-lavender-bg to-white border-clay-lavender-border",
      hoverEffectClass: "hover:shadow-[0_12px_35px_rgba(79,70,229,0.15)] hover:border-clay-lavender-text"
    },
    {
      quote: "Our Operations Agent runs inventory syncs and Stripe reconciliation webhooks 24/7. Anomaly checks that used to occupy hours for our finance desk now resolve in less than 500 milliseconds.",
      author: "Marcus Vance",
      role: "Director of Business Ops",
      company: "Vertex Logistics",
      metrics: "90% operational time reduction",
      agentUsed: "Operations Agent",
      gradient: "from-clay-emerald-bg to-white border-clay-emerald-border",
      hoverEffectClass: "hover:shadow-[0_12px_35px_rgba(22,163,74,0.15)] hover:border-clay-emerald-text"
    },
    {
      quote: "SOC-2 audit prep was typically a bottleneck. Deploying the Compliance Agent gave us automated auditing across AWS, GitHub, and Jira, drafting compliance sheets live. The audit process was a breeze.",
      author: "Diana Moreno",
      role: "Head of Information Security",
      company: "Supaflow",
      metrics: "Continuous audit ready",
      agentUsed: "Compliance Agent",
      gradient: "from-clay-pink-bg to-white border-clay-pink-border",
      hoverEffectClass: "hover:shadow-[0_12px_35px_rgba(219,39,119,0.15)] hover:border-clay-pink-text"
    }
  ];

  // How it Works Steps content
  const steps = [
    {
      step: '01',
      title: 'Define the Role',
      desc: 'Specify your agent\'s job outline, objective, and daily parameters in plain English. No complex code or syntax required.',
      details: 'Write the role description as if you were hiring a human teammate: write out standard operating procedures (SOPs), desired outputs, constraints, and operational goals.',
      icon: <FileText className="w-5 h-5 text-clay-lavender-text" />
    },
    {
      step: '02',
      title: 'Connect Your Tools',
      desc: 'Connect tools like Slack, HubSpot, Salesforce, Gmail, Stripe, Notion, and databases with secure 1-click authentication.',
      details: 'Cofoundr uses OAuth isolation to connect tools. Agents read and write only inside parameters you authorize, keeping operational accounts partitioned and audited.',
      icon: <Workflow className="w-5 h-5 text-clay-peach-text" />
    },
    {
      step: '03',
      title: 'Train with Docs & SOPs',
      desc: 'Upload files (PDFs, guidelines, sheets) or links. Agents ingest the exact business guidelines you want them to follow.',
      details: 'Agents compile your uploaded manuals into operational vector memory, using context retrieval during pipeline steps to guarantee guidelines are met with zero hallucinations.',
      icon: <Cpu className="w-5 h-5 text-clay-emerald-text" />
    },
    {
      step: '04',
      title: 'Monitor & Scale',
      desc: 'Track logs, approve actions in co-pilot mode, and toggle to autopilot once trust is established. Scale up at will.',
      details: 'Maintain complete administrative oversight. Keep human-in-the-loop validation for outbound drafts or billing actions, and toggle to autonomous execution when ready.',
      icon: <Activity className="w-5 h-5 text-clay-pink-text" />
    }
  ];

  // FAQ Items
  const faqItems = [
    {
      q: 'Do Cofoundr agents require programming skills to set up?',
      a: 'Not at all. You define their roles and SOPs using plain English instructions. Connecting integrations is handled via secure 1-click OAuth setup for tools like Slack, HubSpot, Gmail, and Stripe. Anyone on your ops or sales team can deploy and optimize an agent in under 10 minutes.'
    },
    {
      q: 'How do these agents preserve our enterprise\'s tacit knowledge?',
      a: 'Tacit knowledge is often lost when key employees leave. Cofoundr agents ingest your team\'s custom SOPs, guidelines, documentation, and historical logs, keeping your company\'s intelligence secure and permanent. They act as a permanent, shared memory for your operations.'
    },
    {
      q: 'What does it mean to build an AI-native team?',
      a: 'Building an AI-native team means your human staff shift from repetitive manual operators to high-level system supervisors. Humans validate and direct strategy, while autonomous AI agents handle execution-heavy tasks like outbound emails, SEO audits, and ledger reconciliations 24/7/365.'
    },
    {
      q: 'Why is onboarding time the biggest bottleneck?',
      a: 'Traditional onboarding takes up to 6 months of salary, overhead, and trial-and-error before an employee reaches full productivity. Cofoundr agents deploy instantly, pre-trained on your playbooks to execute tasks at peak efficiency on Day 1.'
    },
    {
      q: 'How does human-in-the-loop oversight work?',
      a: 'Safety and auditability are priority features. By default, agents operate in Co-Pilot mode. They stage drafted emails, invoice reconciliations, or code revisions in your dashboard and ping you on Slack. You approve, edit, or reject with a single click. Once you trust the outputs, toggle them to Autopilot for fully autonomous execution.'
    },
    {
      q: 'Is my data secure?',
      a: 'Yes. Data isolation is a core design requirement. All API interactions run inside isolated secure sandboxes. Your business records, documents, and tool credentials are encrypted at rest and in transit. Most importantly, Cofoundr never uses your operational logs or customer interactions to train public models.'
    }
  ];

  // ROI math variables
  const monthlyAIExtended = 999;
  const humanSalaryFTE = roiFTEs * roiSalary;
  const netSavingsMonthly = humanSalaryFTE - monthlyAIExtended;
  const netSavingsYearly = netSavingsMonthly * 12;
  const costPercentReduction = Math.round((netSavingsMonthly / humanSalaryFTE) * 100);

  return (
    <div className="relative min-h-screen bg-clay-bg text-clay-ink font-sans selection:bg-clay-lavender-bg selection:text-clay-lavender-text">

      {/* Background Grids & Ambient Lights */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-0 inset-x-0 h-[900px] grid-bg grid-mask opacity-90"></div>

        {/* Soft colorful pastel blur spheres */}
        <div className="absolute top-[5%] left-[8%] w-[450px] h-[450px] bg-blue-200/25 rounded-full blur-[110px] animate-glow-pulse"></div>
        <div className="absolute top-[20%] right-[3%] w-[480px] h-[480px] bg-purple-200/20 rounded-full blur-[120px] animate-glow-pulse" style={{ animationDelay: '1.5s' }}></div>
        <div className="absolute top-[55%] left-[15%] w-[400px] h-[400px] bg-emerald-100/30 rounded-full blur-[100px] animate-glow-pulse" style={{ animationDelay: '3s' }}></div>
      </div>

      {/* Sticky Premium Navbar */}
      <header className="sticky top-0 z-50 w-full border-b border-clay-border bg-clay-bg/85 backdrop-blur-md transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">

          {/* Logo & Beta badge */}
          <div className="flex items-center gap-3 select-none">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-purple-600 flex items-center justify-center shadow-md border border-white/20">
              <Cpu className="w-5 h-5 text-white" />
            </div>
            <div className="flex items-center gap-2">
              <span className="font-display font-bold text-xl tracking-tight text-clay-ink">Cofoundr</span>
              <span className="px-2.5 py-0.5 rounded-full text-[9px] font-semibold bg-clay-purple-bg border border-clay-purple-border text-clay-purple-text uppercase tracking-widest font-mono">Beta</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-clay-muted">
            <a href="#solutions" className="hover:text-clay-ink transition-colors duration-200">Solutions</a>
            <a href="#how-it-works" className="hover:text-clay-ink transition-colors duration-200">How it Works</a>
            <a href="#testimonials" className="hover:text-clay-ink transition-colors duration-200">Use Cases</a>
            <a href="#pricing" className="hover:text-clay-ink transition-colors duration-200">Pricing</a>
          </nav>

          {/* Nav CTAs */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={() => setBookDemoOpen(true)}
              className="text-sm font-medium text-clay-muted hover:text-clay-ink transition-colors cursor-pointer select-none"
            >
              Log in
            </button>
            <button
              onClick={() => setBookDemoOpen(true)}
              className="px-4 py-2 text-xs font-semibold rounded-lg bg-clay-ink hover:bg-zinc-800 text-clay-bg transition-all duration-200 shadow-sm hover:shadow active:scale-95 cursor-pointer select-none border border-clay-ink"
            >
              Book Demo
            </button>
          </div>

          {/* Burger menu toggler */}
          <div className="flex md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-clay-muted hover:text-clay-ink transition-colors focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden border-b border-clay-border bg-white px-4 pt-2 pb-6 space-y-3">
            <a
              href="#solutions"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-clay-muted hover:text-clay-ink hover:bg-clay-bg transition-all"
            >
              Solutions
            </a>
            <a
              href="#how-it-works"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-clay-muted hover:text-clay-ink hover:bg-clay-bg transition-all"
            >
              How it Works
            </a>
            <a
              href="#testimonials"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-clay-muted hover:text-clay-ink hover:bg-clay-bg transition-all"
            >
              Use Cases
            </a>
            <a
              href="#pricing"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-clay-muted hover:text-clay-ink hover:bg-clay-bg transition-all"
            >
              Pricing
            </a>
            <div className="pt-4 border-t border-clay-border flex flex-col gap-3">
              <button
                onClick={() => { setMobileMenuOpen(false); setBookDemoOpen(true); }}
                className="w-full text-center py-2.5 rounded-lg border border-clay-border text-sm font-medium text-clay-ink hover:bg-clay-bg transition-all"
              >
                Log in
              </button>
              <button
                onClick={() => { setMobileMenuOpen(false); setBookDemoOpen(true); }}
                className="w-full py-2.5 text-center rounded-lg bg-clay-ink text-clay-bg text-sm font-semibold hover:bg-zinc-800 transition-all"
              >
                Book Demo
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Main Layout Container */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">

        {/* HERO SECTION */}
        <section className="text-center pt-4 pb-16 lg:pb-24 max-w-4xl mx-auto reveal">
          {/* Subtle upper alert */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-clay-lavender-border bg-clay-lavender-bg text-xs text-clay-lavender-text font-semibold mb-8 animate-float shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-clay-lavender-text" />
             <span>Bridge the 6-Month Onboarding Gap</span>
          </div>

          <h1 className="font-display font-bold text-4xl sm:text-6xl lg:text-7xl text-clay-ink tracking-tight leading-[1.05] mb-6">
            Hire AI Agents.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
              Build AI-Native Teams.
            </span>
          </h1>

          <p className="text-base sm:text-lg lg:text-xl text-clay-muted max-w-2xl mx-auto font-normal leading-relaxed mb-10">
            Onboarding a new employee takes 6 months of training and overhead. Cofoundr agents deploy instantly, work alongside your human staff, and preserve your enterprise's tacit knowledge forever. Go AI-native from day one.
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-20">
            <button
              onClick={() => setBookDemoOpen(true)}
              className="w-full sm:w-auto px-7 py-4 text-sm font-semibold rounded-xl bg-clay-ink text-clay-bg hover:bg-zinc-800 hover:shadow-lg active:scale-95 transition-all duration-200 flex items-center justify-center gap-2 border border-clay-ink cursor-pointer select-none"
            >
              Hire Your First Agent
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => setWatchDemoOpen(true)}
              className="w-full sm:w-auto px-7 py-4 text-sm font-semibold rounded-xl border border-clay-border bg-white hover:bg-clay-bg/60 text-clay-ink hover:shadow transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer select-none"
            >
              <Play className="w-4 h-4 text-clay-lavender-text fill-clay-lavender-bg" />
              Watch Demo
            </button>
          </div>

          {/* Trust bar */}
          <div className="border-t border-b border-clay-border/80 py-8 mb-24">
            <p className="text-xs uppercase tracking-widest text-clay-muted font-bold mb-6">
              Trusted by innovative teams at
            </p>
            <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6 opacity-60 select-none">
              <span className="font-display font-extrabold text-lg text-clay-ink tracking-widest">VERCEL</span>
              <span className="font-display font-black text-xl text-clay-ink tracking-tight">stripe</span>
              <span className="font-display font-bold text-lg text-clay-ink tracking-wider uppercase">Linear</span>
              <span className="font-display font-semibold text-lg text-clay-ink tracking-tight uppercase">retool</span>
              <span className="font-display font-extrabold text-xl text-clay-ink tracking-tighter">supabase</span>
            </div>
          </div>

          {/* INTERACTIVE HERO DASHBOARD MOCKUP */}
          <div className="relative glow-card bg-white border border-clay-border rounded-2xl overflow-hidden shadow-md mx-auto max-w-5xl">

            {/* Dashboard Mock Header */}
            <div className="flex flex-col sm:flex-row items-center justify-between px-5 py-3 border-b border-clay-border bg-clay-bg/50 gap-3">
              <div className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-zinc-200"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-zinc-200"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-zinc-200"></span>
                <div className="h-4 w-px bg-clay-border mx-1"></div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span className="text-xs font-mono text-clay-muted font-medium">Production workspace: active</span>
                </div>
              </div>

              <div className="flex items-center gap-4 text-xs font-mono text-clay-muted">
                <span>Memory Pool: 12.4 GB / 32 GB</span>
                <span className="px-2 py-0.5 bg-clay-blue-bg border border-clay-blue-border text-clay-blue-text rounded text-[10px] font-bold">
                  AUTOPILOT ON
                </span>
              </div>
            </div>

            {/* Dashboard Main layout grid */}
            <div className="grid grid-cols-1 md:grid-cols-12 min-h-[380px] text-left">

              {/* Left sidebar */}
              <div className="md:col-span-3 border-r border-clay-border p-4 space-y-6 bg-clay-bg/25">
                <div>
                  <h4 className="text-[10px] font-bold uppercase tracking-wider text-clay-muted mb-2.5">Teammates Online</h4>
                  <div className="space-y-2">
                    {agentsList.map(a => (
                      <div key={a.id} className="flex items-center justify-between p-1.5 rounded-lg hover:bg-clay-border/30 transition-colors">
                        <div className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                          <span className="text-xs text-clay-ink font-semibold">{a.name}</span>
                        </div>
                        <span className="text-[9px] font-mono text-clay-muted">24/7</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-[10px] font-bold uppercase tracking-wider text-clay-muted mb-2.5">Connected Integrations</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {['Slack', 'HubSpot', 'Stripe', 'Gmail', 'GitHub', 'Salesforce'].map((tool, i) => (
                      <span key={i} className="px-2 py-0.5 bg-white border border-clay-border text-clay-muted rounded text-[9px] font-mono">
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="border-t border-clay-border pt-4">
                  <div className="bg-white p-2.5 rounded-lg border border-clay-border shadow-sm">
                    <span className="text-[10px] text-clay-muted block">Total Saved Hours</span>
                    <span className="text-lg font-bold text-clay-ink mt-0.5">384.2 hrs</span>
                    <span className="text-[9px] text-emerald-600 font-bold block mt-0.5">↑ 18% this billing cycle</span>
                  </div>
                </div>
              </div>

              {/* Main Log area */}
              <div className="md:col-span-6 p-5 flex flex-col justify-between bg-white">
                <div>
                  <div className="flex items-center justify-between border-b border-clay-border pb-3 mb-4">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-clay-ink">Agent Activity Stream</h3>
                    <div className="flex items-center gap-1.5 text-[10px] text-clay-muted font-mono">
                      <RefreshCw className="w-3 h-3 text-clay-lavender-text animate-spin" />
                      <span>Streaming live logs...</span>
                    </div>
                  </div>

                  {/* Terminal Scrolling logs */}
                  <div ref={terminalContainerRef} className="space-y-3 h-[240px] overflow-y-auto terminal-scroll pr-1 font-mono text-xs text-clay-muted">
                    {dashboardLogs.map((log, index) => {
                      let tagColor = 'text-clay-lavender-text bg-clay-lavender-bg border-clay-lavender-border';
                      if (log.agent === 'Marketing Agent') tagColor = 'text-clay-peach-text bg-clay-peach-bg border-clay-peach-border';
                      if (log.agent === 'Ops Agent') tagColor = 'text-clay-emerald-text bg-clay-emerald-bg border-clay-emerald-border';
                      if (log.agent === 'Compliance Agent') tagColor = 'text-clay-pink-text bg-clay-pink-bg border-clay-pink-border';
                      if (log.agent === 'Finance Agent') tagColor = 'text-clay-amber-text bg-clay-amber-bg border-clay-amber-border';
                      if (log.agent === 'System') tagColor = 'text-zinc-600 bg-zinc-100 border-zinc-200';

                      return (
                        <div key={index} className="flex items-start gap-2 border-b border-clay-border/40 pb-2 leading-relaxed">
                          <span className="text-zinc-400 text-[10px] select-none shrink-0 mt-0.5">[{log.time}]</span>
                          <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold border shrink-0 ${tagColor}`}>
                            {log.agent}
                          </span>
                          <span className="text-clay-ink font-sans">{log.action}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="border-t border-clay-border pt-4 flex items-center justify-between text-xs text-clay-muted">
                  <span className="flex items-center gap-1.5 font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    Audit integrity: SECURE
                  </span>
                  <span>Press <kbd className="bg-zinc-100 px-1 py-0.5 rounded border border-zinc-200 font-mono text-[10px] text-zinc-600">⌘K</kbd> to query</span>
                </div>
              </div>

              {/* Right status panels */}
              <div className="md:col-span-3 border-l border-clay-border p-4 space-y-4 bg-clay-bg/25">
                <h4 className="text-[10px] font-bold uppercase tracking-wider text-clay-muted">Workload Distribution</h4>

                <div className="space-y-3.5">
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-clay-muted">Sales pipeline</span>
                      <span className="font-bold text-clay-ink">42%</span>
                    </div>
                    <div className="w-full h-1.5 bg-zinc-100 rounded-full overflow-hidden">
                      <div className="h-full bg-clay-lavender-text rounded-full" style={{ width: '42%' }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-clay-muted">Operations sync</span>
                      <span className="font-bold text-clay-ink">28%</span>
                    </div>
                    <div className="w-full h-1.5 bg-zinc-100 rounded-full overflow-hidden">
                      <div className="h-full bg-clay-emerald-text rounded-full" style={{ width: '28%' }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-clay-muted">Auditing & Security</span>
                      <span className="font-bold text-clay-ink">18%</span>
                    </div>
                    <div className="w-full h-1.5 bg-zinc-100 rounded-full overflow-hidden">
                      <div className="h-full bg-clay-pink-text rounded-full" style={{ width: '18%' }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-clay-muted">Marketing publishing</span>
                      <span className="font-bold text-clay-ink">12%</span>
                    </div>
                    <div className="w-full h-1.5 bg-zinc-100 rounded-full overflow-hidden">
                      <div className="h-full bg-clay-purple-text rounded-full" style={{ width: '12%' }}></div>
                    </div>
                  </div>
                </div>

                <div className="border-t border-clay-border pt-4 mt-6">
                  <div className="p-3 bg-clay-blue-bg border border-clay-blue-border rounded-xl">
                    <span className="text-[10px] text-clay-blue-text font-bold block mb-1">PROD OUTCOME</span>
                    <p className="text-xs text-clay-ink leading-relaxed font-mono">
                      12,412 transactions audited. 0 anomalies detected.
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* INTERACTIVE CUSTOM ROLE BUILDER CARD */}
        <section className="mb-32 max-w-5xl mx-auto reveal">
          <div className="relative border border-clay-border rounded-3xl p-8 sm:p-12 text-left bg-gradient-to-tr from-white via-[#FFFBF9] to-[#FDFBF7] shadow-sm hover:shadow-md transition-shadow overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-clay-peach-bg/15 blur-[60px] pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-clay-lavender-bg/15 blur-[60px] pointer-events-none"></div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
              {/* Left description */}
              <div className="lg:col-span-6 space-y-6">
                <span className="px-3 py-1 bg-white border border-clay-peach-border text-clay-peach-text rounded-full text-xs font-bold uppercase tracking-widest">
                  Custom Roles
                </span>
                <h2 className="font-display font-bold text-3xl sm:text-4xl text-clay-ink tracking-tight leading-tight">
                  Tell us what you need. <br />
                  Our agents will work on that.
                </h2>
                <p className="text-sm text-clay-muted leading-relaxed font-semibold">
                  Instead of spending 6 months recruiting, onboarding, and training a new employee to understand your tacit business workflows, describe their exact responsibilities below. We configure a custom operational agent to handle it instantly.
                </p>
              </div>

              {/* Right interactive panel */}
              <div className="lg:col-span-6 bg-white border border-clay-border rounded-2xl p-6 shadow-sm space-y-4">
                <div>
                  <label htmlFor="custom-role-input" className="block text-xs font-bold text-clay-ink uppercase tracking-wider mb-2">
                    Describe roles & responsibilities:
                  </label>
                  <textarea
                    id="custom-role-input"
                    rows={3}
                    value={customRole}
                    onChange={(e) => setCustomRole(e.target.value)}
                    placeholder="e.g. Outbound marketing lead who monitors our blog traffic, finds keyword gap trends, drafts weekly newsletters, and reports SEO metrics in Slack."
                    className="w-full p-3 text-xs font-mono border border-clay-border rounded-xl bg-[#FFFDF9] text-clay-ink focus:outline-none focus:border-clay-border-hover placeholder:text-zinc-400"
                    disabled={isGeneratingCustomAgent}
                  />
                </div>

                <div className="flex justify-between items-center gap-3">
                  <button
                    onClick={handleGenerateCustomAgent}
                    disabled={isGeneratingCustomAgent || !customRole.trim()}
                    className={`flex-1 py-3 px-4 text-xs font-bold rounded-lg text-white transition-all cursor-pointer flex items-center justify-center gap-2 select-none active:scale-98 ${
                      isGeneratingCustomAgent
                        ? 'bg-zinc-400 cursor-not-allowed'
                        : customAgentDone
                        ? 'bg-clay-emerald-text hover:bg-emerald-700'
                        : 'bg-clay-ink hover:bg-zinc-800'
                    }`}
                  >
                    {isGeneratingCustomAgent ? (
                      <>
                        <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                        Configuring Agent...
                      </>
                    ) : customAgentDone ? (
                      'Agent Configured! Deploy to Production'
                    ) : (
                      'Configure Custom Agent ⚡'
                    )}
                  </button>
                  {customAgentDone && (
                    <button
                      onClick={() => {
                        setCustomRole('');
                        setCustomAgentDone(false);
                        setCustomAgentStep(0);
                      }}
                      className="px-3.5 py-3 text-xs font-bold border border-clay-border rounded-lg text-clay-muted hover:text-clay-ink hover:bg-zinc-50 cursor-pointer"
                    >
                      Reset
                    </button>
                  )}
                </div>

                {/* Simulation Output */}
                {(isGeneratingCustomAgent || customAgentStep > 0) && (
                  <div className="border border-clay-border bg-[#0B0E14] text-[#E0E7FF] rounded-xl p-4 font-mono text-[10px] space-y-2 max-h-[160px] overflow-y-auto animate-card-fade">
                    <div className="flex justify-between text-zinc-500 border-b border-zinc-800 pb-1.5 font-bold uppercase tracking-wider text-[8px]">
                      <span>SYSTEM LOG</span>
                      <span>AGENT BUILDER v4.0</span>
                    </div>
                    {customAgentStep >= 1 && (
                      <div className="flex items-start gap-2 text-blue-400">
                        <span className="shrink-0 font-bold">[1/4]</span>
                        <span>Ingesting responsibilities and parsing required domain contexts...</span>
                      </div>
                    )}
                    {customAgentStep >= 2 && (
                      <div className="flex items-start gap-2 text-amber-400">
                        <span className="shrink-0 font-bold">[2/4]</span>
                        <span>Mapping tool integrations & API triggers...</span>
                      </div>
                    )}
                    {customAgentStep >= 3 && (
                      <div className="flex items-start gap-2 text-purple-400">
                        <span className="shrink-0 font-bold">[3/4]</span>
                        <span>Securing enterprise tacit knowledge preservation filters...</span>
                      </div>
                    )}
                    {customAgentStep >= 4 && (
                      <div className="flex items-start gap-2 text-emerald-400 font-bold">
                        <span className="shrink-0 font-bold">[4/4]</span>
                        <span>SUCCESS: Custom Agent successfully configured and ready to join your team!</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* STATS BAR SECTION */}
        <section className="mb-32 reveal">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

            {/* Stat card 1 */}
            <div className="p-6 rounded-2xl border border-clay-border bg-white hover:bg-clay-bg/40 transition-all duration-300 text-left relative overflow-hidden group glow-card">
              <div className="absolute top-0 right-0 w-24 h-24 bg-clay-blue-bg rounded-full blur-2xl group-hover:bg-blue-100/50 transition-all"></div>
              <span className="text-3xl sm:text-4xl font-display font-bold text-clay-ink block mb-2">10x</span>
              <h3 className="text-sm font-bold text-clay-ink mb-1">Faster Execution</h3>
              <p className="text-xs text-clay-muted leading-relaxed">
                Workflows resolve in sub-seconds rather than business days.
              </p>
            </div>

            {/* Stat card 2 */}
            <div className="p-6 rounded-2xl border border-clay-border bg-white hover:bg-clay-bg/40 transition-all duration-300 text-left relative overflow-hidden group glow-card">
              <div className="absolute top-0 right-0 w-24 h-24 bg-clay-purple-bg rounded-full blur-2xl group-hover:bg-purple-100/50 transition-all"></div>
              <span className="text-3xl sm:text-4xl font-display font-bold text-clay-ink block mb-2">24/7/365</span>
              <h3 className="text-sm font-bold text-clay-ink mb-1">Active Coverage</h3>
              <p className="text-xs text-clay-muted leading-relaxed">
                Agents execute background pipelines constantly with zero down-time.
              </p>
            </div>

            {/* Stat card 3 */}
            <div className="p-6 rounded-2xl border border-clay-border bg-white hover:bg-clay-bg/40 transition-all duration-300 text-left relative overflow-hidden group glow-card">
              <div className="absolute top-0 right-0 w-24 h-24 bg-clay-emerald-bg rounded-full blur-2xl group-hover:bg-emerald-100/50 transition-all"></div>
              <span className="text-3xl sm:text-4xl font-display font-bold text-clay-ink block mb-2">85%</span>
              <h3 className="text-sm font-bold text-clay-ink mb-1">Cost Reduction</h3>
              <p className="text-xs text-clay-muted leading-relaxed">
                Replaces high contractor fees and complex seat software pipelines.
              </p>
            </div>

            {/* Stat card 4 */}
            <div className="p-6 rounded-2xl border border-clay-border bg-white hover:bg-clay-bg/40 transition-all duration-300 text-left relative overflow-hidden group glow-card">
              <div className="absolute top-0 right-0 w-24 h-24 bg-clay-pink-bg rounded-full blur-2xl group-hover:bg-pink-100/50 transition-all"></div>
              <span className="text-3xl sm:text-4xl font-display font-bold text-clay-ink block mb-2">1,500+</span>
              <h3 className="text-sm font-bold text-clay-ink mb-1">Deployed Agents</h3>
              <p className="text-xs text-clay-muted leading-relaxed">
                Running operations safely in high-security production environments.
              </p>
            </div>

          </div>
        </section>

        {/* EMBEDDED SALES AGENT (AGENT SAIL) VIDEO SECTION */}
        <section className="mb-32 reveal border border-clay-border bg-[#FFFBF5] rounded-3xl p-6 sm:p-10 shadow-sm hover:shadow-md transition-all relative overflow-hidden text-left animate-card-fade">
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-clay-lavender-bg/40 blur-[60px] pointer-events-none"></div>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Column: Copy & Details */}
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-clay-lavender-border bg-clay-lavender-bg text-xs font-semibold text-clay-lavender-text">
                <Sparkles className="w-3.5 h-3.5 text-clay-lavender-text" />
                <span>Agent Sail In Action</span>
              </div>
              
              <h2 className="font-display font-bold text-3xl sm:text-4xl text-clay-ink tracking-tight leading-tight">
                Meet Agent Sail, Your Autonomous Sales Closer
              </h2>
              
              <p className="text-sm sm:text-base text-clay-muted leading-relaxed">
                Watch Agent Sail execute full-cycle outbound prospecting. It connects to your databases, enrichment filters, and Gmail accounts. In this guided demo, observe how it personalizes objection handling emails, schedules meetings, and maps records into your CRMs 24/7.
              </p>
              
              <div className="space-y-3 font-semibold text-xs text-clay-muted">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4.5 h-4.5 text-clay-lavender-text shrink-0" />
                  <span>Enriches lead metrics from LinkedIn & Apollo automatically</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4.5 h-4.5 text-clay-lavender-text shrink-0" />
                  <span>Handles custom sales playbooks and complex objections</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4.5 h-4.5 text-clay-lavender-text shrink-0" />
                  <span>Pipes logs and structured contacts directly to HubSpot/Salesforce</span>
                </div>
              </div>
              
              <div className="pt-2">
                <button
                  onClick={() => setBookDemoOpen(true)}
                  className="px-6 py-3.5 text-xs font-bold rounded-lg bg-clay-ink hover:bg-zinc-800 text-clay-bg transition-all duration-200 active:scale-95 shadow-sm border border-clay-ink cursor-pointer"
                >
                  Deploy Agent Sail Now
                </button>
              </div>
            </div>
            
            {/* Right Column: Embedded Player */}
            <div className="lg:col-span-7">
              <div className="relative rounded-2xl border border-clay-border bg-white p-2.5 sm:p-4 shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="relative aspect-video rounded-xl overflow-hidden bg-black border border-clay-border">
                  <video 
                    src="/agent-sail-demo-guided.mp4" 
                    controls 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
            
          </div>
        </section>

        {/* NEW SCROLL SECTION: GET INTELLIGENCE FROM THE MOST COMPLETE AGENT MARKETPLACE */}
        <section className="mb-32 max-w-5xl mx-auto text-center">
          <div className="mb-16 reveal">
            <span className="text-xs uppercase tracking-widest text-clay-lavender-text bg-clay-lavender-bg border border-clay-lavender-border px-3 py-1.5 rounded-full w-fit mx-auto font-bold mb-4 block">
              Complete Data & Agent Ecosystem
            </span>
            <h2 className="text-3xl sm:text-5xl font-display font-bold text-clay-ink tracking-tight mt-4 leading-tight">
              Get intelligence from the most complete agent marketplace
            </h2>
            <p className="text-clay-muted mt-4 max-w-2xl mx-auto text-sm sm:text-base font-semibold leading-relaxed">
              Consolidate tools, databases, and playbooks in a single automated workspace. Scale pipelines and sync records with sequential waterfall execution.
            </p>
          </div>

          {/* Stacking Cards Container */}
          <div className="flex flex-col gap-16 relative">
            
            {/* Card 1: Sales / Outbound Close */}
            <div className="sticky top-20 z-10 w-full bg-[#EEF2FF] border border-clay-lavender-border rounded-3xl p-6 sm:p-10 shadow-[0_8px_30px_rgba(79,70,229,0.06)] hover:shadow-[0_12px_35px_rgba(79,70,229,0.12)] hover:translate-y-[-4px] transition-all duration-300 text-left grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-[380px]">
              <div className="lg:col-span-6 space-y-4">
                <span className="px-3 py-1 bg-white/60 border border-clay-lavender-border text-clay-lavender-text rounded-full text-xs font-extrabold uppercase tracking-widest">
                  Sales
                </span>
                <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-clay-ink leading-tight">
                  Close pipeline leads with autonomous sales agents
                </h3>
                <p className="text-xs sm:text-sm text-clay-muted leading-relaxed font-semibold">
                  Deploy sales agents to enrich pipeline prospects, write customized objection-handling emails, and record contact details in your CRM on autopilot.
                </p>
                
                {/* Quote block */}
                <div className="border-l-2 border-clay-lavender-border pl-3 py-1 mt-4">
                  <p className="text-xs text-clay-muted italic font-semibold">
                    "Within two weeks, our Sales Agent enriched 1,400 leads and booked 82 meetings."
                  </p>
                  <span className="text-[10px] text-clay-lavender-text font-bold block mt-1">
                    Sarah Jenkins, VP of Revenue at Aether Analytics
                  </span>
                </div>

                {/* Double button row */}
                <div className="flex flex-wrap gap-3 pt-2">
                  <button
                    onClick={() => setBookDemoOpen(true)}
                    className="bg-clay-lavender-text hover:bg-indigo-700 text-white font-bold px-5 py-2.5 rounded-lg text-xs transition-colors shadow-sm cursor-pointer"
                  >
                    Hire Sales Agent {"→"}
                  </button>
                  <button
                    onClick={() => setBookDemoOpen(true)}
                    className="bg-white border border-clay-lavender-border text-clay-lavender-text hover:bg-indigo-50 font-bold px-5 py-2.5 rounded-lg text-xs transition-colors shadow-sm cursor-pointer"
                  >
                    Explore Sales Playbooks
                  </button>
                </div>
              </div>
              <div className="lg:col-span-6 flex justify-center">
                <img 
                  src="/illustration_sales.png" 
                  alt="Sales Illustration" 
                  className="w-full max-w-[280px] object-contain animate-float" 
                />
              </div>
            </div>

            {/* Card 2: Marketing / Growth Campaigns */}
            <div className="sticky top-24 z-20 w-full bg-[#FFF7ED] border border-clay-peach-border rounded-3xl p-6 sm:p-10 shadow-[0_8px_30px_rgba(234,88,12,0.06)] hover:shadow-[0_12px_35px_rgba(234,88,12,0.12)] hover:translate-y-[-4px] transition-all duration-300 text-left grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-[380px]">
              <div className="lg:col-span-6 space-y-4">
                <span className="px-3 py-1 bg-white/60 border border-clay-peach-border text-clay-peach-text rounded-full text-xs font-extrabold uppercase tracking-widest">
                  Marketing
                </span>
                <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-clay-ink leading-tight">
                  Generate content and discover keyword gaps
                </h3>
                <p className="text-xs sm:text-sm text-clay-muted leading-relaxed font-semibold">
                  Deploy marketing agents to audit search trends, draft update newsletters, and publish variant ad templates programmatically.
                </p>

                {/* Quote block */}
                <div className="border-l-2 border-clay-peach-border pl-3 py-1 mt-4">
                  <p className="text-xs text-clay-muted italic font-semibold">
                    "Our Marketing Agent audited search gaps and published variations, increasing variant CTR by 18%."
                  </p>
                  <span className="text-[10px] text-clay-peach-text font-bold block mt-1">
                    Marcus Vance, Growth Director at Vertex Logistics
                  </span>
                </div>

                {/* Double button row */}
                <div className="flex flex-wrap gap-3 pt-2">
                  <button
                    onClick={() => setBookDemoOpen(true)}
                    className="bg-clay-peach-text hover:bg-orange-700 text-white font-bold px-5 py-2.5 rounded-lg text-xs transition-colors shadow-sm cursor-pointer"
                  >
                    Hire Marketing Agent {"→"}
                  </button>
                  <button
                    onClick={() => setBookDemoOpen(true)}
                    className="bg-white border border-clay-peach-border text-clay-peach-text hover:bg-orange-50 font-bold px-5 py-2.5 rounded-lg text-xs transition-colors shadow-sm cursor-pointer"
                  >
                    Explore Marketing Playbooks
                  </button>
                </div>
              </div>
              <div className="lg:col-span-6 flex justify-center">
                <img 
                  src="/illustration_marketing.png" 
                  alt="Marketing Illustration" 
                  className="w-full max-w-[280px] object-contain animate-float"
                  style={{ animationDelay: '1.5s' }}
                />
              </div>
            </div>

            {/* Card 3: Operations / SOP Automation */}
            <div className="sticky top-28 z-30 w-full bg-[#F0FDF4] border border-clay-emerald-border rounded-3xl p-6 sm:p-10 shadow-[0_8px_30px_rgba(22,163,74,0.06)] hover:shadow-[0_12px_35px_rgba(22,163,74,0.12)] hover:translate-y-[-4px] transition-all duration-300 text-left grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-[380px]">
              <div className="lg:col-span-6 space-y-4">
                <span className="px-3 py-1 bg-white/60 border border-clay-emerald-border text-clay-emerald-text rounded-full text-xs font-extrabold uppercase tracking-widest">
                  Operations
                </span>
                <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-clay-ink leading-tight">
                  Connect systems and automate business SOPs
                </h3>
                <p className="text-xs sm:text-sm text-clay-muted leading-relaxed font-semibold">
                  Deploy operations agents to execute cogs workflows. Synchronize Notion desks, database records, and Stripe payments automatically on active webhooks.
                </p>

                {/* Quote block */}
                <div className="border-l-2 border-clay-emerald-border pl-3 py-1 mt-4">
                  <p className="text-xs text-clay-muted italic font-semibold">
                    "Operations syncs and reconciliations that used to take hours now resolve in under 500ms."
                  </p>
                  <span className="text-[10px] text-clay-emerald-text font-bold block mt-1">
                    Diana Vance, Operations Lead at Supaflow
                  </span>
                </div>

                {/* Double button row */}
                <div className="flex flex-wrap gap-3 pt-2">
                  <button
                    onClick={() => setBookDemoOpen(true)}
                    className="bg-clay-emerald-text hover:bg-green-700 text-white font-bold px-5 py-2.5 rounded-lg text-xs transition-colors shadow-sm cursor-pointer"
                  >
                    Hire Operations Agent {"→"}
                  </button>
                  <button
                    onClick={() => setBookDemoOpen(true)}
                    className="bg-white border border-clay-emerald-border text-clay-emerald-text hover:bg-green-50 font-bold px-5 py-2.5 rounded-lg text-xs transition-colors shadow-sm cursor-pointer"
                  >
                    Explore Operations Playbooks
                  </button>
                </div>
              </div>
              <div className="lg:col-span-6 flex justify-center">
                <img 
                  src="/illustration_operations.png" 
                  alt="Operations Illustration" 
                  className="w-full max-w-[280px] object-contain animate-float"
                  style={{ animationDelay: '3s' }}
                />
              </div>
            </div>

            {/* Card 4: Finance / Invoice Reconciliation */}
            <div className="sticky top-32 z-40 w-full bg-[#FFFDF0] border border-clay-amber-border rounded-3xl p-6 sm:p-10 shadow-[0_8px_30px_rgba(217,119,6,0.06)] hover:shadow-[0_12px_35px_rgba(217,119,6,0.12)] hover:translate-y-[-4px] transition-all duration-300 text-left grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-[380px]">
              <div className="lg:col-span-6 space-y-4">
                <span className="px-3 py-1 bg-white/60 border border-clay-amber-border text-clay-amber-text rounded-full text-xs font-extrabold uppercase tracking-widest">
                  Finance
                </span>
                <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-clay-ink leading-tight">
                  Audit transactions and reconcile invoices
                </h3>
                <p className="text-xs sm:text-sm text-clay-muted leading-relaxed font-semibold">
                  Deploy finance agents to run Stripe transaction audits, generate ledger profiles, and check Quickbooks balance drifts on Closed-Won deals.
                </p>

                {/* Quote block */}
                <div className="border-l-2 border-clay-amber-border pl-3 py-1 mt-4">
                  <p className="text-xs text-clay-muted italic font-semibold">
                    "Our monthly invoices and billing slips are reconciled automatically, saving hours of manual audit."
                  </p>
                  <span className="text-[10px] text-clay-amber-text font-bold block mt-1">
                    Diana Moreno, Head of SecOps at Supaflow
                  </span>
                </div>

                {/* Double button row */}
                <div className="flex flex-wrap gap-3 pt-2">
                  <button
                    onClick={() => setBookDemoOpen(true)}
                    className="bg-clay-amber-text hover:bg-amber-700 text-white font-bold px-5 py-2.5 rounded-lg text-xs transition-colors shadow-sm cursor-pointer"
                  >
                    Hire Finance Agent {"→"}
                  </button>
                  <button
                    onClick={() => setBookDemoOpen(true)}
                    className="bg-white border border-clay-amber-border text-clay-amber-text hover:bg-amber-50 font-bold px-5 py-2.5 rounded-lg text-xs transition-colors shadow-sm cursor-pointer"
                  >
                    Explore Finance Playbooks
                  </button>
                </div>
              </div>
              <div className="lg:col-span-6 flex justify-center">
                <img 
                  src="/illustration_finance.png" 
                  alt="Finance Illustration" 
                  className="w-full max-w-[280px] object-contain animate-float"
                  style={{ animationDelay: '4.5s' }}
                />
              </div>
            </div>

          </div>
        </section>

        {/* SOLUTIONS / AGENT MARKETPLACE SECTION */}
        <section id="solutions" className="mb-32 scroll-mt-24 reveal">
          <div className="text-center mb-12">
            <h2 className="text-xs uppercase tracking-widest text-clay-lavender-text font-bold mb-2">Build AI-Native Teams</h2>
            <h3 className="text-3xl sm:text-4xl font-display font-bold text-clay-ink tracking-tight">
              Hire Specialized AI Teammates
            </h3>
            <p className="text-clay-muted mt-4 max-w-xl mx-auto text-sm sm:text-base font-semibold leading-relaxed">
              Startups can design AI-native structures from day one, while traditional enterprises can scale existing divisions by hiring agents to work alongside their human staff.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">

            {/* Agent Select Side tabs */}
            <div className="lg:col-span-4 flex flex-col gap-3">
              {agentsList.map(agent => (
                <button
                  key={agent.id}
                  onClick={() => setActiveMarketplaceAgent(agent.id)}
                  className={`p-4 rounded-xl border text-left transition-all duration-300 cursor-pointer flex items-center justify-between group active:scale-98 shadow-sm ${activeMarketplaceAgent === agent.id
                    ? 'border-clay-lavender-text bg-clay-lavender-bg text-clay-lavender-text shadow-[0_4px_15px_rgba(79,70,229,0.08)]'
                    : 'border-clay-border bg-white text-clay-muted hover:text-clay-ink hover:border-clay-border-hover'
                    }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center bg-white border border-clay-border group-hover:border-clay-border-hover transition-colors shadow-sm`}>
                      {agent.icon}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-clay-ink leading-none">{agent.name}</h4>
                      <span className="text-[10px] text-clay-muted font-semibold block mt-1">{agent.role}</span>
                    </div>
                  </div>
                  <ChevronRight className={`w-4 h-4 text-clay-muted group-hover:text-clay-ink transition-transform ${activeMarketplaceAgent === agent.id ? 'translate-x-1' : ''
                    }`} />
                </button>
              ))}
            </div>

            {/* Selected Agent detail panels */}
            <div className="lg:col-span-8 flex flex-col justify-between p-6 sm:p-8 rounded-2xl border border-clay-border bg-[#FFFBF5] relative overflow-hidden shadow-sm">
              {agentsList.map(agent => {
                if (agent.id !== activeMarketplaceAgent) return null;
                return (
                  <div key={agent.id} className="flex flex-col h-full justify-between gap-6">
                    <div className="absolute top-0 right-0 w-32 h-32 rounded-full blur-[40px] opacity-15 bg-clay-lavender-text"></div>

                    <div>
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-white border border-clay-border shadow-sm">
                          {agent.icon}
                        </div>
                        <div>
                          <h4 className="text-xl font-bold text-clay-ink">{agent.name}</h4>
                          <span className="text-xs text-clay-lavender-text font-mono font-bold">{agent.role}</span>
                        </div>
                      </div>

                      <p className="text-sm text-clay-muted leading-relaxed mb-6">
                        {agent.description}
                      </p>

                      {/* Capabilities checklist */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                          <h5 className="text-[10px] font-bold uppercase tracking-wider text-clay-muted mb-3">Key Automation Strengths</h5>
                          <ul className="space-y-2.5">
                            {agent.capabilities.map((cap, i) => (
                              <li key={i} className="flex items-start gap-2 text-xs text-clay-muted font-medium">
                                <CheckCircle2 className="w-4.5 h-4.5 text-clay-lavender-text shrink-0 mt-0.5" />
                                <span>{cap}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h5 className="text-[10px] font-bold uppercase tracking-wider text-clay-muted mb-3">Integration Stack</h5>
                          <div className="flex flex-wrap gap-1.5">
                            {agent.integrations.map((tool, i) => (
                              <span key={i} className="px-2.5 py-1 bg-white border border-clay-border text-clay-ink rounded-lg text-xs font-semibold font-mono shadow-sm">
                                {tool}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* SOP Instructions Example */}
                      <div className="border-t border-clay-border pt-6">
                        <h5 className="text-[10px] font-bold uppercase tracking-wider text-clay-muted mb-2">Sample SOP Instruction File</h5>
                        <div className="p-4 rounded-xl bg-white border border-clay-border font-mono text-xs text-clay-muted relative shadow-sm">
                          <div className="absolute top-3 right-3 flex items-center gap-1.5 text-[9px] text-clay-muted font-semibold">
                            <span className="w-1.5 h-1.5 rounded-full bg-clay-lavender-text"></span>
                            <span>sop_guidelines.txt</span>
                          </div>
                          <p className="leading-relaxed pr-12 font-medium">
                            "{agent.sopSample}"
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-between pt-6 border-t border-clay-border gap-4 mt-6">
                      <div className="flex items-center gap-2 text-xs text-clay-muted font-medium">
                        <Lock className="w-4 h-4 text-zinc-400" />
                        <span>Encrypted parameters sandboxing active.</span>
                      </div>
                      <button
                        onClick={() => setBookDemoOpen(true)}
                        className="w-full sm:w-auto px-5 py-2.5 rounded-lg bg-clay-ink hover:bg-zinc-800 text-clay-bg text-xs font-bold shadow transition-all cursor-pointer select-none active:scale-95 text-center border border-clay-ink"
                      >
                        Hire {agent.name}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        </section>

        {/* HOW IT WORKS SECTION */}
        <section id="how-it-works" className="mb-32 scroll-mt-24 reveal">
          <div className="text-center mb-16">
            <h2 className="text-xs uppercase tracking-widest text-clay-purple-text bg-clay-purple-bg border border-clay-purple-border px-3 py-1 rounded-full w-fit mx-auto font-bold mb-2">Step-by-Step</h2>
            <h3 className="text-3xl sm:text-4xl font-display font-bold text-clay-ink tracking-tight mt-3">
              Deploy Your Autonomous Workforce
            </h3>
            <p className="text-clay-muted mt-2 max-w-lg mx-auto text-sm sm:text-base">
              Hiring AI agents is simple. Set up your workflow variables and launch background execution cycles in under 15 minutes.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

            {/* Steps Timeline Navigation */}
            <div className="lg:col-span-5 space-y-4">
              {steps.map((st, i) => (
                <div
                  key={i}
                  onMouseEnter={() => setActiveStepIndex(i)}
                  onClick={() => setActiveStepIndex(i)}
                  className={`p-5 rounded-2xl border text-left cursor-pointer transition-all duration-300 shadow-sm ${activeStepIndex === i
                    ? 'border-clay-purple-border bg-clay-purple-bg shadow-[0_4px_15px_rgba(124,58,237,0.08)]'
                    : 'border-clay-border bg-white hover:border-clay-border-hover'
                    }`}
                >
                  <div className="flex items-start gap-4">
                    <span className="font-display font-bold text-lg text-clay-purple-text leading-none mt-1">
                      {st.step}
                    </span>
                    <div>
                      <h4 className="text-base font-bold text-clay-ink flex items-center gap-2">
                        {st.title}
                        {activeStepIndex === i && <Sparkles className="w-3.5 h-3.5 text-clay-purple-text" />}
                      </h4>
                      <p className="text-xs text-clay-muted leading-relaxed mt-1.5 font-medium">
                        {st.desc}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Interactive Visual Pane */}
            <div className="lg:col-span-7 p-6 rounded-2xl border border-clay-border bg-white min-h-[300px] flex flex-col justify-between relative overflow-hidden shadow-sm text-left">
              <div className="absolute top-0 right-0 w-32 h-32 rounded-full blur-[40px] opacity-10 bg-clay-purple-text"></div>

              <div>
                <div className="flex items-center gap-3 border-b border-clay-border pb-3 mb-6">
                  <div className="w-8 h-8 rounded-lg bg-clay-bg border border-clay-border flex items-center justify-center shadow-sm">
                    {steps[activeStepIndex].icon}
                  </div>
                  <div>
                    <span className="text-[10px] text-clay-muted font-mono uppercase tracking-wider block">Operational Step {steps[activeStepIndex].step}</span>
                    <h4 className="text-sm font-bold text-clay-ink">{steps[activeStepIndex].title}</h4>
                  </div>
                </div>

                <p className="text-sm text-clay-muted leading-relaxed pr-6 mb-8">
                  {steps[activeStepIndex].details}
                </p>
              </div>

              {/* Step UI simulator visuals */}
              <div>
                {activeStepIndex === 0 && (
                  <div className="p-4 bg-clay-bg border border-clay-border rounded-xl space-y-2 font-mono text-xs text-clay-muted shadow-inner">
                    <div className="flex items-center justify-between text-[10px] text-zinc-400 border-b border-clay-border pb-1.5 mb-2">
                      <span>SOP SETTINGS</span>
                      <span>UTF-8</span>
                    </div>
                    <p className="text-clay-lavender-text font-bold">1. Role: Close Inbound Leads</p>
                    <p className="font-semibold text-clay-ink">2. When: Lead scored {'>'} 80</p>
                    <p className="font-semibold text-clay-ink">3. Action: Query CRM, fetch company profile, draft response</p>
                  </div>
                )}

                {activeStepIndex === 1 && (
                  <div className="grid grid-cols-3 gap-2.5 text-center">
                    {['Slack', 'HubSpot', 'Salesforce', 'Gmail', 'Stripe', 'GitHub'].map((tool, idx) => (
                      <div key={idx} className="p-3 bg-white border border-clay-border rounded-xl flex flex-col items-center justify-center gap-2 hover:border-clay-border-hover transition-colors shadow-sm">
                        <span className="text-xs font-bold text-clay-ink">{tool}</span>
                        <span className="px-2 py-0.5 rounded-full text-[8px] bg-clay-emerald-bg text-clay-emerald-text font-bold border border-clay-emerald-border uppercase tracking-widest font-mono">CONNECTED</span>
                      </div>
                    ))}
                  </div>
                )}

                {activeStepIndex === 2 && (
                  <div className="p-4 bg-clay-bg border border-clay-border rounded-xl space-y-3 font-mono text-xs shadow-inner">
                    <div className="flex items-center justify-between text-[10px] text-zinc-400">
                      <span>KNOWLEDGE BASE SOURCES</span>
                      <span>2 files imported</span>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-white border border-clay-border rounded-lg shadow-sm">
                      <span className="text-clay-ink font-semibold">sales_playbook_2026.pdf</span>
                      <span className="text-[10px] text-clay-muted">5.2 MB</span>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-white border border-clay-border rounded-lg shadow-sm">
                      <span className="text-clay-ink font-semibold">compliance_checklist.md</span>
                      <span className="text-[10px] text-clay-muted">14 KB</span>
                    </div>
                  </div>
                )}

                {activeStepIndex === 3 && (
                  <div className="p-4 bg-clay-bg border border-clay-border rounded-xl flex items-center justify-between gap-4 font-mono text-xs shadow-inner">
                    <div>
                      <span className="text-zinc-400 block text-[10px]">Autopilot Status</span>
                      <span className="text-clay-emerald-text font-bold text-sm block mt-0.5 animate-pulse">FULLY AUTONOMOUS</span>
                    </div>
                    <div className="w-14 h-7 bg-clay-emerald-text rounded-full p-1 flex items-center justify-end cursor-pointer">
                      <div className="w-5 h-5 bg-white rounded-full shadow"></div>
                    </div>
                  </div>
                )}
              </div>

            </div>

          </div>
        </section>

        {/* USE CASES & TESTIMONIALS SECTION */}
        <section id="testimonials" className="mb-32 scroll-mt-24 reveal">
          <div className="text-center mb-16">
            <h2 className="text-xs uppercase tracking-widest text-clay-pink-text bg-clay-pink-bg border border-clay-pink-border px-3 py-1 rounded-full w-fit mx-auto font-bold mb-2">Customer Success</h2>
            <h3 className="text-3xl sm:text-4xl font-display font-bold text-clay-ink tracking-tight mt-3">
              Validated Real-World Impact
            </h3>
            <p className="text-clay-muted mt-2 max-w-lg mx-auto text-sm sm:text-base">
              Read how enterprise security and operations leads scale pipelines using Cofoundr\'s autonomous agent fleet.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            {testimonials.map((t, idx) => (
              <div
                key={idx}
                className={`p-6 sm:p-8 rounded-2xl border bg-white relative overflow-hidden flex flex-col justify-between transition-all duration-300 shadow-sm hover:translate-y-[-4px] ${t.hoverEffectClass}`}
              >
                <div className={`absolute top-0 right-0 w-24 h-24 rounded-full blur-[40px] opacity-20 bg-gradient-to-tr ${t.gradient}`}></div>

                <div>
                  {/* Metric header */}
                  <div className="mb-6">
                    <span className="text-[10px] font-bold font-mono bg-clay-bg border border-clay-border px-2.5 py-1 text-clay-muted rounded-full tracking-wider shadow-sm">
                      {t.agentUsed}
                    </span>
                    <span className="text-base sm:text-lg font-extrabold text-clay-ink block mt-4 leading-snug">
                      "{t.metrics}"
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-clay-muted leading-relaxed mb-8 italic font-medium">
                    "{t.quote}"
                  </p>
                </div>

                <div className="flex items-center gap-3 border-t border-clay-border pt-4 mt-6">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 to-purple-600 flex items-center justify-center font-display font-bold text-xs text-white shrink-0 shadow-sm border border-white/20">
                    {t.author.charAt(0)}{t.author.split(' ')[1]?.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-clay-ink leading-none">{t.author}</h4>
                    <span className="text-[10px] text-clay-muted font-semibold mt-1 block">{t.role}, {t.company}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ROI CALCULATOR SECTION */}
        <section className="mb-32 reveal">
          <div className="text-center mb-16">
            <h2 className="text-xs uppercase tracking-widest text-clay-emerald-text bg-clay-emerald-bg border border-clay-emerald-border px-3 py-1 rounded-full w-fit mx-auto font-bold mb-2">Cost Optimization</h2>
            <h3 className="text-3xl sm:text-4xl font-display font-bold text-clay-ink tracking-tight mt-3">
              Compare Human Onboarding vs. AI Teammates
            </h3>
            <p className="text-clay-muted mt-2 max-w-lg mx-auto text-sm sm:text-base font-semibold leading-relaxed">
              It takes 6 months and substantial cost to get a human employee up to speed. Contrast that timeline with the instant deployment of Cofoundr AI agents.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch max-w-5xl mx-auto">

            {/* Sliders Input Panel */}
            <div className="lg:col-span-5 p-6 sm:p-8 rounded-2xl border border-clay-border bg-white flex flex-col justify-between shadow-sm text-left">
              <div>
                <h4 className="text-base font-bold text-clay-ink mb-6">Onboarding Variables</h4>

                <div className="space-y-8">
                  {/* FTE slider */}
                  <div>
                    <div className="flex justify-between text-xs font-semibold mb-2">
                      <span className="text-clay-muted">Teammates to Onboard</span>
                      <span className="text-clay-ink font-bold font-mono">{roiFTEs} Employees</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="15"
                      step="1"
                      value={roiFTEs}
                      onChange={(e) => setRoiFTEs(Number(e.target.value))}
                      className="w-full accent-clay-lavender-text h-1.5 bg-zinc-100 rounded-lg cursor-pointer"
                    />
                    <span className="text-[10px] text-clay-muted mt-1.5 block leading-normal font-medium">
                      Number of roles you need to hire and train to manage your workflows.
                    </span>
                  </div>

                  {/* Salary slider */}
                  <div>
                    <div className="flex justify-between text-xs font-semibold mb-2">
                      <span className="text-clay-muted">Ramp-Up Monthly Overhead</span>
                      <span className="text-clay-ink font-bold font-mono">${roiSalary.toLocaleString()} / mo</span>
                    </div>
                    <input
                      type="range"
                      min="3000"
                      max="15000"
                      step="500"
                      value={roiSalary}
                      onChange={(e) => setRoiSalary(Number(e.target.value))}
                      className="w-full accent-clay-lavender-text h-1.5 bg-zinc-100 rounded-lg cursor-pointer"
                    />
                    <span className="text-[10px] text-clay-muted mt-1.5 block leading-normal font-medium">
                      Includes recruitment, training hours, wages during the 6-month ramp-up phase, and tools.
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-8 border-t border-clay-border pt-6">
                <div className="flex justify-between items-center text-xs text-clay-muted font-semibold">
                  <span>Cofoundr Agent Flat Fee:</span>
                  <span className="text-clay-ink font-bold font-mono">$999 / mo</span>
                </div>
              </div>
            </div>

            {/* Savings Outcome Displays */}
            <div className="lg:col-span-7 p-6 sm:p-8 rounded-2xl border border-clay-emerald-border bg-[#F5FDF9] flex flex-col justify-between relative overflow-hidden shadow-sm text-left">
              <div className="absolute top-0 right-0 w-44 h-44 rounded-full bg-clay-emerald-text/5 blur-[50px] pointer-events-none"></div>

              <div>
                <span className="text-[10px] font-mono uppercase text-clay-emerald-text px-3 py-1 rounded-full border border-clay-emerald-border bg-clay-emerald-bg font-bold">
                  6-MONTH ONBOARDING BRIDGE
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6 mt-8">
                  <div>
                    <span className="text-xs text-clay-muted block font-semibold">Ramp-Up Monthly Cost (First 6 Mos)</span>
                    <span className="text-xl font-medium text-clay-muted line-through mt-1 block font-mono">
                      ${humanSalaryFTE.toLocaleString()}
                    </span>
                  </div>
                  <div>
                    <span className="text-xs text-clay-muted block font-semibold">Saved Monthly Overhead</span>
                    <span className="text-2xl font-bold text-clay-emerald-text mt-1 block font-mono">
                      +${netSavingsMonthly.toLocaleString()}
                    </span>
                  </div>
                  <div>
                    <span className="text-xs text-clay-muted block font-semibold">Total Year 1 Savings</span>
                    <span className="text-4xl sm:text-5xl font-display font-bold text-clay-ink mt-1.5 block font-mono">
                      +${netSavingsYearly.toLocaleString()}
                    </span>
                  </div>
                  <div>
                    <span className="text-xs text-clay-muted block font-semibold">Total Staffing Cost Cut</span>
                    <span className="text-4xl sm:text-5xl font-display font-bold text-clay-emerald-text mt-1.5 block font-mono">
                      {costPercentReduction}%
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-8 border-t border-clay-border pt-6 grid grid-cols-3 gap-2.5 text-[10px] text-clay-muted font-bold">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4.5 h-4.5 text-clay-emerald-text shrink-0" />
                  <span>24/7 Autonomy</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4.5 h-4.5 text-clay-emerald-text shrink-0" />
                  <span>Zero Hiring Fees</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4.5 h-4.5 text-clay-emerald-text shrink-0" />
                  <span>Flat Subscription</span>
                </div>
              </div>

            </div>

          </div>
        </section>

        {/* PRICING FLAT BUNDLE SECTION */}
        <section id="pricing" className="mb-32 scroll-mt-24 max-w-4xl mx-auto reveal">
          <div className="text-center mb-12">
            <h2 className="text-xs uppercase tracking-widest text-clay-purple-text bg-clay-purple-bg border border-clay-purple-border px-3 py-1 rounded-full w-fit mx-auto font-bold mb-2">Pricing Structure</h2>
            <h3 className="text-3xl sm:text-4xl font-display font-bold text-clay-ink tracking-tight mt-3">
              Unlock Your Entire AI Suite
            </h3>
            <p className="text-clay-muted mt-2 max-w-lg mx-auto text-sm sm:text-base">
              No complex tiered models. Single license grants access to all agents with unlimited workflow operations.
            </p>
          </div>

          {/* Pricing Glass Card */}
          <div className="relative border border-clay-purple-border rounded-3xl p-6 sm:p-12 text-center overflow-hidden shadow-md bg-gradient-to-tr from-clay-purple-bg via-clay-blue-bg to-white hover:shadow-lg transition-shadow duration-300">
            <div className="absolute top-0 right-0 w-36 h-36 bg-purple-200/40 rounded-full blur-[45px] pointer-events-none animate-pulse-slow"></div>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-clay-purple-border bg-white text-xs text-clay-purple-text font-mono font-bold mb-8 shadow-sm">
              <Sparkles className="w-4 h-4 text-clay-purple-text animate-spin" style={{ animationDuration: '6s' }} />
              <span>FOUNDERS EARLY-BIRD - LIMITED LICENSE ACCESS</span>
            </div>

            <div className="mb-6 flex items-baseline justify-center gap-1.5">
              <span className="text-clay-muted text-lg align-top font-bold">$</span>
              <span className="text-6xl sm:text-7xl font-display font-bold text-clay-ink tracking-tight font-mono">999</span>
              <span className="text-clay-muted text-sm font-bold">/ month</span>
            </div>

            <p className="text-sm sm:text-base text-clay-muted max-w-lg mx-auto leading-relaxed mb-8 font-medium">
              Access Sales, Marketing, Operations, Finance, and Compliance agents. Includes custom documentation training uploads, unlimited pipeline executions, and premium direct Slack channel support.
            </p>

            <div className="mb-10">
              <button
                onClick={() => setBookDemoOpen(true)}
                className="w-full sm:w-auto px-10 py-4 rounded-xl bg-clay-ink hover:bg-zinc-800 text-clay-bg font-bold text-sm shadow hover:shadow-md transition-all cursor-pointer select-none active:scale-95 border border-clay-ink"
              >
                Secure Agent Suite License
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8 border-t border-clay-border text-xs text-clay-muted text-left font-bold">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-clay-purple-text shrink-0" />
                <span>Unlimited Pipelines</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-clay-purple-text shrink-0" />
                <span>Custom memory ingestion</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-clay-purple-text shrink-0" />
                <span>Approval checkpings</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-clay-purple-text shrink-0" />
                <span>Private Slack support channel</span>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ ACCORDION SECTION */}
        <section id="faq" className="mb-32 scroll-mt-24 max-w-3xl mx-auto reveal">
          <div className="text-center mb-12">
            <h2 className="text-xs uppercase tracking-widest text-clay-muted font-bold mb-2">Have Questions?</h2>
            <h3 className="text-2xl sm:text-3xl font-display font-bold text-clay-ink tracking-tight">
              Frequently Asked Questions
            </h3>
          </div>

          <div className="space-y-4 text-left">
            {faqItems.map((item, idx) => (
              <div
                key={idx}
                className="rounded-xl border border-clay-border bg-white overflow-hidden shadow-sm hover:border-clay-border-hover transition-all duration-300"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full px-6 py-4.5 flex items-center justify-between text-left text-clay-ink font-semibold hover:bg-clay-bg/50 transition-colors cursor-pointer select-none"
                >
                  <span className="text-sm sm:text-base pr-6">{item.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-clay-muted shrink-0 transition-transform duration-300 ${openFaq === idx ? 'rotate-180 text-clay-lavender-text' : ''
                      }`}
                  />
                </button>

                <div
                  className={`transition-all duration-300 ease-in-out ${openFaq === idx ? 'max-h-[300px] border-t border-clay-border' : 'max-h-0'
                    } overflow-hidden`}
                >
                  <p className="px-6 py-4.5 text-xs sm:text-sm text-clay-muted leading-relaxed bg-[#FFFBF5]/50 font-medium">
                    {item.a}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FINAL CTA & EMAIL CAPTURE SECTION */}
        <section className="mb-20 max-w-4xl mx-auto reveal">
          <div className="relative rounded-3xl border border-clay-border bg-[#FFFBF5] p-8 sm:p-14 text-center overflow-hidden shadow-sm">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-blue-100/30 rounded-full blur-[100px] pointer-events-none"></div>

            <div className="max-w-2xl mx-auto">
              <h3 className="font-display font-bold text-3xl sm:text-4xl text-clay-ink tracking-tight mb-4">
                Hire your first agent teammate today.
              </h3>
              <p className="text-clay-muted text-sm sm:text-base leading-relaxed mb-8 font-medium">
                Request access to the Cofoundr early client cohort. Deploy autonomous team execution models in production and scale operation margins instantly.
              </p>

              {earlyAccessSuccess ? (
                <div className="p-4 bg-clay-emerald-bg border border-clay-emerald-border text-clay-emerald-text rounded-xl font-bold text-sm max-w-md mx-auto animate-pulse flex items-center justify-center gap-2 shadow-sm">
                  <Check className="w-4.5 h-4.5" />
                  <span>Success! We have queued your early access request.</span>
                </div>
              ) : (
                <form onSubmit={handleEarlyAccessSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto items-stretch">
                  <div className="relative flex-1">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                    <input
                      type="email"
                      required
                      placeholder="Enter company email..."
                      value={earlyAccessEmail}
                      onChange={(e) => setEarlyAccessEmail(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-white border border-clay-border hover:border-clay-border-hover focus:border-clay-lavender-text rounded-xl text-clay-ink text-sm focus:outline-none focus:ring-0 placeholder-zinc-400 transition-all font-semibold shadow-sm"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={earlyAccessLoading}
                    className="px-6 py-3 bg-clay-ink text-clay-bg hover:bg-zinc-800 rounded-xl text-sm font-bold transition-all active:scale-95 select-none cursor-pointer flex items-center justify-center gap-1.5 shadow-sm border border-clay-ink"
                  >
                    {earlyAccessLoading ? (
                      <RefreshCw className="w-4.5 h-4.5 animate-spin text-clay-bg" />
                    ) : (
                      <>
                        Request Access
                        <ArrowRight className="w-4 h-4 text-clay-bg" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>

      </main>

      {/* FOOTER */}
      <footer className="mt-auto border-t border-clay-border bg-white py-12 lg:py-16 relative z-10 text-left">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">

            {/* Branding Column */}
            <div className="space-y-4">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-blue-600 to-purple-600 flex items-center justify-center shadow-sm">
                  <Cpu className="w-4 h-4 text-white" />
                </div>
                <span className="font-display font-bold text-lg tracking-tight text-clay-ink">Cofoundr</span>
              </div>
              <p className="text-xs text-clay-muted leading-relaxed pr-4 font-semibold">
                Enterprise-grade autonomous AI agents running 24/7 in sales, marketing, operations, and compliance.
              </p>
            </div>

            {/* Links Columns */}
            <div>
              <h4 className="text-[10px] font-bold uppercase tracking-wider text-clay-ink mb-3.5">Solutions</h4>
              <ul className="space-y-2 text-xs font-semibold">
                <li><a href="#solutions" className="text-clay-muted hover:text-clay-ink transition-colors">Sales Closing</a></li>
                <li><a href="#solutions" className="text-clay-muted hover:text-clay-ink transition-colors">Growth Marketing</a></li>
                <li><a href="#solutions" className="text-clay-muted hover:text-clay-ink transition-colors">Operations Reconciler</a></li>
                <li><a href="#solutions" className="text-clay-muted hover:text-clay-ink transition-colors">KYC / Compliance Audit</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-[10px] font-bold uppercase tracking-wider text-clay-ink mb-3.5">Resources</h4>
              <ul className="space-y-2 text-xs font-semibold">
                <li><a href="#how-it-works" className="text-clay-muted hover:text-clay-ink transition-colors">How it Works</a></li>
                <li><a href="#pricing" className="text-clay-muted hover:text-clay-ink transition-colors">Pricing Structure</a></li>
                <li><a href="#faq" className="text-clay-muted hover:text-clay-ink transition-colors">FAQs</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-[10px] font-bold uppercase tracking-wider text-clay-ink mb-3.5">System Health</h4>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-clay-emerald-border bg-clay-emerald-bg text-[11px] text-clay-emerald-text font-mono w-fit font-bold shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-clay-emerald-text animate-pulse"></span>
                <span>All Agents Online</span>
              </div>
            </div>

          </div>

          <div className="border-t border-clay-border pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-clay-muted font-mono font-bold">
              &copy; {new Date().getFullYear()} COFOUNDR. WORLD. ALL RIGHTS RESERVED.
            </p>
            <div className="flex items-center gap-6 text-xs font-semibold">
              <a href="#privacy" className="text-clay-muted hover:text-clay-ink transition-colors">Privacy Policy</a>
              <a href="#terms" className="text-clay-muted hover:text-clay-ink transition-colors">Terms of Service</a>
            </div>
          </div>

        </div>
      </footer>

      {/* WATCH DEMO MODAL (With actual video player inside) */}
      {watchDemoOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-3xl rounded-2xl border border-clay-border bg-white overflow-hidden shadow-2xl text-left animate-modal-zoom">

            {/* Modal Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-clay-border bg-clay-bg/50">
              <div className="flex items-center gap-2">
                <Play className="w-4.5 h-4.5 text-clay-lavender-text fill-clay-lavender-bg" />
                <h3 className="text-sm font-bold text-clay-ink font-display">Cofoundr Agent Walkthrough Simulation</h3>
              </div>
              <button
                onClick={closeWatchDemoModal}
                className="p-1 text-clay-muted hover:text-clay-ink hover:bg-clay-border/50 rounded-lg transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Video Walkthrough Mock Content */}
            <div className="p-6 space-y-6 bg-white">

              {/* Simulator video display */}
              <div className="relative aspect-video rounded-xl bg-zinc-950 border border-clay-border overflow-hidden flex flex-col justify-between p-4 group shadow-inner">
                {isVideoPlaying ? (
                  <video 
                    src="/agent-sail-demo-guided.mp4" 
                    controls 
                    autoPlay
                    className="absolute inset-0 w-full h-full object-cover z-0"
                  />
                ) : (
                  <>
                    <div className="absolute inset-0 bg-black/75 z-10"></div>
                    
                    {/* Visual simulator graphics representing code deployment */}
                    <div className="relative z-0 space-y-2.5 font-mono text-[10px] text-zinc-500 overflow-hidden select-none opacity-50">
                      <p className="text-clay-purple-text font-bold">$ cofoundr agent:deploy --role=SalesAgent --sop=lead_closing.txt</p>
                      <p>🚀 Bundling system configuration...</p>
                      <p>🔒 Encryption keys sandboxed securely.</p>
                      <p>⚡ Connect HubSpot CRM API... SUCCESS [oauth_token=2026_prod_token]</p>
                      <p>⚡ Connect Gmail IMAP Server... SUCCESS [oauth_token=gmail_read_write]</p>
                      <p>🧠 Ingesting sales_playbook_2026.pdf [vectors=142, size=5.2MB]... DONE</p>
                      <p className="text-clay-emerald-text font-bold">✨ Agent Sail is now operational on Autopilot. Monitoring webhook streams...</p>
                    </div>

                    <div className="absolute inset-0 flex items-center justify-center z-20">
                      <button
                        type="button"
                        onClick={() => setIsVideoPlaying(true)}
                        className="w-16 h-16 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/25 cursor-pointer hover:scale-105 active:scale-95 transition-all shadow-lg"
                      >
                        <Play className="w-6 h-6 text-white fill-white" />
                      </button>
                    </div>

                    <div className="relative z-20 flex items-center justify-between text-xs text-zinc-400 pr-2">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-clay-blue-text animate-pulse"></span>
                        <span>Click Play to watch guided demo</span>
                      </div>
                      <span 
                        onClick={() => setIsVideoPlaying(true)} 
                        className="underline hover:text-white cursor-pointer select-none font-bold"
                      >
                        Watch Video
                      </span>
                    </div>
                  </>
                )}
              </div>

              {/* Text explaining what is seen */}
              <div className="space-y-2.5">
                <h4 className="text-sm font-bold text-clay-ink">How agents run on your company pipeline</h4>
                <p className="text-xs text-clay-muted leading-relaxed font-semibold">
                  In this demo walkthrough, we show how developers and product leads specify instructions. The platform maps APIs automatically, ingests context vectors, and runs the background agent logic. Outbound notifications and draft items pop up in Slack for 1-click approvals.
                </p>
              </div>

            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-end px-5 py-4 border-t border-clay-border bg-clay-bg/50 gap-3">
              <button
                onClick={closeWatchDemoModal}
                className="px-4 py-2 text-xs font-semibold text-clay-muted hover:text-clay-ink transition-colors cursor-pointer select-none"
              >
                Close Walkthrough
              </button>
              <button
                onClick={() => { closeWatchDemoModal(); setBookDemoOpen(true); }}
                className="px-4 py-2 rounded-lg bg-clay-ink hover:bg-zinc-800 text-clay-bg text-xs font-bold shadow transition-colors cursor-pointer select-none active:scale-95 border border-clay-ink"
              >
                Book Custom Live Demo
              </button>
            </div>

          </div>
        </div>
      )}

      {/* BOOK DEMO / CALENDAR SCHEDULE MODAL */}
      {bookDemoOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-md rounded-2xl border border-clay-border bg-white overflow-hidden shadow-2xl text-left animate-modal-zoom">

            {/* Modal Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-clay-border bg-clay-bg/50">
              <div className="flex items-center gap-2">
                <Calendar className="w-4.5 h-4.5 text-clay-purple-text" />
                <h3 className="text-sm font-bold text-clay-ink font-display">Schedule Your Agent Consultation</h3>
              </div>
              <button
                onClick={() => setBookDemoOpen(false)}
                className="p-1 text-clay-muted hover:text-clay-ink hover:bg-clay-border/50 rounded-lg transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleBookingSubmit} className="p-5 space-y-4 bg-white">
              {bookingSuccess ? (
                <div className="py-8 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-clay-emerald-bg border border-clay-emerald-border flex items-center justify-center mx-auto text-clay-emerald-text animate-bounce">
                    <Check className="w-6 h-6" />
                  </div>
                  <h4 className="text-sm font-bold text-clay-ink font-display">Consultation Scheduled!</h4>
                  <p className="text-xs text-clay-muted leading-relaxed max-w-xs mx-auto font-semibold">
                    We have successfully registered your demo booking. An operations engineer will contact you shortly to review your SOP templates.
                  </p>
                </div>
              ) : (
                <>
                  {bookingStep === 1 && (
                    <div className="space-y-4">
                      <div>
                        <label className="text-[10px] font-bold uppercase tracking-wider text-clay-muted block mb-2">
                          1. Select Agents You Need
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                          {['Sales Agent', 'Marketing Agent', 'Ops Agent', 'Compliance Agent', 'Finance Agent'].map((agent) => {
                            const isSelected = selectedAgentTypes.includes(agent);
                            return (
                              <button
                                type="button"
                                key={agent}
                                onClick={() => toggleAgentType(agent)}
                                className={`p-2.5 rounded-lg border text-xs font-bold text-left transition-all ${isSelected
                                  ? 'border-clay-purple-border bg-clay-purple-bg text-clay-purple-text shadow-sm'
                                  : 'border-clay-border bg-white text-clay-muted hover:border-clay-border-hover shadow-sm'
                                  }`}
                              >
                                {agent}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      <div className="pt-2">
                        <button
                          type="button"
                          onClick={() => setBookingStep(2)}
                          className="w-full py-3 bg-clay-ink hover:bg-zinc-800 text-clay-bg rounded-xl text-xs font-bold font-display shadow transition-all active:scale-95 flex items-center justify-center gap-1 cursor-pointer select-none border border-clay-ink"
                        >
                          Continue
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  )}

                  {bookingStep === 2 && (
                    <div className="space-y-4">
                      <div>
                        <label className="text-[10px] font-bold uppercase tracking-wider text-clay-muted block mb-1.5">
                          Full Name
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. John Doe"
                          value={bookingName}
                          onChange={(e) => setBookingName(e.target.value)}
                          className="w-full px-3.5 py-2.5 bg-white border border-clay-border hover:border-clay-border-hover focus:border-clay-purple-text rounded-lg text-clay-ink text-xs focus:outline-none focus:ring-0 placeholder-zinc-400 transition-all font-semibold shadow-sm"
                        />
                      </div>

                      <div>
                        <label className="text-[10px] font-bold uppercase tracking-wider text-clay-muted block mb-1.5">
                          Work Email
                        </label>
                        <input
                          type="email"
                          required
                          placeholder="e.g. john@company.com"
                          value={bookingEmail}
                          onChange={(e) => setBookingEmail(e.target.value)}
                          className="w-full px-3.5 py-2.5 bg-white border border-clay-border hover:border-clay-border-hover focus:border-clay-purple-text rounded-lg text-clay-ink text-xs focus:outline-none focus:ring-0 placeholder-zinc-400 transition-all font-semibold shadow-sm"
                        />
                      </div>

                      <div>
                        <label className="text-[10px] font-bold uppercase tracking-wider text-clay-muted block mb-1.5">
                          Company Name
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Acme Corp"
                          value={bookingCompany}
                          onChange={(e) => setBookingCompany(e.target.value)}
                          className="w-full px-3.5 py-2.5 bg-white border border-clay-border hover:border-clay-border-hover focus:border-clay-purple-text rounded-lg text-clay-ink text-xs focus:outline-none focus:ring-0 placeholder-zinc-400 transition-all font-semibold shadow-sm"
                        />
                      </div>

                      <div className="flex gap-3 pt-2">
                        <button
                          type="button"
                          onClick={() => setBookingStep(1)}
                          className="w-1/3 py-3 rounded-xl border border-clay-border bg-white hover:bg-zinc-100 text-clay-muted hover:text-clay-ink text-xs font-bold transition-colors cursor-pointer select-none shadow-sm"
                        >
                          Back
                        </button>
                        <button
                          type="submit"
                          className="flex-1 py-3 bg-clay-purple-text hover:bg-purple-500 text-white rounded-xl text-xs font-bold font-display shadow transition-colors cursor-pointer select-none active:scale-95 text-center border border-clay-purple-text"
                        >
                          Schedule Consultation
                        </button>
                      </div>
                    </div>
                  )}
                </>
              )}
            </form>

          </div>
        </div>
      )}

    </div>
  );
}
