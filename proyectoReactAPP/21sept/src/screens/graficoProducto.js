import React, { useState } from 'react';
import { ScrollView, Text, TextInput, Button, StyleSheet } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import axios from 'axios';

export default function VentasGraficas() {
  const [productos, setProductos] = useState('');
  const [rango, setRango] = useState('1mes');
  const [data, setData] = useState({ labels: [], datasets: [] });

  const fetchData = async () => {
    try {
      const response = await axios.get('http://190.114.252.218:8000/api/filtrar-ventas', {
        params: { productos: productos.split(','), rango },
      });

      // Formatear datos para el gráfico
      const labelsSet = new Set();
      const datasets = [];

      for (const [producto, info] of Object.entries(response.data)) {
        datasets.push({
          data: info.ventas.map(v => v.total),
          label: producto,
          color: () => `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 1)`,
        });
        info.ventas.forEach(v => labelsSet.add(v.fecha));
      }

      setData({ labels: Array.from(labelsSet).sort(), datasets });
    } catch (error) {
      console.error('Error al cargar datos:', error);
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
        placeholder="Rango (1dia, 1semana, 1mes, 6meses, 1año)"
        value={rango}
        onChangeText={setRango}
      />
      <Button title="Generar Gráfica" onPress={fetchData} />
      {data.datasets.length > 0 && (
        <LineChart
          data={{
            labels: data.labels,
            datasets: data.datasets,
          }}
          width={400}
          height={300}
          yAxisLabel=""
          chartConfig={{
            backgroundColor: '#ffffff',
            backgroundGradientFrom: '#f7f7f7',
            backgroundGradientTo: '#ececec',
            decimalPlaces: 2,
            color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          }}
        />
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
    fontWeight: 'bold',
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
});
