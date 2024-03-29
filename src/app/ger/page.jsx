"use client"
import { useEffect, useState } from 'react';

export default function Saludo() {

  const [user, setUser] = useState('');

  useEffect(() => {
    const storedUser = sessionStorage.getItem('user_gerente' || "user");
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
