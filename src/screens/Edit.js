import { View, Image, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { MultipleSelectList } from 'react-native-dropdown-select-list';
import React, { useState } from 'react';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { database } from '../config/fb'
import { collection, addDoc, updateDoc, doc } from 'firebase/firestore'
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import InputImage from '../components/InputImage';

export default function Edit({ route }) {
  const { id, nombre, imagenes, marca, cantidad, categoria, detalles,observacion} = route.params;
  
  const [selected, setSelected] = useState(categoria || []);
  const [formData, setFormData] = useState({
    nombre,
    marca,
    cantidad,
    detalles,
    observacion: observacion,
    imagen: imagenes.principal
  });

  const data = [
    { key: '1', value: 'Externo', disabled: true },
    { key: '2', value: 'Periferico de entrada' },
    { key: '3', value: 'Periferico de salida' },
    { key: '4', value: 'Adaptador' },
    { key: '5', value: 'Cable' },
    { key: '6', value: 'Interno', disabled: true },
    { key: '7', value: 'Almacenamiento' },
    { key: '8', value: 'Red' },
  ];

  const handleSubmit = async () => {
  try {
    const storage = getStorage();
    let imageUrl = formData.imagen;

    // Si la imagen fue cambiada localmente (URI local), súbela
    if (imageUrl && imageUrl.startsWith('file://')) {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const filename = `productos/${Date.now()}_imagen.jpg`;
      const storageRef = ref(storage, filename);
      await uploadBytes(storageRef, blob);
      imageUrl = await getDownloadURL(storageRef);
    }
    //productos
    const productoRef = doc(database, 'prueba', id); // referencia al documento a actualizar

    await updateDoc(productoRef, {
      nombre: formData.nombre,
      marca: formData.marca,
      cantidad: formData.cantidad,
      categoria: selected,
      detalles: formData.detalles,
      observacion: formData.observacion,
      imagenes: {
        principal: imageUrl,
      },
      fechaActualizacion: new Date(), // opcional, para tracking
    });

    alert('Producto actualizado correctamente');
  } catch (error) {
    console.error('Error al actualizar producto:', error);
    alert('Hubo un error al actualizar el producto.');
  }
};


  const handleInputChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  // const handleSubmit = () => {
  //   // Aquí iría la lógica para guardar los cambios




  //   console.log('Datos actualizados:', formData);
  //   alert('Producto actualizado correctamente');
  // };

  return (
    <View style={styles.container}>
      <ScrollView 
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Editar Producto</Text>
        
        {/* Sección de imagen */}
       <InputImage
            onImageUpload={(uri) =>
              setFormData((prev) => ({ ...prev, imagen: uri }))
            }
          />


        {/* Campos del formulario */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>Nombre del producto</Text>
          <TextInput
            style={styles.input}
            value={formData.nombre}
            onChangeText={(text) => handleInputChange('nombre', text)}
            placeholder="Ingrese el nombre"
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Marca</Text>
          <TextInput
            style={styles.input}
            value={formData.marca}
            onChangeText={(text) => handleInputChange('marca', text)}
            placeholder="Ingrese la marca"
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Cantidad</Text>
          <TextInput
            style={styles.input}
            value={formData.cantidad}
            onChangeText={(text) => handleInputChange('cantidad', text)}
            placeholder="Ingrese la cantidad"
            keyboardType="numeric"
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Categorías</Text>
          <MultipleSelectList
          initialSelectedItems={categoria || []}
            setSelected={setSelected}
            data={data}
            save="value"
            defaultOptions={categoria}
            label="Categorías"
            placeholder="Seleccione categorías"
            boxStyles={styles.selectList}
            inputStyles={styles.selectListInput}
            dropdownStyles={styles.selectListDropdown}
            badgeStyles={styles.badge}
            badgeTextStyles={styles.badgeText}
            defaultSelected={categoria || []}
          />
        </View>

        <View style={styles.sectionDivider}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>Detalles</Text>
          <View style={styles.dividerLine} />
        </View>

        <TextInput
          style={styles.textArea}
          multiline
          numberOfLines={4}
          value={formData.detalles}
          onChangeText={(text) => handleInputChange('detalles', text)}
          placeholder="Descripción detallada del producto..."
        />

        <View style={styles.sectionDivider}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>Observaciones</Text>
          <View style={styles.dividerLine} />
        </View>

        <TextInput
          style={styles.textArea}
          multiline
          numberOfLines={4}
          value={formData.observacion}
          onChangeText={(text) => handleInputChange('observacion', text)}
          placeholder="Notas adicionales sobre el producto..."
        />

        <TouchableOpacity 
          style={styles.submitButton}
          onPress={handleSubmit}
        >
          <Text style={styles.submitButtonText}>GUARDAR CAMBIOS</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingBottom: 40,
    paddingTop: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1268c4',
    textAlign: 'center',
    marginBottom: 25,
    fontFamily: 'Roboto',
  },
  imageSection: {
    alignItems: 'center',
    marginBottom: 25,
  },
  image: {
    width: 280,
    height: 210,
    borderRadius: 12,
    resizeMode: 'contain',
    backgroundColor: '#f0f0f0',
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  imagePlaceholder: {
    width: 280,
    height: 210,
    borderRadius: 12,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  changeImageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1268c4',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    elevation: 3,
  },
  changeImageText: {
    color: '#fff',
    marginLeft: 8,
    fontWeight: '600',
    fontSize: 16,
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: '#444',
    marginBottom: 8,
    fontWeight: '500',
  },
  input: {
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 8,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    elevation: 1,
  },
  selectList: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingVertical: 12,
    elevation: 1,
  },
  selectListInput: {
    fontSize: 16,
  },
  selectListDropdown: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginTop: 5,
    elevation: 3,
  },
  badge: {
    backgroundColor: '#1268c4',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginRight: 6,
    marginBottom: 6,
  },
  badgeText: {
    color: '#fff',
    fontSize: 14,
  },
  sectionDivider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#ddd',
  },
  dividerText: {
    width: 100,
    textAlign: 'center',
    color: '#666',
    fontSize: 16,
    fontWeight: '500',
  },
  textArea: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    minHeight: 120,
    textAlignVertical: 'top',
    elevation: 1,
    marginBottom: 20,
  },
  submitButton: {
    backgroundColor: '#1268c4',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    elevation: 3,
    marginTop: 10,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});