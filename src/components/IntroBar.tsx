import { Mail, Copy, Check } from 'lucide-react';
import { useState } from 'react';
import { Button } from './ui/button';

export function IntroBar() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText('info@mikeynu.com');
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy email:', err);
    }
  };

  return (
    <div className="py-12 bg-card border-y border-border">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="text-center lg:text-left">
            <h2 className="text-lg text-foreground mb-2">
              <span className="font-semibold">Michael Ndhlovu</span> — Multi-Disciplinary Designer & Developer
            </h2>
            <p className="text-muted-foreground text-sm">
              3D Experience Designer (3+ yrs) | 3D Generalist (7+ yrs) | Web/Software Dev (5+ yrs) | XR Creator
            </p>
            <p className="text-muted-foreground text-xs mt-1">
              Remote work via Teams or Google Meet
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-4 py-2 bg-muted rounded-lg">
              <Mail size={16} className="text-muted-foreground" />
              <span className="text-sm font-medium">info@michaelnu.co.za</span>
            </div>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={copyEmail}
              className="h-10 w-10"
            >
              {copied ? (
                <Check size={16} className="text-green-500" />
              ) : (
                <Copy size={16} />
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}