---
id: 105
title: 'Como eu fiz meu Skoob self-hosted'
date: '2025-02-26T11:58:09-03:00'
author: marta
excerpt: ''
guid: 'https://martinha.online/neuroses-cotidianas/2025/02/26/como-eu-fiz-meu-skoob-self-hosted/'
permalink: /2025/02/26/como-eu-fiz-meu-skoob-self-hosted/
image: /wp-content/uploads/2025/03/3tocmh5my0q-e1741114068170.jpg
categories:
    - 'produtos digitais'
format: false
---

<!-- wp:paragraph -->
<p>Eu nem sei há quanto tempo eu uso o Skoob, mas faz mais de 14 anos, porque quando    Eduardo foi me avisar que a gente estava namorando ele disse "vou atualizar o    cara-livro" se referindo ao Facebook e eu primeiro pensei no Skoob <em>(imagine    minha surpresa ao abrir o Facebook e ter um pedido de namoro lá. hihihih lembro    como se fosse ontem, eu estava na casa dos meus pais, no escritório. Minha mãe e    minha irmã estavam comigo e eu comecei a comemorar "Estou namorando! Estou    namorando!")</em>.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Mas nessa onda de serviços online sendo doidos e honestamente, o Skoob sempre    pareceu frágil, como se fosse cair a qualquer momento. Fiquei com medo e resolvi    apenas fazer um backup inocente.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>O tutorial abaixo não é tão simples. Só tô documentando como eu fiz. Se você    quiser fazer isso, <a href="https://calendly.com/mapreuss">pode me chamar pra    conversar</a> ou eu faço um orçamento pra fazer pra você.</p>
<!-- /wp:paragraph -->

<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading">Extraindo os dados</h3>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Por sorte o Skoob usa uma API interna (eu jurava que era hard-coded, PHP, sei    lá). Fui na página da biblioteca em <a href="https://www.skoob.com.br/estante/livros/1/277235/page:1">livros lidos</a>,    inspecionei elemento e descobri o endpoint para retornar todos os livros.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Para que você não precise ficar procurando, o endpoint é</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>    <code>https://www.skoob.com.br/v1/bookcase/books/[seu        id]/shelf_id:1/page:1/limit:36/</code></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Troca ali <strong>[seu id]</strong> pelo número que tem no seu perfil do Skoob.    Por exemplo no meu endereço:</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>https://www.skoob.com.br/estante/livros/1/<strong>123</strong>/page:1</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Meu id seria <code>123</code>. </p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Eu abri isso no navegador e ele me deu um json. Note que no cabeçalho ele traz</p>
<!-- /wp:paragraph -->

<!-- wp:code -->
<pre class="wp-block-code"><code><code>"paging": {</code>
<code>"total": 169,</code>
<code>"page_count": 5,</code>
<code>"page": 1,</code>
<code>"next_page": true,</code>
<code>"prev_page": false,</code>
<code>"limit": 36,</code>
<code>"first_item": 1,</code>
<code>"last_item": 36</code>
<code>},</code></code></pre>
<!-- /wp:code -->

<!-- wp:paragraph -->
<p>Tá vendo que tem o <code>page_count</code>? Como no meu caso eram 5, eu abri o    endpoint as 5 vezes, mudando o <code>page:1</code> para <code>page:2</code> até    5. Precisava? Acho que não. Mas eu fiquei com medo de mudar o <code>limit</code>    e não retornar tudo. Eram só 5 sabe.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Enfim, copiei e colei as 5 respostas no Visual Studio Code, depois apaguei essa    parte do cabeçalho, fazendo um grande <code>"response": [...]</code> com todos    os livros.</p>
<!-- /wp:paragraph -->

<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading">Tratando os dados</h3>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Depois fui pro <a href="https://chatgpt.com/share/67bf5c5d-e060-8010-ba2d-0df04b5cbf3a">ChatGPT    e pedi pra ele fazer um script em python pra mim</a> para transformar esse json    em um CSV. Acho que tem ferramentas que fazem isso online mas eu queria um pouco    de flexibilidade para escolher as colunas que eu queria.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Com o script, fui no <a href="https://colab.research.google.com/drive/1-tf0xdQB_y_8CZ_2SXR3YkQyArGUmQ6Q?usp=sharing">Google    Colab</a> e criei o script. Subi meu json e ele criou o CSV pra mim, com as    colunas que pedi. A única alteração que eu fiz foi ter adicionado o endereço do    Skoob na frente da URL, que no json não tinha.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Com o CSV, criei um <a href="https://docs.google.com/spreadsheets/d/1K3aNqXkjBmATBPviW4FVY81YSlm7nCRuTAE6uH1jGwA/edit?usp=sharing">Google    Sheets</a> com os dados. Como não gostei do formato de data, ainda <a href="https://chatgpt.com/share/67bf5d16-2bf8-8010-aa35-8ada5512c078">pedi    um script pro ChatGPT para mudar o formato pra mim</a>.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>FAQ</strong>: Sim, eu sou muito preguiçosa. Sim, meus prompts são sempre    muito preguiçosos. Não, eu não me arrependo de nada. Sim, eu tenho pena dos 500    litros de água que gastei pra fazer isso.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Pronto, tenho meu backup. E agora?</p>
<!-- /wp:paragraph -->

<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading">Mostrando os livros no softr.io</h3>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Eu sou muito cadelinha do <a href="http://softr.io">softr.io</a>. Pra mim é uma    das melhores ferramentas de prototipação que tem, porque usa o Google Sheets    como base de dados, e eu sei usar o Google Sheets, e isso me deixa feliz. Além    do plano gratuito servir muito bem. </p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>O Airtable tem uma funcionalidade semelhante e nativa (o softr nasceu dando    suporte para o Airtable), mas eu ainda me sinto mais confortável com Sheets e    Softr. O Lovable também resolve, usando o Supabase, mas achei... não <em>    complicado</em>, mas meio que um tiro de canhão pra matar formiga, sabe? Eu    gosto do tanto certo de flexibilidade e automação aqui.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Eu acho bem intuitivo: você cria um novo projeto e conecta sua planilha. Cada    coluna é um campo, que tem vários tipos de exibição. Por exemplo, o Rating para    a nota que eu dei no livro, no Google Sheets é um número, mas eu posso escolher    exibir como número, texto ou estrelinhas. Ele já tem isso.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><a href="https://martinha-leituras.softr.app/">O projeto ficou bem legal</a>.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Além de fazer a listagem, eu também adicionei os campos de Destaques do livro e    Resenha. Fiz uma página para adicionar livros, que aí eu posso usar direto a    interface, não preciso atualizar a planilha se não quiser. E ele tem tudo isso    de editar e adicionar já pré-feito. </p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Ele também já tem a área de login, então só eu posso fazer essas edições e as    outras pessoas só ver o conteúdo. Fica tudo centralizado.</p>
<!-- /wp:paragraph -->

<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading">Mais ideias</h3>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Eu não ia, mas agora estou pensando em colocar o status da leitura, tipo: lido,    abandonado, lendo, lista. Assim eu posso já pré-cadastrar o que pretendo ler. É    só adicionar mais uma coluna. </p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Infelizmente um bug estava me impedindo de editar itens caso eu mexesse no banco    de dados. Eu preciso remover o módulo e adicionar novamente, mesmo pra campos    que já existem. Aí deu preguiça.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Eu só não fiz o blog direto lá porque achei meio paia, mas agora eu já tô    considerando. Funcionaria bem. Tem até um módulo nativo pra comentários. Posso    conectar no <a href="https://supabase.com/">supabase</a> e postar a vontade.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Com certeza eu vou fazer algo semelhante para as minhas impressões 3D, com    galeria de fotos, facilidade de impressão e links para modelos. Queria bastante    compartilhar mais do processo, e focar menos na venda.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>E foi uma delícia fazer, fazia tempo que eu não nerdeava assim e foi gostoso.    Fiquei bem feliz com o resultado. Já tem algumas frases em destaque e algumas    resenhas lá, mas vou adicionando o restante aos poucos.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p></p>
<!-- /wp:paragraph -->