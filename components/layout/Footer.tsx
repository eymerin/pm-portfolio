export default function Footer() {
  return (
    <footer className="border-t border-site-border/20 mt-24">
      <div className="max-w-5xl mx-auto px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-site-muted">Garrett Young | Product Manager</p>
        <div className="flex items-center gap-6 text-sm text-site-muted">
          <a href="mailto:garrett.bryce.young@gmail.com" className="hover:text-site-ink transition-colors">
            garrett.bryce.young@gmail.com
          </a>
          <a href="https://linkedin.com/in/garrettyoung" target="_blank" rel="noopener noreferrer" className="hover:text-site-ink transition-colors">
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}
