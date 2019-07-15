# Visão geral
O aplicativo deverá auxiliar o usuário em questões como:
- "Quando vai acabar o arroz?"
- "Quanto tenho que comprar de café para durar o mês todo?"
- "Qual a quantidade de feijão que uso por mês/semana?"

# Entidades
## Produto
Cada produto vai ter um nome e um ID gerado automaticamente pelo banco de dados.

Esse ID será usado para relacionar as alterações e para buscar as informações do produto.
## Alteração
Cada alteração contará com um ID, um ID do produto relacionado a ela, a data que ela foi feita/registrada e a nova quantidade.

# Front
Será exibida, inicialmente, uma lista com todos os produtos registrados pelo usuário, Com um botão para adicionar um novo produto.
Ao clicar em um produto, veremos a tela de detalhes do mesmo, com opções para editar, adicionar uma alteração de quantidade e excluir.

## Dados Enviados ao Back
## Produto
### Lista de produtos
Requisição GET para "api/produtos".

Sem dados no corpo
### Criar
Requisição POST para "api/produtos".

Dados do novo produto enviados no corpo em formato JSON.
`{
  "nome":"Arroz"
}`
### Detalhes
Requisição GET com id do produto: "api/produtos/{id}".

Sem corpo.
### Editar
Requisição POST com o id do produto: "api/produtos/{id}".

Atualizado no corpo em formato JSON.
`{
  "nome":"Feijão"
}`
### Deletar
Requisição DELETE com o id do produto: "api/produtos/{id}".

## Alteração
### Criar
Requisição POST para "api/alteracoes/{id_do_produto}"

Dados no corpo: `{ "data":"15/07/2019", "quantidade": "0.5" }`
### Ler todas relacionadas ao produto
Requisição GET para "api/alteracoes/{id_do_produto}"
### Ler Uma
Requisição GET para "api/alteracoes/{id_da_alteração}"
### Atualizar
Requisição PUT para "api/alteracoes/{id_da_alteracao}"

Dados no corpo: `{ "data":"15/07/2019", "quantidade": "0.5" }`
### Deletar
Requisição DELETE para "api/alteracoes/{id_da_alteracao}"

# Back
Haverá rotas para:
- Pegar todos os produtos
- Adicionar/Editar/Excluir um produto
- Adicionar uma alteração ao produto especificado

As rotas devem expor somente informações necessárias ao front.
