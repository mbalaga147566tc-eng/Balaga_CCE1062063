import { useState } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default function CounterApp() {
  const [count, setCount] = useState(0);

  const increase = () => {
    setCount(count + 1);
  };

  const decrease = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };

  const reset = () => {
    setCount(0);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Counter App</Text>

      <Text style={styles.counter}>{count}</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.increaseButton]}
          onPress={increase}
        >
          <Text style={styles.buttonText}>Increase</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.decreaseButton]}
          onPress={decrease}
        >
          <Text style={styles.buttonText}>Decrease</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.resetButton]}
          onPress={reset}
        >
          <Text style={styles.resetText}>Reset</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111',
    justifyContent: 'center',
    alignItems: 'center',
  },

  title: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
  },

  counter: {
    color: '#fff',
    fontSize: 60,
    fontWeight: 'bold',
    marginBottom: 40,
  },

  buttonContainer: {
    flexDirection: 'row',
    gap: 10,
  },

  button: {
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 6,
  },

  increaseButton: {
    backgroundColor: '#22c55e',
  },

  decreaseButton: {
    backgroundColor: '#ef4444',
  },

  resetButton: {
    backgroundColor: '#fff',
  },

  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },

  resetText: {
    color: '#111',
    fontWeight: 'bold',
  },
});
