"use client";
import { useEffect, useState } from "react";
import {
  update_venta,
  obtenerClientes,
  obtenerInfVenta,
  obtenerInfAuto,
} from "@/hooks/Conexion";
import { get, save } from "@/hooks/SessionUtil";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

const Modificar_venta = () => {
  const router = useRouter();
  const { register, handleSubmit, setValue } = useForm();
  const token = get("token");
  const vendedor = get("external");
  const auxVenta = get("idVenta");
  const auto=get("idAuto");
  const [clientes, setClientes] = useState([]);
  const [venta, setVenta] = useState({ fecha: "", cliente: "", precio:"", recargo: "", auto: {} });

  useEffect(() => {
    const fetchDataFromApi = async () => {
      try {
        const result = await obtenerClientes(token);
        const resultVenta = await obtenerInfVenta(auxVenta);
        const resultAuto = await obtenerInfAuto(auto);
        if (resultAuto.data==null || resultAuto.data==undefined) {
          const resultAuto = await obtenerInfAuto(resultVenta.data.auto.id);
          console.log(resultAuto)
          setVenta({
            fecha: resultVenta.data.fecha,
            cliente: resultVenta.data.cliente,
            precio: resultVenta.data.precio,
            auto: resultAuto.data || {},
          });
        }else{
          if (resultAuto.data.color == "Blanco" || resultAuto.data.color == "Plata") {
            
          setVenta({
            fecha: resultVenta.data.fecha,
            cliente: resultVenta.data.cliente,
            precio: resultAuto.data.precio + (resultAuto.data.precio * 0.14),
            recargo: false,
            auto: resultAuto.data || {},
          });
          }else{
          setVenta({
            fecha: resultVenta.data.fecha,
            cliente: resultVenta.data.cliente,
            precio: resultAuto.data.precio + (resultAuto.data.precio * 0.14) + (resultAuto.data.precio * 0.1),
            recargo: true,
            auto: resultAuto.data || {},
          });
        }}
        console.log(resultVenta);
        setClientes(result.data || []);
        console.log(resultVenta.data);
      } catch (error) {
        console.error("Error al obtener datos de la API:", error);
      }
    };

    fetchDataFromApi();
  }, [token]);

  useEffect(() => {
    setValue("fecha", venta.fecha);
    setValue("cliente", venta.cliente.id);
  }, [venta]);

  const sendData = async (data) => {
    console.log(data);
    var ventaData = {
      fecha: data.fecha,
      id_auto: venta.auto.id,
      id_cliente: data.cliente,
    };
    console.log(ventaData);

    const newVenta = await update_venta(ventaData, token, auxVenta);
    if (!newVenta) {
      console.log("Error al guardar");
    } else {
      console.log("Guardado Exitoso, Bienvenido");
      console.log(newVenta);
      // router.push("../user/guardar_venta");
    }
  };

  console.log(venta);
  return (
    <>
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
          <label htmlFor="descripcion" className="campo_label">
            Cliente:
          </label>
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
              src={`http://localhost:3000/multimedia/${venta.auto.foto
                }`}
            />
          
          <p>Marca: {venta.auto.marca}</p>
          <p>Modelo: {venta.auto.modelo}</p>
          <p>Año: {venta.auto.anio}</p>
          <p>Color: {venta.auto.color}</p>
          <p>Precio Inicial: {venta.auto.precio}</p>
          <p>{venta.recargo ? "Con Recargo":"Sin Recargo"}</p>
          
          <p>Precio: {venta.precio}</p>
          <button className="w-full bg-blue-500 text-while p-3 rounded-lg mt-2" onClick={() => {
                  router.push("../user/catalogo");
                }}>Cambiar Auto</button>
        </div>

        <button type="submit" className="boton-enviar" onClick={() => {
                  save("idAuto","")
                  router.push("../user/ventas");
                }}>
          Modificar
        </button>
      </form>

    </>
  );
};

export default Modificar_venta;
