import React, { useState, useContext, useEffect} from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import Modal from 'react-native-modal'; // Puedes usar otras bibliotecas como react-native-modalbox
import { useNavigation} from '@react-navigation/native';
import { ThemeContext } from '../../ThemeContext';

export default function App() {
  const [modalVisible, setModalVisible] = useState(false);
  const [usuarios, setUsuarios] = useState([
    { id: 1, nombre: 'XXXX-XXXX' },
    { id: 2, nombre: 'XXXX-XXXX' },
    { id: 3, nombre: 'XXXX-XXXX' },
  ]);

  const handleAgregarUsuario = () => {
    setModalVisible(true);
  };

  const { isDarkMode, toggleTheme} = useContext(ThemeContext);
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
    <View style={currentStyles.usuarioItem}>
      <Text>{item.nombre}</Text>
      <TouchableOpacity style={currentStyles.button}>
        <Text>Editar</Text>
      </TouchableOpacity>
      <TouchableOpacity style={currentStyles.button}>
        <Text>Eliminar</Text>
      </TouchableOpacity>
    </View>
  );


  return (
    <View style={currentStyles.container}>
      <View style={currentStyles.header}>
        <Text style={currentStyles.title}>Usuarios</Text>
        <TouchableOpacity style={currentStyles.addButton} onPress={() => navigation.navigate('Inicio1')}>
          <Text style={currentStyles.buttonText}>+ Agregar Usuario</Text>
        </TouchableOpacity>
      </View>
      <Text style={currentStyles.label}>Usuarios para crear disponible: {usuarios.length}</Text>
      <FlatList
        data={usuarios}
        renderItem={({ item }) => (
          <View style={currentStyles.usuarioItem}>
            <Text style={currentStyles.nombre}>{item.nombre}</Text>
            <TouchableOpacity style={currentStyles.buttonEditar}>
              <Text style={currentStyles.buttonText}>Editar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={currentStyles.button}>
              <Text style={currentStyles.buttonText}>Eliminar</Text>  

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
      borderBottomColor:  
   '#ccc',
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


  const styles2 = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:  
   '#0B1016',
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding:  
   16,
      backgroundColor: '#0B1016',
    },
    title: {
      color: '#fff',
      fontSize: 20,
      fontWeight: 'bold',
    },
    addButton: {
      backgroundColor: '#E17055',
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
      backgroundColor: '#16202C',
      borderBottomWidth: 1,
      borderBottomColor:  
   '#009679',
    },
    nombre: {
      color: "#FFF",
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
