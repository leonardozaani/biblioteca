import { where } from "sequelize";
import veiculo from "../model/VeiculoModel.js"

async function listar(req, res){
    await veiculo
    .findAll()
    .then(resultado => { res.status(200).json(resultado) })
    .catch(erro => { res.status(500).json(erro) });
}

async function selecionar(req, res){
    await veiculo
    .findByPk(req.params.idveiculo)
    .then(resultado => { res.status(200).json(resultado) })
    .catch(erro => { res.status(500).json(erro) });
}

async function criar(req, res){
    if (!req.body.marca || !req.body.modelo || !req.body.datafabricacao || !req.body.anomodelo || !req.body.valorfipe)
        res.status(400).send("Todos os parâmetros são obrigatórios, com exceção do sinistros.");

    await veiculo
    .create({ 
        marca: req.body.marca,
        modelo: req.body.modelo,
        datafabricacao: req.body.datafabricacao,
        anomodelo: req.body.anomodelo,
        valorfipe: req.body.valorfipe,
        automatico: req.body.automatico,
        arcondicionado: req.body.arcondicionado,
        unicodono: req.body.unicodono,
        sinistros: req.body.sinistros
    })
    .then(resultado => { res.status(200).json(resultado) })
    .catch(erro => { res.status(500).json(erro) });
}

async function alterar(req, res){
    if (!req.body.marca || !req.body.modelo || !req.body.datafabricacao || !req.body.anomodelo || !req.body.valorfipe)
        res.status(400).send("Todos os parâmetros são obrigatórios, com exceção do sinistros.");

    await veiculo
    .update({ 
        marca: req.body.marca,
        modelo: req.body.modelo,
        datafabricacao: req.body.datafabricacao,
        anomodelo: req.body.anomodelo,
        valorfipe: req.body.valorfipe,
        automatico: req.body.automatico,
        arcondicionado: req.body.arcondicionado,
        unicodono: req.body.unicodono,
        sinistros: req.body.sinistros
    },
    {   where:{
        idveiculo: req.params.idveiculo}
    })
    .then(resultado => { res.status(200).json(resultado) })
    .catch(erro => { res.status(500).json(erro) });
}

async function excluir(req, res){
    await veiculo
    .destroy(
    {   where:{
        idveiculo: req.params.idveiculo}
    })
    .then(resultado => { res.status(200).json(resultado) })
    .catch(erro => { res.status(500).json(erro) });
}

export default { listar, selecionar, criar, alterar, excluir };