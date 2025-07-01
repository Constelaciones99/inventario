import { View, Text, ScrollView, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native'
import { MultipleSelectList } from 'react-native-dropdown-select-list'
import { useNavigation } from '@react-navigation/native'
import { database } from '../config/fb'
import { collection, addDoc } from 'firebase/firestore'
import React from 'react'

import InputImage from './../components/InputImage'
//prueba
export default function Add() {
    const [selected, setSelected] = React.useState([]);

    const navigation = useNavigation()

    const [item, setItem] = React.useState({
        nombre: 'sin nombre',
        marca: 'sin marca',
        cantidad: 0,
        categoria: ["sin categoria"],
        observacion: 'Sin observaciones',
        detalles: 'sin detalles', 
        fecha: new Date(),
        imagenes: {
            'otras': [],
            'principal': ''
        }
    })

    const data = [
        {key: '1', value: 'Externo', disabled: true},
        {key: '2', value: 'Periferico de entrada'},
        {key: '3', value: 'Periferico de salida'},
        {key: '4', value: 'Adaptador'},
        {key: '5', value: 'Cable'},
        {key: '6', value: 'Interno', disabled: true},
        {key: '7', value: 'Almacenamiento'},
        {key: '8', value: 'Red'},
    ]

     const handleImageUpload = (imageUrl) => {
        setItem(prevItem => ({
            ...prevItem,
            imagenes: {
                ...prevItem.imagenes,
                principal: imageUrl
            }
        }));
    };

    const guardar = async (e) => {
        
        
        alert(JSON.stringify(item));

        try {
            const docRef = await addDoc(collection(database, 'prueba'), item)
            //navigation.goBack()
            Alert.alert("Éxito", "Producto guardado correctamente.");
            //navigation.navigate('Home')
        } catch (error) {
            console.error("Error al guardar en Firebase:", error);
            Alert.alert("Error", "No se pudo guardar el producto.");
        }
    }

    return (
        <View style={{ flex: 1 }}>
            <ScrollView 
                contentContainerStyle={styles.scrollContainer}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
            >
                <Text style={styles.titulo}>Agregar nuevo producto</Text>
                
                <View style={styles.contenidoPrimero}>
                    <Text style={{ fontSize: 70, textAlign: 'center' }}>📷</Text>
                    <InputImage onImageUpload={handleImageUpload} />
                </View>
                
                <TextInput 
                    placeholder='Nombre' 
                    style={styles.input} 
                    onChangeText={(nomProd) => setItem({...item, nombre: nomProd})}
                />
                
                <TextInput 
                    placeholder='Marca' 
                    style={styles.input} 
                    onChangeText={(marcProd) => setItem({...item, marca: marcProd})}
                />
                
                <TextInput 
                    placeholder='Cantidad' 
                    style={styles.input} 
                    onChangeText={(cantProd) => setItem({...item, cantidad: Number(cantProd)})}
                    keyboardType="numeric"
                />
                
                <MultipleSelectList 
                    setSelected={setSelected} 
                    data={data} 
                    save="value"
                    onSelect={() => console.log(selected)}
                    label="Categories" 
                    boxStyles={styles.selectList}
                    placeholder='Categorias'
                />
                
                <View style={styles.divider}>
                    <View style={styles.dividerLine} />
                    <Text style={styles.dividerText}>Detalles</Text>
                    <View style={styles.dividerLine} />
                </View>
                
                <TextInput
                    placeholder="Detalles..."
                    multiline
                    numberOfLines={4}
                    onChangeText={(detalleProd) => setItem({...item, detalles: detalleProd})} 
                    style={styles.multilineInput}
                />
                
                <View style={styles.divider}>
                    <View style={styles.dividerLine} />
                    <Text style={[styles.dividerText, { width: 110 }]}>Observaciones</Text>
                    <View style={styles.dividerLine} />
                </View>
                
                <TextInput
                    placeholder="Observaciones..."
                    multiline
                    numberOfLines={4}
                    onChangeText={(obsProd) => setItem({...item, observacion: obsProd})}
                    style={styles.multilineInput}
                />
                
                <TouchableOpacity 
                    style={styles.btnGuardar}
                    onPress={guardar}
                >
                    <Text style={styles.textGuardar}>GUARDAR</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    scrollContainer: {
        paddingBottom: 100,
        paddingTop: 20,
    },
    titulo: {
        fontSize: 32,
        textAlign: 'center',
        color: '#1a936f',
        fontWeight: 'bold',
        fontFamily: 'arial',
        marginBottom: 20,
    },
    contenidoPrimero: {
        alignSelf: 'center',
        marginBottom: 20,
    },
    input: {
        width: '90%',
        padding: 12,
        marginHorizontal: '5%',
        marginBottom: 15,
        borderWidth: 1,
        borderRadius: 5,
        fontSize: 18,
        backgroundColor: "#fff",
        textTransform: 'capitalize',
        fontFamily: 'arial',
        color: '#242424'
    },
    selectList: {
        width: '90%', 
        marginHorizontal: '5%', 
        fontSize: 18,
        marginBottom: 15,
    },
    divider: {
        flexDirection: 'row', 
        alignItems: 'center',
        marginVertical: 15,
        marginHorizontal: '5%',
    },
    dividerLine: {
        flex: 1, 
        height: 1, 
        backgroundColor: 'black'
    },
    dividerText: {
        width: 80, 
        textAlign: 'center',
        fontSize: 16,
    },
    multilineInput: {
        width: '90%',
        marginHorizontal: '5%',
        fontSize: 17,
        padding: 12,
        borderWidth: 1,
        borderRadius: 5,
        backgroundColor: '#fff',
        textAlignVertical: 'top',
        marginBottom: 15,
        minHeight: 100,
    },
    btnGuardar: {
        width: '90%',
        marginHorizontal: '5%',
        padding: 15,
        borderRadius: 5,
        backgroundColor: "#1268c4",
        marginTop: 20,
        marginBottom: 40,
    },
    textGuardar: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 20,
        fontFamily: 'arial',
        textAlign: 'center'
    }
})