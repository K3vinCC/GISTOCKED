import React from "react";
import { SafeAreaView, View, ScrollView, Image, Text, StyleSheet } from "react-native";
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default (props) => {
    const navigation = useNavigation();

	const userRole = 'admin'; 
	// const userRole = 'user'; 
	


    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollView}>
                <View style={styles.row2}>
                    <View style={styles.column}>
                        <TouchableOpacity onPress={() => navigation.navigate('inventario')}>
                            <Image
                                source={require('../../assets/INICIO/ajustes.png')}
                                resizeMode={"stretch"}
                                style={styles.image3}
                            />
                            <Text style={styles.text2}>{"Inventario"}</Text>
                            <Text style={styles.text3}>{"Edita o inspecciona tu inventario"}</Text>
                        </TouchableOpacity>
                    </View>
					<TouchableOpacity onPress={() => navigation.navigate('ZonaVenta')}>
						<View style={styles.column}>
							<Image
								source={require('../../assets/INICIO/venta.png')}
								resizeMode={"stretch"}
								style={styles.image3}
							/>
							<Text style={styles.text4}>{"Ventas"}</Text>
							<Text style={styles.text3}>{"Genera una nueva venta de productos"}</Text>
						</View>
					</TouchableOpacity>
                </View>

                <View style={styles.row2}>
                    <View style={styles.column}>
                        <Image
                            source={require('../../assets/INICIO/analisis.png')}
                            resizeMode={"stretch"}
                            style={styles.image3}
                        />
                        <Text style={styles.text6}>{"Análisis de ventas"}</Text>
                        <Text style={styles.text3}>{"Inspecciona los gráficos de ventas de productos"}</Text>
                    </View>

                    {/* Solo mostrar esta sección si el usuario es administrador */}
                    {userRole === 'admin' && (
                        <View style={styles.column}>
                            <TouchableOpacity onPress={() => navigation.navigate('AgregarUsuarios')}>
                                <Image
                                    source={require('../../assets/INICIO/user.png')}
                                    resizeMode={"stretch"}
                                    style={styles.image3}
                                />
                                <Text style={styles.text8}>{"Usuarios"}</Text>
                                <Text style={styles.text3}>{"Añade, edita o elimina usuarios"}</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </View>

                <View style={styles.column3}>
                    <TouchableOpacity onPress={() => navigation.navigate('Opciones')}>
                        <Image
                            source={require('../../assets/INICIO/ajustes.png')}
                            resizeMode={"stretch"}
                            style={styles.image3}
                        />
                        <Text style={styles.text10}>{"Ajustes"}</Text>
                        <Text style={styles.text3}>{"Configura tus preferencias de la app o tu usuario"}</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#FFFFFF",
	},
	column: {
		width: 155,
		height: 180,
		backgroundColor: "#D8D8D8",
		borderRadius: 20,
		paddingTop: 22,
		paddingBottom: 35,
	},
	column2: {
		width: 155,
		height: 180,
		borderColor: "#5E27FD",
		borderWidth: 1,
		paddingVertical: 22,
	},
	column3: {
		width: 155,
		height: 180,
		backgroundColor: "#D8D8D8",
		borderRadius: 20,
		paddingVertical: 22,
		marginBottom: 34,
		marginHorizontal: 25,
	},
	image: {
		width: 18,
		height: 16,
	},
	image2: {
		width: 20,
		height: 21,
	},
	image3: {
		height: 41,
		width: 41,
		marginBottom: 14,
		marginHorizontal: 57,
	},
	image4: {
		height: 41,
		width: 41,
		marginBottom: 13,
		marginHorizontal: 57,
	},
	image5: {
		width: 20,
		height: 18,
	},
	image6: {
		width: 20,
		height: 16,
	},
	image7: {
		width: 18,
		height: 18,
	},
	image8: {
		width: 20,
		height: 20,
	},
	row: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: 48,
		marginHorizontal: 30,
	},
	row2: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: 25,
		marginHorizontal: 23,
	},
	row3: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginHorizontal: 56,
	},
	scrollView: {
		flex: 1,
		backgroundColor: "#EDF1F1",
		paddingVertical: 42,
	},
	text: {
		color: "#1E1E1E",
		fontSize: 20,
	},
	text2: {
		color: "#000000",
		fontSize: 20,
		marginBottom: 20,
		marginLeft: 33,
	},
	text3: {
		color: "#34495E",
		fontSize: 14,
		marginHorizontal: 17,
		marginBottom: 15,
		width: 134,
	},
	text4: {
		color: "#000000",
		fontSize: 20,
		marginBottom: 20,
		marginLeft: 47,
	},
	text6: {
		color: "#000000",
		fontSize: 20,
		marginBottom: 1,
		marginHorizontal: 29,
	},
	text8: {
		color: "#000000",
		fontSize: 20,
		marginBottom: 20,
		marginLeft: 38,
	},
	text10: {
		color: "#000000",
		fontSize: 20,
		marginBottom: 20,
		marginLeft: 44,
	},
});