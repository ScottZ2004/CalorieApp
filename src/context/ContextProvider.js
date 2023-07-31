import React, {useEffect, useState} from "react";
import Context from "./Context";
import jsonData from '../json/Temp.json';  
import { Alert } from "react-native";

const ContextProvider = ({children}) => {
    const [maxCalories, setMaxCalories] = useState(2100);
    const [maxMoney, setMaxMoney] = useState(1000);
    const [authenticationCode ,setAuthenticationCode] = useState("")

    const [error, setError] = useState({});
    const [summaries, setSummaries] = useState([]);

    // this is temporary
    useEffect(() => {
        setSummaries(jsonData);
    }, [])
    // untill here

    const getMonthName = (month) => {
        switch(month){
            case 1:
                return 'January';
            case 2:
                return 'February';
            case 3:
                return 'March';
            case 4:
                return 'April';
            case 5:
                return 'May';
            case 6:
                return 'June';
            case 7:
                return 'July';
            case 8:
                return 'August';
            case 9:
                return 'September';
            case 10:
                return 'October';
            case 11:
                return 'November';
            case 12:
                return 'December';
        }
    }

    useEffect(() => {
        let monthsAndYear = [];
        summaries.map((summary) => {
            const dateArray = summary.date.split('/');

            let month = parseInt(dateArray[1]) ;
            let year = dateArray[2];
            let entryPrices = 0;
            let monthAlreadyExists = true;
            monthsAndYear.map((monthAndYear) => {
                if(monthAndYear.month === month && monthAndYear.year === year){
                    summary.entries.map((entry) => {
                        entryPrices += entry.price;
                    })
                    monthAndYear.prices = [
                        ...monthAndYear.prices,
                        entryPrices
                    ]
                    monthAlreadyExists = false;
                    return;
                }
                monthAlreadyExists = true;
            });
            if(monthAlreadyExists){
                summary.entries.map((entry) => {
                    entryPrices += entry.price
                })
                monthsAndYear.push({month: month, year: year, prices:[
                    entryPrices
                ]}); 
            }
        });
        monthsAndYear.map((monthAndYear) => {
            let priceThisMonth = 0;
            monthAndYear.prices.map((price) => {
                priceThisMonth += price
            })
            if(priceThisMonth > maxMoney){
                Alert.alert('Monthly limit exceeded',
                 'The limit of $' + maxMoney + ' for the month ' + getMonthName(monthAndYear.month) + ' of the year ' + monthAndYear.year + ' has been exceeded.'),
                 [
                    {
                        text: 'Ok',
                        style: 'cancel'
                    }
                 ]
            }
        })
    }, [summaries]);

    const connectToUser = () => {
        console.log('connetn')
    }

    const addEntry = (name, calories, price, dateAndTime) => {
        let newSummaries = [];
        const dayEntry = summaries.filter((entry) =>{
            if(dateAndTime.date === entry.date){
                return entry
            }
        });
        if(dayEntry.length <= 0){
            newSummaries = [
                ...summaries,
                {
                    "title": "Temporary",
                    "date": dateAndTime.date,
                    "entries": [
                        {
                            "name": name,
                            "calories": parseInt(calories),
                            "time": dateAndTime.time,
                            "price": parseInt(price)
                        }
                    ]            
                }
            ]
        }else{
            const newEntries = [
                ...dayEntry[0].entries,
                {
                    "name": name,
                    "calories":  parseInt(calories),
                    "time":  dateAndTime.time,
                    "price": parseInt(price)
                }
            ];
            newSummaries = summaries.map((summary) => {
                if(dayEntry[0].id === summary.id){
                    summary.entries = newEntries
                }
                return summary;
            });
        }

        setSummaries(newSummaries);
    }
    return (
        <Context.Provider value={{ 
            maxCalories, setMaxCalories,
            error, setError,
            summaries, addEntry,
            maxMoney, setMaxMoney,
            authenticationCode, setAuthenticationCode,
            connectToUser, 
            }}>
            {children}
        </Context.Provider>
    );
}

export default ContextProvider;