"use client";
import { obtenerVentas, obtenerVentasFecha } from "@/hooks/Conexion";
import { useEffect, useState } from "react";
import { save, get } from "@/hooks/SessionUtil";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

const ListaVenta = () => {
  const [data, setData] = useState(null);
  const [mes, setMes] = useState(0);
  const router = useRouter();
  const user = get("token_gerente");


  useEffect(() => {
    const fetchDataFromApi = async () => {
      try {
        if (mes==0) {
          const result = await obtenerVentas(user);
          setData(result.data);  
        }else{
          const result = await obtenerVentasFecha(mes);
          setData(result.data);
        }
      } catch (error) {
        console.error("Error al obtener datos de la API:", error);
      }
    };

    fetchDataFromApi();
  }, [mes]);
  console.log(mes)


  return (
    <>
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
        Lista de autos:
      </h1>

      <div>
        <select 
        onChange={(e) => {
          setMes(parseInt(e.target.value));
        }}
        >
          <option value={0}>Todas</option>
          <option value={1}>Enero</option>
          <option value={2}>Febrero</option>
          <option value={3}>MArzo</option>
          <option value={4}>Abril</option>
          <option value={5}>Mayo</option>
          <option value={6}>Junio</option>
          <option value={7}>Julio</option>
          <option value={8}>Agosto</option>
          <option value={9}>Septiembre</option>
          <option value={10}>Ocutubre</option>
          <option value={11}>Noviembre</option>
          <option value={12}>Diciembre</option>
        </select>
      </div>
      <div>
        {data && (
          <div
            className="catalogo"
            style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}
          >
            {data.map((venta) => (
              <div
                onClick={() => {
                  save("idVenta", venta.id);
                  router.push("../ger/detalle_venta");
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

export default ListaVenta;
