// components/InputImage.js
import React from 'react';
import { View, TouchableOpacity, Text, Image, Alert, ActivityIndicator } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { storage } from '../config/fb';

const InputImage = ({ onImageUpload }) => {
  const [image, setImage] = React.useState(null);
  const [uploading, setUploading] = React.useState(false);
  const [progress, setProgress] = React.useState(0);

  const pickImage = async () => {
    // Solicitar permisos
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permisos requeridos', 'Necesitamos acceso a tu galería para seleccionar imágenes');
      return;
    }

    // Abrir selector de imágenes
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      uploadImage(result.assets[0].uri);
    }
  };

  const uploadImage = async (uri) => {
    try {
      setUploading(true);
      
      // Convertir la URI a blob
      const response = await fetch(uri);
      const blob = await response.blob();
      
      // Crear referencia de almacenamiento con nombre único
      const storageRef = ref(storage, `productos/${Date.now()}`);
      
      // Subir el archivo
      const uploadTask = uploadBytesResumable(storageRef, blob);

      uploadTask.on('state_changed',
        (snapshot) => {
          // Progreso de la subida
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgress(progress);
        },
        (error) => {
          // Manejar errores
          console.error("Error uploading image: ", error);
          Alert.alert("Error", "No se pudo subir la imagen");
          setUploading(false);
        },
        async () => {
          // Subida completada - obtener URL
          try {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            setUploading(false);
            
            // Llamar a la función de callback con la URL
            if (onImageUpload) {
              onImageUpload(downloadURL);
            }
          } catch (error) {
            console.error("Error getting download URL: ", error);
            setUploading(false);
          }
        }
      );
    } catch (error) {
      console.error("Error: ", error);
      setUploading(false);
    }
  };

  return (
    <View style={{ alignItems: 'center' }}>
      <TouchableOpacity 
        onPress={pickImage}
        style={{
          backgroundColor: '#1268c4',
          padding: 10,
          borderRadius: 5,
          marginTop: 10
        }}
        disabled={uploading}
      >
        <Text style={{ color: 'white', textAlign: 'center' }}>
          {uploading ? `Subiendo... ${Math.round(progress)}%` : 'Seleccionar Imagen'}
        </Text>
      </TouchableOpacity>

      {uploading && <ActivityIndicator style={{ marginTop: 10 }} />}

      {image && !uploading && (
        <Image
          source={{ uri: image }}
          style={{ 
            width: 150, 
            height: 150, 
            marginTop: 15,
            borderRadius: 5,
            borderWidth: 1,
            borderColor: '#ddd'
          }}
        />
      )}
    </View>
  );
};

export default InputImage;