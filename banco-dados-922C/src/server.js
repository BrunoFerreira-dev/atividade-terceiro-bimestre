const express = require('express');
const sequelize = require('./config/banco');
const Funcionario = require('./modelo/Funcionario');
const Loja = require('./modelo/Loja');

const app = express()
const port = 3000

app.use(express.json());
sequelize.sync();

app.get('/funcionario', async (req, res) => {
  const funcionarios = await Funcionario.findAll();
  res.json(funcionarios);
})

app.post('/funcionario', async (req, res) => {
  const { nome, endereco, idLoja } = req.body;
  const usuario = await Funcionario.create({ nome, endereco, idLoja });
  res.status(201).json(usuario);
});

app.delete('/funcionario', async (req, res) => {
  const {id} = req.params;
  try{
    const deletar = await Funcionario.destroy({
      where: {id: id}
    })
    if (deletar === 0) {
      return res.status(404).json({ erro: 'Funcionário não encontrado.' });
    }

    return res.status(200).json({ mensagem: 'Funcionário deletado com sucesso!' });
    
  } catch (error) {
    return res.status(500).json({ erro: 'Erro interno ao deletar Funcionário.' });
  }
})

app.patch('/funcionario', async (req, res) => {
  const {id} = req.params;
  const dadosAtualizar = req.body;
  try{
    const atualizar = await Funcionario.update(dadosAtualizar, {
      where: {id: id}
    })
    if (deletar === 0) {
      return res.status(404).json({ erro: 'Funcionário não encontrado.' });
    }

    return res.status(200).json({ mensagem: 'Funcionário deletado com sucesso!' });
    
  } catch (error) {
    return res.status(500).json({ erro: 'Erro interno ao deletar Funcionário.' });
  }
})
//LOJAS MANEIRAS E LEGAIS

sequelize.sync().then(() => {
  console.log(`Banco de dados conectado com sucesso!`);

  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  });
});