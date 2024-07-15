import { createContext, useState, useEffect, useContext } from 'react';
import UseActivityDataHook from '../customHook/UseActivityDataHook';

const ActivityContext = createContext();

export const ActivityProvider = ({ children }) => {
  const data = UseActivityDataHook();
  const [selectedName, setSelectedName] = useState('');
  const [selectedData, setSelectedData] = useState(null);

  useEffect(() => {
    if (data && data.rows && data.rows.length > 0) {
      const firstElem = data.rows[0].name;
      setSelectedName(firstElem);
      const userData = data.rows.find((row) => row.name === firstElem);
      setSelectedData(userData);
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
