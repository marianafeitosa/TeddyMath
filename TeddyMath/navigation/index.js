import { createStackNavigator } from 'react-navigation-stack';
import  React  from 'react';

const Strack = createStackNavigator();

function MyStack(){
    return (
        <StackActions.Navigator>
            <Stack.Screen 
            name="Home" 
            component={Home} 
            options={{headerShown: false}} />

            <Stack.Screen 
            name="Quiz" 
            component={Quiz}
            options={{headerShown: false}} />

            <Stack.Screen 
            name="Result" 
            component={Result} 
            options={{headerShown: false}} />
        </StackActions.Navigator>
    );
}

export default MyStack; 

