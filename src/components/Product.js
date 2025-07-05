import * as React from 'react';
import * as RN from 'react-native';
import { database } from '../config/fb';
import { deleteDoc, doc } from 'firebase/firestore';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";

export default function Product({
    id,
    nombre,
    imagenes,
    marca,
    cantidad,
    categoria,
    detalles,
    observacion
}) {
    const navigation = useNavigation();
    const [modalVisible, setModalVisible] = React.useState(false);
    
    const eliminar = () => {
        const refer = doc(database, 'prueba', id);
        deleteDoc(refer)
            .then(() => {
                setModalVisible(false);
                RN.Alert.alert('Éxito', 'Producto eliminado correctamente');
            })
            .catch(error => {
                setModalVisible(false);
                RN.Alert.alert('Error', 'No se pudo eliminar el producto');
            });
    };

    return (
        <RN.View style={styles.container}>
            {/* Modal de confirmación */}
            <RN.Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <RN.View style={styles.modalContainer}>
                    <RN.View style={styles.modalContent}>
                        <RN.Text style={styles.modalTitle}>Eliminar producto</RN.Text>
                        <RN.Text style={styles.modalText}>
                            ¿Seguro que deseas eliminar "{nombre}"?
                        </RN.Text>
                        
                        <RN.View style={styles.modalButtons}>
                            <RN.TouchableOpacity
                                style={[styles.modalButton, styles.cancelButton]}
                                onPress={() => setModalVisible(false)}
                            >
                                <RN.Text style={styles.buttonText}>Cancelar</RN.Text>
                            </RN.TouchableOpacity>
                            
                            <RN.TouchableOpacity
                                style={[styles.modalButton, styles.deleteButton]}
                                onPress={eliminar}
                            >
                                <RN.Text style={styles.buttonText}>Eliminar</RN.Text>
                            </RN.TouchableOpacity>
                        </RN.View>
                    </RN.View>
                </RN.View>
            </RN.Modal>
            
            <RN.View style={styles.topRow}>
                <RN.Text style={styles.nombre}>{nombre}</RN.Text>
                <AntDesign 
                    onPress={() => setModalVisible(true)} 
                    name="delete" 
                    size={22} 
                    color={'red'} 
                    style={styles.btnDelete}
                />
            </RN.View>

            <RN.View style={styles.imageContainer}>
                {imagenes.principal ? (
                    <RN.Image 
                        source={{uri: imagenes.principal}} 
                        style={styles.image}
                    />
                ) : (
                    <RN.Text style={styles.emoji}>📷</RN.Text>
                )}
            </RN.View>
            
            <RN.Text style={styles.precio}>
                {marca} - <RN.Text style={{color: '#1a936f'}}>{cantidad}</RN.Text>
            </RN.Text>

            <RN.TouchableOpacity 
                style={styles.btn} 
                onPress={() => navigation.navigate('Show', {id, nombre, imagenes, marca, cantidad, categoria, detalles, observacion})}
            >
                <RN.Text style={styles.letra}>VER</RN.Text>
            </RN.TouchableOpacity>
            
            <RN.TouchableOpacity 
                style={styles.btn} 
                onPress={() => navigation.navigate('Edit', {id, nombre, imagenes, marca, cantidad, categoria, detalles,observacion})}
            >
                <RN.Text style={styles.letra}>EDITAR</RN.Text>
            </RN.TouchableOpacity>
        </RN.View>
    )
}

const styles = RN.StyleSheet.create({
    container: {
        flex: 1,
        width: 'auto',
        justifyContent: 'center',
        textAlign: 'center',
        margin: 16,
        padding: 16, 
        backgroundColor: '#fff',
        borderRadius: 8,
    },
    topRow: {
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        marginBottom: 10
    },
    nombre: {
        fontSize: 30,
        fontWeight: 'bold',
        fontFamily:'arial',
        color: '#333',
        textAlign: 'center',
        paddingHorizontal: 30,
    },
    btnDelete: {
        position: 'absolute',
        right: 0,
        top: 0,
        padding: 10
    },
    imageContainer: {
        flexDirection: 'row', 
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        marginVertical: 10
    },
    image: {
        width: 260, 
        height: 200,
        resizeMode: 'contain'
    },
    emoji: {
        fontSize: 100,
    },
    precio: {
        fontSize: 24,
        color: '#333',
        fontFamily: 'arial',
        fontWeight: '700',
        marginBottom: 10,
        textAlign: 'center'
    },
    btn: {
        backgroundColor: '#1268c4',
        width: '100%',
        padding: 10,
        borderRadius: 10,
        marginBottom: 8
    },
    letra: {
        fontFamily: 'arial',
        width: '100%',
        fontSize: 17,
        color: '#fff',
        textAlign: 'center',
        fontWeight: 'bold'
    },
    // Estilos para el modal
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        width: '80%',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 15,
        textAlign: 'center',
    },
    modalText: {
        fontSize: 16,
        marginBottom: 20,
        textAlign: 'center',
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    modalButton: {
        padding: 10,
        borderRadius: 5,
        width: '48%',
        alignItems: 'center',
    },
    cancelButton: {
        backgroundColor: '#ccc',
    },
    deleteButton: {
        backgroundColor: 'red',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});