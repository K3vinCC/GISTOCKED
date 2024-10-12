import React, { useState, useContext, useEffect} from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, StyleSheet, Button } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation} from '@react-navigation/native';
import { ThemeContext } from '../../ThemeContext';


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
  const { isDarkMode, toggleTheme} = useContext(ThemeContext);
  const navigation = useNavigation();

    useEffect(() => {
    navigation.setOptions({
    headerStyle: {
        backgroundColor: isDarkMode ? '#0B1016' : '#34495E',
    }, headerTintColor:  '#FFF',
    });
    }, [isDarkMode, navigation]);

    const currentStyles = isDarkMode ? styles2 : styles;

  return (
    <View style={currentStyles.container}>
      {/* Encabezado del perfil */}
      {/* <View style={currentStyles.header}>
        <TouchableOpacity style={currentStyles.backButton}>
          <AntDesign name="arrowleft" size={30} color="#00268F" />
        </TouchableOpacity>
        <Text style={currentStyles.headerText}>Perfil</Text>
      </View> */}

      {/* Imagen de perfil */}
      <View style={currentStyles.profileImageContainer}>

        <Image
          source={profileImage ? { uri: profileImage } : require('./assets/img/imgPerfil.png')}
          style={currentStyles.profileImage}
        />
        <TouchableOpacity style={currentStyles.editImageButton} onPress={pickImage}>
          <MaterialIcons name="photo-camera" size={24} color="#E17055" />
        </TouchableOpacity>
      </View>

      {/* Información del usuario */}
      <View style={currentStyles.infoContainer}>
        <View style={currentStyles.infoRow}>
          <Text style={currentStyles.label}>Nombre</Text>
          <Text style={currentStyles.value}>{name}</Text>
          <FontAwesome name="pencil" size={24} color="#E17055" />
        </View>
        <View style={currentStyles.infoRow}>
          <Text style={currentStyles.label}>Celular</Text>
          <Text style={currentStyles.value}>{phone}</Text>
          <FontAwesome name="pencil" size={24} color="#E17055" />
        </View>
        <View style={currentStyles.infoRow}>
          <Text style={currentStyles.label}>Correo</Text>
          <Text style={currentStyles.value}>{email}</Text>
          <FontAwesome name="pencil" size={24} color="#E17055" />
        </View>
      </View>

      {/* Barra de navegación inferior */}
      <View style={currentStyles.navBar}>
        <TouchableOpacity>
          <AntDesign name="home" size={30} color="#009679" />
        </TouchableOpacity>
        <TouchableOpacity>
          <AntDesign name="linechart" size={30} color="#009679" />
        </TouchableOpacity>
        <TouchableOpacity>
          <AntDesign name="shoppingcart" size={30} color="#009679" />
        </TouchableOpacity>
        <TouchableOpacity>
          <AntDesign name="setting" size={30} color="#009679" />
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
