import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Alert, Modal, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ThemeContext } from '../../ThemeContext';

export default function App() {
    const { isDarkMode } = useContext(ThemeContext);
    const navigation = useNavigation();

    useEffect(() => {
        navigation.setOptions({
            headerStyle: {
                backgroundColor: isDarkMode ? '#0B1016' : '#34495E',
            },
            headerTintColor: '#FFF',
        });
    }, [isDarkMode, navigation]);

    const currentStyles = isDarkMode ? styles2 : styles;

    const [products, setProducts] = useState([]); // Lista de productos desde la API
    const [searchCodigo, setSearchCodigo] = useState('');
    const [addedProducts, setAddedProducts] = useState([]);
    const [total, setTotal] = useState(0);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [scanning, setScanning] = useState(false);
    const [quantityToSell, setQuantityToSell] = useState(1);
    const [modalVisible, setModalVisible] = useState(false);
    const [hasPermission, setHasPermission] = useState(null);

    useEffect(() => {
        const getBarCodeScannerPermissions = async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        };
        getBarCodeScannerPermissions();

        // Cargar productos desde la API al inicio
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await fetch('http://10.0.2.2:8000/api/plist/');
            const data = await response.json();
            setProducts(data);
        } catch (error) {
            Alert.alert('Error', 'No se pudieron cargar los productos.');
        }
    };

    const handleAddProduct = (id_producto) => {
        const product = products.find(p => p.id_producto === id_producto);
        if (product) {
            const isAlreadyAdded = addedProducts.find(p => p.id_producto === id_producto);
            if (isAlreadyAdded) {
                Alert.alert('Error', 'El producto ya ha sido agregado.');
            } else {
                setAddedProducts([...addedProducts, { ...product, cantidad: 1 }]); // Agregar con cantidad inicial 1
                setTotal(total + product.precio_venta_final);
            }
        } else {
            Alert.alert('Error', `Producto con código ${id_producto} no encontrado.`);
        }
        setSearchCodigo('');
    };

    const handleRemoveProduct = (id_producto) => {
        const productToRemove = addedProducts.find(p => p.id_producto === id_producto);
        if (productToRemove) {
            const updatedProducts = addedProducts.filter(p => p.id_producto !== id_producto);
            setAddedProducts(updatedProducts);
            setTotal(total - productToRemove.precio_venta_final);
        }
    };

    const handleSellProduct = (product) => {
        setSelectedProduct(product);
        setModalVisible(true);
    };

    const handleConfirmSell = async () => {
        if (quantityToSell > selectedProduct.cantidad) {
            Alert.alert('Error', 'No hay suficiente cantidad.');
            return;
        }

        const updatedProduct = { ...selectedProduct, cantidad: selectedProduct.cantidad - quantityToSell };
        const updatedProducts = addedProducts.map(p => p.id_producto === selectedProduct.id_producto ? updatedProduct : p);
        setAddedProducts(updatedProducts);

        // Actualizar total
        setTotal(total + selectedProduct.precio_venta_final * quantityToSell);

        // Realizar la solicitud a la API de Django
        try {
            const response = await fetch('http://10.0.2.2:8000/api/astock/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({
                    'id_producto': selectedProduct.id_producto,
                    'cantidad_vendida': quantityToSell.toString(),
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Error al actualizar el stock');
            }

            Alert.alert('Éxito', 'Stock actualizado: ' + data.producto + ' - Cantidad restante: ' + data.cantidad);
        } catch (error) {
            Alert.alert('Error', error.message);
        }

        setModalVisible(false);
        setQuantityToSell(1);
    };

    const handleBarCodeScanned = ({ type, data }) => {
        setScanning(false);
        setSearchCodigo(data);
        handleAddProduct(data);
    };

    if (hasPermission === null) {
        return <Text>Solicitando permiso de cámara...</Text>;
    }
    if (hasPermission === false) {
        return <Text>No se ha concedido acceso a la cámara.</Text>;
    }

    const renderSellModal = () => (
        <Modal visible={modalVisible} transparent={true} animationType="slide">
            <View style={currentStyles.modalContainer}>
                <View style={currentStyles.modalContent}>
                    <Text>Vender {selectedProduct?.nombre_producto}</Text>
                    <TextInput
                        value={quantityToSell.toString()}
                        onChangeText={setQuantityToSell}
                        keyboardType="numeric"
                        style={currentStyles.modalInput}
                    />
                    <Button title="Confirmar" onPress={handleConfirmSell} />
                    <Button title="Cancelar" onPress={() => setModalVisible(false)} />
                </View>
            </View>
        </Modal>
    );

    const renderProduct = ({ item }) => (
        <View style={currentStyles.productRow}>
            <Text style={currentStyles.productText}>{item.nombre_producto}</Text>
            <Text style={currentStyles.productText}>{item.precio_venta_final}</Text>
            <Text style={currentStyles.productText}>{item.cantidad}</Text>
            <View style={currentStyles.productActions}>
                <TouchableOpacity style={currentStyles.iconButton} onPress={() => handleSellProduct(item)}>
                    <Text style={currentStyles.iconText}>Vender</Text>
                </TouchableOpacity>
                <TouchableOpacity style={currentStyles.iconButton} onPress={() => handleRemoveProduct(item.id_producto)}>
                    <Text style={currentStyles.iconText}>Eliminar</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

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
                        <Button title={'volver'} onPress={() => setScanning(false)} />
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
                    keyExtractor={item => item.id_producto}
                    renderItem={renderProduct}
                />
            </View>
            <Text style={currentStyles.totalText}>Total: {total}</Text>
            {renderSellModal()}
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  searchSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  scanButton: {
    backgroundColor: '#d3d3d3',
    padding: 10,
    borderRadius: 8,
    justifyContent: 'center',
  },
  scanButtonText: {
    fontSize: 14,
    color: '#333',
  },
  productTable: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
  },
  productHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  headerText: {
    fontWeight: 'bold',
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
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
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
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
      backgroundColor: 'white',
      padding: 20,
      borderRadius: 10,
    },
    modalInput: {
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
      marginBottom: 20,
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
      alignItems: 'center',
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
  