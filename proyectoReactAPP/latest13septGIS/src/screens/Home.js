import React, { useContext } from "react";
import { SafeAreaView, View, ScrollView, Image, Text, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { ThemeContext } from '../../ThemeContext';

// Obtener las dimensiones de la pantalla
const { width } = Dimensions.get('window');

export default (props) => {
  const { isDarkMode } = useContext(ThemeContext);
  const navigation = useNavigation();

  return (
    <SafeAreaView style={isDarkMode ? styles2.container : styles.container}>
      <ScrollView contentContainerStyle={isDarkMode ? styles2.scrollView : styles.scrollView}>
        <View style={isDarkMode ? styles2.row2 : styles.row2}>
          <TouchableOpacity onPress={() => navigation.navigate('Inicio1')}>
            <View style={isDarkMode ? styles2.column : styles.column}>
              <Image
                source={require('../../assets/images/INICIO/inventario.png')}
                resizeMode="contain"
                style={isDarkMode ? styles2.image : styles.image}
              />
              <Text style={isDarkMode ? styles2.text2 : styles.text2}>
                {"Inventario"}
              </Text>
              <Text style={isDarkMode ? styles2.text3 : styles.text3}>
                {"Edita o inspecciona tu inventario"}
              </Text>
            </View>
          </TouchableOpacity>
          <View style={isDarkMode ? styles2.column : styles.column}>
            <Image
              source={require('../../assets/images/INICIO/venta.png')}
              resizeMode="contain"
              style={isDarkMode ? styles2.image : styles.image}
            />
            <Text style={isDarkMode ? styles2.text2 : styles.text2}>
              {"Ventas"}
            </Text>
            <Text style={isDarkMode ? styles2.text3 : styles.text3}>
              {"Genera una nueva venta de productos"}
            </Text>
          </View>
        </View>

        <View style={isDarkMode ? styles2.row2 : styles.row2}>
          <View style={isDarkMode ? styles2.column : styles.column}>
            <Image
              source={require('../../assets/images/INICIO/analisis.png')}
              resizeMode="contain"
              style={isDarkMode ? styles2.image : styles.image}
            />
            <Text style={isDarkMode ? styles2.text2 : styles.text2}>
              {"Análisis de ventas"}
            </Text>
            <Text style={isDarkMode ? styles2.text3 : styles.text3}>
              {"Inspecciona los gráficos de ventas de productos"}
            </Text>
          </View>
          <View style={isDarkMode ? styles2.column : styles.column}>
            <Image
              source={require('../../assets/images/INICIO/user.png')}
              resizeMode="contain"
              style={isDarkMode ? styles2.image : styles.image}
            />
            <Text style={isDarkMode ? styles2.text2 : styles.text2}>
              {"Usuarios"}
            </Text>
            <Text style={isDarkMode ? styles2.text3 : styles.text3}>
              {"Añade, edita o elimina usuarios"}
            </Text>
          </View>
        </View>
        
        <View style={isDarkMode ? styles2.row2 : styles.row2}>
          <TouchableOpacity onPress={() => navigation.navigate('Opciones')}>
            <View style={isDarkMode ? styles2.column : styles.column}>
              <Image
                source={require('../../assets/images/INICIO/ajustes.png')}
                resizeMode="contain"
                style={isDarkMode ? styles2.image : styles.image}
              />
              <Text style={isDarkMode ? styles2.text2 : styles.text2}>
                {"Ajustes"}
              </Text>
              <Text style={isDarkMode ? styles2.text3 : styles.text3}>
                {"Configura tus preferencias de la app o tu usuario"}
              </Text>
            </View>
          </TouchableOpacity>
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
    color: "#000000",
    fontSize: 18,
    textAlign: "center", // Asegura que el texto principal esté alineado en todos
  },
  text4: {
    color: "#000000",
    fontSize: 18,
    textAlign: "center", // Asegura que el texto principal esté alineado en todos
  },
  text3: {
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
    backgroundColor: "#000000",
  },
  row2: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 20,
  },
  column: {
    width: width * 0.4, 
    height: width * 0.55, 
    backgroundColor: "#D8D8D8",
    borderRadius: 20,
    padding: 10,
    justifyContent: "flex-start", 
    alignItems: "center",
  },
  image: {
    width: "50%", 
    height: "50%", 
    marginBottom: 10,
    marginTop: 10, 
  },
  text2: {
    color: "#FFFFFF",
    fontSize: 18,
    textAlign: "center",
    marginTop: 10, 
  },
  text3: {
    color: "#B0B0B0",
    fontSize: 14,
    textAlign: "center",
    marginTop: 5, 
  },
  scrollView: {
    paddingVertical: 20,
  },
});
