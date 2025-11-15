
export default function AboutSection() {
  return (
    <section className="">
      <div className="mx-auto max-w-5xl px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">About Inzacal</h2>
          <div className="w-16 h-1 bg-gradient-to-r from-primary to-primary/60 mx-auto rounded-full"></div>
        </div>

        <div className="grid gap-12 md:grid-cols-2 items-center">
          <div>
            <h3 className="text-2xl font-semibold mb-6 text-foreground">
              Next-Generation Business Management
            </h3>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Inzacal is a comprehensive business and investment management
                platform built to simplify complex business decisions. From
                sales tracking to investor reports and tax compliance, we
                provide complete operational control.
              </p>
              <p>
                Designed for flexibility and growth, Inzacal adapts to your
                unique workflow — helping you focus on what truly matters:
                profitability, transparency, and sustainable success.
              </p>
            </div>
          </div>

          <div className="relative">
            <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl p-8 border border-border/50">
              <div className="space-y-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">
                    10K+
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Businesses Trust Us
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-xl font-semibold text-foreground">
                      99.9%
                    </div>
                    <div className="text-xs text-muted-foreground">Uptime</div>
                  </div>
                  <div>
                    <div className="text-xl font-semibold text-foreground">
                      24/7
                    </div>
                    <div className="text-xs text-muted-foreground">Support</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
