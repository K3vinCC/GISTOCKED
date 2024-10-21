import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useUser } from '../components/UserContext';
import { ThemeContext } from '../../ThemeContext';
import * as SplashScreen from 'expo-splash-screen'; // Importamos SplashScreen
import { useFonts } from 'expo-font';
export default function Login({ navigation }) {
  const [isRegistering, setIsRegistering] = useState(false); // Controla si es login o registro
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [nombreEmpresa, setNombreEmpresa] = useState('');
  const [email, setEmail] = useState('');
  const [pin, setPin] = useState('');
    const { setUser } = useUser();
    const [fontsLoaded] = useFonts({
        'Roboto-Medium': require('../../assets/fonts/Roboto-Medium.ttf'),
        'Roboto-Bold': require('../../assets/fonts/Roboto-Bold.ttf'),
        'Racing': require('../../assets/fonts/RacingSansOne-Regular.ttf'),
      });

      // Mover la lógica de hideAsync al mismo nivel del hook useEffect
      useEffect(() => {
        async function prepare() {
          if (fontsLoaded) {
            await SplashScreen.hideAsync();
          }
        }
        prepare();
      }, [fontsLoaded]);
  // Función para iniciar sesión
  const handleLogin = async () => {
    try {
      const response = await fetch('http://190.114.252.218:8000/api/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre_usuario: username,
          password: password,
        }),
      });
      const data = await response.json();
      console.log("error", data);
     if (response.ok) {
             // Actualiza el contexto con el id_admin y nombre_empresa
             setUser({
               codigo_vendedor: data.codigo_vendedor,
               id_admin: data.id_admin, // Asume que el backend devuelve el id_admin
               nombre_empresa: data.nombre_empresa,
               nombre_usuario: data.nombre_usuario,
               email: data.email,
               password: data.password,
               pin: data.pin,
             });

             Alert.alert('Success', 'Login successful');
             navigation.navigate('Inicio');
           } else {
        Alert.alert('Error', data.error || 'Login failed');
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong');
    }
  };

  // Función para registrar usuario
  const handleRegister = async () => {
    try {
      const response = await fetch('http://190.114.252.218:8000/api/registrar/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre_usuario: username,
          nombre_empresa: nombreEmpresa,
          password: password,
          email: email,
          id_rol: 1, // Todos los registrados tendrán el rol de admin
          pin: pin,
        }),
      });

      const data = await response.json();

      if (response.ok) {

        const newUserId = data.codigo_vendedor;
        // El ID autogenerado del usuario
        // Hacer una segunda llamada para actualizar el id_admin con el mismo id del usuario

        const updateResponse = await fetch(`http://190.114.252.218:8000/api/usuarios/${newUserId}/`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id_admin: newUserId, // El id_admin es el mismo que el id autoincremental del usuario
          }),
        });
        console.log("error", updateResponse)
        if (updateResponse.ok) {
        console.log("Error: ", newUserId);
          Alert.alert('Success', 'User registered successfully');
          setIsRegistering(false); // Volver a la pantalla de inicio de sesión
        } else {
          Alert.alert('Error', str(data));
        }
      } else {
        Alert.alert('Error', data.error || 'Registration failed');
      }
} catch (error) {
          Alert.alert('Error', 'Something went wrong');
        }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        <Text style={styles.titleOrange}>G</Text>
        <Text style={styles.titleWhite}>ISTOCKE</Text>
        <Text style={styles.titleGreen}>D</Text>
      </Text>

      <View style={styles.formContainer}>
        <View style={styles.avatar}>
          <FontAwesome name="user-circle-o" size={64} color="#d3d3d3" />
        </View>

        {/* Formulario de login */}
        {!isRegistering ? (
          <>
            <View style={styles.inputContainer}>
              <FontAwesome name="user" size={20} color="#2d3436" style={styles.icon} />
              <TextInput
                style={styles.input}
                placeholder="Nombre de usuario"
                placeholderTextColor="#dfe6e9"
                value={username}
                onChangeText={setUsername}
              />
            </View>

            <View style={styles.inputContainer}>
              <FontAwesome name="lock" size={20} color="#2d3436" style={styles.icon} />
              <TextInput
                style={styles.input}
                placeholder="Contraseña"
                placeholderTextColor="#dfe6e9"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
              />
            </View>

            <View style={styles.buttonRow}>
              <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                <Text style={styles.buttonText}>Iniciar sesión</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity onPress={() => setIsRegistering(true)}>
              <Text style={styles.toggleText}>¿No tienes una cuenta? Regístrate</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            {/* Formulario de registro */}
            <View style={styles.inputContainer}>
              <FontAwesome name="user" size={20} color="#2d3436" style={styles.icon} />
              <TextInput
                style={styles.input}
                placeholder="Nombre de usuario"
                placeholderTextColor="#dfe6e9"
                value={username}
                onChangeText={setUsername}
              />
            </View>

            <View style={styles.inputContainer}>
              <FontAwesome name="building" size={20} color="#2d3436" style={styles.icon} />
              <TextInput
                style={styles.input}
                placeholder="Nombre de la empresa"
                placeholderTextColor="#dfe6e9"
                value={nombreEmpresa}
                onChangeText={setNombreEmpresa}
              />
            </View>

            <View style={styles.inputContainer}>
              <FontAwesome name="envelope" size={20} color="#2d3436" style={styles.icon} />
              <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="#dfe6e9"
                value={email}
                onChangeText={setEmail}
              />
            </View>

            <View style={styles.inputContainer}>
              <FontAwesome name="lock" size={20} color="#2d3436" style={styles.icon} />
              <TextInput
                style={styles.input}
                placeholder="Contraseña"
                placeholderTextColor="#dfe6e9"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
              />
            </View>

            <View style={styles.inputContainer}>
              <FontAwesome name="key" size={20} color="#2d3436" style={styles.icon} />
              <TextInput
                style={styles.input}
                placeholder="PIN"
                placeholderTextColor="#dfe6e9"
                value={pin}
                onChangeText={setPin}
              />
            </View>

            <View style={styles.buttonRow}>
              <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
                <Text style={styles.buttonText}>Registrar</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity onPress={() => setIsRegistering(false)}>
              <Text style={styles.toggleText}>¿Ya tienes una cuenta? Inicia sesión</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#34495E',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    marginBottom: 40,
  },
  titleOrange: {
    color: '#e17055',
    fontFamily: "Racing",
  },
  titleWhite: {
    color: '#dfe6e9',
    fontFamily: "Racing",
  },
  titleGreen: {
    color: '#00b894',
    fontFamily: "Racing",
  },
  formContainer: {
    width: '90%',
    backgroundColor: '#ecf0f1',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
  },
  avatar: {
    marginBottom: 20,
    alignItems: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#34495E',
    borderRadius: 30,
    paddingHorizontal: 15,
    marginVertical: 10,
    width: '100%',
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 50,
    color: 'white',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginVertical: 20,
  },
  loginButton: {
    backgroundColor: '#E17055',
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 30,
  },
  registerButton: {
    backgroundColor: '#3498db',
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 30,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  orText: {
    color: '#636e72',
    fontSize: 18,
    marginVertical: 20,
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#db4437',
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 20,
    width: '100%',
    justifyContent: 'center',
  },
  googleButtonText: {
    color: 'white',
    fontWeight: 'bold',
    marginLeft: 10,
  },
  toggleText: {
    textAlign: 'center',
    color: '#dfe6e9',
    marginTop: 10,
  },
});

