import React, { useState } from "react";
import TareaFormulario from "./Formulario.jsx";

function Home() {
	return (
		<div className="toDos">
			<div className="title">
				<h1>Todos</h1>
			</div>
			<div className="tareas-list">
				<ToDosList />
			</div>
		</div>
	);
};




export function ToDosList(){
	const [tareas, setTareas] = useState([]);

	const agregarTodos = tarea => {
		console.log("Tarea agregada");
		console.log(tarea); 
	}
    return(
		<>
			<TareaFormulario />
			<div className="todos-list-container">
				{tareas.map((tarea) =>
					<Todos texto={tarea.texto}
					completada={tarea.tareaCompletada}/>
					) 
				};
			</div>
		</>
    );
};



export default Home;

