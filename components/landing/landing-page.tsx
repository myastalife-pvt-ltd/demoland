"use client"
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { CheckCircle, Zap, ArrowRight, Menu, X, Beaker, Shield, Star, Heart, Sparkles, ChevronDown, Award, Leaf, Clock, Package } from 'lucide-react';

export default function NuvicaLandingPage() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState<{ [key: string]: boolean }>({});
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('[data-animate]');
    elements.forEach((el) => observerRef.current?.observe(el));

    return () => observerRef.current?.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-background font-sans text-foreground overflow-x-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-20 -left-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-blob" />
        <div className="absolute top-40 -right-20 w-96 h-96 bg-chart-2/10 rounded-full blur-3xl animate-blob animation-delay-2000" />
        <div className="absolute -bottom-20 left-1/2 w-96 h-96 bg-chart-3/10 rounded-full blur-3xl animate-blob animation-delay-4000" />
      </div>

      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrollY > 50 ? 'bg-background/95 backdrop-blur-xl shadow-lg border-b border-border' : 'bg-transparent'
      }`}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 sm:h-20 items-center justify-between">
            <div className="flex items-center gap-2 sm:gap-3 group cursor-pointer">
              <div className="relative">
                <div className="absolute inset-0 bg-primary/20 rounded-full blur-md group-hover:blur-lg transition-all" />
                <div className="relative h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-gradient-to-br from-primary to-chart-2 flex items-center justify-center transform group-hover:scale-110 transition-transform">
                  <span className="text-white font-bold text-base sm:text-lg">N</span>
                </div>
              </div>
              <span className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-primary to-chart-2 bg-clip-text text-transparent">
                Nuvica
              </span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8 text-sm font-medium">
              <a href="#benefits" className="hover:text-primary transition-colors relative group">
                Benefits
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
              </a>
              <a href="#science" className="hover:text-primary transition-colors relative group">
                Science
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
              </a>
              <a href="#ingredients" className="hover:text-primary transition-colors relative group">
                Ingredients
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
              </a>
              <a href="#testimonials" className="hover:text-primary transition-colors relative group">
                Reviews
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
              </a>
              <button 
                onClick={() => router.push('/track-order')}
                className="relative group overflow-hidden rounded-full border-2 border-primary/30 bg-transparent hover:bg-primary/10 px-5 py-2 text-foreground font-semibold transition-all"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <Package size={16} />
                  Track Order
                </span>
              </button>
              <button 
                onClick={() => router.push('/product')}
                className="relative group overflow-hidden rounded-full bg-gradient-to-r from-primary to-chart-2 px-6 py-2.5 text-white font-semibold"
              >
                <span className="relative z-10">Shop Now</span>
                <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-primary/10 transition-colors"
            >
              {isMenuOpen ? <X className="text-primary" size={24} /> : <Menu className="text-primary" size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-background/98 backdrop-blur-xl border-b border-border animate-slide-down">
            <div className="px-4 py-6 space-y-4">
              <a href="#benefits" className="block py-2 hover:text-primary transition-colors">Benefits</a>
              <a href="#science" className="block py-2 hover:text-primary transition-colors">Science</a>
              <a href="#ingredients" className="block py-2 hover:text-primary transition-colors">Ingredients</a>
              <a href="#testimonials" className="block py-2 hover:text-primary transition-colors">Reviews</a>
              <button 
                onClick={() => { setIsMenuOpen(false); router.push('/track-order'); }}
                className="w-full rounded-full border-2 border-primary/30 bg-transparent px-6 py-3 text-foreground font-semibold flex items-center justify-center gap-2"
              >
                <Package size={18} />
                Track Order
              </button>
              <button 
                onClick={() => { setIsMenuOpen(false); router.push('/product'); }}
                className="w-full rounded-full bg-gradient-to-r from-primary to-chart-2 px-6 py-3 text-white font-semibold"
              >
                Shop Now
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="mx-auto max-w-7xl w-full">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* Left Content */}
            <div className="text-center lg:text-left space-y-6 sm:space-y-8 animate-fade-in-up">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary/20 to-chart-2/20 border border-primary/30 backdrop-blur-sm">
                <Sparkles className="text-primary" size={16} />
                <span className="text-sm font-semibold bg-gradient-to-r from-primary to-chart-2 bg-clip-text text-transparent">
                  Next-Gen Cellular Wellness
                </span>
              </div>

              <div>
                <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-extrabold tracking-tight">
                  <span className="block text-foreground">AGE</span>
                  <span className="block bg-gradient-to-r from-primary via-chart-2 to-chart-3 bg-clip-text text-transparent animate-gradient">
                    400
                  </span>
                </h1>
                <p className="mt-4 text-xl sm:text-2xl font-medium text-muted-foreground italic">
                  "Smooth Today, Strong Tomorrow"
                </p>
              </div>

              <p className="text-base sm:text-lg leading-relaxed text-muted-foreground max-w-xl mx-auto lg:mx-0">
                Unlock the power of cellular longevity with our advanced formula featuring premium berry antioxidants and green apple extracts. 
                Designed for those who refuse to compromise on their future vitality.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <button 
                  onClick={() => router.push('/product')}
                  className="group relative w-full sm:w-auto overflow-hidden rounded-full bg-gradient-to-r from-primary to-chart-2 px-8 py-4 text-lg font-bold text-white shadow-2xl shadow-primary/30 hover:shadow-primary/50 hover:-translate-y-1 transition-all"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    Order Your Pack 
                    <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-chart-2 to-primary transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                </button>
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50 backdrop-blur-sm">
                  <Award className="text-primary" size={18} />
                  <span className="text-sm font-semibold text-foreground">20 × 2000mg Premium Servings</span>
                </div>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 pt-4">
                {[
                  { icon: <Shield size={20} />, text: "100% Safe" },
                  { icon: <Leaf size={20} />, text: "Natural Ingredients" },
                  { icon: <Award size={20} />, text: "Lab Tested" }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-muted-foreground">
                    <div className="text-primary">{item.icon}</div>
                    <span className="text-sm font-medium">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Image */}
            <div className="relative lg:h-[600px] flex items-center justify-center">
              <div 
                className="absolute inset-0 bg-gradient-to-br from-primary/30 via-chart-2/20 to-chart-3/30 blur-3xl rounded-full transform scale-75"
                style={{
                  transform: `translateY(${scrollY * 0.1}px) scale(0.75)`,
                }}
              />
              <div className="relative w-full max-w-md animate-float">
                <img 
                 src="/nuvica.jpeg" 
                  alt="Nuvica AGE 400 Packaging" 
                  className="rounded-3xl drop-shadow-2xl relative z-10"
                />
                {/* Floating Elements */}
                <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-xl animate-bounce-slow">
                  <Star className="text-white" fill="white" size={28} />
                </div>
                <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-xl animate-bounce-slow animation-delay-1000">
                  <Heart className="text-white" fill="white" size={24} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronDown className="text-primary" size={32} />
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 sm:py-24 bg-gradient-to-b from-background to-secondary/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {[
              { value: "10K+", label: "Happy Customers", icon: <Heart /> },
              { value: "98%", label: "Satisfaction Rate", icon: <Star /> },
              { value: "20", label: "Premium Servings", icon: <Award /> },
              { value: "2000mg", label: "Per Serving", icon: <Zap /> }
            ].map((stat, i) => (
              <div 
                key={i}
                id={`stat-${i}`}
                data-animate
                className={`group relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-br from-white to-secondary border border-border p-6 sm:p-8 text-center hover:border-primary/50 transition-all hover:shadow-xl hover:-translate-y-2 ${
                  isVisible[`stat-${i}`] ? 'animate-scale-in' : 'opacity-0'
                }`}
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="absolute top-0 right-0 w-20 h-20 bg-primary/5 rounded-full -mr-10 -mt-10 group-hover:scale-150 transition-transform" />
                <div className="relative">
                  <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-primary/20 to-chart-2/20 mb-4 text-primary">
                    {stat.icon}
                  </div>
                  <div className="text-3xl sm:text-4xl lg:text-5xl font-extrabold bg-gradient-to-r from-primary to-chart-2 bg-clip-text text-transparent">
                    {stat.value}
                  </div>
                  <div className="mt-2 text-sm sm:text-base font-medium text-muted-foreground">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-16 sm:py-24 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div 
            id="benefits-header"
            data-animate
            className={`text-center mb-12 sm:mb-16 ${isVisible['benefits-header'] ? 'animate-fade-in-up' : 'opacity-0'}`}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              Why Choose AGE 400?
            </h2>
            <div className="mt-4 h-1.5 w-24 bg-gradient-to-r from-primary to-chart-2 mx-auto rounded-full" />
            <p className="mt-6 text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
              Experience the perfect blend of science and nature for optimal cellular wellness
            </p>
          </div>
          
          <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              { 
                icon: <Shield size={40} />, 
                title: "Cellular Protection", 
                desc: "Advanced antioxidants from premium berries help shield your cells from daily oxidative stress and environmental damage.",
                gradient: "from-blue-500 to-cyan-500"
              },
              { 
                icon: <Zap size={40} />, 
                title: "Vitality Boost", 
                desc: "Supports metabolic pathways with green apple extracts to keep your energy levels consistent and smooth throughout the day.",
                gradient: "from-purple-500 to-pink-500"
              },
              { 
                icon: <Beaker size={40} />, 
                title: "Pure Formulation", 
                desc: "Scientific precision in every 2000mg dose, utilizing high-bioavailability extracts for maximum absorption and effectiveness.",
                gradient: "from-emerald-500 to-teal-500"
              },
              { 
                icon: <Leaf size={40} />, 
                title: "Natural Ingredients", 
                desc: "100% natural, non-GMO ingredients sourced from premium fruits and botanicals with no artificial fillers or preservatives.",
                gradient: "from-green-500 to-lime-500"
              },
              { 
                icon: <Award size={40} />, 
                title: "Lab Certified", 
                desc: "Third-party tested and certified for purity, potency, and safety. Each batch meets the highest quality standards.",
                gradient: "from-orange-500 to-amber-500"
              },
              { 
                icon: <Clock size={40} />, 
                title: "Long-term Support", 
                desc: "Designed for daily use to support your wellness journey with cumulative benefits over time for sustained vitality.",
                gradient: "from-rose-500 to-red-500"
              }
            ].map((feature, i) => (
              <div 
                key={i}
                id={`benefit-${i}`}
                data-animate
                className={`group relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-br from-white to-secondary/50 p-6 sm:p-8 border border-border hover:border-primary/50 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 ${
                  isVisible[`benefit-${i}`] ? 'animate-fade-in-up' : 'opacity-0'
                }`}
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/5 to-transparent rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500" />
                
                <div className="relative">
                  <div className={`inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br ${feature.gradient} mb-6 text-white shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold mb-3 text-foreground">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">{feature.desc}</p>
                </div>

                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ingredients Section */}
      <section id="ingredients" className="py-16 sm:py-24 bg-gradient-to-b from-background to-secondary/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Image Grid */}
            <div 
              id="ingredients-images"
              data-animate
              className={`relative ${isVisible['ingredients-images'] ? 'animate-fade-in-left' : 'opacity-0'}`}
            >
              <div className="grid grid-cols-2 gap-4 sm:gap-6">
                <div className="aspect-square rounded-3xl bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center p-6 sm:p-8 hover:scale-105 transition-transform duration-300 shadow-xl">
                  <div className="relative w-full h-full flex items-center justify-center">
                    <div className="absolute inset-0 bg-blue-400/20 rounded-2xl blur-xl" />
                    {/* <span className="relative text-blue-900 font-bold text-center text-sm sm:text-base">🫐 Premium Berry Blend</span> */}
                     <img src="/124.webp" alt="" />
                  </div>
                </div>
                <div className="aspect-square rounded-3xl bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center p-6 sm:p-8 mt-8 hover:scale-105 transition-transform duration-300 shadow-xl">
                  <div className="relative w-full h-full flex items-center justify-center">
                    <div className="absolute inset-0 bg-green-400/20 rounded-2xl blur-xl" />
                    {/* <span className="relative text-green-900 font-bold text-center text-sm sm:text-base">🍏 Green Apple Extract</span> */}
                    <img src="130.webp" alt="" />
                  </div>
                </div>
                <div className="aspect-square rounded-3xl bg-gradient-to-br from-purple-100 to-purple-200 flex items-center justify-center p-6 sm:p-8 -mt-8 hover:scale-105 transition-transform duration-300 shadow-xl">
                  <div className="relative w-full h-full flex items-center justify-center">
                    <div className="absolute inset-0 bg-purple-400/20 rounded-2xl blur-xl" />
                    {/* <span className="relative text-purple-900 font-bold text-center text-sm sm:text-base">🍓 Antioxidant Complex</span> */}
                     <img src="/125.png" alt="" />
                  </div>
                </div>
                <div className="aspect-square rounded-3xl bg-gradient-to-br from-pink-100 to-pink-200 flex items-center justify-center p-6 sm:p-8 hover:scale-105 transition-transform duration-300 shadow-xl">
                  <div className="relative w-full h-full flex items-center justify-center">
                    <div className="absolute inset-0 bg-pink-400/20 rounded-2xl blur-xl" />
                    {/* <span className="relative text-pink-900 font-bold text-center text-sm sm:text-base">🌿 Botanical Extracts</span> */}
                     <img src="/129.webp" alt="" />
                  </div>
                </div>
              </div>
              
              {/* Floating Badge */}
              <div className="absolute -top-6 -right-6 bg-gradient-to-br from-primary to-chart-2 text-white px-6 py-3 rounded-full shadow-2xl font-bold text-sm sm:text-base animate-float">
                100% Natural
              </div>
            </div>

            {/* Content */}
            <div 
              id="ingredients-content"
              data-animate
              className={`space-y-6 sm:space-y-8 ${isVisible['ingredients-content'] ? 'animate-fade-in-right' : 'opacity-0'}`}
            >
              <div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
                  Inspired by Nature, <br/>
                  <span className="bg-gradient-to-r from-primary to-chart-2 bg-clip-text text-transparent">
                    Perfected by Science.
                  </span>
                </h2>
              </div>
              
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                Our formula combines the DNA-supporting properties of curated berry polyphenols 
                with the crisp, vital energy of green apple enzymes. Each ingredient is carefully selected 
                and tested to ensure maximum efficacy and bioavailability.
              </p>

              <div className="space-y-4">
                {[
                  { icon: <CheckCircle className="text-emerald-500" size={24} />, text: 'Non-GMO Certified Ingredients' },
                  { icon: <CheckCircle className="text-emerald-500" size={24} />, text: '100% Vegetarian Friendly' },
                  { icon: <CheckCircle className="text-emerald-500" size={24} />, text: 'No Artificial Fillers or Colors' },
                  { icon: <CheckCircle className="text-emerald-500" size={24} />, text: 'Advanced DNA Support Formula' },
                  { icon: <CheckCircle className="text-emerald-500" size={24} />, text: 'Third-Party Lab Tested' }
                ].map((item, i) => (
                  <div 
                    key={i} 
                    className="flex items-center gap-4 p-4 rounded-xl bg-white/50 backdrop-blur-sm border border-border/50 hover:border-primary/30 hover:bg-white transition-all group"
                  >
                    <div className="transform group-hover:scale-110 transition-transform">
                      {item.icon}
                    </div>
                    <span className="font-semibold text-foreground text-sm sm:text-base">{item.text}</span>
                  </div>
                ))}
              </div>

              <button className="group mt-6 rounded-full bg-gradient-to-r from-primary to-chart-2 px-8 py-4 text-white font-bold shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all flex items-center gap-2">
                Learn More About Ingredients
                <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="science" className="py-16 sm:py-24 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div 
            id="science-header"
            data-animate
            className={`text-center mb-12 sm:mb-16 ${isVisible['science-header'] ? 'animate-fade-in-up' : 'opacity-0'}`}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              How AGE 400 Works
            </h2>
            <div className="mt-4 h-1.5 w-24 bg-gradient-to-r from-primary to-chart-2 mx-auto rounded-full" />
            <p className="mt-6 text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
              A scientifically-backed approach to cellular wellness
            </p>
          </div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-chart-2 to-chart-3 hidden lg:block" />

            <div className="space-y-12 sm:space-y-16">
              {[
                {
                  step: "01",
                  title: "Cellular Absorption",
                  desc: "High-bioavailability formula ensures rapid absorption at the cellular level, delivering nutrients where they're needed most.",
                  icon: <Zap size={32} />,
                  color: "from-blue-500 to-cyan-500"
                },
                {
                  step: "02",
                  title: "Antioxidant Protection",
                  desc: "Premium berry polyphenols create a protective shield against oxidative stress and free radical damage.",
                  icon: <Shield size={32} />,
                  color: "from-purple-500 to-pink-500"
                },
                {
                  step: "03",
                  title: "Cellular Regeneration",
                  desc: "Green apple extracts support natural cellular renewal processes for sustained vitality and wellness.",
                  icon: <Sparkles size={32} />,
                  color: "from-emerald-500 to-teal-500"
                }
              ].map((item, i) => (
                <div 
                  key={i}
                  id={`science-${i}`}
                  data-animate
                  className={`relative ${isVisible[`science-${i}`] ? 'animate-fade-in-up' : 'opacity-0'}`}
                  style={{ animationDelay: `${i * 200}ms` }}
                >
                  <div className="grid lg:grid-cols-2 gap-8 items-center">
                    <div className={`${i % 2 === 0 ? 'lg:order-1' : 'lg:order-2'}`}>
                      <div className="relative group">
                        <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-10 rounded-3xl blur-xl group-hover:opacity-20 transition-opacity`} />
                        <div className="relative bg-white rounded-3xl p-8 sm:p-10 border border-border shadow-xl hover:shadow-2xl transition-all">
                          <div className="flex items-start gap-6">
                            <div className={`flex-shrink-0 w-16 h-16 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center text-white shadow-lg`}>
                              {item.icon}
                            </div>
                            <div className="flex-1">
                              <span className="text-sm font-bold bg-gradient-to-r from-primary to-chart-2 bg-clip-text text-transparent">
                                STEP {item.step}
                              </span>
                              <h3 className="text-2xl font-bold text-foreground mt-2 mb-3">{item.title}</h3>
                              <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className={`${i % 2 === 0 ? 'lg:order-2' : 'lg:order-1'} hidden lg:flex justify-center`}>
                      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-chart-2 flex items-center justify-center text-white font-bold text-2xl shadow-2xl ring-8 ring-background">
                        {i + 1}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-16 sm:py-24 bg-gradient-to-b from-background to-secondary/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div 
            id="testimonials-header"
            data-animate
            className={`text-center mb-12 sm:mb-16 ${isVisible['testimonials-header'] ? 'animate-fade-in-up' : 'opacity-0'}`}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              What Our Customers Say
            </h2>
            <div className="mt-4 h-1.5 w-24 bg-gradient-to-r from-primary to-chart-2 mx-auto rounded-full" />
          </div>

          <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                name: "Sarah Johnson",
                role: "Wellness Enthusiast",
                text: "AGE 400 has become an essential part of my daily routine. I feel more energized and my overall wellness has improved significantly!",
                rating: 5,
                avatar: "SJ"
              },
              {
                name: "Michael Chen",
                role: "Fitness Coach",
                text: "I recommend AGE 400 to all my clients. The natural ingredients and scientific backing make it a perfect addition to any wellness program.",
                rating: 5,
                avatar: "MC"
              },
              {
                name: "Emily Rodriguez",
                role: "Busy Professional",
                text: "Finally found a supplement that actually works! The smooth taste and sustained energy throughout the day are game-changers.",
                rating: 5,
                avatar: "ER"
              }
            ].map((testimonial, i) => (
              <div 
                key={i}
                id={`testimonial-${i}`}
                data-animate
                className={`group relative overflow-hidden rounded-3xl bg-white p-8 border border-border hover:border-primary/50 transition-all hover:shadow-2xl hover:-translate-y-2 ${
                  isVisible[`testimonial-${i}`] ? 'animate-fade-in-up' : 'opacity-0'
                }`}
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/5 to-transparent rounded-full -mr-16 -mt-16" />
                
                <div className="relative space-y-4">
                  <div className="flex gap-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="text-yellow-400" fill="currentColor" size={18} />
                    ))}
                  </div>
                  
                  <p className="text-muted-foreground leading-relaxed">"{testimonial.text}"</p>
                  
                  <div className="flex items-center gap-4 pt-4 border-t border-border/50">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-chart-2 flex items-center justify-center text-white font-bold">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <div className="font-bold text-foreground">{testimonial.name}</div>
                      <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-24 bg-gradient-to-br from-primary via-chart-2 to-chart-3 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
        
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-6">
            Ready to Transform Your Wellness?
          </h2>
          <p className="text-lg sm:text-xl mb-10 text-white/90">
            Join thousands of satisfied customers and experience the power of AGE 400 today.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <button 
              onClick={() => router.push('/product')}
              className="group relative overflow-hidden w-full sm:w-auto bg-white text-primary px-10 py-5 rounded-full font-bold text-lg shadow-2xl hover:shadow-white/30 hover:-translate-y-1 transition-all"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                Order Now
                <ArrowRight className="group-hover:translate-x-1 transition-transform" size={22} />
              </span>
            </button>
            {/* <div className="flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
              <Award className="text-white" size={20} />
              <span className="font-semibold">30-Day Money-Back Guarantee</span>
            </div> */}
          </div>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 text-center">
            {[
              { icon: <Shield />, text: "Secure Checkout" },
              { icon: <Zap />, text: "Fast Shipping" },
              { icon: <Award />, text: "Quality Guaranteed" }
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  {item.icon}
                </div>
                <span className="text-sm font-medium">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-background py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-chart-2 flex items-center justify-center">
                  <span className="text-white font-bold">N</span>
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-primary to-chart-2 bg-clip-text text-transparent">
                  Nuvica
                </span>
              </div>
              <p className="text-background/70 text-sm">
                Premium cellular wellness supplements for a healthier, stronger tomorrow.
              </p>
            </div>

            <div>
              <h4 className="font-bold mb-4">Quick Links</h4>
              <div className="space-y-2 text-sm">
                <a href="#benefits" className="block hover:text-primary transition-colors">Benefits</a>
                <a href="#science" className="block hover:text-primary transition-colors">Science</a>
                <a href="#ingredients" className="block hover:text-primary transition-colors">Ingredients</a>
                <a href="#testimonials" className="block hover:text-primary transition-colors">Reviews</a>
              </div>
            </div>

            <div>
              <h4 className="font-bold mb-4">Support</h4>
              <div className="space-y-2 text-sm">
                <a href="#" className="block hover:text-primary transition-colors">FAQ</a>
                <a href="#" className="block hover:text-primary transition-colors">Shipping</a>
                <a href="#" className="block hover:text-primary transition-colors">Returns</a>
                <a href="#" className="block hover:text-primary transition-colors">Contact Us</a>
              </div>
            </div>

            <div>
              <h4 className="font-bold mb-4">Legal</h4>
              <div className="space-y-2 text-sm">
                <a href="#" className="block hover:text-primary transition-colors">Privacy Policy</a>
                <a href="#" className="block hover:text-primary transition-colors">Terms of Service</a>
                <a href="#" className="block hover:text-primary transition-colors">Disclaimer</a>
              </div>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-background/20 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-background/60 text-sm">
              © 2026 Nuvica™ Wellness. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-background/60 hover:text-primary transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <a href="#" className="text-background/60 hover:text-primary transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
              </a>
              <a href="#" className="text-background/60 hover:text-primary transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/></svg>
              </a>
            </div>
          </div>
        </div>
      </footer>

      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes blob {
          0%, 100% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes slide-down {
          from { transform: translateY(-100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes fade-in-up {
          from { transform: translateY(30px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes fade-in-left {
          from { transform: translateX(-30px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes fade-in-right {
          from { transform: translateX(30px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes scale-in {
          from { transform: scale(0.9); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-blob {
          animation: blob 7s ease-in-out infinite;
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }
        .animate-slide-down {
          animation: slide-down 0.3s ease-out;
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
        }
        .animate-fade-in-left {
          animation: fade-in-left 0.6s ease-out forwards;
        }
        .animate-fade-in-right {
          animation: fade-in-right 0.6s ease-out forwards;
        }
        .animate-scale-in {
          animation: scale-in 0.5s ease-out forwards;
        }
        .animation-delay-1000 {
          animation-delay: 1s;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}