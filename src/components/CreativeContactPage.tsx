import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Check, Copy, Send } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { openCalendly } from '../config/calendly';

const projectTypes = [
  'Exhibition stands and trade show booths',
  'Branded vehicle experiences and wraps',
  'Event venues and pop-up activations',
  'Retail spaces and showrooms',
  'Gaming and entertainment IP experiences',
  'Corporate environments and conference spaces'
];

type SubmissionStatus = 'idle' | 'success' | 'error';

export function CreativeContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    budget: '',
    timeline: '',
    message: ''
  });
  const [copied, setCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState<SubmissionStatus>('idle');

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText('info@mikeynu.com');
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy email:', error);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);
    setSubmissionStatus('idle');

    try {
      await emailjs.send(
        'service_93dsf5v',
        'template_v7erfgb',
        {
          from_name: formData.name,
          from_email: formData.email,
          company: formData.company || 'Not specified',
          budget: formData.budget || 'Not specified',
          timeline: formData.timeline || 'Not specified',
          message: formData.message,
          to_email: 'info@mikeynu.com'
        },
        'BJTOZ_dR6DYQVbT6h'
      );

      await emailjs.send(
        'service_93dsf5v',
        'template_1x3epo3',
        {
          from_name: formData.name,
          from_email: formData.email,
          company: formData.company || 'Not specified',
          budget: formData.budget || 'Not specified',
          timeline: formData.timeline || 'Not specified',
          message: formData.message
        },
        'BJTOZ_dR6DYQVbT6h'
      );

      setFormData({
        name: '',
        email: '',
        company: '',
        budget: '',
        timeline: '',
        message: ''
      });
      setSubmissionStatus('success');
    } catch (error) {
      console.error('Failed to send message:', error);
      setSubmissionStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData((current) => ({ ...current, [field]: value }));
    if (submissionStatus !== 'idle') {
      setSubmissionStatus('idle');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-4">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground">Contact</h1>
            </div>
            <div className="lg:col-span-8">
              <p className="text-lg text-muted-foreground leading-relaxed">
                Send the project scope, timing and source material you already have. For spatial and 3D work, plans, brand guidelines, reference images and target deliverables are especially useful.
              </p>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <aside className="lg:col-span-4">
            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-foreground mb-6">Direct contact</h2>

              <div className="border-t border-border py-5">
                <p className="text-sm text-muted-foreground mb-1">Email</p>
                <div className="flex items-center justify-between gap-4">
                  <a href="mailto:info@mikeynu.com" className="font-medium text-foreground hover:text-accent transition-colors">
                    info@mikeynu.com
                  </a>
                  <Button type="button" variant="ghost" size="sm" onClick={copyEmail} aria-label="Copy email address">
                    {copied ? <Check size={16} /> : <Copy size={16} />}
                    <span className="ml-2">{copied ? 'Copied' : 'Copy'}</span>
                  </Button>
                </div>
              </div>

              <div className="border-t border-border py-5">
                <p className="text-sm text-muted-foreground mb-1">WhatsApp</p>
                <a
                  href="https://wa.me/27659001045"
                  target="_blank"
                  rel="noreferrer"
                  className="font-medium text-foreground hover:text-accent transition-colors"
                >
                  Open WhatsApp
                </a>
              </div>

              <div className="border-t border-border py-5">
                <p className="text-sm text-muted-foreground mb-3">Intro call</p>
                <Button type="button" variant="outline" onClick={openCalendly}>Book a 15-minute call</Button>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">Project fit</h2>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                Current portfolio work includes the following project types.
              </p>
              <div>
                {projectTypes.map((projectType) => (
                  <div key={projectType} className="border-t border-border py-4 text-sm text-foreground">
                    {projectType}
                  </div>
                ))}
              </div>
            </section>
          </aside>

          <section className="lg:col-span-8">
            <div className="border-t border-border pt-8">
              <h2 className="text-3xl font-semibold text-foreground mb-2">Project inquiry</h2>
              <p className="text-muted-foreground mb-8">Fields marked with an asterisk are required.</p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contact-name" className="block text-sm font-medium text-foreground mb-2">Name *</label>
                    <Input
                      id="contact-name"
                      required
                      value={formData.name}
                      onChange={(event) => handleInputChange('name', event.target.value)}
                      placeholder="Your full name"
                      autoComplete="name"
                      className="min-h-[48px] text-base"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-email" className="block text-sm font-medium text-foreground mb-2">Email *</label>
                    <Input
                      id="contact-email"
                      required
                      type="email"
                      value={formData.email}
                      onChange={(event) => handleInputChange('email', event.target.value)}
                      placeholder="your@email.com"
                      autoComplete="email"
                      inputMode="email"
                      className="min-h-[48px] text-base"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-company" className="block text-sm font-medium text-foreground mb-2">Company</label>
                  <Input
                    id="contact-company"
                    value={formData.company}
                    onChange={(event) => handleInputChange('company', event.target.value)}
                    placeholder="Your company or agency"
                    autoComplete="organization"
                    className="min-h-[48px] text-base"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Budget range</label>
                    <Select value={formData.budget} onValueChange={(value) => handleInputChange('budget', value)}>
                      <SelectTrigger className="min-h-[48px] text-base">
                        <SelectValue placeholder="Select budget range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="under-5k">Under $5,000</SelectItem>
                        <SelectItem value="5k-15k">$5,000 - $15,000</SelectItem>
                        <SelectItem value="15k-30k">$15,000 - $30,000</SelectItem>
                        <SelectItem value="30k-plus">$30,000+</SelectItem>
                        <SelectItem value="discuss">Let's discuss</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Timeline</label>
                    <Select value={formData.timeline} onValueChange={(value) => handleInputChange('timeline', value)}>
                      <SelectTrigger className="min-h-[48px] text-base">
                        <SelectValue placeholder="Project timeline" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="urgent">ASAP (Rush)</SelectItem>
                        <SelectItem value="1-2weeks">1-2 weeks</SelectItem>
                        <SelectItem value="1month">1 month</SelectItem>
                        <SelectItem value="2-3months">2-3 months</SelectItem>
                        <SelectItem value="flexible">Flexible</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-details" className="block text-sm font-medium text-foreground mb-2">Project details *</label>
                  <Textarea
                    id="contact-details"
                    required
                    value={formData.message}
                    onChange={(event) => handleInputChange('message', event.target.value)}
                    placeholder="Describe the project, the experience you need to create, the source material available and the intended deliverables."
                    rows={7}
                    className="resize-none min-h-[120px] text-base"
                  />
                </div>

                <div aria-live="polite">
                  {submissionStatus === 'success' && (
                    <p className="text-sm text-foreground border-t border-border pt-4">
                      Your inquiry was sent successfully. The submitted project details have been received.
                    </p>
                  )}
                  {submissionStatus === 'error' && (
                    <p className="text-sm text-destructive border-t border-border pt-4" role="alert">
                      The form could not send your inquiry. Please email info@mikeynu.com directly instead.
                    </p>
                  )}
                </div>

                <Button type="submit" size="lg" disabled={isSubmitting}>
                  <Send size={16} className="mr-2" />
                  {isSubmitting ? 'Sending inquiry...' : 'Send project inquiry'}
                </Button>
              </form>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
