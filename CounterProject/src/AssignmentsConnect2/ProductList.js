import React from 'react';
import { Dimensions, FlatList, Image, SafeAreaView, StyleSheet, Text, View } from 'react-native';

const DUMMY_PRODUCT = {
	productImageSource: require('../resources/tshirt-image.png'),
	productImageTitle: 'V Neck t-shirt',
	productPrice: 24.99
};

const PRODUCT_LIST = new Array(17).fill(DUMMY_PRODUCT);

const getDeviceOrientation = () => {
	const dimensions = Dimensions.get('window');
	return dimensions.height > dimensions.width;
};

const useOrientationChange = () => {
	const [ isPortrait, setIsPortrait ] = React.useState(getDeviceOrientation());
	React.useEffect(() => {
		const callback = () => setIsPortrait(getDeviceOrientation());
		const listener = Dimensions.addEventListener('change', callback);
		return () => { listener.remove(); };
	}, []);
	return {
		isPortrait,
		prefix: getPrefixFromOrientation(isPortrait),
	};
};

const getPrefixFromOrientation = (portrait) => {
	return portrait ? '1-' : '2-';
};

const Navbar = ({title}) => {
	return (
		<View style={styles.navBar}>
			<Text style={{ fontSize: 24 }}>{title}</Text>
		</View>
	);
};

export default function ProductList () {
	const layoutConfig = useOrientationChange();
	const renderProduct = ({ item }) => {
		const numColumns = layoutConfig.isPortrait ? 2 : 3;
		console.log({ numColumns });
		return (
			<View style={[styles.productCardContainer, {
				// display 2 items in a row when portrait mode, else 3
				width: (Dimensions.get('window').width - 20)/ numColumns
			}]}>
				<View style={styles.productCard}>
					<Image
						style={styles.productImage}
						source={item.productImageSource}
					/>
					<Text style={styles.productTitleTextStyle}>{item.productImageTitle}</Text>
					<Text style={styles.productPriceTextStyle}>{`$${item.productPrice}`}</Text>
				</View>
			</View>
		);
	}
	return (
		<SafeAreaView style={styles.pageContainer}>
			<Navbar title={`T-Shirts`} />
			<FlatList
				data={PRODUCT_LIST}
				renderItem={renderProduct}
				numColumns={layoutConfig.isPortrait ? 2 : 3}
				keyExtractor={(_item, index) => `${index.toString()}`}
				key={layoutConfig.prefix}
				scrollEnabled
			/>
		</SafeAreaView>
	); 
}

const styles = StyleSheet.create({
	pageContainer: {
		justifyContent: 'center',
		flex: 1,
		backgroundColor: '#efefef',
	},
	navBar: {
		padding: 20,
	},
	productsListContainer: {
		paddingRight: 20,
	},
	productCardContainer: {
		alignItems: 'center',
		justifyContent: 'center',
		paddingLeft: 20,
		paddingBottom: 20,
	},
	productCard: {
		backgroundColor: '#fff',
		borderColor: 'red',
		padding: 15,
		paddingTop: 25,
		borderRadius: 10,
		width: '100%',
		elevation: 10,
	},
	productImage: {
		height: 150,
		width: '100%',
		resizeMode: 'contain',
		marginBottom: 10,
	},
	productTitleTextStyle: {
		fontSize: 18,
		color: 'gray',
	},
	productPriceTextStyle: {
		fontWeight: 'bold',
		color: '#3d3d3d',
	},
});