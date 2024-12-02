

import React, { useState, useContext, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, Modal, TextInput, Alert, ScrollView, StyleSheet } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { ThemeContext } from '../../ThemeContext';
import { Picker } from '@react-native-picker/picker';
import { useUser } from '../components/UserContext'; // Ruta correcta al contexto

const AgregarUsuario = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [usuarios, setUsuarios] = useState([]);
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [idRol, setIdRol] = useState('');
  const [codigoDeConfirmacion, setCodigoDeConfirmacion] = useState('');
  const [usuarioActual, setUsuarioActual] = useState(null);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const navigation = useNavigation();
  const { isDarkMode } = useContext(ThemeContext);
  const { user } = useUser(); // Obtenemos datos como id_empresa

  useEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: isDarkMode ? '#0B1016' : '#34495E',
      },
      headerTintColor: '#FFF',
    });
  }, [isDarkMode, navigation]);

  const currentStyles = isDarkMode ? styles2 : styles;

  // Función para obtener usuarios según id_empresa
  const fetchUsuarios = async () => {
    try {
      const response = await axios.post(
        'http://190.114.252.218:8000/api/usuarios/',
        { id_empresa: user.id_empresa },
        { headers: { 'Content-Type': 'application/json' } }
      );
      setUsuarios(response.data);
    } catch (error) {
      console.error('Error al obtener los usuarios:', error);
    }
  };

  // Llamar a la API al montar el componente
  useEffect(() => {
    if (user?.id_empresa) {
      fetchUsuarios();
    }
  }, [user]);

  // Función para agregar o editar un usuario
  const guardarUsuario = async () => {
    try {
      const datos = {
        id_empresa: user.id_empresa,
        password,
        email,
        id_rol: parseInt(idRol),
        codigo_de_confirmacion: codigoDeConfirmacion,
      };

      await axios.post('http://190.114.252.218:8000/api/usuarios/', datos, {
        headers: { 'Content-Type': 'application/json' },
      });

      Alert.alert('Éxito', usuarioActual ? 'Usuario actualizado correctamente' : 'Usuario agregado correctamente');
      setModalVisible(false);
      fetchUsuarios();
    } catch (error) {
      console.error('Error al guardar usuario:', error);
      const errorMessage = error.response?.data?.detail || 'No se pudo guardar el usuario';
      Alert.alert('Error', errorMessage);
    }
  };

  // Función para eliminar un usuario
  const eliminarUsuario = async (id) => {
    Alert.alert(
      'Confirmar eliminación',
      '¿Estás seguro de que deseas eliminar este usuario?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          onPress: async () => {
            try {
              await axios.delete(`http://190.114.252.218:8000/api/usuarios/${id}/`);
              fetchUsuarios();
            } catch (error) {
              console.error('Error al eliminar usuario:', error);
            }
          },
        },
      ]
    );
  };

  // Renderizado del item en la lista
  const renderItem = ({ item }) => (
    <View style={currentStyles.usuarioItem}>
      <Text style={currentStyles.nombre}>{item.email}</Text>
      <TouchableOpacity
        style={currentStyles.buttonEditar}
        onPress={() => {
          setPassword(item.password);
          setEmail(item.email);
          setIdRol(item.id_rol?.toString());
          setCodigoDeConfirmacion(item.codigo_de_confirmacion);
          setUsuarioActual(item.codigo_vendedor);
          setModalVisible(true);
        }}
      >
        <Text style={currentStyles.buttonText}>Editar</Text>
      </TouchableOpacity>
      <TouchableOpacity style={currentStyles.button} onPress={() => eliminarUsuario(item.codigo_vendedor)}>
        <Text style={currentStyles.buttonText}>Eliminar</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={currentStyles.container}>
      <View style={currentStyles.header}>
        <Text style={currentStyles.title}>Usuarios</Text>
        <TouchableOpacity
          style={currentStyles.addButton}
          onPress={() => {
            setPassword('');
            setEmail('');
            setIdRol('');
            setCodigoDeConfirmacion('');
            setUsuarioActual(null);
            setModalVisible(true);
          }}
        >
          <Text style={currentStyles.buttonText}>+ Agregar Usuario</Text>
        </TouchableOpacity>
      </View>
      <FlatList data={usuarios} renderItem={renderItem} keyExtractor={(item) => item.codigo_vendedor.toString()} />

      {/* Modal para agregar/editar usuario */}
      <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
        <View style={currentStyles.modalView}>
          <ScrollView contentContainerStyle={currentStyles.scrollContainer}>
            <Text style={currentStyles.modalText}>{usuarioActual ? 'Editar Usuario' : 'Agregar Usuario'}</Text>

            <Text style={currentStyles.label}>Email</Text>
            <TextInput
              placeholder="Email"
              style={currentStyles.input}
              value={email}
              onChangeText={setEmail}
            />

            <Text style={currentStyles.label}>Contraseña</Text>
            <TextInput
              placeholder="Contraseña"
              style={currentStyles.input}
              secureTextEntry={!passwordVisible}
              value={password}
              onChangeText={setPassword}
            />

            <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
              <Text>{passwordVisible ? 'Ocultar' : 'Mostrar'}</Text>
            </TouchableOpacity>

            <Text style={currentStyles.label}>Rol</Text>
            <Picker
              selectedValue={idRol}
              style={currentStyles.input}
              onValueChange={(itemValue) => setIdRol(itemValue)}
            >
              <Picker.Item label="Selecciona un rol" value="" />
              <Picker.Item label="Admin" value="1" />
              <Picker.Item label="Vendedor" value="2" />
            </Picker>

            <Text style={currentStyles.label}>Código de Confirmación</Text>
            <TextInput
              placeholder="Código de Confirmación"
              style={currentStyles.input}
              value={codigoDeConfirmacion}
              onChangeText={setCodigoDeConfirmacion}
            />

            <TouchableOpacity style={currentStyles.button} onPress={guardarUsuario}>
              <Text style={currentStyles.buttonText}>{usuarioActual ? 'Guardar Cambios' : 'Agregar Usuario'}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[currentStyles.button, currentStyles.buttonClose]} onPress={() => setModalVisible(false)}>
              <Text style={currentStyles.buttonText}>Cerrar</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#DDD',
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  addButton: {
    backgroundColor: '#2ecc71',
    padding: 10,
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
  },
  buttonClose: {
    backgroundColor: '#e74c3c',
  },
  // modalView: {
  //   flex: 1,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   backgroundColor: 'rgba(0,0,0,0.5)',
  // },
  modalView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center', // Puedes ajustar o quitar esta propiedad si prefieres
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 2, // Agrega un poco de espacio entre el modal y los bordes
  },
  scrollContainer: {
    padding: 20,
    width: '100%',
    backgroundColor: '#FFF',
    borderRadius: 10,
  },
  modalText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  usuarioItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#DDD',
  },
  nombre: {
    fontSize: 18,
  },
  buttonEditar: {
    backgroundColor: '#f39c12',
    padding: 5,
    borderRadius: 5,
  },
});

const styles2 = StyleSheet.create({
  ...styles,
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#0B1016',
  },
  title: {
    color: '#FFF',
  },
  input: {
    backgroundColor: '#16202C',
    color: '#FFF',
  },
  label: {
    color: '#FFF',
  },
  buttonText: {
    color: '#FFF',
  },
});

export default AgregarUsuario;