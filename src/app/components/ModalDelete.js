import {RiErrorWarningLine, RiDeleteBin2Line} from 'react-icons/ri'

export default function ModalDelete({task, function1, function2}){
  return(
    <div className='popup-wrapper'>
      <div className='popup-container px-3 py-5 d-flex flex-column'>
        <div className='col-12 py-3 text-center'>
          <RiErrorWarningLine className='popup-icon-danger text-danger' />
        </div>
        <div className='row text-center'>
          <p className='fs-2'>{`Tem certeza que gostaria de deletar a tarefa: ${task}`}</p>
        </div>
        <div className='row col d-flex justify-content-center gap-3'>
          <button 
          className='col-10 py-4 px-2 col-md-5 fs-4 bg-danger rounded text-white border-0'
          onClick={function1}>
            <RiDeleteBin2Line className='text-white fs-3 me-2'/>
            DELETAR
          </button>
          <button 
          className='col-10 py-4 px-2 col-md-5 fs-4 rounded text-white border-0' 
          style={{backgroundColor:'var(--color-extra02)'}}
          onClick={function2}>CANCELAR</button>
        </div>
      </div>
    </div>
  )
}