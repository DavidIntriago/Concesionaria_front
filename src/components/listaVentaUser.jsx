"use client"
import { obtenerVentasUser } from "@/hooks/Conexion";
import { useEffect, useState } from "react";
import { save, get } from "@/hooks/SessionUtil";
import { useRouter } from "next/navigation";

const ListaVentaUser = () => {
  const [data, setData] = useState(null);
  const router = useRouter();
  const user= get("external")

  useEffect(() => {
    const fetchDataFromApi = async () => {
      try {
        const result = await obtenerVentasUser(user);
        setData(result.data); 
      } catch (error) {
        console.error("Error al obtener datos de la API:", error);
      }
    };

    fetchDataFromApi();
  }, []);


  return (
    <>
      <div>
        <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
          Lista de autos:
        </h1>
        
        {data && (
          <div
            className="catalogo"
            style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}
          >
            {data.map((venta) => (
              <div
                onClick={() => {
                  save("idVenta", venta.id);
                  router.push("../user/modificar_venta");
                }}
                key={venta.id}
                className="catalogo-item"
              >
                <h2>{venta.cliente.apellidos}</h2>
                <p>Fecha: {venta.fecha}</p>
                <p>Vendedor: {venta.persona.apellidos}</p>
                <p>Iva: {venta.porcentajeIva}</p>
                <p>Estado: {venta.recargo ? "Con recargo" : "Sin recargo"}</p>
                <p>Precio Total: {venta.precio}</p>
                
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default ListaVentaUser;
