import React, { useState, useEffect } from "react";
import {
  ScrollView,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Dimensions,
  View,
} from "react-native";
import { LineChart } from "react-native-chart-kit";
import axios from "axios";
import { Picker } from "@react-native-picker/picker";
import { useUser } from "../components/UserContext";

export default function VentasGraficas() {
  // Primer Gráfico - Productos y métricas
  const [productos, setProductos] = useState("");
  const [rango, setRango] = useState("1mes");
  const [metric, setMetric] = useState("total_precio");
  const [data, setData] = useState({ labels: [], datasets: [] });
  const [yAxisLabel, setYAxisLabel] = useState("$");
  const [isLoading1, setIsLoading1] = useState(false);

  // Segundo Gráfico - Días
  const [dias, setDias] = useState("");
  const [ventasData, setVentasData] = useState([]);
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });
  const [isLoading2, setIsLoading2] = useState(false);
  const { id_empresa } = useUser();

  const screenWidth = Dimensions.get("window").width;

  // Función para obtener datos para el primer gráfico
  const fetchData = async () => {
    try {
      setIsLoading1(true);
      const params = { rango, metric };

      if (productos.toLowerCase() === "total") {
        params["total"] = true;
      } else {
        params["productos[]"] = productos.split(",");
      }

      const response = await axios.get(
        "http://190.114.252.218:8000/api/filtrar-ventas",
        { params }
      );

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
      setYAxisLabel(metric === "total_precio" ? "$" : "u");
    } catch (error) {
      console.error("Error fetching data", error);
    } finally {
      setIsLoading1(false);
    }
  };

  // Función para obtener datos para el segundo gráfico
  const fetchVentasData = async () => {
    try {
      setIsLoading2(true);
      const response = await axios.post(
        "http://190.114.252.218:8000/api/obtener-ventas/",
        {
          id_empresa: id_empresa || 1,
          dias: parseInt(dias, 10),
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const ventas = response.data;
      setVentasData(ventas);

      const labels = ventas.map((venta) => venta.fecha_venta);
      const totals = ventas.map((venta) => venta.total);

      setChartData({
        labels,
        datasets: [
          {
            data: totals,
            color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,
            strokeWidth: 2,
          },
        ],
      });
    } catch (error) {
      console.error("Error fetching ventas data", error);
    } finally {
      setIsLoading2(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Primer Gráfico */}
      <View style={styles.section}>
        <Text style={styles.title}>Gráfica por Productos</Text>
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
          title={isLoading1 ? "Cargando..." : "Generar Gráfica"}
          onPress={fetchData}
          disabled={isLoading1}
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
      </View>

      {/* Segundo Gráfico */}
      <View style={styles.section}>
        <Text style={styles.title}>Gráfica Ventas por Días</Text>
        <TextInput
          style={styles.input}
          placeholder="Ingrese número de días"
          value={dias}
          onChangeText={setDias}
          keyboardType="numeric"
        />
        <Button
          title={isLoading2 ? "Cargando..." : "Generar Gráfica"}
          onPress={fetchVentasData}
          disabled={isLoading2 || !dias}
        />
        {chartData.labels.length > 0 && (
          <ScrollView horizontal>
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
          </ScrollView>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  section: {
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    padding: 8,
    marginVertical: 5,
    borderRadius: 5,
  },
  picker: {
    marginVertical: 5,
    height: 50,
    width: "100%",
  },
});
