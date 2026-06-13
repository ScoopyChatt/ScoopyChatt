import React from &rsquo;react&rsquo;;
import { motion } from &rsquo;framer-motion&rsquo;;
import { Check } from &rsquo;lucide-react&rsquo;;
import { Button } from &rsquo;@/components/ui/button&rsquo;;
import { Link } from &rsquo;react-router-dom&rsquo;;

const ServiceCard = ({ title, description, benefits, mostPopular }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className=&rdquo;relative h-full&rdquo;
    >
      {/* Glow effect for most popular card */}
      {mostPopular && (
        <div className=&rdquo;absolute -inset-1 bg-gradient-to-r from-primary via-accent to-primary rounded-2xl opacity-30 blur-xl group-hover:opacity-50 transition-opacity duration-300 -z-10&rdquo; />
      )}

      <div
        className={`relative h-full rounded-2xl p-8 flex flex-col transition-all duration-300 ${
          mostPopular
            ? &rsquo;bg-gradient-to-br from-primary/10 to-accent/10 border-2 border-primary shadow-2xl shadow-primary/20 scale-105 md:scale-100&rsquo;
            : &rsquo;bg-card border border-border shadow-lg shadow-black/5 hover:shadow-xl hover:-translate-y-1&rsquo;
        }`}
      >
        {/* Enhanced Most Popular Badge */}
        {mostPopular && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className=&rdquo;absolute -top-6 left-1/2 -translate-x-1/2 z-20&rdquo;
          >
            <div className=&rdquo;relative&rdquo;>
              {/* Glow background */}
              <div className=&rdquo;absolute inset-0 bg-gradient-to-r from-primary to-accent rounded-full blur-lg opacity-60 animate-pulse&rdquo; />
              
              {/* Badge container */}
              <div className=&rdquo;relative bg-gradient-to-r from-primary to-accent text-primary-foreground px-8 py-3 rounded-full font-bold text-lg shadow-2xl shadow-primary/40 border-2 border-primary-foreground/20 flex items-center gap-2 whitespace-nowrap&rdquo;>
                <span className=&rdquo;text-2xl&rdquo;>â­</span>
                <span className=&rdquo;tracking-wide text-xl&rdquo;>MOST POOPULAR</span>
              </div>
            </div>
          </motion.div>
        )}

        <div className=&rdquo;flex-1&rdquo;>
          <h3 className=&rdquo;text-2xl font-bold mb-3 text-foreground&rdquo;>{title}</h3>
          <p className=&rdquo;text-muted-foreground leading-relaxed mb-8&rdquo;>{description}</p>

          <div className=&rdquo;space-y-3&rdquo;>
            {benefits.map((benefit, index) => (
              <div key={index} className=&rdquo;flex items-start gap-3&rdquo;>
                <Check className={`h-5 w-5 flex-shrink-0 mt-0.5 ${mostPopular ? &rsquo;text-primary&rsquo; : &rsquo;text-secondary&rsquo;}`} />
                <span className=&rdquo;text-foreground&rdquo;>{benefit}</span>
              </div>
            ))}
          </div>
        </div>

        <Button
          asChild
          className={`w-full mt-8 h-12 rounded-xl font-semibold transition-all duration-200 active:scale-[0.98] ${
            mostPopular
              ? &rsquo;bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/30&rsquo;
              : &rsquo;bg-secondary text-secondary-foreground hover:bg-secondary/90&rsquo;
          }`}
        >
          <Link to=&rdquo;/quote&rdquo;>Get Started</Link>
        </Button>
      </div>
    </motion.div>
  );
};

export default ServiceCard;