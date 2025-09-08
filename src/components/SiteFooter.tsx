const SiteFooter = () => {
  return (
    <footer className="border-t mt-8">
      <div className="container px-4 py-8 text-sm text-muted-foreground flex flex-col sm:flex-row items-center justify-between gap-4">
        <p>© {new Date().getFullYear()} LED Upgrade Savings — Calculate Your Annual Savings. All rights reserved.</p>
        <nav className="flex items-center gap-4">
          <a href="#quiz" className="hover:underline">Panel Check</a>
          <a href="#" className="hover:underline">Privacy</a>
          <a href="#" className="hover:underline">Terms</a>
          <a href="https://mrelectricmedic.com" className="hover:underline">mrelectricmedic.com</a>
        </nav>
      </div>
    </footer>
  );
};

export default SiteFooter;
