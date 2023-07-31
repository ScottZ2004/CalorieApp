import React, {useEffect, useState} from "react";
import Context from "./Context";
import jsonData from '../json/Temp.json';  
import { Alert } from "react-native";
import axios from "axios";
axios.defaults.baseURL = "http://calorie-app-api.scottzico.com/api";

const ContextProvider = ({children}) => {
    const [maxCalories, setMaxCalories] = useState(2100);
    const [maxMoney, setMaxMoney] = useState(1000);
    const [authenticationCode ,setAuthenticationCode] = useState("LcBpSQr0XRgLKpd");
    const [authenticationText, setAuthenticationtext] = useState({
        show: false,
        color: "green",
        text: 'Successfully connected!'
    });

    const [error, setError] = useState({});
    const [summaries, setSummaries] = useState([]);
    //api functions
    const getSummaries = async () => {
        try {
            const response = await axios.get(`/summaries?AuthorizationKey=${authenticationCode}`);
            setSummaries(response.data);
        } catch (error) {
            Alert.alert("Couldn't fetch", "The server couldn't connect to the server", [
                {
                    text: "Ok",
                    style: "cancel"
                }
            ])
        }

    };
    const postSummaries = async () => {
        try {
          const response = await axios.post(`/summaries?AuthorizationKey=${authenticationCode}`, {

          });
          console.log(response.data);
        } catch (error) {
          if (error.response) {
            console.log('Response Error:', error.response.data);
          } else if (error.request) {
            console.log('Request Error:', error.request);
          } else {
            console.log('Error:', error.message);
          }
        }
        
    };

    const checkAuthentication = async () => {
        try {
            setAuthenticationtext({});
            const response = await axios.get(`/testAuthentication?AuthorizationKey=${authenticationCode}`);
            setAuthenticationtext({
                show: true,
                color: "green",
                text: 'Successfully connected!'
            })
        } catch (error) {
            setAuthenticationtext({
                show: true,
                color: "red",
                text: "Couldn't connect"
            })
        }
        
    };

    useEffect(() => {
        setMaxMoney(1000);
        setMaxCalories(2100);
        setAuthenticationCode("LcBpSQr0XRgLKpd")
        getSummaries();
    }, [])


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
        checkAuthentication();
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
            connectToUser, authenticationText
            }}>
            {children}
        </Context.Provider>
    );
}

export default ContextProvider;