import React, { useState } from "react";
import {
  ScrollView,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Dimensions, // For dropdowns
} from "react-native";
import { LineChart } from "react-native-chart-kit";
import axios from "axios";
import { useUser } from '../components/UserContext'// Import UserContext
import { Picker } from '@react-native-picker/picker';


export default function VentasGraficas() {
  const [productos, setProductos] = useState("");
  const [rango, setRango] = useState("1mes");
  const [metric, setMetric] = useState("total_precio"); // "total_precio" (price) or "total_cantidad" (units)
  const [data, setData] = useState({ labels: [], datasets: [] });
  const [yAxisLabel, setYAxisLabel] = useState("$"); // Initial label is "$"
  const [isLoading, setIsLoading] = useState(false);

  const screenWidth = Dimensions.get("window").width;

  const fetchData = async () => {
    try {
      setIsLoading(true); // Start loading
      const params = {
        rango,
        metric,
      };

      if (productos.toLowerCase() === "total") {
        params["total"] = true; // Indicate request for all products
      } else {
        params["productos[]"] = productos.split(","); // Split input into an array
      }

      const response = await axios.get(
        "http://190.114.252.218:8000/api/filtrar-ventas",
        { params }
      );

      // Prepare chart data
      const labels = Array.from(
        new Set(
          response.data.flatMap((item) =>
            item.ventas.map((venta) => venta.fecha_venta)
          )
        )
      ).sort();

      const datasets = response.data.map((item) => {
        const mapData = Object.fromEntries(
          item.ventas.map((venta) => [venta.fecha_venta, venta[metric]])
        );
        return {
          label: item.producto,
          data: labels.map((label) => mapData[label] || 0),
          color: () =>
            `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 1)`,
        };
      });

      setData({ labels, datasets });

      // Update the label *after* the data has been set
      setYAxisLabel(metric === "total_precio" ? "$" : "u");
    } catch (error) {
      console.error("Error fetching data", error);
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Gráfica de Ventas</Text>
      <TextInput
        style={styles.input}
        placeholder="Productos (separados por coma o escribe 'Total')"
        value={productos}
        onChangeText={setProductos}
      />
      <Picker
        selectedValue={rango}
        style={styles.picker}
        onValueChange={(itemValue) => setRango(itemValue)}
      >
        <Picker.Item label="Última Semana" value="1sem" />
        <Picker.Item label="Último Mes" value="1mes" />
        <Picker.Item label="Último Año" value="1año" />
      </Picker>
      <Picker
        selectedValue={metric}
        style={styles.picker}
        onValueChange={(itemValue) => setMetric(itemValue)}
      >
        <Picker.Item label="Total Vendido" value="total_precio" />
        <Picker.Item label="Cantidad Vendida" value="total_cantidad" />
      </Picker>
      <Button
        title={isLoading ? "Cargando..." : "Generar Gráfica"}
        onPress={fetchData}
        disabled={isLoading} // Disable button while loading
      />
      {data.datasets.length > 0 && (
        <ScrollView horizontal>
          <LineChart
            data={data}
            width={Math.max(screenWidth * 1.5, data.labels.length * 100)}
            height={500}
            yAxisLabel={yAxisLabel}
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
  input: {
    borderWidth: 1,
    padding: 8,
    marginVertical: 5,
  },
  picker: {
    marginVertical: 5,
    height: 50,
    width: 150,
  },
});