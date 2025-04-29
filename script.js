// ⚠️ Aquí debes añadir tus preguntas como:
// const preguntasData = [ ... ];
const preguntasData = [
  {
    pregunta: "🤝 ¿Qué te gustaría hacer en un proyecto grupal?",
    opciones: [
      { texto: "🎨 Hacer los diseños o presentaciones", perfil: "Creativo" },
      { texto: "🔍 Investigar y encontrar la mejor solución", perfil: "Analítico" },
    ]
  },
  {
    pregunta: "🚀 ¿Con qué tipo de tareas disfrutas más?",
    opciones: [
      { texto: "🔧 Construir, reparar o trabajar con herramientas o tecnología", perfil: "Técnico" },
      { texto: "🎭 Imaginar historias, componer, dibujar", perfil: "Creativo" },
    ]
  },
  {
    pregunta: "📚 ¿Qué te gustaría aprender más?",
    opciones: [
      { texto: "🗣️ Cómo comunicar mejor con los demás", perfil: "Social" },
      { texto: "💡 Inventar, diseñar o expresar ideas originales", perfil: "Creativo" },
    ]
  },
  {
    pregunta: "🧠 ¿Cuál de estas frases te representa más?",
    opciones: [
      { texto: "💭 “Siempre tengo ideas nuevas en la cabeza”", perfil: "Creativo" },
      { texto: "🧩 “Me gusta proponer ideas y tomar decisiones”", perfil: "Empresarial" },
    ]
  },
  {
    pregunta: "🎨 ¿Qué tipo de actividades te resultan más naturales?",
    opciones: [
      { texto: "✏️ Diseñar cosas nuevas o escribir", perfil: "Creativo" },
      { texto: "🛠️ Construir, reparar o trabajar con herramientas o tecnología", perfil: "Técnico" },
    ]
  },
  {
    pregunta: "🛤️ ¿Cómo te gusta trabajar?",
    opciones: [
      { texto: "🗂️ Siguiendo un plan claro", perfil: "Organizado" },
      { texto: "🧠 Con retos mentales complejos", perfil: "Analítico" },
    ]
  },
  {
    pregunta: "🏛️ ¿Qué tipo de entorno te atrae más?",
    opciones: [
      { texto: "🔬 Un laboratorio o centro de investigación", perfil: "Analítico" },
      { texto: "📰 Una sala de prensa o redacción", perfil: "Comunicativo" },
    ]
  },
  {
    pregunta: "🌟 ¿Cuál de estas imágenes te inspira más?",
    opciones: [
      { texto: "🤝 Manos entrelazadas", perfil: "Social" },
      { texto: "💡 Bombilla creativa", perfil: "Creativo" },
    ]
  },
  {
    pregunta: "🎬 ¿Qué tipo de películas o series prefieres?",
    opciones: [
      { texto: "🧩 Misterio, ciencia, documentales", perfil: "Analítico" },
      { texto: "🔧 Acción, construcción, mecánica", perfil: "Técnico" },
    ]
  },
  {
    pregunta: "😟 ¿Cómo reaccionas cuando algo no te sale bien?",
    opciones: [
      { texto: "🗣️ Lo comparto con alguien para desahogarme", perfil: "Social" },
      { texto: "🧠 Evalúo cómo cambiar la estrategia", perfil: "Empresarial" },
    ]
  },
  {
    pregunta: "🗓️ ¿Qué harías con un día libre para ti solo/a?",
    opciones: [
      { texto: "📝 Planear toda la semana", perfil: "Organizado" },
      { texto: "🎤 Escribir, grabar o crear algo", perfil: "Creativo" },
    ]
  },
  {
    pregunta: "💬 ¿Cómo te sientes más cómodo al comunicarte?",
    opciones: [
      { texto: "🗣️ Hablar, escribir o transmitir ideas con claridad", perfil: "Comunicativo" },
      { texto: "🔩 Construir, reparar o trabajar con herramientas o tecnología", perfil: "Técnico" },
    ]
  },
  {
    pregunta: "🏫 ¿Qué asignatura disfrutas más en clase?",
    opciones: [
      { texto: "🔩 Construir, reparar o trabajar con herramientas o tecnología", perfil: "Técnico" },
      { texto: "📋 Planificar, seguir pasos o mantener el orden", perfil: "Organizado" },
    ]
  },
  {
    pregunta: "🧪 ¿Cuál de estas materias se te da mejor?",
    opciones: [
      { texto: "🧪 Química / Científico", perfil: "Analítico" },
      { texto: "🗂️ Planificar, seguir pasos o mantener el orden", perfil: "Organizado" },
    ]
  },
  {
    pregunta: "🧸 ¿Qué actividad disfrutas más en el cole/instituto?",
    opciones: [
      { texto: "🤗 Ayudar, cuidar o apoyar a otras personas", perfil: "Cuidador" },
      { texto: "🚀 Liderar, organizar o emprender proyectos", perfil: "Empresarial" },
    ]
  },
  {
    pregunta: "🧠 ¿Qué te llama más la atención en clase?",
    opciones: [
      { texto: "📋 Planificar, seguir pasos o mantener el orden", perfil: "Organizado" },
      { texto: "🩺 El funcionamiento del cuerpo, la salud / Ciencias", perfil: "Cuidador" },
    ]
  },
  {
    pregunta: "🛠️ ¿En qué actividad escolar destacas más?",
    opciones: [
      { texto: "🔩 Montaje de cosas prácticas", perfil: "Técnico" },
      { texto: "🎨 Escritura creativa, dibujo, edición", perfil: "Creativo" },
    ]
  },
  {
    pregunta: "🔄 ¿Qué no te importa repetir hasta que te salga bien?",
    opciones: [
      { texto: "🗣️ Una explicación para alguien que no lo entiende", perfil: "Social" },
      { texto: "📋 Planificar, seguir pasos o mantener el orden", perfil: "Organizado" },
    ]
  },
  {
    pregunta: "👨‍🏫 ¿Qué tipo de profesor/a te inspira más?",
    opciones: [
      { texto: "🚀 Liderar, organizar o emprender proyectos", perfil: "Empresarial" },
      { texto: "🧠 El que te reta a pensar", perfil: "Analítico" },
    ]
  },
  {
    pregunta: "🎬 ¿Qué trabajo te gustaría presentar en clase?",
    opciones: [
      { texto: "🎥 Un corto o vídeo creativo", perfil: "Creativo" },
      { texto: "🤲 Una propuesta de ayuda social", perfil: "Social" },
    ]
  },
  {
    pregunta: "🌟 ¿Qué tipo de personas admiras más?",
    opciones: [
      { texto: "🎨 Artistas, creadores, diseñadores", perfil: "Creativo" },
      { texto: "🤗 Ayudar, cuidar o apoyar a otras personas", perfil: "Cuidador" },
    ]
  },
  {
    pregunta: "🚀 ¿En qué proyecto te implicarías de inmediato?",
    opciones: [
      { texto: "🏢 Montar un plan para una empresa o idea", perfil: "Empresarial" },
      { texto: "📱 Crear una app o prototipo / Analítico", perfil: "Técnico" },
    ]
  },
  {
    pregunta: "🛠️ ¿Cómo te gustaría que te recordaran?",
    opciones: [
      { texto: "🔩 Construir, reparar o trabajar con herramientas o tecnología", perfil: "Técnico" },
      { texto: "📋 Planificar, seguir pasos o mantener el orden", perfil: "Organizado" },
    ]
  },
  {
    pregunta: "🏢 ¿Qué ambiente de trabajo te atrae más?",
    opciones: [
      { texto: "🔬 Tranquilo, de concentración y datos", perfil: "Analítico" },
      { texto: "🚀 Liderar, organizar o emprender proyectos", perfil: "Empresarial" },
    ]
  },
  {
    pregunta: "🏆 ¿Qué te motiva a largo plazo?",
    opciones: [
      { texto: "🗣️ Hablar, escribir o transmitir ideas con claridad", perfil: "Comunicativo" },
      { texto: "🔩 Construir, reparar o trabajar con herramientas o tecnología", perfil: "Técnico" },
    ]
  },
];

let preguntas, preguntaActual, respuestas;

function iniciarTest(){
  document.getElementById('pantalla-inicio').classList.add('hidden');
  document.getElementById('pantalla-preguntas').classList.remove('hidden');
  preguntas = [...preguntasData.sort(() => Math.random() - 0.5)];
  preguntaActual = 0;
  respuestas = [];
  actualizarProgreso();
  mostrarPregunta();
}

function mostrarPregunta(){
  const pregunta = preguntas[preguntaActual];
  document.getElementById('question').textContent = pregunta.pregunta;
  document.getElementById('progress-count').textContent = `Pregunta ${preguntaActual + 1} de ${preguntas.length}`;
  const opcionesEl = document.getElementById('options');
  opcionesEl.innerHTML = '';

  const opcionesAleatorias = [...pregunta.opciones].sort(() => Math.random() - 0.5);
  opcionesAleatorias.forEach(op => {
    const btn = document.createElement('button');
    btn.className = 'btn btn-outline-info option-btn';
    btn.textContent = op.texto;
    btn.onclick = () => seleccionarOpcion(op.perfil, btn);
    opcionesEl.appendChild(btn);
  });

  document.getElementById('volver-btn').style.display = preguntaActual > 0 ? 'inline-block' : 'none';
}

function seleccionarOpcion(perfil, boton){
  respuestas[preguntaActual] = perfil;
  boton.classList.add('selected');
  setTimeout(() => avanzarPregunta(), 300);
}

function avanzarPregunta(){
  preguntaActual++;
  if (preguntaActual < preguntas.length){
    actualizarProgreso();
    mostrarPregunta();
  } else {
    mostrarResultado(false);
  }
}

function volverPregunta(){
  if(preguntaActual > 0){
    preguntaActual--;
    actualizarProgreso();
    mostrarPregunta();
  }
}

function actualizarProgreso(){
  const porcentaje = (preguntaActual / preguntas.length) * 100;
  document.getElementById('progress-bar').style.width = `${porcentaje}%`;
}

function mostrarResultado(terminadoManual){
  document.getElementById('pantalla-preguntas').classList.add('hidden');
  document.getElementById('pantalla-resultado').classList.remove('hidden');

  const conteo = {};
  respuestas.forEach(perfil => conteo[perfil] = (conteo[perfil] || 0) + 1);
  const total = respuestas.length;
  const topPerfiles = Object.entries(conteo).sort((a, b) => b[1] - a[1]).slice(0, 3);
  const puntuacion = Math.round((total / preguntas.length) * 100);

  const mensajeParcial = terminadoManual && total < preguntas.length
    ? `<p>🧩 Has respondido ${total} de ${preguntas.length} preguntas. Cuantas más respondas, más preciso será el resultado.</p>`
    : "";

  document.getElementById('titulo-resultado').textContent = terminadoManual && total < preguntas.length
    ? '📊 Resultado parcial del Test'
    : '🏆 Resultado del Test';

  document.getElementById('result-summary').innerHTML = `
    <div class="alert alert-${terminadoManual ? 'warning' : 'info'}">
      ${mensajeParcial}
      <h5 class="mb-3">🥇 Tus perfiles más destacados:</h5>
      ${topPerfiles.map(([perfil, puntos], i) => `<p>${['🥇','🥈','🥉'][i]} <strong>${perfil}</strong> - ${puntos} puntos</p>`).join('')}
      <hr>
      <p>📈 Precisión del test: <strong>${puntuacion}%</strong></p>
    </div>
  `;
}

function reiniciar(){
  document.getElementById('pantalla-resultado').classList.add('hidden');
  document.getElementById('pantalla-inicio').classList.remove('hidden');
}
