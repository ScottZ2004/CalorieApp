import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Image, SafeAreaView, ScrollView, Pressable, Text, TextInput } from 'react-native';
import React, { useState } from 'react';
import SummaryContainer from './SummaryContainer/SummaryContainer';
import NewEntry from './NewEntry/NewEntry';
import Settings from '../settings/Settings';

export default function Home() {
  const [showSettings, setShowSettings] = useState(true);
  const toggleSettings = () => {
    setShowSettings(!showSettings);
  }
  return (
    <>
      <SafeAreaView style={styles.container}>
        <ScrollView>
          {!showSettings && (
            <>
              <Pressable style={[styles.settingsGear, {alignItems: 'flex-end'}]} onPress={toggleSettings}>
                <Image
                source={require('../../../assets/images/SettingGear.png')}
                />
              </Pressable>
              <SummaryContainer/>
              <NewEntry/>
            </>
          )}

          {showSettings && (
            <>
              <Pressable style={styles.settingsGear} onPress={toggleSettings}>
                <Image
                source={require('../../../assets/images/BackArrow.png')}
                />
              </Pressable>
              <Settings/>
            </>
          )}
        </ScrollView>
      </SafeAreaView>
      <StatusBar style="auto" />
      {!showSettings && (
        <View style={styles.topStatusBar}/>
      )}
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
    },
    settingsGear:{
      padding: 10,
      justifyContent: 'center'
  }
});
