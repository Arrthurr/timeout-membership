"use client";

import { useState } from "react";
import { useMutation, useAction } from "convex/react";
import { CheckCircle, Loader2 } from "lucide-react";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Textarea } from "~/components/ui/textarea";
import { api } from "../../../convex/_generated/api";

interface WaitlistDialogProps {
  planName: string;
  children: React.ReactNode;
}

export function WaitlistDialog({ planName, children }: WaitlistDialogProps) {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const submitInquiry = useMutation(api.waitlist.submitWaitlistInquiry);
  const sendNotification = useAction(api.waitlistEmail.sendWaitlistNotification);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // Submit to database
      await submitInquiry({
        name: formData.name,
        email: formData.email,
        phone: formData.phone || undefined,
        message: formData.message || undefined,
        planName,
      });

      // Send email notification (fire and forget - don't block on this)
      sendNotification({
        name: formData.name,
        email: formData.email,
        phone: formData.phone || undefined,
        message: formData.message || undefined,
        planName,
      }).catch(console.error);

      setIsSuccess(true);
    } catch (err) {
      console.error("Failed to submit waitlist inquiry:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
    // Reset state when dialog closes
    if (!newOpen) {
      setTimeout(() => {
        setIsSuccess(false);
        setError(null);
        setFormData({ name: "", email: "", phone: "", message: "" });
      }, 200);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        {isSuccess ? (
          // Success State
          <div className="flex flex-col items-center text-center py-6">
            <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
            <DialogHeader className="items-center">
              <DialogTitle className="text-2xl">
                Thank you for your interest!
              </DialogTitle>
              <DialogDescription className="text-base mt-2">
                We've received your inquiry for {planName}. A member of our team
                will be in touch soon to discuss this exclusive membership
                opportunity.
              </DialogDescription>
            </DialogHeader>
            <Button
              className="mt-6"
              onClick={() => handleOpenChange(false)}
            >
              Close
            </Button>
          </div>
        ) : (
          // Form State
          <>
            <DialogHeader>
              <DialogTitle>Join the Waitlist</DialogTitle>
              <DialogDescription>
                Interested in {planName}? Fill out the form below and we'll be
                in touch about this exclusive membership tier.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="John Smith"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                  disabled={isSubmitting}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  required
                  disabled={isSubmitting}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone (optional)</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="(312) 555-1234"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  disabled={isSubmitting}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">
                  Why are you interested in {planName}? (optional)
                </Label>
                <Textarea
                  id="message"
                  placeholder="Tell us a bit about yourself..."
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  disabled={isSubmitting}
                  rows={3}
                />
              </div>

              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                  <p className="text-red-800 text-sm">{error}</p>
                </div>
              )}

              <Button
                type="submit"
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Submit Inquiry"
                )}
              </Button>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
