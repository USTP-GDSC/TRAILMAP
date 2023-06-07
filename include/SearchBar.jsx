import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

const SearchBar = ({ _DATA }) => {
  const [searchText, setSearchText] = useState('');

  const handleSearch = (text) => {
    setSearchText(text);

    searchAsync(text, (results) => {
      // Perform the callback logic with the search results
      console.log(results);
    });
  };

  const searchAsync = (text, callback) => {
   
    
    const search = (user_input) => {
      // split characters not ascii
      /*
          [^...] is a negated character set that matches any character not present in the set.
          \w matches any word character (letters, digits, and underscores).
          \s matches any whitespace character (spaces, tabs, line breaks, etc.).
          \d matches any digit character (0-9).
      */
      const regex = /[()\s_\-,\[\]?]+/;

      // convert input to lowercase
      user_input = user_input.toLowerCase().trim().split(regex);

      // remove unnecessary keywords in query
      const removeWords = ['of', 'the', 'and', 'in', 'for', 'on', ''];
      user_input = user_input.filter(word => !removeWords.includes(word));



      const countStringsInArray = (array, searchArray) => {
        let count = 0;
        
        for (let i = 0; i < array.length; i++) {
            const currentString = array[i];
            
            if (searchArray.includes(currentString)) {
            count++;
            }
        }
        
        return count;
      }
    


      let results = [];



      for (const bldg_id in _DATA) {

          // check building names
          const bldg_name = _DATA[bldg_id].name;
          const bldg_split = bldg_name.toLowerCase().split(regex);
          let matchCount = countStringsInArray(bldg_split, user_input);

          if (matchCount > 0) {
              results.push(
                  {
                      rank: matchCount, 
                      bldg: bldg_id,
                      name: bldg_name
                  }
              );
          }
          

          // check room names
          const rooms = _DATA[bldg_id].rooms;
          for (const floor_id in rooms) {
              const floor_rooms = rooms[floor_id];

              // split the user_input and find each individual keywords   
              for (const room_name of floor_rooms) {
                  
                  const room_split = room_name.toLowerCase().split(regex);

                  matchCount = countStringsInArray(room_split, user_input);

                  if (matchCount > 0) {
                      results.push(
                          {
                              rank: matchCount, 
                              floor: floor_id,
                              bldg: bldg_id,
                              room: room_name, 
                          }
                      );
                  }
              }

          }


      }


      // Filter the two largest rank values
      if (results.length >= 2) {
          // Sort the results array in descending order based on rank
          results.sort((a, b) => b.rank - a.rank);

          let filteredResults;
          // if the rank is one less difference, then just ignore it
          if (results[0].rank - results[1].rank === 1) {
              filteredResults = results.slice(0, 1);
          }
          else {
              filteredResults = results.filter((result) => result.rank >= results[1].rank);
          }

          return filteredResults;
      }
      else {
          return results;
      }
    }

    // Execute the search logic asynchronously
    setTimeout(() => {
      const results = search(text);
      callback(results);
    }, 0);
  };

  return (
    <View style={styles.container}>
      {searchText === '' ? (
        <View style={styles.searchIconContainer}>
          <Icon name="search" size={24} color="gray" />
        </View>
      ) : null}
      <TextInput
        style={styles.input}
        placeholder="Search"
        value={searchText}
        onChangeText={handleSearch}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 50,
    paddingLeft: 25,
    paddingRight: 15,
    paddingTop: 10,
    paddingBottom: 10,
  },
  input: {
    flex: 1,
  },
  searchIconContainer: {
    marginRight: 10,
  },
});

export default SearchBar;











