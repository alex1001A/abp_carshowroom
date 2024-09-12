import React, { createContext, useContext, useState, useEffect } from 'react';

const CarContext = createContext();

export function CarProvider({ children }) {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await fetch('https://dummyjson.com/products/category/vehicle');
        if (!response.ok) throw new Error('Ошибка загрузки данных');
        const data = await response.json();
        setVehicles(data.products);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchVehicles();
  }, []);

  return (
    <CarContext.Provider value={{ vehicles, loading, error }}>
      {children}
    </CarContext.Provider>
  );
}

export function useVehicles() {
  return useContext(CarContext);
}