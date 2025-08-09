const Footer = ({ footerInfo }) => {
  const { email, phone, address } = footerInfo;
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <p>Email: {email}</p>
      <p>Phone: {phone}</p>
      <p>Address: {address}</p>
      <small>© {year}. All rights reserved.</small>
    </footer>
  );
};

export default Footer;
