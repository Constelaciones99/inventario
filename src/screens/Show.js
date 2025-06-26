import { View, Text,StyleSheet, Button } from 'react-native'
import React from 'react'

export default function Show({route}) {

  const {id}=route.params
  const {nombre}=route.params
  const {marca}=route.params
  const {cantidad}=route.params
  const {categoria}=route.params
  var detalles=route.params.detalles  


  if(detalles==""){
    detalles="Sin detalles por ahora"
  }

  return (
    <View style={{flex:1}}>
      <Text style={styles.titulo}> 📜Detalles de Producto</Text>
      <Text style={styles.word}>{id}</Text>
      <Text style={styles.img}> 🖱️ </Text>
      <Text style={styles.word}>{nombre}</Text>
      <Text style={styles.word}> {marca} </Text> 
      <Text style={styles.word}> {cantidad} </Text> 
        {categoria.map(x=><Text>{x}</Text>)}
      <Text style={styles.detail}> Detalles:{detalles} </Text> 

    </View>
  )
}


const styles=StyleSheet.create({
  titulo:{
    fontSize:19,
    width:'100%',
    textAlign:'center'
  },
  word:{
    fontSize:24,
    fontFamily:'arial',
    width:'100%',
    textAlign:'center',
    textTransform:'capitalize'
  },
  img:{
    fontSize:80,
    width:'100%',
    textAlign:'center'
  },
  detail:{
    fontSize:17,
    width:'100%',
  }
})