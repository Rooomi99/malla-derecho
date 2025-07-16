// Lista de ramos aprobados desde localStorage o vacía
let ramosAprobados = JSON.parse(localStorage.getItem('ramosAprobados')) || [];

// Malla de ramos (completa)
const malla = [
  { "nombre": "Derecho Romano I", "semestre": 1, "creditos": 5, "prerrequisitos": [] },
  { "nombre": "Fundamentos Filosóficos del Derecho", "semestre": 1, "creditos": 10, "prerrequisitos": [] },
  { "nombre": "Historia del Derecho", "semestre": 1, "creditos": 10, "prerrequisitos": [] },
  { "nombre": "Teoría y Fuentes del Derecho", "semestre": 1, "creditos": 5, "prerrequisitos": [] },
  { "nombre": "Introducción a la Economía", "semestre": 1, "creditos": 10, "prerrequisitos": [] },
  { "nombre": "Desarrollo de Habilidades Comunicativas para Abogados", "semestre": 1, "creditos": 10, "prerrequisitos": [] },
  { "nombre": "Taller de Metodología de la Investigación", "semestre": 1, "creditos": 0, "prerrequisitos": [] },
  { "nombre": "Derecho Romano II", "semestre": 2, "creditos": 10, "prerrequisitos": ["Derecho Romano I"] },
  { "nombre": "Derecho Natural", "semestre": 2, "creditos": 10, "prerrequisitos": ["Fundamentos Filosóficos del Derecho"] },
  { "nombre": "Historias de las Instituciones Jurídicas, Políticas y Sociales", "semestre": 2, "creditos": 10, "prerrequisitos": [] },
  { "nombre": "Derecho Político", "semestre": 2, "creditos": 5, "prerrequisitos": [] },
  { "nombre": "Derecho Económico I", "semestre": 2, "creditos": 5, "prerrequisitos": [] },
  { "nombre": "Curso Teológico", "semestre": 2, "creditos": 10, "prerrequisitos": [] },
  { "nombre": "Teoría del Acto Jurídico y Teoría de la Ley", "semestre": 3, "creditos": 10, "prerrequisitos": [] },
  { "nombre": "Instituciones del Estado de Derecho Chileno", "semestre": 3, "creditos": 10, "prerrequisitos": [] },
  { "nombre": "Derecho Internacional Público", "semestre": 3, "creditos": 10, "prerrequisitos": [] },
  { "nombre": "Derecho Económico II", "semestre": 3, "creditos": 10, "prerrequisitos": [] },
  { "nombre": "Electivo en otra disciplina", "semestre": 3, "creditos": 10, "prerrequisitos": [] },
  { "nombre": "Personas y Bienes", "semestre": 4, "creditos": 10, "prerrequisitos": ["Teoría del Acto Jurídico y Teoría de la Ley"] },
  { "nombre": "Instituciones Procesales I", "semestre": 4, "creditos": 10, "prerrequisitos": [] },
  { "nombre": "Derechos Fundamentales y Derechos Humanos", "semestre": 4, "creditos": 10, "prerrequisitos": ["Instituciones del Estado de Derecho Chileno", "Derecho Internacional Público"] },
  { "nombre": "Derecho del Trabajo", "semestre": 4, "creditos": 10, "prerrequisitos": [] },
  { "nombre": "Electivo en otra disciplina", "semestre": 4, "creditos": 10, "prerrequisitos": [] },
  { "nombre": "Obligaciones", "semestre": 5, "creditos": 10, "prerrequisitos": ["Personas y Bienes"] },
  { "nombre": "Instituciones Procesales II", "semestre": 5, "creditos": 10, "prerrequisitos": ["Instituciones Procesales I"] },
  { "nombre": "Derecho Administrativo I", "semestre": 5, "creditos": 10, "prerrequisitos": ["Instituciones del Estado de Derecho Chileno"] },
  { "nombre": "Derecho Penal Parte General I", "semestre": 5, "creditos": 10, "prerrequisitos": [] },
  { "nombre": "El Comerciante y Bases de la Contratación Mercantil", "semestre": 5, "creditos": 10, "prerrequisitos": [] },
  { "nombre": "Fuentes de las Obligaciones I", "semestre": 6, "creditos": 10, "prerrequisitos": ["Obligaciones"] },
  { "nombre": "Procedimientos Civiles I", "semestre": 6, "creditos": 10, "prerrequisitos": ["Instituciones Procesales II"] },
  { "nombre": "Derecho Administrativo II", "semestre": 6, "creditos": 10, "prerrequisitos": ["Derecho Administrativo I"] },
  { "nombre": "Derecho Penal Parte General II", "semestre": 6, "creditos": 10, "prerrequisitos": ["Derecho Penal Parte General I"] },
  { "nombre": "Derecho de Sociedades", "semestre": 6, "creditos": 10, "prerrequisitos": ["El Comerciante y Bases de la Contratación Mercantil"] },
  { "nombre": "Fuentes de las Obligaciones II", "semestre": 7, "creditos": 5, "prerrequisitos": ["Fuentes de las Obligaciones I"] },
  { "nombre": "Procedimientos Civiles II", "semestre": 7, "creditos": 5, "prerrequisitos": ["Procedimientos Civiles I"] },
  { "nombre": "Derecho Penal Parte Especial", "semestre": 7, "creditos": 10, "prerrequisitos": ["Derecho Penal Parte General II"] },
  { "nombre": "Financiamiento de la Empresa", "semestre": 7, "creditos": 10, "prerrequisitos": ["Derecho de Sociedades"] },
  { "nombre": "Electivo en otra disciplina", "semestre": 7, "creditos": 10, "prerrequisitos": [] },
  { "nombre": "Electivo en otra disciplina", "semestre": 7, "creditos": 10, "prerrequisitos": [] },
  { "nombre": "Derecho de Familia", "semestre": 8, "creditos": 10, "prerrequisitos": ["Obligaciones"] },
  { "nombre": "Procedimientos Penales", "semestre": 8, "creditos": 10, "prerrequisitos": ["Instituciones Procesales II"] },
  { "nombre": "Derecho Canónico", "semestre": 8, "creditos": 10, "prerrequisitos": [] },
  { "nombre": "Contratos Mercantiles y Concursos", "semestre": 8, "creditos": 10, "prerrequisitos": [] },
  { "nombre": "Electivo en otra disciplina", "semestre": 8, "creditos": 10, "prerrequisitos": [] },
  { "nombre": "Derecho Sucesorio", "semestre": 9, "creditos": 10, "prerrequisitos": ["Obligaciones"] },
  { "nombre": "Optativo de Profundización (Ética Profesional)", "semestre": 9, "creditos": 5, "prerrequisitos": [] },
  { "nombre": "Optativo de Profundización", "semestre": 9, "creditos": 5, "prerrequisitos": [] },
  { "nombre": "Derecho Tributario I", "semestre": 9, "creditos": 10, "prerrequisitos": ["Derecho de Sociedades"] },
  { "nombre": "Clínica Jurídica I", "semestre": 9, "creditos": 10, "prerrequisitos": [] },
  { "nombre": "Derecho Internacional Privado", "semestre": 10, "creditos": 5, "prerrequisitos": ["Derecho Sucesorio"] },
  { "nombre": "Derecho Tributario II", "semestre": 10, "creditos": 5, "prerrequisitos": ["Derecho Tributario I"] },
  { "nombre": "Seminario de Investigación", "semestre": 10, "creditos": 10, "prerrequisitos": [] },
  { "nombre": "Clínica Jurídica II", "semestre": 10, "creditos": 10, "prerrequisitos": ["Clínica Jurídica I"] }
];

// Guardamos los IDs únicos para diferenciar ramos con mismo nombre y semestre
malla.forEach((ramo, i) => {
  ramo._id = `${ramo.nombre}-${ramo.semestre}-${i}`;
});

renderMalla(malla);
actualizarCreditos();

document.getElementById('buscador').addEventListener('input', filtrarRamos);
document.getElementById('btnLimpiar').addEventListener('click', () => {
  ramosAprobados = [];
  localStorage.removeItem('ramosAprobados');
  renderMalla(malla);
  actualizarCreditos();
});
document.getElementById('btnOscuro').addEventListener('click', () => {
  document.body.classList.toggle('oscuro');
});

function renderMalla(malla) {
  const contenedor = document.getElementById('malla');
  contenedor.innerHTML = '';
  const semestres = {};

  malla.forEach((ramo) => {
    if (!semestres[ramo.semestre]) semestres[ramo.semestre] = [];
    semestres[ramo.semestre].push(ramo);
  });

  Object.keys(semestres).sort((a,b) => a - b).forEach(semestre => {
    const columna = document.createElement('div');
    columna.classList.add('semestre');

    const titulo = document.createElement('div');
    titulo.className = 'semestre-titulo';
    titulo.textContent = `Semestre ${semestre}`;
    columna.appendChild(titulo);

    semestres[semestre].forEach(ramo => {
      const div = document.createElement('div');
      div.classList.add('ramo');
      div.setAttribute('data-tooltip', `Créditos: ${ramo.creditos}\nPrerrequisitos: ${ramo.prerrequisitos.length ? ramo.prerrequisitos.join(', ') : 'Ninguno'}`);

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
        if (div.classList.contains('bloqueado')) return; // no cambiar estado si está bloqueado

        const index = ramosAprobados.indexOf(ramo._id);
        if (index >= 0) {
          ramosAprobados.splice(index, 1);
        } else {
          ramosAprobados.push(ramo._id);
        }
        localStorage.setItem('ramosAprobados', JSON.stringify(ramosAprobados));
        renderMalla(malla);
        actualizarCreditos();
      });

      columna.appendChild(div);
    });

    contenedor.appendChild(columna);
  });
}

function filtrarRamos(e) {
  const filtro = e.target.value.toLowerCase();
  const ramos = document.querySelectorAll('.ramo');
  ramos.forEach(ramo => {
    const texto = ramo.textContent.toLowerCase();
    ramo.style.display = texto.includes(filtro) ? 'block' : 'none';
  });
}

function actualizarCreditos() {
  let total = 0;
  let acumulado = 0;

  malla.forEach((ramo) => {
    total += ramo.creditos;
    if (ramosAprobados.includes(ramo._id)) {
      acumulado += ramo.creditos;
    }
  });

  document.getElementById('creditos').textContent = `Créditos: ${acumulado} de ${total}`;
}
