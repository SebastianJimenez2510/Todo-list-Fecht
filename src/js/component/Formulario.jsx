import React from "react";

function TareaFormulario(props){
	return(
		<form className="tarea-formulario">
			<input className="tarea-input" 
			type="text" 
			placeholder="Escriba una tarea"
			name="texto"
			/>
		</form>
	);
};

export default TareaFormulario;