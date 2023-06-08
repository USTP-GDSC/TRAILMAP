  
  // const searchAsync = (text, callback) => {
   
    
  //   const search = (user_input) => {
  //     // split characters not ascii
  //     /*    
  //         [^...] is a negated character set that matches any character not present in the set.
  //         \w matches any word character (letters, digits, and underscores).
  //         \s matches any whitespace character (spaces, tabs, line breaks, etc.).
  //         \d matches any digit character (0-9).
  //     */
  //     const regex = /[()\s_\-,\[\]?]+/;

  //     // convert input to lowercase
  //     user_input = user_input.toLowerCase().trim().split(regex);

  //     // remove unnecessary keywords in query
  //     const removeWords = ['of', 'the', 'and', 'in', 'for', 'on', ''];
  //     user_input = user_input.filter(word => !removeWords.includes(word));



  //     const countStringsInArray = (array, searchArray) => {
  //       let count = 0;
        
  //       for (let i = 0; i < array.length; i++) {
  //           const currentString = array[i];
            
  //           if (searchArray.includes(currentString)) {
  //           count++;
  //           }
  //       }
        
  //       return count;
  //     }
    


  //     let results = [];



  //     for (const bldg_id in _DATA) {

  //         // check building names
  //         const bldg_name = _DATA[bldg_id].name;
  //         const bldg_split = bldg_name.toLowerCase().split(regex);
  //         let matchCount = countStringsInArray(bldg_split, user_input);

  //         if (matchCount > 0) {
  //             results.push(
  //                 {
  //                     rank: matchCount, 
  //                     bldg: bldg_id,
  //                     name: bldg_name
  //                 }
  //             );
  //         }
          

  //         // check room names
  //         const rooms = _DATA[bldg_id].rooms;
  //         for (const floor_id in rooms) {
  //             const floor_rooms = rooms[floor_id];

  //             // split the user_input and find each individual keywords   
  //             for (const room_name of floor_rooms) {
                  
  //                 const room_split = room_name.toLowerCase().split(regex);

  //                 matchCount = countStringsInArray(room_split, user_input);

  //                 if (matchCount > 0) {
  //                     results.push(
  //                         {
  //                             rank: matchCount, 
  //                             floor: floor_id,
  //                             bldg: bldg_id,
  //                             room: room_name, 
  //                         }
  //                     );
  //                 }
  //             }

  //         }


  //     }


  //     // Filter the two largest rank values
  //     if (results.length >= 2) {
  //         // Sort the results array in descending order based on rank
  //         results.sort((a, b) => b.rank - a.rank);

  //         let filteredResults;
  //         // if the rank is one less difference, then just ignore it
  //         if (results[0].rank - results[1].rank === 1) {
  //             filteredResults = results.slice(0, 1);
  //         }
  //         else {
  //             filteredResults = results.filter((result) => result.rank >= results[1].rank);
  //         }

  //         return filteredResults;
  //     }
  //     else {
  //         return results;
  //     }
  //   }

  //   // Execute the search logic asynchronously
  //   setTimeout(() => {
  //     const results = search(text);
  //     callback(results);
  //   }, 0);
  // };





import React, { useState, useRef } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';


export default SearchBar = ({ _DATA, onSearchResults }) => {
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const dropdownRef = useRef(null);

  
  const handleSearch = (text) => {
    setSearchText(text);

    searchAsync(text, (results) => {
      setSearchResults(results);
      onSearchResults(results);
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
      const regex_symbols = /[()\s_\-,\[\]?]+/;

      // convert input to lowercase
      user_input = user_input.toLowerCase().trim().split(regex_symbols);

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
          const bldg_split = bldg_name.toLowerCase().split(regex_symbols);
          let matchCount = countStringsInArray(bldg_split, user_input);

          const regex_brackets = /\[.*?\]/g;

          if (matchCount > 0) {
              results.push(
                  {
                      rank: matchCount, 
                      bldg: bldg_name.replace(regex_brackets, ""),
                  }
              );
          }
          

          // check room names
          const rooms = _DATA[bldg_id].rooms;
          for (const floor_id in rooms) {
              const floor_rooms = rooms[floor_id];

              // split the user_input and find each individual keywords   
              for (const room_name of floor_rooms) {
                  
                  const room_split = room_name.toLowerCase().split(regex_symbols);

                  matchCount = countStringsInArray(room_split, user_input);

                  const floorIdToNameMap = {
                    f1: '1st Floor',
                    f2: '2nd Floor',
                    f3: '3rd Floor',
                    f4: '4th Floor',
                    f5: '5th Floor',
                    f6: '6th Floor',
                    f7: '7th Floor',
                    f8: '8th Floor',
                    f9: '9th Floor',
                  };
                  
                  let floor_name = floorIdToNameMap[floor_id] || 'Unknown Floor';


                  if (matchCount > 0) {
                      results.push(
                          {
                              rank: matchCount, 
                              floor: floor_name,
                              bldg: bldg_name.replace(regex_brackets, ""),
                              room: room_name.replace(regex_brackets, ""), 
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

  const clearSearch = () => {
    setSearchText('');
    setSearchResults([]);
  };


  return (
    <View style={styles.container}>
      {/* magnifying glass icon */}
      {searchText === '' ? (
        <View style={styles.searchIconContainer}>
          <Icon name="search" size={24} color="gray" />
        </View>
      ) : null}

      {/* input text search bar  */}
      <TextInput
        style={styles.input}
        placeholder="Search"
        value={searchText}
        onChangeText={handleSearch}
        ref={dropdownRef}
      />

      {/* close button/icon */}
      {searchText !== '' && (
        <TouchableOpacity style={styles.clearIconContainer} onPress={clearSearch}>
          <Icon name="x" size={24} color="gray" />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  clearIconContainer: {
    marginLeft: 10,
  },
});

