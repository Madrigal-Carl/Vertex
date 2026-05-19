import { MapPin, Mail, Phone, Award, Users, Star, Zap } from "lucide-react";

const knownFor = [
  {
    icon: Award,
    title: "Premium Quality",
    desc: "We partner only with top-tier brands and manufacturers to guarantee authentic, high-performing products.",
  },
  {
    icon: Users,
    title: "Expert Team",
    desc: "Our team of certified technicians and customer specialists are passionate about technology.",
  },
  {
    icon: Star,
    title: "Customer-First",
    desc: "Over 50,000 satisfied customers across the Philippines. Your satisfaction is our success metric.",
  },
  {
    icon: Zap,
    title: "Fast & Reliable",
    desc: "From order to delivery, we move fast. Same-day dispatch within Metro Manila.",
  },
];

export default function About() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-[#0F2436] py-24 px-6 md:px-12 text-center">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs font-display tracking-[0.2em] text-[#E63946] uppercase mb-3">
            Our Story
          </p>
          <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-6">
            Built by Tech Enthusiasts, for Tech Enthusiasts
          </h1>
          <p className="text-white/60 text-base font-sans leading-relaxed">
            Vertex was founded with one mission: make premium technology
            accessible to every Filipino. We believe the right tools change
            lives, and we're here to put them in your hands.
          </p>
        </div>
      </section>

      {/* About */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-xs font-display tracking-[0.2em] text-[#E63946] uppercase mb-3">
              About Vertex
            </p>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-[#0F2436] mb-6">
              A Decade of Delivering Excellence
            </h2>
            <p className="text-[#5E7386] leading-relaxed mb-4 font-sans">
              Founded in 2015, Vertex started as a small shop in Makati with a
              single goal: bring world-class technology to Filipino consumers at
              fair prices. What began as a two-person operation has grown into a
              trusted brand with a nationwide reach.
            </p>
            <p className="text-[#5E7386] leading-relaxed mb-4 font-sans">
              Today, Vertex operates both online and in physical stores, serving
              customers from Luzon to Mindanao. We stock over 2,000 products
              across laptops, smartphones, tablets, audio equipment, and
              accessories — all fully authenticated and covered by warranty.
            </p>
            <p className="text-[#5E7386] leading-relaxed font-sans">
              We don't just sell gadgets. We build relationships. Our
              after-sales support, repair services, and technical consultations
              ensure that every Vertex customer gets the most out of their
              investment.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { value: "10+", label: "Years in Business" },
              { value: "50K+", label: "Happy Customers" },
              { value: "2000+", label: "Products" },
              { value: "98%", label: "Satisfaction Rate" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="bg-[#F0F5FA] p-8 text-center"
                style={{ borderRadius: "8px" }}
              >
                <p className="text-4xl font-display font-bold text-[#E63946] mb-2">
                  {stat.value}
                </p>
                <p className="text-xs font-display tracking-widest text-[#5E7386] uppercase">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Known For */}
      <section className="py-16 bg-[#F0F5FA]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-10">
            <p className="text-xs font-display tracking-[0.2em] text-[#E63946] uppercase mb-3">
              What Sets Us Apart
            </p>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-[#0F2436]">
              What We're Known For
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {knownFor.map((k) => (
              <div
                key={k.title}
                className="bg-white p-6 border border-[#0F2436]/10 hover:border-[#E63946]/40 transition-all group"
                style={{ borderRadius: "8px" }}
              >
                <div
                  className="w-12 h-12 bg-[#0F2436] flex items-center justify-center mb-4 group-hover:bg-[#E63946] transition-colors"
                  style={{ borderRadius: "4px" }}
                >
                  <k.icon size={20} className="text-white" />
                </div>
                <h3 className="font-display font-semibold text-[#0F2436] text-base mb-2">
                  {k.title}
                </h3>
                <p className="text-sm text-[#5E7386] leading-relaxed">
                  {k.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact & Location */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-10">
            <p className="text-xs font-display tracking-[0.2em] text-[#E63946] uppercase mb-3">
              Find Us
            </p>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-[#0F2436]">
              Contact & Location
            </h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div className="space-y-6">
              <div
                className="flex items-start gap-4 p-5 bg-[#F0F5FA]"
                style={{ borderRadius: "8px" }}
              >
                <div
                  className="w-10 h-10 bg-[#0F2436] flex items-center justify-center flex-shrink-0"
                  style={{ borderRadius: "4px" }}
                >
                  <MapPin size={18} className="text-white" />
                </div>
                <div>
                  <p className="font-display text-[#0F2436] font-semibold mb-1">
                    Main Store
                  </p>
                  <p className="text-[#5E7386] text-sm">
                    123 Tech Avenue, Legaspi Village, Makati City, Metro Manila
                    1229
                  </p>
                  <p className="text-xs text-[#5E7386] mt-1">
                    Open: Mon–Sat 9:00 AM – 7:00 PM
                  </p>
                </div>
              </div>
              <div
                className="flex items-start gap-4 p-5 bg-[#F0F5FA]"
                style={{ borderRadius: "8px" }}
              >
                <div
                  className="w-10 h-10 bg-[#0F2436] flex items-center justify-center flex-shrink-0"
                  style={{ borderRadius: "4px" }}
                >
                  <Phone size={18} className="text-white" />
                </div>
                <div>
                  <p className="font-display text-[#0F2436] font-semibold mb-1">
                    Phone
                  </p>
                  <p className="text-[#5E7386] text-sm">+63 2 8888 1234</p>
                  <p className="text-[#5E7386] text-sm">
                    +63 917 555 9876 (Mobile)
                  </p>
                </div>
              </div>
              <div
                className="flex items-start gap-4 p-5 bg-[#F0F5FA]"
                style={{ borderRadius: "8px" }}
              >
                <div
                  className="w-10 h-10 bg-[#0F2436] flex items-center justify-center flex-shrink-0"
                  style={{ borderRadius: "4px" }}
                >
                  <Mail size={18} className="text-white" />
                </div>
                <div>
                  <p className="font-display text-[#0F2436] font-semibold mb-1">
                    Email
                  </p>
                  <p className="text-[#5E7386] text-sm">
                    support@vertexstore.ph
                  </p>
                  <p className="text-[#5E7386] text-sm">
                    business@vertexstore.ph
                  </p>
                </div>
              </div>
            </div>

            <div
              className="h-80 bg-[#F0F5FA] border border-[#0F2436]/10 flex items-center justify-center relative overflow-hidden"
              style={{ borderRadius: "8px" }}
            >
              <div
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 30px, #0F2436 30px, #0F2436 31px), repeating-linear-gradient(90deg, transparent, transparent 30px, #0F2436 30px, #0F2436 31px)`,
                }}
              />
              <div className="relative text-center">
                <div
                  className="w-12 h-12 bg-[#E63946] flex items-center justify-center mx-auto mb-3"
                  style={{ borderRadius: "50%" }}
                >
                  <MapPin size={20} className="text-white" />
                </div>
                <p className="font-display text-[#0F2436] font-bold">
                  Vertex Main Store
                </p>
                <p className="text-xs text-[#5E7386] mt-1">
                  Makati City, Metro Manila
                </p>
                <button
                  className="mt-4 px-4 py-2 bg-[#0F2436] text-white font-display tracking-widest text-xs uppercase hover:bg-[#E63946] transition-colors"
                  style={{ borderRadius: "4px" }}
                >
                  Get Directions
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
