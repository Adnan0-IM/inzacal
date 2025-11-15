import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {  Zap } from "lucide-react";

const features = () => {
  return (
    <Card className="group bg-background/80 backdrop-blur-sm border-border/60 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 relative">
      <CardHeader>
        <div className="w-12 h-12 rounded-lg bg-muted/80 flex items-center justify-center mb-4 group-hover:bg-primary/10 transition-colors duration-300">
          <Zap className="h-6 w-6 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
        </div>
        <CardTitle className="text-xl font-semibold">blabla</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground leading-relaxed">blabla</p>
      </CardContent>
    </Card>
  );
};

export default features;
