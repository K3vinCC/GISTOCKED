import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import Modal from 'react-native-modal'; // Puedes usar otras bibliotecas como react-native-modalbox

const AgregarUsuario = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [usuarios, setUsuarios] = useState([
    { id: 1, nombre: 'XXXX-XXXX' },
    { id: 2, nombre: 'XXXX-XXXX' },
    { id: 3, nombre: 'XXXX-XXXX' },
  ]);

  const handleAgregarUsuario = () => {
    setModalVisible(true);
  };

  const renderItem = ({ item }) => (
    <View style={styles.usuarioItem}>
      <Text>{item.nombre}</Text>
      <TouchableOpacity style={styles.button}>
        <Text>Editar</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Text>Eliminar</Text>
      </TouchableOpacity>
    </View>
  );


  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Usuarios</Text>
        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.buttonText}>+ Agregar Usuario</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.label}>Usuarios para crear disponible: {usuarios.length}</Text>
      <FlatList
        data={usuarios}
        renderItem={({ item }) => (
          <View style={styles.usuarioItem}>
            <Text style={styles.nombre}>{item.nombre}</Text>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Editar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Eliminar</Text>  

            </TouchableOpacity>
          </View>
        )}
        keyExtractor={item => item.id}
      />
    </View>
  );
};
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:  
   '#f0f0f0',
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding:  
   16,
      backgroundColor: '#333',
    },
    title: {
      color: '#fff',
      fontSize: 20,
      fontWeight: 'bold',
    },
    addButton: {
      backgroundColor: '#2ecc71',
      padding: 10,
      borderRadius: 5,
    },
    buttonText: {
      color: '#fff',
    },
    label: {
      padding: 16,
      color: '#666',
    },
    usuarioItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 16,
      backgroundColor: '#fff',
      borderBottomWidth: 1,
      borderBottomColor:  
   '#ccc',
    },
    nombre: {
      fontWeight: 'bold',
    },
    button: {
      backgroundColor: '#e74c3c',
      padding: 5,
      borderRadius: 3,
    },
  });
  
export default AgregarUsuario;