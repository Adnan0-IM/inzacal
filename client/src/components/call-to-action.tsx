import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import { ArrowRight } from "lucide-react";

export default function CallToAction() {
  return (
    <section className="">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl text-[#e5e7eb] md:text-5xl font-bold mb-6 tracking-tight">
            Ready to Transform Your Business Management?
          </h2>
          <p className="text-lg md:text-xl text-[#a0aec0] mb-8 leading-relaxed">
            Join forward-thinking entrepreneurs who've streamlined their
            operations and impressed their investors with professional
            reporting.
          </p>
          <Link to="/auth">
            <Button
              size="lg"
              className="text-lg px-8 py-5 bg-amber-600 hover:bg-amber-600/90 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Start For Free 
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
