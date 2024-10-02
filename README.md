# GeoWiki

## Descrição do Projeto

GeoWiki é uma aplicação web desenvolvida em React que consome a API RestCountries para exibir informações sobre países ao redor do mundo. Esta aplicação oferece uma interface intuitiva para explorar dados geográficos, demográficos e culturais de diversos países.

## Live URL

**Link**: https://geowiki.vercel.app/countries

## Funcionalidades

1. **Listagem de Países**: Na página inicial, a aplicação exibe as bandeiras de todos os países disponíveis na API.

2. **Filtros**:
   - Por região e sub-região
   - Por população (faixas populacionais)

3. **Ordenação**:
   - Nome (Ordem alfabética)
   - População
   - Área do país
   - Suporte para ordem crescente e decrescente

4. **Busca por nome de país especifico**

5. **Detalhes do País**: Ao clicar em uma bandeira, o usuário é direcionado para uma página de detalhes que mostra informações mais específicas sobre o país selecionado, incluindo:
   - Nome oficial
   - Capital
   - Região e Sub-região
   - Idiomas falados
   - Moedas utilizadas
   - População
   - Área territorial
   - Fuso horário
   - Domínio de internet
   - Código de discagem internacional

6. **Navegação Intuitiva**: A aplicação utiliza React Router para permitir uma navegação suave entre a lista de países e as páginas de detalhes.

7. **Design Responsivo**: A interface é adaptável a diferentes tamanhos de tela, proporcionando uma boa experiência tanto em dispositivos móveis quanto em desktops.

## Tecnologias Utilizadas

- **Vite**: Ferramenta de build para desenvolvimento.
- **React**: Biblioteca javascript para construção de interfaces.
- **TypeScript**: Superset do javascript que adiciona tipagem estática.
- **Tailwind CSS**: Frameworkd de CSS utilitário para estilização.
- **React Router**: Biblioteca para roteamento de páginas no React.
- **React Context**: Usado para gerencias o estado global dos países.

## Como Iniciar o Projeto

Siga estas etapas para executar o projeto em sua máquina local:

1. **Clone o repositório**
   ```
   git clone https://github.com/matheuusu/geowiki.git
   cd geowiki
   ```

2. **Instale as dependências**
   ```
   npm install
   ```

3. **Inicie o servidor de desenvolvimento**
   ```
   npm run dev
   ```

4. **Acesse a aplicação**
   Abra seu navegador e acesse `http://localhost:5173/`

## Estrutura do Projeto

- `src/components`: Contém os componentes React reutilizáveis.
- `src/context`: Inclui o contexto React para gerenciamento de estado global.
- `src/pages`: Contém as páginas principais da aplicação.

## Contribuindo

Contribuições são sempre bem-vindas! Sinta-se à vontade para abrir issues ou enviar pull requests com melhorias.

## Licença

Este projeto está licenciado sob a [MIT License](LICENSE).

---

Desenvolvido por [Matheus Silva]
