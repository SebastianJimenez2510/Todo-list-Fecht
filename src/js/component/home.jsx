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
			console.log(tareas);
			setListTodos(respuestaJSON);
			console.log(tareas);
		  } else {
			console.log("respuesta fallida");
			setTareas([]);
		  }
		} catch {
		  (err) => console.log(err);
		}
	  };

		const agregarTodos = async tarea => {
		let todosActualizados = tareas.slice()
		
		todosActualizados.push(
			tarea
			
		);
		setTareas(todosActualizados);

		let URI = `${BASE_URL}user/${usuario}`;

		let respuesta = await fetch(URI, {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(todosActualizados),  
		});

		if (respuesta.ok) {
			alert("Se agrego exitosamente la tarea!")

			traerListaTareas();
		} else {
			alert("Error al agregar la tarea!")
		}
	
	};

	const eliminarTarea = async id => {
		let URI = `${BASE_URL}user/${usuario}`;

		const todosActualizados =  tareas.filter((item, index) => {
			return index !== id;
		  });
		

		if (todosActualizados.length > 0){
			try {
				let respuesta = await fecth (URI, {
					method: "PUT",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(todosActualizados), 
				});

			if (respuesta.ok) {
				alert("Se elimino exitosamente la tarea!")
				traerListaTareas();
			} else {
				alert("Error al eliminar la tarea")
			}	
			} catch {
				(e) => console.log(e); 
			}
		} else {
			let respuesta = await fetch(URI, {
				method: "DELETE",
				headers: { "Content-Type": "application/json" },
			});
		}
		
	};

	useEffect(() => {
		traerListaTareas()
	}, [usuario]); 

	

	const completarTarea = id => { 
		let todosActualizados = tareas.map(tarea => {
			if(tarea.id === id){
				console.log(tarea)
				tarea.done = !tarea.done;
			}
			return tarea;
		});
		setTareas(todosActualizados);
	};
    return(
		<>
			<div className="card">
      		<form
        		onSubmit={(e) => {
         		crearUsuario(e);
        		}}
      		>
        		<input type="text" placeholder="Nombre de usuario" name="username" />
        		<button type="submit">Crear Usuario</button>
      			</form>
	  		</div>
		
			<TareaFormulario onSubmit={agregarTodos} />
			<div className="todos-list-container">
				{tareas.map((tarea, indice) =>
					<Todos 
					key={indice}
					id={indice}
					texto={tarea.label}
					completado={tarea.done}
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

