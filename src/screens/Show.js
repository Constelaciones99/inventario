import { View, Text,StyleSheet, Image } from 'react-native'
import React from 'react'

export default function Show({route}) {

  const {id}=route.params
  const {nombre}=route.params
  const {imagenes}=route.params
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
      <View style={{fontSize:65, textAlign:'center'}}> 
            <Image 
                                    source={{uri: imagenes.principal}} 
                                    style={styles.image}
              />  
      </View>
      <Text style={styles.word}>{nombre}</Text>
      <Text style={styles.word}> {marca} </Text> 
      <Text style={styles.word}> {cantidad} </Text> 
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
  nombre:{
    
  },
  img:{
    fontSize:80,
    width:'100%',
    textAlign:'center'
  },
  image: {
        width: 260, 
        height: 200,
        resizeMode: 'contain'
    },
  detail:{
    fontSize:17,
    width:'100%',
  },
  badge:{
    width:'auto',
    borderRadius:10,
    fontWeight:'bold',
    fontFamily:'arial',
    padding:0,
    textAlign:'center',
    fontSize:15,
    backgroundColor:'#97c0d8',
    marginBottom:3
  }
})