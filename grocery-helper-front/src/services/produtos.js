let produtos = [
  {
    id: 0,
    nome: 'Arroz',
    alteracoes: [
      {
        data: new Date('2019-06-15'),
        quantidade: 20
      },
      {
        data: new Date('2019-07-17'),
        quantidade: 10
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
    let produto = produtos.find(prod => prod.id === Number(id))

    let uso = []
    if (!!produto && produto.alteracoes.length > 1) {
      for (let i = 0; i < produto.alteracoes.length - 1; i++) {
        let alt1 = produto.alteracoes[i]
        let alt2 = produto.alteracoes[i + 1]
        let intervalo = (alt2.data - alt1.data) / 1000 / 60 / 60 / 24 / 30
        let variacao = alt2.quantidade - alt1.quantidade
        uso.push(variacao / intervalo)
      }
      let mes = uso.reduce((prev, curr) => (prev + curr) / 2).toFixed(1)
      produto.mes = (mes > 0) ? mes : mes * -1
      let fim = (produto.alteracoes[produto.alteracoes.length - 1].quantidade / produto.mes).toFixed(1)
      produto.fim = (fim > 0) ? fim : 0
    }
    return produto
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

    if (index !== undefined) {
      const produto = produtos[index]
      produto.alteracoes.push({ data: new Date(data), quantidade: Number(quantidade) })
      produtos[index] = produto
      return produtos[index]
    } else {
      return null
    }
  }
}
