import React from 'react';
import Menu from "@/components/menu";


const Layout_User = ({ children }) => {
  return (
    <div>
      {/* Agrega aquí los elementos de tu layout personalizado */}
      <header>
      </header>

      <main>
      <Menu/>
{children}</main>

      <footer>
      </footer>
    </div>
  );
};

export default Layout_User;
