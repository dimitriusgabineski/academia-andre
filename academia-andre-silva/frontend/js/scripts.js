// Este arquivo contém o código JavaScript para a aplicação frontend.
// Ele gerencia interações do usuário, comunicação com o backend e o estado da aplicação.

// Estado global da aplicação
const AppState = {
    alunos: [],
    professores: [],
    modalidades: [],
    pagamentos: []
};

// Função para buscar dados do backend
async function fetchData(endpoint) {
    try {
        const response = await fetch(`http://localhost:8080/api/${endpoint}`);
        if (!response.ok) {
            throw new Error(`Erro ao buscar ${endpoint}: ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error(`Erro ao buscar dados de ${endpoint}:`, error);
        alert(`Erro ao carregar dados: ${error.message}`);
    }
}

// Função para carregar alunos
async function loadAlunos() {
    const alunos = await fetchData('alunos');
    AppState.alunos = alunos?.data || [];
    console.log('Alunos carregados:', AppState.alunos);
}

// Função para carregar modalidades
async function loadModalidades() {
    const modalidades = await fetchData('modalidades');
    AppState.modalidades = modalidades?.data || [];
    console.log('Modalidades carregadas:', AppState.modalidades);
}

// Função para lidar com envio de formulário
function handleFormSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

    fetch('http://localhost:8080/api/example', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Sucesso:', data);
        alert('Formulário enviado com sucesso!');
    })
    .catch(error => console.error('Erro ao enviar formulário:', error));
}

// Função para inicializar a aplicação
async function init() {
    // Carregar dados iniciais
    await loadAlunos();
    await loadModalidades();

    // Adicionar event listeners
    const form = document.getElementById('exampleForm');
    if (form) {
        form.addEventListener('submit', handleFormSubmit);
    }

    console.log('Aplicação inicializada.');
}

// Inicializar a aplicação quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', init);