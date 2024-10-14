import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList, Button, SafeAreaView, StatusBar, Modal, Image, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ThemeContext } from '../../ThemeContext';
import { debounce } from 'lodash'; // Importar debounce

export default function App() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [filterModalVisible, setFilterModalVisible] = useState(false); // Estado para controlar la visibilidad del modal de filtros
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]); // Estado para guardar los productos filtrados
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(''); // Estado para la búsqueda
  const { isDarkMode } = useContext(ThemeContext);
  const navigation = useNavigation();

  // Función para obtener los productos desde la API
  const fetchProducts = async () => {
    try {
      const response = await fetch('http://10.0.2.2:8000/api/plist/');
      const responseText = await response.text();

      console.log('Response:', responseText);

      if (response.headers.get('Content-Type').includes('application/json')) {
        const products = JSON.parse(responseText);
        setData(products);
        setFilteredData(products); // Inicializar el estado filtrado con todos los productos
      } else {
        console.error('La respuesta no es JSON:', responseText);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Función para filtrar los productos basados en la búsqueda
  const handleSearch = debounce((query) => {
    if (query === '') {
      setFilteredData(data); // Mostrar todos los productos si el input de búsqueda está vacío
    } else {
      const filtered = data.filter(product => {
        const productIdMatch = product.id_producto.toString().includes(query);
        const productNameMatch = product.nombre_producto.toLowerCase().includes(query.toLowerCase());
        const productQuantityMatch = product.cantidad.toString().includes(query);

        return productIdMatch || productNameMatch || productQuantityMatch; // Retornar si coincide con cualquiera de los campos
      });
      setFilteredData(filtered);
    }
  }, 300); // El debounce espera 300ms antes de hacer la búsqueda

  // Función para manejar el input de búsqueda
  const onSearchChange = (text) => {
    setSearchQuery(text);
    handleSearch(text); // Llamar a la función con debounce
  };

  useEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: isDarkMode ? '#0B1016' : '#34495E',
      }, headerTintColor: '#FFF',
    });
  }, [isDarkMode, navigation]);

  const currentStyles = isDarkMode ? styles2 : styles;

  const fallbackImage = 'https://via.placeholder.com/150';

  const renderItem = ({ item }) => (
    <View style={currentStyles.productContainer}>
      <Image
        style={currentStyles.productImage}
        source={{ uri: item.img || fallbackImage }}
      />
      <View style={currentStyles.productDetails}>
        <Text style={{ color: 'white' }}>id: {item.id_producto}</Text>
        <Text style={{ color: 'white' }}>nombre: {item.nombre_producto}</Text>
        <Text style={{ color: 'white' }}>descripcion: {item.descripcion}</Text>
        <Text style={{ color: 'white' }}>precio venta: $ {item.precio_venta_final}</Text>
        <Text style={{ color: 'white' }}>cantidad: {item.cantidad} unidades</Text>
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
        {/* Barra de búsqueda */}
        <View style={currentStyles.searchBar}>
          <TextInput
            style={currentStyles.searchInput}
            placeholder="Buscar por nombre..."
            placeholderTextColor={isDarkMode ? "#506D8A" : "#FFF"}
            value={searchQuery}
            onChangeText={onSearchChange} // Actualiza la búsqueda en tiempo real
          />
          <Button title="buscar" color="#E17055" onPress={() => {}} />
          <Button title="filtrar" color="#E17055" onPress={() => setFilterModalVisible(true)} />
        </View>

        {loading ? (
          <ActivityIndicator size="large" color="#E17055" />
        ) : (
          <FlatList
            data={filteredData} // Renderizar la lista filtrada
            renderItem={renderItem}
            keyExtractor={item => item.id_producto.toString()}
          />
        )}

        {selectedProduct && (
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
          >
            <View style={currentStyles.modalContainer}>
              <View style={currentStyles.modalContent}>
                <TouchableOpacity onPress={() => setModalVisible(false)} style={currentStyles.closeButton}>
                  <Text style={{ fontSize: 18 }}>×</Text>
                </TouchableOpacity>
                <Image style={currentStyles.productImage} source={{ uri: selectedProduct.img || fallbackImage }} />
                <Text style={currentStyles.modalText}>nombre:</Text>
                <TextInput style={currentStyles.modalInput} value={selectedProduct.nombre_producto} editable={false} />
                <Text style={currentStyles.modalText}>descripcion:</Text>
                <TextInput style={currentStyles.modalInput} value={selectedProduct.descripcion} editable={false} />
                <Text style={currentStyles.modalText}>cantidad (unidades):</Text>
                <TextInput style={currentStyles.modalInput} value={`${selectedProduct.cantidad}`} editable={false} />
                <Text style={currentStyles.modalText}>precio venta:</Text>
                <TextInput style={currentStyles.modalInput} value={`$ ${selectedProduct.precio_venta_final}`} editable={false} />
              </View>
            </View>
          </Modal>
        )}

        {/* Modal de filtros */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={filterModalVisible}
          onRequestClose={() => setFilterModalVisible(false)}
        >
          <View style={currentStyles.filterModalContainer}>
            <View style={currentStyles.filterModalContent}>
              <Text style={currentStyles.modalText}>Filtros</Text>
              <Button title="Aplicar" onPress={() => setFilterModalVisible(false)} />
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
  filterModalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    filterModalContent: {
      width: '80%',
      backgroundColor: '#4B5A6C',
      borderRadius: 10,
      padding: 20,
      alignItems: 'center',
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
  filterModalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    filterModalContent: {
      width: '80%',
      backgroundColor: '#4B5A6C',
      borderRadius: 10,
      padding: 20,
      alignItems: 'center',
    },
});