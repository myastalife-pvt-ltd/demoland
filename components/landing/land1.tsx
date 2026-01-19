"use client"
import Head from 'next/head';
import { CheckCircle, Zap, ArrowRight, Menu, Beaker, Shield } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white font-sans text-foreground">
      <Head>
        <title>Nuvica AGE 400 | Smooth Today, Strong Tomorrow</title>
        <meta name="description" content="Premium cellular support and wellness supplement." />
      </Head>

      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
              <span className="text-white font-bold text-xs">N</span>
            </div>
            <span className="text-2xl font-bold tracking-tight text-primary">Nuvica</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium">
            <a href="#benefits" className="hover:text-primary transition-colors">Benefits</a>
            <a href="#science" className="hover:text-primary transition-colors">Science</a>
            <a href="#ingredients" className="hover:text-primary transition-colors">Ingredients</a>
            <button className="rounded-full bg-primary px-6 py-2 text-white hover:bg-primary/90 transition-all">
              Shop Now
            </button>
          </div>
          <Menu className="md:hidden text-primary" />
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-primary/10 to-white py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:flex lg:items-center lg:gap-12">
          <div className="flex-1 text-center lg:text-left">
            <span className="inline-block rounded-full bg-primary/20 px-4 py-1.5 text-sm font-semibold text-primary">
              Next-Gen Cellular Wellness
            </span>
            <h1 className="mt-6 text-5xl font-extrabold tracking-tight text-foreground lg:text-7xl">
              AGE <span className="text-primary">400</span>
            </h1>
            <p className="mt-4 text-xl font-medium text-muted-foreground italic">
              "Smooth Today, Strong Tomorrow"
            </p>
            <p className="mt-6 text-lg leading-8 text-muted-foreground max-w-2xl mx-auto lg:mx-0">
              Unlock the power of cellular longevity with our advanced formula. 
              Designed for those who refuse to compromise on their future vitality.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <button className="w-full sm:w-auto rounded-full bg-primary px-8 py-4 text-lg font-bold text-white shadow-lg hover:shadow-primary/30 hover:-translate-y-1 transition-all flex items-center justify-center gap-2">
                Order Your Pack <ArrowRight size={20} />
              </button>
              <p className="text-sm font-medium text-muted-foreground">
                20 Servings × 2000mg
              </p>
            </div>
          </div>

          <div className="mt-16 flex-1 lg:mt-0 relative">
            <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full" />
            <img 
              src="/nuvica.jpeg" 
              alt="Nuvica AGE 400 Packaging" 
              className="relative mx-auto w-full max-w-[450px] drop-shadow-2xl animate-float"
            />
          </div>
        </div>
      </section>

      {/* Features Table/Grid */}
      <section id="benefits" className="py-24 bg-secondary">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground">Why Choose AGE 400?</h2>
            <div className="mt-2 h-1 w-20 bg-primary mx-auto rounded-full" />
          </div>
          
          <div className="grid gap-8 md:grid-cols-3">
            {[
              { icon: <Shield className="text-primary" size={40} />, title: "Cellular Protection", desc: "Advanced antioxidants help shield your cells from daily oxidative stress." },
              { icon: <Zap className="text-primary" size={40} />, title: "Vitality Boost", desc: "Supports metabolic pathways to keep your energy levels consistent and smooth." },
              { icon: <Beaker className="text-primary" size={40} />, title: "Pure Formulation", desc: "Scientific precision in every 2000mg dose, utilizing high-bioavailability extracts." }
            ].map((feature, i) => (
              <div key={i} className="rounded-2xl bg-white p-8 shadow-sm border border-border hover:border-primary/50 transition-colors">
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ingredients Highlight */}
      <section id="ingredients" className="py-24">
        <div className="mx-auto max-w-7xl px-6 lg:flex lg:items-center lg:gap-16">
          <div className="flex-1 grid grid-cols-2 gap-4">
             <div className="aspect-square bg-blue-50 rounded-3xl flex items-center justify-center p-8">
                {/* <span className="text-primary font-bold text-center">Antioxidant Berries</span> */}
                <img src="/124.webp" alt="" />
             </div>
             <div className="aspect-square bg-green-50 rounded-3xl flex items-center justify-center p-8 mt-8">
                {/* <span className="text-green-700 font-bold text-center">Green Apple Extract</span> */}
                <img src="130.webp" alt="" />
             </div>
          </div>
          <div className="flex-1 mt-12 lg:mt-0">
            <h2 className="text-4xl font-bold text-foreground">Inspired by Nature, <br/><span className="text-primary">Perfected by Science.</span></h2>
            <p className="mt-6 text-lg text-muted-foreground">
              Our formula combines the DNA-supporting properties of curated berry polyphenols 
              with the crisp, vital energy of green apple enzymes.
            </p>
            <ul className="mt-8 space-y-4">
              {['Non-GMO Ingredients', 'Vegetarian Friendly', 'No Artificial Fillers', 'DNA Support Formula'].map((item) => (
                <li key={item} className="flex items-center gap-3 font-semibold text-foreground">
                  <CheckCircle className="text-primary" size={20} />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-white py-12">
        <div className="mx-auto max-w-7xl px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div>
            <h3 className="text-2xl font-bold">Nuvica™</h3>
            <p className="mt-2 text-primary-foreground/80">© 2026 Nuvica Wellness. All rights reserved.</p>
          </div>
          <div className="flex gap-6">
            <a href="#" className="hover:underline">Privacy Policy</a>
            <a href="#" className="hover:underline">Terms of Service</a>
            <a href="#" className="hover:underline">Contact</a>
          </div>
        </div>
      </footer>

      <style jsx global>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
          100% { transform: translateY(0px); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}