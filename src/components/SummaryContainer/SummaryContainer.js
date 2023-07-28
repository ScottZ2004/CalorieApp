import { Text, View, StyleSheet, ScrollView } from 'react-native'
import React, { Component, useContext } from 'react'
import Summary from '../Summary/Summary';
import Context from '../../context/Context';

export function SummaryContainer() {
    const {summaries} = useContext(Context);
    const ITEM_WIDTH = 310; // Adjust this value based on the width of your Summary component
    const SPACING = 0; // Adjust this value based on your desired spacing between Summary components
    return (
      <View style={styles.container}>
        
        <ScrollView
            style={styles.summaryContainer}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            snapToInterval={ITEM_WIDTH + SPACING}
            decelerationRate="fast"
            contentContainerStyle={{
                paddingHorizontal: SPACING / 2,
            }}
        >
            {summaries.map((summary, index) => (
                <Summary key={index} summary={summary} />
            ))}
        
        </ScrollView>
      </View>
    )
}

const styles = StyleSheet.create({
    container:{
        alignItems: 'center',
        marginBottom: 10
    },
    summaryContainer:{
        flexDirection: 'row',
        width: 310
    }
});

export default SummaryContainer