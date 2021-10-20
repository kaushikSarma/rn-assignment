import React from 'react';
import { Text, View, StyleSheet, TouchableHighlight } from 'react-native';

// from: https://usehooks-typescript.com/react-hook/use-interval
function useInterval(callback, delay) {
  const savedCallback = React.useRef(callback)
  // Remember the latest callback if it changes.
  React.useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  // Set up the interval.
  React.useEffect(() => {
    // Don't schedule if no delay is specified.
    if (delay === null) {
      return
    }

    const id = setInterval(() => savedCallback.current(), delay)

    return () => clearInterval(id)
  }, [delay])
}

export default function Timer() {
  const [ isRunning, setIsRunning ] = React.useState(false);
  const [ count, setCount ] = React.useState(0);
  
  useInterval(() => {
    setCount(count + 1);
  }, isRunning ? 1000 : null);

  const startTime = () => {
    !isRunning && setIsRunning(true);
  }
  const resetTime = () => {
    setCount(0);
  };
  const stopTime = () => {
    isRunning && setIsRunning(false);
  }
  return (
    <View style={styles.container}>
      <Text style={styles.counter}>{`Counter\n${count}`}</Text>
      <View style={styles.buttonContainer}>
        <TouchableHighlight onPress={stopTime}><Text style={styles.button}>Stop</Text></TouchableHighlight>
        <TouchableHighlight onPress={resetTime}><Text style={styles.button}>Reset</Text></TouchableHighlight>
        <TouchableHighlight onPress={startTime}><Text style={styles.button}>Start</Text></TouchableHighlight>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  counter: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 100
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  button: {
    color: 'blue',
    textTransform: 'uppercase',
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    textAlign: 'center'
  }
});
