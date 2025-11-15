import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  TrendingUp,
  FileText,
  Users,
  Package,
  Wallet,
  Scale,
  BarChart3,
  Target,
  Briefcase,
} from "lucide-react";
import Footer from "@/components/footer";
import HeroSection from "@/components/hero-section";
import CallToAction from "@/components/call-to-action";
import { DotPatternWithGlowEffect } from "@/components/DotPatternWithGlowEffect";
import ContentSection from "@/components/content";
import { WhyChooseUsCards } from "@/components/WhyChooseUs";

const HomePage = () => {
  const features = [
    {
      icon: Package,
      title: "Inventory & Low-Stock Alerts",
      description: "Track stock levels and get notified before items run out.",
    },
    {
      icon: TrendingUp,
      title: "Sales & Profit/Loss Tracking",
      description: "Record sales and instantly view profit margins.",
    },
    {
      icon: Wallet,
      title: "Expense Management",
      description: "Log expenses, attach receipts, and view spending trends.",
    },
    {
      icon: Users,
      title: "Investor Management & ROI",
      description:
        "Manage investor profiles, contributions, and transparent profit sharing.",
    },
    {
      icon: Scale,
      title: "Tax & Policy Compliance",
      description:
        "Stay updated with automated tax calculations and government policy alerts.",
    },
    {
      icon: FileText,
      title: "Reports & Analytics (PDF/CSV)",
      description: "Export weekly, monthly, or yearly reports with one click.",
    },
  ];

  // Solutions for different roles
  const solutions = [
    {
      icon: Briefcase,
      title: "Business Owners",
      description:
        "Make smarter decisions and identify your most profitable products and locations.",
    },
    {
      icon: Users,
      title: "Investors",
      description:
        "Access real-time ROI, profit shares, and transparent financial reports.",
    },
    {
      icon: BarChart3,
      title: "Accountants",
      description:
        "Automate tax, zakat, and expense tracking with audit-ready records.",
    },
    {
      icon: Target,
      title: "Sales Teams",
      description:
        "Simplify daily reporting and keep inventory data always up to date.",
    },
  ];



   return (
    <div className="min-h-screen bg-linear-to-b from-background via-background to-muted">
      {/* Header & Hero */}
      <HeroSection />
      {/* About Section */}
      <section id="about" className="container mx-auto px-4 py-24">
        <ContentSection />
      </section>

      {/* Overview + Key Features (Merged) */}

      {/* <DotPatternDemo> */}
        <section
          id="features"
          className="container mx-auto px-4 lg:px-8 py-24 relative"
        >
          {/* Subtle background pattern */}
          <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] dark:bg-grid-slate-700/25" />

          <div className="relative">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">
                All-in-One Platform for Smarter Business Management
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Everything you need to manage and grow your business
                efficiently.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <Card
                    key={index}
                    className="group bg-card/60 backdrop-blur-sm border border-border/50 shadow-sm hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 hover:-translate-y-2 hover:border-primary/20 relative overflow-hidden"
                  >
                    {/* Subtle gradient overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    <CardHeader className="relative">
                      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                        <Icon className="h-7 w-7 text-primary" />
                      </div>
                      <CardTitle className="text-lg font-semibold">
                        {feature.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="relative">
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {feature.description}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>
      {/* </DotPatternDemo> */}

      {/* Solutions Section */}

      <section id="solutions" className="container mx-auto px-4 lg:px-8 py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">
            Solutions Tailored for Every Business Role
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Powerful tools designed for the unique needs of every stakeholder in
            your business.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {solutions.map((solution, index) => {
            const Icon = solution.icon;
            return (
              <Card
                key={index}
                className="group text-center hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 hover:-translate-y-2 border-border/60 bg-card/80 backdrop-blur-sm"
              >
                <CardContent className="pt-8 pb-6">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg mb-3">
                    {solution.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {solution.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>
      {/* Why Choose Section */}
      <section className="container px-4 mx-auto lg:px-8 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Why Choose Inzacal?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Built with your business growth in mind
          </p>
        </div>
         
          <WhyChooseUsCards/>
      </section>
    
      {/* Call to Action */}
      <DotPatternWithGlowEffect>
        <CallToAction />
      </DotPatternWithGlowEffect>

      {/* Footer with Tailark Component */}
      <Footer />
    </div>
  );
};

export default HomePage;
