import { useState } from "react";
import { Phone, Mail, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { EnquiryForm, type EnquiryFormData } from "@/components/EnquiryForm";

interface MobileStickyCTAProps {
  agencyName: string;
  agentName: string;
  phone: string;
  propertyAddress: string;
  parish: string;
  onEnquirySubmit?: (data: EnquiryFormData) => void;
}

export function MobileStickyCTA({ agencyName, agentName, phone, propertyAddress, parish, onEnquirySubmit }: MobileStickyCTAProps) {
  const [open, setOpen] = useState(false);

  const handleSubmit = (data: EnquiryFormData) => {
    setOpen(false);
    onEnquirySubmit?.(data);
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
            <EnquiryForm
              propertyAddress={propertyAddress}
              parish={parish}
              onSubmit={handleSubmit}
              className="pt-4"
              inputClassName="h-12 rounded-xl text-base"
            />
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
