
import '../styles/components/diceDndAtribute.css';

export function DiceDndAtribute({atribute}){

    return(

        <div className='dice_container'>
            <img className='dice_img' src="../src/assets/img/DiceDND.webp" alt="DiceDND" />
            <span className="dice_atribute">{atribute}</span>
        </div>
    )
}