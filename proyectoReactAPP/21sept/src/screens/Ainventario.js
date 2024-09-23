import React, { useContext, useEffect } from 'react';
import { ScrollView, View, Text, Button, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/native';
import { ThemeContext } from '../../ThemeContext';

export default function App() {
  const { isDarkMode } = useContext(ThemeContext);
  const navigation = useNavigation();


  useEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: isDarkMode ? '#0B1016' : '#34495E',
      }, headerTintColor:  '#FFF',
    });
  }, [isDarkMode, navigation]);
  
  const currentStyles = isDarkMode ? styles2 : styles;

  return (
    <View style={currentStyles.container}>
      <ScrollView contentContainerStyle={currentStyles.scrollContent}>
        {/* Card 1: Tendencias */}
        <View style={currentStyles.card}>
          <View style={currentStyles.cardHeader}>
            <Text style={currentStyles.cardTitle}>Tendencias</Text>
            <TouchableOpacity style={currentStyles.iconButton}>
              <Ionicons name="download-outline" size={20} color="white" />
            </TouchableOpacity>
          </View>
          {/* You can replace this with an Image or a graph */}
          <Image 
            style={currentStyles.chartImage}
            source={{ uri: 'https://example.com/chart1.png' }} 
          />
          <TouchableOpacity style={currentStyles.detailsButton}>
            <Text style={currentStyles.detailsText}>Detalles</Text>
          </TouchableOpacity>
        </View>

        {/* Card 2: Clasificación */}
        <View style={currentStyles.card}>
          <View style={currentStyles.cardHeader}>
            <Text style={currentStyles.cardTitle}>Clasificación</Text>
            <TouchableOpacity style={currentStyles.iconButton}>
              <Ionicons name="download-outline" size={20} color="white" />
            </TouchableOpacity>
          </View>
          {/* You can replace this with an Image or a graph */}
          <Image 
            style={currentStyles.chartImage}
            source={{ uri: 'https://example.com/chart2.png' }} 
          />
          <TouchableOpacity style={currentStyles.detailsButton}>
            <Text style={currentStyles.detailsText}>Detalles</Text>
          </TouchableOpacity>
        </View>

        {/* Card 3: Ventas */}
        <View style={currentStyles.card}>
          <View style={currentStyles.cardHeader}>
            <Text style={currentStyles.cardTitle}>Ventas</Text>
            <TouchableOpacity style={currentStyles.iconButton}>
              <Ionicons name="download-outline" size={20} color="white" />
            </TouchableOpacity>
          </View>
          {/* You can replace this with an Image or a graph */}
          <Image 
            style={currentStyles.chartImage}
            source={{ uri: 'https://example.com/chart3.png' }} 
          />
          <TouchableOpacity style={currentStyles.detailsButton}>
            <Text style={currentStyles.detailsText}>Detalles</Text>
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


const styles2 = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B1016',
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
    backgroundColor: '#16202C',
    borderRadius: 10,
    marginBottom: 20,
    padding: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 3 },
    borderColor: '#009679',
    borderWidth: 1,            // Thickness of the outer line (border)
    borderRadius: 10, 
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#506D8A', 
  },
  iconButton: {
    backgroundColor: '#009679',
    padding: 6,
    borderRadius: 20,
  },
  chartImage: {
    height: 150,
    backgroundColor: '#34495E', // Placeholder color
    marginVertical: 10,
    borderRadius: 10,
  },
  detailsButton: {
    backgroundColor: '#E17055',
    paddingVertical: 10,
    borderRadius: 20,
    alignItems: 'center',
  },
  detailsText: {
    color: '#ffff',
    fontWeight: 'bold',
  },
});
