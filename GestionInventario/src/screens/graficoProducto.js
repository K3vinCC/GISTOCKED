import React, { useState, useEffect } from "react";
import { ScrollView, Text, Button, StyleSheet, Dimensions, View } from "react-native";
import { LineChart } from "react-native-chart-kit";
import axios from "axios";
import { useUser } from "../components/UserContext"; // Asumiendo que el contexto de usuario proporciona el id_empresa

export default function VentasGraficas() {
  const [dias, setDias] = useState(7); // Rango de días predeterminado: 7 días
  const [ventasData, setVentasData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });
  const { id_empresa } = useUser(); // Obtener el id_empresa del contexto

  const screenWidth = Dimensions.get("window").width;

  const fetchVentasData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        "http://190.114.252.218:8000/api/obtener-ventas/",
        {
          id_empresa: 1, // Aquí debes usar el id_empresa real del contexto de usuario
          dias: dias, // Pasamos el número de días seleccionado
        },
        {
          headers: {
            "Content-Type": "application/json", // Aseguramos que los datos se envíen como JSON
          },
        }
      );
  
      console.log("Respuesta de la API:", response.data); // Ver la respuesta completa de la API
  
      const ventas = response.data;
      setVentasData(ventas); // Almacenar los datos de las ventas
  
      // Procesamos los datos para la gráfica
      const labels = ventas.map((venta) => venta.fecha_venta);
      const totals = ventas.map((venta) => venta.total);
  
      // Configurar los datos para la gráfica
      setChartData({
        labels: labels,
        datasets: [
          {
            data: totals,
            color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`, // Color de la línea
            strokeWidth: 2, // Ancho de la línea
          },
        ],
      });
    } catch (error) {
      if (error.response) {
        // Si el error tiene una respuesta (error 4xx o 5xx)
        console.error("Error en la respuesta de la API:", error.response.data);
        console.error("Código de estado:", error.response.status);
      } else if (error.request) {
        // Si no se recibió respuesta del servidor
        console.error("Error en la solicitud:", error.request);
      } else {
        // Otros errores en la configuración de la solicitud
        console.error("Error en la configuración de la solicitud:", error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };
  
  // Llamar a la función para obtener los datos cuando el componente se monta o el rango de días cambia
  useEffect(() => {
    fetchVentasData();
  }, [dias]);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Gráfica de Ventas</Text>

      {/* Botón para cambiar el rango de días */}
      <View style={styles.buttonContainer}>
        <Button title="Últimos 7 días" onPress={() => setDias(7)} />
        <Button title="Últimos 30 días" onPress={() => setDias(30)} />
        <Button title="Últimos 365 días" onPress={() => setDias(365)} />
      </View>

      {/* Mostrar el indicador de carga */}
      {isLoading ? (
        <Text>Cargando...</Text>
      ) : (
        <ScrollView horizontal>
          {/* Mostrar el gráfico solo si hay datos disponibles */}
          {chartData.labels.length > 0 && (
            <LineChart
              data={chartData}
              width={Math.max(screenWidth * 1.5, chartData.labels.length * 100)}
              height={500}
              yAxisLabel="$"
              chartConfig={{
                backgroundColor: "#ffffff",
                backgroundGradientFrom: "#f7f7f7",
                backgroundGradientTo: "#ececec",
                decimalPlaces: 0,
                color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                style: { borderRadius: 16 },
                propsForDots: {
                  r: "5",
                  strokeWidth: "2",
                  stroke: "#ffa726",
                },
              }}
              bezier
              style={{
                marginVertical: 15,
                borderRadius: 16,
              }}
              verticalLabelRotation={81}
            />
          )}
        </ScrollView>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginVertical: 10,
  },
});
