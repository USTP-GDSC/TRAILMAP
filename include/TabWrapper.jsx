import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import TabBar from './TabBar';
import DemoScreen from '../screens/DemoScreen';
import NavigateScreen from '../screens/NavigateScreen';
import { FadeInView } from './TabTransition';

const Tab = createBottomTabNavigator();

export default function TabWrapper() {
  const [sheet, setSheetBody] = useState(null);

  const handleBuildingClicked = (bldgkey) => {
	  setSheetBody(<Text>{bldgkey}</Text>);
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <BottomSheetModalProvider>
          <Tab.Navigator
            initialRouteName="map-pin"
            tabBar={props => <TabBar {...props} sheetbody={sheet} />}
          >
            <Tab.Screen
              name="map-pin"
              options={{ headerShown: false }}
            >
              {() => (
                <FadeInView>
                  <NavigateScreen name="map-pin" onBuildingClicked={handleBuildingClicked} />
                </FadeInView>
              )}
            </Tab.Screen>
            <Tab.Screen
              name="settings"
              options={{ headerShown: false }}
            >
              {() => (
                <FadeInView>
                  <DemoScreen name="settings" />
                </FadeInView>
              )}
            </Tab.Screen>
          </Tab.Navigator>
        </BottomSheetModalProvider>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
