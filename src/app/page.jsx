"use client"
import ListaAutos from "@/components/listaAutos"
import { borrarSesion } from "@/hooks/SessionUtil";
export default async function HomePage() {
  borrarSesion()
  return (
    <div className="container">
      <ListaAutos></ListaAutos>
    </div>
  )
}