import { useRouter } from "next/navigation";
import { enviarLogin, validarGerente } from "./Conexion";
import { save } from "./SessionUtil";

export async function inicio_sesion(data) {
 // const router = useRouter();
  
  console.log("aqaaaa")


  try {
    const sesion = await enviarLogin(data);
    console.log("aquiii")
    if (sesion.code === 200) {
      const rol = await validarGerente(sesion.info.token);
      console.log(sesion)
      if (rol.code === 200) {
        save("token_gerente", sesion.info.token);
        save("user_gerente", sesion.info.user);
        save("external_gerente",sesion.info.external_id)
        //router.push("../app/ger/autos");
      } else {
        save("token", sesion.info.token);
        save("user", sesion.info.user);
        save("external",sesion.info.external_id)

      }
    }

    return sesion;
  } catch (error) {
    console.error("Error during login:", error);
    // Manejar el error según tus necesidades
    return { code: 500, msg: "Error during login", error };
  }
}
