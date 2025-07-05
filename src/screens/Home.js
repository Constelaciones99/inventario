import { View, ScrollView, StyleSheet, TextInput, TouchableOpacity, Text, Dimensions } from 'react-native';
import { database } from '../config/fb';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { useNavigation } from "@react-navigation/native";
import React, { useState } from 'react';
import Product from './../components/Product';
import { AntDesign } from '@expo/vector-icons';

// Obtener el ancho de la pantalla
const { width } = Dimensions.get('window');

export default function Home() {
    const navigation = useNavigation();
    const [productos, setProducto] = useState([]);
    const [search, setSearch] = useState('');

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <View style={styles.headerRightContainer}>
                    <View style={styles.searchContainer}>
                        <AntDesign 
                            name="search1" 
                            size={16} 
                            color="#999" 
                            style={styles.searchIcon} 
                        />
                        <TextInput
                            placeholder="Buscar productos..."
                            placeholderTextColor="#888"
                            value={search}
                            onChangeText={setSearch}
                            style={styles.input}
                            clearButtonMode="while-editing"
                        />
                    </View>
                    <TouchableOpacity
                        style={styles.addButton}
                        onPress={() => navigation.navigate('Agregar')}
                    >
                        <AntDesign name="plus" size={20} color="#fff" />
                    </TouchableOpacity>
                </View>
            ),
            headerTitle: '', // Eliminamos el título para dar más espacio
        });
    }, [search]);

     React.useEffect(() => {
        const collectionRef = collection(database, 'prueba');
        const que = query(collectionRef, orderBy('fecha', 'desc'));
        const snp = onSnapshot(que, querySnapshot => {
            setProducto(
                querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    nombre: doc.data().nombre,
                    imagenes: doc.data().imagenes,
                    marca: doc.data().marca,
                    cantidad: doc.data().cantidad,
                    detalles: doc.data().detalles,
                    categoria: doc.data().categoria,
                    fecha: doc.data().fecha,
                    observacion:doc.data().observacion
                }))
            );
        });
        return snp;
    }, []);

    const productosFiltrados = productos.filter(p =>
        p.nombre.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                {productosFiltrados.map(product => (
                    <Product key={product.id} {...product} />
                ))}
            </ScrollView>
        </View>
    );

    // ... (resto del código permanece igual)
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5'
    },
    scrollContent: {
        paddingBottom: 20,
        paddingTop: 10
    },
    headerRightContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: width - 40, // Ajustamos al ancho de pantalla menos padding
        marginRight: 10,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 8,
        paddingHorizontal: 12,
        height: 40,
        width: '80%', // 80% del espacio
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2
    },
    searchIcon: {
        marginRight: 12,
        fontSize:25
    },
    input: {
        flex: 1,
        fontFamily:'arial',
        fontSize: 23,
        color: '#000',
        paddingVertical: 8
    },
    addButton: {
        backgroundColor: '#1268c4',
        borderRadius: 8,
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3,
    },
    addButtonText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold'
    }
});