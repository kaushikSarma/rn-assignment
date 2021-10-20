import React from 'react';
import { Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as Icons from './src/resources/Icons';
import Page from './src/AssignmentsConnect3/Page';

const Tab = createBottomTabNavigator();

const routeConfig = [
  {name: 'Home', component: Page, tabIcon: Icons.IconHome},
  {name: 'Search', component: Page, tabIcon: Icons.IconSearch},
  {name: 'Cart', component: Page, tabIcon: Icons.IconCart},
  {name: 'Profile', component: Page, tabIcon: Icons.IconProfile},
  {name: 'More', component: Page, tabIcon: Icons.IconMenu},
];

// section for connect 3 assignment
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