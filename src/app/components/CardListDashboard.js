import { MdOutlineDateRange, MdOutlineMoreHoriz } from "react-icons/md";
import { formatarData } from "../utils/formateDate";
import { stringToSlug } from "../utils/stringToSlug";

const CardListDashboard = ({item, action}) => {
    return(
        <div  key={item._id} className="card mb-3 p-4" onClick={action}>
            <div className="row">
                <div className="col-8 fs-3">
                    <h3 className="fw-bold">{item.title}</h3>
                </div>

                <div className="col-3 fs-3">
                    <div className="row">
                        <div className="col"></div>
                        <div className="col-1 text-end mb-5">
                            <MdOutlineMoreHoriz className="icon"/>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row mt-5">
                <div className="col-6"> 
                    <div className="fs-4 mb-0 lh-sm"><MdOutlineDateRange className="fs-3 mb-2"/> {formatarData(item.expiry)}</div>
                </div>
                <div className="col"></div>
                <div className="col-4 fs-5">
                    <div className={`status fw-bold ${stringToSlug(item.status)}`}>{item.status}</div>
                </div>
            </div>
        </div>
    )
}

export default CardListDashboard;