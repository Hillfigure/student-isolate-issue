import './App.css';
import { csv } from 'd3';
import csvData from "./wincdata.csv";
import { useEffect, useState } from 'react';

function App() {

  const [data, setData] = useState();
  const [nameList, setNameList] = useState();

  useEffect( () => { 
    console.log("entering useEffect")
    const getData = () => {csv(csvData).then((response) => {
        const cleanedData = response.map(row => {
          return {
              ...row,
              difficulty: +row.difficulty,
              funFactor: +row.funFactor,
          }
      })  
      setData(cleanedData)
      })
    }
    getData();
    console.log("exiting useEffect")
  }, [])

  const getNames = () => {
    console.log("entering getNames")
    const names = []
    if(data){
        data.map((student) => {
        if(!names.find(item => item.name === student.name)) {
          names.push({name: student.name})
        }
      }) 
      setNameList(names)
      console.log("exiting getNames")
    }
  }

  if(!nameList && data) {
    getNames();
  }

  console.log("data", data)
  console.log("namelist", nameList)


  return (
    <div className="App">
      {/* {nameList.map(e => console.log(e))} */}
    </div>
  );
}

export default App;