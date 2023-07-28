import { Text, View, StyleSheet, ScrollView } from 'react-native'
import React, { Component, useContext } from 'react'
import Context from '../../context/Context';

export default function Summary({summary}) {
    const {maxCalories} = useContext(Context);
    let totalCalories = 0;
    summary.entries.map((entry) => {
        totalCalories += entry.calories
    })

    const caloriesLeft = maxCalories - totalCalories;
    return (
      <View>
        <View style={styles.dayContainer}>
            <Text style={styles.dayTitle}>{summary.title}</Text>
            <Text style={styles.dayDate}>{summary.date}</Text>
        </View>
        <View style={styles.container}>
            <ScrollView style={styles.scrollContainer}>
                {summary.entries.map((entry, index) => (
                    <View style={styles.entryContainer}>
                        <Text style={styles.entryText}>{entry.name}</Text>
                        <Text style={styles.entryText}>{entry.calories}</Text>
                    </View>
                ))}
            </ScrollView>
            <View>
                <View style={styles.line}></View>
                <View style={styles.entryContainer}>
                    <Text style={styles.entryText}>Total kcal</Text>
                    <Text style={styles.entryText}>{totalCalories}</Text>
                </View>
                <View style={styles.entryContainer}>
                    <Text style={styles.entryText}>Max kcal</Text>
                    <Text style={styles.entryText}>{maxCalories}</Text>
                </View>
                <View style={styles.line}></View>
                <View style={styles.entryContainer}>
                    <Text style={styles.entryText}>Total kcal left</Text>
                    <Text style={styles.entryText}>{caloriesLeft}</Text>
                </View>
            </View>
        </View>
        
      </View>
    )
}

const styles = StyleSheet.create({
    dayContainer:{
        alignItems: 'center',
        marginBottom:20,
    },
    dayTitle:{
        fontSize: 60,
        fontWeight: 'bold',
        color: '#042B3D'
    },
    dayDate:{
        fontSize: 25,
        fontWeight: 'bold',
        color: '#042B3D'
    },
    container:{
        borderColor: "#146C94",
        borderWidth: 5,
        width: 300,
        height: 300,
        margin: 5,
        padding: 10,
        backgroundColor: "#61D1FF",
        borderRadius: 10
    },
    scrollContainer: {
        height: 10
    },
    entryContainer:{
        flexDirection: 'row',
        justifyContent: "space-between"
    },
    entryText:{
        fontSize: 20,
        fontWeight: "bold",
        marginVertical: 4
    },
    line:{
        borderWidth: 2,
        borderColor: '#146C94'
    }
});