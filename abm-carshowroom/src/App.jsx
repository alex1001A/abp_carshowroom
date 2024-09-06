import { useState, useEffect } from "react";
import "./App.css";

import Car from "./components/Car";

export default function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("https://dummyjson.com/products/category/vehicle")
      .then((res) => res.json())
      .then((data) => {
        console.log(data.products);
        setData(data.products);
      })
      .catch((error) => console.error("Ошибка при загрузке данных:", error));
  }, []);

  

  return (
    <div className="App">
      {data.map((item) => {
        return <Car car={item} key={item.id}/>;
      })}
    </div>
  );
}
