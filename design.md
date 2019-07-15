# Visão geral
O aplicativo deverá auxiliar o usuário em questões como:
- "Quando vai acabar o arroz?"
- "Quanto tenho que comprar de café para durar o mês todo?"
- "Qual a quantidade de feijão que uso por mês/semana?"

# Front
Será exibida, inicialmente, uma lista com todos os produtos registrados pelo usuário, Com um botão para adicionar um novo produto.
Ao clicar em um produto, veremos a tela de detalhes do mesmo, com opções para editar, adicionar uma alteração de quantidade e excluir.

## Dados Enviados ao Back
### Lista de produtos
Requisição GET para "api/produtos".

Sem dados no corpo
### Criar
Requisição POST para "api/produtos".

Dados do novo produto enviados no corpo em formato JSON.
### Detalhes
Requisição GET com id do produto: "api/produtos/{id}".

Sem corpo.
### Editar
Requisição POST com o id do produto: "api/produtos/{id}".

Atualizado no corpo em formato JSON.
### Deletar
Requisição DELETE com o id do produto: "api/produtos/{id}".

# Back
Haverá rotas para:
- Pegar todos os produtos
- Adicionar/Editar/Excluir um produto
- Adicionar uma alteração ao produto especificado

As rotas devem expor somente informações necessárias ao front.
