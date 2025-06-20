"use client"

import { useEffect, useState } from "react"
import { RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TankCard } from "@/components/tank-card"
import { DeviceStatus } from "@/components/device-status"
// import { timeStamp } from "console"


// Tipo para los datos del sistema
interface SystemData {
  tanque1: number
  tanque2: number
  bomba: boolean
  valvula1: boolean
  valvula2: boolean
  timestamp: string
}

export default function Dashboard() {
  const [data, setData] = useState<SystemData>({
    tanque1: 85,
    tanque2: 60,
    bomba: true,
    valvula1: false,
    valvula2: true,
    timestamp: "",
  })
  useEffect(() => {
    setData((prev) => ({
      ...prev,
      timestamp: new Date().toLocaleTimeString(),
    }))
  }, [])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Función para obtener datos de la API
  const fetchData = async () => {
    setLoading(true)
    setError(null)

    try {
      // En un entorno de desarrollo o cuando la API no está disponible,
      // usamos datos simulados en lugar de intentar hacer fetch
      const isDemoMode = true // Cambiar a false cuando la API esté disponible

      if (isDemoMode) {
        // Simulamos una pequeña demora para imitar una solicitud de red
        await new Promise((resolve) => setTimeout(resolve, 500))

        // Generamos datos aleatorios para la demostración
        const newData = {
          tanque1: Math.floor(Math.random() * 30) + 70, // 70-100%
          tanque2: Math.floor(Math.random() * 60) + 40, // 40-100%
          bomba: Math.random() > 0.3, // 70% probabilidad de estar ON
          valvula1: Math.random() > 0.5, // 50% probabilidad
          valvula2: Math.random() > 0.5, // 50% probabilidad
        }

        setData({
          ...newData,
          timestamp: new Date().toLocaleTimeString(),
        })

        // Opcional: mostrar mensaje de modo demo
        setError("Ejecutando en modo demostración con datos simulados")
      } else {
        // Código original para conectar con la API real
        // const response = await fetch("http://192.168.92.21/api/data")
        const response = await fetch("/api/proxy")


        if (!response.ok) {
          throw new Error(`Error del servidor: ${response.status}`)
        }

        const newData = await response.json()
        setData({
          ...newData,
          timestamp: new Date().toLocaleTimeString(),
        })
      }
    } catch (err) {
      console.error("Error fetching data:", err)

      // Mensaje de error más descriptivo
      setError("No se pudo conectar con el dispositivo ESP32. Usando datos de demostración.")

      // Actualizar timestamp aunque haya error
      setData((prev) => ({
        ...prev,
        timestamp: new Date().toLocaleTimeString(),
      }))
    } finally {
      setLoading(false)
    }
  }

  // Efecto para actualizar datos cada 5 segundos
  useEffect(() => {
    // Cargar datos iniciales
    fetchData()

    // Configurar intervalo de actualización
    const interval = setInterval(fetchData, 2000)

    // Limpiar intervalo al desmontar
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-blue-50 to-white">
      <header className="sticky top-0 z-10 border-b bg-white/80 backdrop-blur-sm">
        <div className="container flex h-16 items-center justify-between py-4">
          <div>
            <h1 className="text-2xl font-bold text-blue-700">Sistema de Monitoreo de Agua</h1>
            {error && <span className="text-xs text-blue-500 bg-blue-50 px-2 py-0.5 rounded-full">Modo Demo</span>}
          </div>
          <Button onClick={fetchData} variant="outline" size="sm" className="gap-1" disabled={loading}>
            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
            Actualizar
          </Button>
        </div>
      </header>

      <main className="container flex-1 py-6">
        {error && (
          <div className="mb-4 rounded-lg bg-blue-50 p-4 text-sm text-blue-800 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              />
            </svg>
            {error}
          </div>
        )}

        <div className="mb-6">
          <p className="text-sm text-muted-foreground">Última actualización: {data.timestamp}</p>
        </div>

        <Tabs defaultValue="dashboard" className="space-y-4">
          <TabsList>
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="details">Detalles</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
              <TankCard title="Tinaco 1" percentage={data.tanque1} color="blue" />
              <TankCard title="Tinaco 2" percentage={data.tanque2} color="green" />
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <DeviceStatus title="Bomba de Agua" status={data.bomba} icon="pump" />
              <DeviceStatus title="Válvula 1" status={data.valvula1} icon="valve" />
              <DeviceStatus title="Válvula 2" status={data.valvula2} icon="valve" />
            </div>
          </TabsContent>

          <TabsContent value="details">
            <Card>
              <CardHeader>
                <CardTitle>Información Detallada del Sistema</CardTitle>
                <CardDescription>Datos técnicos y valores exactos del sistema de monitoreo</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <h3 className="font-medium">Niveles de Tinacos</h3>
                      <ul className="space-y-2 text-sm">
                        <li className="flex justify-between">
                          <span>Tinaco 1:</span>
                          <span className="font-mono">{data.tanque1}%</span>
                        </li>
                        <li className="flex justify-between">
                          <span>Tinaco 2:</span>
                          <span className="font-mono">{data.tanque2}%</span>
                        </li>
                      </ul>
                    </div>

                    <div className="space-y-2">
                      <h3 className="font-medium">Estado de Dispositivos</h3>
                      <ul className="space-y-2 text-sm">
                        <li className="flex justify-between">
                          <span>Bomba:</span>
                          <span className={`font-mono ${data.bomba ? "text-green-600" : "text-red-600"}`}>
                            {data.bomba ? "ON" : "OFF"}
                          </span>
                        </li>
                        <li className="flex justify-between">
                          <span>Válvula 1:</span>
                          <span className={`font-mono ${data.valvula1 ? "text-green-600" : "text-red-600"}`}>
                            {data.valvula1 ? "ON" : "OFF"}
                          </span>
                        </li>
                        <li className="flex justify-between">
                          <span>Válvula 2:</span>
                          <span className={`font-mono ${data.valvula2 ? "text-green-600" : "text-red-600"}`}>
                            {data.valvula2 ? "ON" : "OFF"}
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      <footer className="border-t py-4">
        <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Sistema de Monitoreo de Agua
          </p>
        </div>
      </footer>
    </div>
  )
}



