import { useState } from 'react';
import { ArrowRight, Check, Copy } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { openCalendly } from '../config/calendly';
import { contactProjectTypes, pageIndex } from '../data/portfolioContent';
import { RENDERS } from '../data/renderAssets';

type SubmissionStatus = 'idle' | 'success' | 'error';

const scopeOptions = [
  'Scope to be defined',
  'Focused single deliverable',
  'Multi-deliverable project',
  'End-to-end build',
  'Let us discuss'
];

export function CreativeContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: '',
    budget: '',
    message: ''
  });
  const [copied, setCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState<SubmissionStatus>('idle');

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData((current) => ({ ...current, [field]: value }));
    if (submissionStatus !== 'idle') {
      setSubmissionStatus('idle');
    }
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText('info@mikeynu.com');
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch (error) {
      console.error('Failed to copy email:', error);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setSubmissionStatus('idle');

    const templateData = {
      from_name: formData.name,
      from_email: formData.email,
      company: formData.projectType,
      budget: formData.budget,
      timeline: 'Not specified',
      message: formData.message,
      to_email: 'info@mikeynu.com'
    };

    try {
      await emailjs.send('service_93dsf5v', 'template_v7erfgb', templateData, 'BJTOZ_dR6DYQVbT6h');
      await emailjs.send('service_93dsf5v', 'template_1x3epo3', templateData, 'BJTOZ_dR6DYQVbT6h');

      setFormData({ name: '', email: '', projectType: '', budget: '', message: '' });
      setSubmissionStatus('success');
    } catch (error) {
      console.error('Failed to send message:', error);
      setSubmissionStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="cinematic-page contact-page">
      <div className="cinematic-container contact-layout">
        <section className="contact-intro" aria-labelledby="contact-title">
          <p className="cinematic-kicker">Contact / Inquiry</p>
          <h1 id="contact-title" className="cinematic-display contact-heading">
            Let&apos;s craft<br />something real.
          </h1>
          <p className="cinematic-copy contact-copy">
            Bring the brief, idea, problem, or source material. I work across software development, 3D design and visualization, and VR solutions, including multidisciplinary projects that need more than one of those disciplines.
          </p>

          <img className="contact-art theme-img-dark" src={RENDERS.services4} alt="" aria-hidden="true" />
          <img className="contact-art theme-img-light" src={RENDERS.services4Light} alt="" aria-hidden="true" />

          <div className="contact-direct-grid" role="group" aria-label="Direct contact options">
            <div className="contact-direct-item">
              <p className="contact-direct-label">Email</p>
              <a className="contact-direct-value" href="mailto:info@mikeynu.com">info@mikeynu.com</a>
              <button type="button" className="contact-direct-value contact-copy-control" onClick={copyEmail}>
                {copied ? <Check size={14} aria-hidden="true" /> : <Copy size={14} aria-hidden="true" />}
                {' '}{copied ? 'Copied' : 'Copy address'}
              </button>
            </div>
            <div className="contact-direct-item">
              <p className="contact-direct-label">WhatsApp</p>
              <a className="contact-direct-value" href="https://wa.me/27659001045" target="_blank" rel="noreferrer">
                Open WhatsApp
              </a>
            </div>
            <div className="contact-direct-item">
              <p className="contact-direct-label">Intro call</p>
              <button type="button" className="contact-direct-value" onClick={openCalendly}>
                Book 15 minutes
              </button>
            </div>
          </div>
        </section>

        <section className="contact-form-panel" aria-labelledby="inquiry-form-title">
          <h2 id="inquiry-form-title" className="contact-form-heading">Tell me about your project</h2>

          <form onSubmit={handleSubmit}>
            <div className="contact-form-row">
              <div className="contact-field">
                <label className="contact-label" htmlFor="contact-name">Full name <span>*</span></label>
                <input
                  id="contact-name"
                  className="contact-input"
                  type="text"
                  value={formData.name}
                  onChange={(event) => handleInputChange('name', event.target.value)}
                  placeholder="Your name"
                  autoComplete="name"
                  required
                />
              </div>

              <div className="contact-field">
                <label className="contact-label" htmlFor="contact-email">Email address <span>*</span></label>
                <input
                  id="contact-email"
                  className="contact-input"
                  type="email"
                  value={formData.email}
                  onChange={(event) => handleInputChange('email', event.target.value)}
                  placeholder="you@company.com"
                  autoComplete="email"
                  inputMode="email"
                  required
                />
              </div>
            </div>

            <div className="contact-field-full">
              <label className="contact-label" htmlFor="contact-project-type">Project type <span>*</span></label>
              <select
                id="contact-project-type"
                className="contact-select"
                value={formData.projectType}
                onChange={(event) => handleInputChange('projectType', event.target.value)}
                required
              >
                <option value="" disabled>Select project type</option>
                {contactProjectTypes.map((projectType) => (
                  <option key={projectType} value={projectType}>{projectType}</option>
                ))}
              </select>
            </div>

            <div className="contact-field-full">
              <label className="contact-label" htmlFor="contact-budget">Budget or scope <span>*</span></label>
              <select
                id="contact-budget"
                className="contact-select"
                value={formData.budget}
                onChange={(event) => handleInputChange('budget', event.target.value)}
                required
              >
                <option value="" disabled>Select your current project scope</option>
                {scopeOptions.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>

            <div className="contact-field-full">
              <label className="contact-label" htmlFor="contact-details">Tell me more about your project <span>*</span></label>
              <textarea
                id="contact-details"
                className="contact-textarea"
                value={formData.message}
                onChange={(event) => handleInputChange('message', event.target.value)}
                placeholder="Share goals, requirements, references, source material, or anything else that helps define the work."
                required
              />
            </div>

            {submissionStatus !== 'idle' && (
              <p
                className="contact-status"
                data-status={submissionStatus}
                role={submissionStatus === 'error' ? 'alert' : undefined}
                aria-live="polite"
              >
                {submissionStatus === 'success'
                  ? 'Your inquiry was sent successfully.'
                  : 'The form could not send your inquiry. Please email info@mikeynu.com directly.'}
              </p>
            )}

            <div className="contact-submit-wrap">
              <button type="submit" className="cinematic-primary-action" disabled={isSubmitting}>
                <span>{isSubmitting ? 'Sending inquiry...' : 'Send inquiry'}</span>
                <ArrowRight size={16} aria-hidden="true" />
              </button>
            </div>
          </form>
        </section>
      </div>

      <div className="cinematic-container contact-page-footer">
        <span className="cinematic-footer-meta">© {new Date().getFullYear()} Michael Ndhlovu</span>
        <span className="cinematic-page-index">{pageIndex.contact.replace('/ ', '')}</span>
      </div>
    </div>
  );
}
