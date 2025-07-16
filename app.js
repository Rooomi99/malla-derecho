// Lista de ramos aprobados desde localStorage o vacía
let ramosAprobados = JSON.parse(localStorage.getItem('ramosAprobados')) || [];

// Malla de ramos (agrega el resto después si faltan)
const malla = [
  { nombre: "Derecho Romano I", semestre: 1, creditos: 5, prerrequisitos: [] },
  { nombre: "Fundamentos Filosóficos del Derecho", semestre: 1, creditos: 10, prerrequisitos: [] },
  { nombre: "Historia del Derecho", semestre: 1, creditos: 10, prerrequisitos: [] },
  { nombre: "Teoría y Fuentes del Derecho", semestre: 1, creditos: 5, prerrequisitos: [] },
  { nombre: "Introducción a la Economía", semestre: 1, creditos: 10, prerrequisitos: [] },
  { nombre: "Desarrollo de Habilidades Comunicativas para Abogados", semestre: 1, creditos: 10, prerrequisitos: [] },
  { nombre: "Taller de Metodología de la Investigación", semestre: 1, creditos: 0, prerrequisitos: [] },
  { nombre: "Derecho Romano II", semestre: 2, creditos: 10, prerrequisitos: ["Derecho Romano I"] },
  { nombre: "Derecho Natural", semestre: 2, creditos: 10, prerrequisitos: ["Fundamentos Filosóficos del Derecho"] },
  { nombre: "Historias de las Instituciones Jurídicas, Políticas y Sociales", semestre: 2, creditos: 10, prerrequisitos: [] },
  { nombre: "Derecho Político", semestre: 2, creditos: 5, prerrequisitos: [] },
  { nombre: "Derecho Económico I", semestre: 2, creditos: 5, prerrequisitos: [] },
  { nombre: "Curso Teológico", semestre: 2, creditos: 10, prerrequisitos: [] }
  // Agrega el resto de la malla aquí...
];

document.getElementById('btnLimpiar').addEventListener('click', () => {
  ramosAprobados = [];
  localStorage.removeItem('ramosAprobados');
  renderMalla(malla);
});

renderMalla(malla);

function renderMalla(malla) {
  const contenedor = document.getElementById('malla');
  contenedor.innerHTML = '';
  const semestres = {};

  malla.forEach((ramo, index) => {
    // Crear un ID único por ramo usando nombre + semestre + índice
    const idUnico = `${ramo.nombre}-${ramo.semestre}-${index}`;
    ramo._id = idUnico;

    if (!semestres[ramo.semestre]) semestres[ramo.semestre] = [];
    semestres[ramo.semestre].push(ramo);
  });

  Object.keys(semestres).sort((a, b) => a - b).forEach(semestre => {
    const columna = document.createElement('div');
    columna.classList.add('semestre');

    const titulo = document.createElement('div');
    titulo.className = 'semestre-titulo';
    titulo.textContent = `Semestre ${semestre}`;
    columna.appendChild(titulo);

    semestres[semestre].forEach(ramo => {
      const div = document.createElement('div');
      div.classList.add('ramo');

      div.setAttribute('data-tooltip', `Créditos: ${ramo.creditos}\nPrerrequisitos: ${ramo.prerrequisitos.join(', ') || 'Ninguno'}`);

      const aprobado = ramosAprobados.includes(ramo._id);
      const prerequisitosCumplidos = ramo.prerrequisitos.every(pr =>
        malla.some(r => r.nombre === pr && ramosAprobados.includes(r._id))
      );

      if (aprobado) {
        div.classList.add('aprobado');
      } else if (!prerequisitosCumplidos && ramo.prerrequisitos.length > 0) {
        div.classList.add('bloqueado');
      } else {
        div.classList.add('pendiente');
      }

      div.textContent = ramo.nombre;

      div.addEventListener('click', () => {
        const index = ramosAprobados.indexOf(ramo._id);
        if (index >= 0) {
          ramosAprobados.splice(index, 1);
        } else {
          ramosAprobados.push(ramo._id);
        }
        localStorage.setItem('ramosAprobados', JSON.stringify(ramosAprobados));
        renderMalla(malla);
      });

      columna.appendChild(div);
    });

    contenedor.appendChild(columna);
  });
}
