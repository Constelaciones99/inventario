import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native'
import {database} from '../config/fb';
import {collection, onSnapshot,orderBy,query} from 'firebase/firestore'
import { useNavigation } from "@react-navigation/native";
import React, { useState } from 'react'
import Product from './../components/Product'

export default function Home() {

  const navigation=useNavigation()
    const [productos,setProducto]=useState([])

    React.useLayoutEffect(()=>{
        navigation.setOptions({
            headerRight:()=>(<TouchableOpacity style={styles.btn} onPress={()=>navigation.navigate('Agregar')}> <Text style={{fontFamily:'arial', color:'#fff', textAlign:'center', fontSize:14, fontWeight:'bold'}}> AGREGAR </Text> </TouchableOpacity>)
        })
    },[])



  React.useEffect(()=>{
            const collectionRef=collection(database, 'prueba')
            const que=query(collectionRef,orderBy('fecha','desc'))
            const snp=onSnapshot(que,querySnapshot=>{
                setProducto(
                    querySnapshot.docs.map(doc=>(
                    {
                    id:doc.id,
                    nombre:doc.data().nombre,
                    marca:doc.data().marca,
                    cantidad:doc.data().cantidad,
                    detalles:doc.data().detalles,
                    categoria:doc.data().categoria,
                    fecha:doc.data().fecha
                }
                ))
                )
            })

            return snp
    },[])


  return (
    
    <View style={{flex:1}}>
        
                <ScrollView contentContainerStyle={{ paddingBottom: 100 }}showsVerticalScrollIndicator={false}>

                {productos.map(product=><Product key={product.id} {...product} style={styles.prod} />)}

            </ScrollView>
      </View>
  )
}

const styles=StyleSheet.create({
    prod:{
        display:'flex',
        flexDirection:'row'
    },
    btn:{
            backgroundColor:'#1268c4',
            width:'90%',
            padding:10,
            borderRadius:10
        }
})