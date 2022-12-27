import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';

export default TabSheet = ({ toggle }) => {
	// ref
	const bottomSheetRef = useRef(null);

	// variables
	const snapPoints = useMemo(() => ['14.5%', '50%'], []);

	// callbacks
	const handleSheetChanges = useCallback(index => {
		// console.log('handleSheetChanges', index);
	}, []);

	if (!!bottomSheetRef.current) {
		!toggle
			? bottomSheetRef.current.close()
			: bottomSheetRef.current.collapse();
	}

	// renders
	return (
		<BottomSheet
			ref={bottomSheetRef}
			index={0}
			snapPoints={snapPoints}
			onChange={handleSheetChanges}
			handleIndicatorStyle={styles.handleIndicator}
		>
			<View style={styles.contentContainer}></View>
		</BottomSheet>
	);
};

const styles = StyleSheet.create({
	contentContainer: {
		flex: 1,
		alignItems: 'center',
	},

	handleIndicator: {
		backgroundColor: '#dbdbdb',
		padding: 2.8,
		width: 40,
	},
});
