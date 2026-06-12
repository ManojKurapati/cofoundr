import React, { useState, useEffect, useRef } from 'react';
import {
  Terminal as TerminalIcon,
  Cpu,
  Zap,
  TrendingUp,
  Users,
  CheckCircle2,
  ArrowRight,
  ChevronRight,
  Play,
  RefreshCw,
  Check,
  Sparkles,
  Lock,
  Workflow,
  ChevronDown,
  AlertCircle
} from 'lucide-react';

// Interfaces & Types
interface Agent {
  id: string;
  name: string;
  role: string;
  description: string;
  colorClass: string;
  borderColor: string;
  glowColor: string;
  textColor: string;
  icon: React.ReactNode;
  tags: string[];
  capabilities: string[];
}

interface TerminalLine {
  text: string;
  type: 'system' | 'mark' | 'sail' | 'digima' | 'opera' | 'input';
  time: string;
}

export default function App() {
  // Navigation & Theme
  const [activeTab, setActiveTab] = useState<'mark' | 'sail' | 'digima' | 'opera'>('mark');
  
  // Terminal State
  const [terminalInput, setTerminalInput] = useState('');
  const [terminalLines, setTerminalLines] = useState<TerminalLine[]>([
    { text: 'COFOUNDR OS v2.0.4 - ACTIVE WORKSPACE CONNECTED', type: 'system', time: '12:00:00' },
    { text: 'All agents initialized: Mark (Marketing), Sail (Sales), Digima (Digital Marketing), Opera (Operations).', type: 'system', time: '12:00:01' },
    { text: 'Type a command or click a preset shortcut above to execute agent collaboration.', type: 'system', time: '12:00:01' }
  ]);
  const [isTerminalRunning, setIsTerminalRunning] = useState(false);
  const terminalContainerRef = useRef<HTMLDivElement>(null);

  // Marketing Agent Playground State
  const [mktSector, setMktSector] = useState('SaaS');
  const [mktResult, setMktResult] = useState({
    headline: 'Scale Operations, Not Your Headcount.',
    subheadline: 'Automated AI agents that execute complex business workflows 24/7 with zero overhead.',
    cta: 'Start Free Trial',
    emailSubject: 'How to scale your SaaS operations with AI agents'
  });
  const [isMktLoading, setIsMktLoading] = useState(false);

  // Sales Agent Playground State
  const [salesObjection, setSalesObjection] = useState('Expensive');
  const [salesResult, setSalesResult] = useState({
    rebuttal: 'Our AI Agents cost less than 1/10th of a junior employee and work 24/7 without training, sick leaves, or setup overhead. You get full ROI in less than 14 days.',
    score: 95,
    outreachSubject: 'Re: Driving operational efficiency at your scale'
  });
  const [isSalesLoading, setIsSalesLoading] = useState(false);

  // Digital Marketing Agent State
  const [adSpend, setAdSpend] = useState(5000);
  const [metaWeight, setMetaWeight] = useState(60); // Google is 100 - Meta
  const [digimaResult, setDigimaResult] = useState({
    leads: 382,
    cpa: 13.08,
    roi: 3.4,
    recommendedKeyword: 'automated business solutions'
  });

  // Operations Agent State
  const [operaTrigger, setOperaTrigger] = useState('Shopify Order');
  const [operaSteps, setOperaSteps] = useState([
    { id: 1, text: 'Detect new Shopify order webhook', status: 'idle' },
    { id: 2, text: 'Check inventory status in Stripe', status: 'idle' },
    { id: 3, text: 'Send slack notification to fulfillment channel', status: 'idle' },
    { id: 4, text: 'Generate invoice PDF and upload to Google Drive', status: 'idle' }
  ]);
  const [isOperaRunning, setIsOperaRunning] = useState(false);

  // ROI Calculator State
  const [roiRoles, setRoiRoles] = useState(3);
  const [roiSalary, setRoiSalary] = useState(5000);

  // FAQ Accordion State
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Scroll terminal to bottom
  useEffect(() => {
    if (terminalContainerRef.current) {
      terminalContainerRef.current.scrollTo({
        top: terminalContainerRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [terminalLines]);

  // Handle Preset Terminal Commands
  const runTerminalCommand = async (command: string) => {
    if (isTerminalRunning) return;
    setIsTerminalRunning(true);
    
    // Add User Command Line
    const timeStr = new Date().toLocaleTimeString();
    setTerminalLines(prev => [...prev, { text: command, type: 'input', time: timeStr }]);

    const addLine = (text: string, type: 'system' | 'mark' | 'sail' | 'digima' | 'opera', delay: number) => {
      return new Promise<void>((resolve) => {
        setTimeout(() => {
          setTerminalLines(prev => [...prev, { text, type, time: new Date().toLocaleTimeString() }]);
          resolve();
        }, delay);
      });
    };

    if (command === '/launch_campaign') {
      await addLine('⚡ BOOTING WORKFLOW: [LAUNCH MARKETING CAMPAIGN]', 'system', 400);
      await addLine('[Agent Mark] 🧠 Performing market intelligence scan for sector target...', 'mark', 800);
      await addLine('[Agent Mark] ✍️ Copy crafted: "Run your startup on autopilot. Hire autonomous AI agents today."', 'mark', 900);
      await addLine('[Agent Digima] 🎯 Copy received. Analyzing optimal budget split for campaign launch...', 'digima', 800);
      await addLine('[Agent Digima] 📊 Allocating $1,500 budget: 65% Meta Ads / 35% Google Ads.', 'digima', 900);
      await addLine('[Agent Digima] 🚀 Campaign API trigger sent. Ad sets live. Tracking pixels active.', 'digima', 800);
      await addLine('[Agent Sail] 🎯 Sales engine initialized. Ready to grab inbound leads from campaign funnel...', 'sail', 900);
      await addLine('[System] ✅ Campaign launched. Multi-agent loop operating successfully.', 'system', 600);
    } else if (command === '/qualify_leads') {
      await addLine('⚡ BOOTING WORKFLOW: [SALES & LEAD QUALIFICATION]', 'system', 400);
      await addLine('[Agent Sail] 🔍 Scanning incoming registrants via integration webhooks...', 'sail', 800);
      await addLine('[Agent Sail] 🎯 Found 18 new leads. Initiating lead-scoring filters...', 'sail', 800);
      await addLine('[Agent Sail] ⭐ Lead Alert: Acme Corp (Enterprise, Score: 96/100). Personalizing sales pitch.', 'sail', 900);
      await addLine('[Agent Mark] 🧠 Fetching custom brand assets and voice guidelines...', 'mark', 700);
      await addLine('[Agent Sail] ✉️ Customized email drafted and dispatched to Acme VP of Operations.', 'sail', 900);
      await addLine('[Agent Opera] ⚙️ Triggering CRM sync. Customer profile added to CRM platform.', 'opera', 800);
      await addLine('[Agent Opera] 🔔 Sent Slack alert to #revenue: "High-value sales lead qualified by Agent Sail."', 'opera', 800);
      await addLine('[System] ✅ Leads database reconciled. Integration loops active.', 'system', 500);
    } else if (command === '/optimize_operations') {
      await addLine('⚡ BOOTING WORKFLOW: [OPERATIONAL DISCREPANCY RECONCILER]', 'system', 400);
      await addLine('[Agent Opera] ⚙️ Scanning Stripe invoices vs Database order status...', 'opera', 800);
      await addLine('[Agent Opera] ⚠️ Warning: Detected 2 paid invoices without database fulfillment flags.', 'opera', 700);
      await addLine('[Agent Opera] 🔧 Resolving anomalies: Updated DB flags for orders #9928 and #9929.', 'opera', 900);
      await addLine('[Agent Opera] 📑 Invoice PDFs compiled, stamped, and synced to Founder Google Drive.', 'opera', 900);
      await addLine('[Agent Mark] 🧠 Writing operational anomaly report for the executive team...', 'mark', 800);
      await addLine('[Agent Opera] 📬 Report dispatched to founder email. System status is 100% synchronized.', 'opera', 800);
      await addLine('[System] ✅ System checks completed. 0 unresolved conflicts.', 'system', 500);
    } else {
      // Custom typed command
      await addLine(`🧠 Custom task query received: "${command}"`, 'system', 400);
      await addLine(`[Agent Mark] Copywriting audit initiated for custom task...`, 'mark', 800);
      await addLine(`[Agent Sail] Custom outbound templates verified...`, 'sail', 800);
      await addLine(`[Agent Digima] Channels and tracking codes matched...`, 'digima', 800);
      await addLine(`[Agent Opera] Executing automation nodes on connected apps...`, 'opera', 800);
      await addLine(`[System] ✅ Custom command run completed successfully.`, 'system', 600);
    }

    setIsTerminalRunning(false);
  };

  // Submit terminal input
  const handleTerminalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!terminalInput.trim() || isTerminalRunning) return;
    const cmd = terminalInput.trim();
    setTerminalInput('');
    runTerminalCommand(cmd);
  };

  // Run Marketing Copy generator
  const runMktPlayground = () => {
    setIsMktLoading(true);
    setTimeout(() => {
      if (mktSector === 'SaaS') {
        setMktResult({
          headline: 'Scale Operations, Not Your Headcount.',
          subheadline: 'Automated AI agents that execute complex business workflows 24/7 with zero overhead.',
          cta: 'Start Free Trial',
          emailSubject: 'How to scale your SaaS operations with AI agents'
        });
      } else if (mktSector === 'Ecommerce') {
        setMktResult({
          headline: 'Recover 15% More Carts on Autopilot.',
          subheadline: 'Autonomous digital marketing and sales agents checking every transaction live.',
          cta: 'Boost Shop Sales',
          emailSubject: 'Unlocking hidden e-commerce margins using agentic loops'
        });
      } else if (mktSector === 'AI Dev') {
        setMktResult({
          headline: 'Hire Agents to Build Your Agents.',
          subheadline: 'Accelerate agent deployments and auto-optimize pipeline tests in seconds.',
          cta: 'Access API Key',
          emailSubject: 'Deploying agent nodes in production environments'
        });
      } else {
        setMktResult({
          headline: 'Local Support, Global Scale.',
          subheadline: 'Connect with retail buyers 24/7. Auto-respond to leads and book appointments.',
          cta: 'Book Local Demo',
          emailSubject: 'Automating customer replies for local operations'
        });
      }
      setIsMktLoading(false);
    }, 800);
  };

  // Run Sales Objection resolver
  const runSalesPlayground = () => {
    setIsSalesLoading(true);
    setTimeout(() => {
      if (salesObjection === 'Expensive') {
        setSalesResult({
          rebuttal: 'Our AI Agents cost less than 1/10th of a junior employee and work 24/7 without training, sick leaves, or setup overhead. You get full ROI in less than 14 days.',
          score: 95,
          outreachSubject: 'Re: Driving operational efficiency at your scale'
        });
      } else if (salesObjection === 'NoBudget') {
        setSalesResult({
          rebuttal: 'We offer a flexible pay-as-you-grow trial. If our agents do not add more revenue than their setup fee in month one, we refund the difference. Zero net risk.',
          score: 88,
          outreachSubject: 'Re: Risk-free operational trial'
        });
      } else if (salesObjection === 'Competitor') {
        setSalesResult({
          rebuttal: 'Unlike generic APIs, our agents communicate and resolve workflow drifts autonomously. Mark, Sail, Digima, and Opera collaborate on tasks so you do not have to write custom integrations.',
          score: 92,
          outreachSubject: 'Re: Next-generation agent collaboration architecture'
        });
      } else {
        setSalesResult({
          rebuttal: 'Our agents integrate with Slack, Gmail, HubSpot, and Notion, and only act on parameters defined by you. You maintain total administrative oversight and approve actions in real-time.',
          score: 90,
          outreachSubject: 'Re: Integration guidelines & admin dashboard'
        });
      }
      setIsSalesLoading(false);
    }, 850);
  };

  // Run Opera workflow step simulation
  const runOperaPlayground = async () => {
    if (isOperaRunning) return;
    setIsOperaRunning(true);
    
    // Reset status
    setOperaSteps(prev => prev.map(s => ({ ...s, status: 'idle' })));
    
    const updateStep = (id: number, status: 'idle' | 'running' | 'success') => {
      setOperaSteps(prev => prev.map(s => s.id === id ? { ...s, status } : s));
    };

    for (let i = 1; i <= 4; i++) {
      updateStep(i, 'running');
      await new Promise(r => setTimeout(r, 700));
      updateStep(i, 'success');
    }
    
    setIsOperaRunning(false);
  };

  // Recalculate Digima ad optimizations based on inputs
  useEffect(() => {
    const totalLeads = Math.round((adSpend / 15) * (1 + (metaWeight / 200)));
    const actualCPA = parseFloat((adSpend / totalLeads).toFixed(2));
    const calculatedROI = parseFloat((3 + (metaWeight * 0.01) - (adSpend * 0.00002)).toFixed(1));
    const keyword = metaWeight > 60 ? 'automated marketing flow' : 'high-converting sales funnel';

    setDigimaResult({
      leads: totalLeads,
      cpa: actualCPA,
      roi: calculatedROI > 1.2 ? calculatedROI : 1.2,
      recommendedKeyword: keyword
    });
  }, [adSpend, metaWeight]);

  // Run Mkt simulator on sector change
  useEffect(() => {
    runMktPlayground();
  }, [mktSector]);

  // Run Sales simulator on objection change
  useEffect(() => {
    runSalesPlayground();
  }, [salesObjection]);

  // Run Opera simulator on trigger change
  useEffect(() => {
    // Modify steps dynamically
    if (operaTrigger === 'Shopify Order') {
      setOperaSteps([
        { id: 1, text: 'Detect new Shopify order webhook', status: 'idle' },
        { id: 2, text: 'Check inventory status in Stripe', status: 'idle' },
        { id: 3, text: 'Send slack notification to fulfillment channel', status: 'idle' },
        { id: 4, text: 'Generate invoice PDF and upload to Google Drive', status: 'idle' }
      ]);
    } else if (operaTrigger === 'Stripe Dispute') {
      setOperaSteps([
        { id: 1, text: 'Detect Stripe dispute callback', status: 'idle' },
        { id: 2, text: 'Scan database transaction & deliverable logs', status: 'idle' },
        { id: 3, text: 'Draft chargeback response letter with Agent Mark copy', status: 'idle' },
        { id: 4, text: 'Submit response evidence via Stripe API', status: 'idle' }
      ]);
    } else {
      setOperaSteps([
        { id: 1, text: 'Detect new Cal.com booking webhook', status: 'idle' },
        { id: 2, text: 'Check invitee company data using Agent Sail enricher', status: 'idle' },
        { id: 3, text: 'Create lead contact in HubSpot', status: 'idle' },
        { id: 4, text: 'Draft briefing document and send Slack ping to host', status: 'idle' }
      ]);
    }
  }, [operaTrigger]);

  // ROI Math
  const humanCost = roiRoles * roiSalary;
  const aiSuiteCost = 999;
  const savingsMonthly = humanCost - aiSuiteCost;
  const savingsYearly = savingsMonthly * 12;
  const roiMultiplier = ((humanCost / aiSuiteCost) * 100).toFixed(0);

  // List of Agent objects
  const agents: Agent[] = [
    {
      id: 'mark',
      name: 'Agent Mark',
      role: 'Chief Marketing Copywriter',
      description: 'Mark is an autonomous brand strategist. He writes landing page copies, newsletter pitches, email marketing templates, and defines your brand style guide with enterprise-grade consistency.',
      colorClass: 'from-purple-500/20 to-purple-600/5 hover:border-purple-500/40',
      borderColor: 'border-purple-500/20 hover:border-purple-500/50',
      glowColor: 'bg-purple-500/10',
      textColor: 'text-purple-400',
      icon: <Sparkles className="w-6 h-6 text-purple-400" />,
      tags: ['Copywriting', 'SEO Copy', 'Product Messaging', 'Email Strategy'],
      capabilities: [
        'Maintains uniform brand-voice guidelines across channels',
        'Auto-drafts newsletters and promotional sequences',
        'Optimizes copywriting angles based on target audience persona',
        'Collaborates with Agent Digima for instant ad copy variants'
      ]
    },
    {
      id: 'sail',
      name: 'Agent Sail',
      role: 'Strategic Sales Closer',
      description: 'Sail works your sales pipelines 24/7. He scrapes lead signals, scores incoming contacts, handles complex customer objections, and crafts context-aware, hyper-personalized outreach sequences.',
      colorClass: 'from-emerald-500/20 to-emerald-600/5 hover:border-emerald-500/40',
      borderColor: 'border-emerald-500/20 hover:border-emerald-500/50',
      glowColor: 'bg-emerald-500/10',
      textColor: 'text-emerald-400',
      icon: <Users className="w-6 h-6 text-emerald-400" />,
      tags: ['Lead Enrichment', 'Objection Resolver', 'Email Outreach', 'CRM Automations'],
      capabilities: [
        'Performs automated lead scoring and enrichment in seconds',
        'Dynamically responds to product objections using customer profiles',
        'Dispatches tailored, multi-step email sequences',
        'Triggers operational setups via Opera on conversion'
      ]
    },
    {
      id: 'digima',
      name: 'Agent Digima',
      role: 'Paid Acquisition Specialist',
      description: 'Digima runs and monitors paid advertising campaigns. She splits ad budgets intelligently, creates search keyword suggestions, and monitors conversion rates in real-time.',
      colorClass: 'from-cyan-500/20 to-cyan-600/5 hover:border-cyan-500/40',
      borderColor: 'border-cyan-500/20 hover:border-cyan-500/50',
      glowColor: 'bg-cyan-500/10',
      textColor: 'text-cyan-400',
      icon: <TrendingUp className="w-6 h-6 text-cyan-400" />,
      tags: ['Paid Media', 'Budget Optimizer', 'Ad Analytics', 'Keyword Discovery'],
      capabilities: [
        'Dynamically balances ad budgets based on live performance metrics',
        'Discovers high-intent keywords for search optimization',
        'Provides real-time ROI tracking and CPA statistics',
        'Generates Meta and Google ad headlines dynamically'
      ]
    },
    {
      id: 'opera',
      name: 'Agent Opera',
      role: 'Workflow Automations Architect',
      description: 'Opera connects all your business tools together. She listens to stripe sales, calendar events, or support emails, then fixes database drifts, updates CRMs, and notifies your internal Slack.',
      colorClass: 'from-amber-500/20 to-amber-600/5 hover:border-amber-500/40',
      borderColor: 'border-amber-500/20 hover:border-amber-500/50',
      glowColor: 'bg-amber-500/10',
      textColor: 'text-amber-400',
      icon: <Workflow className="w-6 h-6 text-amber-400" />,
      tags: ['API Integrations', 'Data Reconciliation', 'Slack Alerting', 'Invoice Generation'],
      capabilities: [
        'Connects systems with sub-second webhook execution',
        'Auto-heals database state drifts and sync issues',
        'Compiles and drafts monthly analytics reports',
        'Triggers post-sales tasks for delivery and invoicing'
      ]
    }
  ];

  const faqItems = [
    {
      q: 'How do the agents collaborate with each other?',
      a: 'Our agents communicate over a secure message broker. For instance, when Agent Digima generates a lead, she informs Agent Sail, who enriches the profile. If Sail needs email copy, he queries Agent Mark for brand-aligned templates. Agent Opera then automates the final sync to your operational platforms. This mimics a real human department workspace!'
    },
    {
      q: 'Do I need developer skills to install these agents?',
      a: 'Not at all. We provide a clean, code-free connection interface. You authorize your favorite platforms (Slack, Stripe, HubSpot, Gmail, Shopify) in under 3 clicks, and the agents map out their integrations automatically. Custom workflows can be configured by describing them in plain English.'
    },
    {
      q: 'How secure is my company data?',
      a: 'We prioritize security. All operations run with read-write isolated API key sandboxing. Your database inputs and private files are encrypted at rest and in transit, and we never use your sensitive operational logs to train public model checkpoints. You remain in absolute control over authorization guidelines.'
    },
    {
      q: 'Can I approve actions before they run?',
      a: 'Yes! By default, agents operate in "Co-Pilot" mode, staging outreach drafts, invoice releases, and budget revisions for your 1-click approval in your control dashboard. Once they establish trust, you can toggle them to "Autopilot" for fully autonomous 24/7 background execution.'
    }
  ];

  return (
    <div className="relative min-h-screen bg-bg-dark text-gray-100 selection:bg-purple-500/30 selection:text-purple-200">
      
      {/* Background Glows & Grid */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-0 inset-x-0 h-[700px] grid-bg grid-mask opacity-60"></div>
        
        {/* Soft colorful blur spheres */}
        <div className="absolute top-[10%] left-[10%] w-[350px] h-[350px] bg-purple-500/10 rounded-full blur-[100px] animate-glow-pulse"></div>
        <div className="absolute top-[30%] right-[10%] w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[120px] animate-glow-pulse" style={{ animationDelay: '1.5s' }}></div>
        <div className="absolute top-[60%] left-[25%] w-[380px] h-[380px] bg-emerald-500/5 rounded-full blur-[110px] animate-glow-pulse" style={{ animationDelay: '3s' }}></div>
      </div>

      {/* Frosted Navigation Header */}
      <header className="sticky top-0 z-50 w-full border-b border-white/[0.06] bg-bg-dark/70 backdrop-blur-md transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-purple-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-purple-500/20">
              <Cpu className="w-4.5 h-4.5 text-white" />
            </div>
            <span className="font-anton text-xl tracking-wider text-white uppercase">COFOUNDR</span>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400">
            <a href="#features" className="hover:text-white transition-colors">Core Features</a>
            <a href="#agents" className="hover:text-white transition-colors">Meet the Agents</a>
            <a href="#playground" className="hover:text-white transition-colors">Command Center</a>
            <a href="#roi" className="hover:text-white transition-colors">ROI Calculator</a>
            <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
          </nav>

          <div className="flex items-center gap-4">
            <div className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/20 bg-emerald-500/5 text-[11px] text-emerald-400 font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              All Systems Operational
            </div>
            <a
              href="#pricing"
              className="px-4 py-1.5 text-xs font-semibold rounded-md border border-white/10 hover:border-white/20 bg-white/[0.02] hover:bg-white/[0.08] transition-all text-white flex items-center gap-1.5 shadow-sm active:scale-95"
            >
              Hire Agents
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* HERO SECTION */}
        <section className="text-center pt-8 pb-16 lg:pt-16 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-500/30 bg-purple-500/5 text-xs text-purple-300 font-semibold mb-6 shadow-inner">
            <Sparkles className="w-3.5 h-3.5" />
            Empowering businesses with autonomous workforce units
          </div>
          
          <h1 className="font-anton text-4xl sm:text-6xl lg:text-7xl text-white tracking-wide leading-none uppercase select-none mb-6">
            The Self-Operating <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-cyan-400 to-emerald-400">Company</span>
          </h1>
          
          <p className="text-base sm:text-lg lg:text-xl text-gray-400 max-w-2xl mx-auto font-light leading-relaxed mb-8">
            Deploy specialized, collaborative AI agents that autonomously run your marketing, automate your sales pipelines, optimize paid campaigns, and reconcile business systems 24/7.
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-16">
            <a
              href="#playground"
              className="w-full sm:w-auto px-6 py-3 text-sm font-semibold rounded-lg bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white shadow-lg shadow-purple-500/20 active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <TerminalIcon className="w-4 h-4" />
              Open Command Center
            </a>
            <a
              href="#agents"
              className="w-full sm:w-auto px-6 py-3 text-sm font-semibold rounded-lg border border-white/10 hover:border-white/20 bg-white/[0.01] hover:bg-white/[0.04] text-gray-300 hover:text-white transition-all flex items-center justify-center gap-1"
            >
              Meet Agent Team
              <ChevronRight className="w-4 h-4" />
            </a>
          </div>
        </section>

        {/* HERO INTERACTIVE TERMINAL PLAYGROUND */}
        <section id="playground" className="mb-28 max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-xs uppercase tracking-widest text-cyan-400 font-bold mb-2">Simulate Collaboration</h2>
            <h3 className="text-2xl sm:text-3xl font-anton text-white uppercase tracking-wide">Multi-Agent Control Center</h3>
            <p className="text-sm text-gray-400 mt-2 max-w-lg mx-auto">
              Click a preset scenario button to watch the agents execute automated, cross-department workflows live.
            </p>
          </div>

          {/* Preset Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
            <button
              onClick={() => runTerminalCommand('/launch_campaign')}
              disabled={isTerminalRunning}
              className="flex items-center justify-between p-3 rounded-lg border border-purple-500/20 hover:border-purple-500/50 bg-purple-500/5 hover:bg-purple-500/10 text-left transition-all active:scale-98 disabled:opacity-50 disabled:cursor-not-allowed group cursor-pointer"
            >
              <div>
                <p className="text-xs font-mono text-purple-400">SCENARIO A</p>
                <p className="text-sm font-bold text-white group-hover:text-purple-300">/launch_campaign</p>
              </div>
              <Play className="w-4 h-4 text-purple-400 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
            </button>

            <button
              onClick={() => runTerminalCommand('/qualify_leads')}
              disabled={isTerminalRunning}
              className="flex items-center justify-between p-3 rounded-lg border border-emerald-500/20 hover:border-emerald-500/50 bg-emerald-500/5 hover:bg-emerald-500/10 text-left transition-all active:scale-98 disabled:opacity-50 disabled:cursor-not-allowed group cursor-pointer"
            >
              <div>
                <p className="text-xs font-mono text-emerald-400">SCENARIO B</p>
                <p className="text-sm font-bold text-white group-hover:text-emerald-300">/qualify_leads</p>
              </div>
              <Play className="w-4 h-4 text-emerald-400 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
            </button>

            <button
              onClick={() => runTerminalCommand('/optimize_operations')}
              disabled={isTerminalRunning}
              className="flex items-center justify-between p-3 rounded-lg border border-amber-500/20 hover:border-amber-500/50 bg-amber-500/5 hover:bg-amber-500/10 text-left transition-all active:scale-98 disabled:opacity-50 disabled:cursor-not-allowed group cursor-pointer"
            >
              <div>
                <p className="text-xs font-mono text-amber-400">SCENARIO C</p>
                <p className="text-sm font-bold text-white group-hover:text-amber-300">/optimize_operations</p>
              </div>
              <Play className="w-4 h-4 text-amber-400 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
            </button>
          </div>

          {/* Terminal Console */}
          <div className="relative glow-card bg-black/40 border border-white/[0.06] rounded-xl overflow-hidden shadow-2xl backdrop-blur-md">
            
            {/* Terminal Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.06] bg-white/[0.02]">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/75"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/75"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/75"></span>
                <span className="text-xs font-mono text-gray-500 ml-2">cofoundr-terminal-v2.0</span>
              </div>
              <div className="flex items-center gap-4 text-xs font-mono text-gray-400">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  CONNECTED
                </span>
              </div>
            </div>

            {/* Terminal Content Screen */}
            <div ref={terminalContainerRef} className="p-4 h-[320px] overflow-y-auto font-mono text-xs sm:text-sm space-y-2.5 terminal-scroll bg-[#0b0c10]/80">
              {terminalLines.map((line, idx) => {
                let textCol = 'text-gray-300';
                let tag = '';
                
                if (line.type === 'system') {
                  textCol = 'text-cyan-400/90';
                } else if (line.type === 'mark') {
                  textCol = 'text-purple-400';
                  tag = '[Mark] ';
                } else if (line.type === 'sail') {
                  textCol = 'text-emerald-400';
                  tag = '[Sail] ';
                } else if (line.type === 'digima') {
                  textCol = 'text-cyan-300';
                  tag = '[Digima] ';
                } else if (line.type === 'opera') {
                  textCol = 'text-amber-400';
                  tag = '[Opera] ';
                } else if (line.type === 'input') {
                  textCol = 'text-white font-bold';
                  tag = '> ';
                }

                return (
                  <div key={idx} className="flex items-start gap-2 leading-relaxed">
                    <span className="text-gray-600 select-none text-[11px] mt-0.5">[{line.time}]</span>
                    <span className={textCol}>
                      {tag}{line.text}
                    </span>
                  </div>
                );
              })}

              {isTerminalRunning && (
                <div className="flex items-center gap-2 text-gray-400 animate-pulse">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                  <span>Agents executing workflow logs...</span>
                </div>
              )}
            </div>

            {/* Terminal Input Form */}
            <form onSubmit={handleTerminalSubmit} className="border-t border-white/[0.06] bg-white/[0.02] flex items-center">
              <span className="pl-4 font-mono text-sm text-cyan-500 select-none">{'>'}</span>
              <input
                type="text"
                placeholder={isTerminalRunning ? "Agents processing task..." : "Type custom workflow instruction (e.g. /help)..."}
                value={terminalInput}
                onChange={(e) => setTerminalInput(e.target.value)}
                disabled={isTerminalRunning}
                className="w-full px-3 py-3.5 bg-transparent border-0 text-white font-mono text-sm focus:outline-none focus:ring-0 placeholder-gray-600 disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={isTerminalRunning || !terminalInput.trim()}
                className="px-4 py-3.5 text-cyan-400 hover:text-cyan-300 disabled:text-gray-600 transition-colors font-mono text-xs cursor-pointer select-none"
              >
                EXECUTE
              </button>
            </form>
          </div>
        </section>

        {/* MEET THE AGENTS SECTION */}
        <section id="agents" className="mb-28 scroll-mt-20">
          <div className="text-center mb-12">
            <h2 className="text-xs uppercase tracking-widest text-purple-400 font-bold mb-2">Our Specialized Fleet</h2>
            <h3 className="text-3xl sm:text-4xl font-anton text-white uppercase tracking-wide">Meet the Autonomous Team</h3>
            <p className="text-sm text-gray-400 mt-2 max-w-xl mx-auto">
              Our 4 core agents cover your marketing, sales pipelines, paid acquisition, and backend operations, speaking to each other seamlessly.
            </p>
          </div>

          {/* Interactive Agent Select Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {agents.map((agent) => (
              <button
                key={agent.id}
                onClick={() => setActiveTab(agent.id as any)}
                className={`px-4 sm:px-6 py-3 rounded-lg border text-sm font-semibold transition-all duration-300 flex items-center gap-2 cursor-pointer select-none active:scale-95 ${
                  activeTab === agent.id
                    ? 'border-purple-500/30 bg-purple-500/10 text-white shadow-md shadow-purple-500/5'
                    : 'border-white/5 bg-white/[0.01] text-gray-400 hover:text-gray-200 hover:bg-white/[0.03]'
                }`}
              >
                {agent.icon}
                {agent.name}
              </button>
            ))}
          </div>

          {/* Agent Display Panel & Playground */}
          {agents.map((agent) => {
            if (agent.id !== activeTab) return null;
            return (
              <div key={agent.id} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                
                {/* Agent Detail Card */}
                <div className="lg:col-span-6 flex flex-col justify-between p-6 sm:p-8 rounded-xl border border-white/[0.06] bg-white/[0.02] relative overflow-hidden backdrop-blur-md">
                  <div className={`absolute top-0 right-0 w-24 h-24 rounded-full blur-[40px] opacity-30 ${agent.glowColor}`}></div>
                  
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      {agent.icon}
                      <div>
                        <h4 className="text-xl font-bold text-white leading-none">{agent.name}</h4>
                        <span className="text-xs text-gray-500 font-medium">{agent.role}</span>
                      </div>
                    </div>

                    <p className="text-sm text-gray-300 leading-relaxed mb-6">
                      {agent.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {agent.tags.map((tag, i) => (
                        <span key={i} className="px-2.5 py-0.5 rounded-full text-[11px] font-medium border border-white/5 bg-white/[0.02] text-gray-400">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="border-t border-white/[0.06] pt-6">
                      <h5 className="text-xs font-mono uppercase text-gray-400 tracking-wider mb-3">Key Automation Capabilities</h5>
                      <ul className="space-y-2.5">
                        {agent.capabilities.map((cap, i) => (
                          <li key={i} className="flex items-start gap-2.5 text-xs text-gray-400">
                            <Check className={`w-4 h-4 shrink-0 mt-0.5 ${agent.textColor}`} />
                            <span>{cap}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Agent Interactive Playground Widget */}
                <div className="lg:col-span-6 flex flex-col p-6 sm:p-8 rounded-xl border border-white/[0.06] bg-black/30 backdrop-blur-md justify-between">
                  
                  {/* Mark Playground */}
                  {agent.id === 'mark' && (
                    <div className="flex flex-col h-full justify-between">
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-xs font-mono uppercase text-purple-400">Interactive Playground</span>
                          <span className="text-xs text-gray-500">Marketing Generator</span>
                        </div>
                        <h4 className="text-lg font-bold text-white mb-2">Test Agent Mark's Output</h4>
                        <p className="text-xs text-gray-400 mb-6">
                          Select your industry sector and watch Agent Mark draft copy variations automatically.
                        </p>

                        <div className="grid grid-cols-2 gap-2 mb-6">
                          {['SaaS', 'Ecommerce', 'AI Dev', 'Retail'].map((sec) => (
                            <button
                              key={sec}
                              onClick={() => setMktSector(sec)}
                              className={`p-2.5 text-xs font-semibold rounded-md border text-center transition-all cursor-pointer ${
                                mktSector === sec
                                  ? 'border-purple-500/30 bg-purple-500/10 text-white'
                                  : 'border-white/5 bg-white/[0.01] text-gray-400 hover:bg-white/[0.03]'
                              }`}
                            >
                              {sec === 'AI Dev' ? 'AI Developer' : sec === 'Ecommerce' ? 'E-Commerce' : sec}
                            </button>
                          ))}
                        </div>

                        {/* Sandbox Output Screen */}
                        <div className="p-4 rounded-lg bg-[#0e0f14] border border-white/[0.04] font-mono text-xs space-y-3 min-h-[140px] relative">
                          {isMktLoading ? (
                            <div className="absolute inset-0 bg-[#0e0f14]/80 flex items-center justify-center gap-2">
                              <RefreshCw className="w-4 h-4 text-purple-400 animate-spin" />
                              <span className="text-purple-300">Mark is drafting copy...</span>
                            </div>
                          ) : null}
                          
                          <div>
                            <span className="text-purple-400 font-bold">[Headline]</span>
                            <p className="text-white mt-1">{mktResult.headline}</p>
                          </div>
                          <div>
                            <span className="text-purple-400 font-bold">[Sub-headline]</span>
                            <p className="text-gray-400 mt-1">{mktResult.subheadline}</p>
                          </div>
                          <div>
                            <span className="text-purple-400 font-bold">[Email Subject]</span>
                            <p className="text-gray-400 mt-1">{mktResult.emailSubject}</p>
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={runMktPlayground}
                        className="mt-6 w-full py-2.5 text-xs font-semibold rounded-md border border-purple-500/30 bg-purple-500/5 hover:bg-purple-500/10 text-purple-300 hover:text-white transition-all cursor-pointer flex items-center justify-center gap-2 active:scale-98"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                        Regenerate Variant
                      </button>
                    </div>
                  )}

                  {/* Sail Playground */}
                  {agent.id === 'sail' && (
                    <div className="flex flex-col h-full justify-between">
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-xs font-mono uppercase text-emerald-400">Interactive Playground</span>
                          <span className="text-xs text-gray-500">Objection Handler</span>
                        </div>
                        <h4 className="text-lg font-bold text-white mb-2">Test Agent Sail's Response</h4>
                        <p className="text-xs text-gray-400 mb-6">
                          Select a typical customer objection. Sail will write a targeted email response draft.
                        </p>

                        <div className="grid grid-cols-2 gap-2 mb-6">
                          {[
                            { key: 'Expensive', val: 'Too Expensive' },
                            { key: 'NoBudget', val: 'No Budget Now' },
                            { key: 'Competitor', val: 'Using Competitor' },
                            { key: 'AdminLock', val: 'Admin Approvals' }
                          ].map((obj) => (
                            <button
                              key={obj.key}
                              onClick={() => setSalesObjection(obj.key)}
                              className={`p-2.5 text-xs font-semibold rounded-md border text-center transition-all cursor-pointer ${
                                salesObjection === obj.key
                                  ? 'border-emerald-500/30 bg-emerald-500/10 text-white'
                                  : 'border-white/5 bg-white/[0.01] text-gray-400 hover:bg-white/[0.03]'
                              }`}
                            >
                              {obj.val}
                            </button>
                          ))}
                        </div>

                        {/* Sandbox Output Screen */}
                        <div className="p-4 rounded-lg bg-[#0e0f14] border border-white/[0.04] font-mono text-xs space-y-3 min-h-[140px] relative">
                          {isSalesLoading ? (
                            <div className="absolute inset-0 bg-[#0e0f14]/80 flex items-center justify-center gap-2">
                              <RefreshCw className="w-4 h-4 text-emerald-400 animate-spin" />
                              <span className="text-emerald-300">Sail is formulating closing argument...</span>
                            </div>
                          ) : null}
                          
                          <div className="flex justify-between border-b border-white/[0.04] pb-2">
                            <div>
                              <span className="text-emerald-400 font-bold">[Outreach Subject]</span>
                              <p className="text-white mt-0.5">{salesResult.outreachSubject}</p>
                            </div>
                            <div className="text-right">
                              <span className="text-gray-500 block">Lead Conversion Score</span>
                              <span className="text-emerald-400 font-bold text-sm">{salesResult.score}/100</span>
                            </div>
                          </div>
                          <div>
                            <span className="text-emerald-400 font-bold">[Objection Response Rebuttal]</span>
                            <p className="text-gray-400 mt-1 leading-relaxed">{salesResult.rebuttal}</p>
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={runSalesPlayground}
                        className="mt-6 w-full py-2.5 text-xs font-semibold rounded-md border border-emerald-500/30 bg-emerald-500/5 hover:bg-emerald-500/10 text-emerald-300 hover:text-white transition-all cursor-pointer flex items-center justify-center gap-2 active:scale-98"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                        Re-evaluate Lead Scoring
                      </button>
                    </div>
                  )}

                  {/* Digima Playground */}
                  {agent.id === 'digima' && (
                    <div className="flex flex-col h-full justify-between">
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-xs font-mono uppercase text-cyan-400">Interactive Playground</span>
                          <span className="text-xs text-gray-500">Ad Budget Allocator</span>
                        </div>
                        <h4 className="text-lg font-bold text-white mb-2">Simulate Ad Campaigns</h4>
                        <p className="text-xs text-gray-400 mb-6">
                          Use the sliders to adjust monthly budget and channel weight. Digima will optimize ad outcomes.
                        </p>

                        <div className="space-y-4 mb-6">
                          <div>
                            <div className="flex justify-between text-xs font-medium mb-1.5">
                              <span className="text-gray-400">Monthly Budget</span>
                              <span className="text-cyan-400 font-bold">${adSpend.toLocaleString()}</span>
                            </div>
                            <input
                              type="range"
                              min="1000"
                              max="50000"
                              step="1000"
                              value={adSpend}
                              onChange={(e) => setAdSpend(Number(e.target.value))}
                              className="w-full accent-cyan-400 h-1.5 bg-white/10 rounded-lg cursor-pointer"
                            />
                          </div>

                          <div>
                            <div className="flex justify-between text-xs font-medium mb-1.5">
                              <span className="text-gray-400">Channel Split</span>
                              <span className="text-cyan-400 font-bold">{metaWeight}% Meta / {100 - metaWeight}% Google</span>
                            </div>
                            <input
                              type="range"
                              min="10"
                              max="90"
                              step="5"
                              value={metaWeight}
                              onChange={(e) => setMetaWeight(Number(e.target.value))}
                              className="w-full accent-cyan-400 h-1.5 bg-white/10 rounded-lg cursor-pointer"
                            />
                          </div>
                        </div>

                        {/* Sandbox Output Screen */}
                        <div className="p-4 rounded-lg bg-[#0e0f14] border border-white/[0.04] font-mono text-xs grid grid-cols-2 gap-4">
                          <div>
                            <span className="text-gray-500 block">Est. Monthly Leads</span>
                            <span className="text-white text-base font-bold mt-1 block">{digimaResult.leads}</span>
                          </div>
                          <div>
                            <span className="text-gray-500 block">Cost Per Acquisition</span>
                            <span className="text-white text-base font-bold mt-1 block">${digimaResult.cpa}</span>
                          </div>
                          <div>
                            <span className="text-gray-500 block">Predicted ROAS</span>
                            <span className="text-cyan-400 text-base font-bold mt-1 block">{digimaResult.roi}x</span>
                          </div>
                          <div>
                            <span className="text-gray-500 block">Optimized Keyword Focus</span>
                            <span className="text-white text-[11px] font-bold mt-1.5 block truncate" title={digimaResult.recommendedKeyword}>
                              "{digimaResult.recommendedKeyword}"
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="mt-6 flex items-center gap-2 p-2.5 rounded border border-cyan-500/10 bg-cyan-500/5 text-[11px] text-cyan-300">
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        <span>Digima runs continuous bid audits every 15 minutes to secure these stats.</span>
                      </div>
                    </div>
                  )}

                  {/* Opera Playground */}
                  {agent.id === 'opera' && (
                    <div className="flex flex-col h-full justify-between">
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-xs font-mono uppercase text-amber-400">Interactive Playground</span>
                          <span className="text-xs text-gray-500">Workflow Node Automator</span>
                        </div>
                        <h4 className="text-lg font-bold text-white mb-2">Operational Node Simulator</h4>
                        <p className="text-xs text-gray-400 mb-6">
                          Select a trigger event. Watch Opera build and execute downstream automation blocks.
                        </p>

                        <div className="flex gap-2 mb-6">
                          {['Shopify Order', 'Stripe Dispute', 'Calendar Booking'].map((trig) => (
                            <button
                              key={trig}
                              onClick={() => setOperaTrigger(trig)}
                              className={`flex-1 py-2 text-xs font-semibold rounded-md border text-center transition-all cursor-pointer ${
                                operaTrigger === trig
                                  ? 'border-amber-500/30 bg-amber-500/10 text-white'
                                  : 'border-white/5 bg-white/[0.01] text-gray-400 hover:bg-white/[0.03]'
                              }`}
                            >
                              {trig === 'Calendar Booking' ? 'Cal.com Booking' : trig}
                            </button>
                          ))}
                        </div>

                        {/* Node Flow Execution Screen */}
                        <div className="p-4 rounded-lg bg-[#0e0f14] border border-white/[0.04] space-y-2.5">
                          {operaSteps.map((step) => {
                            let statusIcon = <div className="w-2 h-2 rounded-full bg-gray-600"></div>;
                            let textClass = 'text-gray-500 font-mono';
                            let borderClass = 'border-white/5 bg-white/[0.01]';
                            
                            if (step.status === 'running') {
                              statusIcon = <div className="w-2 h-2 rounded-full bg-amber-400 animate-ping"></div>;
                              textClass = 'text-amber-300 font-mono font-semibold';
                              borderClass = 'border-amber-500/20 bg-amber-500/5 animate-pulse';
                            } else if (step.status === 'success') {
                              statusIcon = <CheckCircle2 className="w-4.5 h-4.5 text-emerald-400" />;
                              textClass = 'text-gray-300 font-mono';
                              borderClass = 'border-emerald-500/10 bg-emerald-500/[0.02]';
                            }

                            return (
                              <div
                                key={step.id}
                                className={`flex items-center gap-3 p-2.5 rounded border text-xs transition-all ${borderClass}`}
                              >
                                <div className="w-5 h-5 flex items-center justify-center shrink-0">
                                  {statusIcon}
                                </div>
                                <span className={textClass}>{step.text}</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      <button
                        onClick={runOperaPlayground}
                        disabled={isOperaRunning}
                        className="mt-6 w-full py-2.5 text-xs font-semibold rounded-md border border-amber-500/30 bg-amber-500/5 hover:bg-amber-500/10 text-amber-300 hover:text-white transition-all cursor-pointer flex items-center justify-center gap-2 active:scale-98 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Play className="w-3.5 h-3.5" />
                        {isOperaRunning ? 'Executing Automation Node...' : 'Test Run Workflow'}
                      </button>
                    </div>
                  )}

                </div>
              </div>
            );
          })}
        </section>

        {/* WORKFORCE & ROI CALCULATOR */}
        <section id="roi" className="mb-28 scroll-mt-20">
          <div className="text-center mb-12">
            <h2 className="text-xs uppercase tracking-widest text-emerald-400 font-bold mb-2">Cost & Performance Analytics</h2>
            <h3 className="text-3xl sm:text-4xl font-anton text-white uppercase tracking-wide">AI Agent Suite ROI Calculator</h3>
            <p className="text-sm text-gray-400 mt-2 max-w-xl mx-auto">
              Compare human employee overhead with deploying the fully automated Cofoundr Agent Suite.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Controls */}
            <div className="lg:col-span-5 p-6 sm:p-8 rounded-xl border border-white/[0.06] bg-white/[0.02] flex flex-col justify-between backdrop-blur-md">
              <div>
                <h4 className="text-lg font-bold text-white mb-6">Customize Workforce Requirements</h4>
                
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between text-xs font-medium mb-2">
                      <span className="text-gray-400">Equivalent Human Roles Needed</span>
                      <span className="text-white font-bold">{roiRoles} FTEs</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="10"
                      step="1"
                      value={roiRoles}
                      onChange={(e) => setRoiRoles(Number(e.target.value))}
                      className="w-full accent-purple-400 h-1.5 bg-white/10 rounded-lg cursor-pointer"
                    />
                    <span className="text-[10px] text-gray-500 mt-1 block">Full-time employees replaced across marketing, sales, and dev.</span>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-medium mb-2">
                      <span className="text-gray-400">Average Salary per FTE (monthly)</span>
                      <span className="text-white font-bold">${roiSalary.toLocaleString()}</span>
                    </div>
                    <input
                      type="range"
                      min="2000"
                      max="15000"
                      step="500"
                      value={roiSalary}
                      onChange={(e) => setRoiSalary(Number(e.target.value))}
                      className="w-full accent-purple-400 h-1.5 bg-white/10 rounded-lg cursor-pointer"
                    />
                    <span className="text-[10px] text-gray-500 mt-1 block">Includes payroll taxes, healthcare, software seat licenses, and overhead.</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 border-t border-white/[0.06] pt-6">
                <div className="flex justify-between items-center text-xs text-gray-400">
                  <span>Flat Cofoundr Agent Subscription:</span>
                  <span className="text-white font-mono font-bold">$999/mo</span>
                </div>
              </div>
            </div>

            {/* Calculations display */}
            <div className="lg:col-span-7 p-6 sm:p-8 rounded-xl border border-white/[0.06] bg-black/40 flex flex-col justify-between relative overflow-hidden backdrop-blur-md">
              <div className="absolute top-0 right-0 w-44 h-44 rounded-full bg-emerald-500/5 blur-[50px] pointer-events-none"></div>
              
              <div>
                <span className="text-[10px] font-mono uppercase text-emerald-400 px-2.5 py-1 rounded-full border border-emerald-500/20 bg-emerald-500/5 font-semibold">
                  Financial Analysis
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
                  <div>
                    <span className="text-xs text-gray-500 block">Monthly Human Cost</span>
                    <span className="text-2xl font-bold text-gray-400 line-through mt-1 block">
                      ${humanCost.toLocaleString()}
                    </span>
                  </div>
                  <div>
                    <span className="text-xs text-gray-400 block">Net Monthly AI Savings</span>
                    <span className="text-2xl font-anton text-emerald-400 tracking-wide mt-1 block">
                      +${savingsMonthly.toLocaleString()}
                    </span>
                  </div>
                  <div>
                    <span className="text-xs text-gray-400 block">Net Annual ROI Savings</span>
                    <span className="text-4xl font-anton text-white tracking-wide mt-1.5 block">
                      +${savingsYearly.toLocaleString()}
                    </span>
                  </div>
                  <div>
                    <span className="text-xs text-gray-400 block">Workforce Cost Reduction</span>
                    <span className="text-4xl font-anton text-emerald-400 tracking-wide mt-1.5 block">
                      {roiMultiplier}%
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-8 border-t border-white/[0.06] pt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div className="flex items-center gap-2 text-gray-400">
                  <Check className="w-4.5 h-4.5 text-emerald-400" />
                  <span>24/7/365 Coverage</span>
                </div>
                <div className="flex items-center gap-2 text-gray-400">
                  <Check className="w-4.5 h-4.5 text-emerald-400" />
                  <span>Sub-Second Response</span>
                </div>
                <div className="flex items-center gap-2 text-gray-400">
                  <Check className="w-4.5 h-4.5 text-emerald-400" />
                  <span>Zero Hiring Overhead</span>
                </div>
              </div>

            </div>

          </div>
        </section>

        {/* COMPARISON / FEATURE CARDS */}
        <section id="features" className="mb-28 scroll-mt-20">
          <div className="text-center mb-16">
            <h2 className="text-xs uppercase tracking-widest text-cyan-400 font-bold mb-2">Designed for Execution</h2>
            <h3 className="text-3xl sm:text-4xl font-anton text-white uppercase tracking-wide">Under the Hood</h3>
            <p className="text-sm text-gray-400 mt-2 max-w-xl mx-auto">
              Why businesses choose our AI Agent workforce over traditional freelancers and outdated API pipelines.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Feature 1 */}
            <div className="glow-card p-6 rounded-xl border border-white/[0.06] bg-white/[0.01] hover:bg-white/[0.02] flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mb-6">
                  <Workflow className="w-5 h-5 text-purple-400" />
                </div>
                <h4 className="text-base font-bold text-white mb-2">Multi-Agent Protocol</h4>
                <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
                  Agents do not operate in silos. They share memory states and coordinate outcomes. Mark drafts copy, Digima publishes campaigns, Sail closes prospects, and Opera reconciles databases automatically.
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="glow-card p-6 rounded-xl border border-white/[0.06] bg-white/[0.01] hover:bg-white/[0.02] flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mb-6">
                  <Lock className="w-5 h-5 text-cyan-400" />
                </div>
                <h4 className="text-base font-bold text-white mb-2">Enterprise-Grade Security</h4>
                <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
                  Data privacy is built in. Read-write scopes are strictly isolated. Credentials and API tokens are doubly encrypted, ensuring that your operational records and customer logs never leave your tenant space.
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="glow-card p-6 rounded-xl border border-white/[0.06] bg-white/[0.01] hover:bg-white/[0.02] flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-6">
                  <Zap className="w-5 h-5 text-emerald-400" />
                </div>
                <h4 className="text-base font-bold text-white mb-2">Sub-Second Execution</h4>
                <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
                  No delays. As soon as a webhook trigger fires, downstream integrations, text generation models, and accounting checks execute in parallel, resolving flows in less than 600 milliseconds.
                </p>
              </div>
            </div>

          </div>
        </section>

        {/* PRICING PLANS */}
        <section id="pricing" className="mb-28 scroll-mt-20 max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-xs uppercase tracking-widest text-purple-400 font-bold mb-2">Simple, Flat Pricing</h2>
            <h3 className="text-3xl sm:text-4xl font-anton text-white uppercase tracking-wide">Deploy Agents Today</h3>
            <p className="text-sm text-gray-400 mt-2 max-w-lg mx-auto">
              Access the entire suite of 4 agents with full collaborative workflow capabilities.
            </p>
          </div>

          {/* Pricing Card */}
          <div className="relative glow-card bg-gradient-to-tr from-purple-500/10 via-cyan-500/5 to-white/0 border border-purple-500/20 rounded-2xl p-6 sm:p-10 text-center overflow-hidden shadow-2xl backdrop-blur-md">
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/15 rounded-full blur-[40px] pointer-events-none animate-pulse-slow"></div>
            
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-purple-500/30 bg-purple-500/5 text-xs text-purple-300 font-mono font-bold mb-6">
              <Sparkles className="w-3.5 h-3.5" />
              FOUNDERS BUNDLE - LIMITED ACCESS
            </div>

            <div className="mb-6">
              <span className="text-gray-400 text-sm align-super font-medium">$</span>
              <span className="text-5xl sm:text-6xl font-anton text-white tracking-wide">999</span>
              <span className="text-gray-400 text-sm font-medium">/month</span>
            </div>

            <p className="text-sm text-gray-300 max-w-md mx-auto leading-relaxed mb-8">
              Get full access to Agent Mark, Agent Sail, Agent Digima, and Agent Opera. Includes custom knowledge base training, unlimited collaborative pipelines, and direct Slack support.
            </p>

            <button className="w-full sm:w-auto px-8 py-3.5 text-sm font-semibold rounded-lg bg-white text-bg-dark hover:bg-gray-100 transition-all font-sans active:scale-95 shadow-lg cursor-pointer select-none mb-8">
              Activate Agent Suite Account
            </button>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-white/[0.06] text-xs text-gray-400 text-left">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-cyan-400" />
                <span>Unlimited Pipelines</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-cyan-400" />
                <span>Custom KB Training</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-cyan-400" />
                <span>Human-In-The-Loop Approval</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-cyan-400" />
                <span>Premium Slack Support</span>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ SECTION */}
        <section id="faq" className="mb-28 scroll-mt-20 max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-xs uppercase tracking-widest text-gray-400 font-bold mb-2">Got Questions?</h2>
            <h3 className="text-2xl sm:text-3xl font-anton text-white uppercase tracking-wide">Frequently Asked Questions</h3>
          </div>

          <div className="space-y-4">
            {faqItems.map((item, idx) => (
              <div
                key={idx}
                className="rounded-xl border border-white/[0.06] bg-white/[0.01] overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full px-6 py-4 flex items-center justify-between text-left text-white font-medium hover:bg-white/[0.02] transition-colors cursor-pointer select-none"
                >
                  <span className="text-sm sm:text-base">{item.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-gray-400 transition-transform duration-300 ${
                      openFaq === idx ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                
                <div
                  className={`transition-all duration-300 ease-in-out ${
                    openFaq === idx ? 'max-h-[200px] border-t border-white/[0.04]' : 'max-h-0'
                  } overflow-hidden`}
                >
                  <p className="px-6 py-4 text-xs sm:text-sm text-gray-400 leading-relaxed bg-black/10">
                    {item.a}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

      </main>

      {/* FOOTER */}
      <footer className="mt-auto border-t border-white/[0.06] bg-bg-dark/40 py-12 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded bg-gradient-to-tr from-purple-500 to-cyan-500 flex items-center justify-center">
              <Cpu className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="font-anton text-base tracking-wider text-white uppercase">COFOUNDR</span>
          </div>

          <p className="text-xs text-gray-500 font-mono">
            &copy; {new Date().getFullYear()} COFOUNDR. WORLD. ALL RIGHTS RESERVED.
          </p>

          <div className="flex items-center gap-6 text-xs text-gray-500">
            <a href="#privacy" className="hover:text-gray-300 transition-colors">Privacy Policy</a>
            <a href="#terms" className="hover:text-gray-300 transition-colors">Terms of Service</a>
          </div>
        </div>
      </footer>

    </div>
  );
}
