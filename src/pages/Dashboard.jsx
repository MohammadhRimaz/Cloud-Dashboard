const Dashboard = ({
  headerTitle,
  setHeaderTitle,
  setHeaderImage,
  navLinks,
  setNavLinks,
  footerInfo,
  setFooterInfo,
}) => {
  const handleLinkChange = (index, field, value) => {
    const updated = [...navLinks];
    updated[index][field] = value;
    setNavLinks(updated);
  };

  const handleFooterChange = (field, value) => {
    setFooterInfo({ ...footerInfo, [field]: value });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md space-y-6">
      {/* Header Controls */}
      <section>
        <h3 className="text-lg font-bold mb-2">Header</h3>
        <input
          type="text"
          value={headerTitle}
          onChange={(e) => setHeaderTitle(e.target.value)}
          className="border p-2 w-full"
          placeholder="Header Title"
        />
        <input
          type="text"
          onChange={(e) => setHeaderImage(e.target.value)}
          className="border p-2 w-full mt-2"
          placeholder="Image URL"
        />
      </section>

      {/* Navbar Controls */}
      <section>
        <h3 className="text-lg font-bold mb-2">Navbar</h3>
        {navLinks.map((link, index) => (
          <div key={index} className="mb-3 space-y-1">
            <input
              type="text"
              value={link.label}
              onChange={(e) => handleLinkChange(index, "label", e.target.value)}
              className="border p-2 w-full"
              placeholder={`Link ${index + 1} Label`}
            />
            <input
              type="text"
              value={link.url}
              onChange={(e) => handleLinkChange(index, "url", e.target.value)}
              className="border p-2 w-full"
              placeholder={`Link ${index + 1} URL`}
            />
          </div>
        ))}
      </section>

      {/* Footer Controls */}
      <section>
        <h3 className="text-lg font-bold mb-2">Footer</h3>
        <input
          type="email"
          value={footerInfo.email}
          onChange={(e) => handleFooterChange("email", e.target.value)}
          className="border p-2 w-full mb-2"
          placeholder="Email"
        />
        <input
          type="text"
          value={footerInfo.phone}
          onChange={(e) => handleFooterChange("phone", e.target.value)}
          className="border p-2 w-full mb-2"
          placeholder="Phone Number"
        />
        <input
          type="text"
          value={footerInfo.address}
          onChange={(e) => handleFooterChange("address", e.target.value)}
          className="border p-2 w-full mb-2"
          placeholder="Address"
        />
      </section>
    </div>
  );
};

export default Dashboard;
