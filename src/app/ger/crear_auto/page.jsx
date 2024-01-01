"use client";
import { datosAutos } from "@/hooks/Conexion";
import { get } from "@/hooks/SessionUtil";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

export default function Crear_auto() {
  const router = useRouter();

  const { register, handleSubmit } = useForm();
  const token = get("token_gerente");

  const sendData = async (data) => {
    //console.log(data);
    console.log("ghds");
    var data = {
      modelo: data.modelo,
      marca: data.marca,
      anio: data.anio,
      color: data.color,
      precio: data.precio,
    };
    console.log(data);

    const auto = await datosAutos(data, token);
    if (!auto) {
      console.log("Error al guardar");
    } else {
      console.log("guardado Exitoso", " Bienvenido");
      router.push("../ger/autos");
    }
  };

  return (
      <form onSubmit={handleSubmit(sendData)} className="formulario">
        <div className="campo">
          <label htmlFor="descripcion" className="campo_label">
            Modelo:
          </label>
          <input
            type="text"
            id="descripcion"
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
            {...register("precio")}
            className="input-campo"
          />
        </div>

        <button type="submit" className="boton-enviar">
          Enviar
        </button>
      </form>
      
  );
}
