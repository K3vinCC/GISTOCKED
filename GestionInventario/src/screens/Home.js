import React from "react";
import { SafeAreaView, View, ScrollView, Image, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';

export default (props) => {
    const navigation = useNavigation();

	const userRole = 'admin'; 
	// const userRole = 'user'; 
	
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollView}>
                <View style={styles.row}>
                    <View style={styles.column}>
                        <TouchableOpacity onPress={() => navigation.navigate('inventario')}>
                            <Image
                                source={require('../../assets/INICIO/ajustes.png')}
                                resizeMode={"stretch"}
                                style={styles.image}
                            />
                            <Text style={styles.text}>{"Inventario"}</Text>
                            <Text style={styles.subText}>{"Edita o inspecciona tu inventario"}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.column}>
                        <TouchableOpacity onPress={() => navigation.navigate('ZonaVenta')}>
                            <Image
                                source={require('../../assets/INICIO/venta.png')}
                                resizeMode={"stretch"}
                                style={styles.image}
                            />
                            <Text style={styles.text}>{"Ventas"}</Text>
                            <Text style={styles.subText}>{"Genera una nueva venta de productos"}</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.row}>
                    <View style={styles.column}>
                        <Image
                            source={require('../../assets/INICIO/analisis.png')}
                            resizeMode={"stretch"}
                            style={styles.image}
                        />
                        <Text style={styles.text}>{"Análisis de ventas"}</Text>
                        <Text style={styles.subText}>{"Inspecciona los gráficos de ventas de productos"}</Text>
                    </View>

                    {/* Solo mostrar esta sección si el usuario es administrador */}
                    {userRole === 'admin' && (
                        <View style={styles.column}>
                            <TouchableOpacity onPress={() => navigation.navigate('AgregarUsuarios')}>
                                <Image
                                    source={require('../../assets/INICIO/user.png')}
                                    resizeMode={"stretch"}
                                    style={styles.image}
                                />
                                <Text style={styles.text}>{"Usuarios"}</Text>
                                <Text style={styles.subText}>{"Añade, edita o elimina usuarios"}</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </View>

                <View style={styles.singleColumn}>
                    <TouchableOpacity onPress={() => navigation.navigate('Opciones')}>
                        <Image
                            source={require('../../assets/INICIO/ajustes.png')}
                            resizeMode={"stretch"}
                            style={styles.image}
                        />
                        <Text style={styles.text}>{"Ajustes"}</Text>
                        <Text style={styles.subText}>{"Configura tus preferencias de la app o tu usuario"}</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.singleColumn}>
                    <TouchableOpacity onPress={() => navigation.navigate('ListaUsuarios')}>
                        <Image
                            source={require('../../assets/INICIO/user.png')}
                            resizeMode={"stretch"}
                            style={styles.image}
                        />
                        <Text style={styles.text}>{"Lista de Usuarios"}</Text>
                        <Text style={styles.subText}>{"Visualiza y administra la lista de usuarios"}</Text>
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
    scrollView: {
        flex: 1,
        backgroundColor: "#EDF1F1",
        paddingVertical: 20,
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 20,
        paddingHorizontal: 20,
    },
    column: {
        width: 155,
        height: 180,
        backgroundColor: "#D8D8D8",
        borderRadius: 20,
        padding: 20,
        justifyContent: "center",
        alignItems: "center",
    },
    singleColumn: {
        width: 155,
        height: 180,
        backgroundColor: "#D8D8D8",
        borderRadius: 20,
        padding: 20,
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 10,
        alignSelf: "center",
    },
    image: {
        height: 41,
        width: 41,
        marginBottom: 14,
    },
    text: {
        color: "#000000",
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    subText: {
        color: "#34495E",
        fontSize: 14,
        textAlign: "center",
    },
});
