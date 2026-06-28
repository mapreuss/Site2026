---
title: Gestão e Automação das Reuniões de Stakeholders
funcao: Product Operations Analyst  
descricao: Padronização do processo das reuniões de stakeholders e automatização
impacto: Menos trabalho manual
ano: 2025  
tags: ["Google Calendar","Zoom","Confluence","Resumo com IA","Vibe coding"]
---

## 📆 Gestão e Automação das Reuniões de Stakeholders

### 🎯 O Desafio

A organização de produto realiza reuniões quinzenais com cada squad, mas o processo de agendamento, atualização e distribuição dos resumos era demorado e sujeito a erros. Era necessário garantir consistência e acessibilidade, sem sobrecarregar os PMs ou os times técnicos.
### 🔍 Restrições da Equipe

- Agendas complexas com squads se revezando entre 1ª/3ª e 2ª/4ª semanas.  
- Mudanças de última hora por fuso horário, feriados ou disponibilidade.  
- Os resumos gerados por IA chegavam por e-mail, mas não eram armazenados.  
- O processo de copiar e colar os resumos no Confluence era manual e repetitivo.
### 💡 Minha Solução

Mantive e padronizei todo o processo das reuniões de stakeholders e desenvolvi um **script em Python** — com ajuda do GitHub Copilot — para automatizar parte do trabalho semanal.

✅ Criei o script para buscar o e-mail com o resumo do Zoom e adicioná-lo automaticamente na página correta do Confluence  
✅ Adaptei o processo para considerar semanas alternadas (1ª/3ª, 2ª/4ª), ignorando a 5ª  
✅ Fiz revisão manual toda semana para garantir que tudo estivesse correto  
✅ Corrigi casos em que o resumo foi salvo na semana errada — sem impacto para os times

A estrutura da reunião já existia, definida pelos PMs. Minha contribuição foi eliminar tarefas repetitivas e garantir consistência ao longo do tempo.
### 📊 O Impacto

- ⏱️ Redução de trabalho manual repetitivo com mais consistência na documentação  
- 🔍 Stakeholders sempre sabem onde encontrar o resumo e o link da reunião  
- 🧑‍💻 Script criado internamente com ferramentas acessíveis e auxílio do Copilot  
- 📭 Feedback prático: “ninguém reclamou” — a mudança foi invisível para os times  
- 🔁 Reviso manualmente toda semana para manter qualidade e corrigir exceções