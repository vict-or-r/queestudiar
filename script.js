// === VARIABLES GLOBALES ===
let courseData = [];
let testData = [];
let perfilesData = {};
const profileToFamiliaMap = { 
    "Social": ["ADMINISTRACIÓN Y GESTIÓN", "SERVICIOS SOCIOCULTURALES Y A LA COMUNIDAD", "HOSTELERÍA Y TURISMO", "COMERCIO Y MARKETING", "EDUCACIÓN Y APOYO AL DESARROLLO"],
    "Técnico": ["ELECTRICIDAD Y ELECTRÓNICA", "FABRICACIÓN MECÁNICA", "INSTALACIÓN Y MANTENIMIENTO", "TRANSPORTE Y MANTENIMIENTO", "INFORMÁTICA Y COMUNICACIONES", "ENERGÍA Y AGUA", "INDUSTRIAS EXTRACTIVAS", "EDIFICACIÓN Y OBRA CIVIL", "MADERA, MUEBLE Y CORCHO", "MARÍTIMO PESQUERA", "VIDRIO Y CERÁMICA", "ARTES GRÁFICAS"],
    "Empresarial": ["ADMINISTRACIÓN Y GESTIÓN", "COMERCIO Y MARKETING", "HOSTELERÍA Y TURISMO"],
    "Organizado": ["ADMINISTRACIÓN Y GESTIÓN", "COMERCIO Y MARKETING", "TRANSPORTE Y MANTENIMIENTO", "HOSTELERÍA Y TURISMO", "LOGÍSTICA Y GESTIÓN DE EMPRESAS"],
    "Analítico": ["INFORMÁTICA Y COMUNICACIONES", "QUÍMICA", "SANIDAD", "CIENCIAS", "ADMINISTRACIÓN Y GESTIÓN", "ENERGÍA Y AGUA", "INDUSTRIAS ALIMENTARIAS"],
    "Creativo": ["ARTES GRÁFICAS", "IMAGEN Y SONIDO", "IMAGEN PERSONAL", "ARTES Y ARTESANÍAS", "TEXTIL, CONFECCIÓN Y PIEL", "VIDRIO Y CERÁMICA", "MADERA, MUEBLE Y CORCHO", "EDIFICACIÓN Y OBRA CIVIL", "DISEÑO", "MARKETING Y PUBLICIDAD", "HOSTELERÍA Y TURISMO"],
    "Comunicativo": ["ADMINISTRACIÓN Y GESTIÓN", "COMERCIO Y MARKETING", "HOSTELERÍA Y TURISMO", "IMAGEN Y SONIDO", "SERVICIOS SOCIOCULTURALES Y A LA COMUNIDAD", "ARTES GRÁFICAS", "MARKETING Y PUBLICIDAD"],
    "Cuidador": ["SANIDAD", "SERVICIOS SOCIOCULTURALES Y A LA COMUNIDAD", "ACTIVIDADES FÍSICAS Y DEPORTIVAS", "IMAGEN PERSONAL", "AGRARIA", "EDUCACIÓN Y APOYO AL DESARROLLO", "HOSTELERÍA Y TURISMO"]
};
const profileEmojis = {"Comunicativo": "💬", "Organizado": "📋", "Creativo": "🎨", "Analítico":"🔬", "Cuidador":"❤️", "Social":"🤝", "Técnico":"⚙️", "Empresarial":"💼"};

// Estado Test
let currentTestStage = 0; let currentQuestionIndex = 0; let totalQuestionsInStage = 0;
let userAnswers1 = {}; let userAnswers2 = {}; let profileScores1 = {}; let profileScores2 = {};
let top3Profiles = []; let finalProfile = ''; let shuffledTest1Data = []; let shuffledTest2Data = [];
let isTestActive = false; const TEST1_QUESTIONS_COUNT = 5; const TEST2_QUESTIONS_COUNT = 5;

// Cache DOM Elements
const elements = {};

// === UTILIDADES ===
function showLoading() { if(elements.loading) elements.loading.style.display = 'flex'; if(elements.error) elements.error.style.display = 'none'; }
function hideLoading() { if(elements.loading) elements.loading.style.display = 'none'; }
function showError(message) { if(elements.error) { elements.error.textContent = `Error: ${message}`; elements.error.style.display = 'block'; window.scrollTo(0, 0); } hideLoading(); }
function showSection(sectionId) { [elements.home, elements.test, elements.partial, elements.final].forEach(s => { if(s) s.style.display = 'none'}); hideSearchResults(); const section = document.getElementById(sectionId); if (section) { section.style.display = 'block'; window.scrollTo(0, 0); } else { console.error(`Sección ID "${sectionId}" no encontrada`); } if(elements.error) elements.error.style.display = 'none'; isTestActive = (sectionId === 'interactive-test'); }
function goHome() { showSection('home'); currentTestStage = 0; currentQuestionIndex = 0; userAnswers1 = {}; userAnswers2 = {}; profileScores1 = {}; profileScores2 = {}; top3Profiles = []; finalProfile = ''; shuffledTest1Data = []; shuffledTest2Data = []; isTestActive = false; if (elements.questionDisplay) elements.questionDisplay.innerHTML = ''; const form = document.getElementById('interactive-test-form'); if (form) form.reset(); if(elements.progressBar) elements.progressBar.style.width = '0%'; if(elements.testProgress) elements.testProgress.textContent = ''; if (elements.searchInput) elements.searchInput.value = ''; hideSearchResults(); }
function shuffleArray(array) { let i = array.length; while (i--) { const ri = Math.floor(Math.random() * (i + 1)); [array[i], array[ri]] = [array[ri], array[i]]; } return array; }
function safeText(sourceObject, keys, fallback = 'No disponible') { if (!sourceObject || typeof sourceObject !== 'object') return fallback; const keyArray = Array.isArray(keys) ? keys : [keys]; for (const key of keyArray) { if (sourceObject.hasOwnProperty(key)) { const value = sourceObject[key]; if (value !== undefined && value !== null && String(value).toLowerCase() !== 'nan' && String(value).trim() !== '') { return String(value).trim(); } } } return fallback; }
function normalizeText(text) { if (!text) return ''; return text.toString().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^\w\s]/gi, '').trim(); }
function normalizeFamiliaName(name) { if (!name) return ''; return name.toUpperCase().trim().replace(/\s*\d$/, '').replace(/\s+BÁSICA$/, '').replace(/\s+MEDIA$/, '').replace(/\s+SUPERIOR$/, '').replace(/\s+Y\s+TECNOLOGÍA$/, '').replace(/\s+Y\s+CIENCIAS\s+SOCIALES$/, '').trim(); }

// === CARGA DATOS ===
async function loadData() { showLoading(); if(elements.startTestButton) elements.startTestButton.disabled = true; try { const [coursesRes, testRes, perfilesRes] = await Promise.all([ fetch('data/cursos.json'), fetch('data/testperfil.json'), fetch('data/perfiles.json') ]); if (!coursesRes.ok) throw new Error(`cursos.json (${coursesRes.status} ${coursesRes.statusText})`); if (!testRes.ok) throw new Error(`testperfil.json (${testRes.status} ${testRes.statusText})`); if (!perfilesRes.ok) throw new Error(`perfiles.json (${perfilesRes.status} ${perfilesRes.statusText})`); courseData = await coursesRes.json(); testData = await testRes.json(); perfilesData = await perfilesRes.json(); if (!Array.isArray(courseData) || courseData.length === 0 || !courseData.every(c => c && typeof c === 'object')) throw new Error("Archivo cursos.json inválido."); if (!Array.isArray(testData) || testData.length === 0 || !testData.every(t => t && typeof t === 'object')) throw new Error("Archivo testperfil.json inválido."); if (typeof perfilesData !== 'object' || Object.keys(perfilesData).length === 0) console.warn("Archivo perfiles.json vacío o formato inesperado."); hideLoading(); showSection('home'); if(elements.startTestButton) { elements.startTestButton.disabled = false; elements.startTestButton.innerHTML = `<span class="emoji">🚀</span> ¡Comenzar Test!`; } } catch (error) { console.error("Fallo en loadData:", error); showError(`Fallo al cargar datos esenciales: ${error.message}. La aplicación podría no funcionar correctamente. Intenta recargar la página.`); if(elements.startTestButton) elements.startTestButton.disabled = true; if(elements.searchButton) elements.searchButton.disabled = true; if(elements.searchInput) elements.searchInput.disabled = true; } }

// =========================================================================
// === MANEJO MODAL Y CLICS EN TARJETAS (Definidas ANTES de su uso) ===
// =========================================================================

function showCourseDetails(course) {
    if (!elements.modal || !elements.modalBackdrop || !course || typeof course !== 'object') { console.error("Error al mostrar modal: Elementos/Datos inválidos", course); return; }
    elements.modalTitle.textContent = safeText(course, ['Curso', 'curso'], "Detalles del Estudio");
    elements.modalEtapa.textContent = safeText(course, ['Etapa', 'title'], "N/A");
    elements.modalFamilia.textContent = safeText(course, ['Familia', 'familia'], "N/A");
    elements.modalDesc.textContent = safeText(course, ['Descripción detallada', 'descripción_detallada', 'descripcion_detallada'], "No disponible.");
    elements.modalAprender.textContent = safeText(course, ['Qué voy a aprender', 'qué_voy_a_aprender', 'que_voy_a_aprender'], "No disponible.");
    elements.modalSalidas.textContent = safeText(course, ['Salidas laborales', 'salidas_laborales'], "No disponible.");
    const fraseElement = elements.modalFrase; const fraseContainer = document.getElementById('modal-course-frase-container');
    if (fraseElement && fraseContainer) { const fraseTexto = safeText(course, ['Frase clave', 'frase_clave'], ""); fraseElement.textContent = fraseTexto; fraseContainer.style.display = fraseTexto ? 'block' : 'none'; }
    else if (fraseContainer) { fraseContainer.style.display = 'none'; }
    elements.modal.style.display = 'flex'; elements.modalBackdrop.style.display = 'block';
    requestAnimationFrame(() => { elements.modal.classList.add('visible'); elements.modalBackdrop.classList.add('visible'); if (elements.closeModalButton) elements.closeModalButton.focus(); });
    document.body.style.overflow = 'hidden';
}

function closeCourseModal() { if (!elements.modal || !elements.modalBackdrop) return; elements.modal.classList.remove('visible'); elements.modalBackdrop.classList.remove('visible'); setTimeout(() => { elements.modal.style.display = 'none'; elements.modalBackdrop.style.display = 'none'; }, 250); document.body.style.overflow = ''; }

// ** handleCourseCardClick: Manejador para clics en tarjetas de CURSOS (Resultados Finales) **
function handleCourseCardClick(event) {
    const course = event.currentTarget?._courseData;
    if (course && typeof course === 'object') {
        showCourseDetails(course);
    } else {
        console.error("Error: Datos del curso inválidos en tarjeta.", event.currentTarget?._courseData);
        showError("No se pudieron cargar los detalles del curso.");
    }
}

// ** handleSearchResultClick: Manejador para clics en items de la lista de BÚSQUEDA **
//    (Movido aquí, ANTES de las funciones que lo usan: displaySearchResults)
function handleSearchResultClick(event) {
    const course = event.currentTarget?._courseData;
    if (course && typeof course === 'object') {
        showCourseDetails(course);
        hideSearchResults();
        if (elements.searchInput) elements.searchInput.value = '';
    } else {
        console.error("Error: Datos del curso inválidos o no encontrados en el elemento LI.", event.currentTarget?._courseData);
        showError("Error al obtener los detalles del curso seleccionado.");
    }
}

// === BÚSQUEDA ===
function performSearch() { if (!elements.searchInput || !courseData || courseData.length === 0) { showError("Datos de cursos no disponibles."); return; } const query = normalizeText(elements.searchInput.value.trim()); if (!query) { hideSearchResults(); return; } const searchFields = ['Curso', 'Familia', 'Etapa', 'title', 'descripción_sencilla', 'qué_voy_a_aprender', 'salidas_laborales', 'descripción_detallada', 'frase_clave']; const results = courseData.filter(course => { if (!course || typeof course !== 'object') return false; return searchFields.some(field => { const value = safeText(course, field, ''); return value && normalizeText(value).includes(query); }); }).sort((a, b) => safeText(a, 'Curso', '').localeCompare(safeText(b, 'Curso', ''))); displaySearchResults(results, elements.searchInput.value.trim()); }
function displaySearchResults(results, query) {
    if (!elements.searchList || !elements.searchDisplay) return;
    elements.searchList.innerHTML = '';
    if (results.length > 0) {
        const maxResults = 20;
        results.slice(0, maxResults).forEach((course) => {
            if (!course || typeof course !== 'object') return;
            const li = document.createElement('li');
            const cursoNombre = safeText(course, ['Curso', 'curso'], 'Curso ND');
            const cursoNivel = safeText(course, ['Etapa', 'title'], 'N/A');
            const cursoFamilia = safeText(course, ['Familia', 'familia'], 'N/A');
            li.innerHTML = `${cursoNombre} <span class="search-result-detail">(${cursoNivel} - ${cursoFamilia})</span>`;
            li._courseData = course;
            li.addEventListener('click', handleSearchResultClick); // OK, definida antes
            li.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleSearchResultClick({ currentTarget: li }); } });
            li.setAttribute('tabindex', '0');
            elements.searchList.appendChild(li);
        });
        if (results.length > maxResults) {
            const infoLi = document.createElement('li'); infoLi.className = 'more-results-info'; infoLi.textContent = `Mostrando ${maxResults} de ${results.length}. Refina tu búsqueda para ver más.`; elements.searchList.appendChild(infoLi);
        }
    } else {
        const noResultsLi = document.createElement('li'); noResultsLi.className = 'no-results-message'; noResultsLi.innerHTML = `😔 No se encontraron estudios para "<strong>${query}</strong>". Prueba con otros términos.`; elements.searchList.appendChild(noResultsLi);
    }
    elements.searchDisplay.style.display = 'block';
}
function hideSearchResults() { if (elements.searchDisplay) elements.searchDisplay.style.display = 'none'; if (elements.searchList) elements.searchList.innerHTML = '';}


// === TEST INTERACTIVO ===
// ... (startTest, startTestStage, displaySingleQuestion, handleAnswerSelection, calculateProfileScores, confirmExitTest sin cambios) ...
function startTest() { startTestStage(1); }
function startTestStage(stage) { const sourceData = testData.filter(q => q && q.stage === stage); if (!sourceData || sourceData.length === 0) { showError(`Preguntas para el Test (Parte ${stage}) no disponibles.`); goHome(); return; } currentTestStage = stage; currentQuestionIndex = 0; totalQuestionsInStage = 0; if (stage === 1) { userAnswers1 = {}; profileScores1 = {}; top3Profiles = []; shuffledTest1Data = shuffleArray([...sourceData]).slice(0, TEST1_QUESTIONS_COUNT); totalQuestionsInStage = shuffledTest1Data.length; if (totalQuestionsInStage === 0) { showError("No hay preguntas válidas para la Parte 1."); goHome(); return; } if (elements.testTitle) elements.testTitle.innerHTML = `<span class="emoji">📝</span> Test Vocacional - Parte 1`; if (elements.finishBtn) elements.finishBtn.innerHTML = `<span class="emoji">📊</span> Ver Resultados Parciales`; } else { userAnswers2 = {}; profileScores2 = {}; finalProfile = ''; const relevantQuestions = shuffleArray([...sourceData]).filter(q => q && q.options && q.options.some(opt => top3Profiles.includes(opt.profile))); shuffledTest2Data = relevantQuestions.slice(0, TEST2_QUESTIONS_COUNT); totalQuestionsInStage = shuffledTest2Data.length; if (totalQuestionsInStage === 0) { console.warn("No hay preguntas relevantes para la Parte 2 basadas en:", top3Profiles); alert("No se encontraron preguntas específicas para afinar tu perfil. Se mostrarán los resultados basados en la Parte 1."); finishTestUsingStage1(); return; } if (elements.testTitle) elements.testTitle.innerHTML = `<span class="emoji">🎯</span> Test Vocacional - Parte 2 (Afinando)`; if (elements.finishBtn) elements.finishBtn.innerHTML = `<span class="emoji">🏁</span> Ver Resultado Final`; } const form = document.getElementById('interactive-test-form'); if (form) form.reset(); displaySingleQuestion(); showSection('interactive-test'); }
function displaySingleQuestion() { if (!elements.questionDisplay || !elements.testProgress || !elements.progressBar || !elements.finishBtn) { console.error("Elementos del DOM para el test no encontrados."); return; } const currentDataSet = (currentTestStage === 1) ? shuffledTest1Data : shuffledTest2Data; const totalQsInThisStage = totalQuestionsInStage; const existingQuestion = elements.questionDisplay.querySelector('.single-question-container'); if (existingQuestion) { existingQuestion.classList.remove('active'); existingQuestion.classList.add('exiting'); } setTimeout(() => { elements.questionDisplay.innerHTML = ''; if (currentQuestionIndex >= totalQsInThisStage) { if (currentTestStage === 1) showPartialResults(); else calculateAndShowFinalResults(); return; } const currentQuestionNum = currentQuestionIndex + 1; elements.testProgress.textContent = `Pregunta ${currentQuestionNum} de ${totalQsInThisStage}`; const progressPercent = totalQsInThisStage > 0 ? (currentQuestionNum / totalQsInThisStage) * 100 : 0; elements.progressBar.style.width = `${progressPercent}%`; const q = currentDataSet[currentQuestionIndex]; if (!q || !q.options) { console.error("Error: Pregunta o sus opciones son indefinidas en índice", currentQuestionIndex, "Etapa", currentTestStage); showError("Error interno al mostrar la pregunta. Por favor, reinicia."); goHome(); return; } const questionBlock = document.createElement('div'); questionBlock.className = 'single-question-container'; questionBlock.setAttribute('data-question-index', currentQuestionIndex); const questionText = document.createElement('p'); questionText.innerHTML = `<span class="emoji">❓</span> ${safeText(q, 'question', 'Pregunta no disponible...')}`; questionBlock.appendChild(questionText); let optionsToShow = [...q.options]; if (currentTestStage === 2) { optionsToShow = optionsToShow.filter(opt => top3Profiles.includes(opt.profile)); } else { optionsToShow = optionsToShow.filter(opt => opt.profile !== 'Bloque'); } optionsToShow = shuffleArray(optionsToShow).slice(0, 4); if (optionsToShow.length < 1) { console.warn(`Pregunta ${safeText(q, 'id', 'desconocida')} sin opciones válidas para etapa ${currentTestStage}. Saltando.`); currentQuestionIndex++; displaySingleQuestion(); return; } optionsToShow.forEach((opt, idx) => { const label = document.createElement('label'); label.className = 'option-label'; const id = `q${currentTestStage}_${currentQuestionIndex}_opt${idx}`; const radio = document.createElement('input'); radio.type = 'radio'; radio.name = `q_group_${currentTestStage}_${currentQuestionIndex}`; radio.value = opt.profile; radio.id = id; radio.addEventListener('change', handleAnswerSelection); const span = document.createElement('span'); span.textContent = ` ${safeText(opt, 'text', 'Opción no disponible')}`; label.setAttribute('for', id); label.appendChild(radio); label.appendChild(span); questionBlock.appendChild(label); }); elements.questionDisplay.appendChild(questionBlock); requestAnimationFrame(() => { questionBlock.classList.add('active'); }); elements.finishBtn.style.display = 'inline-flex'; }, existingQuestion ? 180 : 50); }
function handleAnswerSelection(event) { const radio = event.target; if (!radio.checked) return; const selectedProfile = radio.value; const questionBlock = radio.closest('.single-question-container'); if (!questionBlock) return; const questionArrayIndex = parseInt(questionBlock.getAttribute('data-question-index'), 10); const currentAnswers = (currentTestStage === 1) ? userAnswers1 : userAnswers2; currentAnswers[questionArrayIndex] = selectedProfile; const optionsInBlock = questionBlock.querySelectorAll('.option-label'); optionsInBlock.forEach(lbl => { lbl.classList.remove('selected'); const r = lbl.querySelector('input[type="radio"]'); if(r) r.disabled = true; lbl.style.pointerEvents = 'none'; lbl.style.cursor = 'default';}); if (radio.parentElement.classList.contains('option-label')) { radio.parentElement.classList.add('selected'); } questionBlock.classList.remove('active'); questionBlock.classList.add('exiting'); setTimeout(() => { currentQuestionIndex++; displaySingleQuestion(); }, 200); }
function calculateProfileScores(answers) { const scores = {}; let count = 0; for (const idx in answers) { const profile = answers[idx]; if (profile && profile !== 'Bloque') { scores[profile] = (scores[profile] || 0) + 1; count++; } } return { scores, count }; }
function confirmExitTest() { if (isTestActive && (Object.keys(userAnswers1).length > 0 || Object.keys(userAnswers2).length > 0)) { if (confirm("¿Seguro que quieres salir? Perderás el progreso actual del test.")) { goHome(); } } else { goHome(); } }

// --- RESULTADOS PARCIALES Y FINALES ---
function showResults() { if (currentTestStage === 1) { showPartialResults(); } else if (currentTestStage === 2) { calculateAndShowFinalResults(); } else { goHome(); } }
function showPartialResults() { const { scores: scores1, count: answeredCount1 } = calculateProfileScores(userAnswers1); profileScores1 = scores1; if (answeredCount1 === 0) { alert("Responde al menos una pregunta para ver tu progreso parcial."); return; } if (!elements.partialInfo || !elements.partialList || !elements.partialAcc) return; elements.partialInfo.textContent = `Resultados basados en ${answeredCount1} de ${TEST1_QUESTIONS_COUNT} respuestas (Parte 1).`; const sortedScores1 = Object.entries(profileScores1).sort(([, scoreA], [, scoreB]) => scoreB - scoreA); top3Profiles = sortedScores1.slice(0, 3).map(([profile]) => profile); elements.partialList.innerHTML = top3Profiles.map(profile => { const score = profileScores1[profile] || 0; const emoji = profileEmojis[profile] || '🏆'; return `<li><span class="emoji">${emoji}</span> ${profile} (${score} ${score === 1 ? 'pto' : 'ptos'})</li>`; }).join(''); if (top3Profiles.length === 0) { elements.partialList.innerHTML = '<li>Aún no hay suficientes respuestas para identificar perfiles.</li>'; } const accuracy1 = TEST1_QUESTIONS_COUNT > 0 ? Math.round((answeredCount1 / TEST1_QUESTIONS_COUNT) * 100) : 0; elements.partialAcc.textContent = `Precisión estimada (Parte 1): ${accuracy1}%`; showSection('partial-results'); }
function continueToTest2() { if (top3Profiles.length === 0) { alert("No se pudieron determinar perfiles en la Parte 1. Reinicia el test."); goHome(); return; } startTestStage(2); }
function finishTestUsingStage1() { console.log("Finalizando test usando solo resultados de la Etapa 1."); const { scores: scores1, count: answeredCount1 } = calculateProfileScores(userAnswers1); profileScores1 = scores1; const sortedScores1 = Object.entries(profileScores1).sort(([, scoreA], [, scoreB]) => scoreB - scoreA); top3Profiles = sortedScores1.slice(0, 3).map(([profile]) => profile); if (top3Profiles.length > 0) { finalProfile = top3Profiles[0]; displayFinalResults(answeredCount1, TEST1_QUESTIONS_COUNT, 1); } else { showError("No se pudo determinar un perfil final con las respuestas de la Parte 1."); goHome(); } }
function calculateAndShowFinalResults() { const { scores: scores2, count: answeredCount2 } = calculateProfileScores(userAnswers2); profileScores2 = scores2; if (answeredCount2 === 0 && top3Profiles.length > 0) { finishTestUsingStage1(); return; } const combinedScores = { ...profileScores1 }; for (const profile in scores2) { combinedScores[profile] = (combinedScores[profile] || 0) + scores2[profile] * 1.5; } const sortedCombined = Object.entries(combinedScores).filter(([profile]) => top3Profiles.includes(profile)).sort(([, scoreA], [, scoreB]) => scoreB - scoreA); if (sortedCombined.length > 0) { finalProfile = sortedCombined[0][0]; } else if (top3Profiles.length > 0) { finalProfile = top3Profiles[0]; } else { showError("No se pudo determinar un perfil final."); goHome(); return; } const totalAnswered = Object.keys(userAnswers1).length + answeredCount2; const totalQuestions = TEST1_QUESTIONS_COUNT + totalQuestionsInStage; displayFinalResults(totalAnswered, totalQuestions, 2); }

// ** createCourseCard definido ANTES de displayFinalResults **
function createCourseCard(course) {
     if (!course || typeof course !== 'object') { console.error("Intento de crear tarjeta con datos inválidos:", course); return document.createElement('div'); }
     const div = document.createElement('div'); div.className = 'course-card';
     div._courseData = course;
     div.addEventListener('click', handleCourseCardClick); // OK, definida antes
     div.setAttribute('role', 'button'); div.setAttribute('tabindex', '0');
     div.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleCourseCardClick({ currentTarget: div }); } });

     const etapa = document.createElement('span'); etapa.className = 'course-etapa';
     etapa.textContent = safeText(course, ['Etapa', 'title'], 'N/A');
     div.appendChild(etapa);

     const name = document.createElement('span'); name.className = 'course-name';
     name.textContent = safeText(course, ['Curso', 'curso'], 'Curso ND');
     div.appendChild(name);

     const familia = document.createElement('span'); familia.className = 'course-familia';
     familia.textContent = safeText(course, ['Familia', 'familia'], 'N/A');
     div.appendChild(familia);

     return div;
}

// ** displayFinalResults que usa createCourseCard (definido arriba) **
function displayFinalResults(answeredCount, totalQuestionsPossible, stageCompleted) {
    if (!finalProfile || finalProfile === "Indefinido") { showError("Perfil final no determinado."); goHome(); return; }
    if (!elements.finalInfo || !elements.finalCourses || !elements.finalProfileName || !elements.finalTitle) { console.error("Elementos DOM para resultados finales no encontrados."); return; }

    const accuracy = totalQuestionsPossible > 0 ? Math.round((answeredCount / totalQuestionsPossible) * 100) : 0;
    const stageText = stageCompleted === 1 ? "Basado en Parte 1" : "Completo";
    elements.finalTitle.innerHTML = `<span class="emoji">🎉</span> ¡Test ${stageCompleted === 1 ? 'Parcial' : 'Completado'}! <span class="emoji">🎉</span>`;
    elements.finalInfo.innerHTML = `Precisión (${stageText}): ${accuracy}%. Tu perfil dominante es: <strong class="highlight-profile">${profileEmojis[finalProfile] || '⭐'} ${finalProfile}</strong>`;
    elements.finalProfileName.textContent = finalProfile;
    elements.finalCourses.innerHTML = '';
    const noResultsMessageContainer = document.getElementById('no-final-courses-message');
    if (noResultsMessageContainer) noResultsMessageContainer.style.display = 'none';

    const familiasDelPerfil = profileToFamiliaMap[finalProfile];

    if (!familiasDelPerfil || familiasDelPerfil.length === 0) {
        console.warn(`No se encontraron familias asociadas al perfil "${finalProfile}" en profileToFamiliaMap.`);
        if (noResultsMessageContainer) { noResultsMessageContainer.querySelector('.no-results-message').innerHTML = `😔 No hay familias profesionales directamente asociadas al perfil <strong>${finalProfile}</strong> en nuestro mapa. ¡Usa el buscador general para explorar!`; noResultsMessageContainer.style.display = 'block'; }
        showSection('final-results'); return;
    }

    const familiasNormalizadasMapa = familiasDelPerfil.map(normalizeFamiliaName);
    const recommendedCoursesDetails = courseData.filter(course => {
        const familiaCurso = safeText(course, ['Familia', 'familia'], ''); if (!familiaCurso) return false; const familiaCursoNormalizada = normalizeFamiliaName(familiaCurso); return familiasNormalizadasMapa.includes(familiaCursoNormalizada);
    });

    if (recommendedCoursesDetails.length > 0) {
        recommendedCoursesDetails.sort((a, b) => safeText(a, ['Etapa', 'title'], '').localeCompare(safeText(b, ['Etapa', 'title'], '')) || safeText(a, 'Curso', '').localeCompare(safeText(b, 'Curso', '')) );
        recommendedCoursesDetails.forEach(course => {
            elements.finalCourses.appendChild(createCourseCard(course)); // OK, createCourseCard definida antes
        });
    } else {
         if (noResultsMessageContainer) { const familiasBuscadasStr = familiasDelPerfil.slice(0, 3).join(', '); noResultsMessageContainer.querySelector('.no-results-message').innerHTML = `🤔 Aunque tu perfil <strong>${finalProfile}</strong> se asocia con familias como ${familiasBuscadasStr}..., no encontramos cursos específicos para ellas en nuestra base de datos actual. ¡Usa el buscador para explorar otras opciones!`; noResultsMessageContainer.style.display = 'block'; }
    }
    showSection('final-results');
}


// === INICIO APP ===
document.addEventListener('DOMContentLoaded', () => {
    // Cache DOM Elements
    elements.home = document.getElementById('home'); elements.test = document.getElementById('interactive-test'); elements.partial = document.getElementById('partial-results'); elements.final = document.getElementById('final-results'); elements.loading = document.getElementById('loading'); elements.error = document.getElementById('error-message'); elements.searchInput = document.getElementById('search-input'); elements.searchButton = document.getElementById('search-button'); elements.searchDisplay = document.getElementById('search-results-display'); elements.searchList = document.getElementById('search-results-list'); elements.closeSearchButton = document.getElementById('close-search-button'); elements.questionDisplay = document.getElementById('interactive-question-display'); elements.testTitle = document.getElementById('test-title'); elements.testProgress = document.getElementById('test-progress'); elements.progressBar = document.getElementById('progress-bar'); elements.finishBtn = document.getElementById('finish-test-button'); elements.exitTestButton = document.getElementById('exit-test-button'); elements.partialInfo = document.getElementById('partial-results-info'); elements.partialList = document.getElementById('partial-profiles-list'); elements.partialAcc = document.getElementById('partial-accuracy'); elements.continueTest2Button = document.getElementById('continue-test2-button'); elements.restartTestButton = document.getElementById('restart-test-button'); elements.finalTitle = document.getElementById('final-results-title'); elements.finalInfo = document.getElementById('final-profile-info'); elements.finalCourses = document.getElementById('recommended-courses-container'); elements.finalProfileName = document.getElementById('final-profile-name-results'); elements.goHomeFinalButton = document.getElementById('go-home-final-button'); elements.modal = document.getElementById('course-details-modal'); elements.modalBackdrop = document.getElementById('modal-backdrop'); elements.modalTitle = document.getElementById('modal-course-title'); elements.modalEtapa = document.getElementById('modal-course-etapa'); elements.modalFamilia = document.getElementById('modal-course-familia'); elements.modalDesc = document.getElementById('modal-course-desc-detallada'); elements.modalAprender = document.getElementById('modal-course-aprender'); elements.modalSalidas = document.getElementById('modal-course-salidas'); const fraseContainer = document.getElementById('modal-course-frase-container'); elements.modalFrase = fraseContainer ? fraseContainer.querySelector('em') : null; elements.startTestButton = document.getElementById('start-test-button'); elements.appTitle = document.getElementById('app-title'); elements.closeModalButton = document.getElementById('close-modal-button');

    // Add Event Listeners
    if (elements.appTitle) elements.appTitle.addEventListener('click', goHome); if (elements.searchButton) elements.searchButton.addEventListener('click', performSearch); if (elements.searchInput) elements.searchInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') { e.preventDefault(); performSearch(); } }); if (elements.closeSearchButton) elements.closeSearchButton.addEventListener('click', hideSearchResults); if (elements.startTestButton) elements.startTestButton.addEventListener('click', startTest); if (elements.exitTestButton) elements.exitTestButton.addEventListener('click', confirmExitTest); if (elements.finishBtn) elements.finishBtn.addEventListener('click', showResults); if (elements.continueTest2Button) elements.continueTest2Button.addEventListener('click', continueToTest2); if (elements.restartTestButton) elements.restartTestButton.addEventListener('click', goHome); if (elements.goHomeFinalButton) elements.goHomeFinalButton.addEventListener('click', goHome); if (elements.closeModalButton) elements.closeModalButton.addEventListener('click', closeCourseModal); if (elements.modalBackdrop) elements.modalBackdrop.addEventListener('click', closeCourseModal);
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && elements.modal?.classList.contains('visible')) { closeCourseModal(); } });

    loadData();
});
