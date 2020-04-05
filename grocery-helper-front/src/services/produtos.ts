import axios from 'axios'

// const url = 'http://localhost:3001'
const url = `https://groceryhelper.mybluemix.net`

export default {
  create: async (nomeProduto: string) => {
    let novoProduto = {}
    await axios({
      url: `${url}/produto`,
      method: "POST",
      data: { produto: { nome: nomeProduto } }
    })
      .then(response => novoProduto = response.data)
      .catch(response => console.log(response))
    return novoProduto
  },
  read: async (id: string) => {
    let produto = {}
    await axios({
      url: `${url}/produto/${id}`,
      method: "GET"
    })
      .then(response => produto = response.data)
      .catch(response => console.log(response))
    return produto
  },
  update: async (id: string, novoProduto: Produto) => { },
  delete: async (id: string) => {
    return axios({
      url: `${url}/produto/${id}`,
      method: 'DELETE'
    }).then(result => result)
  },
  list: async () => {
    let produtos
    await axios({
      url: `${url}/produto`,
      method: "GET"
    }).then(response => produtos = response.data)
    return produtos
  },

  /**Configurar a criação de alteração */
  criarAlteracao: async (id: string, data: Date, quantidade: number) => {
    let result = await axios({
      url: `${url}/produto/${id}/alteracao`,
      method: 'POST',
      data: {
        alteracao: {
          data, quantidade
        }
      }
    })
    return result
  },
  editarAlteracao: async (idProduto: string, idAlteracao: string, data: string, quantidade: string) => {
    let produto = await axios({
      url: `${url}/produto/${idProduto}/alteracao/${idAlteracao}`,
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
  excluirAlteracao: async (idProduto: string, idAlteracao: string) => {
    return await axios({
      url: `${url}/produto/${idProduto}/alteracao/${idAlteracao}`,
      method: "DELETE"
    })
  }
}

export type Produto = any