import { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';

import TabBar from './TabBar';
import { FadeInView } from './TabTransition'; 
import NavigateScreen from '../screens/NavigateScreen';
import SettingScreen from '../screens/SettingScreen';

const Tab = createBottomTabNavigator();

export default function TabWrapper() {
  const [sheetBody, setSheetBody] = useState(null);
  const [toggleShaders, setToggleShaders] = useState(false);
  const webviewRef = useRef(null);

  useEffect(() => {
    setSheetBody(<InitialSheetBody />);
  }, []);

  const handleBuildingClicked = (children) => {
    setSheetBody(children);
  };

  const handleToggleShaders = (state) => {
    setToggleShaders(state);
    if (webviewRef.current) {
      webviewRef.current.injectJavaScript("world.toggleShaders()");
    }
  }


  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <BottomSheetModalProvider>
          <Tab.Navigator
            initialRouteName="map"
            tabBar={props => <TabBar {...props} sheetbody={sheetBody} />}
          >
            <Tab.Screen
              name="map"
              options={{ headerShown: false }}
            >
              {() => (
                <FadeInView>
                  <NavigateScreen ref={webviewRef} name="map" onBuildingClicked={handleBuildingClicked} />
                </FadeInView>
              )}
            </Tab.Screen>
            <Tab.Screen
              name="settings"
              options={{ headerShown: false }}
            >
              {() => (
                <FadeInView>
                  <SettingScreen onToggleShaders={handleToggleShaders}/>
                </FadeInView>
              )}
            </Tab.Screen>
          </Tab.Navigator>
        </BottomSheetModalProvider>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

// InitialSheetBody component to be rendered only once
const InitialSheetBody = () => {

  const styles = StyleSheet.create({
    container: {
      marginTop: 10,
    },  
    headerText: {
      fontSize: 20,
      fontWeight: '500'
    },
    subHeaderText: {
      color: 'grey'
    }
  });
  // Initial body content
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Welcome To Trailmap Beta Test!</Text>
      <Text style={styles.subHeaderText}>by Google Developer Student Clubs USTP</Text>
    </View>
  );
};
