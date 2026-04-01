import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { addLead } from "../utils/leadsStorage";

const CITIES = ["Mumbai", "Delhi", "Bangalore", "Chennai", "Hyderabad", "Pune"];

interface LeadPopupProps {
  open: boolean;
  onClose: () => void;
  bikeName: string;
  type: "offers" | "price" | "test-ride";
}

export function LeadPopup({ open, onClose, bikeName, type }: LeadPopupProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<{
    name?: string;
    phone?: string;
    city?: string;
  }>({});

  const title =
    type === "offers"
      ? "Get Exclusive Offers"
      : type === "test-ride"
        ? "Book a Test Ride"
        : "Check On-Road Price";

  const buttonText =
    type === "offers"
      ? "Get Offers Now"
      : type === "test-ride"
        ? "Book Now"
        : "Check Price";

  const successMessage =
    type === "test-ride"
      ? `Our team will contact you shortly to confirm your test ride for ${bikeName}.`
      : `Our team will contact you shortly with the best ${
          type === "offers" ? "offers" : "on-road price"
        } for ${bikeName}.`;

  function handleClose() {
    setName("");
    setPhone("");
    setCity("");
    setSubmitted(false);
    setErrors({});
    onClose();
  }

  function validate() {
    const errs: { name?: string; phone?: string; city?: string } = {};
    if (!name.trim()) errs.name = "Name is required";
    if (!/^\d{10}$/.test(phone))
      errs.phone = "Enter a valid 10-digit phone number";
    if (!city) errs.city = "Please select a city";
    return errs;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    const formType = type === "price" ? "offers" : type;
    // Save lead directly to localStorage — immediately visible in admin dashboard
    addLead(name, phone, city, bikeName, formType);
    setSubmitted(true);
  }

  return (
    <Dialog open={open} onOpenChange={(o) => !o && handleClose()}>
      <DialogContent className="sm:max-w-md" data-ocid="lead.modal">
        {!submitted ? (
          <>
            <DialogHeader>
              <DialogTitle className="text-welkee-blue text-xl">
                {title}
              </DialogTitle>
              <p className="text-sm text-gray-500 mt-1">
                {type === "test-ride"
                  ? "Schedule a test ride for"
                  : "Get the best deal on"}{" "}
                <span className="font-semibold text-gray-700">{bikeName}</span>
              </p>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4 mt-2">
              <div>
                <Label
                  htmlFor="lead-name"
                  className="text-sm font-medium text-gray-700"
                >
                  Full Name
                </Label>
                <Input
                  id="lead-name"
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1"
                  data-ocid="lead.input"
                />
                {errors.name && (
                  <p
                    className="text-xs text-red-500 mt-1"
                    data-ocid="lead.error_state"
                  >
                    {errors.name}
                  </p>
                )}
              </div>

              <div>
                <Label
                  htmlFor="lead-phone"
                  className="text-sm font-medium text-gray-700"
                >
                  Phone Number
                </Label>
                <Input
                  id="lead-phone"
                  type="tel"
                  placeholder="10-digit mobile number"
                  value={phone}
                  maxLength={10}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                  className="mt-1"
                  data-ocid="lead.input"
                />
                {errors.phone && (
                  <p
                    className="text-xs text-red-500 mt-1"
                    data-ocid="lead.error_state"
                  >
                    {errors.phone}
                  </p>
                )}
              </div>

              <div>
                <Label className="text-sm font-medium text-gray-700">
                  City
                </Label>
                <Select value={city} onValueChange={setCity}>
                  <SelectTrigger className="mt-1" data-ocid="lead.select">
                    <SelectValue placeholder="Select your city" />
                  </SelectTrigger>
                  <SelectContent>
                    {CITIES.map((c) => (
                      <SelectItem key={c} value={c}>
                        {c}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.city && (
                  <p
                    className="text-xs text-red-500 mt-1"
                    data-ocid="lead.error_state"
                  >
                    {errors.city}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full bg-welkee-orange hover:bg-welkee-orange-dark text-white font-semibold py-3 rounded-xl text-sm"
                data-ocid="lead.submit_button"
              >
                {buttonText}
              </Button>
            </form>
          </>
        ) : (
          <div
            className="flex flex-col items-center py-8 text-center"
            data-ocid="lead.success_state"
          >
            <CheckCircle2 size={56} className="text-green-500 mb-4" />
            <h3 className="text-lg font-bold text-gray-800 mb-2">Thank You!</h3>
            <p className="text-sm text-gray-500 mb-6">{successMessage}</p>
            <Button
              type="button"
              onClick={handleClose}
              className="bg-welkee-blue hover:bg-welkee-blue/90 text-white px-8 rounded-full"
              data-ocid="lead.close_button"
            >
              Close
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
