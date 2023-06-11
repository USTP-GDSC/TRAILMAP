import { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
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
  const [firstSheetBody, setFirstSheetBody] = useState(null);
  const [secondSheetBody, setSecondSheetBody] = useState(null);
  const [thirdSheetBody, setThirdSheetBody] = useState(null);
  const [toggleShaders, setToggleShaders] = useState(false);
  const [snapPoints, setSnapPoints] = useState([210]);
  const webviewRef = useRef(null);

  useEffect(() => {
    setFirstSheetBody(<InitialSheetBody />);
  }, []);

  const handleBuildingClicked = (bldgInfo, roomInfo) => {
    setFirstSheetBody(bldgInfo);
    
    if (roomInfo !== undefined) {
      setSecondSheetBody(roomInfo);
      setSnapPoints([210, '100%']); // 350 add on middle if room is searched
    }
    else {
      setSnapPoints([210]);
    }
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
            tabBar={
              props => 
                <TabBar {...props} 
                  firstSheetBody={firstSheetBody} 
                  secondSheetBody={secondSheetBody} 
                  thirdtSheetBody={thirdSheetBody} 
                  snapPoints={snapPoints} />
            }
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
      marginTop: 12,
      flexDirection: 'row',
    },
    textContainer: {
      marginLeft: 14,
    },
    headerText: {
      fontSize: 20,
      fontWeight: '500',
    },
    subHeaderText: {
      fontSize: 12,
      color: 'grey',
    },
    logo: {
      height: 45, // Set the desired height of the image
      width: undefined, // Set the width to undefined to maintain aspect ratio
      aspectRatio: 1, // Set the desired aspect ratio (width:height) of the image
    },
  });

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/image/gdscLogo.png')}
        style={styles.logo}
        resizeMode="contain" // Adjust the resizeMode prop value
      />
      <View style={styles.textContainer}>
        <Text style={styles.headerText}>Welcome To Trailmap Beta!</Text>
        <Text style={styles.subHeaderText}>by Google Developer Student Clubs USTP</Text>
      </View>
    </View>
  );
};