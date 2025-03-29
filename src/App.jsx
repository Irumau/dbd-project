import { useState, useEffect } from "react";
import { ClassesDnd } from "./components/ClassesDnd.jsx";
import { Header } from "./components/Header.jsx";

import "./styles/pages/App.css";

function App() {
  const URL_API = "https://www.dnd5eapi.co/api/2014/";

  const [classes, setClasses] = useState([]);

  useEffect(() => {
    async function getData(endpoint) {
      const response = await fetch(URL_API + endpoint);
      const data = await response.json();
      setClasses(data.results);
    }
    getData("classes");
  }, []);

  return (
    <>
      <h2 className="classesDnd-section__title">Classes</h2>

      <section className="classesDnd__section">
        {classes.map((dndClass, index) => {
          return <ClassesDnd key={index} dndClass={dndClass.name} />;
        })}
      </section>
    </>
  );
}

export default App;
