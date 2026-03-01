import React, { useState, useEffect, useRef } from 'react';
import { Camera, Utensils, Star, ArrowRight, Zap, TrendingUp, Users, Menu, X, Apple, Brain, CheckCircle2, XCircle, Check, ChevronRight, Link, Search, Rocket, Loader2, UserCheck, BarChart3, PenTool, ShieldCheck } from 'lucide-react';

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  // Modal state for form embeds
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState(null); // 'restaurant' | 'creator'
  
  // Refs for scroll spy
  const step1Ref = useRef(null);
  const step2Ref = useRef(null);
  const step3Ref = useRef(null);

  // Performance: Track if Hero is visible to pause videos
  const [isHeroVisible, setIsHeroVisible] = useState(true);
  const heroRef = useRef(null);

  // Spotlight State
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const creatorsRef = useRef(null);

  const handleMouseMove = (e) => {
    if (creatorsRef.current) {
      const rect = creatorsRef.current.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Performance: Intersection Observer for Hero Section
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsHeroVisible(entry.isIntersecting);
      },
      { threshold: 0.1 } // Trigger when 10% of hero is visible
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => {
      if (heroRef.current) observer.unobserve(heroRef.current);
    };
  }, []);

  // Scroll Spy for How It Works
  useEffect(() => {
    const handleScrollSpy = () => {
      const positions = [
        step1Ref.current?.getBoundingClientRect().top,
        step2Ref.current?.getBoundingClientRect().top,
        step3Ref.current?.getBoundingClientRect().top
      ];
      
      const offset = 400; // Adjustment for trigger point
      
      if (positions[0] < offset && positions[0] > -offset) setActiveStep(0);
      if (positions[1] < offset && positions[1] > -offset) setActiveStep(1);
      if (positions[2] < offset) setActiveStep(2);
    };

    window.addEventListener('scroll', handleScrollSpy);
    return () => window.removeEventListener('scroll', handleScrollSpy);
  }, []);

  // Lock body scroll while modal is open and close modal on ESC
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setModalOpen(false); };
    if (modalOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [modalOpen]);

  // Custom Logo Component - Responsive Text Size
  const Logo = () => (
    <div className="flex items-center gap-2">
      <span className="text-2xl md:text-3xl font-extrabold tracking-tighter text-white">
        ED<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">EAT</span>
      </span>
    </div>
  );

  const creatorSteps = [
    {
      step: "01",
      title: "Apply",
      desc: "Fill out a form with your social stats, content style, availability, and links to your top performing food posts.",
      icon: <PenTool className="w-6 h-6 text-cyan-400" />
    },
    {
      step: "02",
      title: "Get Reviewed",
      desc: "We manually review every profile. We're looking for quality, engagement, and a genuine passion for food.",
      icon: <ShieldCheck className="w-6 h-6 text-purple-400" />
    },
    {
      step: "03",
      title: "Dine & Create",
      desc: "Once selected, you'll be onboarded and invited to experience complimentary tasting menus at London's best restaurants.",
      icon: <Utensils className="w-6 h-6 text-pink-400" />
    }
  ];

  const tickerItems = [
    "SUSHI ZEN", "•", "@FOODIE_JANE", "•", "BURGER BARN", "•", "@TASTY_TRAVELS", "•",
    "THE GLASS ONION", "•", "@SPICY_MIKE", "•", "PASTA POINT", "•", "@SWEET_TOOTH", "•",
    "NOODLE HOUSE", "•", "@CHEF_DAN", "•", "TACO LAB", "•", "@VEGAN_VIBES"
  ];

  const comparisonRows = [
    {
      label: "Cost Structure",
      us: "Lower cost, no heavy retainers",
      them: "High fees + retainers",
      type: "text"
    },
    {
      label: "Creator Matching",
      us: "AI-matched creators based on audience + cuisine fit",
      them: "Manual outreach and limited inventory",
      type: "text"
    },
    {
      label: "Time to Launch",
      us: "Launch in days, not weeks",
      them: "Often weeks to activate",
      type: "boolean"
    },
    {
      label: "Performance Predictability",
      us: "Data-led targeting and performance scoring",
      them: "Results depend on intuition",
      type: "boolean"
    },
    {
      label: "Content Volume",
      us: "Flexible creator bundles for consistent content",
      them: "Volume limited by budget and ops",
      type: "boolean"
    },
    {
      label: "Campaign Focus",
      us: "Maximum local visibility & brand awareness",
      them: "Basic reporting, slow iteration",
      type: "boolean"
    }
  ];

  const steps = [
    {
      id: 0,
      ref: step1Ref,
      icon: <PenTool className="w-6 h-6" />,
      title: "Apply for Access",
      desc: "Submit your restaurant profile. Our system analyzes your cuisine, aesthetic, and brand potential to identify high-value creator matches."
    },
    {
      id: 1,
      ref: step2Ref,
      icon: <UserCheck className="w-6 h-6" />,
      title: "Your Perfect Match",
      desc: "We don't send you a confusing list. You receive one hand-picked, verified creator perfectly suited to your vibe and audience.",
    },
    {
      id: 2,
      ref: step3Ref,
      icon: <Rocket className="w-6 h-6" />,
      title: "Launch Campaign",
      desc: "Approve the match and watch the content go live. It's like a digital billboard that brings hungry Londoners to your door."
    }
  ];

  const pricingPlans = [
    {
      name: "Growth",
      price: "£150",
      period: "one-time",
      desc: "Like a digital billboard. Build massive local awareness.",
      features: ["1 Active Campaign", "High-Engagement Creator Matching", "Targeted Local Brand Exposure", "Priority Support", "Content Usage Rights"],
      cta: "Get Started",
      highlight: true
    }
  ];

  // Specific videos supplied by the user (pointing to public/videos folder)
  const videosCol1 = [
    "/videos/17924651418080864.mp4", 
    "/videos/18344778568087988.mp4", 
    "/videos/18008922199997917.mp4"
  ];
  const videosCol2 = [
    "/videos/18027955274047884.mp4", 
    "/videos/17923831958794584.mp4", 
    "/videos/18083270314440142.mp4"
  ];
  const videosCol3 = [
    "/videos/17920884488886022.mp4", 
    "/videos/17945075096856204.mp4", 
    "/videos/18237497851209909.mp4"
  ];
  const videosCol4 = [
    "/videos/17956042109947683.mp4", 
    "/videos/17924651418080864.mp4", // Recycling first video to fill 4th column
    "/videos/18344778568087988.mp4"  // Recycling second video to fill 4th column
  ];

  // Google Form embed URL - replace this with your form's embed URL
  const RESTAURANT_FORM_EMBED_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSc4myUErfHFoUEz2Kxb-3bYwf3f6ErjE5ZVIeVrUhkd6osgcA/viewform?embedded=true'; // e.g. https://docs.google.com/forms/d/e/FORM_ID/viewform?embedded=true
  // Creator form embed URL (replace with your creator form)
  const CREATOR_FORM_EMBED_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSeKBeJP5-BUnL7VwV9C0pBpCppfi4cQWi3aI4dsO7PfaujB0w/viewform?embedded=true';

  // OPTIMIZED VIDEO CARD COMPONENT
  // Handles play/pause logic based on visibility to save resources
  const VideoCard = ({ videoSrc, isVisible }) => {
    const videoRef = useRef(null);

    useEffect(() => {
      if (!videoRef.current) return;

      if (isVisible) {
        // Try to play, handle potential promise errors silently
        const playPromise = videoRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => {});
        }
      } else {
        videoRef.current.pause();
      }
    }, [isVisible]);

    return (
      <div className="relative w-full aspect-[9/16] rounded-2xl overflow-hidden border border-white/10 shadow-lg bg-white/5 transform transition-transform hover:scale-[1.02]">
        <video 
          ref={videoRef}
          src={videoSrc} 
          className="w-full h-full object-cover"
          muted 
          loop 
          playsInline
          preload="none" // Important for initial load speed
        />
      </div>
    );
  };

  const VideoColumn = ({ videos, direction, speed, isVisible }) => (
    <div className="relative h-[400px] md:h-[600px] w-full overflow-hidden">
      <div 
        className={`absolute w-full flex flex-col gap-4 ${direction === 'up' ? 'animate-marquee-up' : 'animate-marquee-down'}`}
        style={{ 
          animationDuration: `${speed}s`,
          willChange: 'transform' // GPU Acceleration Hint
        }}
      >
        {/* Triple the videos to create seamless loop for smoother effect */}
        {[...videos, ...videos, ...videos].map((video, idx) => (
          <VideoCard key={idx} videoSrc={video} isVisible={isVisible} />
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-cyan-500 selection:text-black overflow-x-hidden w-full max-w-[100vw]">
      
      {/* Abstract Background Glows */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-purple-900/30 rounded-full blur-[80px] md:blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-cyan-900/20 rounded-full blur-[80px] md:blur-[120px] animate-pulse delay-1000"></div>
      </div>

      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 border-b border-white/5 ${scrolled ? 'bg-black/80 backdrop-blur-md py-4' : 'bg-transparent py-4 md:py-6'}`}>
        <div className="max-w-7xl mx-auto px-4 md:px-6 flex justify-between items-center relative">
          
          {/* Left: Logo */}
          <div className="flex items-center z-20">
            <Logo />
          </div>

          {/* Center: Links (Desktop) - Absolutely Positioned for true center */}
          <div className="hidden md:flex items-center space-x-8 absolute left-1/2 transform -translate-x-1/2">
            <a href="#how-it-works" className="text-sm text-gray-400 hover:text-white transition-colors">How it works</a>
            <a href="#pricing" className="text-sm text-gray-400 hover:text-white transition-colors">Pricing</a>
            <a href="#for-creators" className="text-sm text-gray-400 hover:text-white transition-colors">For creators</a>
          </div>

          {/* Right: Button & Mobile Toggle */}
          <div className="flex items-center space-x-4 z-20">
            {/* Desktop Button */}
            <div className="hidden md:block relative group rounded-full p-[1px] overflow-hidden cursor-pointer">
              <div className="absolute inset-[-100%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#000000_0%,#000000_50%,#06b6d4_100%)] opacity-100 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="relative z-10 bg-black rounded-full flex items-center">
                <button className="bg-black hover:bg-gray-900 px-6 py-2 rounded-full text-sm font-medium text-white transition-all backdrop-blur-sm">
                  Get Matched
                </button>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button className="md:hidden text-white p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-black/95 backdrop-blur-xl border-b border-white/10 py-8 px-6 flex flex-col space-y-6">
            <a href="#how-it-works" className="text-xl text-gray-300 font-medium" onClick={() => setIsMenuOpen(false)}>How it works</a>
            <a href="#pricing" className="text-xl text-gray-300 font-medium" onClick={() => setIsMenuOpen(false)}>Pricing</a>
            <a href="#for-creators" className="text-xl text-gray-300 font-medium" onClick={() => setIsMenuOpen(false)}>For creators</a>
            <div className="pt-4 flex flex-col space-y-3">
              <button className="w-full bg-gradient-to-r from-cyan-500 to-cyan-600 text-black py-4 rounded-xl font-bold text-lg">Get Matched</button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section ref={heroRef} className="relative pt-24 md:pt-32 pb-12 md:pb-20 px-4 md:px-6">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-6 md:mb-8 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
            <span className="text-[10px] md:text-xs font-medium tracking-wide text-gray-300">NOW ONBOARDING RESTAURANTS</span>
          </div>
          
          <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold mb-6 leading-tight">
            We match restaurants with <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400">food creators</span> <br className="hidden md:block" />
            for <span className="relative inline-block">
              local visibility
              <svg className="absolute w-full h-2 md:h-3 -bottom-1 left-0 text-purple-500 opacity-60" viewBox="0 0 100 10" preserveAspectRatio="none">
                <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="2" fill="none" />
              </svg>
            </span>
          </h1>

          <p className="text-base md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            The first premium marketplace bridging high-end dining with verified content creators. 
            Experience the future of culinary marketing.
          </p>

          {/* Unified Button Group with Animated Ring */}
          <div className="flex justify-center mb-16 md:mb-24">
            <div className="relative group rounded-2xl p-[1px] overflow-hidden shadow-2xl shadow-cyan-900/20 max-w-full">
              {/* Spinning animated ring */}
              <div className="absolute inset-[-100%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#000000_0%,#000000_50%,#06b6d4_100%)] opacity-100 transition-opacity duration-300 group-hover:opacity-100" />
              
              {/* Inner container */}
              <div className="relative z-10 bg-black rounded-2xl flex flex-col sm:flex-row items-center p-1">
                {/* Filled Button (opens Restaurant form modal) */}
                <button
                  onClick={() => { setModalType('restaurant'); setModalOpen(true); }}
                  className="w-full sm:w-auto px-6 md:px-8 py-3 rounded-xl bg-white text-black font-bold text-base md:text-lg hover:bg-gray-200 transition-colors flex items-center justify-center gap-2 mb-1 sm:mb-0"
                >
                   <Camera className="w-5 h-5 text-black" />
                   I'm a Restaurant
                </button>
                {/* Unfilled/Transparent Button (opens Creator form modal) */}
                <button
                  onClick={() => { setModalType('creator'); setModalOpen(true); }}
                  className="w-full sm:w-auto px-6 md:px-8 py-3 rounded-xl bg-transparent text-white font-bold text-base md:text-lg hover:bg-white/10 transition-colors flex items-center justify-center sm:ml-1"
                >
                  I'm a Creator <ArrowRight className="ml-2 w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* VIDEO MARQUEE WALL */}
          <div className="relative w-full max-w-[1400px] mx-auto h-[400px] md:h-[600px] overflow-hidden mb-12 md:mb-20">
             {/* Fade Overlays */}
             <div className="absolute top-0 left-0 w-full h-20 md:h-32 bg-gradient-to-b from-black via-black/80 to-transparent z-10 pointer-events-none"></div>
             <div className="absolute bottom-0 left-0 w-full h-20 md:h-32 bg-gradient-to-t from-black via-black/80 to-transparent z-10 pointer-events-none"></div>
             
             <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 px-2 md:px-4 h-full">
                <VideoColumn videos={videosCol1} direction="up" speed={35} isVisible={isHeroVisible} />
                <VideoColumn videos={videosCol2} direction="down" speed={40} isVisible={isHeroVisible} />
                <div className="hidden md:block"><VideoColumn videos={videosCol3} direction="up" speed={38} isVisible={isHeroVisible} /></div>
                <div className="hidden md:block"><VideoColumn videos={videosCol4} direction="down" speed={42} isVisible={isHeroVisible} /></div>
             </div>
          </div>

        </div>
      </section>

      {/* Apply Section - kept as fallback (hidden) */}
      <section id="apply" className="max-w-4xl mx-auto px-4 py-12 hidden">
        <h2 className="text-2xl font-bold mb-4 text-center">Apply for Access</h2>
        <div className="w-full bg-black/60 rounded-lg p-4">
          <iframe
            src={RESTAURANT_FORM_EMBED_URL}
            width="100%"
            height="800"
            frameBorder="0"
            marginHeight="0"
            marginWidth="0"
            title="Apply Form"
            className="w-full h-[800px] rounded-md"
          >
            Loading…
          </iframe>
        </div>
      </section>

      {/* Modal for embedding forms (opened by hero buttons) */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/70" onClick={() => setModalOpen(false)} />
          <div className="relative z-50 max-w-5xl w-full mx-4 md:mx-0">
            <div className="bg-black rounded-2xl border border-white/10 overflow-hidden">
              <div className="flex items-center justify-between p-4 border-b border-white/5">
                <div className="text-white font-bold">
                  {modalType === 'restaurant' ? 'Restaurant Application' : 'Creator Application'}
                </div>
                <button
                  className="text-gray-300 hover:text-white p-2"
                  onClick={() => setModalOpen(false)}
                  aria-label="Close form"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-4">
                <iframe
                  src={modalType === 'restaurant' ? RESTAURANT_FORM_EMBED_URL : CREATOR_FORM_EMBED_URL}
                  title={modalType === 'restaurant' ? 'Restaurant Form' : 'Creator Form'}
                  className="w-full h-[78vh] rounded-md"
                  frameBorder="0"
                  marginHeight="0"
                  marginWidth="0"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Infinite Scrolling Ticker (Bottom/Mid Section) */}
      <div className="relative py-6 md:py-8 bg-black border-y border-white/10 overflow-hidden">
        <div className="absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-black to-transparent z-10"></div>
        <div className="absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l from-black to-transparent z-10"></div>
        
        <div className="flex whitespace-nowrap">
          {/* Double the list for seamless looping */}
          {[...tickerItems, ...tickerItems, ...tickerItems].map((item, i) => (
            <div 
              key={i} 
              className="animate-scroll inline-block text-xl md:text-2xl lg:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-600 mx-4 md:mx-8 uppercase tracking-widest opacity-50 hover:opacity-100 transition-opacity cursor-default select-none"
              style={{
                animationDuration: '40s',
                animationTimingFunction: 'linear',
                animationIterationCount: 'infinite',
                transform: 'translate3d(0,0,0)' // Hardware accel
              }}
            >
              {item}
            </div>
          ))}
        </div>
      </div>

      {/* NEW: How It Works Section (Sticky Steps) */}
      <section id="how-it-works" className="py-16 md:py-24 px-4 md:px-6 bg-white relative">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">
           
           {/* LEFT COLUMN: Sticky Visual (Hidden on mobile for better UX) */}
           <div className="hidden lg:block sticky top-32">
              <div className="relative w-full aspect-[4/3] bg-gray-100 rounded-[28px] overflow-hidden shadow-2xl">
                 {/* Updated Image: Creator taking food photo */}
                 <div className="absolute inset-0">
                    <img 
                      src="https://images.unsplash.com/photo-1600093463592-8e36ae95ef56?w=800&q=80" 
                      alt="Creator capturing food" 
                      className="w-full h-full object-cover opacity-90"
                    />
                 </div>

                 {/* Glow Effect */}
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[420px] bg-[radial-gradient(circle,rgba(6,182,212,0.35)_0%,rgba(0,0,0,0)_70%)] blur-[40px] pointer-events-none"></div>

                 {/* Pill Callout */}
                 <div className={`absolute top-[10%] right-[10%] bg-cyan-400 text-black text-sm font-bold px-4 py-2 rounded-full shadow-lg transition-all duration-500 z-20 ${activeStep === 1 ? 'scale-110 opacity-100' : 'scale-90 opacity-0'}`}>
                    Match Found!
                 </div>

                 {/* ANIMATED FLOATING CARD */}
                 <div 
                   className={`absolute bottom-[10%] left-[10%] w-[65%] bg-white rounded-[20px] shadow-2xl p-5 transition-all duration-700 border border-gray-100 overflow-hidden ${activeStep === 0 ? 'translate-y-0' : activeStep === 1 ? 'translate-y-[-10px]' : 'translate-y-0'}`}
                   style={{
                      animation: 'float 6s ease-in-out infinite'
                   }}
                 >
                    {/* DYNAMIC CONTENT SWITCHER */}
                    
                    {/* State 0: Connect / Analyzing */}
                    <div className={`transition-all duration-500 absolute inset-0 p-5 flex flex-col justify-center ${activeStep === 0 ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10 pointer-events-none'}`}>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-cyan-100 rounded-full flex items-center justify-center flex-shrink-0">
                                <Brain className="w-5 h-5 text-cyan-600 animate-pulse" />
                            </div>
                            <div>
                                <div className="text-sm font-bold text-gray-900">Analyzing Vibe</div>
                                <div className="text-xs text-gray-500">Processing cuisine type...</div>
                            </div>
                        </div>
                        <div className="space-y-3">
                            <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                                <div className="h-full bg-cyan-400 w-2/3 animate-[shimmer_2s_infinite]"></div>
                            </div>
                            <div className="h-2 w-3/4 bg-gray-100 rounded-full overflow-hidden">
                                <div className="h-full bg-purple-400 w-1/2 animate-[shimmer_2s_infinite_delay-75ms]"></div>
                            </div>
                        </div>
                    </div>

                    {/* State 1: Match Found */}
                    <div className={`transition-all duration-500 absolute inset-0 p-5 flex flex-col justify-center ${activeStep === 1 ? 'opacity-100 translate-x-0' : activeStep < 1 ? 'opacity-0 translate-x-10 pointer-events-none' : 'opacity-0 -translate-x-10 pointer-events-none'}`}>
                         <div className="flex items-center justify-between mb-6">
                             <div className="flex items-center gap-3">
                                 <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden border-2 border-cyan-400">
                                     <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100" alt="Creator" />
                                 </div>
                                 <div>
                                     <div className="text-sm font-bold text-gray-900">@Foodie_Jane</div>
                                     <div className="text-xs text-green-600 flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> Verified</div>
                                 </div>
                             </div>
                             <div className="text-xs font-bold bg-cyan-50 text-cyan-700 px-3 py-1.5 rounded-lg">98% Match</div>
                         </div>
                         <div className="flex gap-3">
                             <div className="flex-1 bg-gray-50 rounded-xl p-3 text-center">
                                 <div className="text-xs text-gray-400 mb-1">Reach</div>
                                 <div className="text-sm font-bold">45K</div>
                             </div>
                             <div className="flex-1 bg-gray-50 rounded-xl p-3 text-center">
                                 <div className="text-xs text-gray-400 mb-1">Eng</div>
                                 <div className="text-sm font-bold">4.8%</div>
                             </div>
                         </div>
                    </div>

                    {/* State 2: Launch / Results */}
                    <div className={`transition-all duration-500 absolute inset-0 p-5 flex flex-col justify-center ${activeStep === 2 ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10 pointer-events-none'}`}>
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                                <BarChart3 className="w-5 h-5 text-purple-600" />
                            </div>
                            <div>
                                <div className="text-sm font-bold text-gray-900">Campaign Live</div>
                                <div className="text-xs text-green-500 font-medium">+124 Reservations</div>
                            </div>
                        </div>
                        <div className="flex items-end gap-1 h-12">
                            <div className="w-1/5 bg-cyan-200 rounded-t-sm h-[30%]"></div>
                            <div className="w-1/5 bg-cyan-300 rounded-t-sm h-[50%]"></div>
                            <div className="w-1/5 bg-cyan-400 rounded-t-sm h-[40%]"></div>
                            <div className="w-1/5 bg-cyan-500 rounded-t-sm h-[70%]"></div>
                            <div className="w-1/5 bg-purple-500 rounded-t-sm h-[90%] animate-pulse"></div>
                        </div>
                    </div>
                    
                    {/* Placeholder div to maintain height for absolute children */}
                    <div className="opacity-0 pointer-events-none">
                         <div className="h-10 w-10 mb-4"></div>
                         <div className="h-12 w-full"></div>
                    </div>

                 </div>
              </div>
           </div>

           {/* RIGHT COLUMN: Scroll Steps */}
           <div className="relative pt-0 lg:pt-0">
              {/* Progress Rail */}
              <div className="absolute left-[22px] top-16 bottom-16 w-[3px] bg-gray-200 hidden lg:block">
                 <div 
                   className="absolute top-0 w-full bg-black transition-all duration-500 ease-out"
                   style={{ 
                     height: `${activeStep === 0 ? '33%' : activeStep === 1 ? '66%' : '100%'}`,
                     opacity: 1
                   }}
                 ></div>
              </div>

              <div className="space-y-12 md:space-y-32">
                 {steps.map((step, idx) => (
                    <div 
                      key={step.id} 
                      ref={step.ref}
                      className={`flex flex-col md:flex-row items-start gap-4 md:gap-6 transition-opacity duration-500 ${activeStep === idx ? 'opacity-100' : 'opacity-100 md:opacity-60'}`}
                    >
                       <div className={`relative z-10 flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center transition-colors duration-300 ${activeStep === idx ? 'bg-cyan-400 text-black shadow-lg shadow-cyan-400/30' : 'bg-gray-100 text-gray-900 border border-gray-200'}`}>
                          {step.icon}
                       </div>
                       <div className="pt-1">
                          <h3 className={`text-xl md:text-3xl font-bold mb-3 transition-colors ${activeStep === idx ? 'text-black' : 'text-gray-900'}`}>
                            {step.title}
                          </h3>
                          <p className="text-gray-500 text-base md:text-lg leading-relaxed max-w-md">
                            {step.desc}
                          </p>
                       </div>
                    </div>
                 ))}
              </div>
           </div>

        </div>
      </section>

      {/* NEW: Pricing Section */}
      <section id="pricing" className="py-16 md:py-24 px-4 md:px-6 bg-black relative">
         {/* Background Dynamic Glow/Mesh */}
         <div className="absolute inset-0 pointer-events-none overflow-hidden">
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] md:w-[800px] h-[500px] md:h-[800px] bg-gradient-to-tr from-cyan-900/10 via-purple-900/10 to-transparent rounded-full blur-3xl animate-[pulse_8s_infinite]"></div>
         </div>

         <div className="max-w-7xl mx-auto relative z-10">
            <div className="text-center mb-12 md:mb-16">
               <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Simple, Transparent Pricing</h2>
               <p className="text-gray-400 max-w-xl mx-auto text-sm md:text-base">Choose the perfect plan to ignite your restaurant's social presence.</p>
            </div>

            <div className="max-w-md mx-auto">
               {pricingPlans.map((plan, idx) => (
                  <div 
                    key={idx} 
                    className={`relative rounded-3xl p-6 md:p-8 flex flex-col h-full bg-white/[0.03] border border-white/10 group transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(34,211,238,0.15)]`}
                  >
                     {/* Highlight Border Beam for Growth Plan - slightly intensified */}
                     {plan.highlight && (
                        <div className="absolute inset-[-1px] rounded-3xl overflow-hidden pointer-events-none z-0">
                           <div className="absolute inset-[-100%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#000000_0%,#000000_50%,#06b6d4_100%)] opacity-100"></div>
                        </div>
                     )}
                     
                     {/* Card Content */}
                     <div className={`relative z-10 h-full flex flex-col ${plan.highlight ? 'bg-black rounded-[23px] -m-[1px] p-6 md:p-8' : ''}`}>
                        <div className="mb-6 text-center">
                           <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                           <div className="flex items-baseline justify-center gap-1">
                              <span className="text-5xl font-black text-white">{plan.price}</span>
                              {plan.period && <span className="text-gray-500">{plan.period}</span>}
                           </div>
                           <p className="text-sm text-gray-400 mt-4">{plan.desc}</p>
                        </div>
                        
                        <div className="flex-grow mb-8 space-y-4">
                           {plan.features.map((feature, fIdx) => (
                              <div key={fIdx} className="flex items-center gap-3 text-sm text-gray-300">
                                 <Check className={`w-5 h-5 flex-shrink-0 ${plan.highlight ? 'text-cyan-400' : 'text-gray-500'}`} />
                                 {feature}
                              </div>
                           ))}
                        </div>

                        <button className={`w-full py-4 rounded-xl font-bold text-lg transition-all ${plan.highlight ? 'bg-cyan-400 text-black hover:bg-cyan-300' : 'bg-white/10 text-white hover:bg-white/20'}`}>
                           {plan.cta}
                        </button>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </section>

      {/* US VS THEM COMPARISON SECTION */}
      <section className="py-16 md:py-24 px-4 md:px-6 bg-[#050505] relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-900/10 rounded-full blur-[120px] pointer-events-none z-0"></div>

        <div className="max-w-7xl mx-auto relative z-10">
            <div className="text-center mb-12 md:mb-16">
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">AI Creator Matching for Restaurants</h2>
                <p className="text-sm md:text-lg text-gray-500 max-w-2xl mx-auto">
                    A side-by-side comparison of our AI-powered creator marketplace vs traditional influencer marketing agencies.
                </p>
                {/* Mobile Scroll Hint */}
                <div className="md:hidden text-center text-xs text-cyan-500/70 mt-6 animate-pulse font-medium tracking-wide">
                    ← SWIPE TO COMPARE →
                </div>
            </div>

            <div className="overflow-x-auto pb-8 -mx-4 px-4 md:mx-0 md:px-0 md:overflow-visible">
                <div className="min-w-[750px] md:min-w-0 grid grid-cols-[1.2fr_1.4fr_1.2fr] gap-0 items-stretch">
                    
                    {/* COLUMN 1: LABELS */}
                    <div className="flex flex-col py-8 pr-4">
                        <div className="h-16 flex items-center text-sm md:text-lg font-semibold text-white mb-6 pl-2 md:pl-4">Influencer Marketing</div>
                        {comparisonRows.map((row, i) => (
                            <div key={i} className="h-24 flex items-center px-2 md:px-4 text-gray-400 font-medium text-xs md:text-base border-b border-white/10">
                                {row.label}
                            </div>
                        ))}
                    </div>

                    {/* COLUMN 2: TABLECREATOR */}
                    <div className="relative flex flex-col -my-4 z-20">
                        <div className="absolute inset-0 bg-[#0A0A0A] rounded-[32px] border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.6)] overflow-hidden">
                             <div className="absolute top-0 inset-x-0 h-64 bg-[radial-gradient(circle_at_50%_0%,rgba(6,182,212,0.15),transparent_70%)]"></div>
                             <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-cyan-900/10 to-transparent"></div>
                        </div>

                        <div className="relative py-12 px-2 flex flex-col h-full">
                            <div className="h-16 flex items-center justify-center gap-3 mb-6">
                                <Logo />
                            </div>

                            {comparisonRows.map((row, i) => (
                                <div key={i} className="h-24 flex items-center justify-center text-center px-2 md:px-4 border-b border-white/5 last:border-0">
                                    {row.type === 'boolean' ? (
                                        <div className="flex items-center gap-2 md:gap-3">
                                            <div className="flex-shrink-0 w-5 h-5 md:w-6 md:h-6 rounded-full bg-green-500/20 flex items-center justify-center">
                                                <Check className="w-3 h-3 md:w-4 md:h-4 text-green-400" />
                                            </div>
                                            <span className="text-gray-200 font-medium text-xs md:text-base">{row.us}</span>
                                        </div>
                                    ) : (
                                        <div className="flex items-center gap-2 md:gap-3">
                                            <span className="text-gray-200 font-medium text-xs md:text-base">{row.us}</span>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* COLUMN 3: TRADITIONAL AGENCIES */}
                    <div className="flex flex-col py-8 pl-4">
                        <div className="h-16 flex flex-col justify-center mb-6 pl-4">
                            <div className="text-sm md:text-lg font-semibold text-white">Traditional Agencies</div>
                            <div className="text-xs md:text-sm text-gray-500">Manual sourcing.</div>
                        </div>
                        {comparisonRows.map((row, i) => (
                            <div key={i} className="h-24 flex items-center px-4 border-b border-white/10">
                                {row.type === 'boolean' ? (
                                    <div className="flex items-center gap-2 md:gap-3 opacity-70">
                                        <XCircle className="w-4 h-4 md:w-5 md:h-5 text-red-500 flex-shrink-0" />
                                        <span className="text-gray-500 text-xs md:text-base">{row.them}</span>
                                    </div>
                                ) : (
                                    <span className="text-gray-500 text-xs md:text-base">{row.them}</span>
                                )}
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </div>
      </section>

      {/* NEW: For Creators Section */}
      <section 
        id="for-creators" 
        className="py-16 md:py-24 px-4 md:px-6 bg-black relative border-t border-white/10 overflow-hidden" 
        ref={creatorsRef}
        onMouseMove={handleMouseMove}
      >
        <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16 relative z-10">
               <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-purple-900/20 border border-purple-500/20 mb-6 backdrop-blur-sm">
                 <Star className="w-4 h-4 text-purple-400 fill-current" />
                 <span className="text-xs font-bold tracking-wide text-purple-400 uppercase">For Creators</span>
               </div>
               <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white">
                 Get invited to eat at <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 animate-gradient-x bg-[length:200%_auto]">London's</span> best restaurants.
               </h2>
               <p className="text-gray-400 max-w-2xl mx-auto text-base md:text-lg">
                 Join our exclusive network of food content creators. No fees, just incredible food and great content opportunities.
               </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 relative group">
              {/* SPOTLIGHT BACKGROUND EFFECT */}
              {/* This is a single shared glow that follows the mouse across the grid container */}
              <div 
                className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"
                style={{
                  background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(168, 85, 247, 0.15), transparent 40%)`
                }}
              />

              {creatorSteps.map((step, idx) => (
                <div key={idx} className="relative p-8 rounded-3xl bg-white/5 border border-white/10 overflow-hidden group/card hover:bg-white/[0.08] transition-colors duration-300">
                  {/* Per-card individual spotlight glow on hover */}
                  <div 
                    className="absolute inset-0 opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{
                        background: `radial-gradient(400px circle at ${mousePosition.x - (idx * 400)}px ${mousePosition.y}px, rgba(168, 85, 247, 0.1), transparent 40%)`
                        // Note: Simple offset calculation for demo. For production, per-card ref is better.
                        // Falling back to simple hover effect for robustness in this single-file setup:
                    }}
                  ></div>
                  
                  <div className="absolute top-0 right-0 p-6 opacity-10 text-6xl font-black text-white select-none">{step.step}</div>
                  <div className="mb-6 p-4 rounded-2xl bg-black/50 w-fit group-hover/card:scale-110 transition-transform duration-300 ring-1 ring-white/10 relative z-10">
                    {step.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-4 relative z-10">{step.title}</h3>
                  <p className="text-gray-400 leading-relaxed group-hover/card:text-gray-300 relative z-10">
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>

             <div className="mt-16 text-center">
                <button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400 text-white font-bold px-10 py-4 rounded-full transition-all transform hover:scale-105 shadow-[0_0_20px_rgba(168,85,247,0.4)]">
                    Apply to Join Network
                </button>
            </div>
        </div>
      </section>

      {/* Bottom CTA / App Store Links */}
      <section className="relative py-24 md:py-32 px-4 md:px-6 overflow-hidden">
         {/* Background accent */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-64 bg-gradient-to-t from-cyan-900/20 to-transparent blur-3xl pointer-events-none"></div>
        
        <div className="relative max-w-4xl mx-auto text-center z-10">
          <h2 className="text-3xl md:text-5xl font-bold mb-8 text-white">Stop Being London's <br /> Best Kept Secret.</h2>
          <p className="text-gray-400 mb-10 max-w-2xl mx-auto text-lg md:text-xl leading-relaxed">
            We turn your dishes into the content London is craving. Think of it as a digital billboard that converts attention into reservations. We bring the hungry crowds. You better warn the kitchen.
          </p>
          
          {/* Buttons removed */}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-black pt-16 pb-8 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <Logo />
          </div>
          <div className="flex space-x-8 text-sm text-gray-600">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            {/* Contact link removed */}
          </div>
        </div>
        <div className="text-center mt-12 text-xs text-gray-800">
          © 2025 EDEAT LTD. All rights reserved.
        </div>
      </footer>

      <style>{`
        body { background-color: #000000; overflow-x: hidden; }
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); } /* Move half since we duplicated content */
        }
        .animate-scroll {
          animation: scroll 40s linear infinite;
        }
        @keyframes marquee-up {
          0% { transform: translateY(0); }
          100% { transform: translateY(-50%); }
        }
        .animate-marquee-up {
          animation: marquee-up linear infinite;
        }
        @keyframes marquee-down {
          0% { transform: translateY(-50%); }
          100% { transform: translateY(0); }
        }
        .animate-marquee-down {
          animation: marquee-down linear infinite;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient-x {
          animation: gradient-x 8s ease infinite;
        }
      `}</style>
    </div>
  );
};

export default App;