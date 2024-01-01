"use client"
import { obtener } from "@/hooks/Conexion";
import { useEffect, useState } from "react";
import { save } from "@/hooks/SessionUtil";
import { useRouter } from "next/navigation";

const ListaAutos = () => {
  const [data, setData] = useState(null);
  const [listaVendidos, setListaVendidos] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const obtenerDataAuto = async () => {
      try {
        const result = await obtener("autos");
        setData(result.data); 
      } catch (error) {
        console.error("Error al obtener datos de la API:", error);
      }
     
    };

    obtenerDataAuto();

  }, []);


  const getAutosVendidos = () => {
    if (!data) {
      return [];
    }

    switch (listaVendidos) {
      case "true":
        return data.filter((auto) => auto.estado === true);
      case "false":
        return data.filter((auto) => auto.estado === false);
      case "null":
        return data; // Mostrar todos los autos
      default:
        return data;
    }
  };

  const autos = getAutosVendidos();

  
  return (
    <>
      <div>
        <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
          Lista de autos:
        </h1>
        <h2>Selecciona la lista que deseas mostrar</h2>
        <select
          value={listaVendidos.toString()}
          onChange={(e) => setListaVendidos(e.target.value)}
        >
          <option value="null">Todos los autos</option>
          <option value="true">Autos Vendidos</option>
          <option value="false">Autos No Vendidos</option>
        </select>

        {data && (
          <div
            className="catalogo"
            style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}
          >
            {autos.map((auto) => (
              <div
                onClick={() => {
                  save("idAuto", auto.id);
                  router.push("../user/modificar_venta");
                }}
                key={auto.id}
                className="catalogo-item"
              >
                {auto.foto.split(",")[0] && (
                  <img
                    src={`http://localhost:3000/multimedia/${auto.foto
                      .split(",")[0]
                      .trim()}`}
                    alt={`Imagen de ${auto.marca} ${auto.modelo}`}
                  />
                )}
                <h2>{auto.marca}</h2>
                <p>Modelo: {auto.modelo}</p>
                <p>Año: {auto.anio}</p>
                <p>Color: {auto.color}</p>
                <p>Precio: {auto.precio}</p>
                <p>Estado: {auto.estado ? "Vendido" : "No Vendido"}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default ListaAutos;
