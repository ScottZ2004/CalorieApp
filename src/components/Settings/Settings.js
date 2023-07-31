import { StyleSheet, Text, View, TextInput, Button } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import Context from '../../context/Context';

const Settings = () => {
  const {setMaxMoney, maxMoney, setMaxCalories, maxCalories, setAuthenticationCode, authenticationCode, connectToUser, authenticationText} = useContext(Context);
  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.title}>Max Calories per day</Text>
        <TextInput
          defaultValue={maxCalories.toString()}
          style={styles.input}
          onChangeText={setMaxCalories}
          keyboardType='numeric'
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.title}>Max money per month</Text>
        <TextInput
          defaultValue={maxMoney.toString()}
          onChangeText={setMaxMoney}
          style={styles.input}
          keyboardType='numeric'
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.title}>Authentication code</Text>
        <TextInput
          defaultValue={authenticationCode}
          onChangeText={setAuthenticationCode}
          style={styles.input}
        />
      </View>
      <View style={styles.button}>
        <Button style={styles.button} title='Connect to user' color='black' onPress={connectToUser} />
      </View>
      {authenticationText.show === true && (
        <View style={styles.inputContainer}>
          <Text color={styles.color} >{authenticationText.text}</Text>
        </View>
      )}
    </View>
  );
}

export default Settings

const styles = StyleSheet.create({
  container:{
    margin: 10
  },
  inputContainer:{
    margin: 5
  },
  title:{
    fontSize: 30,
    fontWeight: 'bold'
  },
  input:{
    backgroundColor: '#F6F1F1',
    padding: 5,
    fontSize: 20,
    borderRadius: 4
  },
  button:{
    margin: 5,
    width: '50%',
    backgroundColor: "#146C94",
    borderRadius: 4,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center'
  }
});