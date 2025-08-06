import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <Header />

      <main className="flex-grow p-4 bg-gray-50">
        <Dashboard />
      </main>

      <Footer />
    </div>
  );
}

export default App;
