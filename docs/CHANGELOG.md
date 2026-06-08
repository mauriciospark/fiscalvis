# Changelog

Registro cronológico de evolução e atualizações do FiscalVis.

## [1.0.1] - 08/06/2026

### [Added]
- **Logo Oficial do Projeto**: Implementação do logo oficial (favicon/logo.jpg) no cabeçalho e como favicon do navegador
- **Painel de Dígitos em Placas**: Redesign completo do contador principal com placas digitais individuais em vez de texto único
- **Agrupamento por Ordem de Grandeza**: Dígitos organizados em sub-containers por grupos (Trilhão, Bilhões, Milhões, Mil, Reais, Centavos)
- **Legendas Centralizadas**: Cada grupo de dígitos possui sua legenda centralizada abaixo do respectivo bloco
- **Renderização Dinâmica de Placas**: Sistema de criação dinâmica de divs estilizadas como placas escuras (zinc-800) para cada dígito
- **Regex de Limpeza**: Implementação de regex `.replace(/[\.,]/g, '')` para remover pontuação dos valores formatados

### [Changed]
- **Estrutura do Contador**: Substituição de elemento de texto único por container flex com sub-containers agrupados
- **Alinhamento de Legendas**: Mudança de legendas soltas para legendas integradas em sub-containers com seus respectivos grupos
- **Espaçamento Visual**: Adição de `mt-2` nas legendas para respiro entre placas e texto
- **Layout Responsivo**: Ajuste do container principal para `flex flex-row justify-center items-start gap-4`

### [Fixed]
- **Centralização de Legendas**: Correção do alinhamento para que cada legenda fique perfeitamente centralizada abaixo do seu grupo
- **Distribuição Dinâmica de Dígitos**: Cálculo automático do tamanho real de cada grupo baseado no número total de dígitos

## [1.0.0] - 08/06/2026

### [Added]
- **Contador Dinâmico em Tempo Real**: Implementação de contador atualizado a cada 10ms (~60fps) com ritmo de R$ 107.600,00 por segundo
- **Sistema de Filtragem por Setores**: Alternância entre Geral (100%), Exatas (64%), Humanas (24%) e Biológicas (12%) da arrecadação nacional
- **Catálogo de Bens Completo**: 5 categorias com 24 itens:
  - Imóveis e Terrenos (6 itens)
  - Veículos Terrestres (5 itens)
  - Veículos Aquáticos (5 itens)
  - Veículos Aéreos (5 itens)
  - Infraestrutura (4 itens)
  - Complexos Industriais (2 itens)
- **Interface Premium Dark**: Design moderno com paleta zinc/teal, efeitos glow e animações suaves
- **Sincronização Temporal**: Integração com WorldTimeAPI para horário oficial de Brasília
- **Âncora Histórica**: Calibração precisa com valor real de R$ 1.799.099.047.546,14 em 08/06/2026 às 12:35:00
- **Sistema de Conversão Patrimonial**: Cálculo automático de quantidade de bens e valor total convertido
- **Indicadores de Progresso**: Porcentagem de conclusão para megaobras bilionárias (Transamazônica, Rede Nacional Antonov)
- **Controles de Interação**: Pausa/Retomar do contador e aplicação de valor customizado
- **Legendas Informativas**: Texto fosco abaixo dos botões de setores listando subcategorias
- **Layout Responsivo**: Grid adaptativo para mobile, tablet e desktop

### [Changed]
- **Arquitetura Local-First**: Refatoração completa para processamento 100% client-side
- **Otimização de Performance**: Loops separados (10ms para contador, 250ms para cards)
- **Estrutura de Pastas**: Reorganização em css/, javascript/, json/ e docs/
- **Tipografia Dinâmica**: Ajuste de text-5xl para text-3xl para evitar estouro de largura
- **Cálculos de Setor**: Implementação de porcentagens reais baseadas em dados da Receita Federal e CNAE
- **Formatação de Moeda**: Padrão pt-BR com formatação correta de números grandes
- **Estilo de Cards**: Layout vertical com flexbox e gap para melhor organização
- **Cores do Sistema**: Mudança de amber para teal (#0d9488) para consistência visual

### [Fixed]
- **Caminhos de Arquivos**: Correção de referências após reestruturação de pastas
- **Overflow Horizontal**: Ajuste de tipografia e tracking-tight para evitar estouro em cards
- **Cálculos de Porcentagem**: Correção da lógica de progresso para megaobras
- **Atualização de DOM**: Otimização para atualizar apenas elementos necessários
- **Formatação de Números**: Correção de separadores de milhar e decimais
- **Estados de Filtros**: Correção das classes ativas/inativas para botões de setor e categoria
- **Sincronização de Tempo**: Implementação de fallback para relógio local se API falhar

### [Removed]
- **Dependência de Servidor**: Remoção completa de necessidade de backend
- **Frameworks JavaScript**: Eliminação de React, Vue ou outras bibliotecas
- **Processo de Build**: Remoção de webpack, vite ou outras ferramentas de bundling
- **Cookies e Tracking**: Eliminação de qualquer forma de coleta de dados

### [Deprecated]
- Nenhuma funcionalidade depreciada nesta versão

### [Security]
- **Zero Coleta de Dados**: Implementação de arquitetura 100% privada
- **Processamento Local**: Todo processamento ocorre no dispositivo do usuário
- **Comunicação Criptografada**: HTTPS para WorldTimeAPI quando disponível
- **Sem Autenticação**: Eliminação de necessidade de credenciais ou tokens

---

**© 2026 Mauricio Spark — Linhagem SPARK — Todos os direitos reservados**
