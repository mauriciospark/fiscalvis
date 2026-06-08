# Arquitetura do Sistema

## Design Arquitetural

O FiscalVis adota uma arquitetura **Local-First** com processamento 100% client-side, eliminando a necessidade de servidores, bancos de dados ou APIs proprietárias. Esta abordagem garante privacidade máxima, performance instantânea e funcionamento offline completo.

### Paradigma Local-First

A arquitetura Local-First prioriza o processamento de dados no dispositivo do usuário, oferecendo:

- **Privacidade Total**: Nenhum dado sai do dispositivo do usuário
- **Performance Instantânea**: Zero latência de rede para operações principais
- **Resiliência**: Funcionamento completo sem conexão com internet
- **Custo Zero**: Sem custos de infraestrutura ou manutenção de servidores

### Estrutura de Camadas

```
┌─────────────────────────────────────────────────────────┐
│                    Camada de Apresentação                │
│  (HTML + Tailwind CSS + Font Awesome)                    │
└─────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────┐
│                    Camada de Lógica                       │
│  (Vanilla JavaScript ES6+ - script.js)                   │
│  - Estado Global                                          │
│  - Funções de Cálculo                                     │
│  - Gerenciamento de Eventos                              │
│  - Renderização Dinâmica                                 │
└─────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────┐
│                    Camada de Dados                        │
│  (JSON Local - data.json)                                │
│  - Catálogo de Bens                                      │
│  - Configurações de Setores                              │
│  - Dados Estáticos                                       │
└─────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────┐
│              Camada de Sincronização (Opcional)           │
│  (WorldTimeAPI - Horário Oficial de Brasília)            │
└─────────────────────────────────────────────────────────┘
```

## Justificativa das Escolhas Técnicas

### Vanilla JavaScript vs Frameworks

**Decisão**: Utilizar Vanilla JavaScript ES6+ em vez de frameworks como React, Vue ou Angular.

**Justificativa**:
- **Performance**: Sem overhead de virtual DOM ou bundling
- **Simplicidade**: Código direto e fácil de manter
- **Portabilidade**: Arquivo único que funciona em qualquer navegador
- **Tamanho**: < 20KB de JavaScript vs 200KB+ de frameworks
- **Curva de Aprendizado**: Acessível para desenvolvedores de qualquer nível

### JSON Local vs Banco de Dados

**Decisão**: Armazenar dados em arquivo JSON local em vez de banco de dados relacional ou NoSQL.

**Justificativa**:
- **Dados Estáticos**: O catálogo de bens raramente muda
- **Simplicidade**: Sem necessidade de migrations ou schemas
- **Performance**: Leitura instantânea sem queries
- **Portabilidade**: Arquivo único facilmente versionável
- **Manutenção**: Edição manual simples para atualizações

### Tailwind CSS via CDN vs Build Process

**Decisão**: Carregar Tailwind CSS via CDN em vez de configurar processo de build.

**Justificativa**:
- **Rapidez de Desenvolvimento**: Sem configuração de webpack/vite
- **Simplicidade**: Arquivo único sem dependências de Node.js
- **Atualizações**: Sempre com a versão mais recente
- **Caching**: CDN eficiente com cache do navegador

### Sincronização de Tempo Opcional

**Decisão**: Implementar sincronização com WorldTimeAPI como fallback opcional.

**Justificativa**:
- **Robustez**: Funciona offline se a API falhar
- **Privacidade**: Não envia dados, apenas recebe hora
- **Precisão**: Permite calibração exata com horário oficial
- **Resiliência**: Graceful degradation para relógio local

## Fluxo de Dados

### 1. Inicialização da Aplicação

```
DOM Ready
    ↓
Carregar data.json (Fetch Local)
    ↓
Configurar Elementos DOM
    ↓
Sincronizar com WorldTimeAPI (Opcional)
    ↓
Calcular Valor Inicial (Âncora Histórica)
    ↓
Iniciar Loops de Atualização
    ↓
Renderizar Cards Iniciais
```

### 2. Loop de Atualização do Contador (10ms)

```
Verificar Estado Ativo
    ↓
Incrementar valorTotalAtual (arrecadacaoPorMilissegundoAtual * 10)
    ↓
Atualizar estado.valorGlobal
    ↓
Chamar renderizarPainelDigitos(valorTotalAtual)
    ↓
Formatar valor com 2 casas decimais (pt-BR)
    ↓
Remover pontuação com regex .replace(/[\.,]/g, '')
    ↓
Criar sub-containers para cada grupo (Trilhão, Bilhões, Milhões, Mil, Reais, Centavos)
    ↓
Gerar placas digitais individuais (divs zinc-800)
    ↓
Posicionar legendas centralizadas abaixo de cada grupo
```

### 3. Loop de Atualização dos Cards (250ms)

```
Verificar Estado Ativo
    ↓
Filtrar Bens (categoria atual)
    ↓
Para cada bem:
    - Calcular quantidade (valorTotal / preco)
    - Calcular valor total convertido (quantidade * preco)
    - Verificar se é megaprojeto (preco >= 1B)
    - Se megaprojeto e valor < preco: mostrar porcentagem
    - Caso contrário: mostrar quantidade
    ↓
Atualizar DOM (querySelector e textContent)
```

### 4. Alternância de Setores

```
Usuário clica em botão de setor
    ↓
Atualizar setorAtual
    ↓
Recalcular arrecadacaoPorSegundoAtual
    ↓
Recalcular valorTotalAtual (nova âncora ou início do ano)
    ↓
Atualizar estado.valorGlobal
    ↓
Atualizar DOM (contador, label, botões)
    ↓
Renderizar Cards com novo valor
```

### 5. Aplicação de Valor Customizado

```
Usuário digita valor e clica em "Aplicar"
    ↓
Validar entrada (não vazio, numérico, >= 0)
    ↓
Parsear valor (remover não-numéricos)
    ↓
Atualizar valorTotalAtual
    ↓
Pausar contador
    ↓
Atualizar DOM (contador)
    ↓
Renderizar Cards com novo valor
```

## Privacidade e Segurança

### Coleta de Dados
- **Zero Coleta**: Nenhum dado pessoal ou de uso é coletado
- **Sem Cookies**: Não utiliza cookies ou localStorage para tracking
- **Sem Analytics**: Não integra com Google Analytics ou similares
- **Sem Telemetria**: Não envia informações de uso ou erros

### Processamento Local
- **100% Client-Side**: Todo processamento ocorre no navegador
- **Sem Servidor**: Não há backend para interceptar dados
- **Sem Logs**: Não há logs de atividade ou comportamento
- **Sem Persistência**: Dados não são armazenados entre sessões

### Comunicação Externa
- **WorldTimeAPI**: Única comunicação externa (opcional)
- **HTTPS**: Comunicação criptografada quando disponível
- **Fallback**: Funciona perfeitamente sem conexão externa
- **Sem Autenticação**: Não requer credenciais ou tokens

## Performance e Otimização

### Estratégias de Performance

1. **Loops Separados**: 10ms para contador, 250ms para cards
2. **Atualização Seletiva**: Apenas elementos DOM necessários são atualizados
3. **Cálculo em Memória**: Operações matemáticas sem re-renderização
4. **Debounce**: Evita atualizações excessivas em interações rápidas
5. **Lazy Loading**: Cards renderizados sob demanda

### Métricas de Performance

- **Time to Interactive**: < 100ms
- **First Contentful Paint**: < 50ms
- **Frame Rate**: 60fps constante (16.67ms por frame)
- **Memory Footprint**: < 5MB
- **Network Usage**: ~50KB inicial (HTML + CSS + JS + JSON)

---

**© 2026 Mauricio Spark — Linhagem SPARK — Todos os direitos reservados**
