import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';


export default function LivrosCadastro() {
    //Esta linha pega o id da URL em caso de edição
    const {id} = useParams();
    
    //Esta linha cria um navegador para executar links
    const navigate = useNavigate();

    //Declarar uma variável useState para cada campo da tabela
    const [titulo, setTitulo] = useState('');
    const [ano, setAno] = useState('');
    const [paginas, setPaginas] = useState('');
    const [edicao, setEdicao] = useState('');
    const [resumo, setResumo] = useState('');
    const [idcategoria, setIdcatergoria] = useState('');
    const [ideditora, setIdeditora] = useState('');

    //Volta para a tela de livros
    const voltar = () => {
        navigate('/livros')
    }
    
    //Selecionar o registro no banco de daos para editação
    const selecionar = async () => {
        const { data } = await axios.get(`http://localhost:4000/livro/${id}`);
        setTitulo(data.titulo);
        setAno(data.ano);
        setPaginas(data.paginas);
        setEdicao(data.edicao);
        setResumo(data.resumo);
        setIdcatergoria(data.idcategoria);
        setIdeditora(data.ideditora);
    }

    //Método que verifica qual ação deve ser executada
    const salvar = () => {
        if (id)
            alterar();
        else
            inserir();
    }

    const inserir = async () => {
        const json = {
            "titulo": titulo,
            "ano": ano,
            "paginas": paginas,
            "edicao": edicao,
            "resumo": resumo,
            "idcategoria": idcategoria,
            "ideditora": ideditora
        };
        await axios.post(`http://localhost:4000/livro`, json);
        voltar();
    }

    const alterar = async () => {
        const json = {
            "titulo": titulo,
            "ano": ano,
            "paginas": paginas,
            "edicao": edicao,
            "resumo": resumo,
            "idcategoria": idcategoria,
            "ideditora": ideditora
        };
        await axios.put(`http://localhost:4000/livro/${id}`, json);
        voltar();
    }

    const excluir = async () => {
        if (window.confirm('Deseja excluir agora?')) {
            await axios.delete(`http://localhost:4000/livro/${id}`);
            voltar();
        }
    }

    //Inicia a tela buscando o registro em caso de edição
    useEffect( () => {
        if (id)
            selecionar();
    }, [] );

    return (
        <>
            <style>
                {`
                    .custom-margin {
                        margin-right: 10px;
                    }
                    .custom-margin:last-of-type {
                        margin-right: 0;
                    }
                `}
            </style>
            <h1>{id ? 'Alterar livro' : 'Inserir livro'}</h1>

            <h2>{titulo}</h2>

            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Nome do livro</Form.Label>
                    <Form.Control type="text" placeholder="Digite o nome do livro" 
                    value={titulo} 
                    onChange={(e)=>setTitulo(e.target.value)}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Ano</Form.Label>
                    <Form.Control type="text" placeholder="Digite o ano do livro" 
                    value={ano} 
                    onChange={(e)=>setAno(e.target.value)}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Número de páginas</Form.Label>
                    <Form.Control type="text" placeholder="Digite o número de páginas do livro" 
                    value={paginas} 
                    onChange={(e)=>setPaginas(e.target.value)}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Edição</Form.Label>
                    <Form.Control type="text" placeholder="Digite a edição do livro" 
                    value={edicao} 
                    onChange={(e)=>setEdicao(e.target.value)}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formResumo">
                    <Form.Label>Resumo</Form.Label>
                    <Form.Control as="textarea" placeholder="Digite o resumo do livro" 
                    value={resumo} 
                    onChange={(e)=>setResumo(e.target.value)}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Categoria</Form.Label>
                    <Form.Control type="number" 
                    value={idcategoria} 
                    onChange={(e)=>setIdcatergoria(e.target.value)}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Editora</Form.Label>
                    <Form.Control type="number" 
                    value={ideditora} 
                    onChange={(e)=>setIdeditora(e.target.value)}/>
                </Form.Group>

                <Button className="custom-margin" variant="success" type="button" 
                onClick={() => salvar()}>
                    Salvar
                </Button>
                <Button className="custom-margin" variant="secondary" type="button" onClick={() => voltar()}>
                    Cancelar
                </Button>
                <Button className="custom-margin" variant="danger" type="button" 
                hidden={!id}
                onClick={() => excluir()}>
                    Excluir
                </Button>
            </Form>
        </> 
    );
}


  