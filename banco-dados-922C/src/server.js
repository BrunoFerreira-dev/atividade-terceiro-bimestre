const express = require('express');
const sequelize = require('./config/banco');
const Funcionario = require('./modelo/Funcionario');
const Loja = require('./modelo/Loja');
const Produto = require('./modelo/Produto');

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

app.get('/loja/:idLoja/produto', async (req, res) => {
  try {
    const { idLoja } = req.params;

    const loja = await Loja.findByPk(idLoja);

    if (!loja) {
      return res.status(404).json({
        erro: 'Loja não encontrada.'
      });
    }

    const produtos = await Produto.findAll({
      where: { idLoja }
    });

    return res.status(200).json(produtos);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      erro: 'Erro ao consultar produtos.'
    });
  }
});

app.post('/loja/:idLoja/produto', async (req, res) => {
  try {
    const { idLoja } = req.params;
    const { nome, descricao, preco } = req.body;

    const loja = await Loja.findByPk(idLoja);

    if (!loja) {
      return res.status(404).json({
        erro: 'Loja não encontrada.'
      });
    }

    const produto = await Produto.create({
      nome,
      descricao,
      preco,
      idLoja
    });

    return res.status(201).json(produto);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      erro: 'Erro ao cadastrar produto.'
    });
  }
});

app.patch('/loja/:idLoja/produto/:id', async (req, res) => {
  try {
    const { idLoja, id } = req.params;
    const dadosAtualizar = req.body;

    const produto = await Produto.findOne({
      where: { id, idLoja }
    });

    if (!produto) {
      return res.status(404).json({
        erro: 'Produto não encontrado nesta loja.'
      });
    }

    await produto.update(dadosAtualizar);

    return res.status(200).json({
      mensagem: 'Produto atualizado com sucesso!',
      produto
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      erro: 'Erro ao atualizar produto.'
    });
  }
});

app.delete('/loja/:idLoja/produto/:id', async (req, res) => {
  try {
    const { idLoja, id } = req.params;

    const deletar = await Produto.destroy({
      where: { id, idLoja }
    });

    if (deletar === 0) {
      return res.status(404).json({
        erro: 'Produto não encontrado nesta loja.'
      });
    }

    return res.status(200).json({
      mensagem: 'Produto excluído com sucesso!'
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      erro: 'Erro ao excluir produto.'
    });
  }
});


sequelize.sync().then(() => {
  console.log(`Banco de dados conectado com sucesso!`);

  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  });
});
