const input = [3, 12, 3, -1, 3, 11, 3, 4, 5, 12, 11, 45, 87, 12];

function frequent(arr) {
	if(!Array.isArray(arr)) {
		return `Invalid input! Please provide an array of numbers`;
	}
	if(arr.length === 0) {
		return `Empty array!`;
	}
	const frequencyMap = {};
	let maxFrequent = arr[0];
	for (let i = 0; i < arr.length; i++) {
		const currentElement = arr[i];
		const frequency = frequencyMap[currentElement] || 0;
		frequencyMap[currentElement] = frequency + 1;
		if(frequencyMap[maxFrequent] < frequencyMap[currentElement]) {
			maxFrequent = currenntElement;
		}
	}
	return `${maxFrequent} (${frequencyMap[maxFrequent]} times)`;
}

console.log(frequent(input));
