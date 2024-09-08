import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList, Button, SafeAreaView, StatusBar } from 'react-native';

export default function App() {
  const renderItem = ({ item }) => (
    <View style={styles.productContainer}>
      <View style={styles.imagePlaceholder} />
      <View style={styles.productDetails}>
        <Text>nombre: {item.name}</Text>
        <Text>marca: {item.brand}</Text>
        <Text>precio venta: $ {item.price}</Text>
        <Text>stock: {item.stock} unidades</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>editar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>eliminar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Detalles</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" />
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Gestión de inventario</Text>
        </View>

        <View style={styles.searchBar}>
          <TextInput style={styles.searchInput} placeholder="Buscar..." />
          <Button title="filtrar" onPress={() => {}} />
          <TextInput style={styles.categoryInput} placeholder="categoría: xxxxx" />
        </View>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#5A6D7C',
  },
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  header: {
    backgroundColor: '#5A6D7C',
    padding: 15,
  },
  headerText: {
    color: '#fff',
    fontSize: 20,
    textAlign: 'center',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#e0e0e0',
  },
  searchInput: {
    flex: 1,
    padding: 5,
    backgroundColor: '#fff',
    borderRadius: 5,
    marginRight: 10,
  },
  categoryInput: {
    flex: 1,
    padding: 5,
    backgroundColor: '#fff',
    borderRadius: 5,
    marginLeft: 10,
  },
  productContainer: {
    flexDirection: 'row',
    backgroundColor: '#d3d3d3',
    marginVertical: 5,
    padding: 10,
    borderRadius: 5,
  },
  imagePlaceholder: {
    width: 50,
    height: 50,
    backgroundColor: '#fff',
    marginRight: 10,
  },
  productDetails: {
    flex: 1,
    backgroundColor: '#4B5A6C',
    padding: 10,
    borderRadius: 5,
  },
  buttonContainer: {
    justifyContent: 'space-around',
    marginLeft: 10,
  },
  button: {
    backgroundColor: '#f28b82',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
  },
});
