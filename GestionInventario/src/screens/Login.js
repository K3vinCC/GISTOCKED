import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useUser } from '../components/UserContext';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';

export default function Login({ navigation }) {
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nombreEmpresa, setNombreEmpresa] = useState('');
  const { setUser } = useUser();

  const [fontsLoaded] = useFonts({
    'Roboto-Medium': require('../../assets/fonts/Roboto-Medium.ttf'),
    'Roboto-Bold': require('../../assets/fonts/Roboto-Bold.ttf'),
    'Racing': require('../../assets/fonts/RacingSansOne-Regular.ttf'),
  });

  useEffect(() => {
    async function prepare() {
      if (fontsLoaded) {
        await SplashScreen.hideAsync();
      }
    }
    prepare();
  }, [fontsLoaded]);

  const handleLogin = async () => {
    try {
      const response = await fetch('http://190.114.252.218:8000/api/login-usuario/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        setUser({
          codigo_vendedor: data.codigo_vendedor,
          email: data.email,
          id_rol: 1,
          id_empresa: data.id_empresa,
          nombre_empresa: data.empresa,
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

  const handleRegister = async () => {
    try {
      const response = await fetch('http://190.114.252.218:8000/api/registrar/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
          id_empresa: nombreEmpresa,
          id_rol: 1, // Assuming id_rol is always 1
        }),
      });

      const data = await response.json();
      if (response.ok) {
        Alert.alert('Success', 'Registration successful');
        setIsRegistering(false);
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

        {!isRegistering ? (
          <>
            {/* Login Form */}
            <View style={styles.inputContainer}>
              <FontAwesome name="email" size={20} color="#2d3436" style={styles.icon} />
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
                placeholder="Password"
                placeholderTextColor="#dfe6e9"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
              />
            </View>

            <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setIsRegistering(true)}>
              <Text style={styles.toggleText}>Don't have an account? Register</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            {/* Registration Form */}
            <View style={styles.inputContainer}>
              <FontAwesome name="email" size={20} color="#2d3436" style={styles.icon} />
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
                placeholder="Password"
                placeholderTextColor="#dfe6e9"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
              />
            </View>

            <View style={styles.inputContainer}>
              <FontAwesome name="building" size={20} color="#2d3436" style={styles.icon} />
              <TextInput
                style={styles.input}
                placeholder="Company ID"
                placeholderTextColor="#dfe6e9"
                value={nombreEmpresa}
                onChangeText={setNombreEmpresa}
              />
            </View>

            <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
              <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setIsRegistering(false)}>
              <Text style={styles.toggleText}>Already have an account? Login</Text>
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
  modalContainer: { flex: 1, justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.5)', padding: 20 },
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

