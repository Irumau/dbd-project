import { Link } from "react-router";

import '../styles/components/ClassesDnd.css'

export function ClassesDnd({ dndClass }) {
  return (
    <Link className="classesDnd__link" to={`/class/${dndClass}`}>
      <div className="classesDnd__container">
        <img className="classesDnd__img" src={`../src/assets/img/${dndClass}.png`} alt={`${dndClass}`} />
        <h3 className="classesDnd__title">{dndClass}</h3>
      </div>
    </Link>
  );
}
