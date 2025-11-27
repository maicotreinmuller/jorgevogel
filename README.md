# Vogel | ControlSuport

Sistema completo de gestão e controle para empresas de suporte técnico e TI, desenvolvido para otimizar o gerenciamento de clientes, ordens de serviço e estoque.

## 📋 Sobre o Projeto

O **Kruscinski | Controle de TI** é uma ferramenta web desenvolvida para facilitar o dia a dia de empresas de suporte técnico, oferecendo controle completo sobre:

- **Clientes**: Cadastro completo com dados pessoais, endereço e documentação
- **Ordens de Serviço**: Gestão de atendimentos técnicos com acompanhamento de status, valores e observações
- **Estoque**: Controle de produtos adquiridos, fornecedores, notas fiscais e valores

### Foco da Ferramenta

O sistema foi desenvolvido com foco em:
- **Simplicidade**: Interface intuitiva e fácil de usar
- **Mobilidade**: Totalmente responsivo, funciona em desktop, tablet e smartphone
- **Offline-First**: Todos os dados são armazenados localmente no navegador, funcionando sem necessidade de internet
- **Produtividade**: Recursos de busca, filtros e exportação para Excel
- **Gestão de Dados**: Sistema completo de backup, exportação e importação em JSON

## 🚀 Tecnologias Utilizadas

### Frontend
- **React 18** - Biblioteca JavaScript para construção de interfaces
- **TypeScript** - Superset JavaScript com tipagem estática
- **Vite** - Build tool moderna e rápida
- **Tailwind CSS** - Framework CSS utility-first para estilização
- **shadcn/ui** - Componentes UI acessíveis e customizáveis

### Roteamento e Estado
- **React Router DOM** - Gerenciamento de rotas
- **TanStack Query** - Gerenciamento de estado e cache de dados

### Banco de Dados Local
- **Dexie.js** - Wrapper moderno para IndexedDB (armazenamento local no navegador)

### Componentes UI
- **Radix UI** - Primitivos de UI acessíveis e não estilizados
- **Lucide React** - Biblioteca de ícones
- **Sonner** - Sistema de notificações toast

### Funcionalidades Adicionais
- **XLSX** - Exportação de dados para Excel
- **React Hook Form** - Gerenciamento de formulários
- **React Input Mask** - Máscaras para inputs (CPF, CNPJ, telefone)
- **date-fns** - Manipulação de datas

## 💻 Como Funciona

### Arquitetura

O sistema utiliza uma arquitetura **offline-first**, onde todos os dados são armazenados localmente no navegador do usuário através do **IndexedDB** (utilizando Dexie.js como abstração).

### Estrutura de Dados

O banco de dados local possui três tabelas principais:
- `clients` - Armazena informações de clientes
- `serviceOrders` - Registra ordens de serviço
- `purchases` - Gerencia itens do estoque

### Fluxo de Trabalho

1. **Dashboard**: Visão geral com métricas importantes (total de clientes, ordens de serviço ativas, receita)
2. **Gestão de Clientes**: Cadastro, edição e exclusão de clientes com busca em tempo real
3. **Ordens de Serviço**: Criação e acompanhamento de atendimentos técnicos
4. **Estoque**: Controle de produtos e fornecedores
5. **Gerenciamento de Dados**: Backup completo, exportação e importação de todos os dados

## 🎯 Funcionalidades Principais

### ✅ Gestão de Clientes
- Cadastro completo com validação de CPF/CNPJ
- Busca e filtros em tempo real
- Exportação para Excel

### ✅ Ordens de Serviço
- Criação de OS com cliente vinculado
- Status de atendimento (Em andamento, Concluído, Cancelado)
- Controle de valores e datas
- Visualização detalhada de cada ordem

### ✅ Controle de Estoque
- Cadastro de compras e produtos
- Informações de fornecedores e notas fiscais
- Filtros por data
- Exportação para Excel

### ✅ Gerenciamento de Dados
- Backup completo em JSON
- Importação de dados
- Limpeza seletiva de tabelas
- Estatísticas do banco de dados

### ✅ Interface Responsiva
- Design adaptado para desktop, tablet e mobile
- Navegação inferior em dispositivos móveis
- Modais otimizados para telas touch

## 📦 Instalação

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/kruscinski-controle-ti.git

# Entre no diretório
cd kruscinski-controle-ti

# Instale as dependências
npm install

# Execute o projeto em desenvolvimento
npm run dev
```

## 🔨 Build para Produção

```bash
# Gerar build otimizado
npm run build

# Visualizar build localmente
npm run preview
```

## 📱 Compatibilidade

- ✅ Chrome/Edge (recomendado)
- ✅ Firefox
- ✅ Safari
- ✅ Opera
- ✅ Navegadores móveis modernos

## 📄 Licença

Este projeto é de código aberto e está disponível sob a licença MIT.

## 🤝 Contribuições

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues e pull requests.

---

Desenvolvido com ❤️ para facilitar a gestão de empresas de TI
