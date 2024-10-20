import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList, Button, SafeAreaView, StatusBar, Modal, Image, ScrollView } from 'react-native';
import axios from 'axios'; // Importa axios
import { useNavigation } from '@react-navigation/native';
import { ThemeContext } from '../../ThemeContext';
import { Picker } from '@react-native-picker/picker';

export default function App() {
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [addProductModalVisible, setAddProductModalVisible] = useState(false);
    
    // Define el estado para las categorías
    const [categorias, setCategorias] = useState([]);
    
    const [newProduct, setNewProduct] = useState({
        codigo: '',
        nombre_producto: '',
        img: '',
        descripcion: '',
        precio_compra: '',
        porcentaje_de_ganancia: '',
        precio_neto: '',
        precio_venta: '',
        precio_venta_final: '',
        id_categoria: '', // Aquí se guardará la categoría seleccionada
        descuento: '',
        precio_descuento: '',
        cantidad: '',
        id_empresa: ''
    });

    const [data, setData] = useState([]);

    const { isDarkMode } = useContext(ThemeContext);
    const navigation = useNavigation();

    useEffect(() => {
        navigation.setOptions({
            headerStyle: {
                backgroundColor: isDarkMode ? '#0B1016' : '#34495E',
            },
            headerTintColor: '#FFF',
        });

        // Función para obtener productos desde la API
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://190.114.252.218:8000/api/inventarios/');
                setData(response.data); // Asigna los productos obtenidos a data
            } catch (error) {
                console.error(error);
            }
        };

        // Función para obtener categorías desde la API
        const fetchCategorias = async () => {
            try {
                const response = await axios.get('http://190.114.252.218:8000/api/categorias/');
                setCategorias(response.data); // Asigna las categorías obtenidas
            } catch (error) {
                console.error(error);
            }
        };

        // Llama a las funciones para obtener los datos
        fetchProducts();
        fetchCategorias();
    }, [isDarkMode, navigation]);

    const currentStyles = isDarkMode ? styles2 : styles;

    const renderItem = ({ item }) => (
        <View style={currentStyles.productContainer}>
            <Image style={currentStyles.productImage} source={{ uri: item.img }} />
            <View style={currentStyles.productDetails}>
                <Text style={{ color: 'white' }}>Código: {item.codigo}</Text>
                <Text style={{ color: 'white' }}>Nombre: {item.nombre_producto}</Text>
                <Text style={{ color: 'white' }}>Marca: {item.marca || 'No disponible'}</Text>
                <Text style={{ color: 'white' }}>Precio: $ {item.precio_venta_final}</Text>
                <Text style={{ color: 'white' }}>Stock: {item.cantidad || 'No disponible'} unidades</Text>
            </View>
            <View style={currentStyles.buttonContainer}>
                <TouchableOpacity
                    style={currentStyles.button}
                    onPress={() => {
                        setSelectedProduct(item);
                        setModalVisible(true);
                    }}
                >
                    <Text style={currentStyles.buttonText}>Detalles</Text>
                </TouchableOpacity>

                <TouchableOpacity style={currentStyles.button}>
                    <Text style={currentStyles.buttonText}>Editar</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={currentStyles.button}
                    onPress={() => {
                        // Aquí puedes agregar la función para eliminar el producto
                        // Por ejemplo: eliminarProducto(item.id);
                    }}
                >
                    <Text style={currentStyles.buttonText}>Eliminar</Text>
                </TouchableOpacity >
            </View>
        </View>
    );

    // Función para agregar un nuevo producto
    const addProduct = () => {
        console.log("Datos a enviar:", newProduct); // Imprime los datos a enviar
        if (newProduct.codigo && newProduct.nombre_producto && newProduct.img && newProduct.descripcion && newProduct.precio_compra && newProduct.porcentaje_de_ganancia && newProduct.precio_neto && newProduct.precio_venta && newProduct.precio_venta_final && newProduct.id_categoria && newProduct.descuento && newProduct.precio_descuento && newProduct.cantidad && newProduct.id_empresa) {
            axios.post('http://190.114.252.218:8000/api/inventarios/', newProduct)
                .then(response => {
                    setData([...data, response.data]);
                    setAddProductModalVisible(false);
                    setNewProduct({
                        codigo: '',
                        nombre_producto: '',
                        img: '',
                        descripcion: '',
                        precio_compra: '',
                        porcentaje_de_ganancia: '',
                        precio_neto: '',
                        precio_venta: '',
                        precio_venta_final: '',
                        id_categoria: '',
                        descuento: '',
                        precio_descuento: '',
                        cantidad: '',
                        id_empresa: ''
                    });
                })
                .catch(error => {
                    if (axios.isAxiosError(error)) {
                        console.error('Error al agregar el producto:', error.response.data); // Muestra el error del servidor
                    } else {
                        console.error('Error inesperado:', error);
                    }
                });
        } else {
            alert("Por favor, completa todos los campos obligatorios.");
        }
    };

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
                    <View style={currentStyles.buttonSpacing}>
                        <Button title="Buscar" color="#E17055" onPress={() => {}} />
                    </View>
                    <View style={currentStyles.buttonSpacing}>
                        <Button title="Filtrar" color="#E17055" onPress={() => {}} />
                    </View>
                </View>

                {/* Lista de productos */}
                <FlatList
                    data={data}
                    renderItem={renderItem}
                    keyExtractor={item => item.id_producto.toString()}
                />

                {/* Botón flotante para agregar producto */}
                <TouchableOpacity
                    style={currentStyles.floatingButton}
                    onPress={() => setAddProductModalVisible(true)}
                >
                    <Text style={currentStyles.floatingButtonText}>+</Text>
                </TouchableOpacity>

                {/* Modal para ver detalles del producto seleccionado */}
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
                                    <Text style={{ fontSize: 30, fontWeight: 'bold', color: '#E17055' }}>×</Text>
                                </TouchableOpacity>
                                <ScrollView>
                                    <Image style={currentStyles.productImage} source={{ uri: selectedProduct.img }} />
                                    <Text style={currentStyles.modalText}>Código:</Text>
                                    <TextInput style={currentStyles.modalInput} value={selectedProduct.codigo.toString()} editable={false} />
                                    <Text style={currentStyles.modalText}>Nombre:</Text>
                                    <TextInput style={currentStyles.modalInput} value={selectedProduct.nombre_producto} editable={false} />
                                    <Text style={currentStyles.modalText}>Marca:</Text>
                                    <TextInput style={currentStyles.modalInput} value={selectedProduct.marca || 'No disponible'} editable={false} />
                                    <Text style={currentStyles.modalText}>Precio venta:</Text>
                                    <TextInput style={currentStyles.modalInput} value={`$ ${selectedProduct.precio_venta_final}`} editable={false} />
                                    <Text style={currentStyles.modalText}>Stock:</Text>
                                    <TextInput style={currentStyles.modalInput} value={`${selectedProduct.cantidad || 'No disponible'} unidades`} editable={false} />

                                    {/* Detalles adicionales del producto */}
                                    <Text style={currentStyles.modalText}>Descripción:</Text>
                                    <TextInput style={currentStyles.modalInput} value={selectedProduct.descripcion} editable={false} />
                                    <Text style={currentStyles.modalText}>Precio de compra:</Text>
                                    <TextInput style={currentStyles.modalInput} value={`$ ${selectedProduct.precio_compra}`} editable={false} />
                                    <Text style={currentStyles.modalText}>Porcentaje de ganancia:</Text>
                                    <TextInput style={currentStyles.modalInput} value={`${selectedProduct.porcentaje_de_ganancia}%`} editable={false} />
                                    <Text style={currentStyles.modalText}>Precio neto:</Text>
                                    <TextInput style={currentStyles.modalInput} value={`$ ${selectedProduct.precio_neto}`} editable={false} />
                                </ScrollView>
                            </View>
                        </View>
                    </Modal>
                )}

                {/* Modal para agregar un nuevo producto */}
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={addProductModalVisible}
                    onRequestClose={() => setAddProductModalVisible(!addProductModalVisible)}
                >
                    <View style={currentStyles.modalContainer}>
                        <View style={currentStyles.modalContent}>
                            <TouchableOpacity onPress={() => setAddProductModalVisible(false)} style={currentStyles.closeButton}>
                                <Text style={{ fontSize: 30, fontWeight: 'bold', color: '#E17055' }}>×</Text>
                            </TouchableOpacity>
                            <ScrollView>
                                <TextInput
                                    style={currentStyles.modalInput}
                                    placeholder="Código"
                                    value={newProduct.codigo}
                                    onChangeText={(text) => setNewProduct({ ...newProduct, codigo: text })}
                                />
                                <TextInput
                                    style={currentStyles.modalInput}
                                    placeholder="Nombre del producto"
                                    value={newProduct.nombre_producto}
                                    onChangeText={(text) => setNewProduct({ ...newProduct, nombre_producto: text })}
                                />
                                <TextInput
                                    style={currentStyles.modalInput}
                                    placeholder="URL de imagen"
                                    value={newProduct.img}
                                    onChangeText={(text) => setNewProduct({ ...newProduct, img: text })}
                                />
                                <TextInput
                                    style={currentStyles.modalInput}
                                    placeholder="Descripción"
                                    value={newProduct.descripcion}
                                    onChangeText={(text) => setNewProduct({ ...newProduct, descripcion: text })}
                                />
                                <TextInput
                                    style={currentStyles.modalInput}
                                    placeholder="Precio de compra"
                                    keyboardType="numeric"
                                    value={newProduct.precio_compra}
                                    onChangeText={(text) => setNewProduct({ ...newProduct, precio_compra: text })}
                                />
                                <TextInput
                                    style={currentStyles.modalInput}
                                    placeholder="Porcentaje de ganancia"
                                    keyboardType="numeric"
                                    value={newProduct.porcentaje_de_ganancia}
                                    onChangeText={(text) => setNewProduct({ ...newProduct, porcentaje_de_ganancia: text })}
                                />
                                <TextInput
                                    style={currentStyles.modalInput}
                                    placeholder="Precio neto"
                                    keyboardType="numeric"
                                    value={newProduct.precio_neto}
                                    onChangeText={(text) => setNewProduct({ ...newProduct, precio_neto: text })}
                                />
                                <TextInput
                                    style={currentStyles.modalInput}
                                    placeholder="Precio de venta"
                                    keyboardType="numeric"
                                    value={newProduct.precio_venta}
                                    onChangeText={(text) => setNewProduct({ ...newProduct, precio_venta: text })}
                                />
                                <TextInput
                                    style={currentStyles.modalInput}
                                    placeholder="Precio de venta final"
                                    keyboardType="numeric"
                                    value={newProduct.precio_venta_final}
                                    onChangeText={(text) => setNewProduct({ ...newProduct, precio_venta_final: text })}
                                />
                                <TextInput
                                    style={currentStyles.modalInput}
                                    placeholder="Descuento"
                                    keyboardType="numeric"
                                    value={newProduct.descuento}
                                    onChangeText={(text) => setNewProduct({ ...newProduct, descuento: text })}
                                />
                                <TextInput
                                    style={currentStyles.modalInput}
                                    placeholder="Precio de descuento"
                                    keyboardType="numeric"
                                    value={newProduct.precio_descuento}
                                    onChangeText={(text) => setNewProduct({ ...newProduct, precio_descuento: text })}
                                />
                                <TextInput
                                    style={currentStyles.modalInput}
                                    placeholder="Cantidad"
                                    keyboardType="numeric"
                                    value={newProduct.cantidad}
                                    onChangeText={(text) => setNewProduct({ ...newProduct, cantidad: text })}
                                />
                                <TextInput
                                    style={currentStyles.modalInput}
                                    placeholder="ID de la empresa"
                                    keyboardType="numeric"
                                    value={newProduct.id_empresa}
                                    onChangeText={(text) => setNewProduct({ ...newProduct, id_empresa: text })}
                                />

                                {/* Select para elegir la categoría */}
                                <View style={currentStyles.selectContainer}>
                                    <Text style={currentStyles.selectLabel}>Categoría:</Text>
                                    <Picker
                                        selectedValue={newProduct.id_categoria}
                                        style={currentStyles.picker}
                                        onValueChange={(itemValue) => setNewProduct({ ...newProduct, id_categoria: itemValue })}
                                    >
                                        {categorias.map((categoria) => (
                                            <Picker.Item label={categoria.nombre_categoria} value={categoria.id_categoria} key={categoria.id_categoria} />
                                        ))}
                                    </Picker>
                                </View>

                                <TouchableOpacity style={currentStyles.addButton} onPress={addProduct}>
                                    <Text style={currentStyles.addButtonText}>Agregar Producto</Text>
                                </TouchableOpacity>
                            </ScrollView>
                        </View>
                    </View>
                </Modal>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#34495E',
    },
    container: {
        flex: 1,
        padding: 10,
    },
    searchBar: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    searchInput: {
        flex: 1,
        backgroundColor: '#FFF',
        borderRadius: 5,
        padding: 10,
        marginRight: 10,
    },
    productContainer: {
        flexDirection: 'row',
        backgroundColor: '#2C3E50',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    },
    productImage: {
        width: 50,
        height: 50,
        borderRadius: 5,
        marginRight: 10,
    },
    productDetails: {
        flex: 1,
        justifyContent: 'center',
    },
    buttonContainer: {
        flexDirection: 'column', // Cambia a 'column' para apilar los botones verticalmente
        justifyContent: 'center', // Centrar los botones verticalmente
        marginVertical: 10, // Espacio vertical entre el contenedor y otros elementos
        alignItems: 'center', // Centrar los botones horizontalmente
    },
    button: {
        width: '100%', // Ajustar el ancho del botón
        backgroundColor: '#E17055', // Color de fondo del botón
        padding: 10, // Padding interno del botón
        borderRadius: 5, // Esquinas redondeadas
        marginBottom: 10, // Margen inferior para separar los botones
    },
    
    buttonText: {
        color: '#FFF',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
        
        backgroundColor: '#34495E',
        borderRadius: 5,
        padding: 20,
        margin: 20,
        width:'90%',
        height:'95%',
    },
    closeButton: {
        alignItems: 'flex-end',
    },
    modalText: {
        marginBottom: 5,
    },
    modalInput: {
        backgroundColor: '#F0F0F0',
        borderRadius: 5,
        padding: 10,
        marginBottom: 15,
    },
    modalTitle: {
        fontSize: 18,
        color: '#ffff',
        fontWeight: 'bold',
        marginBottom: 10,
    },
    floatingButton: {
        position: 'absolute',
        right: 20,
        bottom: 20,
        backgroundColor: '#E17055',
        borderRadius: 30,
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 8,
    },
    floatingButtonText: {
        color: '#FFF',
        fontSize: 30,
    },
    addButton: {
        backgroundColor: '#E17055', // Cambia esto al color que desees
        padding: 10,
        borderRadius: 5,
        alignItems: 'center', // Centra el texto en el botón
        marginVertical: 10, // Espacio vertical alrededor del botón
    },
    buttonText: {
        color: '#FFFFFF', // Color del texto del botón
        fontSize: 16, // Tamaño de la fuente
        fontWeight: 'bold', // Negrita
    },
    buttonSpacing: {
        marginHorizontal: 5, // Espacio horizontal entre los botones
    },
});

// Estilos para el modo oscuro
const styles2 = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#0B1016',
    },
    container: {
        flex: 1,
        padding: 10,
    },
    searchBar: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    searchInput: {
        flex: 1,
        backgroundColor: '#2C3E50',
        borderRadius: 5,
        padding: 10,
        marginRight: 10,
        color: '#FFF',
    },
    productContainer: {
        flexDirection: 'row',
        backgroundColor: '#1B1F25',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    },
    productImage: {
        width: 50,
        height: 50,
        borderRadius: 5,
        marginRight: 10,
    },
    productDetails: {
        flex: 1,
        justifyContent: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    button: {
        backgroundColor: '#E17055',
        padding: 10,
        borderRadius: 5,
        marginLeft: 5,
    },
    buttonText: {
        color: '#FFF',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
        backgroundColor: '#FFF',
        borderRadius: 5,
        padding: 20,
        margin: 20,
    },
    closeButton: {
        alignItems: 'flex-end',
    },
    modalText: {
        marginBottom: 5,
    },
    modalInput: {
        backgroundColor: '#3C4043',
        borderRadius: 5,
        padding: 10,
        marginBottom: 15,
        color: '#FFF',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    floatingButton: {
        position: 'absolute',
        right: 20,
        bottom: 20,
        backgroundColor: '#E17055',
        borderRadius: 30,
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 8,
    },
    floatingButtonText: {
        color: '#FFF',
        fontSize: 30,
    },
});
