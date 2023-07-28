import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Image, SafeAreaView } from 'react-native';
import Context from '../../context/Context';
import React, { useContext } from 'react';
import Settings from '../Settings/Settings';

export default function Home() {
  return (
    <SafeAreaView style={styles.container}>
      <Settings/>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}
  
const styles = StyleSheet.create({
    container:{
      flex: 1,
      backgroundColor: '#19A7CE'
    }
});
