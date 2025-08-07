import axios from "axios";
import { useEffect } from "react";

const Dashboard = ({
  headerTitle,
  setHeaderTitle,
  headerImage,
  setHeaderImage,
  navLinks,
  setNavLinks,
  footerInfo,
  setFooterInfo,
}) => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/components");
        const data = res.data;
        console.log("Fetched data:", data);

        if (data.header) {
          setHeaderTitle(data.header.title || "");
          setHeaderImage(data.header.image || "");
        }
        if (data.navbar) {
          setNavLinks(
            data.navbar.map((link) => ({
              label: link.label || "",
              url: link.url || "",
            }))
          );
        }
        if (data.footer) {
          setFooterInfo(data.footer || "");
        }
        console.log("Data fetched successfully:", data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  const handleLinkChange = (index, field, value) => {
    const updated = [...navLinks];
    updated[index][field] = value;
    setNavLinks(updated);
  };

  const handleFooterChange = (field, value) => {
    setFooterInfo({ ...footerInfo, [field]: value });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "unsigned_preset");
    formData.append("cloud_name", "ddwabvz91");

    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/ddwabvz91/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await res.json();
      setHeaderImage(data.secure_url);
    } catch (err) {
      console.error("Image upload failed:", err);
      alert("Failed to upload image. Please try again.");
    }
  };

  const handleSave = async () => {
    try {
      const data = {
        header: {
          title: headerTitle,
          image: headerImage,
        },
        navbar: [
          ...navLinks.map((link) => ({
            label: link.label,
            url: link.url,
          })),
        ],
        footer: {
          email: footerInfo.email,
          phone: footerInfo.phone,
          address: footerInfo.address,
        },
      };

      const res = await axios.post(
        "http://localhost:5000/api/components",
        data
      );
      console.log("Data saved successfully:", res.data);
      alert("Data saved successfully!");
    } catch (error) {
      console.error("Error saving data: ", error);
      alert("Failed to save data. Please try again.");
    }
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
          className="border p-2 w-full mb-2"
          placeholder="Header Title"
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="border p-2 w-full mb-2"
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

      <button
        onClick={handleSave}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mt-6"
      >
        Save
      </button>
    </div>
  );
};

export default Dashboard;
