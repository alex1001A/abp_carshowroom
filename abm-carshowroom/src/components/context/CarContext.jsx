import React, { createContext, useContext, useState, useEffect } from 'react';

const CarContext = createContext();

export function CarProvider({ children }) {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://dummyjson.com/products/category/vehicle')
      .then((res) => res.json())
      .then((data) => {
        setVehicles(data.products);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
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