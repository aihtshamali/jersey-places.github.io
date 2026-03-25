import { useState } from "react";
import { Eye, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export interface EnquiryFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
  intent: "view" | "details";
}

interface EnquiryFormProps {
  propertyAddress: string;
  parish: string;
  onSubmit: (data: EnquiryFormData) => void;
  className?: string;
  inputClassName?: string;
}

export function EnquiryForm({ propertyAddress, parish, onSubmit, className = "", inputClassName = "" }: EnquiryFormProps) {
  const [formData, setFormData] = useState<EnquiryFormData>({
    name: "",
    email: "",
    phone: "",
    message: "",
    intent: "view",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form className={`space-y-4 ${className}`} onSubmit={handleSubmit}>
      {/* Intent Selection */}
      <div className="grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={() => setFormData({ ...formData, intent: "view" })}
          className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-medium border transition-all ${
            formData.intent === "view"
              ? "border-accent bg-accent/10 text-accent"
              : "border-border bg-secondary text-muted-foreground hover:border-accent/50"
          }`}
        >
          <Eye className="w-4 h-4" />
          View Property
        </button>
        <button
          type="button"
          onClick={() => setFormData({ ...formData, intent: "details" })}
          className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-medium border transition-all ${
            formData.intent === "details"
              ? "border-accent bg-accent/10 text-accent"
              : "border-border bg-secondary text-muted-foreground hover:border-accent/50"
          }`}
        >
          <Info className="w-4 h-4" />
          More Details
        </button>
      </div>

      <Input
        placeholder="Your name *"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        className={inputClassName}
        autoComplete="name"
        required
      />
      <Input
        type="email"
        placeholder="Your email *"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        className={inputClassName}
        autoComplete="email"
        required
      />
      <Input
        type="tel"
        placeholder="Phone (optional)"
        value={formData.phone}
        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
        className={inputClassName}
        autoComplete="tel"
      />
      <Textarea
        rows={3}
        placeholder="Message (optional)"
        value={formData.message}
        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
        className={inputClassName}
      />
      <Button type="submit" className="w-full">
        Send Enquiry
      </Button>
    </form>
  );
}
