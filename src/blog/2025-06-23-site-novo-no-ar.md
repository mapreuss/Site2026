---
id: 263
title: 'Site novo no ar'
date: '2025-06-23T09:45:33-03:00'
author: marta
excerpt: ''
guid: 'https://martinha.online/neuroses-cotidianas/?p=263'
permalink: /2025/06/23/site-novo-no-ar/
image: /wp-content/uploads/2025/06/Screenshot-2025-06-23-at-09.32.15-363x188.png
categories:
    - 'produtos digitais'
format: false
---

<!-- wp:paragraph -->
<p>Como refiz meu site pessoal com IA e como está funcionando agora.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Eu fui front-end muitos anos da minha vida, anos demais. Então hoje em dia eu tenho um cansaço imenso de fazer um html. Eu já tinha feito um site novo no <a href="https://gamma.app/pt-br?gad_campaignid=22650306607&amp;gbraid=0AAAAAqWjqPQd0EPGow7RKfTnxGWYByvYX">Gamma</a>, mas precisaria pagar para publicar e usar esse domínio. E eu não tô investindo tanto nisso não.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Outro problema é que eu gostaria de fazer um site bilingue, e para isso funcionar no Gamma, eu teria de duplicar as páginas -- o que é o dobro de trabalho para qualquer manutenção.</p>
<!-- /wp:paragraph -->

<!-- wp:image {"lightbox":{"enabled":false},"id":264,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large"><img src="/wp-content/uploads/2025/06/Screenshot-2025-06-23-at-09.32.15-1024x467.png" alt="" class="wp-image-264"/></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>Depois de meses apareceu entre os e-mails que assino a ferramenta Bolt. É mais uma ferramenta de <em>vibe coding</em>, que é codar usando IA. Em vez de usar a linguagem de programação, você usa linguagem natural e essas ferramentas criam o site pra você.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Algumas ferramentas de vibe-coding:</p>
<!-- /wp:paragraph -->

<!-- wp:list -->
<ul class="wp-block-list"><!-- wp:list-item -->
<li><a href="https://bolt.new/">Bolt</a></li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><a href="https://lovable.dev/">Lovable</a></li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><a href="https://wonderish.ai/">Wonderish</a></li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><a href="https://replit.com/">Replit</a></li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->

<!-- wp:paragraph -->
<p>Minhas dicas para vibe-coding:</p>
<!-- /wp:paragraph -->

<!-- wp:list -->
<ul class="wp-block-list"><!-- wp:list-item -->
<li><strong>Faça o seu pedido para a ferramenta</strong>. Meu prompt inicial foi: <br><kbd>"Quero criar uma landing page em portugues e ingles para ser meu portfolio como product ops. Um layout clean e moderno. o nome é Marta Preuss. use tecnologias front-end. preciso de uma área para curriculo e portfolio; uma área para palestras e tutoriais; uma area para links de ferramentas que eu criei; e uma de hobbies com link para meu blog, livros que li e coisas que imprimi em 3d. Não esqueça das redes sociais: linkedin, bluesky e instagram. crie também uma área para contato com email e embed do calendly."</kbd><br></li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>Peça modificações no que já existe.</strong> Não gostei do layout que ele fez então pedi outro:<br><kbd>"I don't like the layout. It's too simple. Make something more modern. try a pastel color palette. use serif fonts."</kbd><br>Veja que eu fiz o prompt inicial em português e esse em inglês. Não faz diferença. Às vezes eu <em>sinto</em> que ele me entende melhor em inglês; mas sempre consegui resultados em ambas as línguas.<br></li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>Peça para ele criar um <code>readme.md</code>,</strong> um arquivo que explica como o código funciona. Ajuda muito a fazer mais pedidos, trocar de ferramenta ou dar manutenção.<br><kbd>"faça o arquivo readme.md do projeto explicando as pastas, o que cada coisa faz, onde editar o texto e como executar e publicar o projeto."</kbd><br></li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Cole os erros que acontecerem. Ele mesmo resolve.</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->

<!-- wp:paragraph -->
<p>Logo, sem saber mais como mexer com isso mas com uma base de programação, consegui lidar com o código que ele fez. Foram alguns dias de iterações já que meus créditos acabavam, mas ficou como eu queria, mais ou menos.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Uma coisa boa do Bolt é que você pode baixar o código que ele fez e continuar trabalhando, então eu mandei pro Visual Studio Code onde eu tenho o Copilot. O Copilot é uma ferramenta de IA que ajuda a programar do mesmo jeito: conversando com ela. Então até eu entender o que tava acontecendo e fazer umas mudanças, foi uma mão na roda.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Quando fiquei satisfeita e chegou a hora de publicar, resolvi criar uma action do Github para facilitar minha vida: quando eu faço o push na main do projeto, ele roda o <code>npm install</code> e o <code>npm build</code>, que cria os arquivos que serão publicados. Com essa pasta pronta, ele mesmo conecta no FTP e atualiza os arquivos. Para fazer essa action, também usei o Copilot e ficou assim: </p>
<!-- /wp:paragraph -->

<!-- wp:code -->
<pre class="wp-block-code"><code>name: Deploy to FTP

on:
  push:
    branches:
      - main  # Ou sua branch de produção
  workflow_dispatch:  # Permite execução manual via botão no GitHub

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Set up Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'

      - name: Install dependencies
        run: npm install

      - name: Build project
        run: npm run build

      - name: Upload to FTP
        uses: SamKirkland/FTP-Deploy-Action@v4.3.0  # Versão fixa recomendada
        with:
          server: ${{ secrets.FTP_SERVER }}
          username: ${{ secrets.FTP_USERNAME }}
          password: ${{ secrets.FTP_PASSWORD }}
          local-dir: ./dist/
          server-dir: /public_html/  # Ajuste para o seu caminho remoto
          # Opcionais:
          port: 21                   # Se sua porta FTP não for a padrão (21)
          secure: false              # Use 'true' para FTPS (SSL explícito)
          clean: true               # Remove arquivos antigos no servidor</code></pre>
<!-- /wp:code -->

<!-- wp:paragraph -->
<p>Ficou ótimo, com menos riscos de erros humanos: eu faço o código, publico e pronto, tá no ar.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Eu só tive um problema porque as rotas não estavam funcionando em produção, mas pedi ajuda ao DeepSeek e alterei meu <code>.htaccess</code> para que isso funcionasse. </p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Também adicionei o Google Analytics, Tag Manager e o <a href="https://clarity.microsoft.com/projects/view/s3nqzh7ra6/dashboard?date=Last%203%20days">Microsoft Clarity</a> (que se integrou com o Tag Manager e fez tudo sozinho, achei mágico). O site ficou bilingue com uma estrutura bacana, tem os componentes com o conteúdo separado e é fácil de dar manutenção. Também é fácil adicionar artigos para o portfolio. </p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Visita lá: <a href="http://martinha.online">http://martinha.online</a>. </p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Tô bem satisfeita. Eu não sou programadora, mas desenvolvedora: eu desenvolvo, mas não sou fluente em linguagens de programação. Acho que com os modelos de linguagem uma barreira interessante cai para pessoas que, como eu, sabem falar com computadores, mas não escrever a língua deles. Para esses projetos pessoais e mesmo do trabalho, funciona legal. Precisa ter uma base; mas o grosso do trabalho é feito pelo próprio computador.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Claro que sigo com N críticas à IA, e os posts aqui do blog são todos escritos por mim (com exceção de <a href="/2023/08/29/a-vila-das-crencas/">um</a> que fiz quando ainda era novidade e não tinha pensado muito nisso), porque eu <strong>gosto</strong> de escrever. Diferente de programar, que eu não gosto. Tenho tentado dar mais prioridade para as coisas que gosto de fazer na vida. As que eu não gosto têm ficado mais toleráveis assim.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p></p>
<!-- /wp:paragraph -->