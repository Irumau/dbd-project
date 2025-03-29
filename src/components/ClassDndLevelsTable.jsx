import { useEffect, useState } from "react";

import '../styles/components/ClassDndLevelsTable.css';

export function ClassDndLevelsTable({ url, endpoint }) {
  const [classDndLevels, setClassDndLevels] = useState([]);
  useEffect(() => {
    async function getLevels(url, endpoint) {
      try {
        const response = await fetch(url + endpoint.toLowerCase());
        const data = await response.json();

        setClassDndLevels(data);
      } catch (error) {
        console.log(error);
      }
    }
    getLevels(url, endpoint);
  }, []);

  console.log('TABLE DATA: ', classDndLevels)

  return (
    <table className="classDndLevelsTable">
      <thead style={{ display: "table-header-group", verticalAlign: "middle" }}>
        <tr style={{ display: "table-row" }}>
          {classDndLevels.length > 0 &&
            Object.keys(classDndLevels[0])
              .filter(
                (item) =>
                  item !== "updated_at" &&
                  item !== "index" &&
                  item !== "url" &&
                  item !== "class" &&
                  item !== "class_specific" &&
                  item !== "ability_score_bonuses" &&
                  item !== "spellcasting"
              )

              .map((header, index) => {
                const headerName = header.split("_").join(" ");
                return <th key={`${headerName} ${index}`}>{headerName}</th>;

              })}

              {
                classDndLevels.length > 0 && 'spellcasting' in classDndLevels[0] && (
                  Object.keys(classDndLevels[0].spellcasting).map((spellHeaders)=>{
                    return <th key={`${spellHeaders}`}>{spellHeaders.split("_").join(" ")}</th>;
                  })
                )
              }

          {classDndLevels.length > 0 &&
            Object.keys(classDndLevels[0].class_specific).map((header) => {
              const headerName = header.split("_").join(" ");
              return <th key={`${headerName}`}>{headerName}</th>;
            })}
        </tr>
      </thead>
      <tbody style={{ display: "table-row-group" }}>
        {classDndLevels.map((item, index) => {
          const classSpecific = Object.keys(item.class_specific);
          return (
            <tr style={{ display: "table-row" }} key={index}>
              <td className="classDndLevelsTable__level" key={item.level + index}>{item.level}</td>
              <td key={item.prof_bonus}>+ {item.prof_bonus}</td>
              {
                
                item.features.length === 0 && (
                  <td>No feature</td>
                )
              }
              {item.features.map((feature) => { 
                return (
                    <tr key={feature.name}>
                    <td key={feature.name}>{feature.name}</td>
                  </tr>
                );
              })}
              {
                classDndLevels.length > 0 && 'spellcasting' in classDndLevels[0] && (
                  Object.keys(classDndLevels[0].spellcasting).map(spellsInfo =>{
                    return <td key={spellsInfo}>{item.spellcasting[spellsInfo]}</td>
                  })
                  )
                
              }
              {/* {classSpecific.map((specific) => {
                console.log(item.class_specific.martial_arts);
                return (
                    <td key={specific}>{item.class_specific[specific]}</td>
                );
              })} */}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
