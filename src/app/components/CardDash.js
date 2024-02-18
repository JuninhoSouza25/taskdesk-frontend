
const CardDash = ({title, bg, data}) => {
    return(
        <div className={`card-dash ${bg}`}>

            <div className="row">
                <div className="col-6">
                    <p>{data}</p>
                </div>
            </div>
            <div className="row">
                <h4>{title}</h4>
            </div>
        </div>
    )
}
export default CardDash;