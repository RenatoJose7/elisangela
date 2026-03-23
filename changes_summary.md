# Resumo das Alterações — Cosmic Cell Invasion

Realizei uma série de melhorias e novas funcionalidades no jogo para torná-lo mais desafiador, educativo e interativo. Abaixo estão os detalhes das modificações:

### 1. Novo Banco de Questões
Adicionei **5 novas questões de biologia celular** de nível ENEM/3º Ano, focadas em:
- Detalhes da **Metáfase** (cinetócoros).
- Diferenças entre **Mitose e Meiose**.
- Fases específicas da **Meiose I** (Paquíteno e Crossing Over).
- Impacto de inibidores enzimáticos no ciclo celular.

### 2. Sistema de Temporizador (Arcade Challenge)
Para reforçar a estética arcade e aumentar a dificuldade, implementei um **temporizador de 20 segundos** para cada pergunta.
- O tempo começa a contar assim que a carta é revelada.
- Se o tempo acabar antes de uma resposta ser escolhida, o jogador perde o turno e recua no tabuleiro.
- O contador muda para vermelho e pulsa nos últimos 5 segundos para gerar urgência.

### 3. Sistema de Pontuação e Leaderboard
O jogo agora possui um sistema de progressão competitiva:
- **Pontuação**: Cada resposta correta concede **100 pontos** ao jogador.
- **Leaderboard**: As 5 melhores pontuações são salvas localmente no navegador (`localStorage`).
- **Tela Inicial**: O ranking dos melhores jogadores agora é exibido logo no início, incentivando a competição.

### 4. Controle de Áudio
Adicionei um botão de **Toggle de Som** no cabeçalho (HUD) do jogo.
- Permite ativar ou desativar os efeitos sonoros (dado, acertos, erros) a qualquer momento.
- O estado visual do botão indica se o som está "ON" ou "OFF" com cores neon.

### 5. Melhorias na Interface (UI/UX)
- **Tela de Vitória**: Agora exibe a pontuação final do vencedor junto com a celebração.
- **Feedback Visual**: Melhorei os efeitos de flash na tela para indicar acertos (verde) e erros/timeout (vermelho).
- **Consistência Neon**: Todos os novos elementos seguem a paleta "Arcade Cósmico Neon Brutalist" definida no projeto original.

---
Essas alterações transformam o projeto de um simples tabuleiro educativo em uma experiência de jogo mais completa e engajadora.
