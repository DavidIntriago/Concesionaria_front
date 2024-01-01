import Link from "next/link";

async function Menu() {

  return (
    <nav className="flex justify-between items-center bg-gray-950 text-white px-24 py-3">
      <h1 className="text-xl font-bold">Consecionaria</h1>

      <ul className="flex gap-x-4">
        
          <>
            <li>
              <Link href="/user/auto">Autos</Link>
            </li>
            <li>
              <Link href="/user/ventas">Ventas</Link>
            </li>
            <li>
              <Link href="/user/cliente">Clientes</Link>
            </li>
            <li>
              <Link href="/user/crear_cliente">Crear Cliente</Link>
            </li>
            <li>
              <Link href="/">Exit</Link>
            </li>
          </>
        
      </ul>
    </nav>
  );
}

export default Menu;