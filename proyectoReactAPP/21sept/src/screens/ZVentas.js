// Retaining existing import statements and structures...
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

    const [products, setProducts] = useState([]);
    const [searchCodigo, setSearchCodigo] = useState('');
    const [addedProducts, setAddedProducts] = useState([]);
    const [total, setTotal] = useState(0);
    const [hasPermission, setHasPermission] = useState(null);
    const [scanning, setScanning] = useState(false);
    const [quantityToAdd, setQuantityToAdd] = useState(1);

    // Effect to handle header styles based on theme
    useEffect(() => {
        navigation.setOptions({
            headerStyle: {
                backgroundColor: isDarkMode ? '#0B1016' : '#34495E',
            },
            headerTintColor: '#FFF',
        });
    }, [isDarkMode, navigation]);

    // Apply dark mode styling if needed
    const currentStyles = isDarkMode ? styles2 : styles;

    // Fetch products from the API
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://190.114.252.218:8000/api/inventarios');
                setProducts(response.data);
            } catch (error) {
                Alert.alert('Error', 'No se pudieron cargar los productos de la base de datos.');
            }
        };
        fetchProducts();
    }, []);

    // Request barcode scanner permission
    useEffect(() => {
        const getBarCodeScannerPermissions = async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        };
        getBarCodeScannerPermissions();
    }, []);

    // Functionality to add a product based on barcode
    const handleAddProduct = (codigo, quantity) => {
        const product = products.find(p => String(p.codigo) === String(codigo));

        if (product) {
            const updatedProducts = [...addedProducts];
            const index = updatedProducts.findIndex(p => String(p.codigo) === String(codigo));

            // Si no se proporciona cantidad (vacío), agregar 1 por defecto
            const finalQuantity = quantity ? quantity : 1;

            if (index !== -1) {
                const newQuantity = updatedProducts[index].cantidad + finalQuantity;
                if (newQuantity <= product.cantidad) {
                    updatedProducts[index].cantidad = newQuantity;
                    setTotal(total + product.precio_venta_final * finalQuantity);
                } else {
                    Alert.alert('Límite alcanzado', 'No puedes agregar más de la cantidad disponible en inventario.');
                }
            } else {
                if (finalQuantity <= product.cantidad) {
                    const newProduct = { ...product, cantidad: finalQuantity };
                    updatedProducts.push(newProduct);
                    setTotal(total + product.precio_venta_final * finalQuantity);
                } else {
                    Alert.alert('Límite alcanzado', 'No puedes agregar más de la cantidad disponible en inventario.');
                }
            }
            setAddedProducts(updatedProducts);
        } else {
            Alert.alert('Error', `Producto con código ${codigo} no encontrado.`);
        }

        setSearchCodigo(''); // Limpia el campo del código
    };

    // Remove product from the cart
    const handleRemoveProduct = (codigo) => {
        const productToRemove = addedProducts.find(p => p.codigo === codigo);
        if (productToRemove) {
            const updatedProducts = addedProducts.filter(p => p.codigo !== codigo);
            const totalToRemove = productToRemove.precio_venta_final * productToRemove.cantidad;
            setAddedProducts(updatedProducts);
            setTotal(total - totalToRemove);
        }
    };

    // Functionality for barcode scanning
    const handleBarCodeScanned = ({ type, data }) => {
        setScanning(false);
        setSearchCodigo(data);
        handleAddProduct(data);
    };

    // Increment quantity of product in the cart
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

    // Decrement quantity with delay
    const decrementQuantity = (codigo) => {
        const updatedProducts = addedProducts.map(product => {
            if (product.codigo === codigo && product.cantidad > 1) {
                setTimeout(() => {
                    const newQuantity = product.cantidad - 1;
                    setTotal(total - product.precio_venta_final);
                    return { ...product, cantidad: newQuantity };
                }, 200); // Delay added here
            }
            return product;
        });
        setAddedProducts(updatedProducts);
    };

    // Render products in the FlatList
    const handleQuantityChange = (codigo, newQuantity) => {
        const updatedProducts = [...addedProducts];
        const index = updatedProducts.findIndex(p => p.codigo === codigo);

        if (index !== -1) {
            const productInDB = products.find(p => p.codigo === codigo);

            // Si el TextInput está vacío (newQuantity es NaN), no hacer nada, solo actualizar el total a 0
            if (isNaN(newQuantity)) {
                updatedProducts[index].cantidad = '';
                setTotal(total - updatedProducts[index].cantidad * productInDB.precio_venta_final);
            }
            // Si la cantidad es válida y no excede el inventario disponible
            else if (productInDB && newQuantity <= productInDB.cantidad) {
                const difference = newQuantity - updatedProducts[index].cantidad;
                updatedProducts[index].cantidad = newQuantity;
                setTotal(total + difference * productInDB.precio_venta_final);
            } else {
                Alert.alert('Límite alcanzado', 'No puedes agregar más de la cantidad disponible en inventario.');
            }
            setAddedProducts(updatedProducts);
        }
    };

    // Cambios específicos en las vistas para permitir la edición de la cantidad directamente
    const renderProduct = ({ item }) => {
        const product = addedProducts.find(p => p.codigo === item.codigo);
        const quantity = product ? product.cantidad : '';

        return (
            <View style={currentStyles.productRow}>
                <Text style={currentStyles.productText}>Nombre: {item.nombre_producto}</Text>
                <Text style={currentStyles.productText}>Precio: ${item.precio_venta_final.toFixed(2)}</Text>

                <View style={currentStyles.quantityContainer}>
                    {/* Input editable de cantidad */}
                    <TextInput
                        style={currentStyles.quantityInput}
                        keyboardType="numeric"
                        value={String(quantity)} // Si no hay cantidad, será un string vacío
                        onChangeText={(value) => handleQuantityChange(item.codigo, parseInt(value) || '')} // No poner ningún valor si se borra todo
                    />
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

const handleSellProducts = async () => {
    try {
        const sellRequests = addedProducts.map(product => {
            const updatedQuantity = product.cantidad - product.cantidad_vendida;
            return axios.put(`http://190.114.252.218:8000/api/inventarios/${product.codigo}/`, {
                cantidad: updatedQuantity // Actualiza la cantidad en la base de datos
            });
        });

        await Promise.all(sellRequests); // Espera que todas las actualizaciones se completen
        Alert.alert('Éxito', 'Venta realizada y base de datos actualizada');
        setAddedProducts([]); // Limpia los productos añadidos después de la venta
        setTotal(0); // Reinicia el total
    } catch (error) {
        Alert.alert('Error', 'No se pudo realizar la venta.');
    }
};
return (
    <View style={currentStyles.container}>
        <StatusBar barStyle="light-content" />
        <View style={currentStyles.searchSection}>
            <TextInput
                style={currentStyles.searchInput}
                placeholder="Buscar por código"
                placeholderTextColor={isDarkMode ? "#506D8A" : "#808080"}
                value={searchCodigo}
                onChangeText={setSearchCodigo}
            />
            <TextInput
                style={currentStyles.quantityInput}
                keyboardType="numeric"
                placeholder="Cantidad"  // Se mostrará el placeholder cuando esté vacío
                value={quantityToAdd !== '' && !isNaN(quantityToAdd) ? String(quantityToAdd) : ''}  // Si está vacío o NaN, se muestra vacío
                onChangeText={(value) => setQuantityToAdd(value === '' ? '' : parseInt(value))}  // Si está vacío, no convertir a número
            />
            <TouchableOpacity style={currentStyles.scanButton} onPress={() => handleAddProduct(searchCodigo)}>
                <Text style={currentStyles.scanButtonText}>Agregar</Text>
            </TouchableOpacity>
        </View>

        {/* Lista de productos añadidos */}
        <FlatList
            data={addedProducts}
            keyExtractor={(item) => String(item.codigo)}
            renderItem={renderProduct}
        />

        <View style={currentStyles.totalSection}>
            <Text style={currentStyles.totalText}>Total</Text>
            <Text style={currentStyles.totalAmount}>{`$${total.toFixed(2)}`}</Text>
        </View>

        {/* Botón para realizar la venta */}
        <View style={currentStyles.actionButtons}>
            <TouchableOpacity style={currentStyles.sellButton} onPress={handleSellProducts}>
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
        fontSize: 18, // Ajusta el tamaño del texto del producto
    },
    // Ajuste para que los campos de cantidad y código tengan la misma altura
    quantityInput: {
        borderWidth: 1,
        borderColor: '#DDD',
        textAlign: 'center',
        width: 50,
        height: 40, // Misma altura que el código
        fontSize: 16, // Tamaño ajustado
    },
    // Ajuste del espaciado entre Precio y Cantidad
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: 120, // Aumenta el ancho para separar precio y cantidad
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
        height: 40, // Misma altura que la cantidad
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
