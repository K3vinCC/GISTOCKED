import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, FlatList, Text } from 'react-native';
import axios from 'axios';

export default function App() {
  const [nombre, setNombre] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const fetchUsuarios = () => {
    axios.get('http://127.0.0.1:8000/api/usuarios/')
      .then(response => setUsuarios(response.data))
      .catch(error => console.error(error));
  };

  const addUsuario = () => {
    axios.post('http://127.0.0.1:8000/api/usuarios/', {
      nombre: nombre,
      contraseña: contraseña,
    })
    .then(() => {
      fetchUsuarios();
      setNombre('');
      setContraseña('');
    })
    .catch(error => console.error(error));
  };

  const deleteUsuario = (id) => {
    axios.delete(`http://127.0.0.1:8000/api/usuarios/${id}/`)
      .then(() => fetchUsuarios())
      .catch(error => console.error(error));
  };

  return (
    <View style={{ padding: 20 }}>
      <TextInput
        placeholder="Nombre"
        value={nombre}
        onChangeText={setNombre}
        style={{ borderWidth: 1, marginBottom: 10, padding: 8 }}
      />
      <TextInput
        placeholder="Contraseña"
        value={contraseña}
        onChangeText={setContraseña}
        secureTextEntry
        style={{ borderWidth: 1, marginBottom: 10, padding: 8 }}
      />
      <Button title="Agregar Usuario" onPress={addUsuario} />

      <FlatList
        data={usuarios}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={{ marginTop: 20 }}>
            <Text>{item.nombre}</Text>
            <Button title="Eliminar" onPress={() => deleteUsuario(item.id)} />
          </View>
        )}
      />
    </View>
  );
}
