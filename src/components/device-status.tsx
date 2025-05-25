import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Droplets, Power, AnvilIcon as Valve } from "lucide-react"

interface DeviceStatusProps {
  title: string
  status: boolean
  icon: "pump" | "valve"
}

export function DeviceStatus({ title, status, icon }: DeviceStatusProps) {
  // Determinar el ícono según el tipo de dispositivo
  const getIcon = () => {
    switch (icon) {
      case "pump":
        return <Power className="h-5 w-5" />
      case "valve":
        return <Valve className="h-5 w-5" />
      default:
        return <Droplets className="h-5 w-5" />
    }
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className={`rounded-full p-2 ${status ? "bg-green-100" : "bg-red-100"}`}>{getIcon()}</div>
            <span className="text-xl font-bold">{status ? "ON" : "OFF"}</span>
          </div>
          <div className={`h-4 w-4 rounded-full ${status ? "bg-green-500 animate-pulse" : "bg-red-500"}`} />
        </div>
      </CardContent>
    </Card>
  )
}
