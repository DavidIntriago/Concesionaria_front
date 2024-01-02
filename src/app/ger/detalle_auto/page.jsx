"use client";
import { get } from "@/hooks/SessionUtil";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import {
  aggImg,
  obtenerInfAuto,
  updateAuto,
} from "@/hooks/Conexion";
import { useEffect, useState } from "react";
import { format } from "path";

export default function Crear_auto() {
  const router = useRouter();
  const [data, setData] = useState();

  const { register, handleSubmit } = useForm();
  const token = get("token_gerente");
  const externalAuto = get("idAuto");

  const sendData = async (data, img) => {
    console.log(data);
    console.log("ghds");
    var data = {
      modelo: data.modelo,
      marca: data.marca,
      anio: data.anio,
      color: data.color,
      precio: data.precio,
    };
    console.log(data);

    const auto = await updateAuto(data, token, externalAuto);
    if (!auto) {
      console.log("Error al guardar");
    } else {
      console.log("guardado Exitoso", " Bienvenido");
      router.push("../ger/autos");
    }

  };
  const sendImg = async (fileList) => {
    try {
      console.log(fileList)
      if (fileList.length > 0) {
        const file = fileList[0];
        console.log(file)
        const formData = new FormData();
        formData.append('data', externalAuto)
        formData.append("file", fileList[0]);
        console.log(formData)
        const agg=await aggImg(formData,token, externalAuto)
        console.log(agg)
        return formData;
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

{/* 
  const sendImg = async (fileList) => {
    try {
      if (fileList.length > 0) {
        const file = fileList[0];
        const formData = new FormData();
        formData.append("file", file);
  
        const result = await aggImg(formData, token, externalAuto);
  
        if (result) {
          console.log("Imagen añadida exitosamente");
        } else {
          console.log("Error al añadir la imagen");
        }
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  */}
  
  const recibirData = async (data) => {
    const result = await obtenerInfAuto(externalAuto);

    setData(result.data);
    console.log(result.data);
  };

  useEffect(() => {
    recibirData();
  }, []);

  return (
    <>
      {data ? (
        <form onSubmit={handleSubmit(sendData)} className="formulario">
          <div className="campo">
            {data.foto === "NONE" ? (
              <>
                <label className="campo_label">Subir Foto</label>
                <input
                  type="file"
                  className="campo_label"
                  {...register("foto")}
                  onChange={(e) => sendImg(e.target.files)}
                />
                <button className="w-full bg-blue-500 text-while p-3 rounded-lg mt-2">
                  Cargar
                </button>
              </>
            ) : (
              data.foto.split(",").map((foto, index) => (
                <img
                  key={index}
                  src={`http://localhost:3000/multimedia/${foto.trim()}`}
                  style={{
                    maxWidth: "100%",
                    height: "auto",
                    borderRadius: "4px",
                  }}
                  alt={`Imagen ${index + 1}`}
                />
              ))
            )}
          </div>
          <div className="campo">
            <label htmlFor="descripcion" className="campo_label">
              Modelo:
            </label>
            <input
              type="text"
              id="descripcion"
              defaultValue={data.modelo}
              {...register("modelo")}
              className="input-campo"
            />
          </div>

          <div className="campo">
            <label htmlFor="subtotal" className="campo_label">
              Marca:
            </label>
            <input
              type="text"
              id="subtotal"
              defaultValue={data.marca}
              {...register("marca")}
              className="input-campo"
            />
          </div>

          <div className="campo">
            <label htmlFor="iva" className="campo_label">
              Año:
            </label>
            <input
              type="text"
              id="iva"
              defaultValue={data.anio}
              {...register("anio")}
              className="input-campo"
            />
          </div>

          <div className="campo">
            <label htmlFor="total" className="campo_label">
              Color:
            </label>
            <input
              type="text"
              id="total"
              defaultValue={data.color}
              {...register("color")}
              className="input-campo"
            />
          </div>

          <div className="campo">
            <label htmlFor="descuento" className="campo_label">
              Precio:
            </label>
            <input
              type="text"
              id="descuento"
              defaultValue={data.precio}
              {...register("precio")}
              className="input-campo"
            />
          </div>

          <button type="submit" className="boton-enviar">
            Enviar
          </button>
        </form>
      ) : (
        <></>
      )}
    </>
  );
}
