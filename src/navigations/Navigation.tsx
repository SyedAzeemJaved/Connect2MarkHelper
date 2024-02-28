import { useContext } from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import { DashboardScreen } from '@screens';

const Stack = createStackNavigator();

export const Navigation = () => {
  return (
    <Stack.Navigator initialRouteName="Dashboard">
      <Stack.Screen
        name="Dashboard"
        options={{
          headerShown: false,
        }}
        component={DashboardScreen}
      />
    </Stack.Navigator>
  );
};
