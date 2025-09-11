const SiteFooter = () => {
  return (
    <footer className="border-t mt-8">
      <div className="container px-4 py-8 text-sm text-muted-foreground text-center">
        <p>© {new Date().getFullYear()} <a href="https://mrelectricmedic.com" className="hover:underline text-primary">Electric Medic</a>. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default SiteFooter;
