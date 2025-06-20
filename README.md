# 💧 Sistema de Monitoreo Inteligente de Nivel de Agua

Este proyecto es un sistema de monitoreo en tiempo real para el control de niveles de agua en **dos tinacos**, utilizando sensores ultrasónicos conectados a un **ESP32**, una interfaz web construida con **React + TypeScript**, y un backend embebido con una **API REST** programada directamente en el microcontrolador.

> Cuando **NO** hay conexión activa con el ESP32, el sistema entra en **modo demostración**, generando datos simulados para pruebas.

### Te dejo un enlace para que puedas ver en funcionamiento la app junto con los sensores y verifiques el correcto funcionamiento: 
https://atitalaquia-my.sharepoint.com/:v:/g/personal/221150052_atitalaquia_tecnm_mx/ERGvN26wqCZNh56xTQnECkwBDBp3lvqJixUK2DZXeQ7zmw?nav=eyJyZWZlcnJhbEluZm8iOnsicmVmZXJyYWxBcHAiOiJPbmVEcml2ZUZvckJ1c2luZXNzIiwicmVmZXJyYWxBcHBQbGF0Zm9ybSI6IldlYiIsInJlZmVycmFsTW9kZSI6InZpZXciLCJyZWZlcnJhbFZpZXciOiJNeUZpbGVzTGlua0NvcHkifX0&e=YiDrk5
---

## 🌟 Funcionalidades

- 📊 Visualización en tiempo real de los niveles de agua (en porcentaje)
- 🚰 Control automático de:
  - Bomba de agua
  - Válvulas de llenado para cada tinaco
- 🔌 Conexión directa vía red Wi-Fi con el ESP32
- 📡 API REST embebida en el ESP32 con datos JSON
- ⚙️ Modo de simulación con datos aleatorios si no hay conexión
- 🧠 Lógica automática de llenado:
  - Prioriza el tinaco que esté más vacío
  - Apaga la bomba cuando ambos están llenos

---

## 🔧 Tecnologías utilizadas

| Componente | Tecnología |
|-----------|-------------|
| Microcontrolador | **ESP32** |
| Lenguaje embebido | C++ (Arduino) |
| Comunicación | API REST con `ESPAsyncWebServer` |
| Sensores | 2x HC-SR04 (ultrasónicos) |
| Web | **React + TypeScript** |
| UI Framework | Tailwind CSS + ShadCN |
| Estado simulado | `useState`, `setTimeout`, `Math.random()` |

---

## ⚙️ Cómo funciona

1. **ESP32 mide la distancia** en cada tinaco usando sensores ultrasónicos.
2. Calcula el porcentaje de llenado usando fórmulas calibradas por altura.
3. Expone un endpoint REST `GET /api/data` con los datos:
   ```json
   {
     "tanque1": 85,
     "tanque2": 60,
     "bomba": true,
     "valvula1": false,
     "valvula2": true
   }
4. La app en React consulta este endpoint cada 2 segundos y actualiza el dashboard.


