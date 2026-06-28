---
title: Automação de Anúncios de Lançamentos (Go-To-Market)
funcao: Product Operations Analyst  
descricao: Gerador automático de conteúdos de GTM, que é ativado quando um ticket no Jira muda para o status "Done".
impacto: 80% criação mais rápida
ano: 2025  
tags: ["Jira","Make.com","GPT-4","Google Docs","Slack"]
---
## 📣 Automação de Anúncios de Lançamentos (Go-To-Market)

### 🎯 O Desafio
Os Product Managers estavam gastando muito tempo para criar materiais de anúncio de lançamentos — como mensagens no Slack, páginas de "Novidades" e guias no Pendo — frequentemente duplicando esforço entre ferramentas e formatos. Isso dificultava a consistência da comunicação e, em alguns casos, atrasava ou enfraquecia a divulgação dos updates.

### 🔍 Restrições da Equipe
- PMs tinham pouco tempo para redigir versões diferentes de comunicados.  
- Cada tipo de anúncio exigia formatação manual.  
- Faltava um gatilho prático para iniciar o processo no momento certo.  
- Não havia centralização para revisar ou registrar os rascunhos gerados.

### 💡 Minha Solução
Desenhei e implementei um **gerador automático de conteúdos de GTM**, que é ativado quando um ticket no Jira muda para o status "Done".

✅ Criei a automação no Make.com e um agente GPT-4 personalizado.  
✅ O PM apenas marca, no ticket, quais materiais deseja gerar (Slack, Novidades, Pendo).  
✅ O sistema envia os dados do ticket para a OpenAI, que retorna rascunhos prontos e formatados.  
✅ Os rascunhos são enviados para um canal privado no Slack e registrados automaticamente em uma planilha compartilhada.

Eu mesma criei e refinei os prompts do GPT com auxílio do ChatGPT, adaptando a linguagem e o tom conforme o tipo de canal. O fluxo foi testado no board de Product Ops e funcionou perfeitamente.

### 📊 O Impacto
- 📝 Geração automática de conteúdos com apenas um clique no Jira  
- ⏱️ Economia significativa de tempo por lançamento  
- 🎯 Redução de mensagens desalinhadas e perguntas repetidas (como "isso era esperado?")  
- 🧪 Ainda em fase de feedback — o uso é opcional por ticket, via checkbox  
- 📣 Monitoramento via reações no Slack e redução de follow-ups  
- 🔁 Base escalável para automação de conteúdo em lançamentos selecionados'
      