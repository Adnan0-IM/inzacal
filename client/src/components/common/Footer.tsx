
const Footer = () => {
  return (
    <footer className="border-t">
        <div className="container mx-auto p-4 text-sm text-muted-foreground">
          © {new Date().getFullYear()} Inzakal
        </div>
    </footer>
  );
};

export default Footer;
