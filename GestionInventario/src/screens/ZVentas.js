import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Alert, Modal, Button } from 'react-native';
import axios from 'axios';
import { BarCodeScanner } from 'expo-barcode-scanner'; 
import { StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ThemeContext } from '../../ThemeContext';

export default function App() {
    const { isDarkMode } = useContext(ThemeContext);
    const navigation = useNavigation();
  
    const [products, setProducts] = useState([]); // Estado para almacenar productos de la BD
    const [searchCodigo, setSearchCodigo] = useState('');
    const [addedProducts, setAddedProducts] = useState([]);
    const [total, setTotal] = useState(0);
    const [hasPermission, setHasPermission] = useState(null);
    const [scanning, setScanning] = useState(false);
  
    useEffect(() => {
        navigation.setOptions({
            headerStyle: {
                backgroundColor: isDarkMode ? '#0B1016' : '#34495E',
            }, 
            headerTintColor:  '#FFF',
        });
    }, [isDarkMode, navigation]);
    
    const currentStyles = isDarkMode ? styles2 : styles;
    
    useEffect(() => {
        // Solicitud para obtener productos de la base de datos al montar el componente
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://190.114.252.218:8000/api/inventarios'); // Cambia la URL según tu backend
                console.log('Productos recibidos:', response.data); // Log de productos recibidos
                setProducts(response.data);
            } catch (error) {
                console.error('Error al cargar los productos:', error);
                Alert.alert('Error', 'No se pudieron cargar los productos de la base de datos.');
            }
        };

        fetchProducts();
    }, []);

    useEffect(() => {
        const getBarCodeScannerPermissions = async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        };
        getBarCodeScannerPermissions();
    }, []);

    const handleAddProduct = (codigo) => {
        console.log('Código a agregar:', codigo); // Log del código que se intenta agregar
        const product = products.find(p => String(p.codigo) === String(codigo)); // Convertir ambos a String para asegurar coincidencias
        if (product) {
            const updatedProducts = [...addedProducts];
            const index = updatedProducts.findIndex(p => String(p.codigo) === String(codigo));

            if (index !== -1) {
                // Si el producto ya fue agregado, solo incrementamos la cantidad y actualizamos el total
                const newQuantity = updatedProducts[index].cantidad + 1;
                if (newQuantity <= product.cantidad) { // Comprobar límite de cantidad
                    updatedProducts[index].cantidad = newQuantity; // Incrementamos la cantidad
                    setTotal(total + product.precio_venta_final); // Sumar el precio al total
                } else {
                    Alert.alert('Límite alcanzado', 'No puedes agregar más de la cantidad disponible en inventario.');
                }
            } else {
                // Si no ha sido agregado, lo añadimos con cantidad 1
                const newProduct = { ...product, cantidad: 1 }; // Añadir la cantidad inicial
                updatedProducts.push(newProduct);
                setTotal(total + product.precio_venta_final); // Sumar al total
            }
            setAddedProducts(updatedProducts);
        } else {
            Alert.alert('Error', `Producto con código ${codigo} no encontrado.`);
        }
        setSearchCodigo('');
    };

    const handleRemoveProduct = (codigo) => {
        const productToRemove = addedProducts.find(p => p.codigo === codigo);
        if (productToRemove) {
            const updatedProducts = addedProducts.filter(p => p.codigo !== codigo);
            const totalToRemove = productToRemove.precio_venta_final * productToRemove.cantidad; // Calcular total a remover
            setAddedProducts(updatedProducts);
            setTotal(total - totalToRemove); // Restar el total
        }
    };

    const handleBarCodeScanned = ({ type, data }) => {
        console.log('Código escaneado:', data); // Log del código escaneado
        setScanning(false); 
        setSearchCodigo(data); 
        handleAddProduct(data); 
    };

    const incrementQuantity = (codigo) => {
      const updatedProducts = addedProducts.map(product => {
          if (product.codigo === codigo) {
              const newQuantity = product.cantidad + 1;
              const productInDB = products.find(p => p.codigo === codigo);
              if (productInDB && newQuantity <= productInDB.cantidad) {
                  setTotal(total + product.precio_venta_final); // Sumar al total
                  return { ...product, cantidad: newQuantity };
              } else {
                  Alert.alert('Límite alcanzado', 'No puedes agregar más de la cantidad disponible en inventario.');
              }
          }
          return product;
      });
      setAddedProducts(updatedProducts);
  };

  const decrementQuantity = (codigo) => {
    const updatedProducts = addedProducts.map(product => {
        if (product.codigo === codigo) {
            if (product.cantidad > 1) {
                const newQuantity = product.cantidad - 1;
                setTotal(total - product.precio_venta_final); // Restar del total
                return { ...product, cantidad: newQuantity };
            }
        }
        return product;
    });
    setAddedProducts(updatedProducts);
};

    if (hasPermission === null) {
        return <Text>Solicitando permiso de cámara...</Text>;
    }

    if (hasPermission === false) {
        return <Text>No se ha concedido acceso a la cámara.</Text>;
    }

    const renderProduct = ({ item }) => {
      const product = addedProducts.find(p => p.codigo === item.codigo);
      const quantity = product ? product.cantidad : 1; // Cambia esto si quieres manejar la cantidad de otra forma
  
      return (
          <View style={currentStyles.productRow}>
              <Text style={currentStyles.productText}>{item.nombre_producto ? String(item.nombre_producto) : ''}</Text>
              <Text style={currentStyles.productText}>{item.precio_venta_final ? `$${item.precio_venta_final.toFixed(2)}` : ''}</Text>
              <View style={currentStyles.quantityContainer}>
                  <TouchableOpacity
                      style={currentStyles.quantityButton}
                      onPress={() => decrementQuantity(item.codigo)} // Cambia aquí para llamar a decrementQuantity
                      disabled={quantity <= 1} // Desactiva si la cantidad es 1
                  >
                      <Text style={currentStyles.buttonText}>-</Text>
                  </TouchableOpacity>
                  <Text style={currentStyles.quantityText}>{quantity}</Text>
                  <TouchableOpacity
                      style={currentStyles.quantityButton}
                      onPress={() => incrementQuantity(item.codigo)} // Cambia aquí para llamar a incrementQuantity
                      disabled={quantity >= item.cantidad} // Desactiva si alcanza el límite
                  >
                      <Text style={currentStyles.buttonText}>+</Text>
                  </TouchableOpacity>
              </View>
              <View style={currentStyles.productActions}>
                  <TouchableOpacity style={currentStyles.iconButton} onPress={() => handleRemoveProduct(item.codigo)}>
                      <Text style={currentStyles.iconText}>❌</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={currentStyles.iconButton}>
                      <Text style={currentStyles.iconText}>ℹ️</Text>
                  </TouchableOpacity>
              </View>
          </View>
      );
  };

    return (
        <View style={currentStyles.container}>
            <StatusBar barStyle="light-content" />
            <View style={currentStyles.searchSection}>
                <TextInput
                    style={currentStyles.searchInput}
                    placeholder="Buscar por código"
                    placeholderTextColor={isDarkMode ? "#506D8A" : "#FFF"}
                    value={searchCodigo}
                    onChangeText={setSearchCodigo}
                />
                <TouchableOpacity style={currentStyles.scanButton} onPress={() => handleAddProduct(searchCodigo)}>
                    <Text style={currentStyles.scanButtonText}>Agregar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={currentStyles.scanButton} onPress={() => setScanning(true)}>
                    <Text style={currentStyles.scanButtonText}>QR</Text>
                </TouchableOpacity>
            </View>
            {scanning && (
                <Modal visible={scanning} animationType="slide">
                    <View style={currentStyles.modalContainer}>
                        <View style={currentStyles.cameraContainer}>
                            <BarCodeScanner
                                onBarCodeScanned={scanning ? handleBarCodeScanned : undefined}
                                style={currentStyles.camera}
                            />
                        </View>
                        <Button title="Cancelar" onPress={() => setScanning(false)} />
                    </View>
                </Modal>
            )}
            <View style={currentStyles.productTable}>
                <View style={currentStyles.productHeader}>
                    <Text style={currentStyles.headerText}>Producto</Text>
                    <Text style={currentStyles.headerText}>Precio</Text>
                    <Text style={currentStyles.headerText}>Cantidad</Text>
                    <Text style={currentStyles.headerText}>Opciones</Text>
                </View>
                <FlatList
                    data={addedProducts}
                    keyExtractor={(item) => item.codigo ? String(item.codigo) : Math.random().toString()} // Asegúrate de que sea un string
                    renderItem={renderProduct}
                />
            </View>
            <View style={currentStyles.totalSection}>
                <Text style={currentStyles.totalText}>Total</Text>
                <Text style={currentStyles.totalAmount}>${total.toFixed(2)}</Text>
            </View>
            <View style={currentStyles.actionButtons}>
                <TouchableOpacity style={currentStyles.cancelButton}>
                    <Text style={currentStyles.cancelText}>Cancelar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={currentStyles.sellButton}>
                    <Text style={currentStyles.sellText}>Vender</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#FFF',
    },
    productRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderColor: '#DDD',
    },
    productText: {
        flex: 1,
    },
    // Otros estilos...
    quantityContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between', // Espaciado entre botones y cantidad
      width: 100, // Ajusta esto para limitar el espacio total ocupado
    },
    quantityButton: {
        padding: 10, // Ajusta el padding para hacer el botón más compacto
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#007BFF',
        borderRadius: 5,
        marginRight:10,
    },
    buttonText: {
        color: '#FFF', // Color del texto del botón
        fontSize: 20, // Tamaño del texto, puedes ajustarlo a tu preferencia
        lineHeight: 20, // Asegura un buen espacio vertical
    },
    quantityText: {
        marginHorizontal: 5, // Espaciado horizontal reducido
        fontSize: 16,
        width: 30, // Asegúrate de que este ancho no sea excesivo
        textAlign: 'center', // Centra el texto
    },
    buttonText: {
        color: '#FFF', // Color del texto del botón
        fontSize: 5, // Tamaño de la fuente
    },
    productActions: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconButton: {
        marginLeft: 10,
    },
    searchSection: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    searchInput: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#DDD',
        padding: 10,
        marginRight: 10,
    },
    scanButton: {
        backgroundColor: '#007BFF',
        padding: 10,
        borderRadius: 5,
    },
    scanButtonText: {
        color: '#FFF',
    },
    productTable: {
        marginBottom: 20,
    },
    productHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderColor: '#DDD',
    },
    headerText: {
        fontWeight: 'bold',
        flex: 1,
    },
    totalSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 10,
    },
    totalText: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    totalAmount: {
        fontSize: 16,
    },
    actionButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    cancelButton: {
        backgroundColor: 'red',
        padding: 10,
        borderRadius: 5,
    },
    cancelText: {
        color: '#FFF',
    },
    sellButton: {
        backgroundColor: 'green',
        padding: 10,
        borderRadius: 5,
    },
    sellText: {
        color: '#FFF',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cameraContainer: {
        width: '100%',
        height: '100%',
    },
    camera: {
        width: '100%',
        height: '100%',
    },
});


const styles2 = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: '#0B1016',
    },
    searchSection: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 20,
    },
    searchInput: {
      backgroundColor: "#16202C",
      flex: 1,
      borderColor: '#009679',
      borderWidth: 1,
      borderRadius: 8,
      paddingHorizontal: 10,
      marginRight: 10,
    },
    scanButton: {
      backgroundColor: '#E17055',
      padding: 10,
      borderRadius: 8,
      justifyContent: 'center',
    },
    scanButtonText: {
      fontSize: 14,
      color: '#FFF',
    },
    productTable: {
      backgroundColor: '#16202C',
      borderRadius: 8,
      padding: 10,
      marginBottom: 20,
      borderColor: '#009679',
      borderWidth: 1,
    },
    productHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 10,
    },
    headerText: {
      fontWeight: 'bold',
      color: "#009679"
    },
    productRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 10,
    },
    productText: {
      fontSize: 16,
    },
    productActions: {
      flexDirection: 'row',
    },
    iconButton: {
      marginLeft: 10,
    },
    iconText: {
      fontSize: 18,
    },
    totalSection: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 20,
    },
    totalText: {
      fontSize: 18,
      fontWeight: 'bold',
      color: "#fff"
    },
    totalAmount: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#D8D8D8',
    },
    actionButtons: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    cancelButton: {
      backgroundColor: '#f08080',
      padding: 15,
      borderRadius: 8,
    },
    cancelText: {
      fontSize: 16,
      color: '#fff',
    },
    sellButton: {
      backgroundColor: '#4CAF50',
      padding: 15,
      borderRadius: 8,
    },
    sellText: {
      fontSize: 16,
      color: '#fff',
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',s
    },
    cameraContainer: {
      width: '80%',
      height: '60%',
      borderWidth: 1,
      borderColor: '#ddd',
      borderRadius: 10,
      overflow: 'hidden',
    },
    camera: {
      flex: 1,
    },
  });
  