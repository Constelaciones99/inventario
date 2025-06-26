import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native'
import { MultipleSelectList  } from 'react-native-dropdown-select-list'
import React from 'react'

export default function Add() {
    const [selected, setSelected] = React.useState("");
  
  const data = [
      {key:'1', value:'Externo', disabled:true},
      {key:'2', value:'Periferico de entrada'},
      {key:'3', value:'Periferico de salida'},
      {key:'4', value:'Adaptador'},
      {key:'5', value:'Cable'},
      {key:'6', value:'Interno', disabled:true},
      {key:'7', value:'Almacenamiento'},
      {key:'8', value:'Red'},
  ]

  return (
    <View>
      <Text style={styles.titulo}>Agregar nuevo producto</Text>
     
        <View>
            
                <TouchableOpacity style={styles.contenidoPrimero}>
                   <Text style={{fontSize:70}} disabled>📷</Text> 
                </TouchableOpacity>
                <TouchableOpacity>
                   {/* <Text style={{marginStart:28, fontSize:35}}>➕</Text>  */}
                </TouchableOpacity>
            
            <TextInput placeholder='Nombre' style={styles.input}></TextInput>
            <TextInput placeholder='Marca' style={styles.input}></TextInput>
            <TextInput placeholder='Cantidad' style={styles.input}></TextInput>
            <MultipleSelectList 
        setSelected={(val) => setSelected(val)} 
        data={data} 
        save="value"
        onSelect={() => alert(selected)} 
        label="Categories" boxStyles={{width:'90%', marginStart:'5%', fontSize:24}} placeholder='Categorias'
    />
                        <TextInput
            placeholder="Detalles..."
            multiline
            numberOfLines={4}
            style={{
                width: '90%',
                margin: '5%',
                fontSize: 17,
                padding: 7,
                borderWidth: 1,
                borderRadius: 5,
                backgroundColor: '#fff',
                textAlignVertical: 'top' 
            }}
            />

            <TouchableOpacity style={styles.btnGuardar}>
                <Text style={styles.textGuardar}> GUARDAR </Text>
            </TouchableOpacity>
        </View>


    </View>
  )
}


const styles=StyleSheet.create({
    titulo:{
        fontSize:32,
        textAlign:'center',
        color:'#1a936f',
        fontWeight:'bold',
        fontFamily:'arial'
    },
    contenidoPrimero:{
        flex:1,
        margin:'auto',
        width:100
    },
    input:{
        width:'90%',
        padding:6,
        marginStart:'5%',
        marginBottom:4,
        borderWidth:1,
        borderRadius:5,
        fontSize:24,
        backgroundColor:"#fff",
        textTransform:'capitalize',
        fontFamily:'arial',
        color:'#242424'
    },
    btnGuardar:{
        width:'90%',
        marginStart:'5%',
        padding:5,
        borderRadius:5,
        backgroundColor:"#1268c4"
    },
    textGuardar:{
        color:'#fff',
        fontWeight:'bold',
        fontSize:24,
        fontFamily:'arial',
        textAlign:'center'
    }
})