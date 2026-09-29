const campoTarefa = document.getElementById("campo-tarefa");
const botaoAdicionar = document.getElementById("botao-adicionar");
const listaTarefas = document.getElementById("lista-tarefas");
const contadorTarefas = document.getElementById("contador-tarefas");
const botaoAlternarTema = document.getElementById("botao-alternar-tema");

// ================================
// ADICIONAR TAREFA
// ================================

function adicionarTarefa() {
const texto = campoTarefa.value.trim();

// Não permite adicionar tarefa vazia
if (texto === "") {
    campoTarefa.focus();
    return;
}

// Cria o item da lista
const tarefa = document.createElement("li");
tarefa.classList.add("tarefa");

tarefa.innerHTML = `
    <span class="texto-tarefa">${texto}</span>

    <div class="acoes-tarefa">
        <button class="botao-concluir" title="Concluir tarefa">
            <i class="fa-solid fa-check"></i>
        </button>

        <button class="botao-excluir" title="Excluir tarefa">
            <i class="fa-solid fa-trash"></i>
        </button>
    </div>
`;

// Adiciona a tarefa na lista
listaTarefas.appendChild(tarefa);

// Limpa o campo
campoTarefa.value = "";

// Coloca o cursor novamente no campo
campoTarefa.focus();

// Atualiza o contador
atualizarContador();


}

// ================================
// CONCLUIR OU EXCLUIR TAREFA
// ================================

listaTarefas.addEventListener("click", function (event) {

// Procura o botão de concluir
const botaoConcluir = event.target.closest(".botao-concluir");

// Procura o botão de excluir
const botaoExcluir = event.target.closest(".botao-excluir");


// Se clicou em concluir
if (botaoConcluir) {
    const tarefa = botaoConcluir.closest(".tarefa");

    tarefa.classList.toggle("concluida");

    atualizarContador();
}


// Se clicou em excluir
if (botaoExcluir) {
    const tarefa = botaoExcluir.closest(".tarefa");

    tarefa.remove();

    atualizarContador();
}


});

// ================================
// CONTADOR DE TAREFAS
// ================================

function atualizarContador() {
const tarefas = listaTarefas.querySelectorAll(".tarefa");

const total = tarefas.length;

const concluidas = listaTarefas.querySelectorAll(".tarefa.concluida").length;

const pendentes = total - concluidas;


if (total === 0) {
    contadorTarefas.textContent = "0 tarefas na lista";
} else if (pendentes === 1) {
    contadorTarefas.textContent = "1 tarefa pendente";
} else {
    contadorTarefas.textContent = `${pendentes} tarefas pendentes`;
}


}

// ================================
// BOTÃO ADICIONAR
// ================================

botaoAdicionar.addEventListener("click", adicionarTarefa);

// ================================
// ADICIONAR COM A TECLA ENTER
// ================================

campoTarefa.addEventListener("keydown", function (event) {

if (event.key === "Enter") {
    adicionarTarefa();
}


});

// ================================
// ALTERNAR TEMA
// ================================

botaoAlternarTema.addEventListener("click", function () {

document.body.classList.toggle("tema-escuro");

const icone = botaoAlternarTema.querySelector("i");

if (document.body.classList.contains("tema-escuro")) {

    // Lua vira sol
    icone.classList.remove("fa-moon");
    icone.classList.add("fa-sun");

} else {

    // Sol vira lua
    icone.classList.remove("fa-sun");
    icone.classList.add("fa-moon");
}


});

// ================================
// INICIALIZAÇÃO
// ================================

atualizarContador();
campoTarefa.focus();