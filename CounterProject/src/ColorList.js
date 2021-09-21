import React from 'react';
import { Dimensions, View, FlatList, Text, TouchableOpacity, SafeAreaView, StyleSheet } from 'react-native';

const COLORS = [
	{ name: 'PINK', hex: '#FF9090' },
	{ name: 'ORANGE', hex: '#FF9075' },
	{ name: 'BLUE', hex: '#85B0FF' },
	{ name: 'GREEN', hex: '#20AF20' },
	{ name: 'GREY', hex: '#D0D0D0' },
	{ name: 'BLACK', hex: '#4D4D4D' },
];

const ColorButtons = ({
	colorButtonList,
	toggleColor
}) => {
	const renderColorButton = ({item: color}) => {
		const isSelected = color.selected;
		return (
			<TouchableOpacity
				onPress={() => {
					toggleColor(color.hex)
				}}
			>
				<View style={[
					styles.colorButton, {
					backgroundColor: color.hex,
					shadowColor: color.hex
				}]}>
					{isSelected && <View style={styles.tick}></View>}
				</View>
			</TouchableOpacity>
		);
	};
	return (
		<View style={{ flexGrow: 0, height: 120 }}>	
			<Text style={{ paddingHorizontal: 20, color: '#A0A0A0', fontSize: 24 }}>Add Color</Text>
			<FlatList
				contentContainerStyle={styles.colorButtonList}
				data={colorButtonList}
				renderItem={renderColorButton}
				scrollEnabled
				horizontal
			/>
		</View>
	);
}

const Navbar = ({title}) => {
	return (
		<View style={styles.navBar}>
			<Text style={{ fontSize: 24, color: '#fff' }}>{title}</Text>
		</View>
	);
};

const getDeviceOrientation = () => {
	const dimensions = Dimensions.get('window');
	return dimensions.height > dimensions.width;
};

const useOrientationChange = () => {
	const [ isPortrait, setIsPortrait ] = React.useState(getDeviceOrientation());
	const [ dimension, setDimension ] = React.useState(Dimensions.get('window'));
	React.useEffect(() => {
		const callback = () => {
			setIsPortrait(getDeviceOrientation())
			setDimension(Dimensions.get('window'));
		};
		const listener = Dimensions.addEventListener('change', callback);
		return () => { listener.remove(); };
	}, []);
	return {
		isPortrait,
		dimension
	};
};

export default function ColorList() {
	const [ colorList, setColorList ] = React.useState([]);
	const [ colorButtonList, setColorButtonList ] = React.useState([]);
	const layoutConfig = useOrientationChange();

	React.useEffect(() => {
		const modifiedColorList = COLORS.map(color => ({
			...color,
			selected: false
		}));
		setColorButtonList(modifiedColorList);
	}, COLORS);

	const deleteItemHandler = (id) => {
		const indexToRemove = colorList.findIndex(e => e.id === id);
		if(indexToRemove > -1) {
			toggleColor(colorList[indexToRemove].colorData);
		}
	}
	// render single row of color
	const renderItem = ({ item }) => {
		return (
			<View style={{ height: 40, flexDirection: 'row', marginBottom: 20, alignItems: 'center' }}>
				<View style={[styles.colorItem, {
					backgroundColor: item.colorData
				}]}></View>
				<TouchableOpacity onPress={() => {
					deleteItemHandler(item.id);
				}}>
					<View style={styles.iconDelete}>
						<View style={styles.iconDeleteTop}></View>
						<View style={styles.iconDeleteBottom}></View>
					</View>
				</TouchableOpacity>
			</View>
		);
	}

	const toggleColor = (colorCode) => {
		const indexOfColor = colorList.findIndex(c => c.colorData === colorCode);
		if (indexOfColor > -1) {
			setColorList([...colorList.slice(0, indexOfColor), ...colorList.slice(indexOfColor + 1)]);
			const modifiedColorList = colorButtonList.map(color => {
				if (color.hex === colorCode) {
					return {
						...color,
						selected: false
					};
				}
				return color;
			});
			setColorButtonList(modifiedColorList);
		} else {
			const uniqueID = Date.now();
			setColorList([...colorList, { colorData: colorCode, id: uniqueID }]);
			const modifiedColorList = colorButtonList.map(color => {
				return {
					...color,
					selected: color.hex === colorCode || color.selected
				};
			});
			setColorButtonList(modifiedColorList);
		}
	}

	return (
		<SafeAreaView style={[styles.container, {
			height: layoutConfig.dimension.height,
			width: layoutConfig.dimension.width 
		}]}>
			<Navbar title={'Colors'}/>
			{colorList.length === 0 && <View style={styles.colorContainer}>
				<Text style={{ color: 'grey' }}>Click on a color below to add to the list</Text>
			</View>}
			{colorList.length > 0 && <FlatList
				contentContainerStyle={[
					styles.colorContainer,
					{
						width: layoutConfig.width
					}
				]}
				data={colorList}
				renderItem={renderItem}
				scrollEnabled
			/>}
			<ColorButtons
				colorButtonList={colorButtonList}
				toggleColor={toggleColor}
			/>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		height: Dimensions.get('window').height,
		justifyContent: 'center'
	},
	navBar: {
		padding: 20,
	},
	colorContainer: {
		flexGrow: 1,
		overflow: 'hidden',
		width: Dimensions.get('window').width,
		paddingHorizontal: 20,
	},
	colorItem: {
		height: 40,
		flex: 1,
		borderRadius: 5,
		marginRight: 10,
	},
	colorButtonList: {
		alignContent: 'center',
		paddingVertical: 20,
		paddingLeft: 20,
	},
	colorButton: {
		height: 50,
		width: 50,
		borderRadius: 100,
		marginRight: 20,
	},
	tick: {
		height: 12,
		width: 24,
		borderLeftWidth: 4,
		borderBottomWidth: 4,
		borderColor: '#FFFFFF',
		transform: [{rotate: '-45deg'}, {translateY: 20}],
	},
	iconDelete: {
		alignItems: 'center',
	},
	iconDeleteTop: {
		height: 5,
		width: 25,
		borderRadius: 2,
		backgroundColor: 'red'
	},
	iconDeleteBottom: {
		height: 20,
		width: 22,
		marginTop: 2,
		borderBottomLeftRadius: 2,
		borderBottomRightRadius: 2,
		backgroundColor: 'red',
	}
});