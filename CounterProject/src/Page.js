import React from 'react';
import { Dimensions, SafeAreaView, Text, View } from 'react-native';

const Header = ({route}) => {
	return (
		<View style={{flexDirection: 'row', padding: 16}}>
			<Text style={{ marginLeft: 20, fontSize: 20, fontWeight: 'bold' }}>{route.name}</Text>
		</View>
	);
}

const getDeviceOrientation = () => {
	const dimension = Dimensions.get('window');
	return dimension.height > dimension.width;
}

const useOritationChange = () => {
	const [ isPortrait, setIsPortrait ] = React.useState(getDeviceOrientation());
	const [ dimension, setDimension ] = React.useState(Dimensions.get('window'));
	React.useEffect(() => {
		const setOritentationCallback = () => {
			setIsPortrait(getDeviceOrientation());
			setDimension(Dimensions.get('window'));
		};
		const orientationChangeListener = Dimensions.addEventListener('change', setOritentationCallback);
		return () => {
			orientationChangeListener.remove();
		}
	}, []);
	return {
		isPortrait,
		dimension
	};
};

const Screen = ({route}) => {
	const { dimension } = useOritationChange();

	return (
		<SafeAreaView style={{ height: dimension.height - 52 }}>
			<Header route={route} />
			<View style={{ 
				flex: 1,
				flexDirection: 'column',
				alignContent: 'center',
				justifyContent: 'center',
				alignItems: 'center' 
			}}>
				<Text>{route.name}</Text>
			</View>
		</SafeAreaView>
	);
};

export default Screen;