// app.js

// Cargar desde localStorage los ramos aprobados, o usar lista vacía
let ramosAprobados = JSON.parse(localStorage.getItem('ramosAprobados')) || [];

// Cargar la malla desde el archivo JSON
fetch('malla.json')
  .then(res => res.json())
  .then(malla => {
    renderMalla(malla);

    // Guardamos malla completa en memoria para futuros clics
    window.mallaData = malla;
  });

// Función para renderizar la malla
function renderMalla(malla) {
  const contenedor = document.getElementById('malla');
  contenedor.innerHTML = ''; // Limpia antes de renderizar

  malla.forEach(ramo => {
    const div = document.createElement('div');
    div.classList.add('ramo');

    const aprobado = ramosAprobados.includes(ramo.nombre);
    const prerequisitosCumplidos = ramo.prerrequisitos.every(pr => ramosAprobados.includes(pr));

    if (aprobado) {
      div.classList.add('aprobado');
    } else if (!prerrequisitosCumplidos && ramo.prerrequisitos.length > 0) {
      div.classList.add('bloqueado');
    } else {
      div.classList.add('pendiente');
    }

    div.innerText = `${ramo.nombre} (Sem ${ramo.semestre})`;

    // Hacer clic para marcar/desmarcar como aprobado
    div.addEventListener('click', () => toggleAprobado(ramo.nombre));

    contenedor.appendChild(div);
  });
}

// Función que alterna aprobado/no aprobado y vuelve a renderizar
function toggleAprobado(nombreRamo) {
  const index = ramosAprobados.indexOf(nombreRamo);

  if (index >= 0) {
    ramosAprobados.splice(index, 1); // quitar si ya estaba
  } else {
    ramosAprobados.push(nombreRamo); // agregar si no estaba
  }

  // Guardar en localStorage
  localStorage.setItem('ramosAprobados', JSON.stringify(ramosAprobados));

  // Volver a renderizar
  renderMalla(window.mallaData);
}


