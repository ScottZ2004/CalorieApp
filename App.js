import Home from "./src/components/Home/Home";
import React from "react";
import ContextProvider from './src/context/ContextProvider';

export default function App() {
  return (
    <ContextProvider>
      <Home></Home>
    </ContextProvider> 
  );
}
