import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import {Home} from './screens/home';

const Drawer = createDrawerNavigator();

function Router() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen
          name="Home"
          component={Home}
          /* options={({navigation}) => ({
            title: 'name',
            data: route.params.animal_data,
            headerShown: false,
            headerLeft: () => (
              <DrawerButton onPress={() => navigation.toggleDrawer()} />
            ),
          })} */
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default Router;
