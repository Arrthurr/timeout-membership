const teamValues = [
  {
    title: "Master Craftsmanship",
    icon: "✂️",
    description: "Every cut is an art form, crafted with precision and years of experience."
  },
  {
    title: "Community First",
    icon: "🤝",
    description: "We're more than a barber shop - we're a cornerstone of our Chicago neighborhood."
  },
  {
    title: "Foundation Support",
    icon: "🏆",
    description: "Through :20 Second Timeout Foundation, we invest in Chicago's youth and future."
  },
  {
    title: "Authentic Experience",
    icon: "🏛️",
    description: "Preserving the timeless tradition of barbering in a genuine, welcoming environment."
  }
];

const services = [
  {
    name: "Traditional Cuts",
    description: "Classic styles with modern precision",
    icon: "✂️"
  },
  {
    name: "Hot Towel Shaves",
    description: "Straight razor shaves with hot towel treatment",
    icon: "🪒"
  },
  {
    name: "Beard Grooming",
    description: "Professional beard trimming and styling",
    icon: "🧔"
  },
  {
    name: "Coffee & Conversation",
    description: "Premium coffee while you wait",
    icon: "☕"
  }
];

export default function TeamSection() {
  return (
    <section id="team" className="py-16 md:py-32 bg-barber-brown-50 dark:bg-background">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-primary lg:text-5xl">
            Our Values & Services
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            At Timeout At Shannon's, we blend traditional barbering excellence with 
            community spirit and modern amenities.
          </p>
        </div>

        {/* Values Section */}
        <div className="mb-16">
          <h3 className="text-2xl font-semibold text-center mb-8 text-barber-brown-800">
            What We Stand For
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamValues.map((value, index) => (
              <div key={index} className="bg-background rounded-xl p-6 text-center shadow-sm border border-barber-brown-200">
                <div className="text-3xl mb-3">{value.icon}</div>
                <h4 className="font-semibold text-lg mb-2 text-barber-brown-900">{value.title}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Services Section */}
        <div>
          <h3 className="text-2xl font-semibold text-center mb-8 text-barber-brown-800">
            Our Signature Services
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <div key={index} className="bg-background rounded-xl p-6 text-center shadow-sm border border-barber-green-200 hover:border-barber-green-300 transition-colors">
                <div className="text-3xl mb-3">{service.icon}</div>
                <h4 className="font-semibold text-lg mb-2 text-barber-green-800">{service.name}</h4>
                <p className="text-sm text-muted-foreground">{service.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Foundation Callout */}
        <div className="mt-16 bg-gradient-to-r from-barber-green-100 to-barber-brown-100 rounded-xl p-8 text-center border border-barber-green-200">
          <div className="text-4xl mb-4">🏆</div>
          <h3 className="text-2xl font-bold mb-3 text-barber-green-800">
            :20 Second Timeout Foundation
          </h3>
          <p className="text-barber-green-700 max-w-2xl mx-auto mb-4">
            Every membership supports our commitment to Chicago's youth, providing mentorship, 
            opportunities, and building stronger communities one timeout at a time.
          </p>
          <div className="flex justify-center gap-4 text-sm text-barber-green-600">
            <span>• Youth Mentorship</span>
            <span>• Community Programs</span>
            <span>• Educational Support</span>
          </div>
        </div>
      </div>
    </section>
  );
}
