import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Alert, Modal, Button } from 'react-native';
import axios from 'axios';
import { BarCodeScanner } from 'expo-barcode-scanner'; 
import { StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ThemeContext } from '../../ThemeContext';
import { useUser } from '../components/UserContext';

export default function App() {
    const { isDarkMode } = useContext(ThemeContext);
    const navigation = useNavigation();
  
    const [products, setProducts] = useState([]); // Estado para almacenar productos de la BD
    const [searchCodigo, setSearchCodigo] = useState('');
    const [addedProducts, setAddedProducts] = useState([]);
    const [total, setTotal] = useState(0);
    const [hasPermission, setHasPermission] = useState(null);
    const [scanning, setScanning] = useState(false);
    const [codigoVendedor, setCodigoVendedor] = useState('');
    const { user } = useUser();

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
        const fetchProducts = async () => {
            try {
                const response = await axios.get(`http://190.114.252.218:8000/api/inventarios?id_empresa=${user.id_empresa}/`);
                console.log('Productos recibidos:', response.data);
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
        const product = products.find(p => String(p.codigo) === String(codigo));
        if (product) {
            const updatedProducts = [...addedProducts];
            const index = updatedProducts.findIndex(p => String(p.codigo) === String(codigo));

            if (index !== -1) {
                const newQuantity = updatedProducts[index].cantidad + 1;
                if (newQuantity <= product.cantidad) {
                    updatedProducts[index].cantidad = newQuantity;
                    setTotal(total + product.precio_venta_final);
                } else {
                    Alert.alert('Límite alcanzado', 'No puedes agregar más de la cantidad disponible en inventario.');
                }
            } else {
                const newProduct = { ...product, cantidad: 1 };
                updatedProducts.push(newProduct);
                setTotal(total + product.precio_venta_final);
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
            const totalToRemove = productToRemove.precio_venta_final * productToRemove.cantidad;
            setAddedProducts(updatedProducts);
            setTotal(total - totalToRemove);
        }
    };

    const handleBarCodeScanned = ({ type, data }) => {
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
                    setTotal(total + product.precio_venta_final);
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
                    setTotal(total - product.precio_venta_final);
                    return { ...product, cantidad: newQuantity };
                }
            }
            return product;
        });
        setAddedProducts(updatedProducts);
    };

    const handleSale = async () => {
        if (codigoVendedor !== user.codigo_vendedor) {
            Alert.alert('Error', 'El código del vendedor es incorrecto');
            return;
        }

        const productosVenta = addedProducts.map(product => ({
            id_producto: product.codigo,
            cantidad: product.cantidad,
            precio_unitario: product.precio_venta_final,
            nombre_producto: product.nombre_producto,
        }));

        const ventaData = {
            venta_general: {
                codigo_vendedor: user.codigo_vendedor,
                id_empresa: user.id_empresa,
                total: total,
                fecha_venta: new Date().toISOString(),
            },
            productos: productosVenta,
        };

        try {
            await axios.post('http://190.114.252.218:8000/api/crear-venta/', ventaData);
            // Actualizar inventarios
            for (const product of addedProducts) {
                await axios.put(`http://190.114.252.218:8000/api/inventarios/${product.codigo}`, {
                    cantidad: product.cantidad - product.cantidad,
                });
            }
            Alert.alert('Venta realizada', 'La venta se ha realizado con éxito');
            // Limpiar los datos después de la venta
            setAddedProducts([]);
            setTotal(0);
            setSearchCodigo('');
        } catch (error) {
            console.error('Error al realizar la venta:', error);
            Alert.alert('Error', 'Hubo un problema al realizar la venta.');
        }
    };

    if (hasPermission === null) {
        return <Text>Solicitando permiso de cámara...</Text>;
    }

    if (hasPermission === false) {
        return <Text>No se ha concedido acceso a la cámara.</Text>;
    }

    const renderProduct = ({ item }) => {
        const product = addedProducts.find(p => p.codigo === item.codigo);
        const quantity = product ? product.cantidad : 1;

        return (
            <View style={currentStyles.productRow}>
                <Text style={currentStyles.productText}>{item.nombre_producto}</Text>
                <Text style={currentStyles.productText}>{`$${item.precio_venta_final.toFixed(2)}`}</Text>
                <View style={currentStyles.quantityContainer}>
                    <TouchableOpacity
                        style={currentStyles.quantityButton}
                        onPress={() => decrementQuantity(item.codigo)}
                        disabled={quantity <= 1}
                    >
                        <Text style={currentStyles.buttonText}>-</Text>
                    </TouchableOpacity>
                    <Text style={currentStyles.quantityText}>{quantity}</Text>
                    <TouchableOpacity
                        style={currentStyles.quantityButton}
                        onPress={() => incrementQuantity(item.codigo)}
                        disabled={quantity >= item.cantidad}
                    >
                        <Text style={currentStyles.buttonText}>+</Text>
                    </TouchableOpacity>
                </View>
                <View style={currentStyles.productActions}>
                    <TouchableOpacity style={currentStyles.iconButton} onPress={() => handleRemoveProduct(item.codigo)}>
                        <Text style={currentStyles.iconText}>❌</Text>
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
                        <BarCodeScanner
                            onBarCodeScanned={scanning ? handleBarCodeScanned : undefined}
                            style={currentStyles.cameraContainer}
                        />
                        <Button title="Cerrar escáner" onPress={() => setScanning(false)} />
                    </View>
                </Modal>
            )}

            <View style={currentStyles.productTable}>
                <FlatList
                    data={addedProducts}
                    renderItem={renderProduct}
                    keyExtractor={(item) => item.codigo.toString()}
                />
            </View>

            <View style={currentStyles.totalSection}>
                <Text style={currentStyles.totalText}>Total:</Text>
                <Text style={currentStyles.totalAmount}>{`$${total.toFixed(2)}`}</Text>
            </View>

            <View style={currentStyles.actionButtons}>
                <TouchableOpacity style={currentStyles.cancelButton} onPress={() => setAddedProducts([])}>
                    <Text style={currentStyles.cancelText}>Cancelar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={currentStyles.sellButton} onPress={handleSale}>
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
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: 100,
    },
    quantityButton: {
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#007BFF',
        borderRadius: 5,
        marginRight: 10,
    },
    buttonText: {
        color: '#FFF',
        fontSize: 20,
        lineHeight: 20,
    },
    quantityText: {
        marginHorizontal: 5,
        fontSize: 16,
        width: 30,
        textAlign: 'center',
    },
    productActions: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconButton: {
        marginLeft: 10,
    },
    iconText: {
        fontSize: 18,
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
