import { useState, useEffect } from 'react';
import sampleData from '../assets/data/sample-data.json';

const UseActivityDataHook = () => {
  const [data, setData] = useState<any | null>(null); 

  useEffect(() => {
    const fetchData = () => {
      setTimeout(() => {
        setData(sampleData.data.AuthorWorklog);
      }, 1000);
    };

    if(true){
     fetchData();
    }
  }, []);


  return data;
};

export default UseActivityDataHook;
