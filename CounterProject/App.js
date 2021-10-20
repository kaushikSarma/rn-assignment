import React from 'react';
import { Dimensions, Image, SafeAreaView, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as Icons from './src/resources/Icons';

const Tab = createBottomTabNavigator();

const Header = ({route}) => {
  return <View style={{flexDirection: 'row'}}><Text style={{ marginLeft: 10, fontSize: 20 }}>{'<'}</Text><Text style={{ marginLeft: 20, fontSize: 20 }}>{route.name}</Text></View>;
}

const Screen = ({route}) => {
  console.log(route);
  return (<SafeAreaView style={{ height: Dimensions.get('window').height - 52, borderWidth: 1, borderColor: 'blue' }}>
    <Header route={route} />
    <View style={{ 
      backgroundColor: 'red',
      flex: 1,
      flexDirection: 'column',
      alignContent: 'center',
      justifyContent: 'center',
      alignItems: 'center' 
    }}><Text>{route.name}</Text></View>
  </SafeAreaView>);
};

const routeConfig = [
  {name: 'Home', component: Screen, tabIcon: Icons.IconHome},
  {name: 'Search', component: Screen, tabIcon: Icons.IconSearch},
  {name: 'Cart', component: Screen, tabIcon: Icons.IconCart},
  {name: 'Profile', component: Screen, tabIcon: Icons.IconProfile},
  {name: 'More', component: Screen, tabIcon: Icons.IconMenu},
];

export default function App() {
    return (
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarActiveTintColor: 'tomato',
            tabBarInactiveTintColor: 'gray',
          })}
        >
          {routeConfig.map((route, index) => 
            <Tab.Screen key={`route-screen-${index}`} name={route.name} component={route.component} options={{
              tabBarIcon: () => <Image style={{height: 20, width: 20}} source={route.tabIcon} />,
              header: () => null,
            }} />)}
        </Tab.Navigator>
      </NavigationContainer>
    );
}