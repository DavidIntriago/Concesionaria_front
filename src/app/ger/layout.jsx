import React from 'react';
import Menu_gerente from "@/components/menu_gerente";


const Layout_Ger = ({ children }) => {
  return (
    <div>
      {/* Agrega aquí los elementos de tu layout personalizado */}
      <header>
      </header>

      <main>
      <Menu_gerente/>
{children}</main>

      <footer>
      </footer>
    </div>
  );
};

export default Layout_Ger;
