
import React from &rsquo;react&rsquo;;
import { Link } from &rsquo;react-router-dom&rsquo;;
import { MapPin } from &rsquo;lucide-react&rsquo;;

const ServiceAreaGrid = ({ areas }) => {
  if (!areas || areas.length === 0) return null;

  return (
    <div className=&rdquo;grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4&rdquo;>
      {areas.map((area, idx) => (
        <Link 
          key={idx} 
          to={`/service/${area.toLowerCase().replace(/ /g, &rsquo;-&rsquo;)}`}
          className=&rdquo;flex items-center p-4 bg-card rounded-xl border border-border shadow-sm hover:shadow-md hover:border-primary/50 transition-all duration-300 group&rdquo;
        >
          <div className=&rdquo;bg-primary/10 p-2 rounded-lg mr-3 group-hover:bg-primary/20 transition-colors&rdquo;>
            <MapPin className=&rdquo;w-5 h-5 text-primary&rdquo; />
          </div>
          <span className=&rdquo;font-medium text-foreground group-hover:text-primary transition-colors&rdquo;>
            {area}
          </span>
        </Link>
      ))}
    </div>
  );
};

export default ServiceAreaGrid;
