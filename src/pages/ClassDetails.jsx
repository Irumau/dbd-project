import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { ClassDndList } from "../components/ClassDndDetails.jsx";
import { DiceDndAtribute } from "../components/DiceDndAtribute.jsx";
import { ClassDndLevelsTable } from "../components/ClassDndLevelsTable.jsx";

import "../styles/pages/ClassDetails.css";
import { ClassesDnd } from "../components/ClassesDnd.jsx";

export function ClassDetails() {
  const URL_API = "https://www.dnd5eapi.co/api/2014/";
  const params = useParams();
  const [classDndDetail, setClassDndDetail] = useState(null);
  useEffect(() => {
    async function getClassDetail(endpoint) {
      try {
        const response = await fetch(URL_API + endpoint);
        if (!response.ok) {
          throw new Error(`Error en la peticion ${response.status}`);
        }

        const data = await response.json();
        console.log("Datos recibidos:", data);
        setClassDndDetail(data);
      } catch (error) {
        console.log("Error en la peticion", error);
      }
    }
    if (params.class) {
      getClassDetail(`classes/${params.class.toLowerCase()}`);
    }
  }, [params.class]);
  return (
    <section>
      {classDndDetail ? (
        <>
          <div
            style={{
              background: `linear-gradient(0deg,rgba(0,0,0,0.712), rgba(0,0,0,0.712)), 
              url(../src/assets/img/Background/${classDndDetail.name}Bg.webp) no-repeat center center / cover`,
            }}
            className="classDndDetail__container"
          >
            <Link to="/">
              <span className="classDndDetail__back-button">Back</span>
            </Link>
            <ClassesDnd dndClass={classDndDetail.name} />
            <div className="classDndDetail__hitDie-container">
              <span className="classDndDetail__hitDie">
                {classDndDetail.hit_die}
              </span>
            </div>
            <span className="classDndDetail__hitDie-text">HIT DIE</span>
          </div>
          <h2 className="classDndDetail__title">Proficiencies</h2>
          <article className="classDndDetail__proficiencies-article ">
            <ul className="classDndDetail__proficiencies-list">
              {classDndDetail.proficiencies.map((item, index) => {
                return (
                  <ClassDndList
                    name={item.name}
                    index={index}
                    key={item.index}
                  />
                );
              })}
            </ul>
          </article>
          <h2 className="classDndDetail__title">Proficiency Choices</h2>
          <article>
            {classDndDetail.proficiency_choices.map((proficiency_choises) => {
              {
                return (
                  <>
                    <h3
                      className="classDndDetail__subtitle"
                      key={`${proficiency_choises.type}`}
                    >
                      {proficiency_choises.desc}
                    </h3>
                    {proficiency_choises.choose >= 2 && (
                      <ul
                        className="classDndDetail__list"
                        key={`${proficiency_choises.type} ${params.class}`}
                      >
                        {proficiency_choises.from.options.map(
                          (option, index) => {
                            return (
                              <ClassDndList
                                key={option.item.name + index}
                                name={option.item.name}
                              />
                            );
                          }
                        )}
                      </ul>
                    )}

                    {proficiency_choises.choose === 1 && (
                      <ul>
                        {proficiency_choises.from.options.map(
                          (option, index) => {
                            return (
                              <>
                                <h4 key={option.choice.desc + index}>
                                  {option.choice.desc}
                                </h4>
                                {option.choice.from.options.map(
                                  (instrument) => {
                                    return (
                                      <ClassDndList
                                        key={instrument.item.index}
                                        name={instrument.item.name}
                                      />
                                    );
                                  }
                                )}
                              </>
                            );
                          }
                        )}
                      </ul>
                    )}
                  </>
                );
              }
            })}
          </article>
          {"spellcasting" in classDndDetail && (
            <>
              <h2 className="classDndDetail__title">Spellcasting</h2>
              <article className="classDndDetail__spellcasting-article">
                <ul>
                  {classDndDetail.spellcasting.info.map((info) => {
                    return (
                      <>
                        <h3 key={info.name}>{info.name}</h3>
                        {info.desc.map((desc, index) => {
                          return (
                            <p
                              className="classDndDetail__paragraph"
                              key={index + params.class}
                            >
                              {desc}
                            </p>
                          );
                        })}
                      </>
                    );
                  })}
                </ul>
                <h3 className="classDndDetail__subtitle">
                  Spellcasting Ability
                </h3>
                <DiceDndAtribute
                  atribute={
                    classDndDetail.spellcasting.spellcasting_ability.name
                  }
                />
              </article>
            </>
          )}
          <h2 className="classDndDetail__title">Saving Throws</h2>
          <article style={{ display: "flex" }}>
            {classDndDetail.saving_throws.map((saving_throws) => {
              return (
                <DiceDndAtribute
                  key={saving_throws.name}
                  atribute={saving_throws.name}
                />
              );
            })}
          </article>
          <h2 className="classDndDetail__title">Starting equipment</h2>
          <article>
            <ul>
              {classDndDetail.starting_equipment.map((item) => {
                return (
                  <ClassDndList
                    key={item.equipment.name}
                    name={item.equipment.name}
                  />
                );
              })}
            </ul>
          </article>
          <h2 className="classDndDetail__title">Starting Equipment Options</h2>
          <article>
            <ul>
              {classDndDetail.starting_equipment_options.map((option) => {
                return <ClassDndList key={option.desc} name={option.desc} />;
              })}
            </ul>
          </article>
          <h2 className="classDndDetail__title">Subclasses</h2>
          <article>
            <ul>
              {classDndDetail.subclasses.map((subclass) => {
                return (
                  <ClassDndList key={subclass.name} name={subclass.name} />
                );
              })}
            </ul>
          </article>

          {}

          <article className="ClassDndDetail__table-container">
            <h2 className="classDndDetail__title">The {params.class}</h2>

            <ClassDndLevelsTable
              url={URL_API}
              endpoint={`classes/${params.class}/levels`}
            />
          </article>
        </>
      ) : (
        <p>Cargando...</p>
      )}
    </section>
  );
}
