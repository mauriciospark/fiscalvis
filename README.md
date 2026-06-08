# FiscalVis — (Linhagem SPARK)

## Descrição

FiscalVis é uma aplicação web local-first de conscientização patrimonial em tempo real que transforma a arrecadação tributária brasileira em uma experiência visual compreensível. O sistema converte o ritmo de arrecadação nacional (R$ 107.600,00 por segundo) em equivalentes tangíveis como imóveis, veículos, infraestrutura e complexos industriais, permitindo que usuários compreendam a magnitude econômica do país de forma intuitiva e impactante.

## Stack

### Frontend
- **HTML5** - Estrutura semântica e acessível
- **Tailwind CSS** (via CDN) - Estilização utilitária e design system
- **Vanilla JavaScript ES6+** - Lógica de aplicação sem frameworks
- **Font Awesome 6.4.0** - Ícones e elementos visuais

### Backend
- **Local-First Architecture** - Zero servidor, processamento 100% client-side
- **JSON Local** - Armazenamento de dados estático em arquivo local
- **WorldTimeAPI** - Sincronização opcional com horário oficial de Brasília

### Bibliotecas e Ferramentas
- **Fetch API** - Comunicação assíncrona com serviços externos
- **Intl.NumberFormat** - Formatação de moeda e números (pt-BR)
- **Date API** - Cálculos de tempo e sincronização temporal

## Funcionalidades

- **Painel de Dígitos em Tempo Real**: Exibição da arrecadação nacional em placas digitais individuais atualizadas a cada 10ms (~60fps)
- **Agrupamento por Ordem de Grandeza**: Dígitos organizados em grupos (Trilhão, Bilhões, Milhões, Mil, Reais, Centavos) com legendas centralizadas
- **Filtragem por Setores**: Alternância entre Geral (100%), Exatas (64%), Humanas (24%) e Biológicas (12%)
- **Conversão Patrimonial**: Cálculo automático de quantidade de bens que a arrecadação pode financiar
- **Categorias de Bens**:
  - Imóveis e Terrenos
  - Veículos Terrestres, Aquáticos e Aéreos
  - Infraestrutura (megaprojetos públicos)
  - Complexos Industriais (projetos aeroespaciais)
- **Indicadores Financeiros**: Exibição de quantidade, preço unitário e valor total convertido
- **Progresso de Megaobras**: Porcentagem de conclusão para projetos bilionários
- **Sincronização Temporal**: Integração com horário oficial atômico de Brasília
- **Interface Premium Dark**: Design moderno com paleta zinc/teal, efeitos glow e logo oficial
- **100% Offline**: Funcionamento completo sem dependência de servidor

## Como Rodar

1. **Clonar o Repositório**
   ```bash
   git clone [URL_DO_REPOSITORIO]
   cd fiscalvis
   ```

2. **Estrutura de Arquivos**
   ```
   fiscalvis/
   ├── index.html          # Página principal
   ├── favicon/
   │   └── logo.jpg       # Logo oficial do projeto
   ├── css/
   │   └── styles.css      # Estilos customizados
   ├── javascript/
   │   └── script.js      # Lógica da aplicação
   ├── json/
   │   └── data.json      # Catálogo de bens
   └── docs/              # Documentação
   ```

3. **Iniciar a Aplicação**
   - Abra o arquivo `index.html` diretamente no navegador
   - Ou use um servidor local para desenvolvimento:
     ```bash
     # Python 3
     python -m http.server 8000
     
     # Node.js (http-server)
     npx http-server
     ```
   - Acesse `http://localhost:8000`

4. **Requisitos**
   - Navegador moderno com suporte a ES6+
   - Conexão com internet (opcional, para sincronização de tempo)

---

**© 2026 Mauricio Spark — Linhagem SPARK — Todos os direitos reservados**
