

# Introdução

<img src="https://hypetech.games/assets/images/branding/dark.png" alt="Hypetech" width="350"/>

Seja bem-vindo ao Desafio Prático de Frontend Hypetech.

Com um catálogo de 15 jogos, distribuídos atualmente para mais de 250 plataformas e meio milhão de jogadores, a Hypetech é uma produtora e provedora de jogos internacional de Jogos Gambling Justos, com foco em criar jogos para o público LATAM.

Todos os nossos jogos são jogos [Provably Fair](https://provablyfair.org/), promovendo uma experiência de jogo justa, confiável e transparente aos jogadores.

Neste desafio prático o seu objetivo será atuar de forma livre na interface de dois jogos da Hypetech.

Selecionamos dois jogos para este desafio: **Motograu** e **WallStreet**. Ambos são jogos que vão entrar no mercado em Janeiro, e escolheremos a melhor interface de cada um para ser a interface oficial do jogo.

Além disso, o objetivo do desafio é selecionar e premiar os melhores frontends avaliados neste desafio.


## Sobre o Motograu

Com uma temática divertida e voltada ao público brasileiro, o **Motograu** é um jogo de categoria Crash, onde objetivo do jogador é **apostar no Motoqueiro e retirar sua aposta antes que o Cachorro Caramelo o derrube**.

Caso a aposta seja encerrada pelo jogador antes do Motoqueiro ser derrubado, o valor apostado é pago multiplicado pelo multiplicador do momento do cashout.

As rodadas são automáticas e os resultados são transmitidos ao vivo aos jogadores, fornecendo a todos os jogadores as mesmas probabilidades imparciais ao mesmo tempo, 24 horas por dia, 7 dias por semana.

![UI MotoGrau](https://i.ibb.co/42BnW3g/MotoGrau.png)



## Sobre o WallStreet
	
O Wallstreet é um jogo de predição de tendência, inspirado na plataforma IQ Option. O Objetivo é "adivinhar" qual será a próxima tendência do mercado: subir, descer, ou manter (Bull).

Caso o jogador acerte as tendências de Subida ou Descida, seu prêmio é o valor apostado 2x. Caso acerte a tendência Bull, seu prêmio é o valor apostado 20x.

![UI WallStreet](https://i.ibb.co/yPCK0mG/Wall-Street.png)


## Orientações

**Essa sessão traz orientações-base para a execução do desafio:**

1. Criamos **interfaces funcionais de exemplo** para o **Motograu** e **WallStreet**. Nesta interface estão inclusos todos os componentes e funcionalidades básicas e obrigatórias. **Inicie seu desenvolvimento a partir dela**.
2. As animações de ambos os jogos são compiladas, portanto, elas não devem ser alteradas, apenas os elementos de UI.
3. Não modifique os componentes globais (core), eles servem apenas como base.
4. Você é livre para criar novos componentes que gerem valor. **Exemplo:** 
	- Contagem de players online;
	- Chat visível;
	- Notificações e animações visuais;
	- Outras informações que possam ser interessante para o jogador;


## Avaliação

**Você será avaliado com base nos seguintes critérios:**

- Abordagem técnica;
- Qualidade e clareza do código;
- Feeling, criatividade e qualidade na concepção da UI e UX;


## Stacks
- React
- TailwindCss
- Websocket

## Plus
Utilize uma biblioteca gráfica, como Apex Chart, para desenvolver um gráfico inspirado na IQ Option.



# Instruções técnicas

Este projeto contém a aplicação das interfaces dos jogos **WallStreet** e **Motograu**:

### 1. Clone o repositório:
```bash
git clone https://github.com/hypetechgames/frontend-challenge
```

### 2. Instale as dependências e inicie o projeto

Acesse a pasta do projeto:
```bash
cd frontend-challenge
```

Instale as dependências do projeto:
```bash
yarn install
```

Inicie o projeto:
```bash
yarn dev
```

### 3. Obtendo um token de acesso ao jogo

Para acessar o jogo é necessário obter um token de acesso que cria uma sessão demonstrativa funcional para desenvolvimento.

Para obtê-lo:

**1 - Acesse a API de Demonstração:** 
 https://hypetech-demo-api-service-developer.up.railway.app/docs/

**2 - Obtenha um link de demonstração:**	

	{ "gameUrl": "https://hypetech-games-ui-developer.up.railway.app/44cdf4cec80508c531f71a1929d591c8" }

**3 - Extraia o token obtido:**
~~https://hypetech-games-ui-developer.up.railway.app/~~**44cdf4cec80508c531f71a1929d591c8**

![Como extrair o token obtido](https://i.ibb.co/tsC5BJ9/Screen-Recording-2024-01-08-at-17-59-36.gif)


**Obs:** Para cada jogo que desejar carregar, você deve gerar um novo token, alterando o parâmetro "game" da requisição:

 ```json
"game": "motograu",
"lang": "pt",
"currency": "BRL"
```

 ```json
"game": "wall-street",
"lang": "pt",
"currency": "BRL"
```

**4 - Acesse o jogo:**
Uma vez obtido o token, utilize-o no seu ambiente de desenvolvimento:

**Exemplo - URL do seu ambiente:** http://localhost:8000/
**Exemplo - URL do jogo no seu ambiente:** http://localhost:8000/2b29acad3f7a1e6b0995155668719e66

Caso encontre dificuldade em obter o token seguindo processo acima, você poderá utilizar os tokens públicos abaixo *(ciente que outros desenvolvedores podem estar utilizando a mesma sessão ao mesmo tempo)*:

**Motograu:** 44cdf4cec80508c531f71a1929d591c8
**WallStreet:** 294f24f2c661fc80fd6d12845a3ccdd6

Isso é tudo. A partir de agora você pode acessar o jogo e explorar todas as funcionalidades de forma completa durante seu desenvolvimento.