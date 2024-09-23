import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Alert, Modal, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner'; // Importa BarCodeScanner
import { StatusBar } from 'react-native';

const SalesScreen = () => {
  const data = [
    { id: '1', imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCnbI9di1nZ24e3kyApy8k2EXOU42MhnjOjA&s', codigo: '12', nombre: 'asdasdasd', marca: 'xxxxxx-xxxx', categoria: "bebestibles", subcategoria: "bebida", stock: 1, preciocompra: 3200, porcentajeganancia: 20, precioneto: 3840, precioventa: 4569, precioventaf: 4600 },
    { id: '2', imagen: 'https://i.pinimg.com/236x/1c/5a/0f/1c5a0f6f80497e34febe28e6d3577666.jpg', codigo: 'XXXXX', nombre: '123', marca: 'xxxxxx-xxxx', categoria: "bebestibles", subcategoria: "bebida", stock: 1, preciocompra: 3200, porcentajeganancia: 20, precioneto: 3840, precioventa: 4569, precioventaf: 4600 },
    { id: '3', imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStea81Of9aZlsrXenWOUDBtW1icv8GuAG9eQ&s', codigo: '1234', nombre: 'asdasdasd', marca: 'xxxxxx-xxxx', categoria: "bebestibles", subcategoria: "bebida", stock: 1, preciocompra: 3200, porcentajeganancia: 20, precioneto: 3840, precioventa: 4569, precioventaf: 200 },
    { id: '4', imagen: 'https://pbs.twimg.com/profile_images/3166355302/23b4a435aa8fe2fd3a9d7c22f42e3af6_400x400.jpeg', codigo: '12345', nombre: 'asdasdasd', marca: 'xxxxxx-xxxx', categoria: "bebestibles", subcategoria: "bebida", stock: 1, preciocompra: 3200, porcentajeganancia: 20, precioneto: 3840, precioventa: 4569, precioventaf: 300 },
    { id: '5', imagen: 'https://i.pinimg.com/236x/64/dd/2f/64dd2f429909c15c851a21d7ac09c702.jpg', codigo: '123456', nombre: 'asdasdasd', marca: 'xxxxxx-xxxx', categoria: "bebestibles", subcategoria: "bebida", stock: 15, preciocompra: 3200, porcentajeganancia: 20, precioneto: 3840, precioventa: 4569, precioventaf: 4600 },
    { id: '6', imagen: 'https://www.recreoviral.com/wp-content/uploads/2015/06/Animales-posando-para-la-foto-15.jpg', codigo: '7802000009266', nombre: 'asdasdasd', marca: 'xxxxxx-xxxx', categoria: "bebestibles", subcategoria: "bebida", stock: 1, preciocompra: 3200, porcentajeganancia: 20, precioneto: 3840, precioventa: 4569, precioventaf: 500 },
  ];

  const [searchCodigo, setSearchCodigo] = useState('');
  const [addedProducts, setAddedProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [hasPermission, setHasPermission] = useState(null);
  const [scanning, setScanning] = useState(false);

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleAddProduct = (codigo) => {
    const product = data.find(p => p.codigo === codigo);

    if (product) {
      const isAlreadyAdded = addedProducts.find(p => p.codigo === codigo);
      if (isAlreadyAdded) {
        Alert.alert('Error', 'El producto ya ha sido agregado.');
      } else {
        setAddedProducts([...addedProducts, product]);
        setTotal(total + product.precioventaf);
      }
    } else {
      Alert.alert('Error', `Producto con código ${codigo} no encontrado.`);
    }

    setSearchCodigo(''); // Reiniciar el campo de búsqueda
  };

  const handleRemoveProduct = (codigo) => {
    const productToRemove = addedProducts.find(p => p.codigo === codigo);
    if (productToRemove) {
      const updatedProducts = addedProducts.filter(p => p.codigo !== codigo);
      setAddedProducts(updatedProducts);
      setTotal(total - productToRemove.precioventaf);
    }
  };

  const handleBarCodeScanned = ({ type, data }) => {
    setScanning(false); // Detiene el escaneo
    setSearchCodigo(data); // Almacena el código escaneado
    handleAddProduct(data); // Llama a la función de agregar producto con el código escaneado
  };

  if (hasPermission === null) {
    return <Text>Solicitando permiso de cámara...</Text>;
  }
  if (hasPermission === false) {
    return <Text>No se ha concedido acceso a la cámara.</Text>;
  }

  const renderProduct = ({ item }) => (
    <View style={styles.productRow}>
      <Text style={styles.productText}>{item.nombre}</Text>
      <Text style={styles.productText}>{item.precioventaf}</Text>
      <Text style={styles.productText}>{item.stock}</Text>
      <View style={styles.productActions}>
        <TouchableOpacity style={styles.iconButton} onPress={() => handleRemoveProduct(item.codigo)}>
          <Text style={styles.iconText}>❌</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <Text style={styles.iconText}>ℹ️</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.searchSection}>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar por código"
          value={searchCodigo}
          onChangeText={setSearchCodigo}
        />
        <TouchableOpacity style={styles.scanButton} onPress={() => handleAddProduct(searchCodigo)}>
          <Text style={styles.scanButtonText}>Agregar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.scanButton} onPress={() => setScanning(true)}>
          <Text style={styles.scanButtonText}>QR</Text>
        </TouchableOpacity>
      </View>

      {scanning && (
        <Modal visible={scanning} animationType="slide">
          <View style={styles.modalContainer}>
            <View style={styles.cameraContainer}>
              <BarCodeScanner
                onBarCodeScanned={scanning ? handleBarCodeScanned : undefined}
                style={styles.camera}
              />
            </View>
            <Button title={'volver'} onPress={() => setScanning(false)} />
          </View>
        </Modal>
      )}

      <View style={styles.productTable}>
        <View style={styles.productHeader}>
          <Text style={styles.headerText}>Producto</Text>
          <Text style={styles.headerText}>Precio</Text>
          <Text style={styles.headerText}>Cantidad</Text>
          <Text style={styles.headerText}>Opciones</Text>
        </View>
        <FlatList
          data={addedProducts}
          keyExtractor={item => item.id}
          renderItem={renderProduct}
        />
      </View>

      <View style={styles.totalSection}>
        <Text style={styles.totalText}>Total</Text>
        <Text style={styles.totalAmount}>${total}</Text>
      </View>

      <View style={styles.actionButtons}>
        <TouchableOpacity style={styles.cancelButton}>
          <Text style={styles.cancelText}>Cancelar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.sellButton}>
          <Text style={styles.sellText}>Vender</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};



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

export default SalesScreen;
