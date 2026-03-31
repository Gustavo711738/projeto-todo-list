import { gerarUUID } from './utils.js';
import { salvarTarefas, carregarTarefas } from './storage.js';

let tarefas = carregarTarefas();

export function listarTarefas() {
  return tarefas;
}

// Adiciona uma nova tarefa à lista
export function adicionarTarefa({ titulo, descricao, prioridade }) {
  const novaTarefa = {
    id: gerarUUID(),
    titulo: titulo.trim(),
    descricao: descricao.trim(),
    dataCriacao: new Date().toISOString(),
    prioridade,
    status: 'pendente'
  };

  tarefas.push(novaTarefa);
  salvarTarefas(tarefas);
  return novaTarefa;
}

// // Edita uma tarefa existente com base no ID
export function editarTarefa(id, dados) {
  const tarefa = tarefas.find(t => t.id === id);
  if (tarefa) {
    tarefa.titulo = dados.titulo.trim();
    tarefa.descricao = dados.descricao.trim();
    tarefa.prioridade = dados.prioridade;
    salvarTarefas(tarefas);
  }
}

// Remove uma tarefa pelo ID
export function excluirTarefa(id) {
  tarefas = tarefas.filter(t => t.id !== id);
  salvarTarefas(tarefas);
}

// Alterna o status da tarefa entre "pendente" e "concluída"
export function alternarStatus(id) {
  const tarefa = tarefas.find(t => t.id === id);
  if (tarefa) {
    tarefa.status = tarefa.status === 'pendente' ? 'concluída' : 'pendente';
    salvarTarefas(tarefas);
  }
}

// Busca tarefas que tenham o titulo com o termo informado
export function buscarTarefas(termo) {
  return tarefas.filter(t => t.titulo.toLowerCase().includes(termo.toLowerCase()));
}