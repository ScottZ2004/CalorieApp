import React, {useEffect, useState} from "react";
import Context from "./Context";
import jsonData from '../json/Temp.json';  

const ContextProvider = ({children}) => {
    const [maxCalories, setMaxCalories] = useState(0);
    const [maxMoney, setMaxMoney] = useState(0);
    const [authenticationCode ,setAuthenticationCode] = useState("")

    const [entries, setEntries] = useState([]);
    const [error, setError] = useState({});
    const [summaries, setSummaries] = useState([]);

    // this is temporary
    useEffect(() => {
        setSummaries(jsonData);
    }, [])
    // untill here

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
            entries, setEntries,
            error, setError,
            summaries, addEntry,
            maxMoney, setMaxMoney,
            authenticationCode, setAuthenticationCode
            }}>
            {children}
        </Context.Provider>
    );
}

export default ContextProvider;