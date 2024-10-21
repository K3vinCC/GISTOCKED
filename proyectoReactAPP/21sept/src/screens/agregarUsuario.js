import React, { useState, useContext, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Alert } from 'react-native';
import { useUser } from '../components/UserContext'; // Asegúrate de que la ruta sea correcta
import axios from 'axios'; // Si no lo tienes ya, instala axios
import { useNavigation } from '@react-navigation/native';
import { ThemeContext } from '../../ThemeContext';
import { Picker } from '@react-native-picker/picker';
export default function AgregarUsuario() {
  const [nombreUsuario, setNombreUsuario] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [rut, setRut] = useState('');
  const [rol, setRol] = useState(''); // Para seleccionar el rol
  const [pin, setPin] = useState(''); // Si necesitas pin para los usuarios
  const navigation = useNavigation();
  const { isDarkMode } = useContext(ThemeContext);

  useEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: isDarkMode ? '#0B1016' : '#34495E',
      },
      headerTintColor: '#FFF',
    });
  }, [isDarkMode, navigation]);

  const currentStyles = isDarkMode ? styles2 : styles;
  const { user } = useUser(); // Obtener el contexto de usuario
  const handleAgregarUsuario = async () => {
      try {
        if (rol === '1') { // Admin
          await axios.post('http://190.114.252.218:8000/api/usuarios/', {
            nombre_usuario: nombreUsuario,
            password: password,
            email: email,
            id_rol: 1,
            pin: pin,
            nombre_empresa: user.nombre_empresa, // Usar el nombre de la empresa del contexto
          });
        } else if (rol === '2') { // Vendedor
          await axios.post('http://190.114.252.218:8000/api/vendedores/', {
            nombres: nombreUsuario,
            apellidos: 'a',
            rut: rut,
            contraseña: password,
            nombre_empresa: user.nombre_empresa, // Usar el nombre de la empresa del contexto
            id_admin: user.id_admin, // Usar el id_admin del contexto
          });
        }
        Alert.alert('Éxito', 'Usuario agregado correctamente');
      } catch (error) {
         console.error(error); // Muestra el error en la consola
                const errorMessage = error.response?.data?.detail || 'No se pudo agregar el usuario';
                Alert.alert('Error', errorMessage);
      }
    };
  return (
    <View style={currentStyles.container}>
      <Text style={currentStyles.title}>Agregar Usuario</Text>

      {/* Campo para elegir el rol */}
      <Text style={currentStyles.label}>Selecciona el Rol:</Text>
      <Picker
        selectedValue={rol}
        style={currentStyles.input}
        onValueChange={(itemValue) => setRol(itemValue)}
      >
        <Picker.Item label="Selecciona un rol" value="" />
        <Picker.Item label="Admin" value="1" />
        <Picker.Item label="Vendedor" value="2" />
      </Picker>

      {/* Formulario común para Admin y Vendedor */}
      <TextInput
        placeholder="Nombre de Usuario"
        style={currentStyles.input}
        value={nombreUsuario}
        onChangeText={setNombreUsuario}
      />
      <TextInput
        placeholder="Contraseña"
        style={currentStyles.input}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      {rol === '1' && (
        <>
          <TextInput
            placeholder="Email"
            style={currentStyles.input}
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            placeholder="PIN"
            style={currentStyles.input}
            value={pin}
            onChangeText={setPin}
          />
        </>
      )}
      {rol === '2' && (
        <>
          <TextInput
            placeholder="RUT"
            style={currentStyles.input}
            value={rut}
            onChangeText={setRut}
          />
        </>
      )}

      <TouchableOpacity style={currentStyles.addButton} onPress={handleAgregarUsuario}>
        <Text style={currentStyles.buttonText}>Agregar Usuario</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFF',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
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
  buttonText: {
    color: '#fff',
    textAlign: 'center',
  },
});

const styles2 = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#0B1016',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#FFF',
  },
  input: {
    borderWidth: 1,
    borderColor: '#16202C',
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
    backgroundColor: '#16202C',
    color: '#FFF',
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: '#FFF',
  },
  addButton: {
    backgroundColor: '#2ecc71',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
  },
});