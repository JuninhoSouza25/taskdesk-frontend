import Image from "next/image";
import { CgMoreO } from "react-icons/cg";
import { useSelector } from "react-redux";

const CardDash = ({title, bg, data, onClick}) => {
    const mode = useSelector((state) => state.mode.value)

    return(
        <div className={`card-dash ${mode ? 'dark-mode' : 'light-mode'}`} onClick={onClick}>
            <Image src={bg} 
            fill={true} 
            alt="BG"
            priority={true}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
            <div className="inner">
                <div className="row">
                    <div className="col-6">
                        <p>{data}</p>
                    </div>
                    <div className="col-6 card-dash-icon">
                        <CgMoreO />
                    </div>
                </div>
                <div className="row">
                    <h4>{title}</h4>
                </div>
            </div>
        </div>
    )
}
export default CardDash;