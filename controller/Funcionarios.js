import { where } from "sequelize";
import funcionarios from "../model/FuncionariosModel.js"

async function listar(req, res){
    await funcionarios
    .findAll()
    .then(resultado => { res.status(200).json(resultado) })
    .catch(erro => { res.status(500).json(erro) });
}

async function selecionar(req, res){
    await funcionarios
    .findByPk(req.params.idfuncionario)
    .then(resultado => { res.status(200).json(resultado) })
    .catch(erro => { res.status(500).json(erro) });
}

async function criar(req, res){
    if (!req.body.nome || !req.body.email || !req.body.senha)
        res.status(400).send("Todos os parâmetros (pessoa, email, senha) são obrigatórios.");

    await funcionarios
    .create({ 
        nome: req.body.nome,
        email: req.body.email,
        senha: req.body.senha
    })
    .then(resultado => { res.status(200).json(resultado) })
    .catch(erro => { res.status(500).json(erro) });
}

async function alterar(req, res){
    if (!req.body.nome || !req.body.email || !req.body.senha)
        res.status(400).send("Todos os parâmetros (pessoa, email, senha) são obrigatórios.");

    await funcionarios
    .update({ 
       nome: req.body.nome,
       email: req.body.email,
       senha: req.body.senha
    },
    {   where:{
        idfuncionario: req.params.idfuncionario}
    })
    .then(resultado => { res.status(200).json(resultado) })
    .catch(erro => { res.status(500).json(erro) });
}

async function excluir(req, res){
    await funcionarios
    .destroy(
    {   where:{
        idfuncionario: req.params.idfuncionario}
    })
    .then(resultado => { res.status(200).json(resultado) })
    .catch(erro => { res.status(500).json(erro) });
}

export default { listar, selecionar, criar, alterar, excluir };