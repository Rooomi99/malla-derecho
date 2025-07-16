// app.js

// Lista de ramos que se consideran ya aprobados
const ramosAprobados = [
  "Derecho Romano I",
  "Fundamentos Filosóficos del Derecho",
  "Historia del Derecho"
];

// Cargamos el archivo malla.json
fetch('malla.json')
  .then(response => response.json())
  .then(malla => {
    mostrarMalla(malla);
  })
  .catch(error => {
    console.error("Error al cargar la malla:", error);
  });

// Función principal para mostrar la malla
function mostrarMalla(malla) {
  const contenedor = document.getElementById('malla');

  malla.forEach(ramo => {
    const div = document.createElement('div');
    div.classList.add('ramo');
    
    // Evaluar si el ramo está aprobado
    const aprobado = ramosAprobados.includes(ramo.nombre);

    // Evaluar si se cumplen todos los prerrequisitos
    const prerequisitosCumplidos = ramo.prerrequisitos.every(pr => ramosAprobados.includes(pr));

    if (aprobado) {
      div.classList.add('aprobado');
    } else if (!prerequisitosCumplidos && ramo.prerrequisitos.length > 0) {
      div.classList.add('bloqueado');
    } else {
      div.classList.add('pendiente');
    }

    // Mostrar texto del ramo
    div.innerText = `${ramo.nombre} (Sem ${ramo.semestre})`;

    // Agregar al contenedor principal
    contenedor.appendChild(div);
  });
}
