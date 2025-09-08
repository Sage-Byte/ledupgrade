const SiteFooter = () => {
  return (
    <footer className="border-t mt-8">
      <div className="container px-4 py-8 text-sm text-muted-foreground flex flex-col sm:flex-row items-center justify-between gap-4">
        <p>© {new Date().getFullYear()} EV Charger Installation — Get Your Custom Quote. All rights reserved.</p>
        <nav className="flex items-center gap-4">
          <a href="#quiz" className="hover:underline">Panel Check</a>
          <a href="#" className="hover:underline">Privacy</a>
          <a href="#" className="hover:underline">Terms</a>
        </nav>
      </div>
    </footer>
  );
};

export default SiteFooter;
