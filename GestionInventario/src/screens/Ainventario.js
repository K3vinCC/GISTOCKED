import React from 'react';
import { ScrollView, View, Text, Button, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 

export default function App() {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Card 1: Tendencias */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Tendencias</Text>
            <TouchableOpacity style={styles.iconButton}>
              <Ionicons name="download-outline" size={20} color="white" />
            </TouchableOpacity>
          </View>
          {/* You can replace this with an Image or a graph */}
          <Image 
            style={styles.chartImage}
            source={{ uri: 'https://example.com/chart1.png' }} 
          />
          <TouchableOpacity style={styles.detailsButton}>
            <Text style={styles.detailsText}>Detalles</Text>
          </TouchableOpacity>
        </View>

        {/* Card 2: Clasificación */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Clasificación</Text>
            <TouchableOpacity style={styles.iconButton}>
              <Ionicons name="download-outline" size={20} color="white" />
            </TouchableOpacity>
          </View>
          {/* You can replace this with an Image or a graph */}
          <Image 
            style={styles.chartImage}
            source={{ uri: 'https://example.com/chart2.png' }} 
          />
          <TouchableOpacity style={styles.detailsButton}>
            <Text style={styles.detailsText}>Detalles</Text>
          </TouchableOpacity>
        </View>

        {/* Card 3: Ventas */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Ventas</Text>
            <TouchableOpacity style={styles.iconButton}>
              <Ionicons name="download-outline" size={20} color="white" />
            </TouchableOpacity>
          </View>
          {/* You can replace this with an Image or a graph */}
          <Image 
            style={styles.chartImage}
            source={{ uri: 'https://example.com/chart3.png' }} 
          />
          <TouchableOpacity style={styles.detailsButton}>
            <Text style={styles.detailsText}>Detalles</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  scrollContent: {
    paddingHorizontal: 15,
    paddingBottom: 80, // Extra space for scrolling
  },
  card: {
    backgroundColor: '#4B5A6C',
    borderRadius: 10,
    marginBottom: 20,
    padding: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 3 },
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF', 
  },
  iconButton: {
    backgroundColor: '#4a90e2',
    padding: 6,
    borderRadius: 20,
  },
  chartImage: {
    height: 150,
    backgroundColor: '#ffff', // Placeholder color
    marginVertical: 10,
    borderRadius: 10,
  },
  detailsButton: {
    backgroundColor: '#f08c4f',
    paddingVertical: 10,
    borderRadius: 20,
    alignItems: 'center',
  },
  detailsText: {
    color: '#ffff',
    fontWeight: 'bold',
  },
});
