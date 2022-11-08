import React, { useState } from "react";
import {v4 as uuidv4 } from "uuid";

function TareaFormulario(props){
	const[input, setInput]= useState('');

	const manejarCambio = e => {
		setInput(e.target.value);
		
	};

	const manejarEnvio = e => {
		e.preventDefault();
		
		const tareaNueva = {
			id: uuidv4(),
			texto: input,
			completado: false
		}
		props.onSubmit(tareaNueva);
	};

	return(
		<div className="tarea-formulario">
		<form 
		onSubmit={manejarEnvio}>
			<input className="tarea-input" 
			type="text" 
			placeholder="Escriba una tarea"
			name="texto"
			onChange={manejarCambio}
			/>
		</form>
		</div>
	);
};

export default TareaFormulario;