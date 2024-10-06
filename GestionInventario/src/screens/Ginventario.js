import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList, Button, SafeAreaView, StatusBar, Modal, Image, Alert } from 'react-native';

export default function App() {
  const [productos, setProductos] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  // Llamada a la API para obtener productos
  useEffect(() => {
    axios.get('http://192.168.1.10:8000/api/v1/productos/')
      .then(response => {
        setProductos(response.data);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  }, []);

  // Actualizar producto mediante API
  const handleUpdateProduct = () => {
    axios.put(`http://192.168.1.10:8000/api/v1/productos/${selectedProduct.id}/`, selectedProduct)
      .then(response => {
        const updatedProductos = productos.map(producto =>
          producto.id === selectedProduct.id ? response.data : producto
        );
        setProductos(updatedProductos);
        setModalVisible(false);
      })
      .catch(error => {
        console.error('Error updating product:', error);
      });
  };

  // Eliminar producto mediante API
  const handleDeleteProduct = (id) => {
    Alert.alert(
      "Eliminar Producto",
      "¿Estás seguro de que deseas eliminar este producto?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          onPress: () => {
            axios.delete(`http://192.168.1.10:8000/api/v1/productos/${id}/`)
              .then(() => {
                // Eliminar el producto del estado local
                const filteredProductos = productos.filter(producto => producto.id !== id);
                setProductos(filteredProductos);
              })
              .catch(error => {
                console.error('Error deleting product:', error);
              });
          },
          style: "destructive",
        }
      ]
    );
  };

  const handleInputChange = (name, value) => {
    setSelectedProduct({ ...selectedProduct, [name]: value });
  };

  const renderItem = ({ item }) => (
    <View style={styles.productContainer}>
      <Image style={styles.productImage} source={{ uri: item.imagen }} />
      <View style={styles.productDetails}>
        <Text style={{ color: 'white' }}>id: {item.id}</Text>
        <Text style={{ color: 'white' }}>codigo: {item.codigo}</Text>
        <Text style={{ color: 'white' }}>nombre: {item.nombre_producto}</Text>
        <Text style={{ color: 'white' }}>marca: {item.marca}</Text>
        <Text style={{ color: 'white' }}>precio venta: $ {item.precio_venta}</Text>
        <Text style={{ color: 'white' }}>stock: {item.stock} unidades</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            setSelectedProduct(item);
            setModalVisible(true);
          }}
        >
          <Text style={styles.buttonText}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleDeleteProduct(item.id)}
        >
          <Text style={styles.buttonText}>Eliminar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            setSelectedProduct(item);
            setModalVisible(true);
          }}
        >
          <Text style={styles.buttonText}>Detalles</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" />
      <View style={styles.container}>

        {/* Lista de productos */}
        <FlatList
          data={productos}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
        />

        {selectedProduct && (
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
                  <Text style={{ fontSize: 18 }}>×</Text>
                </TouchableOpacity>

                <Image style={styles.productImage} source={{ uri: selectedProduct.imagen }} />

                <Text style={styles.modalText}>codigo:</Text>
                <TextInput
                  style={styles.modalInput}
                  value={selectedProduct.codigo}
                  onChangeText={(value) => handleInputChange('codigo', value)}
                />

                <Text style={styles.modalText}>nombre:</Text>
                <TextInput
                  style={styles.modalInput}
                  value={selectedProduct.nombre_producto}
                  onChangeText={(value) => handleInputChange('nombre_producto', value)}
                />

                <Text style={styles.modalText}>marca:</Text>
                <TextInput
                  style={styles.modalInput}
                  value={selectedProduct.marca}
                  onChangeText={(value) => handleInputChange('marca', value)}
                />

                <Text style={styles.modalText}>stock:</Text>
                <TextInput
                  style={styles.modalInput}
                  value={String(selectedProduct.stock)}
                  onChangeText={(value) => handleInputChange('stock', value)}
                />

                <Text style={styles.modalText}>precio venta:</Text>
                <TextInput
                  style={styles.modalInput}
                  value={String(selectedProduct.precio_venta)}
                  onChangeText={(value) => handleInputChange('precio_venta', value)}
                />

                {/* Botón para actualizar los datos */}
                <TouchableOpacity style={styles.updateButton} onPress={handleUpdateProduct}>
                  <Text style={styles.updateButtonText}>Actualizar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        )}
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
  productContainer: {
    flexDirection: 'row',
    backgroundColor: '#d3d3d3',
    marginVertical: 5,
    padding: 10,
    borderRadius: 5,
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#4B5A6C',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  closeButton: {
    alignSelf: 'flex-end',
  },
  productImage: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  modalText: {
    fontSize: 14,
    color: '#fff',
  },
  modalInput: {
    width: '100%',
    color: '#fff',
    borderBottomWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
    paddingVertical: 5,
  },
  updateButton: {
    backgroundColor: '#28a745',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
  },
  updateButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});
