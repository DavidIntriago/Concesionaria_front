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

const Detalle_Venta = () => {
  const router = useRouter();
  const { register, handleSubmit, setValue } = useForm();
  const token = get("token");
  const vendedor = get("external");
  const auxVenta = get("idVenta");
  const [clientes, setClientes] = useState([]);
  const [infAuto, setinfAuto] = useState({});
  const [venta, setVenta] = useState({ fecha: "", cliente: "", precio:"", auto: {} });

  useEffect(() => {
    const fetchDataFromApi = async () => {
      try {
        const result = await obtenerClientes(token);
        const resultVenta = await obtenerInfVenta(auxVenta);
        const resultAuto = await obtenerInfAuto(resultVenta.data.auto.id);
          
        
        console.log();
        setClientes(result.data || []);
        setVenta({
          fecha: resultVenta.data.fecha,
          cliente: resultVenta.data.cliente,
          precio: resultVenta.data.precio,
          auto: resultAuto.data || {},
        }); //  setinfAuto(autoaux.data || {})
        console.log(resultVenta.data);
      } catch (error) {
        console.error("Error al obtener datos de la API:", error);
      }
    };

    fetchDataFromApi();
  }, [token]);

  useEffect(() => {
    // Establecer los valores iniciales en el formulario cuando se cargan los datos
    setValue("fecha", venta.fecha);
    setValue("cliente", venta.cliente.id);
  }, [venta]);

  const sendData = async (data) => {
    console.log(data);
    var ventaData = {
      fecha: data.fecha,
      id_auto: auto,
      id_cliente: data.cliente,
      id_vendedor: vendedor,
    };
    console.log(ventaData);

    const venta = await update_venta(ventaData, token);
    if (!venta) {
      console.log("Error al guardar");
    } else {
      console.log("Guardado Exitoso, Bienvenido");
      console.log(venta);
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
          <p>{venta.recargo ? "Sin Recargo":"Con Recargo"}</p>
          
          <p>Precio: {venta.precio}</p>
          <button className="w-full bg-blue-500 text-while p-3 rounded-lg mt-2" >Cambiar Auto</button>
        </div>

        <button type="submit" className="boton-enviar">
          Modificar
        </button>
      </form>

      <style jsx>{`
        .formulario {
          max-width: 400px;
          margin: 0 auto;
        }

        .campo {
          margin-bottom: 10px;
        }

        label {
          display: block;
          margin-bottom: 5px;
        }

        .input-campo {
          width: 100%;
          padding: 8px;
          box-sizing: border-box;
        }

        .info-auto {
          border: 1px solid #ccc;
          padding: 10px;
          margin-top: 2px;
          background-color: #f9f9f9;
        }

        .info-auto h2 {
          font-size: 18px;
          margin-bottom: 10px;
        }

        .info-auto p {
          margin: 5px 0;
        }
        .boton-enviar {
          background-color: #4caf50;
          color: white;
          padding: 10px;
          border: none;
          cursor: pointer;
          border-radius: 5px;
        }

        .boton-enviar:hover {
          background-color: #45a049;
        }
      `}</style>
    </>
  );
};

export default Detalle_Venta;
