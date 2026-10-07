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

    // Seleciona tarefas normais
    const tarefasComuns = listaTarefas.querySelectorAll(
      ".tarefa:not(.tarefa-criadora)"
    );

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
  // SALVAR TAREFAS NO LOCALSTORAGE
  // ================================
  function salvarTarefas() {
    const tarefas = [];

    const todosOsItens = listaTarefas.querySelectorAll(".tarefa");

    todosOsItens.forEach((tarefa) => {
      // Não salva o card da criadora
      if (tarefa.classList.contains("tarefa-criadora")) return;

      const texto = tarefa.querySelector(".texto-tarefa");

      if (!texto) return;

      tarefas.push({
        texto: texto.textContent,
        concluida: tarefa.classList.contains("concluida")
      });
    });

    localStorage.setItem("tarefas", JSON.stringify(tarefas));
  }

  // ================================
  // CARREGAR TAREFAS SALVAS
  // ================================
  function carregarTarefas() {
    const tarefasSalvas = localStorage.getItem("tarefas");

    if (!tarefasSalvas) return;

    const tarefas = JSON.parse(tarefasSalvas);

    tarefas.forEach((dadosTarefa) => {
      const tarefa = document.createElement("li");
      tarefa.classList.add("tarefa");

      if (dadosTarefa.concluida) {
        tarefa.classList.add("concluida");
      }

      tarefa.innerHTML = `
        <span class="texto-tarefa"></span>

        <div class="acoes-tarefa">
          <button class="botao-concluir" title="Concluir tarefa">✓</button>
          <button class="botao-excluir" title="Excluir tarefa">✕</button>
        </div>
      `;

      // Usamos textContent para evitar problemas com HTML digitado na tarefa
      tarefa.querySelector(".texto-tarefa").textContent = dadosTarefa.texto;

      listaTarefas.appendChild(tarefa);
    });
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
      <span class="texto-tarefa"></span>

      <div class="acoes-tarefa">
        <button class="botao-concluir" title="Concluir tarefa">✓</button>
        <button class="botao-excluir" title="Excluir tarefa">✕</button>
      </div>
    `;

    // Coloca o texto da tarefa com segurança
    tarefa.querySelector(".texto-tarefa").textContent = texto;

    listaTarefas.appendChild(tarefa);

    // Salva imediatamente
    salvarTarefas();

    campoTarefa.value = "";
    campoTarefa.focus();

    atualizarContador();
  }

  // ================================
  // AÇÕES NAS TAREFAS
  // ================================
  listaTarefas.addEventListener("click", (evento) => {
    const alvo = evento.target;
    const itemTarefa = alvo.closest(".tarefa");

    // Ignora o card da criadora
    if (
      !itemTarefa ||
      itemTarefa.classList.contains("tarefa-criadora")
    ) {
      return;
    }

    // ================================
    // CONCLUIR TAREFA
    // ================================
    if (
      alvo.classList.contains("botao-concluir") ||
      alvo.closest(".botao-concluir")
    ) {
      itemTarefa.classList.toggle("concluida");

      // Salva a alteração
      salvarTarefas();

      atualizarContador();
    }

    // ================================
    // EXCLUIR TAREFA
    // ================================
    if (
      alvo.classList.contains("botao-excluir") ||
      alvo.closest(".botao-excluir")
    ) {
      itemTarefa.remove();

      // Salva depois de excluir
      salvarTarefas();

      atualizarContador();
    }
  });

  // ================================
  // ALTERNAR TEMA
  // ================================
  if (botaoAlternarTema) {
    botaoAlternarTema.addEventListener("click", () => {
      document.body.classList.toggle("tema-escuro");

      if (document.body.classList.contains("tema-escuro")) {
        botaoAlternarTema.textContent = "☀️";

        // Salva o tema
        localStorage.setItem("tema", "escuro");
      } else {
        botaoAlternarTema.textContent = "🌙";

        // Salva o tema
        localStorage.setItem("tema", "claro");
      }
    });
  }

  // ================================
  // CARREGAR TEMA SALVO
  // ================================
  function carregarTema() {
    const temaSalvo = localStorage.getItem("tema");

    if (temaSalvo === "escuro") {
      document.body.classList.add("tema-escuro");

      if (botaoAlternarTema) {
        botaoAlternarTema.textContent = "☀️";
      }
    } else {
      document.body.classList.remove("tema-escuro");

      if (botaoAlternarTema) {
        botaoAlternarTema.textContent = "🌙";
      }
    }
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

  // ================================
  // INICIALIZAÇÃO
  // ================================
  carregarTarefas();
  carregarTema();
  atualizarContador();
});