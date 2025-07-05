import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import React, { useState } from 'react';

export default function Show({ route }) {
  const { id, nombre, imagenes, marca, cantidad } = route.params;
  let { detalles } = route.params;
  let { categoria } = route.params;
  let {observacion}=route.params

  if (!detalles || detalles.trim() === "") {
    detalles = "Sin detalles por ahora";
  }

  return (
    <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.title}>📦 Detalles del Producto</Text>

      <Image
        source={{ uri: imagenes?.principal }}
        style={styles.image}
      />

      <View style={styles.card}>
        <Text style={styles.label}>Nombre:</Text>
        <Text style={styles.value}>{nombre}</Text>

        <Text style={styles.label}>Marca:</Text>
        <Text style={styles.value}>{marca}</Text>

        <Text style={styles.label}>Cantidad:</Text>
        <Text style={styles.value}>{cantidad}</Text>

        <Text style={styles.label}>Categoría:</Text>
        <Text style={styles.value}>{categoria}</Text>

        <Text style={styles.label}>Detalles:</Text>
        <Text style={styles.details}>{detalles}</Text>

        <Text style={styles.label}>Observacion:</Text>
        <Text style={styles.details}> {observacion} </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f4f6f8',
    flexGrow: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
    color: '#333',
  },
  image: {
    width: 260,
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  card: {
    backgroundColor: '#fff',
    padding: 20,
    width: '100%',
    borderRadius: 10,
    elevation: 3, // sombra para Android
    shadowColor: '#000', // sombra para iOS
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#555',
    marginTop: 10,
  },
  value: {
    fontSize: 18,
    color: '#222',
    textTransform: 'capitalize',
  },
  details: {
    fontSize: 16,
    color: '#444',
    marginTop: 5,
  },
});
