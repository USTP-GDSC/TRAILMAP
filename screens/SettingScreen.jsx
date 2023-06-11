import React, { useState } from 'react';
import { StyleSheet, Text, View, Switch } from 'react-native';

const SettingScreen = ({onToggleShaders}) => {
  const [shadersEnabled, setShadersEnabled] = useState(false);

  const toggleShaders = () => {
    setShadersEnabled(!shadersEnabled);
	onToggleShaders(shadersEnabled);
  };

  return (
    <View style={styles.screen}>
      <Text style={styles.header}>Settings</Text>
      <View style={styles.toggleContainer}>
        <Text style={styles.label}>Enable Shaders</Text>
        <Switch
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={shadersEnabled ? '#f5dd4b' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleShaders}
          value={shadersEnabled}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#D5D9E6',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  toggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  label: {
    marginRight: 10,
    fontSize: 18,
  },
});

export default SettingScreen;
