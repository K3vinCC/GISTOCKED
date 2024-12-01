import React, { useState } from "react";
import {
  ScrollView,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Dimensions,
} from "react-native";
import { LineChart } from "react-native-chart-kit";
import axios from "axios";

export default function VentasGraficas() {
  const [productos, setProductos] = useState("");
  const [rango, setRango] = useState("1mes");
  const [data, setData] = useState({ labels: [], datasets: [] });

  const screenWidth = Dimensions.get("window").width;

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://190.114.252.218:8000/api/filtrar-ventas",
        {
          params: { "productos[]": productos.split(","), rango },
        }
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
          item.ventas.map((venta) => [venta.fecha_venta, venta.total])
        );
        return {
          label: item.producto,
          data: labels.map((label) => mapData[label] || 0),
          color: () =>
            `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 1)`,
        };
      });

      setData({ labels, datasets });
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Gráfica de Ventas</Text>
      <TextInput
        style={styles.input}
        placeholder="Productos (separados por coma)"
        value={productos}
        onChangeText={setProductos}
      />
      <TextInput
        style={styles.input}
        placeholder="Rango (1sem, 1mes, etc.)"
        value={rango}
        onChangeText={setRango}
      />
      <Button title="Generar Gráfica" onPress={fetchData} />
      {data.datasets.length > 0 && (
        <ScrollView horizontal>
          <LineChart
            data={data}
            width={Math.max(screenWidth * 1.5, data.labels.length * 100)}
            height={500}
            yAxisLabel="₡"
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
});
