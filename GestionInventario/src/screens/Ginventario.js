import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList, Button, SafeAreaView, StatusBar, Modal, Image, ScrollView } from 'react-native';
import axios from 'axios'; // Importa axios
import { useNavigation } from '@react-navigation/native';
import { ThemeContext } from '../../ThemeContext';
import { Picker } from '@react-native-picker/picker';
import { Alert } from 'react-native';
import { useUser } from '../components/UserContext';
import { BarCodeScanner } from 'expo-barcode-scanner';

export default function App() {
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [editProductModalVisible, setEditProductModalVisible] = useState(false); // Nuevo estado para el modal de edición
    const [addProductModalVisible, setAddProductModalVisible] = useState(false);
    const [confirmDeleteModalVisible, setConfirmDeleteModalVisible] = useState(false); // Modal para confirmar eliminación
    const [productToDelete, setProductToDelete] = useState(null);
    const [productToEdit, setProductToEdit] = useState(null); // Estado para el producto a editar
    const { user } = useUser();
    const [hasPermission, setHasPermission] = useState(null); // Estado para permisos
    const [scanning, setScanning] = useState(false);
    
    const [showNewCategoryModal, setShowNewCategoryModal] = useState(false);
    const [newCategory, setNewCategory] = useState({
        nombre_categoria: "",
        id_empresa: user.id_empresa,
    });
    // const handleAddCategory = async () => {
    //     if (!newCategory.nombre_categoria) {
    //         Alert.alert("Error", "Por favor, ingresa un nombre para la categoría.");
    //         return;
    //     }
    
    //     try {
    //         // Construimos el objeto que solo contiene los campos necesarios
    //         const categoryToSend = {
    //             nombre_categoria: newCategory.nombre_categoria,
    //             id_empresa: user.id_empresa, // Incluimos solo este dato
    //         };
    
    //         // Realizamos la solicitud POST o PUT (según sea necesario)
    //         const response = await axios.post(
    //             "http://190.114.252.218:8000/api/categorias/",
    //             categoryToSend
    //         );
    
    //         // Actualizamos las categorías con la respuesta del servidor
    //         setCategorias([...categorias, response.data]);
    //         setShowNewCategoryModal(false);
    
    //         // Reseteamos el estado del formulario
    //         setNewCategory({ nombre_categoria: "", id_empresa: user.id_empresa });
    //     } catch (error) {
    //         console.error("Error al agregar la categoría:", error.response?.data || error.message);
    //         Alert.alert("Error", "No se pudo agregar la categoría.");
    //     }
    // };
  
    const handleAddCategory = async () => {
        try {
            await axios.post(
                'http://190.114.252.218:8000/api/categorias/', 
                { nombre_categoria: newCategory.nombre_categoria,
                 id_empresa: user.id_empresa
                 },
                { headers: { 'Content-Type': 'application/json' } }
            );
            Alert.alert('Éxito', 'Categoría agregada correctamente');
            setShowNewCategoryModal(false);
            fetchCategorias(); // Actualiza las categorías después de agregar una nueva
        } catch (error) {
            console.error('Error al agregar categoría:', error);
            Alert.alert('Error', 'No se pudo agregar la categoría');
        }
    };
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
        cantidad: ''
    });
    const [data, setData] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [showCategoryModal, setShowCategoryModal] = useState(false);
    const { isDarkMode } = useContext(ThemeContext);
    const [noProductsMessage, setNoProductsMessage] = useState('');
    const navigation = useNavigation();

    useEffect(() => {
        (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    useEffect(() => {
    if (newProduct.precio_compra && newProduct.porcentaje_de_ganancia) {
        const precioCompra = parseFloat(newProduct.precio_compra);
        const porcentajeGanancia = parseFloat(newProduct.porcentaje_de_ganancia);
        const iva = 0.19;

        // Calcular Precio Neto
        const precioNeto = Math.round(precioCompra + (precioCompra * (porcentajeGanancia / 100)));
        // Calcular Precio Venta (sin tocar precio_venta_final)
        const precioVenta = Math.round(precioNeto + (precioNeto * iva));

        // Calcular Precio con Descuento
        let precioConDescuento;
        const porcentajeDescuento = parseFloat(newProduct.descuento);

        if (porcentajeDescuento === 0) {
            // Si el descuento es 0, el precio con descuento es igual al precio_venta_final
            precioConDescuento = newProduct.precio_venta_final; // Mantener precio_venta_final del usuario
        } else {
            // Si el descuento es mayor que 0, calculamos el precio con descuento
            precioConDescuento = Math.round((precioNeto - (precioNeto * (porcentajeDescuento / 100))) + (precioNeto * iva));
        }

        // Actualizar el estado de los precios (no tocamos precio_venta_final)
        setNewProduct(prevState => ({
            ...prevState,
            precio_neto: precioNeto,
            precio_venta: precioVenta,
            precio_descuento: precioConDescuento // Asignar precio con descuento
        }));
    }
}, [newProduct.precio_compra, newProduct.porcentaje_de_ganancia, newProduct.descuento, newProduct.precio_venta_final]);  // Dependemos de precio_compra, porcentaje_de_ganancia, descuento y precio_venta_final

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
                const response = await axios.get(`http://190.114.252.218:8000/api/inventarios?id_empresa=${user.id_empresa}/`);
                const allProducts = response.data;
                console.log(response.data)
        
                // Filtra los productos que coincidan con el id_empresa del usuario
                const filteredProducts = allProducts.filter(product => product.id_empresa === user.id_empresa);
        
                setData(filteredProducts); // Asigna los productos filtrados a data
            } catch (error) {
                console.error(error);
            }
        };
        

        // Función para obtener categorías desde la API
        const fetchCategorias = async () => {
            try {
                const body = { id_empresa: 1 }; // Ajusta el ID según corresponda
                const response = await axios.post('http://190.114.252.218:8000/api/categoria-empresa/', body, {
                    headers: { 'Content-Type': 'application/json' },
                });
                setCategorias(response.data); // Asigna las categorías obtenidas
            } catch (error) {
                console.error('Error al obtener categorías:', error);
            }
        };
        // Llama a las funciones para obtener los datos
        fetchProducts();
        fetchCategorias();
    }, [isDarkMode, navigation]);
    const handleFilter = (category, search) => {
        setSelectedCategory(category);
    
        // Filtrar por id_empresa del usuario
        let filtered = data.filter(product => product.id_empresa === user.id_empresa);
    
        // Filtrar por categoría
        if (category) {
            filtered = filtered.filter(product => product.id_categoria === category);
        }
    
        // Filtrar por nombre o código
        if (search) {
            filtered = filtered.filter(product => {
                const nombreMatch = product.nombre_producto?.toLowerCase().includes(search.toLowerCase());
                const codigoMatch = product.codigo?.toString().toLowerCase().includes(search.toLowerCase());
                return nombreMatch || codigoMatch;
            });
        }
        
    
        setFilteredData(filtered);
    
        // Mensaje si no hay productos
        if (filtered.length === 0) {

        }
    };
    const handleSelectCategory = (category) => {
        setSelectedCategory(category);
        handleFilter(category, searchText); // Actualiza el filtro
        setShowCategoryModal(false); // Cierra el modal
    };
    const currentStyles = isDarkMode ? styles2 : styles;
    const handleDeleteConfirmation = (product) => {
        setProductToDelete(product);
        setConfirmDeleteModalVisible(true);
    };
    const deleteProduct = async () => {
        try {
            await axios.delete(`http://190.114.252.218:8000/api/inventarios/${productToDelete.id_producto}/`);
            setData(data.filter(item => item.id_producto !== productToDelete.id_producto));
            setConfirmDeleteModalVisible(false);
        } catch (error) {
            console.error('Error al eliminar el producto:', error);
        }
    };
    const handleBarCodeScanned = ({ type, data }) => {
        setScanning(false); // Oculta el escáner después del escaneo
        setNewProduct({ ...newProduct, codigo: data }); // Asigna el valor escaneado al código
    };
    const renderItem = ({ item }) => (
        <View style={currentStyles.productContainer}>
            <Image style={currentStyles.productImage} source={{ uri: item.img }} />
            <View style={currentStyles.productDetails}>
                <Text style={{ color: 'white' }}>Código: {item.codigo}</Text>
                <Text style={{ color: 'white' }}>Nombre: {item.nombre_producto}</Text>
                <Text style={{ color: 'white' }}>
                Categoria: {categorias.find(c => c.id_categoria === item.id_categoria)?.nombre_categoria || 'No disponible'}</Text>
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

                <TouchableOpacity
                    style={currentStyles.button}
                    onPress={() => {
                        setProductToEdit(item);
                        setEditProductModalVisible(true);
                    }}
                >
                    <Text style={currentStyles.buttonText}>Editar</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={currentStyles.button}
                    onPress={() => handleDeleteConfirmation(item)}
                >
                    <Text style={currentStyles.buttonText}>Eliminar</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    const addProduct = () => {
        console.log("Datos a enviar:", newProduct);
        if (newProduct.codigo && newProduct.nombre_producto && newProduct.img && newProduct.descripcion &&
            newProduct.precio_compra && newProduct.porcentaje_de_ganancia && newProduct.id_categoria && newProduct.descuento && newProduct.cantidad) 
        {
            const precioCompra = parseFloat(newProduct.precio_compra);
            const porcentajeGanancia = parseFloat(newProduct.porcentaje_de_ganancia);
            const iva = 0.19;
    
            // Calcular Precio Neto
            const precioNeto = Math.round(precioCompra + (precioCompra * (porcentajeGanancia / 100)));
            // Calcular Precio Venta
            const precioVenta = Math.round(precioNeto + (precioNeto * iva));
            // Calcular Precio Descuento
            const porcentajeDescuento = parseFloat(newProduct.descuento);
            const precioDescuento = Math.round(precioVenta - (precioVenta * (porcentajeDescuento / 100)));
    
            // Ajustar el objeto al formato esperado por la API
            const productToSend = {
                cantidad: parseInt(newProduct.cantidad, 10),
                codigo: newProduct.codigo,
                descripcion: newProduct.descripcion,
                descuento: porcentajeDescuento,
                id_categoria: parseInt(newProduct.id_categoria, 10),
                id_empresa: user.id_empresa,
                img: newProduct.img,
                nombre_producto: newProduct.nombre_producto,
                porcentaje_de_ganancia: porcentajeGanancia,
                precio_compra: precioCompra,
                precio_descuento: precioDescuento,
                precio_neto: precioNeto,
                precio_venta: precioVenta,
                precio_venta_final: precioVenta,
            };
    
            // Enviar el producto ajustado
            axios.post('http://190.114.252.218:8000/api/inventarios/', productToSend)
                .then(response => {
                    setData([...data, response.data]);
                    setAddProductModalVisible(false);
                    setNewProduct({
                        codigo: '', nombre_producto: '', img: '', descripcion: '', precio_compra: '',
                        porcentaje_de_ganancia: '', id_categoria: '', descuento: '', cantidad: ''
                    });
                })
                .catch(error => {
                    if (axios.isAxiosError(error)) {
                        console.error('Error al agregar el producto:', error.response.data);
                    } else {
                        console.error('Error inesperado:', error);
                    }
                });
        } else {
            alert("Por favor, completa todos los campos obligatorios.");
        }
    };
    
    

const updateProduct = async (product) => {
    try {
        const precioCompra = parseFloat(product.precio_compra);
        const porcentajeGanancia = parseFloat(product.porcentaje_de_ganancia);
        const iva = 0.19;
        const porcentajeDescuento = parseFloat(product.descuento);

        // Calcular Precio Neto
        const precioNeto = Math.round(precioCompra + (precioCompra * (porcentajeGanancia / 100)));
        // Calcular Precio Venta
        const precioVenta = Math.round(precioNeto + (precioNeto * iva));
        // Calcular Precio Descuento
        const precioDescuento = Math.round(precioNeto - (precioNeto * (porcentajeDescuento / 100)) + (precioNeto * iva));

        const updatedProduct = {
            ...product,
            precio_neto: precioNeto,
            precio_venta: precioVenta,
            precio_venta_final: precioVenta,
            precio_descuento: precioDescuento,
        };

        const response = await axios.put(`http://190.114.252.218:8000/api/inventarios/${updatedProduct.id_producto}/`, updatedProduct);
        const updatedData = data.map(item =>
            item.id_producto === updatedProduct.id_producto ? response.data : item
        );
        setData(updatedData);
    } catch (error) {
        console.log("Datos a enviar:", product);
        console.error('Error al actualizar el producto:', error);
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
                    placeholderTextColor={isDarkMode ? "#506D8A" : "#808080"}
                    value={searchText}
                    onChangeText={(text) => {
                        setSearchText(text); // Actualiza el texto de búsqueda
                        handleFilter(selectedCategory, text); // Filtra al mismo tiempo
                    }} // Llama a la función de filtro
                />
                <View style={currentStyles.buttonSpacing}>
                    <Button
                        title="Filtrar por categoría"
                        color="#E17055"
                        onPress={() => setShowCategoryModal(true)} // Abre el modal
                    />
                </View>
            </View>

            {/* Modal para seleccionar categoría */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={showCategoryModal}
                onRequestClose={() => setShowCategoryModal(false)}
            >
                <View style={filterStyles.filterModalContainer}>
                    <View style={filterStyles.filterModalContent}>
                        <Text style={filterStyles.filterHeader}>Selecciona una categoría</Text>
                        <TouchableOpacity onPress={() => handleSelectCategory('')} style={filterStyles.categoryOption}>
                            <Text style={filterStyles.categoryOptionText}>Todas las categorías</Text>
                        </TouchableOpacity>
                        {categorias.map(categoria => (
                            <TouchableOpacity
                                key={categoria.id_categoria}
                                onPress={() => handleSelectCategory(categoria.id_categoria)}
                                style={filterStyles.categoryOption}
                            >
                                <Text style={filterStyles.categoryOptionText}>{categoria.nombre_categoria}</Text>
                            </TouchableOpacity>
                        ))}
                        <TouchableOpacity onPress={() => setShowCategoryModal(false)} style={filterStyles.closeFilterButton}>
                            <Text style={filterStyles.closeFilterButtonText}>Cerrar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            {/* Lista de productos */}
            <FlatList
                data={filteredData.length > 0 ? filteredData : data}
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
                 {/* Modal de confirmación para eliminar */}
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={confirmDeleteModalVisible}
                        onRequestClose={() => setConfirmDeleteModalVisible(false)}
                    >
                        <View style={currentStyles.modalContainer}>
                            <View style={currentStyles.modalContent}>
                                <Text style={{ fontSize: 18, marginBottom: 20 }}>
                                    ¿Estás seguro de que deseas eliminar el producto {productToDelete?.nombre_producto}?
                                </Text>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Button
                                        title="Cancelar"
                                        onPress={() => setConfirmDeleteModalVisible(false)}
                                        color="#7f8c8d"
                                    />
                                    <Button
                                        title="Aceptar"
                                        onPress={deleteProduct}
                                        color="#E74C3C"
                                    />
                                </View>
                            </View>
                        </View>
                    </Modal>
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
                                <Text style={currentStyles.modalText}>Descripción:</Text>
                                <TextInput style={currentStyles.modalInput} value={selectedProduct.descripcion} editable={false} />
                                <Text style={currentStyles.modalText}>Categoría:</Text>
                                <TextInput style={currentStyles.modalInput}
                                           value={categorias.find(c => c.id_categoria === selectedProduct.id_categoria)?.nombre_categoria || 'No disponible'}
                                           editable={false}
                                />
                                <Text style={currentStyles.modalText}>Stock:</Text>
                                <TextInput style={currentStyles.modalInput} value={`${selectedProduct.cantidad || 'No disponible'} unidades`} editable={false} />
                                <Text style={currentStyles.modalText}>Precio de compra:</Text>
                                <TextInput style={currentStyles.modalInput} value={`$ ${selectedProduct.precio_compra}`} editable={false} />
                                <Text style={currentStyles.modalText}>Porcentaje de ganancia:</Text>
                                <TextInput style={currentStyles.modalInput} value={`${selectedProduct.porcentaje_de_ganancia}%`} editable={false} />
                                <Text style={currentStyles.modalText}>Precio neto:</Text>
                                <TextInput style={currentStyles.modalInput} value={`$ ${selectedProduct.precio_neto}`} editable={false} />
                                <Text style={currentStyles.modalText}>Precio venta:</Text>
                                <TextInput style={currentStyles.modalInput} value={`$ ${selectedProduct.precio_venta_final}`} editable={false} />
                                <Text style={currentStyles.modalText}>Descuento:</Text>
                                <TextInput style={currentStyles.modalInput} value={`$ ${selectedProduct.descuento || '0'}`} editable={false} />
                                <Text style={currentStyles.modalText}>Precio descuento:</Text>
                                <TextInput style={currentStyles.modalInput} value={`$ ${selectedProduct.precio_descuento || '0'}`} editable={false} />
                            </ScrollView>
                        </View>
                    </View>
                </Modal>
                )}

                {/* Modal para agregar nuevo producto */}
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={addProductModalVisible}
                    onRequestClose={() => setAddProductModalVisible(false)}>
                    <View style={currentStyles.modalContainer}>
                        <View style={currentStyles.modalContent}>
                            <TouchableOpacity onPress={() => setAddProductModalVisible(false)} style={currentStyles.closeButton}>
                                <Text style={{ fontSize: 30, fontWeight: 'bold', color: '#E17055' }}>×</Text>
                            </TouchableOpacity>
                            <ScrollView>
                                <Text style={currentStyles.modalText}>Imagen URL:</Text>
                                <TextInput
                                    style={currentStyles.modalInput}
                                    value={newProduct.img}
                                    onChangeText={(text) => setNewProduct({ ...newProduct, img: text })}
                                />
                                <Text style={currentStyles.modalText}>Código:</Text>
                                <TextInput
                                    style={[currentStyles.modalInput, { flex: 1 }]} // Para ajustar espacio
                                    value={newProduct.codigo}
                                    onChangeText={(text) => setNewProduct({ ...newProduct, codigo: text })}
                                    placeholder="Código"
                                />
                                <TouchableOpacity
                                    style={{
                                        backgroundColor: '#E17055',
                                        padding: 10,
                                        marginLeft: 10,
                                        borderRadius: 5,
                                    }}
                                    onPress={() => setScanning(true)} // Activa el escáner
                                >
                                    <Text style={{ color: '#FFF' }}>Escanear</Text>
                                </TouchableOpacity>
                                {scanning && (
                                <Modal
                                    animationType="slide"
                                    transparent={true}
                                    visible={scanning}
                                    onRequestClose={() => setScanning(false)} // Cierra el modal
                                >
                                    <View style={currentStyles.modalContainer}>
                                        <BarCodeScanner
                                            onBarCodeScanned={handleBarCodeScanned}
                                            style={{ width: '100%', height: '100%' }}
                                        />
                                        <TouchableOpacity
                                            style={{
                                                position: 'absolute',
                                                top: 50,
                                                right: 20,
                                                backgroundColor: '#FFF',
                                                padding: 10,
                                                borderRadius: 5,
                                            }}
                                            onPress={() => setScanning(false)}
                                        >
                                            <Text style={{ fontWeight: 'bold', color: '#E17055' }}>Cerrar</Text>
                                        </TouchableOpacity>
                                    </View>
                                </Modal>
                                
                            )}
                                <Modal
                                    animationType="slide"
                                    transparent={true}
                                    visible={showNewCategoryModal}
                                    onRequestClose={() => setShowNewCategoryModal(false)}
                                >
                                    <View style={currentStyles.modalContainer}>
                                        <View style={currentStyles.modalContent}>
                                            <TouchableOpacity
                                                onPress={() => setShowNewCategoryModal(false)}
                                                style={currentStyles.closeButton}
                                            >
                                                <Text style={{ fontSize: 30, fontWeight: 'bold', color: '#E17055' }}>×</Text>
                                            </TouchableOpacity>
                                            <ScrollView>
                                                <Text style={currentStyles.modalText}>Nombre de la Categoría:</Text>
                                                <TextInput
                                                    style={currentStyles.modalInput}
                                                    placeholder="Ingresa el nombre"
                                                    value={newCategory.nombre_categoria}
                                                    onChangeText={(text) =>
                                                        setNewCategory({ ...newCategory, nombre_categoria: text })
                                                    }
                                                />
                                                <TouchableOpacity
                                                    style={currentStyles.addButton}
                                                    onPress={handleAddCategory}
                                                >
                                                    <Text style={currentStyles.addButtonText}>Agregar Categoría</Text>
                                                </TouchableOpacity>
                                            </ScrollView>
                                        </View>
                                    </View>
                                </Modal>
                                <Text style={currentStyles.modalText}>Nombre:</Text>
                                <TextInput
                                    style={currentStyles.modalInput}
                                    value={newProduct.nombre_producto}
                                    onChangeText={(text) => setNewProduct({ ...newProduct, nombre_producto: text })}
                                />
                                <Text style={currentStyles.modalText}>Descripción:</Text>
                                <TextInput
                                    style={currentStyles.modalInput}
                                    value={newProduct.descripcion}
                                    onChangeText={(text) => setNewProduct({ ...newProduct, descripcion: text })}
                                />
                                <Text style={currentStyles.modalText}>Categoría:</Text>
                                <Picker
                                    selectedValue={newProduct.id_categoria}
                                    style={currentStyles.modalInput}
                                    onValueChange={(itemValue) => {
                                        if (itemValue === "create") {
                                            setShowNewCategoryModal(true); // Mostrar modal para nueva categoría
                                        } else {
                                            setNewProduct({ ...newProduct, id_categoria: itemValue });
                                        }
                                    }}
                                >
                                    <Picker.Item label="Selecciona una categoría" value="" />
                                    {categorias.map(categoria => (
                                        <Picker.Item key={categoria.id_categoria} label={categoria.nombre_categoria} value={categoria.id_categoria} />
                                    ))}
                                    <Picker.Item label="Crear nueva categoría" value="create" />
                                </Picker>
                                <Text style={currentStyles.modalText}>Cantidad:</Text>
                                <TextInput
                                    style={currentStyles.modalInput}
                                    value={newProduct.cantidad ? newProduct.cantidad.toString() : '0'}
                                    keyboardType="numeric"
                                    onChangeText={(text) => setNewProduct({ ...newProduct, cantidad: text ? parseFloat(text) : 0 })}
                                />
                                <Text style={currentStyles.modalText}>Precio de compra:</Text>
                                <TextInput
                                    style={currentStyles.modalInput}
                                    value={newProduct.precio_compra ? newProduct.precio_compra.toString() : '0'}
                                    keyboardType="numeric"
                                    onChangeText={(text) => setNewProduct({ ...newProduct, precio_compra: text ? parseFloat(text) : 0 })}
                                />
                                <Text style={currentStyles.modalText}>Porcentaje de ganancia:</Text>
                                <TextInput
                                    style={currentStyles.modalInput}
                                    value={newProduct.porcentaje_de_ganancia ? newProduct.porcentaje_de_ganancia.toString() : '0'}
                                    keyboardType="numeric"
                                    onChangeText={(text) => setNewProduct({ ...newProduct, porcentaje_de_ganancia: text ? parseFloat(text) : 0 })}
                                />
                                <Text style={currentStyles.modalText}>Precio neto:</Text>
                                <TextInput
                                    style={currentStyles.modalInput}
                                    value={newProduct.precio_neto ? newProduct.precio_neto.toString() : '0'}
                                    keyboardType="numeric"
                                    onChangeText={(text) => setNewProduct({ ...newProduct, precio_neto: text ? parseFloat(text) : 0 })}
                                />
                                <Text style={currentStyles.modalText}>Precio venta:</Text>
                                <TextInput
                                    style={currentStyles.modalInput}
                                    value={newProduct.precio_venta ? newProduct.precio_venta.toString() : '0'}
                                    keyboardType="numeric"
                                    onChangeText={(text) => setNewProduct({ ...newProduct, precio_venta: text ? parseFloat(text) : 0 })}
                                />
                                <Text style={currentStyles.modalText}>Precio venta final:</Text>
                                <TextInput
                                    style={currentStyles.modalInput}
                                    value={newProduct.precio_venta_final ? newProduct.precio_venta_final.toString() : '0'}
                                    keyboardType="numeric"
                                    onChangeText={(text) => setNewProduct({ ...newProduct, precio_venta_final: text ? parseFloat(text) : 0 })}
                                />
                                <Text style={currentStyles.modalText}>Descuento:</Text>
                                <TextInput
                                    style={currentStyles.modalInput}
                                    value={newProduct.descuento ? newProduct.descuento.toString() : '0'}
                                    keyboardType="numeric"
                                    onChangeText={(text) => setNewProduct({ ...newProduct, descuento: text ? parseFloat(text) : 0 })}
                                />
                                <Text style={currentStyles.modalText}>Precio con descuento:</Text>
                                <TextInput
                                    style={currentStyles.modalInput}
                                    value={newProduct.precio_descuento ? newProduct.precio_descuento.toString() : '0'}
                                    keyboardType="numeric"
                                    onChangeText={(text) => setNewProduct({ ...newProduct, precio_descuento: text ? parseFloat(text) : 0 })}
                                />
                                <TouchableOpacity style={currentStyles.addButton} onPress={addProduct}>
                                    <Text style={currentStyles.addButtonText}>Agregar Producto</Text>
                                </TouchableOpacity>
                            </ScrollView>
                        </View>
                    </View>
                </Modal>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={editProductModalVisible}
                    onRequestClose={() => setEditProductModalVisible(false)}>
                    <View style={currentStyles.modalContainer}>
                        <View style={currentStyles.modalContent}>
                            <TouchableOpacity onPress={() => setEditProductModalVisible(false)} style={currentStyles.closeButton}>
                                <Text style={{ fontSize: 30, fontWeight: 'bold', color: '#E17055' }}>×</Text>
                            </TouchableOpacity>
                            <ScrollView>
                                {productToEdit && (
                                    <>
                                        <Text style={currentStyles.modalText}>Código:</Text>
                                        <TextInput
                                            style={currentStyles.modalInput}
                                            value={productToEdit.codigo.toString()}
                                            onChangeText={(text) => setProductToEdit({ ...productToEdit, codigo: text })}
                                        />
                                        <Text style={currentStyles.modalText}>Nombre:</Text>
                                        <TextInput
                                            style={currentStyles.modalInput}
                                            value={productToEdit.nombre_producto}
                                            onChangeText={(text) => setProductToEdit({ ...productToEdit, nombre_producto: text })}
                                        />
                                        <Text style={currentStyles.modalText}>Descripción:</Text>
                                        <TextInput
                                            style={currentStyles.modalInput}
                                            value={productToEdit.descripcion}
                                            onChangeText={(text) => setProductToEdit({ ...productToEdit, descripcion: text })}
                                        />
                                        <Text style={currentStyles.modalText}>Categoría:</Text>
                                        <Picker
                                            selectedValue={productToEdit.id_categoria}
                                            style={currentStyles.modalInput}
                                            onValueChange={(itemValue) => setProductToEdit({ ...productToEdit, id_categoria: itemValue })}>
                                            <Picker.Item label="Selecciona una categoría" value="" />
                                            {categorias.map(categoria => (
                                                <Picker.Item key={categoria.id_categoria} label={categoria.nombre_categoria} value={categoria.id_categoria} />
                                            ))}
                                        </Picker>
                                        <Text style={currentStyles.modalText}>Stock:</Text>
                                        <TextInput
                                            style={currentStyles.modalInput}
                                            value={productToEdit.cantidad ? productToEdit.cantidad.toString() : '0'}
                                            keyboardType="numeric"
                                            onChangeText={(text) => setProductToEdit({ ...productToEdit, cantidad: text ? parseFloat(text) : 0 })}
                                        />
                                        <Text style={currentStyles.modalText}>Precio de compra:</Text>
                                        <TextInput
                                            style={currentStyles.modalInput}
                                            value={productToEdit.precio_compra ? productToEdit.precio_compra.toString() : '0'}
                                            keyboardType="numeric"
                                            onChangeText={(text) => setProductToEdit({ ...productToEdit, precio_compra: text ? parseFloat(text) : 0 })}
                                        />
                                        <Text style={currentStyles.modalText}>Porcentaje de ganancia:</Text>
                                        <TextInput
                                            style={currentStyles.modalInput}
                                            value={productToEdit.porcentaje_de_ganancia ? productToEdit.porcentaje_de_ganancia.toString() : '0'}
                                            keyboardType="numeric"
                                            onChangeText={(text) => setProductToEdit({ ...productToEdit, porcentaje_de_ganancia: text ? parseFloat(text) : 0 })}
                                        />
                                        <Text style={currentStyles.modalText}>Precio neto:</Text>
                                        <TextInput
                                            style={currentStyles.modalInput}
                                            value={productToEdit.precio_neto ? productToEdit.precio_neto.toString() : '0'}
                                            keyboardType="numeric"
                                            onChangeText={(text) => setProductToEdit({ ...productToEdit, precio_neto: text ? parseFloat(text) : 0 })}
                                        />
                                        <Text style={currentStyles.modalText}>Precio venta:</Text>
                                        <TextInput
                                            style={currentStyles.modalInput}
                                            value={productToEdit.precio_venta ? productToEdit.precio_venta.toString() : '0'}
                                            keyboardType="numeric"
                                            onChangeText={(text) => setProductToEdit({ ...productToEdit, precio_venta: text ? parseFloat(text) : 0 })}
                                        />
                                        <Text style={currentStyles.modalText}>Precio venta final:</Text>
                                        <TextInput
                                            style={currentStyles.modalInput}
                                            value={productToEdit.precio_venta_final ? productToEdit.precio_venta_final.toString() : '0'}
                                            keyboardType="numeric"
                                            onChangeText={(text) => setProductToEdit({ ...productToEdit, precio_venta_final: text ? parseFloat(text) : 0 })}
                                        />
                                        <Text style={currentStyles.modalText}>Descuento:</Text>
                                        <TextInput
                                            style={currentStyles.modalInput}
                                            value={productToEdit.descuento ? productToEdit.descuento.toString() : '0'}
                                            keyboardType="numeric"
                                            onChangeText={(text) => setProductToEdit({ ...productToEdit, descuento: text ? parseFloat(text) : 0 })}
                                        />
                                        <Text style={currentStyles.modalText}>Precio con descuento:</Text>
                                        <TextInput
                                            style={currentStyles.modalInput}
                                            value={productToEdit.precio_descuento ? productToEdit.precio_descuento.toString() : '0'}
                                            keyboardType="numeric"
                                            onChangeText={(text) => setProductToEdit({ ...productToEdit, precio_descuento: text ? parseFloat(text) : 0 })}
                                        />
                                        <TouchableOpacity
                                            style={currentStyles.addButton}
                                            onPress={() => {
                                                updateProduct(productToEdit);
                                                setEditProductModalVisible(false);
                                            }}>
                                            <Text style={currentStyles.addButtonText}>Aceptar</Text>
                                        </TouchableOpacity>
                                    </>
                                )}
                            </ScrollView>
                        </View>
                    </View>
                </Modal>
            </View>

        </SafeAreaView>
    );
}


// Estilos
const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#34495E',
    },
    container: {
        flex: 1,
        padding: 16,
    },
    productContainer: {
        backgroundColor: '#2C3E50',
        marginBottom: 16,
        padding: 16,
        borderRadius: 8,
        flexDirection: 'row',
    },
    productImage: {
        width: 100,
        height: 100,
        borderRadius: 8,
        marginRight: 16,
    },
    productDetails: {
        flex: 1,
        justifyContent: 'center',
    },
    buttonContainer: {
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    button: {
        backgroundColor: '#E17055',
        borderRadius: 5,
        padding: 10,
        marginBottom: 8,
    },
    buttonText: {
        color: '#FFFFFF',
        textAlign: 'center',
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    searchInput: {
        flex: 1,
        backgroundColor: '#506D8A',
        borderRadius: 5,
        padding: 10,
        color: '#FFF',
        marginRight: 8,
    },
    buttonSpacing: {
        marginLeft: 8,
    },
    floatingButton: {
        position: 'absolute',
        right: 16,
        bottom: 16,
        backgroundColor: '#E17055',
        borderRadius: 50,
        width: 56,
        height: 56,
        justifyContent: 'center',
        alignItems: 'center',
    },
    floatingButtonText: {
        fontSize: 30,
        color: '#FFF',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '90%',
        backgroundColor: '#FFF',
        borderRadius: 8,
        padding: 16,
        elevation: 5,
        maxHeight: '90%', // Limitar la altura máxima del modal
    },
    closeButton: {
        alignSelf: 'flex-end',
        marginBottom: 16,
    },
    modalText: {
        fontSize: 16,
        marginBottom: 8,
        fontWeight: 'bold',
    },
    modalInput: {
        backgroundColor: '#F5F5F5',
        borderRadius: 5,
        padding: 10,
        marginBottom: 16,
    },
    addButton: {
        backgroundColor: '#E17055',
        borderRadius: 5,
        padding: 10,
        alignItems: 'center',
    },
    addButtonText: {
        color: '#FFF',
        fontWeight: 'bold',
    },
});

// Estilos para modo oscuro
const styles2 = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#0B1016',
    },
    container: {
            flex: 1,
            padding: 16,
        },
    productContainer: {
        backgroundColor: '#1C1C1C',
        marginBottom: 16,
                padding: 16,
                borderRadius: 8,
                flexDirection: 'row',
    },
    productDetails: {
        flex: 1,
        justifyContent: 'center',
    },
    buttonContainer: {
                flexDirection: 'column',
                justifyContent: 'space-between',

            },
    button: {
        backgroundColor: '#E17055',
        borderRadius: 5,
        padding: 10,
        marginBottom: 8,
    },

    buttonText: {
            color: '#FFFFFF',
            textAlign: 'center',
        },
        searchBar: {
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 16,
        },
        searchInput: {
            backgroundColor: "#16202C",
                  flex: 1,
                  borderColor: '#009679',
                  borderWidth: 1,
                  borderRadius: 8,
                  paddingHorizontal: 10,
                  marginRight: 10,
                  height: 40,
        },
        buttonSpacing: {
            marginLeft: 8,
        },
        floatingButton: {
            position: 'absolute',
            right: 16,
            bottom: 16,
            backgroundColor: '#E17055',
            borderRadius: 50,
            width: 56,
            height: 56,
            justifyContent: 'center',
            alignItems: 'center',
        },
        floatingButtonText: {
            fontSize: 30,
            color: '#FFF',
        },
        modalContainer: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
        },
        modalContent: {
            width: '90%',
            backgroundColor: '#FFF',
            borderRadius: 8,
            padding: 16,
            elevation: 5,
            maxHeight: '90%', // Limitar la altura máxima del modal
        },
        closeButton: {
            alignSelf: 'flex-end',
            marginBottom: 16,
        },
        modalText: {
            fontSize: 16,
            marginBottom: 8,
            fontWeight: 'bold',
        },
        modalInput: {
            backgroundColor: '#F5F5F5',
            borderRadius: 5,
            padding: 10,
            marginBottom: 16,
        },
        addButton: {
            backgroundColor: '#E17055',
            borderRadius: 5,
            padding: 10,
            alignItems: 'center',
        },
        addButtonText: {
            color: '#FFF',
            fontWeight: 'bold',
        },
});
const filterStyles = StyleSheet.create({
    filterModalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.7)', // Fondo semitransparente
    },
    filterModalContent: {
        width: '80%',
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 20,
        elevation: 10,
        maxHeight: '80%', // Limitar la altura máxima del modal
    },
    filterHeader: {
        fontSize: 24,
        marginBottom: 20,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    categoryOption: {
        paddingVertical: 15,
        paddingHorizontal: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#D3D3D3', // Color de la línea divisoria
    },
    categoryOptionText: {
        fontSize: 18,
        color: '#2C3E50',
    },
    closeFilterButton: {
        alignSelf: 'flex-end',
        marginTop: 10,
        backgroundColor: '#E17055',
        borderRadius: 5,
        padding: 10,
    },
    closeFilterButtonText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
    },
});