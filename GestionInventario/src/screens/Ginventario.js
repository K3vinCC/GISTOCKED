import React, { useState, useContext, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  Button,
  SafeAreaView,
  StatusBar,
  Modal,
  Alert
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ThemeContext } from '../../ThemeContext';
import styles from './styles/GinventarioStyles'; // Cambia la importación aquí

export default function App() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [addProductModalVisible, setAddProductModalVisible] = useState(false);
  const [detailModalVisible, setDetailModalVisible] = useState(false); // Nuevo estado para el modal de detalles
  const [newProduct, setNewProduct] = useState({
    id: '',
    nombre_producto: '',
    descripcion: '',
    precio_compra: '',
    porcentaje_ganancia: '',
    precio_venta: '',
    precio_final: '',
    stock: '',
    categoria: ''
  });
  const [data, setData] = useState([]);

  const { isDarkMode } = useContext(ThemeContext);
  const navigation = useNavigation();

  useEffect(() => {
    // Estilos del encabezado
    navigation.setOptions({
      headerStyle: {
        backgroundColor: isDarkMode ? '#0B1016' : '#5A6D7C',
      },
      headerTintColor: '#FFF',
    });

    // Cargar productos de la API
    fetchProducts();
  }, [isDarkMode, navigation]);

  const currentStyles = isDarkMode ? styles : styles; // Reemplazar según tus estilos

  // Función para obtener productos desde la API
  const fetchProducts = async () => {
    try {
      const response = await fetch('http://192.168.1.10:8000/api/v1/productos/');
      const products = await response.json();
      setData(products);
    } catch (error) {
      console.error('Error al cargar productos:', error);
    }
  };

  // Función para editar un producto
  const editProduct = async (product) => {
    try {
      const response = await fetch(`http://192.168.1.10:8000/api/v1/productos/${product.id}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
      });
      const updatedProduct = await response.json();

      // Actualiza la lista local de productos
      const updatedData = data.map((item) =>
        item.id === updatedProduct.id ? updatedProduct : item
      );
      setData(updatedData);
      setModalVisible(false);
      Alert.alert('Producto actualizado correctamente');
    } catch (error) {
      console.error('Error al actualizar producto:', error);
    }
  };

  // Función para agregar un nuevo producto
  const addProduct = async () => {
    try {
      // newProduct.id &&
      if ( newProduct.nombre_producto && newProduct.descripcion && newProduct.precio_compra) {
        const response = await fetch('http://192.168.1.10:8000/api/v1/productos/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newProduct),
        });
        const addedProduct = await response.json();
        setData([...data, addedProduct]);
        setAddProductModalVisible(false);
        setNewProduct({
          id: '',
          nombre_producto: '',
          descripcion: '',
          precio_compra: '',
          porcentaje_ganancia: '',
          precio_venta: '',
          precio_final: '',
          stock: '',
          categoria: ''
        });
        Alert.alert('Producto agregado correctamente');
      } else {
        Alert.alert("Por favor, completa todos los campos obligatorios.");
      }
    } catch (error) {
      console.error('Error al agregar producto:', error);
    }
  };

  // Función para eliminar un producto
  const deleteProduct = async (productId) => {
    try {
      await fetch(`http://192.168.1.10:8000/api/v1/productos/${productId}/`, {
        method: 'DELETE',
      });
      setData(data.filter((item) => item.id !== productId));
      Alert.alert('Producto eliminado correctamente');
    } catch (error) {
      console.error('Error al eliminar producto:', error);
    }
  };

  const renderItem = ({ item }) => (
    <View style={currentStyles.productContainer}>
      <View style={currentStyles.productDetails}>
        <Text style={{ color: 'white' }}>ID: {item.id}</Text>
        <Text style={{ color: 'white' }}>Nombre: {item.nombre_producto}</Text>
        <Text style={{ color: 'white' }}>Descripción: {item.descripcion}</Text>
        <Text style={{ color: 'white' }}>Precio Venta: $ {item.precio_final}</Text>
        <Text style={{ color: 'white' }}>Stock: {item.stock} unidades</Text>
        <Text style={{ color: 'white' }}>Categoría: {item.categoria}</Text>
      </View>
      <View style={currentStyles.buttonContainer}>
        <TouchableOpacity
          style={currentStyles.button}
          onPress={() => {
            setSelectedProduct(item);
            setModalVisible(true);
          }}
        >
          <Text style={currentStyles.buttonText}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[currentStyles.button, currentStyles.deleteButton]}
          onPress={() => deleteProduct(item.id)}
        >
          <Text style={currentStyles.buttonText}>Eliminar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={currentStyles.button}
          onPress={() => {
            setSelectedProduct(item);
            setDetailModalVisible(true); // Aquí es donde se usará setDetailModalVisible
          }}
        >
          <Text style={currentStyles.buttonText}>Detalles</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={currentStyles.safeArea}>
      <StatusBar barStyle="light-content" />
      <View style={currentStyles.container}>

        {/* Barra de búsqueda */}
        <View style={currentStyles.searchBar}>
          <TextInput
            style={currentStyles.searchInput}
            placeholder="Buscar por nombre..."
            placeholderTextColor={isDarkMode ? "#506D8A" : "#FFF"}
          />
          <Button title="Buscar" color="#E17055" onPress={() => {}} />
          <Button title="Filtrar" color="#E17055" onPress={() => {}} />
        </View>

        {/* Lista de productos */}
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()} // Asegúrate de convertir id a string
        />

        {/* Botón flotante para agregar producto */}
        <TouchableOpacity
          style={currentStyles.floatingButton}
          onPress={() => setAddProductModalVisible(true)}
        >
          <Text style={currentStyles.floatingButtonText}>+</Text>
        </TouchableOpacity>

        {/* Modal para editar el producto seleccionado */}
        {selectedProduct && (
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(!modalVisible)}
          >
            <View style={currentStyles.modalContainer}>
              <View style={currentStyles.modalContent}>
                <TouchableOpacity onPress={() => setModalVisible(false)} style={currentStyles.closeButton}>
                  <Text style={{ fontSize: 18 }}>×</Text>
                </TouchableOpacity>
                <Text style={currentStyles.modalText}>ID:</Text>
                <TextInput
                  style={currentStyles.modalInput}
                  value={selectedProduct.id.toString()} // Asegúrate de convertir id a string
                  editable={false} // Hacer el ID no editable
                />
                <Text style={currentStyles.modalText}>Nombre del Producto:</Text>
                <TextInput
                  style={currentStyles.modalInput}
                  value={selectedProduct.nombre_producto}
                  onChangeText={(text) =>
                    setSelectedProduct({ ...selectedProduct, nombre_producto: text })
                  }
                />
                <Text style={currentStyles.modalText}>Descripción:</Text>
                <TextInput
                  style={currentStyles.modalInput}
                  value={selectedProduct.descripcion}
                  onChangeText={(text) =>
                    setSelectedProduct({ ...selectedProduct, descripcion: text })
                  }
                />
                <Text style={currentStyles.modalText}>Precio de Compra:</Text>
                <TextInput
                  style={currentStyles.modalInput}
                  value={selectedProduct.precio_compra}
                  onChangeText={(text) =>
                    setSelectedProduct({ ...selectedProduct, precio_compra: text })
                  }
                />
                <Text style={currentStyles.modalText}>Porcentaje de Ganancia:</Text>
                <TextInput
                  style={currentStyles.modalInput}
                  value={selectedProduct.porcentaje_ganancia}
                  onChangeText={(text) =>
                    setSelectedProduct({ ...selectedProduct, porcentaje_ganancia: text })
                  }
                />
                <Text style={currentStyles.modalText}>Precio de Venta:</Text>
                <TextInput
                  style={currentStyles.modalInput}
                  value={selectedProduct.precio_venta}
                  onChangeText={(text) =>
                    setSelectedProduct({ ...selectedProduct, precio_venta: text })
                  }
                />
                <Text style={currentStyles.modalText}>Precio Final:</Text>
                <TextInput
                  style={currentStyles.modalInput}
                  value={selectedProduct.precio_final}
                  onChangeText={(text) =>
                    setSelectedProduct({ ...selectedProduct, precio_final: text })
                  }
                />
                <Text style={currentStyles.modalText}>Stock:</Text>
                <TextInput
                  style={currentStyles.modalInput}
                  value={selectedProduct.stock}
                  onChangeText={(text) =>
                    setSelectedProduct({ ...selectedProduct, stock: text })
                  }
                />
                <Text style={currentStyles.modalText}>Categoría:</Text>
                <TextInput
                  style={currentStyles.modalInput}
                  value={selectedProduct.categoria}
                  onChangeText={(text) =>
                    setSelectedProduct({ ...selectedProduct, categoria: text })
                  }
                />
                <View style={currentStyles.modalButtonContainer}>
                  <TouchableOpacity
                    style={currentStyles.button}
                    onPress={() => {
                      editProduct(selectedProduct);
                    }}
                  >
                    <Text style={currentStyles.buttonText}>Guardar Cambios</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={currentStyles.button}
                    onPress={() => setModalVisible(false)}
                  >
                    <Text style={currentStyles.buttonText}>Cerrar</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
        )}

        {/* Modal para agregar nuevo producto */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={addProductModalVisible}
          onRequestClose={() => setAddProductModalVisible(!addProductModalVisible)}
        >
          <View style={currentStyles.modalContainer}>
            <View style={currentStyles.modalContent}>
              <TouchableOpacity onPress={() => setAddProductModalVisible(false)} style={currentStyles.closeButton}>
                <Text style={{ fontSize: 18 }}>×</Text>
              </TouchableOpacity>
              <Text style={currentStyles.modalText}>Agregar Nuevo Producto</Text>
              {/* <TextInput
                style={currentStyles.modalInput}
                placeholder="ID"
                value={newProduct.id}
                onChangeText={(text) => setNewProduct({ ...newProduct, id: text })}
              /> */}
              <TextInput
                style={currentStyles.modalInput}
                placeholder="Nombre del Producto"
                value={newProduct.nombre_producto}
                onChangeText={(text) => setNewProduct({ ...newProduct, nombre_producto: text })}
              />
              <TextInput
                style={currentStyles.modalInput}
                placeholder="Descripción"
                value={newProduct.descripcion}
                onChangeText={(text) => setNewProduct({ ...newProduct, descripcion: text })}
              />
              <TextInput
                style={currentStyles.modalInput}
                placeholder="Precio de Compra"
                value={newProduct.precio_compra}
                onChangeText={(text) => setNewProduct({ ...newProduct, precio_compra: text })}
              />
              <TextInput
                style={currentStyles.modalInput}
                placeholder="Porcentaje de Ganancia"
                value={newProduct.porcentaje_ganancia}
                onChangeText={(text) => setNewProduct({ ...newProduct, porcentaje_ganancia: text })}
              />
              <TextInput
                style={currentStyles.modalInput}
                placeholder="Precio de Venta"
                value={newProduct.precio_venta}
                onChangeText={(text) => setNewProduct({ ...newProduct, precio_venta: text })}
              />
              <TextInput
                style={currentStyles.modalInput}
                placeholder="Precio Final"
                value={newProduct.precio_final}
                onChangeText={(text) => setNewProduct({ ...newProduct, precio_final: text })}
              />
              <TextInput
                style={currentStyles.modalInput}
                placeholder="Stock"
                value={newProduct.stock}
                onChangeText={(text) => setNewProduct({ ...newProduct, stock: text })}
              />
              <TextInput
                style={currentStyles.modalInput}
                placeholder="Categoría"
                value={newProduct.categoria}
                onChangeText={(text) => setNewProduct({ ...newProduct, categoria: text })}
              />
              <View style={currentStyles.modalButtonContainer}>
                <TouchableOpacity
                  style={currentStyles.button}
                  onPress={addProduct}
                >
                  <Text style={currentStyles.buttonText}>Agregar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={currentStyles.button}
                  onPress={() => setAddProductModalVisible(false)}
                >
                  <Text style={currentStyles.buttonText}>Cerrar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        {/* Modal para detalles del producto seleccionado */}
        {selectedProduct && (
          <Modal
            animationType="slide"
            transparent={true}
            visible={detailModalVisible}
            onRequestClose={() => setDetailModalVisible(false)}
          >
            <View style={currentStyles.modalContainer}>
              <View style={currentStyles.modalContent}>
                <TouchableOpacity onPress={() => setDetailModalVisible(false)} style={currentStyles.closeButton}>
                  <Text style={{ fontSize: 18 }}>×</Text>
                </TouchableOpacity>
                <Text style={currentStyles.modalText}>ID: {selectedProduct.id}</Text>
                <Text style={currentStyles.modalText}>Nombre del Producto: {selectedProduct.nombre_producto}</Text>
                <Text style={currentStyles.modalText}>Descripción: {selectedProduct.descripcion}</Text>
                <Text style={currentStyles.modalText}>Precio de Compra: {selectedProduct.precio_compra}</Text>
                <Text style={currentStyles.modalText}>Porcentaje de Ganancia: {selectedProduct.porcentaje_ganancia}</Text>
                <Text style={currentStyles.modalText}>Precio de Venta: {selectedProduct.precio_venta}</Text>
                <Text style={currentStyles.modalText}>Precio Final: {selectedProduct.precio_final}</Text>
                <Text style={currentStyles.modalText}>Stock: {selectedProduct.stock}</Text>
                <Text style={currentStyles.modalText}>Categoría: {selectedProduct.categoria}</Text>
                <TouchableOpacity
                  style={currentStyles.button}
                  onPress={() => setDetailModalVisible(false)}
                >
                  <Text style={currentStyles.buttonText}>Cerrar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        )}
      </View>
    </SafeAreaView>
  );
}


