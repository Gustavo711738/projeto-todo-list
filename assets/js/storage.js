const STORAGE_KEY = 'tarefas';

export function salvarTarefas(tarefas) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tarefas));
}

export function carregarTarefas() {
  const dados = localStorage.getItem(STORAGE_KEY);
  return dados ? JSON.parse(dados) : [];
}