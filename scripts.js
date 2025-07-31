const companyData = {
  categories: [
    { id: 'plain-cotton', name: 'Plain Cotton' },
    { id: 'dobby design', name: 'Dobby Design' },
    { id: 'slub fabric', name: 'Slub Fabric' },
    { id: 'T&T fabric', name: 'T&T Fabric' },
    { id: 'cotton-velvet', name: 'Cotton-Velvet'}
  ],
  samples:[
    { id: 1, name: 'Plain', category: 'plain-cotton', shortDescription: '100% pure cotton, 10s x 6s',
      detailedDescription: 'Premium quality 100% pure cotton fabric 10s x 6s.',
      specifications: { Serial_Number:'205',Width: '45-130 inches', Composition: '100% Cotton',Volume:'02',Style_No:'#08' }, image: 'plain-cotton-1.jpg' },
    { id: 2, name: '2/2 Khaadi Fabric', category: 'plain-cotton', shortDescription: 'Khadi Fabric',
      detailedDescription: 'Premium quality 100% pure cotton 2/2 Khadi Fabric .',
      specifications: { Serial_Number:'310',Width: '45-130 inches', Composition: '100% Cotton',Volume:'03',Style_No:'#72' }, image: 'plain-cotton-2.jpg' },
    { id: 3, name: 'Khadi(H)', category: 'plain-cotton', shortDescription: 'Khadi(H) Fabric',
      detailedDescription: 'Khadi(H) Fabric is a premium quality 100% pure cotton fabric.',
      specifications: { Art_no:'17',Width: '45-130 inches', Composition: '100% Cotton',Yarn:'10s' }, image: 'plain-cotton-3.jpg' },
    { id: 4, name: 'Dari Fabric 2/5x2/5', category: 'plain-cotton', shortDescription: 'Dari Fabric 2/5x2/5',
      detailedDescription: 'Premium quality 100% pure cotton Dari Fabric 2/5x2/5.',
      specifications: { Serial_Number:'215',Width: '45-130 inches', Composition: '100% Cotton',Volume:'02',Style_No:'#13' }, image: 'plain-cotton-4.jpg' },
    { id: 5, name: 'Casmait', category: 'plain-cotton', shortDescription: 'Casmait Fabric',
      detailedDescription: 'Casmait Fabric is a premium quality 100% pure cotton fabric.',
      specifications: { Art_no:'18',Width: '45-130 inches', Composition: '100% Cotton',Yarn:'2/20' }, image: 'plain-cotton-5.jpg' },
    { id: 6, name: 'Matty 2/5x2/5', category: 'plain-cotton', shortDescription: 'Matty 2/5x2/5',
      detailedDescription: 'Premium quality 100% pure cotton Matty 2/5x2/5.',
      specifications: { Serial_Number:'217',Width: '45-130 inches', Composition: '100% Cotton',Volume:'02',Style_No:'#96' }, image: 'plain-cotton-6.jpg' },
    { id: 7, name: 'Bihavi Cotton', category: 'plain-cotton', shortDescription: 'Bihavi Cotton Fabric',
      detailedDescription: 'Bihavi  Fabric is a premium quality 100% pure cotton fabric.',
      specifications: { Art_no:'12',Width: '45-130 inches', Composition: '100% Cotton',Yarn:'2/40' }, image: 'plain-cotton-7.jpg' },
    { id: 8, name: 'Ring Spun 2/6x2/6', category: 'plain-cotton', shortDescription: 'Ring Spun 2/6x2/6',
      detailedDescription: 'Premium quality 100% pure cotton Ring Spun 2/6x2/6.',
      specifications: { Serial_Number:'216',Width: '45-130 inches', Composition: '100% Cotton',Volume:'02',Style_No:'#110' }, image: 'plain-cotton-8.jpg' },
    { id: 9, name: 'Burlap Heavy 2/6x2/6', category: 'plain-cotton', shortDescription: 'Burlap Heavy 2/6x2/6',
      detailedDescription: 'Premium quality 100% pure cotton Burlap Heavy 2/6x2/6.',
      specifications: { Serial_Number:'213',Width: '45-130 inches', Composition: '100% Cotton',Volume:'02',Style_No:'#31' }, image: 'plain-cotton-9.jpg' },
    { id: 10, name: 'Burlap Heavy 2/10x2/6', category: 'plain-cotton', shortDescription: 'Burlap Heavy 2/10x2/6',
      detailedDescription: 'Premium quality 100% pure cotton Burlap Heavy 2/10x2/6.',
      specifications: { Serial_Number:'214',Width: '45-130 inches', Composition: '100% Cotton',Volume:'02',Style_No:'#23' }, image: 'plain-cotton-10.jpg' },
    { id: 11, name: 'Casment 2/10x2/10', category: 'plain-cotton', shortDescription: 'Casment 2/10x2/10',
      detailedDescription: 'Premium quality 100% pure cotton Casment 2/10x2/10.',
      specifications: { Serial_Number:'218',Width: '45-130 inches', Composition: '100% Cotton',Volume:'02',Style_No:'#45' }, image: 'plain-cotton-11.jpg' },  
    ]
};

const categoryTabs = document.getElementById('categoryTabs');
const samplesGrid = document.getElementById('samplesGrid');
const searchInput = document.getElementById('searchInput');
const sampleModal = document.getElementById('sampleModal');
const modalTitle = document.getElementById('modalTitle');
const modalImage = document.getElementById('modalImage');
const modalDescription = document.getElementById('modalDescription');
const modalSpecsBody = document.querySelector('#modalSpecs tbody');
const modalCloseBtn = document.getElementById('modalCloseBtn');

let activeCategory = 'all';

function createCategoryTabs() {
  const allTab = document.createElement('div');
  allTab.className = 'category-tab active';
  allTab.textContent = 'All';
  allTab.dataset.cat = 'all';
  allTab.addEventListener('click', () => setActiveCategory('all'));
  categoryTabs.appendChild(allTab);

  companyData.categories.forEach(cat => {
    const tab = document.createElement('div');
    tab.className = 'category-tab';
    tab.textContent = cat.name;
    tab.dataset.cat = cat.id;
    tab.addEventListener('click', () => setActiveCategory(cat.id));
    categoryTabs.appendChild(tab);
  });
}

function setActiveCategory(catId) {
  activeCategory = catId;
  Array.from(categoryTabs.children).forEach(tab => {
    tab.classList.toggle('active', tab.dataset.cat === catId);
  });
  renderSamples();
}

function renderSamples() {
  const searchTerm = searchInput.value.trim().toLowerCase();
  samplesGrid.innerHTML = '';

  const filteredSamples = companyData.samples.filter(sample => {
    const matchesCategory = activeCategory === 'all' || sample.category === activeCategory;
    const matchesSearch = sample.name.toLowerCase().includes(searchTerm) || sample.shortDescription.toLowerCase().includes(searchTerm);
    return matchesCategory && matchesSearch;
  });

  if (filteredSamples.length === 0) {
    samplesGrid.innerHTML = '<p>No fabrics found matching your criteria.</p>';
    return;
  }

  filteredSamples.forEach(sample => {
    const card = document.createElement('div');
    card.className = 'sample-card';
    card.tabIndex = 0;
    card.setAttribute('role', 'button');
    card.setAttribute('aria-label', `View details for ${sample.name}`);
    card.addEventListener('click', () => openModal(sample.id));
    card.addEventListener('keypress', e => {
      if (e.key === 'Enter') openModal(sample.id);
    });

    const img = document.createElement('img');
    img.className = 'sample-image';
    img.src = `images/${sample.image}`;
    img.alt = sample.name;

    const nameEl = document.createElement('h3');
    nameEl.className = 'sample-name';
    nameEl.textContent = sample.name;

    const descEl = document.createElement('p');
    descEl.className = 'sample-desc';
    descEl.textContent = sample.shortDescription;

    card.appendChild(img);
    card.appendChild(nameEl);
    card.appendChild(descEl);

    samplesGrid.appendChild(card);
  });
}

function openModal(sampleId) {
  const sample = companyData.samples.find(s => s.id === sampleId);
  if (!sample) return;

  modalTitle.textContent = sample.name;
  modalImage.src = `images/${sample.image}`;
  modalImage.alt = sample.name;
  modalDescription.textContent = sample.detailedDescription;

  modalSpecsBody.innerHTML = '';
  Object.entries(sample.specifications).forEach(([key, value]) => {
    const row = document.createElement('tr');
    const keyTd = document.createElement('td');
    keyTd.textContent = key;
    const valTd = document.createElement('td');
    valTd.textContent = value;
    row.appendChild(keyTd);
    row.appendChild(valTd);
    modalSpecsBody.appendChild(row);
  });

  sampleModal.style.display = 'block';
  sampleModal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  sampleModal.style.display = 'none';
  sampleModal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

modalCloseBtn.addEventListener('click', closeModal);
window.addEventListener('click', (e) => {
  if (e.target === sampleModal) closeModal();
});

window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && sampleModal.style.display === 'block') closeModal();
});

searchInput.addEventListener('input', renderSamples);

createCategoryTabs();
renderSamples();