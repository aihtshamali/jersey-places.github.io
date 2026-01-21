import { motion } from "framer-motion";
import { Shield, CheckCircle2, Users } from "lucide-react";

const trustPoints = [
  {
    icon: Shield,
    title: "Verified Agents",
    description: "All agencies on places.je are approved and regulated, ensuring professional service.",
  },
  {
    icon: CheckCircle2,
    title: "Accurate Listings",
    description: "Real-time property counts with no duplicates. What you see is what's available.",
  },
  {
    icon: Users,
    title: "Multi-Agent Free",
    description: "No spam from duplicate listings. Each property appears once, whoever has the mandate.",
  },
];

export function TrustSection() {
  return (
    <section className="py-16 lg:py-20 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl lg:text-4xl font-bold mb-3">
            Why Jersey Trusts Us
          </h2>
          <p className="text-primary-foreground/70 max-w-xl mx-auto">
            The only property portal built specifically for Jersey, by islanders who understand the market.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {trustPoints.map((point, index) => (
            <motion.div
              key={point.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <div className="w-14 h-14 rounded-2xl bg-primary-foreground/10 flex items-center justify-center mx-auto mb-4">
                <point.icon className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{point.title}</h3>
              <p className="text-primary-foreground/70 text-sm leading-relaxed">
                {point.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
