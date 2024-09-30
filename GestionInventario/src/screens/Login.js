import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome, AntDesign } from '@expo/vector-icons';

export default function Login({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

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
          <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate('Inicio')}>
            <Text style={styles.buttonText}>Iniciar sesión</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.registerButton} onPress={() => navigation.navigate('Perfil')}>
            <Text style={styles.buttonText}>Registrarse</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={() => navigation.navigate('RecuperarContraseña')}>
          <Text style={styles.forgotPasswordText}>¿Olvidaste tu contraseña?</Text>
        </TouchableOpacity>

        <Text style={styles.orText}>O</Text>

        <TouchableOpacity style={styles.googleButton}>
          <AntDesign name="google" size={20} color="white" />
          <Text style={styles.googleButtonText}>Iniciar con Google</Text>
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
    fontWeight: 'Racing Sans One',
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
    marginBottom: 20,
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
});
