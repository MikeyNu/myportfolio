interface CreativeFooterProps {
  onPageChange: (page: string) => void;
}

const footerNavigation = [
  { id: 'projects', label: 'Work' },
  { id: 'services', label: 'Services' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' }
];

export function CreativeFooter({ onPageChange }: CreativeFooterProps) {
  return (
    <footer className="cinematic-footer">
      <div className="cinematic-container cinematic-footer-inner">
        <div className="cinematic-footer-identity">
          <span className="cinematic-footer-name">Mikey Nu</span>
          <span className="cinematic-footer-meta">© {new Date().getFullYear()} Michael Ndhlovu. All rights reserved.</span>
        </div>

        <nav className="cinematic-footer-nav" aria-label="Footer navigation">
          {footerNavigation.map((item) => (
            <button key={item.id} type="button" onClick={() => onPageChange(item.id)}>
              {item.label}
            </button>
          ))}
          <a href="mailto:info@mikeynu.com">info@mikeynu.com</a>
        </nav>
      </div>
    </footer>
  );
}
