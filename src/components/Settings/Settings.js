import { StyleSheet, Text, View, TextInput } from 'react-native'
import React, { useState } from 'react'
import Context from '../../context/Context';

const Settings = () => {
  const {setMaxMoney, maxMoney, setMaxCalories, maxCalories, setAuthenticationCode, authenticationCode} = useState(Context);
  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.title}>Max Calories per day</Text>
        <TextInput
          value={maxCalories}
          style={styles.input}
          onChange={setMaxCalories}
          keyboardType='numeric'
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.title}>Max money per month</Text>
        <TextInput
          value={maxMoney}
          style={styles.input}
          keyboardType='numeric'
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.title}>Authentication code</Text>
        <TextInput
          value={authenticationCode}
          style={styles.input}
          keyboardType='numeric'
        />
      </View>
    </View>
  );
}

export default Settings

const styles = StyleSheet.create({
  container:{
    margin: 10
  },
  inputContainer:{
    padding: 5
  },
  title:{
    fontSize: 30,
    fontWeight: 'bold'
  },
  input:{
    backgroundColor: '#F6F1F1',
    padding: 5,
    fontSize: 20
  }
});