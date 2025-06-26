import * as React from 'react';
import * as RN from 'react-native';
import {database} from '../config/fb';
import {deleteDoc,doc} from 'firebase/firestore';
import {AntDesign} from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";

export default function Product({
        id,
        nombre,
        marca,
        cantidad,
        categoria,
    detalles}) {


        const navigation=useNavigation()
        const eliminar=()=>{
            const refer=doc(database,'prueba',id)
            deleteDoc(refer)
        }

        

    return(
        <RN.View style={styles.container}>
            <RN.Text style={styles.nombre}>{nombre}</RN.Text>
            <RN.View style={{flexDirection:'row', justifyContent:'space-between'}}>
                
                <RN.Text style={styles.emoji}>🖱️</RN.Text>
                <AntDesign onPress={eliminar} name="delete" size={24} color={'black'} style={styles.btnDelete}></AntDesign>
            </RN.View>
            
            
            <RN.Text style={styles.precio}>{marca}-
                <RN.Text style={{color:'#1a936f'}}> {cantidad} </RN.Text>
            </RN.Text>
            <RN.Text style={{fontSize:20, marginBottom:8, fontFamily:'arial'}}>{categoria}</RN.Text>
            <RN.TouchableOpacity style={styles.btn} onPress={()=>{navigation.navigate('Show',{id, nombre,marca,cantidad,categoria,detalles})}}>
                <RN.Text style={styles.letra}> VER </RN.Text>
            </RN.TouchableOpacity>
            <RN.TouchableOpacity style={styles.btn} onPress={()=>{navigation.navigate('Edit',{id, nombre,marca,cantidad,categoria,detalles})}} >
                <RN.Text style={styles.letra}> EDITAR </RN.Text>
            </RN.TouchableOpacity>
        </RN.View>
    )
}

const styles=RN.StyleSheet.create({
        container:{
            borderWidth:.5,
            margin:16,
            padding:16, 
            backgroundColor:'#fff',
            borderRadius:8,
            textAlign:'center',
            alignItems:'center'
        },
        emoji:{
            fontSize:100,
            marginStart:90
        },
        nombre:{
            fontSize:32,
            fontWeight:'bold',
            color:'#64819d',
            fontFamily:'arial',
            textTransform:'capitalize' 
        },
        precio:{
            fontSize:24,
            color:'#333',
            fontFamily:'arial',
            fontWeight:'700',
            marginBottom:10
        },
        btn:{
            backgroundColor:'#1268c4',
            width:'90%',
            padding:10,
            borderRadius:10,
            marginBottom:3
        },
        letra:{
            fontFamily:'arial',
            fontSize:17,
            color:'#fff',
            textAlign:'center',
            fontWeight:'bold'
        },
        btnDelete:{
            paddingStart:50,
            marginStart:40
        }
})