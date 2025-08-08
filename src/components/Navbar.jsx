const Navbar = ({ navLinks }) => {
  return (
    <nav className="navbar">
      {navLinks.map((link, index) => (
        <a key={index} href={link.url} className="nav-link">
          {link.label}
        </a>
      ))}
    </nav>
  );
};

export default Navbar;
