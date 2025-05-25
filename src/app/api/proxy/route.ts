import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const response = await fetch("http://192.168.92.21/api/data")
    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Error en proxy:", error)
    return NextResponse.json({ error: "Error al conectar con el ESP32" }, { status: 500 })
  }
}
