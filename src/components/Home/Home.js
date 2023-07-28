import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Image, SafeAreaView, ScrollView } from 'react-native';
import Context from '../../context/Context';
import React, { useContext } from 'react';
import Settings from '../Settings/Settings';
import SummaryContainer from '../SummaryContainer/SummaryContainer';
import NewEntry from '../NewEntry/NewEntry'

export default function Home() {
  return (
    <>
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <Settings/>
          <SummaryContainer/>
          <NewEntry/>
        </ScrollView>
      </SafeAreaView>
      <View style={styles.topStatusBar}/>
      <StatusBar style="auto" />
    </>
  );
}
  
const styles = StyleSheet.create({
    container:{
      flex: 1,
      backgroundColor: '#19A7CE'
    },
    topStatusBar:{
      backgroundColor: '#146C94',
      height: 34
    }
});
