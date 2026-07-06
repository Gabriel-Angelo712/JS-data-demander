# Data Integration - Processamento Sob Demanda

Este projeto demonstra um fluxo simples de processamento sob demanda usando duas APIs locais e um cliente que lê dados de um banco simulado, consulta uma API de produtos e envia resultados para uma API de carrinho.

## Visão Geral

O foco principal é o processamento sob demanda:

- `server1.js` expõe uma API de produtos que devolve detalhes com base no nome do produto.
- `server2.js` expõe uma API de carrinho que recebe dados de produto via `POST` e processa o envio.
- `client.js` simula a leitura de dados de um banco, busca detalhes de cada produto e envia a informação para a API de carrinho.

## Estrutura do Projeto

- `src/server1.js` - API de produtos em `http://localhost:3000/products`
- `src/server2.js` - API de carrinho em `http://localhost:4000/cart`
- `src/client.js` - Processo sob demanda que integra os dois serviços

## Como Executar

1. Inicie o serviço de produtos:

```bash
npm run start:server1
```

2. Inicie o serviço de carrinho:

```bash
npm run start:server2
```

3. Em outro terminal, execute o cliente para iniciar o processamento sob demanda:

```bash
npm run start:client
```

## O Fluxo de Processamento

1. O cliente simula a leitura de dados do banco de dados com `myDB()`.
2. Para cada item, ele consulta `server1` em `http://localhost:3000/products?name=<produto>`.
3. Em seguida, envia os dados recebidos para `server2` em `http://localhost:4000/cart`.
4. O resultado é processado imediatamente e a resposta é retornada pelo endpoint de carrinho.

## Observações

- O cliente atual faz chamadas sequenciais para cada produto. Isso é útil para ilustrar a lógica, mas pode ser otimizado com processamento paralelo ou lotes para maior escala.
- O foco do projeto é demonstrar o processamento sob demanda entre serviços, não a persistência real de dados.
- O servidor de carrinho usa `request.on('data')` via `node:events` para ler o payload enviado pelo cliente.
