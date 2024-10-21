import React, { useState, useContext, useEffect } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, StyleSheet, Button, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { ThemeContext } from '../../ThemeContext';
import { useUser } from '../components/UserContext'; // Asegúrate de que la ruta sea correcta
import axios from 'axios';
export default function ProfileScreen() {

  const { user, setUser } = useUser(); // Asegúrate de tener setUser para actualizar el usuario
  const [profileImage, setProfileImage] = useState(null);
  const [name, setName] = useState(user.nombre_usuario);
  const [phone, setPhone] = useState(user.nombre_empresa);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState(user.password);
  const [isEditing, setIsEditing] = useState(false); // Estado para saber si está en modo de edición

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Se requieren permisos para acceder a la galería.');
        }
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
    try {
        // Aquí puedes ajustar la URL según la estructura de tu API y el id del usuario que estás actualizando.
        const response = await axios.put(`http://190.114.252.218:8000/api/usuarios/${user.codigo_vendedor}/`, {
          nombre_usuario: name,
          nombre_empresa: phone,
          email: email,
          password: password, // Asegúrate de incluir el password si es obligatorio
          id_rol: 1, // Asegúrate de incluir id_rol
          pin: "4567",
        });

        // Actualiza el contexto de usuario con los nuevos valores
        setUser({
                       nombre_empresa: user.nombre_empresa,
                       nombre_usuario: user.nombre_usuario,
                       email: user.email,// Asume que el backend devuelve el nombre de la empresa
                     });

        Alert.alert('Éxito', 'Datos actualizados correctamente');
        setIsEditing(false);
      } catch (error) {
        Alert.alert('Error', 'No se pudo actualizar el usuario');
        console.error('Error actualizando el usuario:', error);
      }
  };

  return (
    <View style={currentStyles.container}>
      <View style={currentStyles.profileImageContainer}>
        <Image
          source={profileImage ? { uri: profileImage } : require('./assets/img/imgPerfil.png')}
          style={currentStyles.profileImage}
        />
        <TouchableOpacity style={currentStyles.editImageButton} onPress={pickImage}>
          <MaterialIcons name="photo-camera" size={24} color="#E17055" />
        </TouchableOpacity>
      </View>

      <View style={currentStyles.infoContainer}>
        <View style={currentStyles.infoRow}>
          <Text style={currentStyles.label}>Nombre</Text>
          {isEditing ? (
            <TextInput
              style={currentStyles.input}
              value={name}
              onChangeText={setName}
            />
          ) : (
            <Text style={currentStyles.value}>{name}</Text>
          )}
          <TouchableOpacity onPress={() => setIsEditing(!isEditing)}>
            <FontAwesome name="pencil" size={24} color="#E17055" />
          </TouchableOpacity>
        </View>
        <View style={currentStyles.infoRow}>
          <Text style={currentStyles.label}>Empresa</Text>
          {isEditing ? (
            <TextInput
              style={currentStyles.input}
              value={phone}
              onChangeText={setPhone}
            />
          ) : (
            <Text style={currentStyles.value}>{phone}</Text>
          )}
          <TouchableOpacity onPress={() => setIsEditing(!isEditing)}>
            <FontAwesome name="pencil" size={24} color="#E17055" />
          </TouchableOpacity>
        </View>
        <View style={currentStyles.infoRow}>
          <Text style={currentStyles.label}>Correo</Text>
          {isEditing ? (
            <TextInput
              style={currentStyles.input}
              value={email}
              onChangeText={setEmail}
            />
          ) : (
            <Text style={currentStyles.value}>{email}</Text>
          )}
          <TouchableOpacity onPress={() => setIsEditing(!isEditing)}>
            <FontAwesome name="pencil" size={24} color="#E17055" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={currentStyles.infoRow}>
                <Text style={currentStyles.label}>Contraseña</Text>
                {isEditing ? (
                  <TextInput
                    style={currentStyles.input}
                    value={password}
                    onChangeText={setPassword}
                  />
                ) : (
                  <Text style={currentStyles.value}>{'*******'}</Text>
                )}
                <TouchableOpacity onPress={() => setIsEditing(!isEditing)}>
                  <FontAwesome name="pencil" size={24} color="#E17055" />
                </TouchableOpacity>
              </View>
      {isEditing && (
              <Button title="Guardar Cambios" onPress={() => {
                                                  handleSave();       // Call your save function
                                                  setIsEditing(false); // Then change the state
                                                }}/>
            )}


    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F6FB',
    paddingHorizontal: 20,
  },
  input: {
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
    borderColor: '#00268F',
    backgroundColor: "#16202C"
  },
  editImageButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#fff',
    padding: 5,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#00268F',
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
    backgroundColor: '#E5E7EB',
    borderRadius: 10,
    marginBottom: 15,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#00268F',
  },
  value: {
    fontSize: 18,
    color: '#333',
    flex: 1,
    marginLeft: 10,
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
  },
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
