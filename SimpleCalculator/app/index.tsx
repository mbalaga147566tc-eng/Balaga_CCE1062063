import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

export default function Index() {
  const [firstNumber, setFirstNumber] = useState('');
  const [secondNumber, setSecondNumber] = useState('');
  const [result, setResult] = useState('');
  const [message, setMessage] = useState('');

  const calculate = (operator: string) => {
    setResult('');
    setMessage('');

    if (firstNumber.trim() === '' || secondNumber.trim() === '') {
      setMessage('Please enter both numbers.');
      return;
    }

    const num1 = Number(firstNumber);
    const num2 = Number(secondNumber);

    if (!Number.isFinite(num1) || !Number.isFinite(num2)) {
      setMessage('Please enter valid numbers only.');
      return;
    }

    let calculation: number;

    switch (operator) {
      case '+':
        calculation = num1 + num2;
        break;

      case '-':
        calculation = num1 - num2;
        break;

      case '*':
        calculation = num1 * num2;
        break;

      case '/':
        if (num2 === 0) {
          setMessage('Cannot divide by zero.');
          return;
        }
        calculation = num1 / num2;
        break;

      default:
        setMessage('Invalid operation.');
        return;
    }

    setResult(String(calculation));
  };

  const clearCalculator = () => {
    setFirstNumber('');
    setSecondNumber('');
    setResult('');
    setMessage('');
  };

  return (
    <View style={styles.container}>

      <Text style={styles.title}>Simple Calculator</Text>

      <View style={styles.resultContainer}>
        <Text style={styles.resultLabel}>Result</Text>

        <Text style={styles.result}>
          {result !== '' ? result : '0'}
        </Text>

        {message !== '' && (
          <Text style={styles.message}>{message}</Text>
        )}
      </View>

      <Text style={styles.label}>First Number</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter first number"
        placeholderTextColor="#888"
        keyboardType="numeric"
        value={firstNumber}
        onChangeText={setFirstNumber}
      />

      <Text style={styles.label}>Second Number</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter second number"
        placeholderTextColor="#888"
        keyboardType="numeric"
        value={secondNumber}
        onChangeText={setSecondNumber}
      />

      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => calculate('+')}
        >
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => calculate('-')}
        >
          <Text style={styles.buttonText}>−</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => calculate('*')}
        >
          <Text style={styles.buttonText}>×</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => calculate('/')}
        >
          <Text style={styles.buttonText}>÷</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.clearButton}
        onPress={clearCalculator}
      >
        <Text style={styles.clearButtonText}>Clear</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 25,
    paddingTop: 60,
  },

  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#222',
    marginBottom: 20,
  },

  resultContainer: {
    backgroundColor: '#e8f5e9',
    borderRadius: 12,
    padding: 15,
    alignItems: 'center',
    marginBottom: 25,
    minHeight: 90,
    justifyContent: 'center',
  },

  resultLabel: {
    fontSize: 16,
    color: '#388e3c',
    fontWeight: '600',
  },

  result: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2e7d32',
    marginTop: 3,
  },

  message: {
    color: '#d32f2f',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 5,
  },

  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 7,
  },

  input: {
    height: 55,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 18,
    marginBottom: 18,
  },

  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
  },

  button: {
    backgroundColor: '#2563eb',
    width: 65,
    height: 55,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonText: {
    color: '#fff',
    fontSize: 27,
    fontWeight: 'bold',
  },

  clearButton: {
    backgroundColor: '#e0e0e0',
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
  },

  clearButtonText: {
    fontSize: 17,
    fontWeight: '600',
    color: '#333',
  },
});
