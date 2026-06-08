# Contribuindo para o FiscalVis

Bem-vindo ao projeto FiscalVis! Agradecemos seu interesse em contribuir. Este documento orienta como você pode participar do desenvolvimento e manutenção do projeto.

## Histórico de Contribuições

### [Added] v1.0.0 - 08/06/2026
- Implementação inicial do contador dinâmico em tempo real
- Sistema de filtragem por setores (Geral, Exatas, Humanas, Biológicas)
- Catálogo de bens com 5 categorias (Imóveis, Veículos Terrestres, Aquáticos, Aéreos, Infraestrutura, Complexos Industriais)
- Interface premium dark com paleta zinc/teal
- Sincronização com horário oficial de Brasília via WorldTimeAPI
- Sistema de conversão patrimonial com cálculo de quantidade e valor total convertido
- Indicadores de progresso para megaobras bilionárias

### [Changed] v1.0.0 - 08/06/2026
- Refatoração da arquitetura para Local-First
- Otimização de performance com loops separados (10ms contador, 250ms cards)
- Implementação de âncora histórica para calibração precisa
- Atualização de tipografia para evitar estouro de largura nos cards
- Adição de legendas informativas nos botões de setores

### [Fixed] v1.0.0 - 08/06/2026
- Correção de caminhos de arquivos após reestruturação de pastas
- Ajuste de cálculos de porcentagem para megaobras
- Correção de formatação de moeda para padrão pt-BR
- Fix de overflow horizontal em cards com números grandes

## Guia de Boas Práticas

### Padrão de Código

#### JavaScript
- Use **camelCase** para variáveis e funções
- Use **PascalCase** para classes e construtores
- Use **UPPER_SNAKE_CASE** para constantes
- Adicione comentários explicativos para lógica complexa
- Mantenha funções pequenas e focadas (máximo 50 linhas)

```javascript
// Exemplo de boa prática
const calcularQuantidade = (precoBem) => {
    if (precoBem === 0) return 0;
    return Math.floor(valorGlobal / precoBem);
};
```

#### HTML
- Use **kebab-case** para IDs e classes
- Mantenha indentação consistente (2 ou 4 espaços)
- Adicione comentários para seções complexas
- Use elementos semânticos HTML5 quando possível

```html
<!-- Exemplo de boa prática -->
<section id="grid-bens" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    <!-- Cards serão renderizados via JavaScript -->
</section>
```

#### CSS
- Use **kebab-case** para classes customizadas
- Organize por seções (variáveis, mixins, componentes)
- Adicione comentários para animações complexas
- Prefira classes utilitárias do Tailwind CSS

```css
/* Exemplo de boa prática */
.card-item {
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    background: rgba(24, 24, 27, 0.5);
}
```

### Git Workflow

#### Nomenclatura de Branches
- `main` - Branch principal de produção
- `feature/nome-da-feature` - Novas funcionalidades
- `fix/nome-do-bug` - Correções de bugs
- `docs/nome-da-documentacao` - Atualizações de documentação
- `refactor/nome-da-refatoracao` - Refatorações de código

#### Commits
Use mensagens de commit claras e descritivas seguindo o padrão:

```
[Tipo] Descrição breve

Descrição detalhada do que foi feito e por quê.
```

**Tipos permitidos:**
- `[Added]` - Novas funcionalidades
- `[Changed]` - Modificações em funcionalidades existentes
- `[Fixed]` - Correções de bugs
- `[Removed]` - Remoção de funcionalidades
- `[Deprecated]` - Marcação de funcionalidades obsoletas
- `[Security]` - Correções de segurança

**Exemplos:**
```
[Added] Implementar filtro de complexos industriais

Adicionada nova categoria de bens com projetos aeroespaciais
incluindo Complexo Antonov e Rede Nacional Antonov.
```

```
[Fixed] Corrigir overflow horizontal em cards

Ajustada tipografia de text-5xl para text-3xl e adicionado
tracking-tight para evitar estouro de largura.
```

### Processo de Contribuição

#### 1. Fork e Clone
```bash
# Fork o repositório no GitHub
git clone https://github.com/seu-usuario/fiscalvis.git
cd fiscalvis
```

#### 2. Criar Branch
```bash
git checkout -b feature/sua-feature
```

#### 3. Fazer Alterações
- Siga os padrões de código estabelecidos
- Teste manualmente todas as funcionalidades
- Atualize a documentação se necessário

#### 4. Commit e Push
```bash
git add .
git commit -m "[Added] Sua feature"
git push origin feature/sua-feature
```

#### 5. Pull Request
- Abra um Pull Request no GitHub
- Descreva claramente as alterações
- Aguarde revisão e aprovação

### Validações Obrigatórias

Antes de submeter alterações, certifique-se de:

- [ ] **Código Funciona**: Teste manualmente todas as funcionalidades afetadas
- [ ] **Sem Erros**: Console do navegador sem erros ou warnings
- [ ] **Responsividade**: Teste em diferentes tamanhos de tela (mobile, tablet, desktop)
- [ ] **Performance**: Não introduziu degradação de performance perceptível
- [ ] **Acessibilidade**: Mantém contraste e legibilidade adequados
- [ ] **Documentação**: Atualizou README.md se necessário
- [ ] **Changelog**: Adicionou entrada em CHANGELOG.md se relevante

### Regras de Organização

#### Estrutura de Arquivos
```
metricas/
├── index.html              # Página principal
├── css/
│   └── styles.css          # Estilos customizados
├── javascript/
│   └── script.js          # Lógica da aplicação
├── json/
│   └── data.json          # Catálogo de bens
└── docs/                  # Documentação
    ├── README.md
    ├── LICENSE
    ├── ABOUT.md
    ├── ARCHITECTURE.md
    ├── CONTRIBUTING.md
    └── CHANGELOG.md
```

#### Convenções de Nomenclatura
- **Arquivos**: kebab-case (ex: `script.js`, `styles.css`)
- **Pastas**: kebab-case (ex: `javascript/`, `json/`)
- **Variáveis JS**: camelCase (ex: `valorTotalAtual`)
- **Constantes JS**: UPPER_SNAKE_CASE (ex: `VALOR_ANCORA`)
- **Classes CSS**: kebab-case (ex: `.card-item`)
- **IDs HTML**: kebab-case (ex: `contador-principal`)

### Padrões de Estilo

#### JavaScript
- Use `const` para variáveis que não mudam
- Use `let` para variáveis que mudam
- Evite `var` (obsoleto)
- Use arrow functions quando apropriado
- Adicione JSDoc para funções complexas

```javascript
/**
 * Calcula a quantidade de bens que podem ser comprados
 * @param {number} precoBem - Preço unitário do bem
 * @returns {number} Quantidade de bens
 */
const calcularQuantidade = (precoBem) => {
    if (precoBem === 0) return 0;
    return Math.floor(valorGlobal / precoBem);
};
```

#### HTML
- Use indentação consistente (2 espaços)
- Feche todas as tags
- Use aspas duplas para atributos
- Adicione espaços após atributos

```html
<button 
    id="btn-aplicar" 
    class="bg-teal-600 hover:bg-teal-500"
    onclick="aplicarValor()">
    Aplicar
</button>
```

#### CSS
- Use 2 espaços de indentação
- Agrupe propriedades relacionadas
- Use shorthand quando possível
- Adicione comentários para seções

```css
.card-item {
    /* Layout */
    display: flex;
    flex-direction: column;
    
    /* Estilo */
    background: rgba(24, 24, 27, 0.5);
    border: 1px solid rgba(39, 39, 42, 0.8);
    
    /* Animação */
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}
```

### Testes e Validação

#### Testes Manuais Obrigatórios
- [ ] **Contador**: Verifica se incrementa corretamente
- [ ] **Filtros**: Testa alternância entre setores
- [ ] **Cards**: Verifica cálculos de quantidade e valor total
- [ ] **Input Customizado**: Testa aplicação de valor manual
- [ ] **Pausa/Retomar**: Verifica controle do contador
- [ ] **Responsividade**: Testa em diferentes tamanhos de tela
- [ ] **Navegadores**: Testa em Chrome, Firefox, Safari, Edge

#### Validação de Performance
- [ ] **Frame Rate**: Mantém 60fps constante
- [ ] **Memory**: Não causa vazamento de memória
- [ ] **Network**: Carrega em < 1 segundo em 3G
- [ ] **CPU**: Não causa uso excessivo de processador

### Comunicação

#### Relatórios de Issues
Ao reportar bugs ou sugerir melhorias:
- Use título descritivo
- Descreva o problema em detalhes
- Inclua passos para reproduzir
- Anexe screenshots se aplicável
- Especifique navegador e versão

#### Pull Requests
- Descreva claramente o propósito
- Liste as alterações feitas
- Mencione issues relacionados
- Aguarde revisão antes de mesclar

---

**© 2026 Mauricio Spark — Linhagem SPARK — Todos os direitos reservados**
