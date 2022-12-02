import React, { useState, useEffect } from "react";
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
	const [usuario, setUsuario] = useState("");

	const BASE_URL = "https://assets.breatheco.de/apis/fake/todos/";

	const crearUsuario = async (e) => {
	  e.preventDefault();
	  let data = new FormData(e.target);
	  let username = data.get("username");
	  console.log("la variable username es: ", username);
	  setUsuario(username);
  
	  let URI = `${BASE_URL}user/${username}`;
  
	  try {
		let respuesta = await fetch(URI, {
		  method: "POST",
		  headers: { "Content-Type": "application/json" },
		  body: JSON.stringify([]),
		});
		console.log(respuesta);
		if (respuesta.ok) {
		  alert("Usuario creado correctamente");
		  return;
		} else {
		  alert("Error al crear usuario, o el usuario ya existe");
		  setUsuario(username);
		}
		let respuestaJSON = await respuesta.json();
		console.log(respuestaJSON);
	  } catch {
		(e) => console.log(e);
	  }
	};

	const traerListaTareas = async () => {
		let URI = `${BASE_URL}user/${usuario}`;
		try {
		  let respuesta = await fetch(URI);
		  if (respuesta.ok) {
			let respuestaJSON = await respuesta.json();
			console.log(respuestaJSON);
			console.log(listTodos);
			setListTodos(respuestaJSON);
			console.log(listTodos);
		  } else {
			console.log("respuesta fallida");
			setListTodos([]);
		  }
		} catch {
		  (err) => console.log(err);
		}
	  };

		const agregarTodos = async tarea => {
		console.log(tarea);
		if(tarea.texto.trim()){
		tarea.texto = tarea.texto.trim();

		const todosActualizados = [tarea, ...tareas];
		setTareas(todosActualizados);

		let URI = `${BASE_URL}user/${usuario}`;

		let respuesta = await fetch(URI, {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(todosActualizados),  
		});

		if (respuesta.ok) {
			<Alert severity="success">Se agrego exitosamente la tarea!</Alert>

			traerListaTareas();
		} else {
			<Alert severity="error">Error al agregar tarea!</Alert>
		}
		};
	};

	const eliminarTarea = async id => {
		let URI = `${BASE_URL}user/${usuario}`;

		if (todosActualizados.length > 0){
			try {
				let respuesta = await fecth (URI, {
					method: "PUT",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(todosActualizados), 
				});

			if (respuesta.ok) {
				<Alert severity="success">Se elimino exitosamente la tarea!</Alert>
				traerListaTareas();
			} else {
				<Alert severity="error">Error!</Alert>
			}	
			} catch {
				(e) => console.log(e); 
			}
		} else {
			let respuesta = await fetch(URI, {
				method: "DELETE",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(todosActualizados)
			});
		}
		const todosActualizados =  tareas.filter(tarea => tarea.id !== id);
		setTareas(todosActualizados);
	};

	useEffect(() => {
		traerListaTareas()
	}, [usuario]); 

	

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

