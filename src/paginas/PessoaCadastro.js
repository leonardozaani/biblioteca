import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';


export default function PessoaCadastro() {
    //Esta linha pega o id da URL em caso de edição
    const {id} = useParams();
    
    //Esta linha cria um navegador para executar links
    const navigate = useNavigate();

    //Declarar uma variável useState para cada campo da tabela
    const [pessoa, setPessoa] = useState('');
    const [email, setEmail] = useState('');
    const [telefone, setTelefone] = useState('');

    //Volta para a tela de autores
    const voltar = () => {
        navigate('/pessoas')
    }
    
    //Selecionar o registro no banco de daos para editação
    const selecionar = async () => {
        const { data } = await axios.get(`http://localhost:4000/pessoa/${id}`);
        setPessoa(data.pessoa);
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
            "pessoa": pessoa,
            "email": email,
            "telefone": telefone
        };
        await axios.post(`http://localhost:4000/pessoa`, json);
        voltar();
    }

    const alterar = async () => {
        const json = {
            "pessoa": pessoa,
            "email": email,
            "telefone": telefone
        };
        await axios.put(`http://localhost:4000/pessoa/${id}`, json);
        voltar();
    }

    const excluir = async () => {
        if (window.confirm('Deseja excluir agora?')) {
            await axios.delete(`http://localhost:4000/pessoa/${id}`);
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
            <h1>{id ? 'Alterar pessoa' : 'Inserir pessoa'}</h1>

            <h2>{pessoa}</h2>

            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Nome da pessoa</Form.Label>
                    <Form.Control type="text" placeholder="Digite o nome da pessoa" 
                    value={pessoa} 
                    onChange={(e)=>setPessoa(e.target.value)}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="Digite o email" 
                    value={email} 
                    onChange={(e)=>setEmail(e.target.value)}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Telefone</Form.Label>
                    <Form.Control type="tel" placeholder="Digite o telefone" 
                    value={telefone} 
                    onChange={(e)=>setTelefone(e.target.value)}/>
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


  