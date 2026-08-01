"use client";

import { useState, useEffect } from "react";
import emailjs from "@emailjs/browser";
import { Linkedin, Mail, ArrowRight } from "lucide-react";
import SectionLabel from "@/components/ui/SectionLabel";
import FillText from "@/components/ui/FillText";
import Button from "@/components/ui/Button";

interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const CONTACT_INFO = [
  {
    label: "Email",
    value: "fgclavano@gmail.com",
    link: "mailto:fgclavano@gmail.com",
  },
  { label: "Phone", value: "0966 453 2948", link: "tel:+639664532948" },
  {
    label: "Location",
    value: "Salay, Misamis Oriental, Philippines",
    link: undefined,
  },
];

const SOCIAL_LINKS = [
  {
    name: "LinkedIn",
    icon: Linkedin,
    url: "https://www.linkedin.com/in/florante-clavano-jr-39344a190",
  },
  { name: "Email", icon: Mail, url: "mailto:fgclavano@gmail.com" },
];

const FIELD_CLASS =
  "w-full border-b border-line bg-transparent py-3 text-lg text-accent placeholder:text-faint transition-colors duration-300 focus:border-signal focus:outline-none";

const Contact = () => {
  const [formData, setFormData] = useState<ContactForm>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  // Initialize EmailJS
  useEffect(() => {
    emailjs.init(process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "");
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    // Validate required fields
    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.subject.trim() ||
      !formData.message.trim()
    ) {
      setSubmitStatus("error");
      setIsSubmitting(false);
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setSubmitStatus("error");
      setIsSubmitting(false);
      return;
    }

    try {
      // Check if EmailJS is properly configured
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

      if (!serviceId || !templateId || !publicKey) {
        throw new Error(
          "EmailJS configuration is missing. Please check your environment variables."
        );
      }

      // Send email using EmailJS
      const result = await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: formData.name.trim(),
          from_email: formData.email.trim(),
          subject: formData.subject.trim(),
          message: formData.message.trim(),
          to_email: "fgclavano@gmail.com", // Your email address
        },
        publicKey
      );

      if (result.status === 200) {
        setSubmitStatus("success");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        throw new Error("Failed to send email");
      }
    } catch (error) {
      console.error("Email sending failed:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="pb-section">
      <div className="container-x">
        <SectionLabel>Contact</SectionLabel>

        <h3 className="slide-up-and-fade display mb-20 max-w-4xl text-6xl leading-[0.9] md:text-8xl">
          <FillText>Let&apos;s build something</FillText>
        </h3>

        <div className="grid gap-16 lg:grid-cols-[minmax(0,380px)_minmax(0,1fr)] lg:gap-24">
          <div>
            <p className="slide-up-and-fade text-lg leading-relaxed text-muted">
              I&apos;m always interested in hearing about new opportunities,
              interesting projects, or just having a chat about technology.
            </p>

            <dl className="mt-12 space-y-8">
              {CONTACT_INFO.map((info) => (
                <div key={info.label} className="slide-up">
                  <dt className="text-xs uppercase tracking-[0.15em] text-faint">
                    {info.label}
                  </dt>
                  <dd className="mt-2 text-lg text-body">
                    {info.link ? (
                      <a
                        href={info.link}
                        className="transition-colors duration-300 hover:text-signal"
                      >
                        {info.value}
                      </a>
                    ) : (
                      info.value
                    )}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="slide-up mt-12 flex gap-4">
              {SOCIAL_LINKS.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                    className="flex h-12 w-12 items-center justify-center border border-line text-body transition-colors duration-300 hover:border-signal hover:bg-signal hover:text-canvas"
                  >
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </a>
                );
              })}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="slide-up-and-fade" noValidate>
            <div className="grid gap-8 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="name"
                  className="text-xs uppercase tracking-[0.15em] text-faint"
                >
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  placeholder="Your name"
                  className={FIELD_CLASS}
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="text-xs uppercase tracking-[0.15em] text-faint"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  placeholder="your.email@example.com"
                  className={FIELD_CLASS}
                />
              </div>
            </div>

            <div className="mt-8">
              <label
                htmlFor="subject"
                className="text-xs uppercase tracking-[0.15em] text-faint"
              >
                Subject
              </label>
              <input
                id="subject"
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                required
                placeholder="What's this about?"
                className={FIELD_CLASS}
              />
            </div>

            <div className="mt-8">
              <label
                htmlFor="message"
                className="text-xs uppercase tracking-[0.15em] text-faint"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                value={formData.message}
                onChange={handleInputChange}
                required
                placeholder="Tell me about your project"
                className={`${FIELD_CLASS} resize-none`}
              />
            </div>

            <Button type="submit" disabled={isSubmitting} className="mt-10">
              {isSubmitting ? "Sending…" : "Send Message"}
              <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </Button>

            <p aria-live="polite" className="mt-6 text-sm">
              {submitStatus === "success" && (
                <span className="text-signal">
                  Message sent. I&apos;ll get back to you shortly.
                </span>
              )}
              {submitStatus === "error" && (
                <span className="text-muted">
                  Something went wrong. Check the fields and try again, or email
                  me directly at fgclavano@gmail.com.
                </span>
              )}
            </p>
          </form>
        </div>

        <footer className="mt-32 flex flex-col gap-4 border-t border-line pt-8 text-sm text-faint sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Florante G. Clavano Jr.</p>
          <p>Electronics &amp; Communications Engineer turned Software Engineer</p>
        </footer>
      </div>
    </section>
  );
};

export default Contact;
