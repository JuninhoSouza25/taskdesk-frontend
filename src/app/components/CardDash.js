import Image from "next/image";
import { CgMoreO } from "react-icons/cg";

const CardDash = ({title, bg, data, onClick}) => {
    return(
        <div className={`card-dash `} onClick={onClick}>
            <Image src={bg} fill={true} alt="BG" />
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