import React from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const SearchDropdown = ({ _RESULTS, onItemClicked}) => {
  const Item = (dt) => {
    const { id, bldg, floor, room } = dt;
    const hasRoomKey = room !== undefined;

    const handleItemClicked = () => {
      onItemClicked(id);
    }

    return (
      <TouchableOpacity style={styles.resultItem} onPress={handleItemClicked}>
        <View style={styles.resultTextContainer}>
          {hasRoomKey ? (
            <>
                <Icon name="door-open" size={24} color="red" />
                <View style={{flex: 1}}>
                    <Text style={styles.resultHeader}>{room}</Text>
                    <Text style={styles.resultSubtitle}>{`${bldg} > ${floor}`}</Text>
                </View>
            </>
          ) : (
            <>
                <Icon name="office-building-marker" size={24} color="blue" />
                <Text style={styles.resultHeader}>{bldg}</Text>
            </>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  
  /*
    If you're experiencing issues where the ScrollView is interfering with the interaction of 
    other components, such as TextInput, it could be due to the event bubbling behavior in 
    React Native.

    To resolve this issue, you can make use of the keyboardShouldPersistTaps prop on the 
    ScrollView component. This prop controls how taps outside of the TextInput should be handled 
    while the keyboard is open. By setting keyboardShouldPersistTaps to 'always', you can ensure 
    that the ScrollView does not capture the taps, allowing the children components to remain 
    interactive.  

    By setting keyboardShouldPersistTaps to 'always', the ScrollView will allow taps to pass 
    through to the underlying components, such as TouchableOpacity. This ensures that you can 
    interact with the children components, even while the TextInput has focus.

    With this update, the ScrollView will no longer interfere with the interaction of other 
    components within the ScrollableComponent, allowing you to click on the children components 
    without having to lose focus on the TextInput.
  */

  return (
    <View style={styles.container}>
      <ScrollView 
        keyboardShouldPersistTaps="always"
      >
        {_RESULTS.map((item, index) => (
          <Item key={index} {...item} />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    maxHeight: 275,
    marginTop: 10
  },
  resultItem: {
    paddingVertical: 15,
    paddingHorizontal: 15,
  },
  resultTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  resultHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  resultSubtitle: {
    fontSize: 12,
    color: 'gray',
    marginLeft: 10,
  },
});

export default SearchDropdown;
