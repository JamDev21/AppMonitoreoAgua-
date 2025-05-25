"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Droplets } from "lucide-react"

interface TankCardProps {
  title: string
  percentage: number
  color: "blue" | "green"
}

export function TankCard({ title, percentage, color }: TankCardProps) {
  // Determinar el color de texto según el nivel
  const getStatusColor = () => {
    if (percentage < 20) return "text-red-500"
    if (percentage < 40) return "text-orange-500"
    return "text-green-600"
  }

  // Determinar el mensaje de estado
  const getStatusMessage = () => {
    if (percentage < 20) return "Nivel crítico"
    if (percentage < 40) return "Nivel bajo"
    if (percentage < 70) return "Nivel adecuado"
    return "Nivel óptimo"
  }

  // Determinar el color del agua
  const getWaterColor = () => {
    return color === "blue" ? "from-blue-400 to-blue-500" : "from-green-400 to-green-500"
  }

  // Determinar el color del tinaco
  const getTankBorderColor = () => {
    return color === "blue" ? "border-blue-300" : "border-green-300"
  }

  return (
    <Card className="overflow-hidden">
      <CardHeader className={`bg-${color === "blue" ? "blue" : "green"}-50`}>
        <CardTitle className="flex items-center gap-2">
          <Droplets className={`h-5 w-5 text-${color === "blue" ? "blue" : "green"}-500`} />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="flex flex-col items-center space-y-4">
          <div className="relative w-48 h-64">
            {/* Tinaco exterior */}
            <div className={`absolute inset-0 border-4 ${getTankBorderColor()} rounded-lg overflow-hidden bg-gray-50`}>
              {/* Tapa superior del tinaco */}
              <div className={`absolute top-0 left-0 right-0 h-4 bg-gray-200 border-b ${getTankBorderColor()}`}></div>

              {/* Contenedor del agua con límite para overflow */}
              <div className="absolute inset-0 overflow-hidden">
                {/* Agua con animación */}
                <div
                  className={`absolute bottom-0 left-0 right-0 bg-gradient-to-b ${getWaterColor()} transition-all duration-1000 ease-in-out`}
                  style={{
                    height: `${percentage}%`,
                    animation: "waveEffect 2s infinite alternate",
                  }}
                >
                  {/* Olas en la superficie del agua */}
                  <div className="absolute top-0 left-0 right-0 h-4 overflow-hidden">
                    <div className="water-wave"></div>
                  </div>
                </div>
              </div>

              {/* Marcas de nivel */}
              <div className="absolute inset-y-0 right-2 flex flex-col justify-between py-8">
                <div className="h-0.5 w-3 bg-gray-400"></div>
                <div className="h-0.5 w-3 bg-gray-400"></div>
                <div className="h-0.5 w-3 bg-gray-400"></div>
                <div className="h-0.5 w-3 bg-gray-400"></div>
                <div className="h-0.5 w-3 bg-gray-400"></div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <div className="text-3xl font-bold">{percentage}%</div>
            <div className={`text-sm font-medium ${getStatusColor()}`}>{getStatusMessage()}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
