---
title: Quorum Ideas Digest - De Pedidos Brutos a Insights Semanais
funcao: Product Operations Analyst  
descricao: Construi e mantive um sistema automatizado de digest que transforma o backlog do Jira em insights estruturados.
impacto: 
etiqueta1: Vibe coding
etiqueta2: Resumo com IA
etiqueta3: Make.com
ano: 2025  
ferramentas: Jira API · Python · Slack · OpenAI · Make.com · GitHub Actions
---

## 💡 Quorum Ideas Digest: De Pedidos Brutos a Insights Semanais

### 🎯 O Desafio
Ideias de melhoria e sugestões de funcionalidades estavam se acumulando no board do Jira, muitas vezes sem análise até que estivessem atrasadas. Os PMs tinham dificuldade para acompanhar o que precisava de atenção semanalmente, e os times de CS não sabiam se os pedidos dos clientes estavam sendo considerados.

### 🔍 Restrições da Equipe
- As tarefas vinham de formulário → Make → Jira, mas sem resumo centralizado  
- PMs tinham pouco tempo e poucos recursos para revisar o backlog semanal  
- Faltava uma forma de identificar tendências ou temas prioritários  
- Deadlines de primeira resposta eram frequentemente perdidos

### 💡 Minha Solução
Construi e mantive um **sistema automatizado de digest** que transforma o backlog do Jira em insights estruturados.

✅ Desenvolvi scripts em Python (com auxílio do Copilot) para buscar tarefas com status “Aguardando revisão” no projeto QE  
✅ Agrupei os itens por área de produto e categoria de deadline (atrasado, para a próxima semana, outros)  
✅ Integrei o GPT para gerar resumos com tendências com base nas descrições dos tickets  
✅ Testei vários formatos de mensagem no Slack e adotei o que gerou mais engajamento  
✅ Automatizei a execução via GitHub Actions, garantindo envio toda quinta-feira

O resultado é um digest leve, confiável e útil para decisões estratégicas.

### 📊 O Impacto
- 📌 PMs e CS agora têm visibilidade rápida sobre ideias vindas dos clientes  
- 🔄 Redução de ruído no backlog e foco nos temas de maior impacto  
- 💬 Discussões valiosas surgiram a partir dos resumos — destacadas pela liderança de produto  
- 🧠 A análise do GPT forneceu visão estratégica sobre os temas mais recorrentes  
- ⚙️ Pipeline totalmente automatizado — sem necessidade de esforço manual