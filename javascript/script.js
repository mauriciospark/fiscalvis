// Estrutura de dados de setores com ritmo de arrecadação

/*
  ============================================================================
  PROPRIETÁRIO: Mauricio Spark
  MARCA:        Spark Mauricio
  PROJETO:      FiscalVis
  VERSÃO:       v1.0.0
  LINHAGEM:     SPARK
  ============================================================================
  Documento de Planejamento de Escopo
  COPYRIGHT: © 2026 / Mauricio Spark. Todos os direitos reservados.
  ============================================================================
*/

const SETORES = {
    geral: {
        id: 'geral',
        nome: 'Geral',
        arrecadacaoPorSegundo: 107600.00,
        porcentagem: 1.0,
        descricao: 'Arrecadação Nacional Total'
    },
    exatas: {
        id: 'exatas',
        nome: 'Exatas',
        arrecadacaoPorSegundo: 107600.00 * 0.64, // 64% do valor geral
        porcentagem: 0.64,
        descricao: 'Tecnologia (T.I.), Mercado Financeiro, Indústrias, Engenharia, Petróleo e Energia'
    },
    humanas: {
        id: 'humanas',
        nome: 'Humanas',
        arrecadacaoPorSegundo: 107600.00 * 0.24, // 24% do valor geral
        porcentagem: 0.24,
        descricao: 'Comércio Varejista, Advocacia, Contabilidade, Administração, Educação e Marketing'
    },
    biologicas: {
        id: 'biologicas',
        nome: 'Biológicas',
        arrecadacaoPorSegundo: 107600.00 * 0.12, // 12% do valor geral
        porcentagem: 0.12,
        descricao: 'Hospitais, Clínicas, Indústria Farmacêutica, Agronegócio e Veterinária'
    }
};

// Dados fixos da nossa foto âncora de calibração
const VALOR_ANCORA = 1799099047546.14; // R$ 1.799.099.047.546,14
const DATA_ANCORA = new Date(2026, 5, 8, 12, 35, 0, 0); // 08/06/2026 às 12:35
const RITMO_GERAL_SEGUNDO = 107600.00;

let setorAtual = SETORES.geral;
let arrecadacaoPorSegundoAtual = SETORES.geral.arrecadacaoPorSegundo;
let arrecadacaoPorMilissegundoAtual = arrecadacaoPorSegundoAtual / 1000;

let valorTotalAtual = 0;

// Estado global da aplicação
const estado = {
    valorGlobal: 0,
    contadorAtivo: true,
    dados: null,
    filtroAtual: 'todos'
};

// Elementos DOM
const elementos = {
    painelDigitos: document.getElementById('painel-digitos'),
    valorCustom: document.getElementById('valor-custom'),
    btnAplicar: document.getElementById('btn-aplicar'),
    btnPausar: document.getElementById('btn-pausar'),
    btnRetomar: document.getElementById('btn-retomar'),
    botoesFiltro: document.querySelectorAll('.filtro-btn'),
    botoesSetor: document.querySelectorAll('.setor-btn'),
    nomeSetorExibido: document.getElementById('nome-setor-exibido'),
    gridBens: document.getElementById('grid-bens'),
    estadoVazio: document.getElementById('estado-vazio')
};

// Função para formatar moeda (BRL)
function formatarMoeda(valor) {
    return valor.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    });
}

// Função para formatar número com separadores de milhar
function formatarNumero(valor) {
    if (valor >= 1000000) {
        return valor.toLocaleString('pt-BR', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
    }
    return valor.toLocaleString('pt-BR', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2
    });
}

// Função para renderizar painel de dígitos
function renderizarPainelDigitos(valor) {
    if (!elementos.painelDigitos) return;
    
    // Formata o valor com 2 casas decimais
    const valorFormatado = valor.toLocaleString('pt-BR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
    
    // Remove todos os pontos e vírgulas usando regex
    const digitosLimpos = valorFormatado.replace(/[\.,]/g, '');
    
    // Limpa o container
    elementos.painelDigitos.innerHTML = '';
    
    // Define os grupos e suas legendas
    const grupos = [
        { nome: 'Trilhão', tamanho: 3 },
        { nome: 'Bilhões', tamanho: 3 },
        { nome: 'Milhões', tamanho: 3 },
        { nome: 'Mil', tamanho: 3 },
        { nome: 'Reais', tamanho: 3 },
        { nome: 'Centavos', tamanho: 2 }
    ];
    
    // Calcula a distribuição real dos dígitos
    const totalDigitos = digitosLimpos.length;
    const digitosCentavos = 2;
    const digitosReais = totalDigitos - digitosCentavos;
    
    // Distribui os dígitos entre os grupos
    let posicaoAtual = 0;
    grupos.forEach(grupo => {
        if (posicaoAtual < digitosReais || grupo.nome === 'Centavos') {
            // Calcula quantos dígitos este grupo realmente tem
            let tamanhoReal = grupo.tamanho;
            if (posicaoAtual + tamanhoReal > digitosReais && grupo.nome !== 'Centavos') {
                tamanhoReal = digitosReais - posicaoAtual;
            }
            
            if (tamanhoReal > 0) {
                // Extrai os dígitos para este grupo
                const digitosGrupo = digitosLimpos.substring(posicaoAtual, posicaoAtual + tamanhoReal);
                
                // Cria o sub-container para este grupo
                const subContainer = document.createElement('div');
                subContainer.className = 'flex flex-col items-center';
                
                // Container das placas (flex row)
                const placasContainer = document.createElement('div');
                placasContainer.className = 'flex flex-row gap-1';
                
                // Cria as placas para cada dígito do grupo
                digitosGrupo.split('').forEach(digito => {
                    const placa = document.createElement('div');
                    placa.className = 'bg-zinc-800 border border-zinc-700 rounded-lg w-10 h-14 flex items-center justify-center text-3xl font-bold text-teal-500 shadow-md';
                    placa.textContent = digito;
                    placasContainer.appendChild(placa);
                });
                
                // Adiciona as placas ao sub-container
                subContainer.appendChild(placasContainer);
                
                // Cria a legenda
                const legenda = document.createElement('span');
                legenda.className = 'text-zinc-600 font-medium tracking-wide text-xs mt-2';
                legenda.textContent = grupo.nome;
                
                // Adiciona a legenda ao sub-container
                subContainer.appendChild(legenda);
                
                // Adiciona o sub-container ao container principal
                elementos.painelDigitos.appendChild(subContainer);
                
                posicaoAtual += tamanhoReal;
            }
        }
    });
}

// Função para carregar dados do JSON
async function carregarDados() {
    try {
        const resposta = await fetch('json/data.json');
        if (!resposta.ok) {
            throw new Error('Erro ao carregar dados');
        }
        estado.dados = await resposta.json();
        return true;
    } catch (erro) {
        console.error('Erro ao carregar dados:', erro);
        elementos.gridBens.innerHTML = `
            <div class="col-span-full text-center py-16">
                <i class="fa-solid fa-triangle-exclamation text-6xl text-red-500 mb-4"></i>
                <p class="text-red-400 text-lg">Erro ao carregar dados. Verifique se o arquivo json/data.json existe.</p>
            </div>
        `;
        return false;
    }
}

// Função principal disparada no carregamento do site
async function sincronizarEIniciarContador() {
    let agora = new Date(); // Padrão: usa o relógio do computador do usuário

    try {
        // Busca o horário oficial atômico de Brasília (Evita erros se o PC do usuário estiver atrasado)
        const response = await fetch('https://worldtimeapi.org/api/timezone/America/Sao_Paulo');
        if (response.ok) {
            const data = await response.json();
            agora = new Date(data.datetime); // Atualiza com a hora exata da internet
            console.log("Sincronizado com o Horário Oficial de Brasília!");
        }
    } catch (error) {
        console.warn("Não foi possível conectar à API de tempo. Usando o relógio local do dispositivo.");
    }

    // Calcula a diferença real de tempo desde a foto até o milissegundo atual
    const milissegundosPassados = agora.getTime() - DATA_ANCORA.getTime();
    
    // Aplica a lógica do setor ativo (Geral, Exatas, Humanas, Biológicas)
    const fatiaSetor = setorAtual.porcentagem || 1.0;
    const ritmoMs = (RITMO_GERAL_SEGUNDO * fatiaSetor) / 1000;

    if (setorAtual.id === "geral") {
        valorTotalAtual = VALOR_ANCORA + (milissegundosPassados * ritmoMs);
    } else {
        const inicioDoAno = new Date(agora.getFullYear(), 0, 1, 0, 0, 0, 0);
        valorTotalAtual = (agora.getTime() - inicioDoAno.getTime()) * ritmoMs;
    }
    
    estado.valorGlobal = valorTotalAtual;

    // Dispara os loops contínuos de atualização da tela
    iniciarLoopsCronometrados();
}
function alternarSetor(idSetor) {
    const novoSetor = SETORES[idSetor];
    if (!novoSetor) return;
    
    setorAtual = novoSetor;
    arrecadacaoPorSegundoAtual = novoSetor.arrecadacaoPorSegundo;
    arrecadacaoPorMilissegundoAtual = arrecadacaoPorSegundoAtual / 1000;
    
    // Recalcula o valor acumulado usando a âncora histórica
    const agora = new Date();
    const milissegundosDecorridos = agora.getTime() - DATA_ANCORA.getTime();
    const fatiaSetor = novoSetor.porcentagem || 1.0;
    const ritmoMs = (RITMO_GERAL_SEGUNDO * fatiaSetor) / 1000;
    
    if (novoSetor.id === "geral") {
        valorTotalAtual = VALOR_ANCORA + (milissegundosDecorridos * ritmoMs);
    } else {
        const inicioDoAno = new Date(agora.getFullYear(), 0, 1, 0, 0, 0, 0);
        valorTotalAtual = (agora.getTime() - inicioDoAno.getTime()) * ritmoMs;
    }
    
    estado.valorGlobal = valorTotalAtual;
    
    // Atualiza a label do setor exibido
    if (elementos.nomeSetorExibido) {
        elementos.nomeSetorExibido.textContent = novoSetor.nome;
    }
    
    // Atualiza o contador imediatamente
    renderizarPainelDigitos(valorTotalAtual);
    
    // Atualiza os botões de setor
    elementos.botoesSetor.forEach(botao => {
        if (botao.dataset.setor === idSetor) {
            botao.classList.add('active');
            botao.classList.remove('bg-transparent');
            botao.classList.add('bg-teal-600');
        } else {
            botao.classList.remove('active');
            botao.classList.remove('bg-teal-600');
            botao.classList.add('bg-transparent');
        }
    });
    
    // Renderiza os cards com o novo valor
    renderizarCards();
}

// Função para iniciar loops cronometrados de atualização
function iniciarLoopsCronometrados() {
    // Atualiza a label do setor exibido
    if (elementos.nomeSetorExibido) {
        elementos.nomeSetorExibido.textContent = setorAtual.nome;
    }
    
    // 1. Loop ultraveloz (10ms): Atualiza apenas o texto do painel principal (Contador Geral)
    setInterval(() => {
        if (estado.contadorAtivo) {
            valorTotalAtual += (arrecadacaoPorMilissegundoAtual * 10);
            estado.valorGlobal = valorTotalAtual;
            
            renderizarPainelDigitos(valorTotalAtual);
        }
    }, 10);

    // 2. Loop performático (250ms): Atualiza a conversão dos cards (Evita travar o navegador)
    setInterval(() => {
        if (estado.contadorAtivo) {
            atualizarGridDeBens(valorTotalAtual);
        }
    }, 250);
}

// Essa função será chamada dentro do laço dos cards para calcular as quantidades
function calcularQuantidadeDeBens(valorTotal, precoDoBem) {
    // Força o número inteiro (unidades inteiras compradas)
    return Math.floor(valorTotal / precoDoBem);
}

// Função para pausar o contador
function pausarContador() {
    estado.contadorAtivo = false;
    elementos.btnPausar.classList.add('hidden');
    elementos.btnRetomar.classList.remove('hidden');
}

// Função para retomar o contador
function retomarContador() {
    estado.contadorAtivo = true;
    elementos.btnPausar.classList.remove('hidden');
    elementos.btnRetomar.classList.add('hidden');
}

// Função para aplicar valor customizado
function aplicarValorCustom() {
    const valorTexto = elementos.valorCustom.value.trim();
    
    if (!valorTexto) {
        alert('Por favor, digite um valor válido.');
        return;
    }
    
    // Remove caracteres não numéricos
    const valorLimpo = valorTexto.replace(/\D/g, '');
    const valorNumerico = parseInt(valorLimpo, 10);
    
    if (isNaN(valorNumerico) || valorNumerico < 0) {
        alert('Por favor, digite um valor numérico válido.');
        return;
    }
    
    valorTotalAtual = valorNumerico;
    estado.valorGlobal = valorNumerico;
    pausarContador();
    
    renderizarPainelDigitos(valorTotalAtual);
    
    renderizarCards();
    elementos.valorCustom.value = '';
}

// Função para calcular quantidade de bens
function calcularQuantidade(precoBem) {
    if (precoBem === 0) return 0;
    return calcularQuantidadeDeBens(estado.valorGlobal, precoBem);
}

// Função para criar card HTML
function criarCard(bem) {
    const quantidade = calcularQuantidade(bem.preco);
    const quantidadeFormatada = formatarNumero(quantidade);
    const valorTotalConvertido = quantidade * bem.preco;
    const valorTotalConvertidoFormatado = formatarMoeda(valorTotalConvertido);
    
    // Verifica se é um bem de infraestrutura/complexo industrial e o valor é menor que o preço
    const ehMegaProjeto = bem.preco >= 1000000000; // Preço >= 1 bilhão
    const valorMenorQuePreco = estado.valorGlobal < bem.preco;
    
    let displayQuantidade;
    let displayValorTotal;
    
    if (ehMegaProjeto && valorMenorQuePreco) {
        // Calcula porcentagem de progresso
        const porcentagem = ((estado.valorGlobal / bem.preco) * 100).toFixed(1);
        displayQuantidade = `${porcentagem}%`;
        displayValorTotal = formatarMoeda(estado.valorGlobal);
    } else {
        displayQuantidade = quantidadeFormatada;
        displayValorTotal = valorTotalConvertidoFormatado;
    }
    
    const card = document.createElement('div');
    card.className = 'card-item bg-zinc-900/50 backdrop-blur-md rounded-2xl px-4 py-6 border border-zinc-800/80 fade-in';
    card.innerHTML = `
        <div class="flex flex-col items-center text-center gap-3">
            <!-- Quantidade em destaque no topo -->
            <p class="quantidade-destaque text-3xl font-bold text-amber-500 leading-tight tracking-tight break-words">
                ${displayQuantidade}
            </p>
            
            <!-- Nome do bem -->
            <h3 class="text-zinc-100 font-semibold text-lg">${bem.nome}</h3>
            
            <!-- Valor unitário -->
            <p class="text-xs text-zinc-500">
                Preço Unitário: ${formatarMoeda(bem.preco)}
            </p>
            
            <!-- Valor total convertido -->
            <p class="text-sm font-semibold text-zinc-300">
                Total Convertido: ${displayValorTotal}
            </p>
            
            <!-- Ícone discreto -->
            <div class="mt-2 flex justify-center">
                <i class="${bem.classe_icone} text-2xl text-zinc-600"></i>
            </div>
        </div>
    `;
    
    return card;
}

// Função para renderizar cards
function renderizarCards() {
    if (!estado.dados) return;
    
    elementos.gridBens.innerHTML = '';
    
    let bensFiltrados = [];
    
    if (estado.filtroAtual === 'todos') {
        // Combina todas as categorias
        Object.values(estado.dados).forEach(categoria => {
            bensFiltrados = [...bensFiltrados, ...categoria];
        });
    } else {
        bensFiltrados = estado.dados[estado.filtroAtual] || [];
    }
    
    if (bensFiltrados.length === 0) {
        elementos.estadoVazio.classList.remove('hidden');
        return;
    }
    
    elementos.estadoVazio.classList.add('hidden');
    
    bensFiltrados.forEach(bem => {
        const card = criarCard(bem);
        elementos.gridBens.appendChild(card);
    });
}

// Função para atualizar grid de bens (loop performático de 250ms)
function atualizarGridDeBens(valorTotal) {
    if (!estado.dados) return;
    
    let bensFiltrados = [];
    
    if (estado.filtroAtual === 'todos') {
        Object.values(estado.dados).forEach(categoria => {
            bensFiltrados = [...bensFiltrados, ...categoria];
        });
    } else {
        bensFiltrados = estado.dados[estado.filtroAtual] || [];
    }
    
    if (bensFiltrados.length === 0) {
        elementos.estadoVazio.classList.remove('hidden');
        return;
    }
    
    elementos.estadoVazio.classList.add('hidden');
    
    // Atualiza apenas os valores de quantidade nos cards existentes
    const cards = elementos.gridBens.querySelectorAll('.card-item');
    cards.forEach((card, index) => {
        if (bensFiltrados[index]) {
            const bem = bensFiltrados[index];
            const quantidade = calcularQuantidadeDeBens(valorTotal, bem.preco);
            const quantidadeFormatada = formatarNumero(quantidade);
            const valorTotalConvertido = quantidade * bem.preco;
            const valorTotalConvertidoFormatado = formatarMoeda(valorTotalConvertido);
            
            // Verifica se é um bem de infraestrutura/complexo industrial e o valor é menor que o preço
            const ehMegaProjeto = bem.preco >= 1000000000; // Preço >= 1 bilhão
            const valorMenorQuePreco = valorTotal < bem.preco;
            
            let displayQuantidade;
            let displayValorTotal;
            
            if (ehMegaProjeto && valorMenorQuePreco) {
                // Calcula porcentagem de progresso
                const porcentagem = ((valorTotal / bem.preco) * 100).toFixed(1);
                displayQuantidade = `${porcentagem}%`;
                displayValorTotal = formatarMoeda(valorTotal);
            } else {
                displayQuantidade = quantidadeFormatada;
                displayValorTotal = valorTotalConvertidoFormatado;
            }
            
            const quantidadeElement = card.querySelector('.quantidade-destaque');
            if (quantidadeElement) {
                quantidadeElement.textContent = displayQuantidade;
            }
            
            // Atualiza o valor total convertido
            const valorTotalElement = card.querySelector('.text-sm.font-semibold.text-zinc-300');
            if (valorTotalElement) {
                valorTotalElement.textContent = `Total Convertido: ${displayValorTotal}`;
            }
        }
    });
}

// Função para configurar filtros
function configurarFiltros() {
    elementos.botoesFiltro.forEach(botao => {
        botao.addEventListener('click', () => {
            // Remove classe active de todos
            elementos.botoesFiltro.forEach(b => {
                b.classList.remove('active');
                b.classList.remove('bg-teal-600');
                b.classList.add('bg-transparent');
            });
            
            // Adiciona classe active ao botão clicado
            botao.classList.add('active');
            botao.classList.remove('bg-transparent');
            botao.classList.add('bg-teal-600');
            
            // Atualiza filtro
            estado.filtroAtual = botao.dataset.filtro;
            renderizarCards();
        });
    });
}

// Função para configurar eventos
function configurarEventos() {
    elementos.btnAplicar.addEventListener('click', aplicarValorCustom);
    elementos.btnPausar.addEventListener('click', pausarContador);
    elementos.btnRetomar.addEventListener('click', retomarContador);
    
    // Configurar eventos dos botões de setor
    elementos.botoesSetor.forEach(botao => {
        botao.addEventListener('click', () => {
            const idSetor = botao.dataset.setor;
            alternarSetor(idSetor);
        });
    });
    
    // Permitir aplicar com Enter
    elementos.valorCustom.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            aplicarValorCustom();
        }
    });
}

// Função de inicialização
async function inicializar() {
    const dadosCarregados = await carregarDados();
    
    if (dadosCarregados) {
        configurarFiltros();
        configurarEventos();
        await sincronizarEIniciarContador();
        renderizarCards();
    }
}

// Inicia a aplicação quando o DOM estiver pronto
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inicializar);
} else {
    inicializar();
}
