const SiteFooter = () => {
  return (
    <footer className="border-t mt-8">
      <div className="container px-4 py-8 text-sm text-muted-foreground flex flex-col sm:flex-row items-center justify-between gap-4">
        <p>© {new Date().getFullYear()} Electric Medic. All rights reserved.</p>
        <nav className="flex items-center gap-4">
          <a href="https://mrelectricmedic.com" className="hover:underline">mrelectricmedic.com</a>
        </nav>
      </div>
    </footer>
  );
};

export default SiteFooter;
