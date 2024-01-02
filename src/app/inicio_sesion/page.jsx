"use client";
import { inicio_sesion } from "@/hooks/Autenticacion";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Navbar_inicio from "@/components/Navbar_inicio";
import { get } from "@/hooks/SessionUtil";

function Inicio_Sesion() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const sendData = (data) => {
    console.log("Datos a enviar:", data);

    inicio_sesion(data).then((info) => {
      console.log(info);

      if (!info) {
        console.log("Error de inicio de sesión");
      } else {
        console.log("Inicio de sesión exitoso");
        if (get("user_gerente")) {
         router.push('../ger');
          
        }else{
          router.push('../user');

        }
      }
    });
  };
  const onSubmit = handleSubmit(sendData);

  return (
    <>
      <Navbar_inicio />

      <div className="h-[calc(100vh-7rem)] flex justify-center items-center">
        <form onSubmit={onSubmit} className="w-1/4">
          <h1 className="text-slate-200 font-bold text-4xl mb-4">
            INICIO SESION
          </h1>

          <label htmlFor="correo" className="text-slate-500 mb-2 block text-sm">
            Correo
          </label>
          <input
            type="email"
            {...register("correo", {
              required: {
                value: true,
                message: "Correo Requerido",
              },
            })}
            className="p-3 rounded block mb-2 bg-slate-900 text-slate-300 w-full"
            placeholder="usuario1@email.com"
          />
          {errors.correo && (
            <span className="text-red-500">{errors.correo.message}</span>
          )}

          <label
            htmlFor="contrasenia"
            className="text-slate-500 mb-2 block text-sm"
          >
            Contraseña
          </label>
          <input
            type="password"
            {...register("clave", {
              required: {
                value: true,
                message: "Contraseña Requerida",
              },
            })}
            className="p-3 rounded block mb-2 bg-slate-900 text-slate-300 w-full"
            placeholder="**********"
          />
          {errors.clave && (
            <span className="text-red-500">{errors.clave.message}</span>
          )}

          <button className="w-full bg-blue-500 text-while p-3 rounded-lg mt-2">
            Iniciar Sesion
          </button>
        </form>
      </div>
    </>
  );
}
export default Inicio_Sesion;
