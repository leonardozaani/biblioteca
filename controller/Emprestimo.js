import emprestimo from "../model/EmprestimoModel.js";
import livro from "../model/LivroModel.js";
import banco from "../banco.js";
import moment from 'moment';
import pessoa from "../model/PessoaModel.js";

async function emprestar(req, res) {
    //Pegando a data atual
    let hoje = moment().format("YYYY-MM-DD");

    //Calculando a data de vencimento, acrescentando 15 dias na data atual
    let venc = moment().add(15, 'days').format('YYYY-MM-DD');

    //Validar se o livro já está emprestado
    const livroSelecionado = await livro.findByPk(req.body.idlivro);
    if (livroSelecionado.emprestado) {
        res.status(400).json({ "mensagem": "Este livro já está emprestado." });
        return;
    }

    //Iniciando uma transação no banco de dados
    const t = await banco.transaction();

    try {

        //Inserindo emprestimo
        await emprestimo.create({
            emprestimo: hoje,
            vencimento: venc,
            idlivro: req.body.idlivro,
            idpessoa: req.body.idpessoa
        },
            {
                transaction: t
            });

        //Alterando status do livro para emprestado
        await livro.update({
            emprestado: true
        },
            {
                where: { idlivro: req.body.idlivro}
            },
            {
                transaction: t
            });

        //Confirmando a transação no banco de dados
        await t.commit();
        res.json({ "mensagem": "Empréstimo realizado com sucesso." });

    } catch (error) {

        //Desfazendo todas as operações da transação no banco de dados
        await t.rollback();
        res.status(400).json(error);
    }
};

async function devolver(req, res) {
    //Pegando a data atual
    let devolucao = moment().format("YYYY-MM-DD");

    //Validar se o empréstimo já foi devolvido
    const emprestimoSelecionado = await emprestimo.findByPk(req.body.idemprestimo);
    if (emprestimoSelecionado.devolucao != null) {
        res.status(400).json({ "mensagem": "Este empréstimo já foi devolvido." });
        return;
    }

    console.log('>>> rafa');

    //Iniciando uma transação no banco de dados
    const t = await banco.transaction();

    try {

        //Localizar o emprestimo
        const e = await emprestimo.findByPk(req.body.idemprestimo);

        //Pegar o código do livro emprestado
        const idlivro = e.idlivro;

        //Gravando a data de devolução no emprestimo
        await emprestimo.update({
            devolucao: devolucao
        },
            {
                where: { idemprestimo: req.body.idemprestimo }
            },
            {
                transaction: t
            });

        //Alterando status do livro para disponível
        await livro.update({
            emprestado: false
        },
            {
                where: { idlivro: idlivro }
            },
            {
                transaction: t
            });

        //Confirmando a transação no banco de dados
        await t.commit();
        res.json({ "mensagem": "Devolução realizada com sucesso." });

    } catch (error) {
        //Desfazendo todas as operações da transação no banco de dados
        await t.rollback();
        res.status(400).json(error);
    }
};

async function listarpendentes(req, res) {
    const dados = await emprestimo.findAll(
        {
            include: [
                { model: livro, attributes: ['titulo'], as: 'livro'},
                { model: pessoa, attributes: ['pessoa'], as: 'pessoa'},
            ],
            where: { devolucao: null }
    });
    return res.json(dados);
};

async function listarporpessoa(req, res) {
    const dados = await emprestimo.findAll(
        {
            include: [
                { model: livro, attributes: ['titulo'], as: 'livro'},
            ],
            where: { idpessoa: req.params.idpessoa }
    });
    return res.json(dados);
};

export default { emprestar, devolver, listarpendentes, listarporpessoa };