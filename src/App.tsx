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
}

// Google Apps Script Web App endpoint linked to your Google Sheet:
// https://docs.google.com/spreadsheets/d/1qKqhEeS86e2mCyEFYJANl6Dsljp00B0f6DT5q0VMnsk/edit
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwdARLx4pXorWxTOKjhQkTvMii-xCWvbxNHd1l6xtZlpSM26OG3EzVKESoXQqQhF4hI/exec";

export default function App() {
  // Navigation & States
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeMarketplaceAgent, setActiveMarketplaceAgent] = useState<string>('sales');
  const [watchDemoOpen, setWatchDemoOpen] = useState(false);
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
      selectedAgents: selectedAgentTypes.join(', ')
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
      // close modal or reset after delay
      setBookDemoOpen(false);
      // reset
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
      // Show success anyway for a smooth fallback client experience
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

  // Agents Definition
  const agentsList: Agent[] = [
    {
      id: 'sales',
      name: 'Sales Agent',
      role: 'Outbound Prospecting & Objections Closer',
      shortDesc: 'Scrapes leads, enriches prospects, and handles CRM data entry and complex objections 24/7.',
      description: 'The Sales Agent acts as your autonomous business development representative. It works directly inside your tools, scanning lists, personalizing emails, and writing custom objections handlers to drive revenue pipeline.',
      colorClass: 'from-blue-500/20 to-blue-600/5 border-blue-500/30 hover:border-blue-500/60',
      borderColor: 'border-blue-500/20 hover:border-blue-500/40',
      glowColor: 'bg-blue-500/10',
      textColor: 'text-blue-400',
      icon: <Users className="w-5 h-5 text-blue-400" />,
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
      colorClass: 'from-purple-500/20 to-purple-600/5 border-purple-500/30 hover:border-purple-500/60',
      borderColor: 'border-purple-500/20 hover:border-purple-500/40',
      glowColor: 'bg-purple-500/10',
      textColor: 'text-purple-400',
      icon: <TrendingUp className="w-5 h-5 text-purple-400" />,
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
      colorClass: 'from-emerald-500/20 to-emerald-600/5 border-emerald-500/30 hover:border-emerald-500/60',
      borderColor: 'border-emerald-500/20 hover:border-emerald-500/40',
      glowColor: 'bg-emerald-500/10',
      textColor: 'text-emerald-400',
      icon: <Workflow className="w-5 h-5 text-emerald-400" />,
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
      colorClass: 'from-pink-500/20 to-pink-600/5 border-pink-500/30 hover:border-pink-500/60',
      borderColor: 'border-pink-500/20 hover:border-pink-500/40',
      glowColor: 'bg-pink-500/10',
      textColor: 'text-pink-400',
      icon: <Shield className="w-5 h-5 text-pink-400" />,
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
      colorClass: 'from-amber-500/20 to-amber-600/5 border-amber-500/30 hover:border-amber-500/60',
      borderColor: 'border-amber-500/20 hover:border-amber-500/40',
      glowColor: 'bg-amber-500/10',
      textColor: 'text-amber-400',
      icon: <FileText className="w-5 h-5 text-amber-400" />,
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

  // Testimonial List
  const testimonials: Testimonial[] = [
    {
      quote: "Within two weeks, our Sales Agent enriched 1,400 inbound leads, categorized them based on custom pricing profiles, and booked 82 meetings. It operates exactly like a high-performing human representative.",
      author: "Sarah Jenkins",
      role: "VP of Revenue",
      company: "Aether Analytics",
      metrics: "82 demos booked in 14 days",
      agentUsed: "Sales Agent",
      gradient: "from-blue-500/20 to-indigo-500/5"
    },
    {
      quote: "Our Operations Agent runs inventory syncs and Stripe reconciliation webhooks 24/7. Anomaly checks that used to occupy hours for our finance desk now resolve in less than 500 milliseconds.",
      author: "Marcus Vance",
      role: "Director of Business Ops",
      company: "Vertex Logistics",
      metrics: "90% operational time reduction",
      agentUsed: "Operations Agent",
      gradient: "from-emerald-500/20 to-teal-500/5"
    },
    {
      quote: "SOC-2 audit prep was typically a bottleneck. Deploying the Compliance Agent gave us automated auditing across AWS, GitHub, and Jira, drafting compliance sheets live. The audit process was a breeze.",
      author: "Diana Moreno",
      role: "Head of Information Security",
      company: "Supaflow",
      metrics: "Continuous audit ready",
      agentUsed: "Compliance Agent",
      gradient: "from-pink-500/20 to-rose-500/5"
    }
  ];

  // How it Works Steps content
  const steps = [
    {
      step: '01',
      title: 'Define the Role',
      desc: 'Specify your agent\'s job outline, objective, and daily parameters in plain English. No complex code or syntax required.',
      details: 'Write the role description as if you were hiring a human teammate: write out standard operating procedures (SOPs), desired outputs, constraints, and operational goals.',
      icon: <FileText className="w-5 h-5 text-blue-400" />
    },
    {
      step: '02',
      title: 'Connect Your Tools',
      desc: 'Connect tools like Slack, HubSpot, Salesforce, Gmail, Stripe, Notion, and databases with secure 1-click authentication.',
      details: 'Cofoundr uses OAuth isolation to connect tools. Agents read and write only inside parameters you authorize, keeping operational accounts partitioned and audited.',
      icon: <Workflow className="w-5 h-5 text-purple-400" />
    },
    {
      step: '03',
      title: 'Train with Docs & SOPs',
      desc: 'Upload files (PDFs, guidelines, sheets) or links. Agents ingest the exact business guidelines you want them to follow.',
      details: 'Agents compile your uploaded manuals into operational vector memory, using context retrieval during pipeline steps to guarantee guidelines are met with zero hallucinations.',
      icon: <Cpu className="w-5 h-5 text-emerald-400" />
    },
    {
      step: '04',
      title: 'Monitor & Scale',
      desc: 'Track logs, approve actions in co-pilot mode, and toggle to autopilot once trust is established. Scale up at will.',
      details: 'Maintain complete administrative oversight. Keep human-in-the-loop validation for outbound drafts or billing actions, and toggle to autonomous execution when ready.',
      icon: <Activity className="w-5 h-5 text-pink-400" />
    }
  ];

  // FAQ Items
  const faqItems = [
    {
      q: 'Do Cofoundr agents require programming skills to set up?',
      a: 'Not at all. You define their roles and SOPs using plain English instructions. Connecting integrations is handled via secure 1-click OAuth setup for tools like Slack, HubSpot, Gmail, and Stripe. Anyone on your ops or sales team can deploy and optimize an agent in under 10 minutes.'
    },
    {
      q: 'How does human-in-the-loop oversight work?',
      a: 'Safety and auditability are priority features. By default, agents operate in Co-Pilot mode. They stage drafted emails, invoice reconciliations, or code revisions in your dashboard and ping you on Slack. You approve, edit, or reject with a single click. Once you trust the outputs, toggle them to Autopilot for fully autonomous execution.'
    },
    {
      q: 'Is my enterprise data kept private and secure?',
      a: 'Yes. Data isolation is a core design requirement. All API interactions run inside isolated secure sandboxes. Your business records, documents, and tool credentials are encrypted at rest and in transit. Most importantly, Cofoundr never uses your operational logs or customer interactions to train public models.'
    },
    {
      q: 'How do agents communicate with each other?',
      a: 'Agents coordinate using a secure event broker. For example, when a Marketing Agent identifies a high-intent keyword gap, it updates the search campaigns. The Sales Agent monitors lead scores coming in, enriches data, and queries the Marketing Agent to draft custom copy. Once signed, the Operations Agent automates tool syncs.'
    },
    {
      q: 'What is the pricing model?',
      a: 'We offer a flat subscription model. For $999/month, you get full access to the agent marketplace (Sales, Marketing, Operations, Finance, and Compliance), unlimited data pipeline executions, custom knowledge-base training, and secure tool authentication.'
    }
  ];

  // ROI math variables
  const monthlyAIExtended = 999;
  const humanSalaryFTE = roiFTEs * roiSalary;
  const netSavingsMonthly = humanSalaryFTE - monthlyAIExtended;
  const netSavingsYearly = netSavingsMonthly * 12;
  const costPercentReduction = Math.round((netSavingsMonthly / humanSalaryFTE) * 100);

  return (
    <div className="relative min-h-screen bg-[#0a0a0a] text-zinc-300 font-sans selection:bg-blue-500/20 selection:text-blue-200">

      {/* Background Grids & Ambient Lights */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-0 inset-x-0 h-[850px] grid-bg grid-mask opacity-70"></div>

        {/* Soft colorful blur spheres */}
        <div className="absolute top-[8%] left-[10%] w-[380px] h-[380px] bg-blue-600/10 rounded-full blur-[110px] animate-glow-pulse"></div>
        <div className="absolute top-[25%] right-[5%] w-[420px] h-[420px] bg-purple-600/10 rounded-full blur-[130px] animate-glow-pulse" style={{ animationDelay: '1.5s' }}></div>
        <div className="absolute top-[60%] left-[20%] w-[350px] h-[350px] bg-emerald-600/5 rounded-full blur-[100px] animate-glow-pulse" style={{ animationDelay: '3s' }}></div>
      </div>

      {/* Sticky Premium Navbar */}
      <header className="sticky top-0 z-50 w-full border-b border-zinc-900 bg-[#0a0a0a]/75 backdrop-blur-md transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">

          {/* Logo & Beta badge */}
          <div className="flex items-center gap-3 select-none">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/10 border border-white/10">
              <Cpu className="w-5 h-5 text-white" />
            </div>
            <div className="flex items-center gap-2">
              <span className="font-display font-bold text-xl tracking-tight text-white">Cofoundr</span>
              <span className="px-2 py-0.5 rounded-full text-[9px] font-semibold bg-purple-500/10 border border-purple-500/30 text-purple-400 uppercase tracking-widest font-mono">Beta</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-400">
            <a href="#solutions" className="hover:text-white transition-colors duration-200">Solutions</a>
            <a href="#how-it-works" className="hover:text-white transition-colors duration-200">How it Works</a>
            <a href="#testimonials" className="hover:text-white transition-colors duration-200">Use Cases</a>
            <a href="#pricing" className="hover:text-white transition-colors duration-200">Pricing</a>
          </nav>

          {/* Nav CTAs */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={() => setBookDemoOpen(true)}
              className="text-sm font-medium text-zinc-400 hover:text-white transition-colors cursor-pointer select-none"
            >
              Log in
            </button>
            <button
              onClick={() => setBookDemoOpen(true)}
              className="px-4 py-2 text-xs font-semibold rounded-lg bg-white hover:bg-zinc-100 text-black transition-all duration-200 shadow-sm active:scale-95 cursor-pointer select-none border border-white"
            >
              Book Demo
            </button>
          </div>

          {/* Burger menu toggler */}
          <div className="flex md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-zinc-400 hover:text-white transition-colors focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden border-b border-zinc-900 bg-[#0c0c0e] px-4 pt-2 pb-6 space-y-3">
            <a
              href="#solutions"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-zinc-400 hover:text-white hover:bg-zinc-900 transition-all"
            >
              Solutions
            </a>
            <a
              href="#how-it-works"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-zinc-400 hover:text-white hover:bg-zinc-900 transition-all"
            >
              How it Works
            </a>
            <a
              href="#testimonials"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-zinc-400 hover:text-white hover:bg-zinc-900 transition-all"
            >
              Use Cases
            </a>
            <a
              href="#pricing"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-zinc-400 hover:text-white hover:bg-zinc-900 transition-all"
            >
              Pricing
            </a>
            <div className="pt-4 border-t border-zinc-900 flex flex-col gap-3">
              <button
                onClick={() => { setMobileMenuOpen(false); setBookDemoOpen(true); }}
                className="w-full text-center py-2.5 rounded-lg border border-zinc-800 text-sm font-medium text-white hover:bg-zinc-900 transition-all"
              >
                Log in
              </button>
              <button
                onClick={() => { setMobileMenuOpen(false); setBookDemoOpen(true); }}
                className="w-full py-2.5 text-center rounded-lg bg-white text-black text-sm font-semibold hover:bg-zinc-100 transition-all"
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
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-blue-500/25 bg-blue-500/5 text-xs text-blue-300 font-medium mb-8 animate-float shadow-inner">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            <span>The Enterprise Agent Fleet has arrived</span>
          </div>

          <h1 className="font-display font-bold text-4xl sm:text-6xl lg:text-7xl text-white tracking-tight leading-[1.05] mb-6">
            Hire AI Agents.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400">
              Build unstoppable teams.
            </span>
          </h1>

          <p className="text-base sm:text-lg lg:text-xl text-zinc-400 max-w-2xl mx-auto font-normal leading-relaxed mb-10">
            Deploy specialized, autonomous AI agents that operate 24/7 as full-time team members. They integrate with your tools, follow detailed SOPs, and deliver measurable ROI.
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-20">
            <button
              onClick={() => setBookDemoOpen(true)}
              className="w-full sm:w-auto px-7 py-4 text-sm font-semibold rounded-xl bg-white text-black hover:bg-zinc-100 shadow-xl shadow-blue-500/5 active:scale-95 transition-all duration-200 flex items-center justify-center gap-2 border border-white cursor-pointer select-none"
            >
              Hire Your First Agent
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => setWatchDemoOpen(true)}
              className="w-full sm:w-auto px-7 py-4 text-sm font-semibold rounded-xl border border-zinc-800 bg-zinc-950/40 hover:bg-zinc-900 text-zinc-300 hover:text-white transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer select-none"
            >
              <Play className="w-4 h-4 text-blue-400 fill-blue-400/20" />
              Watch Demo
            </button>
          </div>

          {/* Trust bar */}
          <div className="border-t border-b border-zinc-900/60 py-8 mb-24">
            <p className="text-xs uppercase tracking-widest text-zinc-500 font-semibold mb-6">
              Trusted by innovative teams at
            </p>
            <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6 opacity-30 select-none">
              <span className="font-display font-extrabold text-lg text-white tracking-widest">VERCEL</span>
              <span className="font-display font-black text-xl text-white tracking-tight">stripe</span>
              <span className="font-display font-bold text-lg text-white tracking-wider uppercase">Linear</span>
              <span className="font-display font-semibold text-lg text-white tracking-tight uppercase">retool</span>
              <span className="font-display font-extrabold text-xl text-white tracking-tighter">supabase</span>
            </div>
          </div>

          {/* INTERACTIVE HERO DASHBOARD MOCKUP */}
          <div className="relative glow-card bg-[#0e0e11] border border-zinc-800/80 rounded-2xl overflow-hidden shadow-2xl backdrop-blur-sm mx-auto max-w-5xl">

            {/* Dashboard Mock Header */}
            <div className="flex flex-col sm:flex-row items-center justify-between px-5 py-3 border-b border-zinc-900 bg-zinc-950/60 gap-3">
              <div className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-zinc-800"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-zinc-800"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-zinc-800"></span>
                <div className="h-4 w-px bg-zinc-800 mx-1"></div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span className="text-xs font-mono text-zinc-400 font-medium">Production workspace: active</span>
                </div>
              </div>

              <div className="flex items-center gap-4 text-xs font-mono text-zinc-500">
                <span>Memory Pool: 12.4 GB / 32 GB</span>
                <span className="px-2 py-0.5 bg-blue-500/10 border border-blue-500/20 text-blue-400 rounded text-[10px] font-bold">
                  AUTOPILOT ON
                </span>
              </div>
            </div>

            {/* Dashboard Main layout grid */}
            <div className="grid grid-cols-1 md:grid-cols-12 min-h-[380px] text-left">

              {/* Left sidebar */}
              <div className="md:col-span-3 border-r border-zinc-900 p-4 space-y-6 bg-zinc-950/30">
                <div>
                  <h4 className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 mb-2.5">Teammates Online</h4>
                  <div className="space-y-2">
                    {agentsList.map(a => (
                      <div key={a.id} className="flex items-center justify-between p-1.5 rounded-lg hover:bg-zinc-900/50 transition-colors">
                        <div className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                          <span className="text-xs text-zinc-300 font-medium">{a.name}</span>
                        </div>
                        <span className="text-[9px] font-mono text-zinc-500">24/7</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 mb-2.5">Connected Integrations</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {['Slack', 'HubSpot', 'Stripe', 'Gmail', 'GitHub', 'Salesforce'].map((tool, i) => (
                      <span key={i} className="px-2 py-0.5 bg-zinc-900 border border-zinc-800 text-zinc-400 rounded text-[9px] font-mono">
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="border-t border-zinc-900 pt-4">
                  <div className="bg-zinc-900/40 p-2.5 rounded-lg border border-zinc-900">
                    <span className="text-[10px] text-zinc-500 block">Total Saved Hours</span>
                    <span className="text-lg font-bold text-white mt-0.5">384.2 hrs</span>
                    <span className="text-[9px] text-emerald-400 block mt-0.5">↑ 18% this billing cycle</span>
                  </div>
                </div>
              </div>

              {/* Main Log area */}
              <div className="md:col-span-6 p-5 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between border-b border-zinc-900 pb-3 mb-4">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400">Agent Activity Stream</h3>
                    <div className="flex items-center gap-1.5 text-[10px] text-zinc-500 font-mono">
                      <RefreshCw className="w-3 h-3 text-blue-500 animate-spin" />
                      <span>Streaming live logs...</span>
                    </div>
                  </div>

                  {/* Terminal Scrolling logs */}
                  <div ref={terminalContainerRef} className="space-y-3 h-[240px] overflow-y-auto terminal-scroll pr-1 font-mono text-xs text-zinc-400">
                    {dashboardLogs.map((log, index) => {
                      let tagColor = 'text-blue-400 bg-blue-500/10 border-blue-500/20';
                      if (log.agent === 'Marketing Agent') tagColor = 'text-purple-400 bg-purple-500/10 border-purple-500/20';
                      if (log.agent === 'Ops Agent') tagColor = 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
                      if (log.agent === 'Compliance Agent') tagColor = 'text-pink-400 bg-pink-500/10 border-pink-500/20';
                      if (log.agent === 'Finance Agent') tagColor = 'text-amber-400 bg-amber-500/10 border-amber-500/20';
                      if (log.agent === 'System') tagColor = 'text-zinc-400 bg-zinc-800 border-zinc-700';

                      return (
                        <div key={index} className="flex items-start gap-2 border-b border-zinc-900/20 pb-2 leading-relaxed">
                          <span className="text-zinc-600 text-[10px] select-none shrink-0 mt-0.5">[{log.time}]</span>
                          <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold border shrink-0 ${tagColor}`}>
                            {log.agent}
                          </span>
                          <span className="text-zinc-300">{log.action}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="border-t border-zinc-900 pt-4 flex items-center justify-between text-xs text-zinc-500">
                  <span className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    Audit integrity: SECURE
                  </span>
                  <span>Press <kbd className="bg-zinc-900 px-1 py-0.5 rounded border border-zinc-800 font-mono text-[10px] text-zinc-400">⌘K</kbd> to query</span>
                </div>
              </div>

              {/* Right status panels */}
              <div className="md:col-span-3 border-l border-zinc-900 p-4 space-y-4 bg-zinc-950/20">
                <h4 className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">Workload Distribution</h4>

                <div className="space-y-3.5">
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-zinc-400">Sales pipeline</span>
                      <span className="font-bold text-white">42%</span>
                    </div>
                    <div className="w-full h-1.5 bg-zinc-900 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500 rounded-full" style={{ width: '42%' }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-zinc-400">Operations sync</span>
                      <span className="font-bold text-white">28%</span>
                    </div>
                    <div className="w-full h-1.5 bg-zinc-900 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500 rounded-full" style={{ width: '28%' }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-zinc-400">Auditing & Security</span>
                      <span className="font-bold text-white">18%</span>
                    </div>
                    <div className="w-full h-1.5 bg-zinc-900 rounded-full overflow-hidden">
                      <div className="h-full bg-pink-500 rounded-full" style={{ width: '18%' }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-zinc-400">Marketing publishing</span>
                      <span className="font-bold text-white">12%</span>
                    </div>
                    <div className="w-full h-1.5 bg-zinc-900 rounded-full overflow-hidden">
                      <div className="h-full bg-purple-500 rounded-full" style={{ width: '12%' }}></div>
                    </div>
                  </div>
                </div>

                <div className="border-t border-zinc-900 pt-4 mt-6">
                  <div className="p-3 bg-blue-500/5 border border-blue-500/20 rounded-xl">
                    <span className="text-[10px] text-blue-400 font-bold block mb-1">PROD OUTCOME</span>
                    <p className="text-xs text-zinc-300 leading-relaxed font-mono">
                      12,412 transactions audited. 0 anomalies detected.
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* STATS BAR SECTION */}
        <section className="mb-32 reveal">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

            {/* Stat card 1 */}
            <div className="p-6 rounded-2xl border border-zinc-900 bg-zinc-950/40 hover:bg-zinc-900/30 hover:border-zinc-800 transition-all duration-300 text-left relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 rounded-full blur-2xl group-hover:bg-blue-500/10 transition-all"></div>
              <span className="text-3xl sm:text-4xl font-display font-bold text-white block mb-2">10x</span>
              <h3 className="text-sm font-semibold text-zinc-300 mb-1">Faster Execution</h3>
              <p className="text-xs text-zinc-500 leading-relaxed">
                Workflows resolve in sub-seconds rather than business days.
              </p>
            </div>

            {/* Stat card 2 */}
            <div className="p-6 rounded-2xl border border-zinc-900 bg-zinc-950/40 hover:bg-zinc-900/30 hover:border-zinc-800 transition-all duration-300 text-left relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/5 rounded-full blur-2xl group-hover:bg-purple-500/10 transition-all"></div>
              <span className="text-3xl sm:text-4xl font-display font-bold text-white block mb-2">24/7/365</span>
              <h3 className="text-sm font-semibold text-zinc-300 mb-1">Active Coverage</h3>
              <p className="text-xs text-zinc-500 leading-relaxed">
                Agents execute background pipelines constantly with zero down-time.
              </p>
            </div>

            {/* Stat card 3 */}
            <div className="p-6 rounded-2xl border border-zinc-900 bg-zinc-950/40 hover:bg-zinc-900/30 hover:border-zinc-800 transition-all duration-300 text-left relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full blur-2xl group-hover:bg-emerald-500/10 transition-all"></div>
              <span className="text-3xl sm:text-4xl font-display font-bold text-white block mb-2">85%</span>
              <h3 className="text-sm font-semibold text-zinc-300 mb-1">Cost Reduction</h3>
              <p className="text-xs text-zinc-500 leading-relaxed">
                Replaces high contractor fees and complex seat software pipelines.
              </p>
            </div>

            {/* Stat card 4 */}
            <div className="p-6 rounded-2xl border border-zinc-900 bg-zinc-950/40 hover:bg-zinc-900/30 hover:border-zinc-800 transition-all duration-300 text-left relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-pink-500/5 rounded-full blur-2xl group-hover:bg-pink-500/10 transition-all"></div>
              <span className="text-3xl sm:text-4xl font-display font-bold text-white block mb-2">1,500+</span>
              <h3 className="text-sm font-semibold text-zinc-300 mb-1">Deployed Agents</h3>
              <p className="text-xs text-zinc-500 leading-relaxed">
                Running operations safely in high-security production environments.
              </p>
            </div>

          </div>
        </section>

        {/* SOLUTIONS / AGENT MARKETPLACE SECTION */}
        <section id="solutions" className="mb-32 scroll-mt-24 reveal">
          <div className="text-center mb-12">
            <h2 className="text-xs uppercase tracking-widest text-blue-400 font-bold mb-2">Agent Marketplace</h2>
            <h3 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight">
              Select Your Specialized AI Agent
            </h3>
            <p className="text-zinc-400 mt-2 max-w-xl mx-auto text-sm sm:text-base">
              Choose from our pre-trained fleet, configure integration credentials, define standard procedures (SOPs), and deploy them.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">

            {/* Agent Select Side tabs */}
            <div className="lg:col-span-4 flex flex-col gap-2.5">
              {agentsList.map(agent => (
                <button
                  key={agent.id}
                  onClick={() => setActiveMarketplaceAgent(agent.id)}
                  className={`p-4 rounded-xl border text-left transition-all duration-200 cursor-pointer flex items-center justify-between group active:scale-98 ${activeMarketplaceAgent === agent.id
                    ? 'border-blue-500/30 bg-blue-500/5 text-white'
                    : 'border-zinc-900 bg-zinc-950/20 text-zinc-400 hover:text-zinc-200 hover:border-zinc-800'
                    }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center bg-zinc-900 border border-zinc-800 group-hover:border-zinc-700 transition-colors`}>
                      {agent.icon}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white leading-none">{agent.name}</h4>
                      <span className="text-[10px] text-zinc-500 font-medium block mt-1">{agent.role}</span>
                    </div>
                  </div>
                  <ChevronRight className={`w-4 h-4 text-zinc-500 group-hover:text-white transition-transform ${activeMarketplaceAgent === agent.id ? 'translate-x-1' : ''
                    }`} />
                </button>
              ))}
            </div>

            {/* Selected Agent detail panels */}
            <div className="lg:col-span-8 flex flex-col justify-between p-6 sm:p-8 rounded-2xl border border-zinc-900 bg-zinc-950/30 relative overflow-hidden backdrop-blur-md">
              {agentsList.map(agent => {
                if (agent.id !== activeMarketplaceAgent) return null;
                return (
                  <div key={agent.id} className="flex flex-col h-full justify-between gap-6">
                    <div className="absolute top-0 right-0 w-32 h-32 rounded-full blur-[40px] opacity-20 bg-blue-500"></div>

                    <div>
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-zinc-900 border border-zinc-800">
                          {agent.icon}
                        </div>
                        <div>
                          <h4 className="text-xl font-bold text-white">{agent.name}</h4>
                          <span className="text-xs text-blue-400 font-mono font-semibold">{agent.role}</span>
                        </div>
                      </div>

                      <p className="text-sm text-zinc-400 leading-relaxed mb-6">
                        {agent.description}
                      </p>

                      {/* Capabilities checklist */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div>
                          <h5 className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 mb-3">Key Automation Strengths</h5>
                          <ul className="space-y-2.5">
                            {agent.capabilities.map((cap, i) => (
                              <li key={i} className="flex items-start gap-2 text-xs text-zinc-400">
                                <CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                                <span>{cap}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h5 className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 mb-3">Integration Stack</h5>
                          <div className="flex flex-wrap gap-1.5">
                            {agent.integrations.map((tool, i) => (
                              <span key={i} className="px-2.5 py-1 bg-zinc-900 border border-zinc-800 text-zinc-300 rounded-lg text-xs font-medium font-mono">
                                {tool}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* SOP Instructions Example */}
                      <div className="border-t border-zinc-900 pt-6">
                        <h5 className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 mb-2">Sample SOP Instruction File</h5>
                        <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-900 font-mono text-xs text-zinc-400 relative">
                          <div className="absolute top-3 right-3 flex items-center gap-1.5 text-[9px] text-zinc-500">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                            <span>sop_guidelines.txt</span>
                          </div>
                          <p className="leading-relaxed pr-12">
                            "{agent.sopSample}"
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-between pt-6 border-t border-zinc-900 gap-4 mt-6">
                      <div className="flex items-center gap-2 text-xs text-zinc-500">
                        <Lock className="w-4 h-4 text-zinc-600" />
                        <span>Encrypted parameters sandboxing active.</span>
                      </div>
                      <button
                        onClick={() => setBookDemoOpen(true)}
                        className="w-full sm:w-auto px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-md shadow-blue-500/10 transition-colors cursor-pointer select-none active:scale-95 text-center"
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
            <h2 className="text-xs uppercase tracking-widest text-purple-400 font-bold mb-2">Step-by-Step</h2>
            <h3 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight">
              Deploy Your Autonomous Workforce
            </h3>
            <p className="text-zinc-400 mt-2 max-w-lg mx-auto text-sm sm:text-base">
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
                  className={`p-5 rounded-2xl border text-left cursor-pointer transition-all duration-300 ${activeStepIndex === i
                    ? 'border-purple-500/30 bg-purple-500/5'
                    : 'border-zinc-900 bg-zinc-950/20 opacity-60 hover:opacity-100 hover:border-zinc-800'
                    }`}
                >
                  <div className="flex items-start gap-4">
                    <span className="font-display font-bold text-lg text-purple-500 leading-none mt-1">
                      {st.step}
                    </span>
                    <div>
                      <h4 className="text-base font-bold text-white flex items-center gap-2">
                        {st.title}
                        {activeStepIndex === i && <Sparkles className="w-3.5 h-3.5 text-purple-400" />}
                      </h4>
                      <p className="text-xs text-zinc-400 leading-relaxed mt-1.5">
                        {st.desc}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Interactive Visual Pane */}
            <div className="lg:col-span-7 p-6 rounded-2xl border border-zinc-900 bg-zinc-950/40 min-h-[300px] flex flex-col justify-between relative overflow-hidden backdrop-blur-md text-left">
              <div className="absolute top-0 right-0 w-32 h-32 rounded-full blur-[40px] opacity-10 bg-purple-500"></div>

              <div>
                <div className="flex items-center gap-3 border-b border-zinc-900 pb-3 mb-6">
                  <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center">
                    {steps[activeStepIndex].icon}
                  </div>
                  <div>
                    <span className="text-[10px] text-zinc-500 font-mono uppercase tracking-wider block">Operational Step {steps[activeStepIndex].step}</span>
                    <h4 className="text-sm font-bold text-white">{steps[activeStepIndex].title}</h4>
                  </div>
                </div>

                <p className="text-sm text-zinc-300 leading-relaxed pr-6 mb-8">
                  {steps[activeStepIndex].details}
                </p>
              </div>

              {/* Step UI simulator visuals */}
              <div>
                {activeStepIndex === 0 && (
                  <div className="p-4 bg-zinc-950 border border-zinc-900 rounded-xl space-y-2 font-mono text-xs text-zinc-400">
                    <div className="flex items-center justify-between text-[10px] text-zinc-600 border-b border-zinc-900 pb-1.5 mb-2">
                      <span>SOP SETTINGS</span>
                      <span>UTF-8</span>
                    </div>
                    <p className="text-blue-400 font-semibold">1. Role: Close Inbound Leads</p>
                    <p className="text-zinc-500">2. When: Lead scored {'>'} 80</p>
                    <p className="text-zinc-500">3. Action: Query CRM, fetch company profile, draft response</p>
                  </div>
                )}

                {activeStepIndex === 1 && (
                  <div className="grid grid-cols-3 gap-2.5 text-center">
                    {['Slack', 'HubSpot', 'Salesforce', 'Gmail', 'Stripe', 'GitHub'].map((tool, idx) => (
                      <div key={idx} className="p-3 bg-zinc-900/60 border border-zinc-800 rounded-xl flex flex-col items-center justify-center gap-2 hover:border-zinc-700 transition-colors">
                        <span className="text-xs font-semibold text-zinc-300">{tool}</span>
                        <span className="px-2 py-0.5 rounded-full text-[8px] bg-emerald-500/10 text-emerald-400 font-bold border border-emerald-500/20 uppercase tracking-widest font-mono">CONNECTED</span>
                      </div>
                    ))}
                  </div>
                )}

                {activeStepIndex === 2 && (
                  <div className="p-4 bg-zinc-950 border border-zinc-900 rounded-xl space-y-3 font-mono text-xs">
                    <div className="flex items-center justify-between text-[10px] text-zinc-600">
                      <span>KNOWLEDGE BASE SOURCES</span>
                      <span>2 files imported</span>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-zinc-900 border border-zinc-800 rounded-lg">
                      <span className="text-zinc-300">sales_playbook_2026.pdf</span>
                      <span className="text-[10px] text-zinc-500">5.2 MB</span>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-zinc-900 border border-zinc-800 rounded-lg">
                      <span className="text-zinc-300">compliance_checklist.md</span>
                      <span className="text-[10px] text-zinc-500">14 KB</span>
                    </div>
                  </div>
                )}

                {activeStepIndex === 3 && (
                  <div className="p-4 bg-zinc-950 border border-zinc-900 rounded-xl flex items-center justify-between gap-4 font-mono text-xs">
                    <div>
                      <span className="text-zinc-500 block text-[10px]">Autopilot Status</span>
                      <span className="text-emerald-400 font-bold text-sm block mt-0.5">FULLY AUTONOMOUS</span>
                    </div>
                    <div className="w-16 h-8 bg-blue-600 rounded-full p-1 flex items-center justify-end cursor-pointer">
                      <div className="w-6 h-6 bg-white rounded-full"></div>
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
            <h2 className="text-xs uppercase tracking-widest text-pink-400 font-bold mb-2">Customer Success</h2>
            <h3 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight">
              Validated Real-World Impact
            </h3>
            <p className="text-zinc-400 mt-2 max-w-lg mx-auto text-sm sm:text-base">
              Read how enterprise security and operations leads scale pipelines using Cofoundr\'s autonomous agent fleet.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            {testimonials.map((t, idx) => (
              <div
                key={idx}
                className={`p-6 sm:p-8 rounded-2xl border border-zinc-900 bg-zinc-950/40 relative overflow-hidden backdrop-blur-md flex flex-col justify-between group hover:border-zinc-800 transition-all duration-300`}
              >
                <div className={`absolute top-0 right-0 w-24 h-24 rounded-full blur-[40px] opacity-10 bg-gradient-to-tr ${t.gradient}`}></div>

                <div>
                  {/* Metric header */}
                  <div className="mb-6">
                    <span className="text-[10px] font-bold font-mono bg-zinc-900 border border-zinc-800 px-2.5 py-1 text-zinc-400 rounded-full tracking-wider">
                      {t.agentUsed}
                    </span>
                    <span className="text-base sm:text-lg font-bold text-white block mt-4 leading-snug">
                      "{t.metrics}"
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed mb-8 italic">
                    "{t.quote}"
                  </p>
                </div>

                <div className="flex items-center gap-3 border-t border-zinc-900 pt-4 mt-6">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 to-purple-600 flex items-center justify-center font-display font-bold text-xs text-white shrink-0">
                    {t.author.charAt(0)}{t.author.split(' ')[1]?.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white leading-none">{t.author}</h4>
                    <span className="text-[10px] text-zinc-500 mt-1 block">{t.role}, {t.company}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ROI CALCULATOR SECTION */}
        <section className="mb-32 reveal">
          <div className="text-center mb-16">
            <h2 className="text-xs uppercase tracking-widest text-emerald-400 font-bold mb-2">Cost Optimization</h2>
            <h3 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight">
              Calculate Your Operational Savings
            </h3>
            <p className="text-zinc-400 mt-2 max-w-lg mx-auto text-sm sm:text-base">
              Select your average operational staffing variables to see potential immediate cost overhead cuts.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch max-w-5xl mx-auto">

            {/* Sliders Input Panel */}
            <div className="lg:col-span-5 p-6 sm:p-8 rounded-2xl border border-zinc-900 bg-zinc-950/40 flex flex-col justify-between backdrop-blur-md text-left">
              <div>
                <h4 className="text-base font-bold text-white mb-6">Staffing Variables</h4>

                <div className="space-y-8">
                  {/* FTE slider */}
                  <div>
                    <div className="flex justify-between text-xs font-semibold mb-2">
                      <span className="text-zinc-400">Target FTE Roles</span>
                      <span className="text-white font-mono">{roiFTEs} Employees</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="15"
                      step="1"
                      value={roiFTEs}
                      onChange={(e) => setRoiFTEs(Number(e.target.value))}
                      className="w-full accent-blue-500 h-1.5 bg-zinc-800 rounded-lg cursor-pointer"
                    />
                    <span className="text-[10px] text-zinc-500 mt-1.5 block leading-normal">
                      Full-time equivalents allocated across sales prospecting, basic copywriting, or invoice sync logs.
                    </span>
                  </div>

                  {/* Salary slider */}
                  <div>
                    <div className="flex justify-between text-xs font-semibold mb-2">
                      <span className="text-zinc-400">Avg Monthly Cost / FTE</span>
                      <span className="text-white font-mono">${roiSalary.toLocaleString()} / mo</span>
                    </div>
                    <input
                      type="range"
                      min="3000"
                      max="15000"
                      step="500"
                      value={roiSalary}
                      onChange={(e) => setRoiSalary(Number(e.target.value))}
                      className="w-full accent-blue-500 h-1.5 bg-zinc-800 rounded-lg cursor-pointer"
                    />
                    <span className="text-[10px] text-zinc-500 mt-1.5 block leading-normal">
                      Includes base salaries, healthcare benefits, workspace utilities, and SaaS platform licensing seats.
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-8 border-t border-zinc-900 pt-6">
                <div className="flex justify-between items-center text-xs text-zinc-500">
                  <span>Cofoundr Agent Flat Fee:</span>
                  <span className="text-white font-bold font-mono">$999 / mo</span>
                </div>
              </div>
            </div>

            {/* Savings Outcome Displays */}
            <div className="lg:col-span-7 p-6 sm:p-8 rounded-2xl border border-zinc-800 bg-[#0c0c0e] flex flex-col justify-between relative overflow-hidden backdrop-blur-md text-left">
              <div className="absolute top-0 right-0 w-44 h-44 rounded-full bg-emerald-500/5 blur-[50px] pointer-events-none"></div>

              <div>
                <span className="text-[10px] font-mono uppercase text-emerald-400 px-3 py-1 rounded-full border border-emerald-500/20 bg-emerald-500/5 font-bold">
                  PROJECTED ROI ANALYSIS
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6 mt-8">
                  <div>
                    <span className="text-xs text-zinc-500 block">FTE Staffing Monthly Cost</span>
                    <span className="text-xl font-medium text-zinc-500 line-through mt-1 block font-mono">
                      ${humanSalaryFTE.toLocaleString()}
                    </span>
                  </div>
                  <div>
                    <span className="text-xs text-zinc-400 block">Monthly Savings</span>
                    <span className="text-2xl font-bold text-emerald-400 mt-1 block font-mono">
                      +${netSavingsMonthly.toLocaleString()}
                    </span>
                  </div>
                  <div>
                    <span className="text-xs text-zinc-400 block">Net Yearly Savings</span>
                    <span className="text-4xl sm:text-5xl font-display font-bold text-white mt-1.5 block font-mono">
                      +${netSavingsYearly.toLocaleString()}
                    </span>
                  </div>
                  <div>
                    <span className="text-xs text-zinc-400 block">Total Staffing Cost Cut</span>
                    <span className="text-4xl sm:text-5xl font-display font-bold text-emerald-400 mt-1.5 block font-mono">
                      {costPercentReduction}%
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-8 border-t border-zinc-900 pt-6 grid grid-cols-3 gap-2.5 text-[10px] text-zinc-500 font-medium">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>24/7 Autonomy</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Zero Hiring Fees</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Flat Subscription</span>
                </div>
              </div>

            </div>

          </div>
        </section>

        {/* PRICING FLAT BUNDLE SECTION */}
        <section id="pricing" className="mb-32 scroll-mt-24 max-w-4xl mx-auto reveal">
          <div className="text-center mb-12">
            <h2 className="text-xs uppercase tracking-widest text-purple-400 font-bold mb-2">Pricing Structure</h2>
            <h3 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight">
              Unlock Your Entire AI Suite
            </h3>
            <p className="text-zinc-400 mt-2 max-w-lg mx-auto text-sm sm:text-base">
              No complex tiered models. Single license grants access to all agents with unlimited workflow operations.
            </p>
          </div>

          {/* Pricing Glass Card */}
          <div className="relative glow-card bg-gradient-to-tr from-purple-500/10 via-blue-500/5 to-white/0 border border-purple-500/20 rounded-2xl p-6 sm:p-12 text-center overflow-hidden shadow-2xl backdrop-blur-md">
            <div className="absolute top-0 right-0 w-36 h-36 bg-purple-500/10 rounded-full blur-[45px] pointer-events-none animate-pulse-slow"></div>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-purple-500/30 bg-purple-500/5 text-xs text-purple-300 font-mono font-bold mb-8">
              <Sparkles className="w-4 h-4 text-purple-400 animate-spin" style={{ animationDuration: '6s' }} />
              <span>FOUNDERS EARLY-BIRD - LIMITED LICENSE ACCESS</span>
            </div>

            <div className="mb-6 flex items-baseline justify-center gap-1.5">
              <span className="text-zinc-400 text-lg align-top font-medium">$</span>
              <span className="text-6xl sm:text-7xl font-display font-bold text-white tracking-tight font-mono">999</span>
              <span className="text-zinc-400 text-sm font-semibold">/ month</span>
            </div>

            <p className="text-sm sm:text-base text-zinc-300 max-w-lg mx-auto leading-relaxed mb-8 font-normal">
              Access Sales, Marketing, Operations, Finance, and Compliance agents. Includes custom documentation training uploads, unlimited pipeline executions, and premium direct Slack channel support.
            </p>

            <div className="mb-10">
              <button
                onClick={() => setBookDemoOpen(true)}
                className="w-full sm:w-auto px-10 py-4 rounded-xl bg-white hover:bg-zinc-100 text-black font-semibold text-sm shadow-xl shadow-purple-500/5 transition-all cursor-pointer select-none active:scale-95 border border-white"
              >
                Secure Agent Suite License
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8 border-t border-zinc-900 text-xs text-zinc-500 text-left font-medium">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-blue-500 shrink-0" />
                <span>Unlimited Pipelines</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-blue-500 shrink-0" />
                <span>Custom memory ingestion</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-blue-500 shrink-0" />
                <span>Approval checkpings</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-blue-500 shrink-0" />
                <span>Private Slack support channel</span>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ ACCORDION SECTION */}
        <section id="faq" className="mb-32 scroll-mt-24 max-w-3xl mx-auto reveal">
          <div className="text-center mb-12">
            <h2 className="text-xs uppercase tracking-widest text-zinc-500 font-bold mb-2">Have Questions?</h2>
            <h3 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight">
              Frequently Asked Questions
            </h3>
          </div>

          <div className="space-y-4 text-left">
            {faqItems.map((item, idx) => (
              <div
                key={idx}
                className="rounded-xl border border-zinc-900 bg-zinc-950/20 overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full px-6 py-4.5 flex items-center justify-between text-left text-white font-semibold hover:bg-zinc-900/40 transition-colors cursor-pointer select-none"
                >
                  <span className="text-sm sm:text-base pr-6">{item.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-zinc-500 shrink-0 transition-transform duration-300 ${openFaq === idx ? 'rotate-180 text-blue-400' : ''
                      }`}
                  />
                </button>

                <div
                  className={`transition-all duration-300 ease-in-out ${openFaq === idx ? 'max-h-[300px] border-t border-zinc-900' : 'max-h-0'
                    } overflow-hidden`}
                >
                  <p className="px-6 py-4.5 text-xs sm:text-sm text-zinc-400 leading-relaxed bg-zinc-950/40">
                    {item.a}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FINAL CTA & EMAIL CAPTURE SECTION */}
        <section className="mb-20 max-w-4xl mx-auto reveal">
          <div className="relative rounded-3xl border border-zinc-800 bg-[#0b0b0d] p-8 sm:p-14 text-center overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none"></div>

            <div className="max-w-2xl mx-auto">
              <h3 className="font-display font-bold text-3xl sm:text-4xl text-white tracking-tight mb-4">
                Hire your first agent teammate today.
              </h3>
              <p className="text-zinc-400 text-sm sm:text-base leading-relaxed mb-8">
                Request access to the Cofoundr early client cohort. Deploy autonomous team execution models in production and scale operation margins instantly.
              </p>

              {earlyAccessSuccess ? (
                <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl font-semibold text-sm max-w-md mx-auto animate-pulse flex items-center justify-center gap-2">
                  <Check className="w-4.5 h-4.5" />
                  <span>Success! We have queued your early access request.</span>
                </div>
              ) : (
                <form onSubmit={handleEarlyAccessSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto items-stretch">
                  <div className="relative flex-1">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" />
                    <input
                      type="email"
                      required
                      placeholder="Enter company email..."
                      value={earlyAccessEmail}
                      onChange={(e) => setEarlyAccessEmail(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-zinc-950 border border-zinc-800 hover:border-zinc-700 focus:border-blue-500 rounded-xl text-white text-sm focus:outline-none focus:ring-0 placeholder-zinc-600 transition-all font-medium"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={earlyAccessLoading}
                    className="px-6 py-3 bg-white text-black hover:bg-zinc-100 rounded-xl text-sm font-semibold transition-all active:scale-95 select-none cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    {earlyAccessLoading ? (
                      <RefreshCw className="w-4 h-4 animate-spin text-black" />
                    ) : (
                      <>
                        Request Access
                        <ArrowRight className="w-4 h-4 text-black" />
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
      <footer className="mt-auto border-t border-zinc-900 bg-zinc-950/40 py-12 lg:py-16 relative z-10 text-left">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">

            {/* Branding Column */}
            <div className="space-y-4">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-blue-600 to-purple-600 flex items-center justify-center shadow-md">
                  <Cpu className="w-4 h-4 text-white" />
                </div>
                <span className="font-display font-bold text-lg tracking-tight text-white">Cofoundr</span>
              </div>
              <p className="text-xs text-zinc-500 leading-relaxed pr-4">
                Enterprise-grade autonomous AI agents running 24/7 in sales, marketing, operations, and compliance.
              </p>
            </div>

            {/* Links Columns */}
            <div>
              <h4 className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 mb-3.5">Solutions</h4>
              <ul className="space-y-2 text-xs font-medium">
                <li><a href="#solutions" className="text-zinc-500 hover:text-white transition-colors">Sales Closing</a></li>
                <li><a href="#solutions" className="text-zinc-500 hover:text-white transition-colors">Growth Marketing</a></li>
                <li><a href="#solutions" className="text-zinc-500 hover:text-white transition-colors">Operations Reconciler</a></li>
                <li><a href="#solutions" className="text-zinc-500 hover:text-white transition-colors">KYC / Compliance Audit</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 mb-3.5">Resources</h4>
              <ul className="space-y-2 text-xs font-medium">
                <li><a href="#how-it-works" className="text-zinc-500 hover:text-white transition-colors">How it Works</a></li>
                <li><a href="#pricing" className="text-zinc-500 hover:text-white transition-colors">Pricing Structure</a></li>
                <li><a href="#faq" className="text-zinc-500 hover:text-white transition-colors">FAQs</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 mb-3.5">System Health</h4>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-emerald-500/20 bg-emerald-500/5 text-[11px] text-emerald-400 font-mono w-fit">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>All Agents Online</span>
              </div>
            </div>

          </div>

          <div className="border-t border-zinc-900 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-zinc-600 font-mono">
              &copy; {new Date().getFullYear()} COFOUNDR. WORLD. ALL RIGHTS RESERVED.
            </p>
            <div className="flex items-center gap-6 text-xs font-medium">
              <a href="#privacy" className="text-zinc-600 hover:text-zinc-400 transition-colors">Privacy Policy</a>
              <a href="#terms" className="text-zinc-600 hover:text-zinc-400 transition-colors">Terms of Service</a>
            </div>
          </div>

        </div>
      </footer>

      {/* WATCH DEMO MODAL (Glassmorphic Walkthrough Simulator) */}
      {watchDemoOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-3xl rounded-2xl border border-zinc-800 bg-[#0d0d10] overflow-hidden shadow-2xl text-left">

            {/* Modal Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-zinc-900">
              <div className="flex items-center gap-2">
                <Play className="w-4.5 h-4.5 text-blue-500 fill-blue-500/20" />
                <h3 className="text-sm font-bold text-white font-display">Cofoundr Agent Walkthrough Simulation</h3>
              </div>
              <button
                onClick={() => setWatchDemoOpen(false)}
                className="p-1 text-zinc-400 hover:text-white hover:bg-zinc-900 rounded-lg transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Video Walkthrough Mock Content */}
            <div className="p-6 space-y-6">

              {/* Simulator video display */}
              <div className="relative aspect-video rounded-xl bg-black border border-zinc-900 overflow-hidden flex flex-col justify-between p-4 group">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10"></div>

                {/* Visual simulator graphics representing code deployment */}
                <div className="relative z-0 space-y-2.5 font-mono text-[10px] text-zinc-500 overflow-hidden select-none opacity-40">
                  <p className="text-purple-400 font-bold">$ cofoundr agent:deploy --role=SalesAgent --sop=lead_closing.txt</p>
                  <p>🚀 Bundling system configuration...</p>
                  <p>🔒 Encryption keys sandboxed securely.</p>
                  <p>⚡ Connect HubSpot CRM API... SUCCESS [oauth_token=2026_prod_token]</p>
                  <p>⚡ Connect Gmail IMAP Server... SUCCESS [oauth_token=gmail_read_write]</p>
                  <p>🧠 Ingesting sales_playbook_2026.pdf [vectors=142, size=5.2MB]... DONE</p>
                  <p className="text-emerald-400 font-bold">✨ Agent Sail is now operational on Autopilot. Monitoring webhook streams...</p>
                </div>

                <div className="absolute inset-0 flex items-center justify-center z-20">
                  <div className="w-16 h-16 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/25 cursor-pointer hover:scale-105 active:scale-95 transition-all">
                    <Play className="w-6 h-6 text-white fill-white" />
                  </div>
                </div>

                <div className="relative z-20 flex items-center justify-between text-xs text-zinc-400 pr-2">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
                    <span>1:42 / 3:15 Walkthrough Video</span>
                  </div>
                  <span className="underline hover:text-white cursor-pointer select-none">Skip to integrations</span>
                </div>
              </div>

              {/* Text explaining what is seen */}
              <div className="space-y-2.5">
                <h4 className="text-sm font-bold text-white">How agents run on your company pipeline</h4>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  In this demo walkthrough, we show how developers and product leads specify instructions. The platform maps APIs automatically, ingests context vectors, and runs the background agent logic. Outbound notifications and draft items pop up in Slack for 1-click approvals.
                </p>
              </div>

            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-end px-5 py-4 border-t border-zinc-900 bg-zinc-950/40 gap-3">
              <button
                onClick={() => setWatchDemoOpen(false)}
                className="px-4 py-2 text-xs font-semibold text-zinc-400 hover:text-white transition-colors cursor-pointer select-none"
              >
                Close Walkthrough
              </button>
              <button
                onClick={() => { setWatchDemoOpen(false); setBookDemoOpen(true); }}
                className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-md transition-colors cursor-pointer select-none active:scale-95"
              >
                Book Custom Live Demo
              </button>
            </div>

          </div>
        </div>
      )}

      {/* BOOK DEMO / CALENDAR SCHEDULE MODAL */}
      {bookDemoOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/85 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-md rounded-2xl border border-zinc-800 bg-[#0d0d10] overflow-hidden shadow-2xl text-left">

            {/* Modal Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-zinc-900">
              <div className="flex items-center gap-2">
                <Calendar className="w-4.5 h-4.5 text-purple-400" />
                <h3 className="text-sm font-bold text-white font-display">Schedule Your Agent Consultation</h3>
              </div>
              <button
                onClick={() => setBookDemoOpen(false)}
                className="p-1 text-zinc-400 hover:text-white hover:bg-zinc-900 rounded-lg transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleBookingSubmit} className="p-5 space-y-4">
              {bookingSuccess ? (
                <div className="py-8 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto text-emerald-400 animate-bounce">
                    <Check className="w-6 h-6" />
                  </div>
                  <h4 className="text-sm font-bold text-white">Consultation Scheduled!</h4>
                  <p className="text-xs text-zinc-400 leading-relaxed max-w-xs mx-auto">
                    We have successfully registered your demo booking. An operations engineer will contact you shortly to review your SOP templates.
                  </p>
                </div>
              ) : (
                <>
                  {bookingStep === 1 && (
                    <div className="space-y-4">
                      <div>
                        <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 block mb-2">
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
                                className={`p-2.5 rounded-lg border text-xs font-semibold text-left transition-all ${isSelected
                                  ? 'border-purple-500/40 bg-purple-500/10 text-white'
                                  : 'border-zinc-800 bg-zinc-950/20 text-zinc-400 hover:border-zinc-700'
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
                          className="w-full py-3 bg-white text-black hover:bg-zinc-100 rounded-xl text-xs font-semibold font-display shadow-md transition-all active:scale-95 flex items-center justify-center gap-1 cursor-pointer select-none"
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
                        <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 block mb-1.5">
                          Full Name
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. John Doe"
                          value={bookingName}
                          onChange={(e) => setBookingName(e.target.value)}
                          className="w-full px-3.5 py-2.5 bg-zinc-950 border border-zinc-800 hover:border-zinc-700 focus:border-purple-500 rounded-lg text-white text-xs focus:outline-none focus:ring-0 placeholder-zinc-700 transition-all"
                        />
                      </div>

                      <div>
                        <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 block mb-1.5">
                          Work Email
                        </label>
                        <input
                          type="email"
                          required
                          placeholder="e.g. john@company.com"
                          value={bookingEmail}
                          onChange={(e) => setBookingEmail(e.target.value)}
                          className="w-full px-3.5 py-2.5 bg-zinc-950 border border-zinc-800 hover:border-zinc-700 focus:border-purple-500 rounded-lg text-white text-xs focus:outline-none focus:ring-0 placeholder-zinc-700 transition-all"
                        />
                      </div>

                      <div>
                        <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 block mb-1.5">
                          Company Name
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Acme Corp"
                          value={bookingCompany}
                          onChange={(e) => setBookingCompany(e.target.value)}
                          className="w-full px-3.5 py-2.5 bg-zinc-950 border border-zinc-800 hover:border-zinc-700 focus:border-purple-500 rounded-lg text-white text-xs focus:outline-none focus:ring-0 placeholder-zinc-700 transition-all"
                        />
                      </div>

                      <div className="flex gap-3 pt-2">
                        <button
                          type="button"
                          onClick={() => setBookingStep(1)}
                          className="w-1/3 py-3 rounded-xl border border-zinc-800 hover:bg-zinc-900 text-zinc-400 hover:text-white text-xs font-semibold transition-colors cursor-pointer select-none"
                        >
                          Back
                        </button>
                        <button
                          type="submit"
                          className="flex-1 py-3 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-xs font-semibold font-display shadow-md transition-colors cursor-pointer select-none active:scale-95 text-center"
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
