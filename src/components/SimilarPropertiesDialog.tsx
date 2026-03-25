import { useState } from "react";
import { Check, Bed, Bath, MapPin } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";

interface SimilarProperty {
  id: number;
  image: string;
  price: string;
  address: string;
  parish: string;
  beds: number;
  baths: number;
}

interface SimilarPropertiesDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  properties: SimilarProperty[];
  enquirerName: string;
}

export function SimilarPropertiesDialog({ open, onOpenChange, properties, enquirerName }: SimilarPropertiesDialogProps) {
  const [selected, setSelected] = useState<Set<number>>(new Set(properties.map(p => p.id)));

  const toggle = (id: number) => {
    setSelected(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleSubmit = () => {
    if (selected.size === 0) {
      onOpenChange(false);
      return;
    }
    toast.success(`Enquiry sent for ${selected.size} additional ${selected.size === 1 ? "property" : "properties"}!`);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Check className="w-5 h-5 text-accent" />
            Enquiry Sent!
          </DialogTitle>
          <DialogDescription>
            {enquirerName ? `Great news ${enquirerName}!` : "Great news!"} We found similar properties nearby. Want to enquire about these too? One click — we already have your details.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3 mt-2">
          {properties.map((property) => (
            <label
              key={property.id}
              className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                selected.has(property.id)
                  ? "border-accent bg-accent/5"
                  : "border-border hover:border-accent/30"
              }`}
            >
              <Checkbox
                checked={selected.has(property.id)}
                onCheckedChange={() => toggle(property.id)}
              />
              <img
                src={property.image}
                alt={property.address}
                className="w-16 h-12 rounded-lg object-cover flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-foreground text-sm">{property.price}</p>
                <p className="text-sm text-foreground truncate">{property.address}</p>
                <div className="flex items-center gap-3 text-xs text-muted-foreground mt-0.5">
                  <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{property.parish}</span>
                  <span className="flex items-center gap-1"><Bed className="w-3 h-3" />{property.beds}</span>
                  <span className="flex items-center gap-1"><Bath className="w-3 h-3" />{property.baths}</span>
                </div>
              </div>
            </label>
          ))}
        </div>

        <div className="flex gap-3 mt-4">
          <Button variant="outline" className="flex-1" onClick={() => onOpenChange(false)}>
            No thanks
          </Button>
          <Button className="flex-1" onClick={handleSubmit} disabled={selected.size === 0}>
            Enquire on {selected.size} {selected.size === 1 ? "property" : "properties"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
