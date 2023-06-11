import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';

export default TabSheet = ({ children }) => {
  // ref
  const bottomSheetRef = useRef(null);

  // variables
  const snapPoints = useMemo(() => [210, /*400*/], []);

  // callbacks
  const handleSheetChanges = useCallback((index) => {
    // console.log('handleSheetChanges', index);
  }, []);

  // expand the bottom sheet when new children are provided
  useEffect(() => {
    if (bottomSheetRef.current) {
      bottomSheetRef.current.snapToIndex(0);
    }
  }, [children]);

  // renders
  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={0}
      snapPoints={snapPoints}
      onChange={handleSheetChanges}
      handleStyle={styles.handle}
      handleIndicatorStyle={styles.handleIndicator}
      enablePanDownToClose={true}
    >
      <View style={styles.contentContainer}>
        {children}
      </View>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: 'whitesmoke',
  },
  handle: {
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    backgroundColor: 'whitesmoke',
    padding: 9,
  },
  handleIndicator: {
    backgroundColor: '#dbdbdb',
    padding: 2.8,
    width: 40,
  },
});
