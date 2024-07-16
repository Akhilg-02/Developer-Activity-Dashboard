import {useState, useEffect, useContext, createContext, ReactNode } from 'react';
import UseActivityDataHook from '../customHook/UseActivityDataHook';


interface ActivityContextType {
  data: any; 
  selectedName: string;
  selectedData: any | null; 
  setSelectedName: React.Dispatch<React.SetStateAction<string>>;
  setSelectedData: React.Dispatch<React.SetStateAction<any | null>>;
}

const defaultContextValue: ActivityContextType = {
  data: null,
  selectedName: '',
  selectedData: null,
  setSelectedName: () => {},
  setSelectedData: () => {},
};

// Create the context
const ActivityContext = createContext<ActivityContextType>(defaultContextValue);

export const  ActivityProvider: React.FC<{ children: ReactNode }> = ({ children }:any) => {
  const data = UseActivityDataHook();
  const [selectedName, setSelectedName] = useState('');
  const [selectedData, setSelectedData] = useState(null);

  useEffect(() => {
    if (data && data.rows && data.rows.length > 0) {
      const firstElem = data.rows[0].name;
      setSelectedName(firstElem);
      const userData = data.rows.find((row) => row.name === firstElem);
      setSelectedData(userData || null);
    }
  }, [data]);



  return (
    <ActivityContext.Provider value={{ data, selectedName, selectedData,setSelectedName,setSelectedData }}>
      {children}
    </ActivityContext.Provider>
  );
};

export const useActivityContext = () => {
  return useContext(ActivityContext);
};
