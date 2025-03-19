import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import CreateRoutine from "./pages/CreateRoutine";
import Routines from "./pages/Routines";
import Contact from "./pages/Contact";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header />
      <div style={{ flex: "1" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<CreateRoutine />} />
          <Route path="/routines" element={<Routines />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
