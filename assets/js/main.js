import { listarTarefas, adicionarTarefa, editarTarefa, excluirTarefa, alternarStatus, buscarTarefas } from './tasks.js';
import { renderizarTarefas, setAlternarStatusHandler, setExcluirTarefaHandler, setAbrirModalEdicao } from './dom.js';
import { inicializarEventos } from './events.js';
// Inicialização
function atualizarLista(termo = '') {
  const tarefas = termo ? buscarTarefas(termo) : listarTarefas();
  renderizarTarefas(tarefas);
}

// Handlers
setAlternarStatusHandler(id => {
  alternarStatus(id);
  atualizarLista(document.getElementById('busca').value);
});

setExcluirTarefaHandler(id => {
  if (confirm('Deseja realmente excluir esta tarefa?')) {
    excluirTarefa(id);
    atualizarLista(document.getElementById('busca').value);
  }
});

setAbrirModalEdicao(tarefa => {
  document.getElementById('modal-edicao').hidden = false;
  document.getElementById('edit-id').value = tarefa.id;
  document.getElementById('edit-titulo').value = tarefa.titulo;
  document.getElementById('edit-descricao').value = tarefa.descricao;
  document.getElementById('edit-prioridade').value = tarefa.prioridade;
  document.getElementById('edit-titulo').focus();
});

// Formulário de nova tarefa
document.getElementById('task-form').addEventListener('submit', e => {
  e.preventDefault();
  const titulo = document.getElementById('titulo').value;
  const descricao = document.getElementById('descricao').value;
  const prioridade = document.getElementById('prioridade').value;
  if (!titulo.trim()) {
    alert('O título é obrigatório.');
    return;
  }
  adicionarTarefa({ titulo, descricao, prioridade });
  e.target.reset();
  atualizarLista();
});

// Busca em tempo real
document.getElementById('busca').addEventListener('input', e => {
  atualizarLista(e.target.value);
});

// Modal de edição
document.getElementById('form-edicao').addEventListener('submit', e => {
  e.preventDefault();
  const id = document.getElementById('edit-id').value;
  const titulo = document.getElementById('edit-titulo').value;
  const descricao = document.getElementById('edit-descricao').value;
  const prioridade = document.getElementById('edit-prioridade').value;
  if (!titulo.trim()) {
    alert('O título é obrigatório.');
    return;
  }
  editarTarefa(id, { titulo, descricao, prioridade });
  document.getElementById('modal-edicao').hidden = true;
  atualizarLista(document.getElementById('busca').value);
});

document.getElementById('btn-cancelar-edicao').addEventListener('click', () => {
  document.getElementById('modal-edicao').hidden = true;
});

// Fechar modal ao pressionar ESC
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    document.getElementById('modal-edicao').hidden = true;
  }
});

// Inicialização da lista
atualizarLista();