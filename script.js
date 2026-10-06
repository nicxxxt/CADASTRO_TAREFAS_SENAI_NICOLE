document.addEventListener("DOMContentLoaded", () => {
    const campoTarefa = document.getElementById("campo-tarefa");
    const botaoAdicionar = document.getElementById("botao-adicionar");
    const listaTarefas = document.getElementById("lista-tarefas");
    const contadorTarefas = document.getElementById("contador-tarefas");
    const botaoAlternarTema = document.getElementById("botao-tema");
  
    // ================================
    // ATUALIZAR CONTADOR DE TAREFAS
    // ================================
    function atualizarContador() {
      if (!contadorTarefas) return;
  
      // Seleciona tarefas normais (desconsidera o perfil da criadora)
      const tarefasComuns = listaTarefas.querySelectorAll(".tarefa:not(.tarefa-criadora)");
      const tarefasPendentes = Array.from(tarefasComuns).filter(
        (t) => !t.classList.contains("concluida")
      );
  
      const total = tarefasPendentes.length;
  
      if (total === 1) {
        contadorTarefas.textContent = "1 tarefa pendente";
      } else {
        contadorTarefas.textContent = `${total} tarefas pendentes`;
      }
    }
  
    // ================================
    // ADICIONAR TAREFA
    // ================================
    function adicionarTarefa() {
      const texto = campoTarefa.value.trim();
  
      if (texto === "") {
        campoTarefa.focus();
        return;
      }
  
      const tarefa = document.createElement("li");
      tarefa.classList.add("tarefa");
  
      tarefa.innerHTML = `
        <span class="texto-tarefa">${texto}</span>
        <div class="acoes-tarefa">
          <button class="botao-concluir" title="Concluir tarefa">✓</button>
          <button class="botao-excluir" title="Excluir tarefa">✕</button>
        </div>
      `;
  
      listaTarefas.appendChild(tarefa);
  
      campoTarefa.value = "";
      campoTarefa.focus();
  
      atualizarContador();
    }
  
    // ================================
    // AÇÕES NAS TAREFAS (CONCLUIR E EXCLUIR)
    // ================================
    listaTarefas.addEventListener("click", (evento) => {
      const alvo = evento.target;
      const itemTarefa = alvo.closest(".tarefa");
  
      // Ignora se for o card da criadora
      if (!itemTarefa || itemTarefa.classList.contains("tarefa-criadora")) return;
  
      // Clique no botão Concluir (ou no ícone dentro dele)
      if (alvo.classList.contains("botao-concluir") || alvo.closest(".botao-concluir")) {
        itemTarefa.classList.toggle("concluida");
        atualizarContador();
      }
  
      // Clique no botão Excluir (ou no ícone dentro dele)
      if (alvo.classList.contains("botao-excluir") || alvo.closest(".botao-excluir")) {
        itemTarefa.remove();
        atualizarContador();
      }
    });
  
    // ================================
    // ALTERNAR TEMA (CLARO / ESCURO)
    // ================================
    if (botaoAlternarTema) {
      botaoAlternarTema.addEventListener("click", () => {
        document.body.classList.toggle("tema-escuro");
  
        // Troca o ícone do botão
        if (document.body.classList.contains("tema-escuro")) {
          botaoAlternarTema.textContent = "☀️";
        } else {
          botaoAlternarTema.textContent = "🌙";
        }
      });
    }
  
    // ================================
    // EVENTOS DE ENTRADA
    // ================================
    if (botaoAdicionar) {
      botaoAdicionar.addEventListener("click", adicionarTarefa);
    }
  
    if (campoTarefa) {
      campoTarefa.addEventListener("keypress", (evento) => {
        if (evento.key === "Enter") {
          adicionarTarefa();
        }
      });
    }
  
    atualizarContador();
  });