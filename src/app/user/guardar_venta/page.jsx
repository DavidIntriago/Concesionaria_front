"use client";
import { useEffect, useState } from "react";
import { crear_venta, obtenerClientes, obtenerInfAuto } from "@/hooks/Conexion";
import { get, save } from "@/hooks/SessionUtil";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

const Crear_venta = () => {
  const router = useRouter();
  const { register, handleSubmit } = useForm();
  const token = get("token");
  const auto = get("idAuto");
  const vendedor = get("external");
  const [clientes, setClientes] = useState([]);
  const [dataAuto, setdataAuto] = useState({});

  useEffect(() => {
    const fetchDataFromApi = async () => {
      try {
        const result = await obtenerClientes(token);
        const resultAuto = await obtenerInfAuto(auto);
        setdataAuto(resultAuto.data || {});
        setClientes(result.data || []);
      } catch (error) {
        console.error("Error al obtener datos de la API:", error);
      }
    };

    fetchDataFromApi();
  }, [token]);

  const sendData = async (data) => {
    console.log(data);
    var ventaData = {
      fecha: data.fecha,
      id_auto: auto,
      id_cliente: data.cliente,
      id_vendedor: vendedor,
    };
    console.log(ventaData);

    const venta = await crear_venta(ventaData, token);
    if (!venta) {
      console.log("Error al guardar");
    } else {
      console.log("Guardado Exitoso, Bienvenido");
      console.log(venta);
      // router.push("../user/guardar_venta");
    }
  };

  return (
    <form onSubmit={handleSubmit(sendData)} className="formulario">
      <div className="campo">
        <label htmlFor="descripcion" className="campo_label">
          Fecha:
        </label>
        <input
          type="date"
          id="descripcion"
          {...register("fecha")}
          className="input-campo"
        />
      </div>
      <div>
        <label htmlFor="cliente">Selecciona un cliente:</label>
        <select id="cliente" {...register("cliente")}>
          <option value="" disabled>
            Selecciona un cliente
          </option>
          {clientes.map((cliente) => (
            <option key={cliente.id} value={cliente.id}>
              {cliente.nombres} {cliente.apellidos}
            </option>
          ))}
        </select>
      </div>
      <label htmlFor="descripcion" className="campo_label">
            Auto:
          </label>
        <div className="info-auto">
            <img
              src={`http://localhost:3000/multimedia/${dataAuto.foto
                }`}
            />
          
          <p>Marca: {dataAuto.marca}</p>
          <p>Modelo: {dataAuto.modelo}</p>
          <p>Año: {dataAuto.anio}</p>
          <p>Color: {dataAuto.color}</p>
          <p>Precio Inicial: {dataAuto.precio}</p>
 
  
        </div>

      <button type="submit" className="boton-enviar">
        Enviar
      </button>
    </form>
  );
};

export default Crear_venta;
