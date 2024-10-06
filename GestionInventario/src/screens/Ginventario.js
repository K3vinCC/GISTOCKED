import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList, Button, SafeAreaView, StatusBar, Modal, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ThemeContext } from '../../ThemeContext';
import styles from './styles/GinventarioStyles'; // Cambia la importación aquí


export default function App() {
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [addProductModalVisible, setAddProductModalVisible] = useState(false);
    const [newProduct, setNewProduct] = useState({
      id: '',
      codigo: '',
      nombre: '',
      marca: '',
      imagen: '',
      stock: '',
      preciocompra: '',
      porcentajeganancia: '',
      precioneto: '',
      precioventa: '',
      precioventaf: '',
      categoria: '',
      subcategoria: ''
    });
    const [data, setData] = useState([
    { id: '1', imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCnbI9di1nZ24e3kyApy8k2EXOU42MhnjOjA&s',codigo: 'XXXXX', nombre: 'asdasdasd', marca: 'xxxxxx-xxxx', categoria: "bebestibles", subcategoria: "bebida", stock: 15, preciocompra: 3200, porcentajeganancia: 20, precioneto: 3840, precioventa: 4569, precioventaf: 4600 },
    { id: '2', imagen: 'https://i.pinimg.com/236x/1c/5a/0f/1c5a0f6f80497e34febe28e6d3577666.jpg',codigo: 'XXXXX', nombre: 'asdasdasd', marca: 'xxxxxx-xxxx', categoria: "bebestibles", subcategoria: "bebida", stock: 15, preciocompra: 3200, porcentajeganancia: 20, precioneto: 3840, precioventa: 4569, precioventaf: 4600 },
    { id: '3', imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStea81Of9aZlsrXenWOUDBtW1icv8GuAG9eQ&s',codigo: 'XXXXX', nombre: 'asdasdasd', marca: 'xxxxxx-xxxx', categoria: "bebestibles", subcategoria: "bebida", stock: 15, preciocompra: 3200, porcentajeganancia: 20, precioneto: 3840, precioventa: 4569, precioventaf: 4600 },
    { id: '4', imagen: 'https://pbs.twimg.com/profile_images/3166355302/23b4a435aa8fe2fd3a9d7c22f42e3af6_400x400.jpeg',codigo: 'XXXXX', nombre: 'asdasdasd', marca: 'xxxxxx-xxxx', categoria: "bebestibles", subcategoria: "bebida", stock: 15, preciocompra: 3200, porcentajeganancia: 20, precioneto: 3840, precioventa: 4569, precioventaf: 4600 },
    { id: '5', imagen: 'https://i.pinimg.com/236x/64/dd/2f/64dd2f429909c15c851a21d7ac09c702.jpg',codigo: 'XXXXX', nombre: 'asdasdasd', marca: 'xxxxxx-xxxx', categoria: "bebestibles", subcategoria: "bebida", stock: 15, preciocompra: 3200, porcentajeganancia: 20, precioneto: 3840, precioventa: 4569, precioventaf: 4600 },
    { id: '6', imagen: 'https://www.recreoviral.com/wp-content/uploads/2015/06/Animales-posando-para-la-foto-15.jpg' ,codigo: 'XXXXX', nombre: 'asdasdasd', marca: 'xxxxxx-xxxx', categoria: "bebestibles", subcategoria: "bebida", stock: 15, preciocompra: 3200, porcentajeganancia: 20, precioneto: 3840, precioventa: 4569, precioventaf: 4600 },
  ]);

  
  const { isDarkMode } = useContext(ThemeContext);
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: isDarkMode ? '#0B1016' : '#34495E',
      },
      headerTintColor:  '#FFF',
    });
  }, [isDarkMode, navigation]);
  
  const currentStyles = isDarkMode ? styles2 : styles;

  const renderItem = ({ item }) => (
    <View style={currentStyles.productContainer}>
      <Image style={currentStyles.productImage} source={{ uri: item.imagen }} />
      <View style={currentStyles.productDetails}>
        <Text style={{ color: 'white' }}>id: {item.id}</Text>
        <Text style={{ color: 'white' }}>codigo: {item.codigo}</Text>
        <Text style={{ color: 'white' }}>nombre: {item.nombre}</Text>
        <Text style={{ color: 'white' }}>marca: {item.marca}</Text>
        <Text style={{ color: 'white' }}>precio venta: $ {item.precioventaf}</Text>
        <Text style={{ color: 'white' }}>stock: {item.stock} unidades</Text>
      </View>
      <View style={currentStyles.buttonContainer}>
        <TouchableOpacity style={currentStyles.button}>
          <Text style={currentStyles.buttonText}>editar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={currentStyles.button}>
          <Text style={currentStyles.buttonText}>eliminar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={currentStyles.button}
          onPress={() => {
            setSelectedProduct(item);
            setModalVisible(true);
          }}
        >
          <Text style={currentStyles.buttonText}>Detalles</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  // Función para agregar un nuevo producto
  const addProduct = () => {
    if (newProduct.id && newProduct.codigo && newProduct.nombre && newProduct.marca) {
      setData([...data, { ...newProduct }]);
      setAddProductModalVisible(false);
      setNewProduct({
        id: '',
        codigo: '',
        nombre: '',
        marca: '',
        imagen: '',
        stock: '',
        preciocompra: '',
        porcentajeganancia: '',
        precioneto: '',
        precioventa: '',
        precioventaf: '',
        categoria: '',
        subcategoria: ''
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
          <Button title="Buscar" color="#E17055" onPress={() => {}} />
          <Button title="Filtrar" color="#E17055" onPress={() => {}} />
        </View>
  
        {/* Lista de productos */}
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={item => item.id}
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
                  <Text style={{ fontSize: 18 }}>×</Text>
                </TouchableOpacity>
                <Image style={currentStyles.productImage} source={{ uri: selectedProduct.imagen }} />
                <Text style={currentStyles.modalText}>Código:</Text>
                <TextInput style={currentStyles.modalInput} value={selectedProduct.codigo} editable={false} />
                <Text style={currentStyles.modalText}>Nombre:</Text>
                <TextInput style={currentStyles.modalInput} value={selectedProduct.nombre} editable={false} />
                <Text style={currentStyles.modalText}>Marca:</Text>
                <TextInput style={currentStyles.modalInput} value={selectedProduct.marca} editable={false} />
                <Text style={currentStyles.modalText}>Categoría:</Text>
                <TextInput style={currentStyles.modalInput} value={selectedProduct.categoria} editable={false} />
                <Text style={currentStyles.modalText}>Subcategoría:</Text>
                <TextInput style={currentStyles.modalInput} value={selectedProduct.subcategoria} editable={false} />
                <Text style={currentStyles.modalText}>Stock (unidades):</Text>
                <TextInput style={currentStyles.modalInput} value={`${selectedProduct.stock}`} editable={false} />
                <Text style={currentStyles.modalText}>Precio compra:</Text>
                <TextInput style={currentStyles.modalInput} value={`$ ${selectedProduct.preciocompra}`} editable={false} />
                <Text style={currentStyles.modalText}>Porcentaje ganancia:</Text>
                <TextInput style={currentStyles.modalInput} value={`${selectedProduct.porcentajeganancia} %`} editable={false} />
                <Text style={currentStyles.modalText}>Precio neto:</Text>
                <TextInput style={currentStyles.modalInput} value={`$ ${selectedProduct.precioneto}`} editable={false} />
                <Text style={currentStyles.modalText}>Precio venta:</Text>
                <TextInput style={currentStyles.modalInput} value={`$ ${selectedProduct.precioventa}`} editable={false} />
                <Text style={currentStyles.modalText}>Precio venta final:</Text>
                <TextInput style={currentStyles.modalInput} value={`$ ${selectedProduct.precioventaf}`} editable={false} />
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
                <Text style={{ fontSize: 18 }}>×</Text>
              </TouchableOpacity>
              <Text style={currentStyles.modalTitle}>Agregar Nuevo Producto</Text>
              
              {/* Campos del formulario para agregar un nuevo producto */}
              <TextInput
                style={currentStyles.modalInput}
                placeholder="ID"
                value={newProduct.id}
                onChangeText={(text) => setNewProduct({ ...newProduct, id: text })}
              />
              <TextInput
                style={currentStyles.modalInput}
                placeholder="Código"
                value={newProduct.codigo}
                onChangeText={(text) => setNewProduct({ ...newProduct, codigo: text })}
              />
              <TextInput
                style={currentStyles.modalInput}
                placeholder="Nombre"
                value={newProduct.nombre}
                onChangeText={(text) => setNewProduct({ ...newProduct, nombre: text })}
              />
              <TextInput
                style={currentStyles.modalInput}
                placeholder="Marca"
                value={newProduct.marca}
                onChangeText={(text) => setNewProduct({ ...newProduct, marca: text })}
              />
              <TextInput
                style={currentStyles.modalInput}
                placeholder="Imagen URL"
                value={newProduct.imagen}
                onChangeText={(text) => setNewProduct({ ...newProduct, imagen: text })}
              />
              <TextInput
                style={currentStyles.modalInput}
                placeholder="Stock"
                keyboardType="numeric"
                value={newProduct.stock}
                onChangeText={(text) => setNewProduct({ ...newProduct, stock: text })}
              />
              <TextInput
                style={currentStyles.modalInput}
                placeholder="Precio Compra"
                keyboardType="numeric"
                value={newProduct.preciocompra}
                onChangeText={(text) => setNewProduct({ ...newProduct, preciocompra: text })}
              />
              <TextInput
                style={currentStyles.modalInput}
                placeholder="Porcentaje Ganancia"
                keyboardType="numeric"
                value={newProduct.porcentajeganancia}
                onChangeText={(text) => setNewProduct({ ...newProduct, porcentajeganancia: text })}
              />
              <TextInput
                style={currentStyles.modalInput}
                placeholder="Precio Neto"
                keyboardType="numeric"
                value={newProduct.precioneto}
                onChangeText={(text) => setNewProduct({ ...newProduct, precioneto: text })}
              />
              <TextInput
                style={currentStyles.modalInput}
                placeholder="Precio Venta"
                keyboardType="numeric"
                value={newProduct.precioventa}
                onChangeText={(text) => setNewProduct({ ...newProduct, precioventa: text })}
              />
              <TextInput
                style={currentStyles.modalInput}
                placeholder="Precio Venta Final"
                keyboardType="numeric"
                value={newProduct.precioventaf}
                onChangeText={(text) => setNewProduct({ ...newProduct, precioventaf: text })}
              />
              <TextInput
                style={currentStyles.modalInput}
                placeholder="Categoría"
                value={newProduct.categoria}
                onChangeText={(text) => setNewProduct({ ...newProduct, categoria: text })}
              />
              <TextInput
                style={currentStyles.modalInput}
                placeholder="Subcategoría"
                value={newProduct.subcategoria}
                onChangeText={(text) => setNewProduct({ ...newProduct, subcategoria: text })}
              />
  
              {/* Botones para agregar y cerrar el formulario */}
              <View style={currentStyles.modalButtonContainer}>
                <TouchableOpacity style={currentStyles.button} onPress={addProduct}>
                  <Text style={currentStyles.buttonText}>Agregar Producto</Text>
                </TouchableOpacity>
                <TouchableOpacity style={currentStyles.button} onPress={() => setAddProductModalVisible(false)}>
                  <Text style={currentStyles.buttonText}>Cerrar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
}