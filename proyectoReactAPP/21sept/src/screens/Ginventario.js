import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList, Button, SafeAreaView, StatusBar, Modal, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ThemeContext } from '../../ThemeContext';


export default function App() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const data = [
    { id: '1', imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCnbI9di1nZ24e3kyApy8k2EXOU42MhnjOjA&s',codigo: 'XXXXX', nombre: 'asdasdasd', marca: 'xxxxxx-xxxx', categoria: "bebestibles", subcategoria: "bebida", stock: 15, preciocompra: 3200, porcentajeganancia: 20, precioneto: 3840, precioventa: 4569, precioventaf: 4600 },
    { id: '2', imagen: 'https://i.pinimg.com/236x/1c/5a/0f/1c5a0f6f80497e34febe28e6d3577666.jpg',codigo: 'XXXXX', nombre: 'asdasdasd', marca: 'xxxxxx-xxxx', categoria: "bebestibles", subcategoria: "bebida", stock: 15, preciocompra: 3200, porcentajeganancia: 20, precioneto: 3840, precioventa: 4569, precioventaf: 4600 },
    { id: '3', imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStea81Of9aZlsrXenWOUDBtW1icv8GuAG9eQ&s',codigo: 'XXXXX', nombre: 'asdasdasd', marca: 'xxxxxx-xxxx', categoria: "bebestibles", subcategoria: "bebida", stock: 15, preciocompra: 3200, porcentajeganancia: 20, precioneto: 3840, precioventa: 4569, precioventaf: 4600 },
    { id: '4', imagen: 'https://pbs.twimg.com/profile_images/3166355302/23b4a435aa8fe2fd3a9d7c22f42e3af6_400x400.jpeg',codigo: 'XXXXX', nombre: 'asdasdasd', marca: 'xxxxxx-xxxx', categoria: "bebestibles", subcategoria: "bebida", stock: 15, preciocompra: 3200, porcentajeganancia: 20, precioneto: 3840, precioventa: 4569, precioventaf: 4600 },
    { id: '5', imagen: 'https://i.pinimg.com/236x/64/dd/2f/64dd2f429909c15c851a21d7ac09c702.jpg',codigo: 'XXXXX', nombre: 'asdasdasd', marca: 'xxxxxx-xxxx', categoria: "bebestibles", subcategoria: "bebida", stock: 15, preciocompra: 3200, porcentajeganancia: 20, precioneto: 3840, precioventa: 4569, precioventaf: 4600 },
    { id: '6', imagen: 'https://www.recreoviral.com/wp-content/uploads/2015/06/Animales-posando-para-la-foto-15.jpg' ,codigo: 'XXXXX', nombre: 'asdasdasd', marca: 'xxxxxx-xxxx', categoria: "bebestibles", subcategoria: "bebida", stock: 15, preciocompra: 3200, porcentajeganancia: 20, precioneto: 3840, precioventa: 4569, precioventaf: 4600 },
  ];

  const { isDarkMode } = useContext(ThemeContext);
  const navigation = useNavigation();


  useEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: isDarkMode ? '#0B1016' : '#34495E',
      }, headerTintColor:  '#FFF',
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

  return (
    <SafeAreaView style={currentStyles.safeArea}>
      <StatusBar barStyle="light-content" />
      <View style={currentStyles.container}>

        <View style={currentStyles.searchBar}>
          <TextInput style={currentStyles.searchInput} placeholder="Buscar por nombre..." placeholderTextColor={isDarkMode ? "#506D8A" : "#FFF"}/>
          <Button title="buscar" color="#E17055" onPress={() => {}} />
          <Button title="filtrar" color="#E17055" onPress={() => {}} />
        </View>

        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />

        {selectedProduct && (
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}
          >
            <View style={currentStyles.modalContainer}>
              <View style={currentStyles.modalContent}>
                <TouchableOpacity onPress={() => setModalVisible(false)} style={currentStyles.closeButton}>
                  <Text style={{ fontSize: 18 }}>×</Text>
                </TouchableOpacity>
                <Image style={currentStyles.productImage} source={{ uri: selectedProduct.imagen }} />
                <Text style={currentStyles.modalText}>codigo:</Text>
                <TextInput style={currentStyles.modalInput} value={selectedProduct.codigo} editable={false} />
                <Text style={currentStyles.modalText}>nombre:</Text>
                <TextInput style={currentStyles.modalInput} value={selectedProduct.nombre} editable={false} />
                <Text style={currentStyles.modalText}>marca:</Text>
                <TextInput style={currentStyles.modalInput} value={selectedProduct.marca} editable={false} />
                <Text style={currentStyles.modalText}>categoria:</Text>
                <TextInput style={currentStyles.modalInput} value={selectedProduct.categoria} editable={false} />
                <Text style={currentStyles.modalText}>subcategoria:</Text>
                <TextInput style={currentStyles.modalInput} value={selectedProduct.subcategoria} editable={false} />
                <Text style={currentStyles.modalText}>stock (unidades):</Text>
                <TextInput style={currentStyles.modalInput} value={`${selectedProduct.stock}`} editable={false} />
                <Text style={currentStyles.modalText}>precio compra:</Text>
                <TextInput style={currentStyles.modalInput} value={`$ ${selectedProduct.preciocompra}`} editable={false} />
                <Text style={currentStyles.modalText}>porcentaje ganancia:</Text>
                <TextInput style={currentStyles.modalInput} value={`${selectedProduct.porcentajeganancia} %`} editable={false} />
                <Text style={currentStyles.modalText}>precio neto:</Text>
                <TextInput style={currentStyles.modalInput} value={`$ ${selectedProduct.precioneto}`} editable={false} />
                <Text style={currentStyles.modalText}>precio venta:</Text>
                <TextInput style={currentStyles.modalInput} value={`$ ${selectedProduct.precioventa}`} editable={false} />
                <Text style={currentStyles.modalText}>precio venta final:</Text>
                <TextInput style={currentStyles.modalInput} value={`$ ${selectedProduct.precioventaf}`} editable={false} />
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
    padding: 15,
    backgroundColor: '#e0e0e0',
  },
  searchInput: {
    flex: 1,
    padding: 5,
    backgroundColor: '#fff',
    borderRadius: 5,
    marginRight: 10,
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
    backgroundColor: '#E17055',
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
    alignItems: 'left',
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
    fontSize: 5,
    marginVertical: 2,
    color:"#fff",
    fontSize: 8,
  },
  modalInput: {
    width: '80%',
    color:"#fff",
    borderBottomWidth: 1,
    borderColor: '#ccc',
    marginBottom: 5,
  },
});

const styles2 = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#5A6D7C',
  },
  container: {
    flex: 1,
    backgroundColor: '#0B1016',
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
    padding: 15,
    backgroundColor: '#0B1016',
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
  productContainer: {
    flexDirection: 'row',
    backgroundColor: '#16202C',
    marginVertical: 5,
    padding: 10,
    borderRadius: 5,
    borderColor: '#009679',
    borderWidth: 1,   
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
    backgroundColor: '#E17055',
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
    alignItems: 'left',
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
    fontSize: 5,
    marginVertical: 2,
    color:"#fff",
    fontSize: 8,
  },
  modalInput: {
    width: '80%',
    color:"#fff",
    borderBottomWidth: 1,
    borderColor: '#ccc',
    marginBottom: 5,
  },
});