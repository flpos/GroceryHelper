let produtos = [
  {
    id: 0,
    nome: 'Arroz',
    alteracoes: [
      {
        data: new Date('07-17-2019'),
        quantidade: 4
      },
      {
        data: new Date('06-17-2019'),
        quantidade: 3
      }
    ],
    fim: "Amanhã",
    mes: "10"
  },
  {
    id: 1,
    nome: 'Feijão',
    alteracoes: []
  }
]

export default {
  create: nomeProduto => {
    const novo = {
      id: produtos.length,
      nome: nomeProduto,
      alteracoes: []
    }
    produtos.push(novo)
    return novo
  },
  read: id => {
    return produtos.find(prod => prod.id === Number(id))
  },
  update: (id, novoProduto) => {
    const index = produtos.findIndex(prod => prod.id === Number(id))

    if (index) {
      const antigo = produtos[index]
      antigo.nome = novoProduto.nome
      produtos[index] = antigo
      return produtos[index]
    } else {
      return null
    }
  },
  delete: id => {
    produtos = produtos.filter(prod => prod.id !== Number(id))
  },
  list: () => {
    return produtos
  },
  novaAlteracao: (id, data, quantidade) => {
    const index = produtos.findIndex(prod => prod.id === Number(id))

    if (index) {
      const produto = produtos[index]
      produto.alteracoes.push({data, quantidade})
      produtos[index] = produto
      return produtos[index]
    } else {
      return null
    }
  }
}
