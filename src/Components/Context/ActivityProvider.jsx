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

  const handleChange = (event) => {
    const name = event.target.value;
    setSelectedName(name);

    if (data && data.rows) {
      const userData = data.rows.find((row) => row.name === name);
      setSelectedData(userData);
    } else {
      console.log('Data is not yet available');
    }
  };

  return (
    <ActivityContext.Provider value={{ data, selectedName, selectedData, handleChange }}>
      {children}
    </ActivityContext.Provider>
  );
};

export const useActivityContext = () => {
  return useContext(ActivityContext);
};
