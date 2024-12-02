import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useUser } from '../components/UserContext'; // Importa el hook de contexto

export default function ProfileScreen() {
  const { user } = useUser(); // Accede al contexto de usuario

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Perfil de Usuario</Text>

      {/* Mostrar los datos del usuario */}
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Código de Vendedor: </Text>
        <Text style={styles.value}>{user.codigo_vendedor}</Text>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.label}>Email: </Text>
        <Text style={styles.value}>{user.email}</Text>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.label}>Nombre de la Empresa: </Text>
        <Text style={styles.value}>{user.nombre_empresa}</Text>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.label}>ID Empresa: </Text>
        <Text style={styles.value}>{user.id_empresa}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  infoContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
  },
  value: {
    fontSize: 18,
    flex: 2,
  },
});
