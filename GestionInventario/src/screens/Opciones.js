import React from "react";
import { SafeAreaView, View, ScrollView, Image, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';

export default (props) => {
	
    const navigation = useNavigation();
	return (
		<SafeAreaView style={styles.container}>
			<ScrollView  style={styles.scrollView}>
			<TouchableOpacity onPress={() => navigation.navigate('Perfil')}>
				<View style={styles.row2}>
					<Image
					source={require('../../assets/CONFIG/perfil.png')}
					resizeMode="stretch"
					style={styles.image2}
					/>
					<Text style={styles.text2}>
					{"Perfil"}
					</Text>
				</View>
			</TouchableOpacity>
				<View style={styles.row3}>
					<Image
						source={require('../../assets/CONFIG/param.png')}
						resizeMode = {"stretch"}
						style={styles.image3}
					/>
					<Text style={styles.text2}>
						{"Parametros"}
					</Text>
				</View>
				<View style={styles.row4}>
					<Image
						source={require('../../assets/CONFIG/home.png')}
						resizeMode = {"stretch"}
						style={styles.image4}
					/>
					<Image
						source={require('../../assets/CONFIG/analis.png')}
						resizeMode = {"stretch"}
						style={styles.image5}
					/>
					<Image
						source={require('../../assets/CONFIG/inv.png')}
						resizeMode = {"stretch"}
						style={styles.image6}
					/>
					<Image
						source={require('../../assets/CONFIG/conf.png')}
						resizeMode = {"stretch"}
						style={styles.image7}
					/>
					<Image
						source={require('../../assets/CONFIG/usrr.png')}
						resizeMode = {"stretch"}
						style={styles.image8}
					/>
				</View>
			</ScrollView>
		</SafeAreaView>
	)
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#FFFFFF",
	},
	image: {
	    width: 30,
		height: 35,
        marginRight: 34,
	},
	image2: {
		width: 32,
		height: 31,
		marginRight: 27,
	},
	image3: {
		width: 40,
		height: 40,
		marginRight: 22,
	},
	image4: {
		width: 32,
		height: 36,
	},
	image5: {
		width: 36,
		height: 36,
	},
	image6: {
		width: 39,
		height: 40,
	},
	image7: {
		width: 40,
		height: 40,
	},
	image8: {
		width: 32,
		height: 31,
	},
	row: {
		width: 360,
		height: 58,
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: "#34495E",
		borderRadius: 30,
		paddingVertical: 4,
		paddingHorizontal: 11,
		marginBottom: 24,
	},
	row2: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: "#D8D8D8",
		borderRadius: 30,
		paddingVertical: 10,
		paddingHorizontal: 18,
		marginBottom: 18,
		marginHorizontal: 27,
	},
	row3: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: "#D8D8D8",
		borderRadius: 30,
		paddingVertical: 9,
		paddingHorizontal: 15,
		marginBottom: 408,
		marginHorizontal: 27,
	},
	row4: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		backgroundColor: "#D8D8D8",
		borderRadius: 25,
		paddingVertical: 8,
		paddingHorizontal: 26,
		marginHorizontal: 10,
	},
	scrollView: {
		flex: 1,
		backgroundColor: "#EDF1F1",
		paddingVertical: 67,
	},
	text: {
		color: "#FFFFFF",
		fontSize: 35,
		flex: 1,
	},
	text2: {
		color: "#000001",
		fontSize: 24,
		flex: 1,
	},
	view: {
		width: 50,
		backgroundColor: "#D8D8D8",
		borderRadius: 30,
		paddingHorizontal: 12,
		marginRight: 16,
	},
});