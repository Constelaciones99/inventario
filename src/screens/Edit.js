import { View, Text,StyleSheet, TextInput, TouchableOpacity, ScrollView} from 'react-native'
import { MultipleSelectList  } from 'react-native-dropdown-select-list'
import React from 'react'

export default function Edit({route}) {

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


  const {id}=route.params
  const {nombre}=route.params
  const {marca}=route.params
  const {cantidad}=route.params
  const {categoria}=route.params
  const {detalles}=route.params


  return (
    <View style={{flex:1}}>
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}showsVerticalScrollIndicator={false}>
      <Text style={styles.titulo}>Editar Producto✒️</Text>
      <View style={{flex:1, textAlign:'center'}}>
          {/* <Text style={{textAlign:'center', fontSize:20}}>{id}</Text> */}
          <Text style={{fontSize:65, textAlign:'center'}}>
                  🖱️
          </Text>
          <TouchableOpacity style={{backgroundColor:'#1268c4', width:90, borderRadius:21, padding:7, margin:'auto', marginBottom:10}}>
             <Text style={{fontSize:24, fontFamily:'arial', fontWeight:'bold', color:'#fff', textAlign:'center'}}>Add+ </Text>
          </TouchableOpacity>
          <TextInput placeholder={nombre} style={styles.inpt}></TextInput>
          <TextInput placeholder={marca} style={styles.inpt}></TextInput>
          <TextInput placeholder={cantidad} style={styles.inpt} keyboardType='number-pad'></TextInput>
          <MultipleSelectList 
                  setSelected={(val) => setSelected(val)} 
                  data={data} 
                  save="value"
                  onSelect={() => alert(selected)} 
                  label="Categories" boxStyles={{width:'90%', marginStart:'5%', fontSize:24}} placeholder='Categorias'
              />

              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <View style={{flex: 1, height: 1, backgroundColor: 'black'}} />
                    <View>
                      <Text style={{width: 50, textAlign: 'center'}}>Detalles</Text>
                    </View>
                    <View style={{flex: 1, height: 1, backgroundColor: 'black'}} />
              </View>

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

                          <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <View style={{flex: 1, height: 1, backgroundColor: 'black'}} />
                    <View>
                      <Text style={{width: 100, textAlign: 'center'}}>Observaciones</Text>
                    </View>
                    <View style={{flex: 1, height: 1, backgroundColor: 'black'}} />
              </View>

              <TextInput
                          placeholder="Observaciones..."
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


              <TouchableOpacity style={{backgroundColor:'#1268c4', width:'90%', borderRadius:5, padding:7, marginStart:'5%'}}>
                 <Text style={{fontSize:24, fontFamily:'arial', fontWeight:'bold', color:'#fff', textAlign:'center'}}> EDITAR </Text>
              </TouchableOpacity>
      </View>

      </ScrollView>
    </View>
  )
}


const styles=StyleSheet.create({
  titulo:{
    textAlign:'center', 
    fontSize:24, 
    fontWeight:'bold', 
    color:'#1268c4'
  },
  inpt:{
    width:'90%',
    marginStart:'5%',
    marginBottom:7,
    backgroundColor:'#fff',
    fontSize:24,
    fontFamily:'arial',
    textTransform:'capitalize',
    padding:8,
    paddingStart:7,
    borderWidth:1,
    borderRadius:10
    }
})
