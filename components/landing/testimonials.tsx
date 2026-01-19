// components/testimonials-section.tsx
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Johnson",
    age: 58,
    location: "New York",
    rating: 5,
    comment: "After 3 months of using AGE 400™, my joint pain has significantly reduced. I feel 20 years younger!",
  },
  {
    name: "Michael Chen",
    age: 62,
    location: "California",
    rating: 5,
    comment: "The energy boost is incredible. I'm more active and productive throughout the day.",
  },
  {
    name: "Patricia Williams",
    age: 55,
    location: "Florida",
    rating: 5,
    comment: "My skin looks healthier and more radiant. I've received so many compliments!",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-muted/30 to-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Trusted by Thousands
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Real results from real people who have transformed their health with AGE 400™
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-card border border-border rounded-2xl p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center gap-2 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              
              <p className="text-muted-foreground mb-6 italic">
                "{testimonial.comment}"
              </p>
              
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {testimonial.age} • {testimonial.location}
                  </div>
                </div>
                <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <span className="font-bold text-primary">
                    {testimonial.name.charAt(0)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-6 py-3 rounded-full">
            <span className="font-semibold">4.9/5</span>
            <Star className="h-4 w-4 fill-current" />
            <span className="text-muted-foreground">Average Rating from 2,500+ Reviews</span>
          </div>
        </div>
      </div>
    </section>
  );
}