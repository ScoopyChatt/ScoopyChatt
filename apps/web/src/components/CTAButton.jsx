
import React from &rsquo;react&rsquo;;
import { Link } from &rsquo;react-router-dom&rsquo;;
import { Button } from &rsquo;@/components/ui/button&rsquo;;
import { cn } from &rsquo;@/lib/utils.js&rsquo;;

const CTAButton = ({ 
  to = &rsquo;/quote&rsquo;, 
  children = &rsquo;Get a Free Quote&rsquo;, 
  variant = &rsquo;default&rsquo;, 
  size = &rsquo;lg&rsquo;, 
  className,
  icon: Icon,
  ...props 
}) => {
  return (
    <Button 
      asChild 
      size={size} 
      variant={variant}
      className={cn(
        &rdquo;transition-all duration-300 active:scale-[0.98] font-bold shadow-lg hover:shadow-xl&rdquo;,
        variant === &rsquo;default&rsquo; && &rdquo;bg-primary text-primary-foreground hover:bg-primary/90&rdquo;,
        variant === &rsquo;outline&rsquo; && &rdquo;border-2 hover:bg-muted&rdquo;,
        className
      )}
      {...props}
    >
      <Link to={to} className=&rdquo;flex items-center justify-center&rdquo;>
        {children}
        {Icon && <Icon className=&rdquo;ml-2 h-5 w-5&rdquo; />}
      </Link>
    </Button>
  );
};

export default CTAButton;
