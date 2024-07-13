import React , {useContext} from 'react'
import noteContext from '../context/notes/noteContext';

const Noteitem = (props) => {
    const context = useContext(noteContext) ;
    const { note , updateNote} = props;
    const {deleteNote} = context ;

    return (
        <div className='col-md-3'>
            <div className="card my-3">
                    <div className="card-body">
                        {/* <div className='d-flex align-items-center'> */}
                            <h1 style={{color:'red', fontSize:'40px'}}>Title</h1>
                            <h5 className="card-title" ><strong>{note.title}</strong></h5>
                            {/* <br></br> */}
                            <hr></hr>
                            {/* <i className="far fa-trash-alt mx-2" style={{flex: '0 0 1px' }} onClick={()=>{  deleteNote(note._id)  ; props.showalert("Note Deleted Successfully", "success")}}></i>
                            <i className='far fa-edit mx-2 mx-2' style={{flex: '0 0 1px' }} onClick={()=>{ updateNote(note) }}></i> */}
                        {/* </div> */}
                        <p className="card-text">{note.description}</p>
                        <i className="far fa-trash-alt "  onClick={()=>{ deleteNote(note._id)  ; props.showalert("Note Deleted Successfully", "success")}}></i>
                        <i className='far fa-edit mx-2 '  onClick={()=>{ updateNote(note) }}></i>
                        
                    </div>
            </div>
        </div>
    )
}

export default Noteitem
