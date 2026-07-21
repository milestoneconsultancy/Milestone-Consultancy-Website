import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Mail, MapPin, Phone, Clock, Send, CheckCircle2 } from "lucide-react";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { company } from "@/config/company";
import emailjs from "@emailjs/browser";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: `Contact | ${company.name}` },
      {
        name: "description",
        content: `Get in touch with ${company.name}. Phone: ${company.contact.phone}. Email: ${company.contact.email}. Based in Kalyan, Maharashtra, India.`,
      },
      { property: "og:title", content: `Contact | ${company.name}` },
      {
        property: "og:description",
        content: "Reach the Milestone Consultancy team.",
      },
    ],
  }),
  component: ContactPage,
});

const contactSchema = z.object({
  name: z.string().min(2, "Please enter your name"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().optional(),
  subject: z.string().min(2, "Please add a subject"),
  message: z.string().min(10, "Message should be at least 10 characters"),
});
type ContactForm = z.infer<typeof contactSchema>;

function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactForm>({ resolver: zodResolver(contactSchema) });

  const onSubmit = async (data: ContactForm) => {
    setError("");

    try {
      // ✅ EmailJS Configuration
      const templateParams = {
        from_name: data.name,
        from_email: data.email,
        phone: data.phone || "Not provided",
        subject: data.subject,
        message: data.message,
      };

      // Send email using EmailJS
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        templateParams,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      setSubmitted(true);
      reset();

      // Auto reset after 5 seconds
      setTimeout(() => {
        setSubmitted(false);
      }, 5000);

    } catch (err) {
      console.error("Email sending failed:", err);
      setError("Failed to send message. Please try again or contact us directly.");
    }
  };

  const cards = [
    {
      icon: Phone,
      label: "Call",
      value: company.contact.phone,
      href: company.contact.phoneHref,
    },
    {
      icon: Mail,
      label: "Email",
      value: company.contact.email,
      href: company.contact.emailHref,
    },
    {
      icon: MapPin,
      label: "Visit",
      value: `${company.address.line1}, ${company.address.line2}`,
      href: company.googleMapsUrl,
    },
  ];

  return (
    <SiteLayout>
      <section className="pt-16 pb-14 lg:pt-24 lg:pb-20 bg-[color:var(--color-brand-navy)] text-white">
        <div className="container-page max-w-3xl">
          <span className="eyebrow text-[color:var(--color-brand-orange)]">
            Contact
          </span>
          <h1 className="mt-4 font-display text-4xl sm:text-5xl lg:text-6xl font-semibold text-balance leading-[1.05]">
            Let's talk about your next project.
          </h1>
          <p className="mt-6 text-white/75 text-base sm:text-lg max-w-2xl">
            Whether you're planning a new highway, an infrastructure programme
            or a building project — our team would be glad to help.
          </p>
        </div>
      </section>

      <section className="py-16 lg:py-20">
        <div className="container-page grid gap-6 md:grid-cols-3">
          {cards.map((c, i) => {
            const Icon = c.icon;
            return (
              <motion.a
                key={c.label}
                href={c.href}
                target={c.label === "Visit" ? "_blank" : undefined}
                rel={c.label === "Visit" ? "noreferrer" : undefined}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="group rounded-2xl border border-border bg-card p-7 hover:shadow-[var(--shadow-elegant)] hover:border-[color:var(--color-brand-orange)]/40 transition-all"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[color:var(--color-brand-navy)]/5 text-[color:var(--color-brand-navy)] group-hover:bg-[color:var(--color-brand-orange)] group-hover:text-white transition-colors">
                  <Icon className="h-6 w-6" />
                </div>
                <div className="mt-5 eyebrow">{c.label}</div>
                <div className="mt-1 font-medium text-[color:var(--color-brand-navy)] break-words">
                  {c.value}
                </div>
              </motion.a>
            );
          })}
        </div>
      </section>

      <section className="pb-24">
        <div className="container-page grid gap-10 lg:grid-cols-[1.2fr_1fr]">
          <div className="rounded-3xl border border-border bg-card p-8 sm:p-12">
            <SectionHeader
              eyebrow="Send a Message"
              title="Tell us about your project."
              description="Share a few details and our team will get back to you within one business day."
            />
            {submitted ? (
              <div className="mt-10 rounded-2xl border border-[color:var(--color-brand-orange)]/30 bg-[color:var(--color-brand-orange)]/5 p-6 flex gap-4 items-start">
                <CheckCircle2 className="h-6 w-6 text-[color:var(--color-brand-orange)] mt-0.5" />
                <div>
                  <div className="font-semibold text-[color:var(--color-brand-navy)]">
                    Thank you — your message has been received.
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    We'll respond to your enquiry shortly.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-4 text-sm font-medium text-[color:var(--color-brand-navy)] underline underline-offset-4"
                  >
                    Send another message
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="mt-8 grid gap-5">
                {error && (
                  <div className="rounded-lg bg-red-50 p-4 text-sm text-red-600 border border-red-200">
                    {error}
                  </div>
                )}
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <Label htmlFor="name">Full name</Label>
                    <Input id="name" className="mt-2" {...register("name")} />
                    {errors.name && (
                      <p className="text-xs text-destructive mt-1">
                        {errors.name.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" className="mt-2" {...register("email")} />
                    {errors.email && (
                      <p className="text-xs text-destructive mt-1">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <Label htmlFor="phone">Phone (optional)</Label>
                    <Input id="phone" className="mt-2" {...register("phone")} />
                  </div>
                  <div>
                    <Label htmlFor="subject">Subject</Label>
                    <Input id="subject" className="mt-2" {...register("subject")} />
                    {errors.subject && (
                      <p className="text-xs text-destructive mt-1">
                        {errors.subject.message}
                      </p>
                    )}
                  </div>
                </div>
                <div>
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    className="mt-2 min-h-32"
                    {...register("message")}
                  />
                  {errors.message && (
                    <p className="text-xs text-destructive mt-1">
                      {errors.message.message}
                    </p>
                  )}
                </div>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="mt-2 rounded-full bg-[color:var(--color-brand-orange)] hover:bg-[color:var(--color-brand-orange)]/90 text-white h-12 w-full sm:w-auto sm:px-8"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                  <Send className="ml-2 h-4 w-4" />
                </Button>
              </form>
            )}
          </div>

          <div className="flex flex-col gap-6">
            <div className="rounded-3xl border border-border bg-[color:var(--color-brand-navy)] text-white p-8">
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-[color:var(--color-brand-orange)]" />
                <h3 className="font-display text-lg font-semibold">
                  Working Hours
                </h3>
              </div>
              <ul className="mt-5 space-y-3 text-sm">
                {company.workingHours.map((w) => (
                  <li
                    key={w.days}
                    className="flex justify-between border-b border-white/10 pb-3 last:border-0"
                  >
                    <span className="text-white/80">{w.days}</span>
                    <span className="font-medium">{w.hours}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-3xl overflow-hidden border border-border aspect-[4/3] lg:aspect-auto lg:flex-1 min-h-[280px] bg-muted">
              <iframe
                title="Milestone Consultancy location"
                src={company.googleMapsEmbed}
                className="w-full h-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}