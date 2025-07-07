import { useEffect, useState } from "react";
import "./App.css";
import ContactForm from "./components/ContactForm";
import ContactList from "./components/ContactList";

function App() {
  const [contactos, setContactos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://www.raydelto.org/agenda.php")
      .then((res) => res.json())
      .then((data) => setContactos(data))
      .catch(() => setContactos([]))
      .finally(() => setLoading(false));
  }, []);

  const handleAdd = (contacto) => {
    setContactos((prev) => [...prev, contacto]);
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh", minWidth: "100vw" }}
    >
      <div
        className="p-4 shadow rounded mx-auto"
        style={{
          maxWidth: 700,
          width: "100%",
          background: "#181A1B",
        }}
      >
        <h1 className="text-center mb-4">Agenda de Contactos</h1>
        <ContactForm onAdd={handleAdd} />
        <ContactList contactos={contactos} loading={loading} />
      </div>
    </div>
  );
}

export default App;