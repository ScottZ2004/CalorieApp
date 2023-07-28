import { StyleSheet, Text, TextInput, View, Button, Pressable, Platform, TouchableOpacity } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import Context from '../../context/Context';
import DateTimePicker from '@react-native-community/datetimepicker';


const NewEntry = () => {
    const {error, setError} = useContext(Context);
    const [name, setName] = useState("");
    const [calories, setCalories] = useState("");
    const [price, setPrice] = useState("");
    const [date, setDate] = useState(new Date())
    const [dateAndTime, setDateAndTime] = useState("");
    const [showPicker, setShowPicker] = useState(false);
    const toggleDatepicker = () => {
        setShowPicker(!showPicker);
    }

    const onchageDate = ({type}, selectedDate) => {
        if (type == "set"){
            const currentDate = selectedDate;
            setDate(currentDate)

            if(Platform.OS === "android"){
                toggleDatepicker();
                setDateAndTime(currentDate.toDateString());
            }
        }else{
            toggleDatepicker();
        }
    }

    const confirmIOSDate = () => {
        setDateAndTime(date.toDateString());
        toggleDatepicker()
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Add a new meal for today</Text>
            <View style={styles.inputsContainer}>
                <View style={styles.inputContainer}>
                    <Text style={styles.text}>Name</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={setName}
                    />
                </View>
            </View>
            <View style={styles.inputsContainer}>
                <View style={styles.inputContainer}>
                    <Text style={styles.text}>Calories (in kcal)</Text>
                    <TextInput
                        style={styles.input}
                        keyboardType='numeric'
                        onChangeText={setCalories}
                    />
                </View>
            </View>
            <View style={styles.inputsContainer}>
                <View style={styles.inputContainer}>
                    <Text style={styles.text}>Price (in $)</Text>
                    <TextInput
                        style={styles.input}
                        keyboardType='numeric'
                        onChangeText={setPrice}
                    />
                </View>
            </View>
            <View style={styles.inputsContainer}>
                <View style={styles.inputContainer}>
                    <Text style={styles.text}>Date and Time</Text>
                    {showPicker && ( <DateTimePicker
                        mode="datetime"
                        display='spinner'
                        value={date}
                        onChange={onchageDate}
                        style={styles.datePicker}
                        maximumDate={new Date()}
                    />
                    )}
                    {showPicker && Platform.OS === "ios" && (
                        <View style={{flexDirection: "row", justifyContent: "space-around", width:'100%'}}>
                            <TouchableOpacity style={[
                                    styles.button,
                                    styles.pickerbutton,
                                    {backgroundColor: "#042B3D"}
                                ]}
                                onPress={toggleDatepicker}>
                                <Text style={{color:"#F6F1F1", fontWeight: 'bold'}}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[
                                    styles.button,
                                    styles.pickerbutton,
                                    {backgroundColor: "#61D1FF"}
                                ]}
                                onPress={confirmIOSDate}>
                                <Text style={{color:"#042B3D", fontWeight: 'bold'}}>Confirm</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                    
                    {!showPicker && (
                        <Pressable style={{width:'100%'}} onPress={toggleDatepicker}>
                            <TextInput
                                style={styles.input}
                                editable={false}
                                placeholder= {"28-7-2023"}
                                onChangeText={setDateAndTime}
                                placeholderTextColor={"#11182744"}
                                value={dateAndTime}
                                onPressIn={toggleDatepicker}
                            />
                        </Pressable>
                    )}
                
                </View>
            </View>
            <View style={styles.inputsContainer}>
                <View style={styles.submitContainer}>
                    <Text style={styles.error}>{error.form}</Text>
                    <View style={styles.button}>
                        <Button style={styles.button} color={'#042B3D'} title='Add meal' onPress={() => sendForm()} />
                    </View>
                </View>
            </View>
        </View>
    )
}

export default NewEntry

const styles = StyleSheet.create({
    container:{
        alignItems: 'center',
        backgroundColor: '#146C94',
        height: '100%',
        padding: 10
    },
    title:{
        color: '#F6F1F1',
        fontSize: 27,
        fontWeight: 'bold',
        padding: 5,
        width: 330,
        marginBottom: 5,
    },
    inputsContainer:{
        width: 330,
    },
    inputContainer:{
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginVertical: 5
    },
    input:{
        backgroundColor: "#F6F1F1",
        width: '100%',
        height: 40,
        borderRadius: 4,
        padding: 3
    },
    text:{
        fontSize: 23,
        fontWeight: 'bold',
        color: '#F6F1F1',
    },
    submitContainer:{
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        flexDirection: 'row',
        marginVertical: 5
    },
    error:{
        color: '#FF6868',
        fontWeight: 'bold',
        fontSize: 17,
    },
    button:{
        backgroundColor: "#61D1FF",
        width: 130,
        borderRadius: 4,
        height: 35,
        justifyContent: 'center',
        alignItems: 'center'
    },
    datePicker:{
        heigth:120,
        marginTop: -10
    }
})