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
    <div className="dashboard">
      {/* Header Controls */}
      <section>
        <h3>Header</h3>
        <div className="form-group">
          <input
            type="text"
            id="headerTitle"
            value={headerTitle}
            onChange={(e) => setHeaderTitle(e.target.value)}
            required
          />
          <label htmlFor="headerTitle">Header Title</label>
        </div>
        <div className="form-group">
          <input type="file" accept="image/*" onChange={handleImageUpload} />
          <label>Header Image</label>
        </div>
      </section>

      {/* Navbar Controls */}
      <section>
        <h3>Navbar</h3>
        {navLinks.map((link, index) => (
          <div key={index} className="nav-link-group">
            <div className="form-group">
              <input
                type="text"
                id={`label-${index}`}
                value={link.label}
                onChange={(e) =>
                  handleLinkChange(index, "label", e.target.value)
                }
                required
              />
              <label htmlFor={`label-${index}`}>Link {index + 1}</label>
            </div>
            <div className="form-group">
              <input
                type="text"
                id={`url-${index}`}
                value={link.url}
                onChange={(e) => handleLinkChange(index, "url", e.target.value)}
                required
              />
              <label htmlFor={`url-${index}`}>URL {index + 1}</label>
            </div>
          </div>
        ))}
      </section>

      {/* Footer Controls */}
      <section>
        <h3>Footer</h3>
        <div className="form-group">
          <input
            type="email"
            id="footerEmail"
            value={footerInfo.email}
            onChange={(e) => handleFooterChange("email", e.target.value)}
            required
          />
          <label htmlFor="footerEmail">Email</label>
        </div>
        <div className="form-group">
          <input
            type="text"
            id="footerPhone"
            value={footerInfo.phone}
            onChange={(e) => handleFooterChange("phone", e.target.value)}
            placeholder="Phone Number"
            required
          />
          <label htmlFor="footerPhone">Phone</label>
        </div>
        <div className="form-group">
          <input
            type="text"
            id="footerAddress"
            value={footerInfo.address}
            onChange={(e) => handleFooterChange("address", e.target.value)}
            required
          />
          <label htmlFor="footerAddress">Address</label>
        </div>
      </section>

      <button type="submit" onClick={handleSave} className="save-btn">
        Save
      </button>
    </div>
  );
};

export default Dashboard;
