import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function ListaUsuarios() {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    // Fetch user data on component mount
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await fetch('http://192.168.1.10:8000/api/v1/usuarios/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (response.ok) {
        setUserData(data);  // Asume que 'data' es un array de usuarios
      } else {
        // Manejar errores
        console.error('Error al obtener los datos de usuarios:', data.error || 'No se pudo obtener los datos');
      }
    } catch (error) {
      console.error('Error al obtener los datos de usuarios:', error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Mapeo de usuarios */}
      {userData.length > 0 ? (
        userData.map((user) => (
          <View key={user.id} style={styles.userContainer}>
            <Text style={styles.userText}>ID: {user.id}</Text>
            <Text style={styles.userText}>Nombre: {user.nombre}</Text>
            <Text style={styles.userText}>Rol: {user.rol}</Text>
            <Text style={styles.userText}>Último login: {user.last_login}</Text>
          </View>
        ))
      ) : (
        <Text style={styles.noDataText}>No hay datos de usuarios disponibles</Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  userContainer: {
    backgroundColor: '#FFF',
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  userText: {
    fontSize: 16,
    color: '#333',
  },
  noDataText: {
    fontSize: 18,
    color: '#999',
    textAlign: 'center',
    marginTop: 20,
  },
});
