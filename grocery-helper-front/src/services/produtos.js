import axios from 'axios'

const url = `groceryhelper.mybluemix.net`

export default {
  create: async nomeProduto => {
    let novoProduto = {}
    await axios({
      url: `http://${url}/produto`,
      method: "POST",
      data: { produto: { nome: nomeProduto } }
    })
      .then(response => novoProduto = response.data)
      .catch(response => console.log(response))
    return novoProduto
  },
  read: async id => {
    let produto = {}
    await axios({
      url: `http://${url}/produto/${id}`,
      method: "GET"
    })
      .then(response => produto = response.data)
      .catch(response => console.log(response))
    return produto
  },
  update: async (id, novoProduto) => { },
  delete: async id => {
    return axios({
      url: `http://${url}/produto/${id}`,
      method: 'DELETE'
    }).then(result => result)
  },
  list: async () => {
    let produtos
    await axios({
      url: `http://${url}/produto`,
      method: "GET"
    }).then(response => produtos = response.data)
    return produtos
  },

  /**Configurar a criação de alteração */
  criarAlteracao: async (id, data, quantidade) => {
    let result = await axios({
      url: `http://${url}/produto/${id}/alteracao`,
      method: 'POST',
      data: {
        alteracao: {
          data, quantidade
        }
      }
    })
    return result
  },
  editarAlteracao: async (idProduto, idAlteracao, data, quantidade) => {
    let produto = await axios({
      url: `http://${url}/produto/${idProduto}/alteracao/${idAlteracao}`,
      method: "PUT",
      data: {
        alteracao: {
          data,
          quantidade
        }
      }
    })
    return produto
  },
  excluirAlteracao: async (idProduto, idAlteracao) => {
    return await axios({
      url: `http://${url}/produto/${idProduto}/alteracao/${idAlteracao}`,
      method: "DELETE"
    })
  }
}
