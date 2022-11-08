import React from "react";


function Todos({id, texto, tareaCompletada, completarTarea, eliminarTarea}){
    return(
        <div className={tareaCompletada ? "todos-container completada" : "todos-container"}>
            <div className="todos-texto" onClick={() => completarTarea(id)}>
            {texto}
            </div>
        </div>
    );
};

export default Todos;