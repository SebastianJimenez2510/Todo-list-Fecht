import React, { useState } from "react";
import {v4 as uuidv4 } from "uuid";

function TareaFormulario(props){
	const[input, setInput]= useState('');

	const manejarCambio = e => {
		setInput(e.target.value);
		console.log(e.target.value)
	};

	const manejarEnvio = e => {
		e.preventDefault();
		
		const tareaNueva = {
			id: uuidv4(),
			texto: input,
			completado: false
		}
		console.log(tareaNueva)
	};

	return(
		<form className="tarea-formulario"
		onSubmit={manejarEnvio}>
			<input className="tarea-input" 
			type="text" 
			placeholder="Escriba una tarea"
			name="texto"
			onChange={manejarCambio}
			/>
		</form>
	);
};

export default TareaFormulario;