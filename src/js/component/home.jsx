import React, { useState } from "react";
import TareaFormulario from "./Formulario.jsx";
import Todos from "./Todos.jsx";

/* Title */
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



/* Lista de Tareas */
export function ToDosList(){
	const [tareas, setTareas] = useState([]);

	const agregarTodos = tarea => {
		console.log(tarea);
		if(tarea.texto.trim()){
		tarea.texto = tarea.texto.trim();

		const todosActualizados = [tarea, ...tareas];
		setTareas(todosActualizados);
		};
	};

	const eliminarTarea = id => {
		const todosActualizados =  tareas.filter(tarea => tarea.id !== id);
		setTareas(todosActualizados);
	};

	const completarTarea = id => { 
		const todosActualizados = tareas.map(tarea => {
			if(tarea.id === id){
				console.log(tarea)
				tarea.completado = !tarea.completado;
			}
			return tarea;
		});
		setTareas(todosActualizados);
	};
    return(
		<>
			<TareaFormulario onSubmit={agregarTodos} />
			<div className="todos-list-container">
				{tareas.map((tarea) =>
					<Todos 
					key={tarea.id}
					id={tarea.id}
					texto={tarea.texto}
					completado={tarea.completado}
					completarTarea={completarTarea}
					eliminarTarea={eliminarTarea}
					/>
					) 
				}
			</div>
		</>
    );
};



export default Home;

