"use client";
import { datosAutos, guardar_cliente } from "@/hooks/Conexion";
import { get, save } from "@/hooks/SessionUtil";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

export default function crear_cliente() {
  const router = useRouter();

  const { register, handleSubmit } = useForm();
  const token = get("token");
  const auto = get("idAuto")


  
  const sendData = async (data) => {
    //console.log(data);
    console.log("ghds");
    var data = {
      nombres: data.nombres,
      apellidos: data.apellidos,
      direccion: data.direccion,
      celular: data.celular,
      fecha_nac: data.fecha_nac,
    };
    console.log(data);

    const cliente = await guardar_cliente(data, token);
    if (!cliente) {
      console.log("Error al guardar");
    } else {
      console.log("guardado Exitoso", " Bienvenido");
     // save("external_cliente", cliente.data.external_id)
      console.log(cliente)
      router.push("../user/cliente");
    }
  };

  return (
      <form onSubmit={handleSubmit(sendData)} className="formulario">
        <div className="campo">
          <label htmlFor="descripcion" className="campo_label">
            Nombre:
          </label>
          <input
            type="text"
            id="descripcion"
            {...register("nombres")}
            className="input-campo"
          />
        </div>

        <div className="campo">
          <label htmlFor="subtotal" className="campo_label">
            Apellido:
          </label>
          <input
            type="text"
            id="subtotal"
            {...register("apellidos")}
            className="input-campo"
          />
        </div>

        <div className="campo">
          <label htmlFor="iva" className="campo_label">
            Direccion:
          </label>
          <input
            type="text"
            id="iva"
            {...register("direccion")}
            className="input-campo"
          />
        </div>

        <div className="campo">
          <label htmlFor="total" className="campo_label">
            Celular:
          </label>
          <input
            type="text"
            id="total"
            {...register("celular")}
            className="input-campo"
          />
        </div>

        <div className="campo">
          <label htmlFor="descuento" className="campo_label">
            Fecha Nacimiento:
          </label>
          <input
            type="date"
            id="descuento"
            {...register("fecha_nac")}
            className="input-campo"
          />
        </div>

        <button type="submit" className="boton-enviar">
          Enviar
        </button>
      </form>
      
  );
}
