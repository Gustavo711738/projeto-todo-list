// events.js
// Responsável por adicionar e gerenciar eventos da interface

import { adicionarTarefa, editarTarefa, excluirTarefa, alternarStatus } from './tasks.js';
import { renderizarTarefas } from './dom.js';

// Inicia os eventos principais
export function inicializarEventos() {
  const form = document.querySelector('#form-tarefa');
  const inputTitulo = document.querySelector('#titulo');
  const inputDescricao = document.querySelector('#descricao');
  const inputPrioridade = document.querySelector('#prioridade');

  // Evento de envio do formulário (cadastro de tarefa)
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const titulo = inputTitulo.value.trim();
    const descricao = inputDescricao.value.trim();
    const prioridade = inputPrioridade.value;

    if (!titulo || !descricao) {
      alert('Preencha todos os campos obrigatórios!');
      return;
    }

    adicionarTarefa(titulo, descricao, prioridade);
    renderizarTarefas(listarTarefas());
    form.reset();
  });

  // Delegação de eventos para botões de ação nas tarefas
  document.querySelector('#lista-tarefas').addEventListener('click', (e) => {
    const id = e.target.closest('.tarefa')?.dataset.id;

    if (e.target.classList.contains('btn-concluir')) {
      alternarStatus(id);
      renderizarTarefas(listarTarefas());
    }

    if (e.target.classList.contains('btn-editar')) {
      editarTarefa(id);
      renderizarTarefas(listarTarefas());
    }

    if (e.target.classList.contains('btn-excluir')) {
      excluirTarefa(id);
      renderizarTarefas(listarTarefas());
    }
  });
}