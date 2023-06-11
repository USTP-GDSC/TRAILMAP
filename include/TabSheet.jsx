import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import { BottomSheetScrollView } from '@gorhom/bottom-sheet';

export default TabSheet = ({ firstSnapChild, secondSnapChild, thirdSnapChild, snapPoints }) => {
  // ref
  const bottomSheetRef = useRef(null);

  // animated values
  const translateY = useRef(new Animated.Value(100)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  // callbacks
  const handleSheetChanges = useCallback((index) => {
    if (index === 1) {
      // Show second container with fade-in and springy motion
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.spring(translateY, {
          toValue: 0,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      // Hide second container and reset animations
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 0,
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: 100,
          duration: 0,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [fadeAnim, translateY]);

  // expand the bottom sheet when new children are provided
  useEffect(() => {
    if (bottomSheetRef.current) {
      bottomSheetRef.current.snapToIndex(0);
    }
  }, [firstSnapChild]);

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
        {firstSnapChild}
        <Animated.View
          style={[
            styles.secondContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY }],
            },
          ]}
        >
          <BottomSheetScrollView contentContainerStyle={styles.scrollViewContent}>
            {secondSnapChild}
          </BottomSheetScrollView>
        </Animated.View>
      </View>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 15,
    paddingBottom: 100,
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
  secondContainer: {
    flex: 1,
    borderTopWidth: 1,
    borderColor: 'grey',
    marginTop: 15,
    // maxHeight: 200,
  },
  scrollViewContent: {

  },
});
