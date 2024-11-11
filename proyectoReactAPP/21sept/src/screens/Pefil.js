import React, { useState, useContext, useEffect } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, StyleSheet, Button, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { ThemeContext } from '../../ThemeContext';
import { useUser } from '../components/UserContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export default function ProfileScreen() {
  const { user, setUser } = useUser();
  const [profileImage, setProfileImage] = useState(null);
  const [name, setName] = useState(user.nombre_usuario);
  const [phone, setPhone] = useState(user.nombre_empresa);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState(user.password);
  const [isEditing, setIsEditing] = useState(false);
  const [changesMade, setChangesMade] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const storedImage = await AsyncStorage.getItem('profileImage');
        if (storedImage) {
          setProfileImage(storedImage);
        }
      } catch (error) {
        console.error('Error al cargar la imagen guardada:', error);
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage(result.uri);
      setChangesMade(true);
      try {
        await AsyncStorage.setItem('profileImage', result.uri);
      } catch (error) {
        console.error('Error al guardar la imagen:', error);
      }
    }
  };

  const { isDarkMode, toggleTheme } = useContext(ThemeContext);
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: isDarkMode ? '#0B1016' : '#34495E',
      },
      headerTintColor: '#FFF',
    });
  }, [isDarkMode, navigation]);

  const currentStyles = isDarkMode ? styles2 : styles;

  const handleSave = async () => {
    if (!changesMade) {
      Alert.alert('Sin cambios', 'No se ha realizado ninguna modificación.');
      return;
    }

    try {
      const response = await axios.put(`http://190.114.252.218:8000/api/usuarios/${user.codigo_vendedor}/`, {
        nombre_usuario: name,
        nombre_empresa: phone,
        email: email,
        password: password,
        id_rol: 1,
        pin: "4567",
      });

      setUser({
        ...user,
        nombre_usuario: name,
        nombre_empresa: phone,
        email: email,
        password: password,
      });

      Alert.alert('Éxito', 'Datos actualizados correctamente');
      setIsEditing(false);
      setChangesMade(false);
    } catch (error) {
      Alert.alert('Error', 'No se pudo actualizar el usuario');
      console.error('Error actualizando el usuario:', error);
    }
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    if (!isEditing) {
      setChangesMade(false);
    }
  };

  return (
    <View style={currentStyles.container}>
      <View style={currentStyles.profileImageContainer}>
        <Image
          source={profileImage ? { uri: profileImage } : require('./assets/img/imgPerfil.png')}
          style={currentStyles.profileImage}
        />
        {isEditing && (
          <TouchableOpacity style={currentStyles.editImageButton} onPress={pickImage}>
            <MaterialIcons name="photo-camera" size={24} color="#E17055" />
          </TouchableOpacity>
        )}
      </View>

      <View style={currentStyles.infoContainer}>
        <View style={currentStyles.infoRow}>
          <Text style={currentStyles.label}>Nombre</Text>
          {isEditing ? (
            <TextInput
              style={currentStyles.input}
              value={name}
              onChangeText={(text) => {
                setName(text);
                setChangesMade(true);
              }}
            />
          ) : (
            <Text style={currentStyles.value}>{name}</Text>
          )}
        </View>
        <View style={currentStyles.infoRow}>
          <Text style={currentStyles.label}>Empresa</Text>
          {isEditing ? (
            <TextInput
              style={currentStyles.input}
              value={phone}
              onChangeText={(text) => {
                setPhone(text);
                setChangesMade(true);
              }}
            />
          ) : (
            <Text style={currentStyles.value}>{phone}</Text>
          )}
        </View>
        <View style={currentStyles.infoRow}>
          <Text style={currentStyles.label}>Email</Text>
          {isEditing ? (
            <TextInput
              style={currentStyles.input}
              value={email}
              onChangeText={(text) => {
                setEmail(text);
                setChangesMade(true);
              }}
            />
          ) : (
            <Text style={currentStyles.value}>{email}</Text>
          )}
        </View>
        {/* Aquí puedes agregar más campos si es necesario */}
      </View>

      <View style={currentStyles.buttonContainer}>
        {isEditing ? (
          <Button title="Guardar" onPress={handleSave} />
        ) : (
          <Button title="Editar" onPress={handleEditToggle} />
        )}
      </View>
    </View>
  );
}

// Estilos simplificados
const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  profileImageContainer: { alignItems: 'center', marginBottom: 20 },
  profileImage: { width: 150, height: 150, borderRadius: 75 },
  editImageButton: { position: 'absolute', bottom: 0, right: 10 },
  infoContainer: { marginBottom: 20 },
  infoRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  label: { fontSize: 16, fontWeight: 'bold' },
  value: { fontSize: 16 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 5, borderRadius: 5, flex: 1 },
  buttonContainer: { marginTop: 20 },
});

const styles2 = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B1016',
    paddingHorizontal: 20,
  },
  input: {
      color: '#808080',
      flex: 1,
      borderColor: '#ccc',
      borderWidth: 1,
      borderRadius: 5,
      padding: 5,
      marginLeft: 10,
    },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 20,
  },
  backButton: {
    marginRight: 10,
  },
  headerText: {
    fontSize: 24,
    color: '#00268F',
    fontWeight: 'bold',
  },
  profileImageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    backgroundColor: "#16202C",
    borderColor: '#009679',
  },
  editImageButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#16202C',
    padding: 5,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#E17055',
  },
  infoContainer: {
    marginBottom: 30,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#16202C',
    borderRadius: 10,
    marginBottom: 15,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#009679',
  },
  value: {
    fontSize: 18,
    color: '#506D8A',
    flex: 1,
    marginLeft: 10,
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: '#009679',
    backgroundColor: '#fff',
  },
});
