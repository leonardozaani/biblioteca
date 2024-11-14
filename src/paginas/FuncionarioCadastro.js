import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';


export default function FuncionarioCadastro() {
    //Esta linha pega o id da URL em caso de edição
    const {id} = useParams();
    
    //Esta linha cria um navegador para executar links
    const navigate = useNavigate();

    //Declarar uma variável useState para cada campo da tabela
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    //Volta para a tela de autores
    const voltar = () => {
        navigate('/funcionarios')
    }
    
    //Selecionar o registro no banco de daos para editação
    const selecionar = async () => {
        const { data } = await axios.get(`http://localhost:4000/funcionarios/${id}`);
        setNome(data.nome);
        setEmail(data.email);
        setSenha(data.senha);
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
            "nome": nome,
            "email": email,
            "senha": senha
        };
        await axios.post(`http://localhost:4000/funcionarios`, json);
        voltar();
    }

    const alterar = async () => {
        const json = {
            "nome": nome,
            "email": email,
            "senha": senha
        };
        await axios.put(`http://localhost:4000/funcionarios/${id}`, json);
        voltar();
    }

    const excluir = async () => {
        if (window.confirm('Deseja excluir agora?')) {
            await axios.delete(`http://localhost:4000/funcionarios/${id}`);
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
            <h1>{id ? 'Alterar funcionário' : 'Inserir funcionário'}</h1>

            <h2>{nome}</h2>

            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Nome</Form.Label>
                    <Form.Control type="text" placeholder="Digite o nome do funcionário" 
                    value={nome} 
                    onChange={(e)=>setNome(e.target.value)}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="Digite o email" 
                    value={email} 
                    onChange={(e)=>setEmail(e.target.value)}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Senha</Form.Label>
                    <Form.Control type="password" placeholder="Digite a senha" 
                    value={senha} 
                    onChange={(e)=>setSenha(e.target.value)}/>
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


  