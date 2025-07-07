import { useState } from "react";

function ContactForm({ onAdd }) {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [telefono, setTelefono] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nombre.trim() || !apellido.trim() || !telefono.trim()) {
      alert("Por favor complete todos los campos");
      return;
    }
    setLoading(true);
    const contacto = { nombre, apellido, telefono };
    try {
      const res = await fetch("https://www.raydelto.org/agenda.php", {
        method: "POST",
        body: JSON.stringify(contacto),
      });
      const data = await res.json();
      if (data.exito === true) {
        onAdd(contacto);
        setNombre("");
        setApellido("");
        setTelefono("");
        alert("Contacto agregado exitosamente");
      } else {
        alert("Error al agregar el contacto");
      }
    } catch {
      alert("Error al agregar el contacto. Por favor intente nuevamente.");
    }
    setLoading(false);
  };

  return (
    <div className="container-form">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="nombre">Nombre</label>
          <input
            type="text"
            id="nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Ej: Juan"
          />
        </div>
        <div className="form-group">
          <label htmlFor="apellido">Apellido</label>
          <input
            type="text"
            id="apellido"
            value={apellido}
            onChange={(e) => setApellido(e.target.value)}
            placeholder="Ej: Pérez"
          />
        </div>
        <div className="form-group">
          <label htmlFor="telefono">Teléfono</label>
          <input
            type="tel"
            id="telefono"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
            placeholder="Ej: 809-555-1234"
          />
        </div>
        <div className="form-group full-width">
          <button type="submit" disabled={loading}>
            {loading ? "Agregando..." : "Agregar Contacto"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default ContactForm;