"use client"
import Link from "next/link";

async function Menu_gerente() {

  return (
    <nav className="flex justify-between items-center bg-gray-950 text-white px-24 py-3">
      <h1 className="text-xl font-bold">Consecionaria</h1>

      <ul className="flex gap-x-4">
        
          <>
            <li>
              <Link href="/ger/autos">Autos</Link>
            </li>
            <li>
              <Link href="/ger/crear_auto">Añadir</Link>
            </li>
            <li>
              <Link href="/ger/ventas">Ventas</Link>
            </li>
            <li>
            <Link href="/">Exit</Link>

            </li>
          </>
        
      </ul>
    </nav>
  );
}

export default Menu_gerente;