import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Dumbbell, 
  Users, 
  Star, 
  MapPin, 
  ChevronRight, 
  Menu, 
  X, 
  Instagram, 
  Phone, 
  Mail, 
  CheckCircle2, 
  Award, 
  Clock, 
  ShieldCheck,
  ArrowRight,
  MessageCircle
} from 'lucide-react';

// --- Components ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#' },
    { name: 'Programs', href: '#programs' },
    { name: 'Trainers', href: '#trainers' },
    { name: 'Membership', href: '#membership' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-black/60 backdrop-blur-2xl py-4 border-b border-white/10' : 'bg-black/20 backdrop-blur-md py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-accent flex items-center justify-center rounded-lg rotate-45">
            <Dumbbell className="text-white -rotate-45" size={24} />
          </div>
          <span className="font-display text-2xl tracking-tighter uppercase font-black">
            Iron<span className="text-accent">Pulse</span>
          </span>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className="text-sm font-medium uppercase tracking-widest hover:text-accent transition-colors"
            >
              {link.name}
            </a>
          ))}
          <a 
            href="#trial" 
            className="bg-accent hover:bg-accent-hover text-white px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all transform hover:scale-105"
          >
            Free Trial
          </a>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-white" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-black border-b border-white/10 py-8 px-6 md:hidden"
          >
            <div className="flex flex-col gap-6 items-center">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-lg font-medium uppercase tracking-widest hover:text-accent transition-colors"
                >
                  {link.name}
                </a>
              ))}
              <a 
                href="#trial" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full text-center bg-accent text-white py-4 rounded-xl font-bold uppercase tracking-widest"
              >
                Book Free Trial
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const SectionHeading = ({ subtitle, title, description = null, light = false }) => (
  <div className="mb-16 text-center max-w-3xl mx-auto">
    <motion.span 
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-accent font-bold uppercase tracking-[0.3em] text-xs mb-4 block"
    >
      {subtitle}
    </motion.span>
    <motion.h2 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.1 }}
      className={`text-4xl md:text-6xl font-display uppercase font-black mb-6 leading-tight ${light ? 'text-white' : 'text-white'}`}
    >
      {title}
    </motion.h2>
    {description && (
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="text-white/60 text-lg leading-relaxed"
      >
        {description}
      </motion.p>
    )}
  </div>
);

const StatCard = ({ icon: Icon, value, label }) => (
  <div className="flex flex-col items-center md:items-start">
    <div className="flex items-center gap-3 mb-1">
      <Icon className="text-accent" size={20} />
      <span className="text-3xl md:text-4xl font-display font-black">{value}</span>
    </div>
    <span className="text-white/50 text-xs uppercase tracking-widest font-bold">{label}</span>
  </div>
);

const ProgramCard = ({ title, description, icon: Icon }) => (
  <motion.div 
    whileHover={{ y: -10 }}
    className="bg-glass p-8 rounded-2xl group hover:border-accent/50 transition-all duration-500"
  >
    <div className="w-14 h-14 bg-accent/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-accent transition-colors duration-500">
      <Icon className="text-accent group-hover:text-white transition-colors duration-500" size={28} />
    </div>
    <h3 className="text-xl font-display uppercase font-bold mb-4">{title}</h3>
    <p className="text-white/60 leading-relaxed mb-6">{description}</p>
    <button className="flex items-center gap-2 text-accent font-bold text-sm uppercase tracking-widest group-hover:gap-4 transition-all">
      Learn More <ArrowRight size={16} />
    </button>
  </motion.div>
);

const TrainerCard = ({ name, role, exp, image }) => (
  <motion.div 
    whileHover={{ scale: 1.02 }}
    className="relative group overflow-hidden rounded-2xl aspect-[3/4]"
  >
    <img 
      src={image} 
      alt={name} 
      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-110 group-hover:scale-100"
      referrerPolicy="no-referrer"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
    <div className="absolute bottom-0 left-0 w-full p-8 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
      <span className="text-accent text-xs font-bold uppercase tracking-widest mb-2 block">{role}</span>
      <h3 className="text-2xl font-display uppercase font-black mb-1">{name}</h3>
      <p className="text-white/60 text-sm font-medium">{exp} Experience</p>
      <div className="flex gap-4 mt-6 opacity-0 group-hover:opacity-100 transition-opacity delay-100">
        <Instagram size={20} className="hover:text-accent cursor-pointer" />
        <Users size={20} className="hover:text-accent cursor-pointer" />
      </div>
    </div>
  </motion.div>
);

const MembershipCard = ({ plan, price, features, highlighted = false }) => (
  <motion.div 
    whileHover={{ y: -10 }}
    className={`p-10 rounded-3xl flex flex-col h-full transition-all duration-500 ${highlighted ? 'bg-accent border-none shadow-[0_0_40px_rgba(255,78,0,0.3)]' : 'bg-glass border-white/10'}`}
  >
    <h3 className={`text-2xl font-display uppercase font-black mb-2 ${highlighted ? 'text-white' : 'text-white'}`}>{plan}</h3>
    <div className="flex items-baseline gap-1 mb-8">
      <span className={`text-4xl font-display font-black ${highlighted ? 'text-white' : 'text-white'}`}>₹{price}</span>
      <span className={`text-sm font-bold uppercase tracking-widest ${highlighted ? 'text-white/80' : 'text-white/40'}`}>/ month</span>
    </div>
    <div className="flex-grow space-y-4 mb-10">
      {features.map((feature, idx) => (
        <div key={idx} className="flex items-center gap-3">
          <CheckCircle2 size={18} className={highlighted ? 'text-white' : 'text-accent'} />
          <span className={`text-sm font-medium ${highlighted ? 'text-white/90' : 'text-white/70'}`}>{feature}</span>
        </div>
      ))}
    </div>
    <button className={`w-full py-4 rounded-xl font-bold uppercase tracking-widest transition-all ${highlighted ? 'bg-white text-accent hover:bg-white/90' : 'bg-accent text-white hover:bg-accent-hover'}`}>
      Choose Plan
    </button>
  </motion.div>
);

const TestimonialCard = ({ name, text, rating }) => (
  <div className="bg-glass p-8 rounded-2xl border border-white/5">
    <div className="flex gap-1 mb-4">
      {[...Array(rating)].map((_, i) => (
        <Star key={i} size={16} className="fill-accent text-accent" />
      ))}
    </div>
    <p className="text-white/70 italic leading-relaxed mb-6">"{text}"</p>
    <div className="flex items-center gap-4">
      <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center font-bold text-accent">
        {name.charAt(0)}
      </div>
      <h4 className="font-bold uppercase tracking-widest text-sm">{name}</h4>
    </div>
  </div>
);

// --- Main App ---

export default function App() {
  return (
    <div className="overflow-x-hidden selection:bg-accent selection:text-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-24 md:pt-32 overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop" 
            alt="Gym Background" 
            className="w-full h-full object-cover scale-105"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
          <div className="max-w-4xl">
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-display uppercase font-black leading-[1.1] mb-8"
            >
              Build <span className="text-accent">Strength</span>.<br />Transform Life.
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-white/60 text-lg md:text-xl max-w-xl mb-12 leading-relaxed"
            >
              Experience Jaipur's most elite fitness destination. World-class equipment, 
              expert coaching, and a community built for results.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-6"
            >
              <a href="#trial" className="bg-accent hover:bg-accent-hover text-white px-10 py-5 rounded-xl font-bold uppercase tracking-widest text-sm transition-all flex items-center justify-center gap-3 group">
                Start Your Journey <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <a href="#membership" className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white px-10 py-5 rounded-xl font-bold uppercase tracking-widest text-sm transition-all border border-white/10 flex items-center justify-center">
                View Memberships
              </a>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1 }}
              className="mt-20 grid grid-cols-2 md:grid-cols-3 gap-10 border-t border-white/10 pt-10"
            >
              <StatCard icon={Users} value="850+" label="Active Members" />
              <StatCard icon={Star} value="4.8" label="Google Rating" />
              <StatCard icon={MapPin} value="Jaipur" label="Location" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-32 bg-black">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute -top-6 -left-6 w-32 h-32 border-t-4 border-l-4 border-accent opacity-50" />
              <div className="absolute -bottom-6 -right-6 w-32 h-32 border-b-4 border-r-4 border-accent opacity-50" />
              <img 
                src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=2070&auto=format&fit=crop" 
                alt="Gym Interior" 
                className="rounded-3xl shadow-2xl relative z-10"
                referrerPolicy="no-referrer"
              />
              <div className="absolute -bottom-10 -left-10 bg-accent p-8 rounded-2xl z-20 hidden md:block">
                <span className="text-4xl font-display font-black block">7+</span>
                <span className="text-xs uppercase tracking-widest font-bold opacity-80">Years of Excellence</span>
              </div>
            </motion.div>

            <div>
              <SectionHeading 
                subtitle="About Iron Pulse"
                title="Welcome to Iron Pulse Fitness"
                description="Iron Pulse Fitness Club is one of Jaipur’s most trusted and high-performance gyms designed for people who want real fitness results. Our facility combines world-class equipment, certified trainers, and a motivating environment to help you reach your fitness goals faster."
              />
              
              <div className="grid grid-cols-2 gap-8 mt-12">
                <div className="p-6 bg-glass rounded-2xl border border-white/5">
                  <Award className="text-accent mb-4" size={32} />
                  <h4 className="text-2xl font-display font-black mb-1">12</h4>
                  <p className="text-white/50 text-xs uppercase tracking-widest font-bold">Certified Trainers</p>
                </div>
                <div className="p-6 bg-glass rounded-2xl border border-white/5">
                  <Users className="text-accent mb-4" size={32} />
                  <h4 className="text-2xl font-display font-black mb-1">3000+</h4>
                  <p className="text-white/50 text-xs uppercase tracking-widest font-bold">Members Served</p>
                </div>
              </div>

              <div className="mt-12 flex items-center gap-6">
                <div className="flex -space-x-4">
                  {[1,2,3,4].map(i => (
                    <div key={i} className="w-12 h-12 rounded-full border-4 border-black bg-accent/20 flex items-center justify-center text-xs font-bold">
                      M{i}
                    </div>
                  ))}
                </div>
                <p className="text-white/60 text-sm font-medium">Join 850+ active members in Jaipur</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section id="programs" className="py-32 bg-[#050505]">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading 
            subtitle="Our Programs"
            title="Push Your Limits"
            description="We offer a wide range of fitness programs tailored to your specific goals and fitness level."
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ProgramCard 
              title="Strength Training" 
              description="Build muscle and increase strength with structured workout programs designed for progressive overload."
              icon={Dumbbell}
            />
            <ProgramCard 
              title="Personal Training" 
              description="1-on-1 sessions with certified trainers to accelerate your fitness progress with personalized attention."
              icon={Users}
            />
            <ProgramCard 
              title="Weight Loss" 
              description="Scientifically designed fat loss programs with diet guidance to help you shed pounds effectively."
              icon={Clock}
            />
            <ProgramCard 
              title="CrossFit Training" 
              description="High intensity functional workouts for endurance, strength, and agility in a group environment."
              icon={Award}
            />
            <ProgramCard 
              title="Yoga & Mobility" 
              description="Improve flexibility, posture, and recovery with our specialized yoga and mobility sessions."
              icon={ShieldCheck}
            />
            <ProgramCard 
              title="Cardio Conditioning" 
              description="Burn calories and improve cardiovascular health with our high-energy cardio equipment and classes."
              icon={Clock}
            />
          </div>
        </div>
      </section>

      {/* Trainers Section */}
      <section id="trainers" className="py-32 bg-black">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading 
            subtitle="Expert Coaches"
            title="Meet Our Elite Trainers"
            description="Our certified trainers are dedicated to helping you achieve your fitness goals with expert guidance and motivation."
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <TrainerCard 
              name="Rahul Sharma" 
              role="Strength Coach" 
              exp="8 Years"
              image="https://images.unsplash.com/photo-1567013127542-490d757e51fc?q=80&w=1974&auto=format&fit=crop"
            />
            <TrainerCard 
              name="Aman Verma" 
              role="Weight Loss Specialist" 
              exp="6 Years"
              image="https://images.unsplash.com/photo-1549476464-37392f717541?q=80&w=1974&auto=format&fit=crop"
            />
            <TrainerCard 
              name="Priya Nair" 
              role="Yoga Trainer" 
              exp="7 Years"
              image="https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=2070&auto=format&fit=crop"
            />
            <TrainerCard 
              name="Arjun Mehta" 
              role="CrossFit Coach" 
              exp="5 Years"
              image="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop"
            />
          </div>
        </div>
      </section>

      {/* Membership Section */}
      <section id="membership" className="py-32 bg-[#050505] relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/10 blur-[120px] rounded-full translate-y-1/2 -translate-x-1/2" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <SectionHeading 
            subtitle="Membership Plans"
            title="Choose Your Level"
            description="Flexible pricing plans designed to fit your lifestyle and fitness commitment."
          />

          <div className="grid md:grid-cols-3 gap-8">
            <MembershipCard 
              plan="Basic Plan"
              price="1,499"
              features={[
                "Full Gym Access",
                "Cardio & Strength Equipment",
                "Locker Facility",
                "Free Water Refills",
                "Mobile App Access"
              ]}
            />
            <MembershipCard 
              plan="Pro Plan"
              price="2,499"
              highlighted={true}
              features={[
                "Everything in Basic",
                "Unlimited Group Classes",
                "Basic Diet Guidance",
                "Monthly Body Assessment",
                "Guest Passes (2/month)"
              ]}
            />
            <MembershipCard 
              plan="Elite Plan"
              price="4,999"
              features={[
                "Everything in Pro",
                "Personal Trainer Sessions",
                "Customized Workout Plan",
                "Advanced Diet Consultation",
                "Priority Support"
              ]}
            />
          </div>
        </div>
      </section>

      {/* Facilities Section */}
      <section className="py-32 bg-black">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div>
              <SectionHeading 
                subtitle="World Class Facilities"
                title="Premium Gym Experience"
                description="We provide the best-in-class environment and equipment to ensure your workout is productive and enjoyable."
              />
              
              <div className="grid grid-cols-2 gap-6">
                {[
                  { icon: Dumbbell, label: "Imported Equipment" },
                  { icon: Clock, label: "Cardio Zone" },
                  { icon: ShieldCheck, label: "Locker Rooms" },
                  { icon: Users, label: "Group Studio" },
                  { icon: Award, label: "Personal Training" },
                  { icon: CheckCircle2, label: "Diet Support" }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4 p-4 bg-glass rounded-xl border border-white/5">
                    <item.icon className="text-accent" size={24} />
                    <span className="text-sm font-bold uppercase tracking-widest">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <img src="https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=2070&auto=format&fit=crop" alt="Facility 1" className="rounded-2xl aspect-square object-cover" referrerPolicy="no-referrer" />
                <img src="https://images.unsplash.com/photo-1571902943202-507ec2618e8f?q=80&w=1975&auto=format&fit=crop" alt="Facility 2" className="rounded-2xl aspect-[3/4] object-cover" referrerPolicy="no-referrer" />
              </div>
              <div className="space-y-4 pt-8">
                <img src="https://images.unsplash.com/photo-1593079831268-3381b0db4a77?q=80&w=2069&auto=format&fit=crop" alt="Facility 3" className="rounded-2xl aspect-[3/4] object-cover" referrerPolicy="no-referrer" />
                <img src="https://images.unsplash.com/photo-1574680096145-d05b474e2155?q=80&w=2069&auto=format&fit=crop" alt="Facility 4" className="rounded-2xl aspect-square object-cover" referrerPolicy="no-referrer" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-32 bg-[#050505]">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading 
            subtitle="Success Stories"
            title="What Our Members Say"
          />

          <div className="grid md:grid-cols-3 gap-8">
            <TestimonialCard 
              name="Rohit Gupta" 
              rating={5}
              text="I lost 18 kg here in just 5 months. The trainers are extremely supportive and the environment is motivating."
            />
            <TestimonialCard 
              name="Sneha Kapoor" 
              rating={5}
              text="The best gym in Jaipur. Clean facility, amazing trainers, and great workout programs. Highly recommended!"
            />
            <TestimonialCard 
              name="Amit Jain" 
              rating={5}
              text="Joining Iron Pulse was the best decision for my health. The community here is incredible and pushes you to be better."
            />
          </div>
        </div>
      </section>

      {/* Lead Capture Form Section */}
      <section id="trial" className="py-32 bg-black relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <img 
            src="https://images.unsplash.com/photo-1594381898411-846e7d193883?q=80&w=1974&auto=format&fit=crop" 
            alt="Form Background" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-black" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div>
              <motion.span 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                className="text-accent font-bold uppercase tracking-[0.3em] text-xs mb-4 block"
              >
                Get Started
              </motion.span>
              <h2 className="text-5xl md:text-7xl font-display uppercase font-black mb-8 leading-tight">
                Book Your <span className="text-accent">Free Trial</span> Workout
              </h2>
              <p className="text-white/60 text-lg mb-12">
                Take the first step towards your transformation. Fill out the form and our team will 
                contact you to schedule your first session.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center text-accent">
                    <CheckCircle2 size={24} />
                  </div>
                  <span className="font-bold uppercase tracking-widest text-sm">No Commitment Required</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center text-accent">
                    <CheckCircle2 size={24} />
                  </div>
                  <span className="font-bold uppercase tracking-widest text-sm">Free Body Assessment</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center text-accent">
                    <CheckCircle2 size={24} />
                  </div>
                  <span className="font-bold uppercase tracking-widest text-sm">Expert Consultation</span>
                </div>
              </div>
            </div>

            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-glass p-10 rounded-3xl border border-white/10"
            >
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-xs uppercase tracking-widest font-bold text-white/50 mb-2 block">Full Name</label>
                    <input type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white focus:border-accent outline-none transition-colors" placeholder="John Doe" />
                  </div>
                  <div>
                    <label className="text-xs uppercase tracking-widest font-bold text-white/50 mb-2 block">Phone Number</label>
                    <input type="tel" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white focus:border-accent outline-none transition-colors" placeholder="+91 98765 43210" />
                  </div>
                </div>
                <div>
                  <label className="text-xs uppercase tracking-widest font-bold text-white/50 mb-2 block">Email Address</label>
                  <input type="email" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white focus:border-accent outline-none transition-colors" placeholder="john@example.com" />
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-xs uppercase tracking-widest font-bold text-white/50 mb-2 block">Fitness Goal</label>
                    <select className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white focus:border-accent outline-none transition-colors appearance-none">
                      <option className="bg-black">Weight Loss</option>
                      <option className="bg-black">Muscle Gain</option>
                      <option className="bg-black">Endurance</option>
                      <option className="bg-black">Flexibility</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs uppercase tracking-widest font-bold text-white/50 mb-2 block">Preferred Time</label>
                    <select className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white focus:border-accent outline-none transition-colors appearance-none">
                      <option className="bg-black">Morning (6AM - 11AM)</option>
                      <option className="bg-black">Afternoon (11AM - 4PM)</option>
                      <option className="bg-black">Evening (4PM - 11PM)</option>
                    </select>
                  </div>
                </div>
                <button className="w-full bg-accent hover:bg-accent-hover text-white py-5 rounded-xl font-bold uppercase tracking-widest text-sm transition-all shadow-[0_10px_30px_rgba(255,78,0,0.3)]">
                  Book Free Trial Workout
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section className="py-32 bg-[#050505]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div>
              <SectionHeading 
                subtitle="Find Us"
                title="Our Location"
              />
              <div className="space-y-8">
                <div className="flex items-start gap-6">
                  <div className="w-14 h-14 bg-accent/10 rounded-2xl flex items-center justify-center text-accent shrink-0">
                    <MapPin size={28} />
                  </div>
                  <div>
                    <h4 className="text-xl font-display uppercase font-bold mb-2">Iron Pulse Fitness Club</h4>
                    <p className="text-white/60 leading-relaxed">
                      Near SKIT College, Jagatpura,<br />
                      Jaipur, Rajasthan 302017
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-6">
                  <div className="w-14 h-14 bg-accent/10 rounded-2xl flex items-center justify-center text-accent shrink-0">
                    <Clock size={28} />
                  </div>
                  <div>
                    <h4 className="text-xl font-display uppercase font-bold mb-2">Working Hours</h4>
                    <p className="text-white/60 leading-relaxed">
                      Monday - Saturday: 6:00 AM - 11:00 PM<br />
                      Sunday: 8:00 AM - 12:00 PM
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="h-[450px] rounded-3xl overflow-hidden grayscale border border-white/10">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3561.2134768242!2d75.8485!3d26.82!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjbCsDQ5JzEyLjAiTiA3NcKwNTAnNTQuNiJF!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen="" 
                loading="lazy"
                title="Google Maps"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-black pt-32 pb-10 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
            <div className="col-span-1 lg:col-span-1">
              <div className="flex items-center gap-2 mb-8">
                <div className="w-10 h-10 bg-accent flex items-center justify-center rounded-lg rotate-45">
                  <Dumbbell className="text-white -rotate-45" size={24} />
                </div>
                <span className="font-display text-2xl tracking-tighter uppercase font-black">
                  Iron<span className="text-accent">Pulse</span>
                </span>
              </div>
              <p className="text-white/50 leading-relaxed mb-8">
                Elevate your fitness journey at Jaipur's premier high-performance gym. 
                Strength, community, and results.
              </p>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-accent transition-colors">
                  <Instagram size={18} />
                </a>
                <a href="#" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-accent transition-colors">
                  <Users size={18} />
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-display uppercase font-bold mb-8 tracking-widest">Quick Links</h4>
              <ul className="space-y-4">
                {['Home', 'About Us', 'Programs', 'Trainers', 'Membership'].map(link => (
                  <li key={link}>
                    <a href="#" className="text-white/50 hover:text-accent transition-colors text-sm uppercase tracking-widest font-medium">{link}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-display uppercase font-bold mb-8 tracking-widest">Contact Info</h4>
              <ul className="space-y-6">
                <li className="flex items-center gap-4">
                  <Phone size={18} className="text-accent" />
                  <span className="text-white/50 text-sm font-medium">+91 98765 43210</span>
                </li>
                <li className="flex items-center gap-4">
                  <Mail size={18} className="text-accent" />
                  <span className="text-white/50 text-sm font-medium">info@ironpulsefitness.com</span>
                </li>
                <li className="flex items-start gap-4">
                  <MapPin size={18} className="text-accent mt-1" />
                  <span className="text-white/50 text-sm font-medium leading-relaxed">
                    Jagatpura, Jaipur,<br />Rajasthan 302017
                  </span>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-display uppercase font-bold mb-8 tracking-widest">Newsletter</h4>
              <p className="text-white/50 text-sm mb-6">Subscribe for fitness tips and exclusive offers.</p>
              <form className="flex gap-2">
                <input type="email" placeholder="Email" className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm outline-none focus:border-accent w-full" />
                <button className="bg-accent p-3 rounded-lg hover:bg-accent-hover transition-colors">
                  <ArrowRight size={20} />
                </button>
              </form>
            </div>
          </div>

          <div className="pt-10 border-t border-white/5 flex flex-col md:row justify-between items-center gap-6">
            <p className="text-white/30 text-xs uppercase tracking-widest font-bold">
              © 2026 Iron Pulse Fitness Club. All Rights Reserved.
            </p>
            <div className="flex gap-8">
              <a href="#" className="text-white/30 hover:text-white text-xs uppercase tracking-widest font-bold">Privacy Policy</a>
              <a href="#" className="text-white/30 hover:text-white text-xs uppercase tracking-widest font-bold">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <a 
        href="https://wa.me/919876543210" 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center justify-center"
      >
        <MessageCircle size={32} />
      </a>
    </div>
  );
}
