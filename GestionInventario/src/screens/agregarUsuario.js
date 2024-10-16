import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Modal, TextInput, Alert, ScrollView } from 'react-native';

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
  const [nombreUsuario, setNombreUsuario] = useState('');
  const [nombreEmpresa, setNombreEmpresa] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [pin, setPin] = useState('');
  const [idRol, setIdRol] = useState('');
  const [idAdmin, setIdAdmin] = useState('');
  const [usuarioActual, setUsuarioActual] = useState(null);
  const [passwordVisible, setPasswordVisible] = useState(false);

  // Función para obtener usuarios desde la API
  const fetchUsuarios = async () => {
    try {
      const response = await fetch('http://192.168.1.10:8000/api/usuarios/', {
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
      const response = await fetch('http://192.168.1.10:8000/api/usuarios/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre_usuario: nombreUsuario,
          nombre_empresa: nombreEmpresa,
          password: password,
          email: email,
          pin: pin,
          id_rol: Number(idRol),
          id_admin: idAdmin ? Number(idAdmin) : null,
        }),
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
      const response = await fetch(`http://192.168.1.10:8000/api/usuarios/${id}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre_usuario: nombreUsuario,
          nombre_empresa: nombreEmpresa,
          password: password,
          email: email,
          pin: pin,
          id_rol: Number(idRol),
          id_admin: idAdmin ? Number(idAdmin) : null,
        }),
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
              const response = await fetch(`http://192.168.1.10:8000/api/usuarios/${id}/`, {
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
      <Text style={styles.nombre}>{item.nombre_usuario}</Text>
      <TouchableOpacity
        style={styles.buttonEditar}
        onPress={() => {
          setNombreUsuario(item.nombre_usuario);
          setNombreEmpresa(item.nombre_empresa);
          setPassword(item.password);
          setEmail(item.email);
          setPin(item.pin);
          setIdRol(item.id_rol.toString());
          setIdAdmin(item.id_admin ? item.id_admin.toString() : '');
          setUsuarioActual(item.codigo_vendedor);
          setModalVisible(true);
        }}
      >
        <Text style={styles.buttonText}>Editar</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => eliminarUsuario(item.codigo_vendedor)}>
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
            setNombreUsuario('');
            setNombreEmpresa('');
            setPassword(generarContrasenaSegura());
            setEmail('');
            setPin('');
            setIdRol('');
            setIdAdmin('');
            setUsuarioActual(null);
            setModalVisible(true);
          }}
        >
          <Text style={styles.buttonText}>+ Agregar Usuario</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.label}>Cantidad de usuarios: {usuarios.length}</Text>
      <FlatList data={usuarios} renderItem={renderItem} keyExtractor={(item) => item.codigo_vendedor.toString()} />

      {/* Modal para agregar/editar usuario */}
      <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalView}>
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            <Text style={styles.modalText}>{usuarioActual ? 'Editar Usuario' : 'Agregar Usuario'}</Text>

            <Text style={styles.label}>Nombre de Usuario:</Text>
            <TextInput placeholder="Nombre de Usuario" style={styles.input} value={nombreUsuario} onChangeText={setNombreUsuario} />

            <Text style={styles.label}>Nombre de Empresa:</Text>
            <TextInput placeholder="Nombre de Empresa" style={styles.input} value={nombreEmpresa} onChangeText={setNombreEmpresa} />

            <Text style={styles.label}>Email:</Text>
            <TextInput placeholder="Email" style={styles.input} value={email} onChangeText={setEmail} keyboardType="email-address" />

            <Text style={styles.label}>PIN:</Text>
            <TextInput placeholder="PIN" style={styles.input} value={pin} onChangeText={setPin} keyboardType="numeric" />

            <Text style={styles.label}>ID Rol:</Text>
            <TextInput placeholder="ID Rol" style={styles.input} value={idRol} onChangeText={setIdRol} keyboardType="numeric" />

            <Text style={styles.label}>ID Admin:</Text>
            <TextInput placeholder="ID Admin" style={styles.input} value={idAdmin} onChangeText={setIdAdmin} keyboardType="numeric" />

            <Text style={styles.label}>Contraseña:</Text>
            <View style={styles.passwordContainer}>
              <TextInput
                placeholder="Contraseña"
                style={styles.input}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!passwordVisible}
              />
              <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
                <Text>{passwordVisible ? 'Ocultar' : 'Mostrar'}</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.buttonGenerate} onPress={() => setPassword(generarContrasenaSegura())}>
              <Text style={styles.buttonText}>Generar Contraseña</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                if (usuarioActual) {
                  editarUsuario(usuarioActual);
                } else {
                  agregarUsuario();
                }
              }}
            >
              <Text style={styles.buttonText}>{usuarioActual ? 'Guardar Cambios' : 'Agregar Usuario'}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.button, styles.buttonClose]} onPress={() => setModalVisible(false)}>
              <Text style={styles.buttonText}>Cerrar</Text>
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
  addButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  label: {
    fontSize: 16,
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginTop: 5,
    borderRadius: 5,
  },
  usuarioItem: {
    padding: 15,
    backgroundColor: '#f9f9f9',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: '#FF0000',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  buttonEditar: {
    backgroundColor: '#1E90FF',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginRight: 10,
  },
  modalView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonGenerate: {
    backgroundColor: '#FFA500',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonClose: {
    backgroundColor: '#999',
    marginTop: 20,
  },
});

export default AgregarUsuario;
