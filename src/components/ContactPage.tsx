import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Mail, Calendar, Copy, Check, Send } from 'lucide-react';

export function ContactPage() {
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

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText('info@mikeynu.com');
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy email:', err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log('Form submitted:', formData);
    setIsSubmitting(false);
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      company: '',
      budget: '',
      timeline: '',
      message: ''
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Let's Work Together
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Ready to bring your brand experience to life in 3D? 
            Let's discuss your project and explore creative possibilities.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Mail className="text-accent" size={24} />
                  Direct Contact
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between p-4 bg-muted rounded-lg mb-4">
                  <span className="font-medium">info@mikeynu.com</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={copyEmail}
                  >
                    {copied ? (
                      <Check size={16} className="text-green-500" />
                    ) : (
                      <Copy size={16} />
                    )}
                  </Button>
                </div>
                <p className="text-muted-foreground text-sm">
                  Email me directly for quick questions or project inquiries. 
                  I typically respond within 24 hours.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Calendar className="text-accent" size={24} />
                  Schedule a Call
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Button className="w-full mb-4">
                  Request a Teams/Google Meet Call
                </Button>
                <p className="text-muted-foreground text-sm">
                  Book a 15-minute intro call to discuss your project requirements 
                  and see if we're a good fit for collaboration.
                </p>
              </CardContent>
            </Card>

            {/* Project Types */}
            <div>
              <h3 className="font-semibold text-foreground mb-4">
                Project Types I Work On
              </h3>
              <div className="space-y-3">
                {[
                  'Exhibition stands and trade show booths',
                  'Branded vehicle experiences and wraps',
                  'Event venues and pop-up activations',
                  'Retail spaces and showrooms',
                  'Gaming and entertainment IP experiences',
                  'Corporate environments and conference spaces'
                ].map((type, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-accent rounded-full" />
                    <span className="text-muted-foreground text-sm">{type}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle>Project Inquiry Form</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Name *
                    </label>
                    <Input
                      required
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Email *
                    </label>
                    <Input
                      required
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Company
                  </label>
                  <Input
                    value={formData.company}
                    onChange={(e) => handleInputChange('company', e.target.value)}
                    placeholder="Your company or agency"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Budget Range
                    </label>
                    <Select onValueChange={(value) => handleInputChange('budget', value)}>
                      <SelectTrigger>
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
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Timeline
                    </label>
                    <Select onValueChange={(value) => handleInputChange('timeline', value)}>
                      <SelectTrigger>
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
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Project Details *
                  </label>
                  <Textarea
                    required
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    placeholder="Tell me about your project: What kind of experience are you looking to create? Do you have brand guidelines, floor plans, or reference materials? What are your main objectives?"
                    rows={6}
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    'Sending...'
                  ) : (
                    <>
                      <Send size={16} className="mr-2" />
                      Send Project Inquiry
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Response Time */}
        <div className="text-center mt-12 p-6 bg-muted/50 rounded-lg">
          <p className="text-muted-foreground">
            <strong>Typical Response Time:</strong> Within 24 hours for email inquiries. 
            For urgent projects, please mention "URGENT" in your subject line.
          </p>
        </div>
      </div>
    </div>
  );
}