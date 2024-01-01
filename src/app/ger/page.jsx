"use client"
import { useEffect, useState } from 'react';

export default function Saludo() {
  // Estado para almacenar el valor de user_gerente
  const [user, setUser] = useState('');

  useEffect(() => {
    // Obtener el valor de 'user_gerente' desde Session Storage al montar el componente
    const storedUser = sessionStorage.getItem('user_gerente');

    // Actualizar el estado con el valor obtenido
    setUser(storedUser);
  }, []);

  return (
    <>
     <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div style={{ textAlign: 'center', padding: '20px', border: '2px solid #ccc', borderRadius: '8px' }}>
        <h1 style={{ fontSize: '36px', margin: '0' }}>Hola de nuevo  {user}</h1>
      </div>
    </div>
    </>
  );
}
