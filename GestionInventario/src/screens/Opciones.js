import React, {useContext, useEffect } from "react";
import { SafeAreaView, View, ScrollView, Image, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation} from '@react-navigation/native';
import { ThemeContext } from '../../ThemeContext';

export default (props) => {
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
		<SafeAreaView style={currentStyles.container}>
			<ScrollView  style={currentStyles.scrollView}>
			<TouchableOpacity onPress={() => navigation.navigate('Perfil')}>
				<View style={currentStyles.row2}>
					<Image
					source={require('../../assets/CONFIG/perfil.png')}
					resizeMode="stretch"
					style={currentStyles.image2}
					/>
					<Text style={currentStyles.text2}>
					{"Perfil"}
					</Text>
				</View>
			</TouchableOpacity>
			<TouchableOpacity onPress={toggleTheme}>
				<View style={currentStyles.row3}>
					<Image
						source={require('../../assets/CONFIG/param.png')}
						resizeMode = {"stretch"}
						style={currentStyles.image3}
					/>
					<Text style={currentStyles.text2}>
						{"Parametros"}
					</Text>
				</View>
				</TouchableOpacity>
				
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

const styles2 = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#0B1016",
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
		backgroundColor: "#16202C",
		borderRadius: 30,
		paddingVertical: 10,
		paddingHorizontal: 18,
		marginBottom: 18,
		marginHorizontal: 27,
		borderColor: '#009679',
		borderWidth: 1,    
	},
	row3: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: "#16202C",
		borderRadius: 30,
		paddingVertical: 9,
		paddingHorizontal: 15,
		marginBottom: 408,
		marginHorizontal: 27,
		borderColor: '#009679',
		borderWidth: 1,    
	},
	row4: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		backgroundColor: "#16202C",
		borderRadius: 25,
		paddingVertical: 8,
		paddingHorizontal: 26,
		marginHorizontal: 10,
		borderColor: '#009679',
		borderWidth: 1,    
	},
	scrollView: {
		flex: 1,
		backgroundColor: "#0B1016",
		paddingVertical: 67,
	},
	text: {
		color: "#FFFFFF",
		fontSize: 35,
		flex: 1,
	},
	text2: {
		color: "#506D8A",
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