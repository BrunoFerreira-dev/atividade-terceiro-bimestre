
const express = require('express');
const sequelize = require('./config/banco');
const Funcionario = require('./modelo/Funcionario');
const Loja = require('./modelo/Loja');
const Produto = require('./modelo/Produto');

Funcionario.belongsTo(Loja, {
  foreignKey: 'idLoja'
});

Loja.hasMany(Funcionario, {
  foreignKey: 'idLoja'
});

const app = express();
const port = 3000;

app.use(express.json());

app.get('/funcionario', async (req, res) => {
  try {
    const funcionarios = await Funcionario.findAll();
    return res.status(200).json(funcionarios);
  } catch (error) {
    return res.status(500).json({
      erro: 'Erro ao consultar funcionários.'
    });
  }
});

app.post('/funcionario', async (req, res) => {
  try {
    const { nome, endereco, idLoja } = req.body;

    const funcionario = await Funcionario.create({
      nome,
      endereco,
      idLoja
    });

    return res.status(201).json(funcionario);
  } catch (error) {
    return res.status(500).json({
      erro: 'Erro ao cadastrar funcionário.'
    });
  }
});

app.delete('/funcionario/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const deletar = await Funcionario.destroy({
      where: { id }
    });

    if (deletar === 0) {
      return res.status(404).json({
        erro: 'Funcionário não encontrado.'
      });
    }

    return res.status(200).json({
      mensagem: 'Funcionário deletado com sucesso!'
    });
  } catch (error) {
    return res.status(500).json({
      erro: 'Erro interno ao deletar funcionário.'
    });
  }
});

app.patch('/funcionario/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const funcionario = await Funcionario.findByPk(id);

    if (!funcionario) {
      return res.status(404).json({
        erro: 'Funcionário não encontrado.'
      });
    }

    await funcionario.update(req.body);

    return res.status(200).json({
      mensagem: 'Funcionário atualizado com sucesso!',
      funcionario
    });
  } catch (error) {
    return res.status(500).json({
      erro: 'Erro interno ao atualizar funcionário.'
    });
  }
});
//////LOJA
app.get('/loja', async (req, res) => {
  try {
    const lojas = await Loja.findAll();
    return res.status(200).json(lojas);
  } catch (error) {
    return res.status(500).json({
      erro: 'Erro ao consultar lojas.'
    });
  }
});

app.post('/loja', async (req, res) => {
  try {
    const { endereco } = req.body;

    const loja = await Loja.create({endereco});

    return res.status(201).json(loja);
  } catch (error) {
    return res.status(500).json({
      erro: 'Erro ao cadastrar loja.'
    });
  }
});

app.delete('/loja/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const deletar = await Loja.destroy({
      where: { id }
    });

    if (deletar === 0) {
      return res.status(404).json({
        erro: 'Loja não encontrada.'
      });
    }

    return res.status(200).json({
      mensagem: 'Loja deletada com sucesso!'
    });
  } catch (error) {
    return res.status(500).json({
      erro: 'Erro interno ao deletar Loja.'
    });
  }
});

app.patch('/loja/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const loja = await Loja.findByPk(id);

    if (!loja) {
      return res.status(404).json({
        erro: 'Loja não encontrada.'
      });
    }

    await loja.update(req.body);

    return res.status(200).json({
      mensagem: 'Loja atualizada com sucesso!',
      loja
    });
  } catch (error) {
    return res.status(500).json({
      erro: 'Erro interno ao atualizar loja.'
    });
  }
});

//////PRODUTOS
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

    const produto = await Produto.findOne({
      where: { id, idLoja }
    });

    if (!produto) {
      return res.status(404).json({
        erro: 'Produto não encontrado nesta loja.'
      });
    }

    await produto.update(req.body);

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

sequelize.sync()
  .then(() => {
    console.log('Banco de dados conectado com sucesso!');

    app.listen(port, () => {
      console.log(`Servidor rodando na porta ${port}`);
    });
  })
  .catch((error) => {
    console.error('Erro ao conectar ou sincronizar o banco:', error);
  });
