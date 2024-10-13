import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Modal, TextInput, Alert } from 'react-native';

// Función para generar una contraseña segura aleatoria
const generarContrasenaSegura = () => {
  const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
  let contrasena = '';
  for (let i = 0; i < 12; i++) {
    const randomIndex = Math.floor(Math.random() * caracteres.length);
    contrasena += caracteres[randomIndex];
  }
  return contrasena;
};

const AgregarUsuario = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [usuarios, setUsuarios] = useState([]);
  const [nombre, setNombre] = useState('');
  const [password, setPassword] = useState('');
  const [rol, setRol] = useState('');
  const [usuarioActual, setUsuarioActual] = useState(null);
  const [passwordVisible, setPasswordVisible] = useState(false); // Estado para controlar la visibilidad de la contraseña

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
        setUsuarios(data);
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

  // Función para agregar un nuevo usuario
  const agregarUsuario = async () => {
    if (usuarios.length >= 3) {
      Alert.alert('Límite alcanzado', 'No puedes agregar más de 3 usuarios.');
      return;
    }

    try {
      const response = await fetch('http://192.168.1.10:8000/api/v1/usuarios/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nombre, contraseña: password, rol: Number(rol) }), // Cambiar el cuerpo para incluir la contraseña y rol como número
      });

      if (response.ok) {
        setModalVisible(false);
        fetchUsuarios(); // Refresca la lista de usuarios
      } else {
        console.error('Error al agregar usuario');
      }
    } catch (error) {
      console.error('Error al agregar usuario:', error);
    }
  };

  // Función para editar un usuario
  const editarUsuario = async (id) => {
    try {
      const response = await fetch(`http://192.168.1.10:8000/api/v1/usuarios/${id}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nombre, contraseña: password, rol: Number(rol) }), // Cambiar el cuerpo para incluir la contraseña y rol como número
      });

      if (response.ok) {
        setModalVisible(false);
        fetchUsuarios(); // Refresca la lista de usuarios
      } else {
        console.error('Error al editar usuario');
      }
    } catch (error) {
      console.error('Error al editar usuario:', error);
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
              const response = await fetch(`http://192.168.1.10:8000/api/v1/usuarios/${id}/`, {
                method: 'DELETE',
              });

              if (response.ok) {
                fetchUsuarios(); // Refresca la lista de usuarios
              } else {
                console.error('Error al eliminar usuario');
              }
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
    <View style={styles.usuarioItem}>
      <Text style={styles.nombre}>{item.nombre}</Text>
      <TouchableOpacity
        style={styles.buttonEditar}
        onPress={() => {
          setNombre(item.nombre);
          setRol(item.rol.toString()); // Convertir rol a string para el TextInput
          setPassword(item.contraseña); // Mostrar la contraseña existente al editar
          setUsuarioActual(item.id);
          setModalVisible(true);
        }}
      >
        <Text style={styles.buttonText}>Editar</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => eliminarUsuario(item.id)}>
        <Text style={styles.buttonText}>Eliminar</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Usuarios</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => {
            setNombre('');
            setRol('');
            setPassword(generarContrasenaSegura());
            setUsuarioActual(null);
            setModalVisible(true);
          }}
        >
          <Text style={styles.buttonText}>+ Agregar Usuario</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.label}>Cantidad de usuarios: {usuarios.length}</Text>
      <FlatList data={usuarios} renderItem={renderItem} keyExtractor={(item) => item.id.toString()} />

      {/* Modal para agregar/editar usuario */}
      <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>{usuarioActual ? 'Editar Usuario' : 'Agregar Usuario'}</Text>
          <Text style={styles.label}>Nombre:</Text>
          <TextInput placeholder="Nombre" style={styles.input} value={nombre} onChangeText={setNombre} />

          <Text style={styles.label}>Rol (número):</Text>
          <TextInput placeholder="Rol (número)" style={styles.input} value={rol} onChangeText={setRol} keyboardType="numeric" />
          
          <Text style={styles.label}>Contraseña:</Text>
          <View style={styles.passwordContainer}>
            <TextInput
              placeholder="Contraseña"
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!passwordVisible} // Cambiar visibilidad según el estado
            />
            <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
              <Text>{passwordVisible ? 'Ocultar' : 'Mostrar'}</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.buttonGenerate} onPress={() => setPassword(generarContrasenaSegura())}>
            <Text style={styles.buttonText}>Generar Contraseña Segura</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.buttonSubmit}
            onPress={() => {
              if (usuarioActual) {
                editarUsuario(usuarioActual);
              } else {
                agregarUsuario();
              }
            }}
          >
            <Text style={styles.buttonText}>Confirmar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonCancel} onPress={() => setModalVisible(false)}>
            <Text style={styles.buttonText}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </Modal>
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
    paddingVertical: 5,
    color: '#666',
    fontWeight: 'bold',
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
    backgroundColor: '#e74c3c',
    padding: 5,
    borderRadius: 3,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 35,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    borderRadius: 5,
  },
  passwordContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  buttonGenerate: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonSubmit: {
    backgroundColor: '#2ecc71',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonCancel: {
    backgroundColor: '#e74c3c',
    padding: 10,
    borderRadius: 5,
  },
});

export default AgregarUsuario;
