import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, StyleSheet, Button } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

export default function ProfileScreen() {
  // Estado inicial para los datos de perfil y la imagen de perfil
  const [profileImage, setProfileImage] = useState(null);
  const [name, setName] = useState('Usuario1');
  const [phone, setPhone] = useState('+569 8765 4321');
  const [email, setEmail] = useState('Unimentor@gmail.com');

  // Solicitar permisos para acceder a la galería
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

  // Función para seleccionar una imagen de la galería
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

  // Comentario: Aquí es donde puedes llamar a la API en el futuro para obtener datos dinámicos
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch('API_URL');
  //       const data = await response.json();
  //       setName(data.name);
  //       setPhone(data.phone);
  //       setEmail(data.email);
  //       setProfileImage(data.profileImage);
  //     } catch (error) {
  //       console.error('Error fetching profile data:', error);
  //     }
  //   };
  //   fetchData();
  // }, []);

  return (
    <View style={styles.container}>
      {/* Encabezado del perfil */}
      {/* <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <AntDesign name="arrowleft" size={30} color="#00268F" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Perfil</Text>
      </View> */}

      {/* Imagen de perfil */}
      <View style={styles.profileImageContainer}>
        <Image
          source={profileImage ? { uri: profileImage } : require('./assets/img/imgPerfil.png')}
          style={styles.profileImage}
        />
        <TouchableOpacity style={styles.editImageButton} onPress={pickImage}>
          <MaterialIcons name="photo-camera" size={24} color="#00268F" />
        </TouchableOpacity>
      </View>

      {/* Información del usuario */}
      <View style={styles.infoContainer}>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Nombre</Text>
          <Text style={styles.value}>{name}</Text>
          <FontAwesome name="pencil" size={24} color="#00268F" />
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Celular</Text>
          <Text style={styles.value}>{phone}</Text>
          <FontAwesome name="pencil" size={24} color="#00268F" />
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Correo</Text>
          <Text style={styles.value}>{email}</Text>
          <FontAwesome name="pencil" size={24} color="#00268F" />
        </View>
      </View>

      {/* Barra de navegación inferior */}
      <View style={styles.navBar}>
        <TouchableOpacity>
          <AntDesign name="home" size={30} color="#00268F" />
        </TouchableOpacity>
        <TouchableOpacity>
          <AntDesign name="linechart" size={30} color="#00268F" />
        </TouchableOpacity>
        <TouchableOpacity>
          <AntDesign name="shoppingcart" size={30} color="#00268F" />
        </TouchableOpacity>
        <TouchableOpacity>
          <AntDesign name="setting" size={30} color="#00268F" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F6FB',
    paddingHorizontal: 20,
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
