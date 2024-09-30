import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';

const AgregarUsuario = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [usuarios, setUsuarios] = useState([]);

  // Función para obtener usuarios desde la API
  const fetchUsuarios = async () => {
    try {
      const response = await fetch('http://192.168.1.10:8000/api/v1/usuarios/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();

      if (response.ok) {
        setUsuarios(data); // Asume que la API devuelve una lista de usuarios
      } else {
        console.error('Error al obtener los usuarios:', data.error || 'No se pudo obtener los datos');
      }
    } catch (error) {
      console.error('Error al obtener los usuarios:', error);
    }
  };

  // Llamar a la API cuando el componente se monta
  useEffect(() => {
    fetchUsuarios();
  }, []);

  // Renderizado del item en la lista
  const renderItem = ({ item }) => (
    <View style={styles.usuarioItem}>
      <Text style={styles.nombre}>{item.nombre}</Text>
      <TouchableOpacity style={styles.buttonEditar}>
        <Text style={styles.buttonText}>Editar</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Eliminar</Text>
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
      <Text style={styles.label}>Cantidad de usuarios: {usuarios.length}</Text>
      <FlatList
        data={usuarios}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#34495E',
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
    borderBottomColor: '#ccc',
  },
  nombre: {
    fontWeight: 'bold',
  },
  buttonEditar: {
    backgroundColor: '#34495E',
    padding: 5,
    borderRadius: 3,
  },
  button: {
    backgroundColor: '#E17055',
    padding: 5,
    borderRadius: 3,
  },
});

export default AgregarUsuario;
