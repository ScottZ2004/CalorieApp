import React, {useEffect, useState} from "react";
import Context from "./Context";
import jsonData from '../json/Temp.json';  

const ContextProvider = ({children}) => {
    const [maxCalories, setMaxCalories] = useState(2100);
    const [entries, setEntries] = useState([]);
    const [error, setError] = useState({});
    const [summaries, setSummaries] = useState([]);
    // this is temporary
    useEffect(() => {
        setSummaries(jsonData);
    }, [])
    // untill here
    return (
        <Context.Provider value={{ 
            maxCalories, setMaxCalories,
            entries, setEntries,
            error, setError,
            summaries
            }}>
            {children}
        </Context.Provider>
    );
}

export default ContextProvider;