import { where } from "sequelize";
import pessoa from "../model/PessoaModel.js"

async function listar(req, res){
    await pessoa
    .findAll()
    .then(resultado => { res.status(200).json(resultado) })
    .catch(erro => { res.status(500).json(erro) });
}

async function selecionar(req, res){
    await pessoa
    .findByPk(req.params.idpessoa)
    .then(resultado => { res.status(200).json(resultado) })
    .catch(erro => { res.status(500).json(erro) });
}

async function criar(req, res){
    if (!req.body.pessoa || !req.body.email || !req.body.telefone)
        res.status(400).send("Todos os parâmetros (pessoa, email, telefone) são obrigatórios.");

    await pessoa
    .create({ 
        pessoa: req.body.pessoa,
        email: req.body.email,
        telefone: req.body.telefone
    })
    .then(resultado => { res.status(200).json(resultado) })
    .catch(erro => { res.status(500).json(erro) });
}

async function alterar(req, res){
    if (!req.body.pessoa || !req.body.email || !req.body.telefone)
        res.status(400).send("Todos os parâmetros (pessoa, email, telefone) são obrigatórios.");

    await pessoa
    .update({ 
       pessoa: req.body.pessoa,
       email: req.body.email,
       telefone: req.body.telefone
    },
    {   where:{
        idpessoa: req.params.idpessoa}
    })
    .then(resultado => { res.status(200).json(resultado) })
    .catch(erro => { res.status(500).json(erro) });
}

async function excluir(req, res){
    await pessoa
    .destroy(
    {   where:{
        idpessoa: req.params.idpessoa}
    })
    .then(resultado => { res.status(200).json(resultado) })
    .catch(erro => { res.status(500).json(erro) });
}

export default { listar, selecionar, criar, alterar, excluir };