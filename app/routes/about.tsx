import type { MetaFunction } from "react-router";
import { ShopHistory } from "~/components/about/shop-history";

export const meta: MetaFunction = () => {
  return [
    { title: "About Shannon Jones & Timeout At Shannon's - Master Barber & Community Leader" },
    { name: "description", content: "Meet Shannon Jones, master barber and community leader behind Timeout At Shannon's. Learn about our shop's history, values, and commitment to excellence in barbering and community service." },
    { name: "keywords", content: "Shannon Jones, master barber, Timeout At Shannon's, barber shop history, community leader, professional barbering, shop owner biography" }
  ];
};

export default function AboutRoute() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 dark:from-slate-900 dark:to-slate-800">
      {/* Hero Section */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-900/20 to-orange-900/20 dark:from-amber-900/40 dark:to-orange-900/40"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Hero Text */}
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-amber-900 dark:text-amber-100 mb-6">
                Meet Shannon Jones
              </h1>
              <h2 className="text-2xl md:text-3xl text-amber-700 dark:text-amber-300 font-medium mb-8">
                Master Barber & Community Leader
              </h2>
              <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 leading-relaxed mb-8">
                Born and raised on Chicago's West Side in the K-Town neighborhood, Shannon Jones has dedicated 
                his life to a career that embodies the culture and social importance of the barbershop as a 
                vital institution. Since 1998, he's built more than just a business—he's created an oasis 
                of style and a touchstone of culture.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200 shadow-lg hover:shadow-xl">
                  Book with Shannon
                </button>
                <button className="bg-transparent border-2 border-amber-600 text-amber-700 dark:text-amber-300 hover:bg-amber-600 hover:text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200">
                  Shop History
                </button>
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative">
              <div className="aspect-[4/5] bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl shadow-2xl overflow-hidden">
                <img
                  src="/images/barber-shop/shannon-jones-portrait.jpg"
                  alt="Shannon Jones - Master Barber and Owner of Timeout At Shannon's"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                <div className="absolute bottom-6 left-6 text-white">
                  <div className="text-sm opacity-90">Shannon Jones</div>
                  <div className="text-lg font-semibold">Master Barber & Owner</div>
                </div>
              </div>
              
              {/* Floating Achievement Cards */}
              <div className="absolute -top-4 -right-4 bg-white dark:bg-slate-800 p-4 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700">
                <div className="text-2xl font-bold text-amber-600">25+</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">Years Experience</div>
              </div>
              
              <div className="absolute -bottom-4 -left-4 bg-white dark:bg-slate-800 p-4 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700">
                <div className="text-2xl font-bold text-green-600">1998</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">Est. Founded</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Shannon's Story Section */}
      <section className="py-16 lg:py-20 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-amber-900 dark:text-amber-100 mb-6">
              The Story Behind the Chair
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed">
              From a basement barbershop in Chicago's K-Town neighborhood to a nationally recognized salon, 
              Shannon's journey is one of vision, dedication, and an unwavering commitment to excellence.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 p-8 rounded-xl border border-amber-200 dark:border-amber-700">
                <h3 className="text-2xl font-bold text-amber-900 dark:text-amber-100 mb-4">
                  K-Town Beginnings
                </h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                  Born and raised on Chicago's West Side in the infamous K-Town neighborhood, Shannon Jones 
                  began his career in his childhood home, fashioning an authentic barber salon in the 
                  family's basement that would become the barbershop of choice for an extensive clientele.
                </p>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed italic">
                  "It was in that basement that Shannon first planted the seeds that would grow into 
                  the fruit of Timeout, honing his barbering skills while forming a unique vision."
                </p>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20 p-8 rounded-xl border border-blue-200 dark:border-blue-700">
                <h3 className="text-2xl font-bold text-blue-900 dark:text-blue-100 mb-4">
                  Pivot Point & Mentorship
                </h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                  After several years in his West Side basement, Shannon enrolled at Chicago's prestigious 
                  Pivot Point International, where his tremendous talent was quickly noticed. After graduating 
                  among the top of his class, Shannon was mentored by Arthur Johnson, owner of Ajes Salon 
                  and one of Chicago's most respected stylists.
                </p>
                <ul className="space-y-2 text-slate-600 dark:text-slate-400">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    Pivot Point International Graduate
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    Top of Class Honors
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    Mentored by Arthur Johnson (Ajes Salon)
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    Master of High-End Barbering & Styling
                  </li>
                </ul>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 p-8 rounded-xl border border-green-200 dark:border-green-700">
                <h3 className="text-2xl font-bold text-green-900 dark:text-green-100 mb-4">
                  Building Elite Clientele
                </h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                  Over the course of the next decade, Shannon would position himself as one of Chicago's 
                  premiere barbers, attracting an enormous and diverse clientele that included celebrities, 
                  professional athletes, and some of Chicago's most notable business and community figures.
                </p>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed italic">
                  "Shannon began to cultivate the vision he had first created in K-Town, carefully 
                  putting the necessary pieces into place to design an unparalleled barbershop and salon."
                </p>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-950/20 dark:to-violet-950/20 p-8 rounded-xl border border-purple-200 dark:border-purple-700">
                <h3 className="text-2xl font-bold text-purple-900 dark:text-purple-100 mb-4">
                  The Timeout Legacy
                </h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                  Shannon has given his industry a look at the future of barber and hair salons, 
                  creating in Timeout an oasis of style, a touchstone of culture, and a meeting 
                  place for those who wish to engage in the art of successful living.
                </p>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  For Shannon Jones, the job of a barber doesn't end with a haircut. Instead, 
                  he has dedicated his life to a career that embodies the culture and social 
                  importance of the barbershop as a vital institution.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Shop History Timeline Section */}
      <section className="py-16 lg:py-20 bg-slate-50 dark:bg-slate-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-amber-900 dark:text-amber-100 mb-6">
              Timeout At Shannon's History
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed">
              From concept to community cornerstone, discover how Timeout At Shannon's 
              became more than just a barbershop—it became a local institution.
            </p>
          </div>
          <ShopHistory variant="timeline" />
        </div>
      </section>

      {/* Awards & Recognition */}
      <section className="py-16 lg:py-20 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-amber-900 dark:text-amber-100 mb-6">
              Awards & Recognition
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed">
              Shannon's dedication to excellence and community service has been recognized 
              by industry professionals and community organizations alike.
            </p>
          </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-gradient-to-br from-yellow-50 to-amber-50 dark:from-yellow-950/20 dark:to-amber-950/20 rounded-xl border border-yellow-200 dark:border-yellow-700">
              <div className="bg-yellow-600 text-white p-4 rounded-lg inline-flex mb-6">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732L14.146 12.8l-1.179 4.456a1 1 0 01-1.934 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732L9.854 7.2l1.179-4.456A1 1 0 0112 2z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-yellow-900 dark:text-yellow-100 mb-4">
                Wall Street Journal Feature
              </h3>
              <p className="text-yellow-700 dark:text-yellow-300 leading-relaxed mb-2">
                National Publication
              </p>
              <p className="text-sm text-yellow-600 dark:text-yellow-400">
                2002 • Front-page feature story printed nationwide in the Wall Street Journal
              </p>
            </div>

            <div className="text-center p-8 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20 rounded-xl border border-blue-200 dark:border-blue-700">
              <div className="bg-blue-600 text-white p-4 rounded-lg inline-flex mb-6">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-blue-900 dark:text-blue-100 mb-4">
                Chicago's Hottest Barbershop
              </h3>
              <p className="text-blue-700 dark:text-blue-300 leading-relaxed mb-2">
                New City Magazine
              </p>
              <p className="text-sm text-blue-600 dark:text-blue-400">
                2002 • Voted the city's hottest barbershop by Chicago's premier lifestyle magazine
              </p>
            </div>

            <div className="text-center p-8 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 rounded-xl border border-green-200 dark:border-green-700">
              <div className="bg-green-600 text-white p-4 rounded-lg inline-flex mb-6">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-green-900 dark:text-green-100 mb-4">
                National Media Recognition
              </h3>
              <p className="text-green-700 dark:text-green-300 leading-relaxed mb-2">
                Major Publications & TV
              </p>
              <p className="text-sm text-green-600 dark:text-green-400">
                Featured in Men's Health, Slam, Hoop, and Chicago's Channel 7 ABC News
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values & Philosophy Section */}
      <section className="py-16 lg:py-20 bg-slate-50 dark:bg-slate-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-amber-900 dark:text-amber-100 mb-6">
              Our Values & Philosophy
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed">
              The principles that guide everything we do at Timeout At Shannon's.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-white dark:bg-slate-900 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700">
              <div className="bg-amber-600 text-white p-4 rounded-lg inline-flex mb-6">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-amber-900 dark:text-amber-100 mb-4">
                Excellence in Craft
              </h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                Every cut, every shave, every service is performed with meticulous attention 
                to detail and a commitment to delivering the highest quality results.
              </p>
            </div>

            <div className="text-center p-8 bg-white dark:bg-slate-900 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700">
              <div className="bg-blue-600 text-white p-4 rounded-lg inline-flex mb-6">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-blue-900 dark:text-blue-100 mb-4">
                Community First
              </h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                We believe in giving back to the community that supports us, creating meaningful 
                connections and contributing to the greater good.
              </p>
            </div>

            <div className="text-center p-8 bg-white dark:bg-slate-900 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700">
              <div className="bg-green-600 text-white p-4 rounded-lg inline-flex mb-6">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-green-900 dark:text-green-100 mb-4">
                Authentic Relationships
              </h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                Building genuine connections with our clients and community members, treating 
                everyone with respect, warmth, and personal attention.
              </p>
            </div>

            <div className="text-center p-8 bg-white dark:bg-slate-900 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700">
              <div className="bg-purple-600 text-white p-4 rounded-lg inline-flex mb-6">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-purple-900 dark:text-purple-100 mb-4">
                Continuous Innovation
              </h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                Constantly evolving and improving our services, techniques, and client experience 
                while honoring traditional barbering values.
              </p>
            </div>

            <div className="text-center p-8 bg-white dark:bg-slate-900 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700">
              <div className="bg-red-600 text-white p-4 rounded-lg inline-flex mb-6">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 2L3 7v11a1 1 0 001 1h3a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1h3a1 1 0 001-1V7l-7-5z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-red-900 dark:text-red-100 mb-4">
                Welcoming Environment
              </h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                Creating a comfortable, inclusive space where everyone feels at home and can 
                truly relax during their visit.
              </p>
            </div>

            <div className="text-center p-8 bg-white dark:bg-slate-900 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700">
              <div className="bg-yellow-600 text-white p-4 rounded-lg inline-flex mb-6">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-yellow-900 dark:text-yellow-100 mb-4">
                Professional Integrity
              </h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                Conducting business with honesty, transparency, and ethical practices that 
                reflect our commitment to doing what's right.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 lg:py-20 bg-gradient-to-r from-amber-600 to-orange-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Experience the Timeout At Shannon's Difference
          </h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Join the thousands of satisfied clients who have made Timeout At Shannon's 
            their trusted choice for premium barbering services and community connection.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-amber-600 hover:bg-amber-50 px-8 py-3 rounded-lg font-semibold transition-colors duration-200 shadow-lg hover:shadow-xl">
              Book Your Appointment
            </button>
            <button className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-amber-600 px-8 py-3 rounded-lg font-semibold transition-colors duration-200">
              View Services
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
