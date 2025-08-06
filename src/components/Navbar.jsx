const Navbar = ({ navLinks }) => {
  return (
    <nav className="bg-white shadow-md p-4 flex justify-center space-x-8">
      {navLinks.map((link, index) => (
        <a
          key={index}
          href={link.url}
          className="text-blue-600 font-medium hover:underline"
        >
          {link.label}
        </a>
      ))}
    </nav>
  );
};

export default Navbar;
