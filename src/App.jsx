import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Dashboard from "./pages/Dashboard";
import { useState } from "react";

function App() {
  // State variables for header title and image
  const [headerTitle, setHeaderTitle] = useState("Header Title");
  const [headerImage, setHeaderImage] = useState("");

  // State variable for navigation links
  const [navLinks, setNavLinks] = useState([
    { name: "Link 1", href: "#" },
    { name: "Link 2", href: "#" },
    { name: "Link 3", href: "#" },
  ]);

  // State variable for footer text
  const [footerInfo, setFooterInfo] = useState({
    email: "example@test.com",
    phone: "+1234567890",
    address: "123 Main St, City, Country",
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar navLinks={navLinks} />
      <Header title={headerTitle} image={headerImage} />

      <main className="flex-grow p-4 bg-gray-50">
        <Dashboard
          headerTitle={headerTitle}
          setHeaderTitle={setHeaderTitle}
          setHeaderImage={setHeaderImage}
          navLinks={navLinks}
          setNavLinks={setNavLinks}
          footerInfo={footerInfo}
          setFooterInfo={setFooterInfo}
        />
      </main>

      <Footer footerInfo={footerInfo} />
    </div>
  );
}

export default App;
