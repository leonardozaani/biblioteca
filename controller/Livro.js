import { where } from "sequelize";
import livro from "../model/LivroModel.js";
import categoria from "../model/CategoriaModel.js";
import editora from "../model/EditoraModel.js";


async function listar(req, res) {
    await livro
    .findAll({
        include: [
            { model: categoria, attributes: ['categoria'], as: 'categoria'},
            { model: editora, attributes: ['editora'], as: 'editora'},
        ]
    })
    .then(resultado => {res.status(200).json(resultado) })
    .catch(erro => {res.status(500).json(erro) });
}

async function selecionar(req, res) {
    if (!req.params.idlivro)
        res.status(500).send("Parametro idlivro é obrigatório.");

    await livro
    .findByPk(req.params.idlivro)
    .then(resultado => {res.status(200).json(resultado) })
    .catch(erro => {res.status(500).json(erro) });
}

async function listarporcategorias(req, res) {
    await livro
    .findAll({
        include: [
            { model: categoria, attributes: ['categoria'], as: 'categoria'},
            { model: editora, attributes: ['editora'], as: 'editora'},
        ],
        where: {idcategoria: req.params.idcategoria}
    })
    .then(resultado => {res.status(200).json(resultado) })
    .catch(erro => {res.status(500).json(erro) });
}


async function criar(req, res) {
    if (!req.body.titulo || !req.body.ano || !req.body.paginas || !req.body.edicao || !req.body.resumo || !req.body.idcategoria || !req.body.ideditora)
        res.status(500).send("Parametros são obrigatório.");

    await livro
        .create({
            titulo: req.body.titulo,
            ano: req.body.ano,
            paginas: req.body.paginas,
            edicao: req.body.edicao,
            resumo: req.body.resumo,
            idcategoria: req.body.idcategoria,
            ideditora: req.body.ideditora
        })
        .then(resultado => {res.status(200).json(resultado) })
        .catch(erro => {res.status(500).json(erro) });
}

async function alterar(req, res) {
    if (!req.body.titulo || !req.body.ano || !req.body.paginas || !req.body.edicao || !req.body.resumo || !req.body.idcategoria || !req.body.ideditora)
        res.status(500).send("Parametro livro é obrigatório.");

    await livro
        .update({
            titulo: req.body.titulo,
            ano: req.body.ano,
            paginas: req.body.paginas,
            edicao: req.body.edicao,
            resumo: req.body.resumo,
            idcategoria: req.body.idcategoria,
            ideditora: req.body.ideditora
        },
        {
            where: {
                idlivro: req.params.idlivro
            }
        })
        .then(resultado => {res.status(200).json(resultado) })
        .catch(erro => {res.status(500).json(erro) });
}

async function excluir(req, res) {
    await livro
        .destroy(
        {
            where: {
                idlivro: req.params.idlivro
            }
        })
        .then(resultado => {res.status(200).json(resultado) })
        .catch(erro => {res.status(500).json(erro) });
}

export default {listar, selecionar, criar, alterar, excluir, listarporcategorias};