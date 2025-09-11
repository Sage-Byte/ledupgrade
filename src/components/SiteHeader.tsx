
import electricMedicLogo from "@/assets/electric-medic-logo.webp";

export default function SiteHeader() {
  return (
    <header className="absolute inset-x-0 top-0 z-40 bg-white/95 backdrop-blur-sm">
      <nav className="container flex items-center justify-center px-4 py-2" aria-label="Main">
        <a href="https://mrelectricmedic.com/" className="inline-flex items-center gap-2" aria-label="Electric Medic home" target="_blank" rel="noopener noreferrer">
          <img
            src={electricMedicLogo}
            alt="Electric Medic logo"
            width="220"
            height="64"
            loading="eager"
            decoding="async"
            className="h-12 sm:h-14 w-auto"
          />
        </a>
      </nav>
    </header>
  );
}
