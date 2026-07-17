const languageButtons = document.querySelectorAll('.language-button');
let language = 'es';
const base = 'FOTOS_RENDERS%20PROYECTOS/';
const galleries = {
  'Casa Cantaluna': ['cantaluna-exterior.png','cantaluna-noche.png'],
  'Casa Rosso': ['CASA%20ROSSO/IMG_7560.JPG','CASA%20ROSSO/IMG_7801.JPG','CASA%20ROSSO/IMG_7802.JPG','CASA%20ROSSO/IMG_7804.JPG','CASA%20ROSSO/IMG_7805.JPG'],
  'Casa CR': ['CASA%20CR/IMG_1072.JPG','CASA%20CR/IMG_1086.JPG','CASA%20CR/IMG_1087.JPG','CASA%20CR/IMG_1089.JPG','CASA%20CR/IMG_1093.JPG'],
  'Casa La Toja': ['CASA%20LA%20TOJA/IMG_6449.jpg','CASA%20LA%20TOJA/IMG_7600.JPG','CASA%20LA%20TOJA/IMG_7610.JPG'],
  'Casa Estuario': ['CASA%20ESTUARIO/FRENTE%201.jpg','CASA%20ESTUARIO/ACCESO%202.jpg','CASA%20ESTUARIO/ACCESO%203.jpg','CASA%20ESTUARIO/INTERIOR%201.1.jpg'],
  'Casa JP': ['CASA%20JP/6.jpg','CASA%20JP/PISCINA%201%20NOCHE.jpg','CASA%20JP/PISCINA%203.jpg','CASA%20JP/SALON%20DE%20JUEGOS%20NOCHE.jpg'],
  'Casa PS': ['CASA%20PS/FRENTE%201.jpg','CASA%20PS/FRENTE%202.jpg','CASA%20PS/JARDIN%20INTERIOR%203.jpg','CASA%20PS/PISCINA%202.jpg'],
  'Casa JN': ['CASA%20JN/FRENTE%203%20NOCHE.png','CASA%20JN/FRENTE%204.png','CASA%20JN/FRENTE%20L2%201.png','CASA%20JN/FRENTE%20LI%201.png'],
  'Casa San Antero': ['CASA%20SAN%20ANTERO/AEREA%202.png','CASA%20SAN%20ANTERO/ACCESO%204.png','CASA%20SAN%20ANTERO/FRENTE%202.png','CASA%20SAN%20ANTERO/FRENTE%202%20TARDE.png'],
  'Marina Barú': ['CASA%20MARINA%20BARU/magnific_generate-9-different-angl_rlo6IPixtc.png','CASA%20MARINA%20BARU/magnific_generate-a-cinematic-stor_aQnl75ZfSh.png','CASA%20MARINA%20BARU/magnific_generate-a-cinematic-stor_YVUou7uWeC.png','CASA%20MARINA%20BARU/MB%20IA%206%20NOCHE.png'],
  'Casa León': ['CASA%20LEON/F1.2.png','CASA%20LEON/F2.1%20DIA.png','CASA%20LEON/F2.2%20NOCHE.png','CASA%20LEON/magnific_task-photorealistic-dayli_8v0vyluIrU.png'],
  'Casa Cerro Vento': ['CASA%20CERRO%20VENTO/1.jpg','CASA%20CERRO%20VENTO/2.jpg','CASA%20CERRO%20VENTO/3.jpg','CASA%20CERRO%20VENTO/5.jpg'],
  'Casa JC Tonusco': ['CASA%20JC%20TONUSCO/ACCESO%201.jpg','CASA%20JC%20TONUSCO/ACCESO%203.jpg','CASA%20JC%20TONUSCO/ACCESO%204.jpg','CASA%20JC%20TONUSCO/ACCESO%205.jpg','CASA%20JC%20TONUSCO/FRENTE%201.jpg','CASA%20JC%20TONUSCO/FRENTE%203.jpg'],
  'Casa Arrieta': ['CASA%20ARRIETA/IMG_4092.JPG','CASA%20ARRIETA/IMG_7220.JPG','CASA%20ARRIETA/IMG_7838.JPG','CASA%20ARRIETA/IMG_7844%201.JPG','CASA%20ARRIETA/IMG_7847.JPG','CASA%20ARRIETA/IMG_7850.JPG','CASA%20ARRIETA/IMG_7854%201.JPG','CASA%20ARRIETA/IMG_7855.JPG'],
  'Casa Bracamonte': ['CASA%20BRACAMONTE/ACCESO%201.jpg','CASA%20BRACAMONTE/ACCESO%202.jpg','CASA%20BRACAMONTE/FRENTE%201.jpg','CASA%20BRACAMONTE/TERRAZA%201%20NIEBLA.jpg','CASA%20BRACAMONTE/TERRAZA%203.jpg'],
  'Casa Montesereno': ['CASA%20MONTESERENO%20312/IMG_6949.jpg','CASA%20MONTESERENO%20312/IMG_6958.JPG','CASA%20MONTESERENO%20312/IMG_6962.JPG']
};

function setLanguage(nextLanguage) {
  language = nextLanguage;
  document.documentElement.lang = language;
  document.querySelectorAll('[data-es][data-en]').forEach((element) => element.innerHTML = element.dataset[language]);
  languageButtons.forEach((button) => {
    const active = button.dataset.language === language;
    button.classList.toggle('active', active);
    button.setAttribute('aria-pressed', String(active));
  });
  document.title = language === 'es' ? 'Arquattro — Portafolio' : 'Arquattro — Portfolio';
}

function openProject(card) {
  const title = card.querySelector('h3').textContent;
  const images = galleries[title] || [];
  const status = card.querySelector('p').textContent.trim();
  const modal = document.getElementById('project-modal');
  const titleNode = modal.querySelector('h2');
  const statusNode = modal.querySelector('.modal-status');
  const main = modal.querySelector('.modal-main');
  const thumbs = modal.querySelector('.modal-thumbs');
  titleNode.textContent = title;
  statusNode.textContent = status;
  thumbs.innerHTML = '';
  if (images.length) {
    main.src = images[0].startsWith('cantaluna-') ? images[0] : base + images[0]; main.alt = title;
    images.forEach((image, index) => {
      const thumb = document.createElement('img');
      thumb.src = image.startsWith('cantaluna-') ? image : base + image; thumb.alt = `${title} ${index + 1}`; thumb.className = `modal-thumb ${index === 0 ? 'active' : ''}`;
      thumb.addEventListener('click', () => { main.src = thumb.src; thumbs.querySelectorAll('.modal-thumb').forEach((item) => item.classList.remove('active')); thumb.classList.add('active'); });
      thumbs.appendChild(thumb);
    });
    modal.querySelector('.modal-note').textContent = language === 'es' ? 'Seleccione una imagen para ampliar la mirada del proyecto.' : 'Select an image to explore the project further.';
  } else {
    main.removeAttribute('src'); main.alt = '';
    modal.querySelector('.modal-note').textContent = language === 'es' ? 'La selección visual de este proyecto está en proceso de curaduría.' : 'The visual selection for this project is currently being curated.';
  }
  modal.classList.add('open'); modal.setAttribute('aria-hidden', 'false'); document.body.style.overflow = 'hidden';
}

function closeProject() { const modal = document.getElementById('project-modal'); modal.classList.remove('open'); modal.setAttribute('aria-hidden', 'true'); document.body.style.overflow = ''; }

document.querySelectorAll('.project-card').forEach((card) => { card.tabIndex = 0; card.setAttribute('role', 'button'); card.setAttribute('aria-label', `Abrir ${card.querySelector('h3').textContent}`); card.addEventListener('click', () => openProject(card)); card.addEventListener('keydown', (event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); openProject(card); } }); });
languageButtons.forEach((button) => button.addEventListener('click', () => setLanguage(button.dataset.language)));
document.getElementById('year').textContent = new Date().getFullYear();
document.body.insertAdjacentHTML('beforeend', '<section class="project-modal" id="project-modal" aria-hidden="true" role="dialog" aria-modal="true"><button class="modal-close" aria-label="Cerrar">×</button><div class="modal-head"><p class="modal-status"></p><h2></h2></div><div class="modal-gallery"><img class="modal-main" alt=""><div class="modal-thumbs"></div></div><p class="modal-note"></p></section>');
document.querySelector('.modal-close').addEventListener('click', closeProject);
document.addEventListener('keydown', (event) => { if (event.key === 'Escape') closeProject(); });

