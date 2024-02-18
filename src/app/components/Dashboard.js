import CardDash from "./CardDash";

const Dashboard = ({tasks}) => {
 

    return(
        <div className="container">
            <div className="row mb-2">
                <div className="col-12 p-3">
                    <h1>Dashboard</h1>
                </div>
            </div>
            <div className="row mb-2">
                <div className="col-12">
                    <h3>Resumo das tarefas</h3>
                </div>
            </div>
            <div className="row mb-4">
                <div className="col-6">
                    <CardDash title={'Total de tarefas'} bg={'bg-1'} data={tasks.length}/>
                </div>
                <div className="col-6">
                    <CardDash title={'A fazer'} bg={'bg-2'} data={tasks.filter(item => item.status === 'A fazer').length}/>
                </div>
            </div>
            <div className="row">
                <div className="col-6">
                    <CardDash title={'Em progresso'} bg={'bg-3'} data={tasks.filter(item => item.status === 'Em progresso').length}/>
                </div>
                <div className="col-6">
                    <CardDash title={'Finalizadas'} bg={'bg-4'} data={tasks.filter(item => item.status === 'Finalizada').length}/>
                </div>
            </div>
        </div>
    )
}

export default Dashboard;