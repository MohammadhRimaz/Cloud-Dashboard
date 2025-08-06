const Footer = ({ footerInfo }) => {
  const { email, phone, address } = footerInfo;
  return (
    <footer className="bg-gray-800 text-white p-6 mt-4">
      <div className="text-center">
        <p>Email: {email}</p>
        <p>Phone: {phone}</p>
        <p>Address: {address}</p>
      </div>
    </footer>
  );
};

export default Footer;
