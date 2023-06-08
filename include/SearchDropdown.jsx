import React from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const SearchDropdown = ({ _RESULTS }) => {
  const Item = (dt) => {
    const { bldg, floor, room } = dt;
    const hasRoomKey = room !== undefined;

    return (
      <TouchableOpacity style={styles.resultItem}>
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

  return (
    <View style={styles.container}>
      <ScrollView>
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
