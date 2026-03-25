import { useState } from "react";
import { Phone, Mail, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { toast } from "sonner";

interface MobileStickyCTAProps {
  agencyName: string;
  agentName: string;
  phone: string;
  propertyAddress: string;
  parish: string;
}

export function MobileStickyCTA({ agencyName, agentName, phone, propertyAddress, parish }: MobileStickyCTAProps) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: `Hi, I'm interested in ${propertyAddress}, ${parish}.` });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      toast.error("Please fill in your name and email");
      return;
    }
    toast.success("Enquiry sent! The agent will be in touch shortly.");
    setOpen(false);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-card/95 backdrop-blur-md border-t border-border px-4 py-3 safe-area-bottom">
      <div className="flex items-center gap-2 max-w-lg mx-auto">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button className="flex-1 gap-2 h-12 text-base font-semibold rounded-xl">
              <MessageSquare className="w-5 h-5" />
              Enquire Now
            </Button>
          </SheetTrigger>
          <SheetContent side="bottom" className="rounded-t-3xl max-h-[85vh] overflow-y-auto">
            <SheetHeader className="text-left pb-2">
              <SheetTitle className="text-lg">Quick Enquiry</SheetTitle>
              <p className="text-sm text-muted-foreground">{agencyName} · {agentName}</p>
            </SheetHeader>
            <form className="space-y-3 pt-4" onSubmit={handleSubmit}>
              <Input
                placeholder="Your name *"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="h-12 rounded-xl text-base"
                autoComplete="name"
              />
              <Input
                type="email"
                placeholder="Your email *"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="h-12 rounded-xl text-base"
                autoComplete="email"
              />
              <Input
                type="tel"
                placeholder="Phone (optional)"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="h-12 rounded-xl text-base"
                autoComplete="tel"
              />
              <Textarea
                rows={3}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="rounded-xl text-base"
              />
              <Button type="submit" className="w-full h-12 text-base font-semibold rounded-xl">
                Send Enquiry
              </Button>
            </form>
          </SheetContent>
        </Sheet>

        <Button
          variant="outline"
          size="icon"
          className="h-12 w-12 rounded-xl flex-shrink-0"
          onClick={() => window.open(`tel:${phone}`)}
          aria-label="Call agent"
        >
          <Phone className="w-5 h-5" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="h-12 w-12 rounded-xl flex-shrink-0"
          onClick={() => window.open(`mailto:${agencyName.toLowerCase().replace(/\s/g, '')}@example.com`)}
          aria-label="Email agent"
        >
          <Mail className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
}
