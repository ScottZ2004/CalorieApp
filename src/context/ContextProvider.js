import React, {useState} from "react";
import Context from "./Context";
import {getCurrentDateTime} from '../Functions/Functions'     

const ContextProvider = ({children}) => {
    const [maxCalories, setMaxCalories] = useState(2100);
    const [entries, setEntries] = useState([
        {
            name: "pataje oorlog",
            calories: 300,
            date: getCurrentDateTime(),
            price: 21
        }
    ])
    const [selectedDay, setSelectedDay] = useState({
        date: getCurrentDateTime(),
        title: "Today"
    })
    return (
        <Context.Provider value={{ 
            maxCalories, setMaxCalories,
            entries, setEntries
            
            }}>
            {children}
        </Context.Provider>
    );
}

export default ContextProvider;