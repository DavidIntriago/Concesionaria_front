"use client"
import { obtenerClientes } from "@/hooks/Conexion";
import { useEffect, useState } from "react";
import { save, get } from "@/hooks/SessionUtil";
import { useRouter } from "next/navigation";

const ListaClientes = () => {
  const [data, setData] = useState([]);
  const router = useRouter();

  const token = get("token")

  useEffect(() => {
    const fetchDataFromApi = async () => {
      try {
        const result = await obtenerClientes(token);
        setData(result.data || []); 
      } catch (error) {
        // Manejar errores aquí
        console.error("Error al obtener datos de la API:", error);
      }
    };

    fetchDataFromApi();
  }, []);


  return (
    <div>
      <h2>Clientes:</h2>

      <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "10px" }}>
        <thead>
          <tr style={{ borderBottom: "1px solid #ddd", background: "#f2f2f2" }}>
            <th style={{ padding: "8px", textAlign: "left" }}>Nombres</th>
            <th style={{ padding: "8px", textAlign: "left" }}>Apellidos</th>
            <th style={{ padding: "8px", textAlign: "left" }}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {data.map((cliente) => (
            <tr key={cliente.id} style={{ borderBottom: "1px solid #ddd" }}>
              <td style={{ padding: "8px" }}>{cliente.nombres}</td>
              <td style={{ padding: "8px" }}>{cliente.apellidos}</td>
              <td style={{ padding: "8px" }}>
                <button onClick={() => handleClienteClick(cliente)}>Ver Detalles</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button style={{ marginTop: "10px" }}>
        Nuevo Cliente
      </button>
    </div>
  );
};

export default ListaClientes;
