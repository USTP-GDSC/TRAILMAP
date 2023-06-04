import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';

const SearchBar = () => {
  const [searchText, setSearchText] = useState('');

  const handleSearch = (text) => {
    setSearchText(text);
    // Perform search or filtering logic here
    // You can use the 'text' value to filter/search data
  };

  const handleSearchButton = () => {
    // Perform search or filtering logic here using the 'searchText' state
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search"
        value={searchText}
        onChangeText={handleSearch}
      />
      <TouchableOpacity style={styles.searchButton} onPress={handleSearchButton}>
        <Feather name="search" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 50,
    paddingLeft: 30,
    paddingRight: 10,
    paddingTop: 12,
    paddingBottom: 12,
  },
  searchButton: {
    paddingHorizontal: 10,
  },
});

export default SearchBar;
