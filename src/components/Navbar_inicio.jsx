import Link from "next/link";
import { estaSesion } from "@/hooks/SessionUtil";

async function Navbar_inicio() {
  return (
    <nav className="flex justify-between items-center bg-gray-950 text-white px-24 py-3">
      <h1 className="text-xl font-bold">Consecionaria</h1>

      <ul className="flex gap-x-4">
        
          <>
            <li>
              <Link href="/inicio_sesion">Login</Link>
            </li>
            <li>
              <Link href="/">Catalogo</Link>
            </li>
          </>
        
      </ul>
    </nav>
  );
}

export default Navbar_inicio;
