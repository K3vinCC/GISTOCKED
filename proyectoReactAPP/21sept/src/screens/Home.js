import React, { useContext } from "react";
import { useEffect } from 'react';
import { SafeAreaView, View, ScrollView, Image, Text, StyleSheet, TouchableOpacity, Dimensions, ActivityIndicator } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { ThemeContext } from '../../ThemeContext';
import * as SplashScreen from 'expo-splash-screen'; // Importamos SplashScreen
import { useFonts } from 'expo-font';

const { width } = Dimensions.get('window');
SplashScreen.preventAutoHideAsync();
export default (props) => {
  const userRole = 'admin'; 
  const { isDarkMode } = useContext(ThemeContext);
  const navigation = useNavigation();

  // useFonts se debe llamar de manera incondicional
  const [fontsLoaded] = useFonts({
    'Roboto-Medium': require('../../assets/fonts/Roboto-Medium.ttf'),
    'Roboto-Bold': require('../../assets/fonts/Roboto-Bold.ttf'),
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



  useEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: isDarkMode ? '#0B1016' : '#34495E',
      }, 
      headerTintColor: isDarkMode ? '#0B1016' : '#34495E',
    });
  }, [isDarkMode, navigation]);

  const currentStyles = isDarkMode ? styles2 : styles;


  return (
    <SafeAreaView style={currentStyles.container}>
      <ScrollView contentContainerStyle={currentStyles.scrollView}>
        <View style={currentStyles.row2}>
          <TouchableOpacity onPress={() => navigation.navigate('Inventario')}>
            <View style={currentStyles.column}>
              <Image
                source={require('../../assets/INICIO/inventario.png')}
                resizeMode="contain"
                style={currentStyles.image}
              />
              <Text style={currentStyles.text2}>
                {"Inventario"}
              </Text>
              <Text style={currentStyles.text3}>
                {"Edita o inspecciona tu inventario"}
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Ventas')}>
          <View style={currentStyles.column}>
            <Image
              source={require('../../assets/INICIO/venta.png')}
              resizeMode="contain"
              style={currentStyles.image}
            />
            <Text style={currentStyles.text2}>
              {"Ventas"}
            </Text>
            <Text style={currentStyles.text3}>
              {"Genera una nueva venta de productos"}
            </Text>
          </View>
          </TouchableOpacity>
        </View>
			<View style={currentStyles.row2}>
      <TouchableOpacity onPress={() => navigation.navigate('Ainventario')}>
          	<View style={currentStyles.column}>
		  	
			<Image
              source={require('../../assets/INICIO/analisis.png')}
              resizeMode="contain"
              style={currentStyles.image}
            />
            <Text style={currentStyles.text2}>
              {"Análisis de ventas"}
            </Text>
            <Text style={currentStyles.text3}>
              {"Inspecciona los gráficos de ventas de productos"}
            </Text>
			
          </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Opciones')}>
            <View style={currentStyles.column}>
              <Image
                source={require('../../assets/INICIO/ajustes.png')}
                resizeMode="contain"
                style={currentStyles.image}
              />
              <Text style={currentStyles.text2}>
                {"Ajustes"}
              </Text>
              <Text style={currentStyles.text3}>
                {"Configura tus preferencias de la app o tu usuario"}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        
        <View style={currentStyles.row2}>
          {userRole === 'admin' && (
                      <TouchableOpacity onPress={() => navigation.navigate('AgregarUsuarios')}>
                        <View style={currentStyles.column}>
                            
                                <Image
                                    source={require('../../assets/INICIO/user.png')}
                                    resizeMode="contain"
                                    style={currentStyles.image}
                                />
                                <Text style={currentStyles.text2}>{"Usuarios"}</Text>
                                <Text style={currentStyles.text3}>{"Añade, edita o elimina usuarios"}</Text>
                            
                        </View>
                        </TouchableOpacity>
                    )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  row2: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 10,
  },
  column: {
    width: width * 0.4, // Ajusta al 40% del ancho de la pantalla
    height: width * 0.55, // Incrementa la altura para más espacio vertical
    backgroundColor: "#D8D8D8",
    borderRadius: 20,
    padding: 10,
    justifyContent: "flex-start", // Alinea todo el contenido al inicio
    alignItems: "center",
  },
  image: {
    width: "50%", // Ajusta la imagen al 50% del ancho del contenedor
    height: "50%", // Ajusta la altura proporcionalmente
	marginTop: -10,
	marginBottom: -10,// Margen superior para alinear las imágenes
  },
  image2: {
    width: "50%", // Ajusta la imagen al 50% del ancho del contenedor
    height: "50%", // Ajusta la altura proporcionalmente
 marginBottom: -10,// Margen superior para alinear las imágenes
  },
  text2: {
    fontFamily: "Roboto-Bold",
    color: "#000000",
    fontSize: 18,
    textAlign: "center", // Asegura que el texto principal esté alineado en todos
  },
  text4: {
    fontFamily: "Roboto-Medium",
    color: "#000000",
    fontSize: 18,
    textAlign: "center", // Asegura que el texto principal esté alineado en todos
  },
  text3: {
    fontFamily: "Roboto-Medium",
    color: "#34495E",
    fontSize: 14,
    textAlign: "center",
 // Espacio debajo del texto principal
  },
  scrollView: {
    paddingVertical: 20,
  },
});

const styles2 = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0B1016",
  },
  row2: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 10,
  },
  column: {
    width: width * 0.4, // Ajusta al 40% del ancho de la pantalla
    height: width * 0.55, // Incrementa la altura para más espacio vertical
    backgroundColor: "#16202C",
    borderRadius: 20,
    padding: 10,
    justifyContent: "flex-start", // Alinea todo el contenido al inicio
    alignItems: "center",
    borderColor: '#009679',
    borderWidth: 1,            // Thickness of the outer line (border)
    borderRadius: 10,          // Optional: Adds rounded corners
  },
  image: {
    width: "50%", // Ajusta la imagen al 50% del ancho del contenedor
    height: "50%", // Ajusta la altura proporcionalmente
	marginTop: -10,
	marginBottom: -10,// Margen superior para alinear las imágenes
  },
  image2: {
    width: "50%", // Ajusta la imagen al 50% del ancho del contenedor
    height: "50%", // Ajusta la altura proporcionalmente
 marginBottom: -10,// Margen superior para alinear las imágenes
  },
  text2: {
    fontFamily: "Roboto-Bold",
    color: "#506D8A",
    fontSize: 18,
    textAlign: "center", // Asegura que el texto principal esté alineado en todos
  },
  text4: {
    fontFamily: "Roboto-Medium",
    color: "#000000",
    fontSize: 18,
    textAlign: "center", // Asegura que el texto principal esté alineado en todos
  },
  text3: {
    fontFamily: "Roboto-Medium",
    color: "#34495E",
    fontSize: 14,
    textAlign: "center",
 // Espacio debajo del texto principal
  },
  scrollView: {
    paddingVertical: 20,
  },
});