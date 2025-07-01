import {createNativeStackNavigator} from "@react-navigation/native-stack"
import {NavigationContainer} from "@react-navigation/native"

import Home from './screens/Home'
import Edit from './screens/Edit'
import Buscar from './screens/Buscar'
import Agregar from './screens/Add'
import Show from './screens/Show'

const Stack=createNativeStackNavigator()


function MyStack(){
    return(
        <Stack.Navigator initialRouteName="Home">
                <Stack.Screen name="Home" component={Home} options={{headerTitle:""}} />
                <Stack.Screen name="Edit" component={Edit} />
                <Stack.Screen name="Buscar" component={Buscar}  />
                <Stack.Screen name="Agregar" component={Agregar}  />
                <Stack.Screen name="Show" component={Show} />
        </Stack.Navigator>
    )
}


export default function Navigation() {
  return (
    <NavigationContainer>
        <MyStack></MyStack>
    </NavigationContainer>
  )
}