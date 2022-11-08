import React from "react";


function Todos({id, texto, completado, completarTarea, eliminarTarea}){
    return(
        <div className={completado ? "todos-container completado" : "todos-container"}>
            <div className="todos-texto" 
            onClick={() => completarTarea(id)}>
            {texto}
            </div>
            <div className="todo-icon" 
            onClick={() => eliminarTarea(id)}>
            <i className="fa-solid fa-trash"></i>
            </div>
        </div>
    )
}

export default Todos;