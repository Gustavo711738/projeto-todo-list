import { listarTarefas, alternarStatus, excluirTarefa } from './tasks.js';

const listaTarefas = document.getElementById('lista-tarefas');
const mensagemVazia = document.getElementById('mensagem-vazia');

export function renderizarTarefas(tarefas) {
  listaTarefas.innerHTML = '';
  if (tarefas.length === 0) {
    mensagemVazia.hidden = false;
    return;
  }
  mensagemVazia.hidden = true;
  tarefas.forEach(tarefa => {
    const li = document.createElement('li');
    li.className = 'tarefa' + (tarefa.status === 'concluída' ? ' concluida' : '');
    li.setAttribute('data-id', tarefa.id);

    // Info principal
    const info = document.createElement('div');
    info.className = 'info';
    info.innerHTML = `
      <span class="titulo">${escapeHTML(tarefa.titulo)}</span>
      <div class="descricao">${escapeHTML(tarefa.descricao)}</div>
      <div class="meta">
        <span class="prioridade-${tarefa.prioridade}">Prioridade: ${tarefa.prioridade}</span> |
        <span>Status: ${tarefa.status}</span> |
        <span>Data: ${formatarData(tarefa.dataCriacao)}</span>
      </div>
    `;

    // Ações do sistema
    const acoes = document.createElement('div');
    acoes.className = 'acoes';

    const btnConcluir = document.createElement('button');
    btnConcluir.textContent = tarefa.status === 'pendente' ? 'Concluir' : 'Desfazer';
    btnConcluir.className = 'btn-concluir';
    btnConcluir.onclick = () => alternarStatusHandler(tarefa.id);

    const btnEditar = document.createElement('button');
    btnEditar.textContent = 'Editar';
    btnEditar.className = 'btn-editar';
    btnEditar.onclick = () => abrirModalEdicao(tarefa);

    const btnExcluir = document.createElement('button');
    btnExcluir.textContent = 'Excluir';
    btnExcluir.className = 'btn-excluir';
    btnExcluir.onclick = () => excluirTarefaHandler(tarefa.id);

    acoes.append(btnConcluir, btnEditar, btnExcluir);

    li.append(info, acoes);
    listaTarefas.appendChild(li);
  });
}

function escapeHTML(texto) {
  const div = document.createElement('div');
  div.textContent = texto;
  return div.innerHTML;
}

function formatarData(isoString) {
  const data = new Date(isoString);
  return data.toLocaleDateString('pt-BR') + ' ' + data.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
}

// Handlers de ação (devem ser conectados no main.js)
let alternarStatusHandler = () => {};
let excluirTarefaHandler = () => {};
let abrirModalEdicao = () => {};

export function setAlternarStatusHandler(fn) { alternarStatusHandler = fn; }
export function setExcluirTarefaHandler(fn) { excluirTarefaHandler = fn; }
export function setAbrirModalEdicao(fn) { abrirModalEdicao = fn; }