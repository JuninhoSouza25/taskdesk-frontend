import { MdOutlineDateRange, MdOutlineMoreHoriz } from "react-icons/md";
import { formatarData } from "../utils/formateDate";
import { stringToSlug } from "../utils/stringToSlug";

const CardKanban = ({key, title, date, status, action=null}) => {
    return(
        <div  key={key} className="card mb-3 p-4" onClick={action}>
            <div className="row">
                <div className="col-8">
                    <h4 className="fw-bold">{title}</h4>
                </div>

                <div className="col-3 fs-5">
                    <div className="row">
                        <div className="col"></div>
                        <div className="col-1 text-end mb-5">
                            <MdOutlineMoreHoriz className="icon"/>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row mt-3">
                <div className="col-5">
                    <p className="fs-6 mb-0 lh-sm"><MdOutlineDateRange className="fs-3 mb-2"/> {formatarData(date)}</p>
                </div>
                <div className="col"></div>
                <div className="col-5 fs-6">
                    <div className={`status fw-bold ${stringToSlug(status)}`}>{status}</div>
                </div>
            </div>
        </div>
    )
}

export default CardKanban;