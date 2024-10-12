import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

export default function Login({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre: username,
          contraseña: password
        }),
      });
      const data = await response.json();

      if (response.ok) {
        Alert.alert('Success', 'Login successful');
        navigation.navigate('Inicio');
      } else {
        Alert.alert('Error', data.error || 'Login failed');
      }
    } catch (error) {
      navigation.navigate('Inicio');
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

        {/* Se movió el texto de "¿Olvidaste tu contraseña?" fuera de buttonRow */}
        <TouchableOpacity onPress={() => navigation.navigate('RecuperarContraseña')}>
          <Text style={styles.forgotPasswordText}>¿Olvidaste tu contraseña?</Text>
        </TouchableOpacity>
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
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    marginBottom: 40,
  },
  titleOrange: {
    color: '#e17055',
  },
  titleWhite: {
    color: '#dfe6e9',
  },
  titleGreen: {
    color: '#00b894',
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
    justifyContent: 'center',
    width: '100%',
    marginVertical: 20,
  },
  loginButton: {
    backgroundColor: '#E17055',
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 30,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  forgotPasswordText: {
    color: '#3498db',
    fontSize: 16,
    marginTop: 20,  
  },
});
