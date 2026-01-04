const teamValues = [
  {
    title: "Master Craftsmanship",
    icon: "✂️",
    description: "Precision cuts and shaves from seasoned barbers."
  },
  {
    title: "Club Comfort",
    icon: "🛋️",
    description: "A calm lounge to stay before and after your appointment."
  },
  {
    title: "Chicago Roots",
    icon: "🏆",
    description: ":20 Second Timeout ties every visit to local youth impact."
  }
];

const services = [
  {
    name: "Signature Cuts",
    description: "Tailored haircuts with meticulous detailing.",
    icon: "✂️"
  },
  {
    name: "Hot Towel Shaves",
    description: "Straight-razor shaves with hot towel ritual.",
    icon: "🪒"
  },
  {
    name: "Beard Grooming",
    description: "Shaping and conditioning for every beard style.",
    icon: "🧔"
  }
];

export default function TeamSection() {
  return (
    <section id="team" className="py-16 md:py-32 bg-background">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-primary lg:text-5xl">
            Values & craft behind the club
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            What anchors the experience: thoughtful service, calm spaces, and Chicago heritage.
          </p>
        </div>

        {/* Values Section */}
        <div className="mb-16">
          <h3 className="text-2xl font-semibold text-center mb-8 text-foreground">
            What we stand for
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {teamValues.map((value, index) => (
              <div key={index} className="bg-background rounded-xl p-6 text-center shadow-sm border border-border">
                <div className="text-3xl mb-3">{value.icon}</div>
                <h4 className="font-semibold text-lg mb-2 text-foreground">{value.title}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Services Section */}
        <div>
          <h3 className="text-2xl font-semibold text-center mb-8 text-foreground">
            Our signature services
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <div key={index} className="bg-background rounded-xl p-6 text-center shadow-sm border border-border hover:border-primary/40 transition-colors">
                <div className="text-3xl mb-3">{service.icon}</div>
                <h4 className="font-semibold text-lg mb-2 text-foreground">{service.name}</h4>
                <p className="text-sm text-muted-foreground">{service.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Foundation Callout */}
        <div className="mt-16 bg-muted rounded-xl p-8 text-center border border-border">
          <div className="text-3xl mb-3">🏆</div>
          <h3 className="text-xl font-bold mb-2 text-foreground">
            :20 Second Timeout Foundation
          </h3>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Every membership funds mentorship and community programs for Chicago youth—impact baked into the experience.
          </p>
        </div>
      </div>
    </section>
  );
}
