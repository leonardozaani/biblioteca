import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';


export default function EditoraCadastro() {
    //Esta linha pega o id da URL em caso de edição
    const {id} = useParams();
    
    //Esta linha cria um navegador para executar links
    const navigate = useNavigate();

    //Declarar uma variável useState para cada campo da tabela
    const [editora, setEditora] = useState('');

    //Volta para a tela de editoras
    const voltar = () => {
        navigate('/editoras')
    }
    
    //Selecionar o registro no banco de daos para editação
    const selecionar = async () => {
        const { data } = await axios.get(`http://localhost:4000/editora/${id}`);
        setEditora(data.editora);
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
            "editora": editora
        };
        await axios.post(`http://localhost:4000/editora`, json);
        voltar();
    }

    const alterar = async () => {
        const json = {
            "editora": editora
        };
        await axios.put(`http://localhost:4000/editora/${id}`, json);
        voltar();
    }

    const excluir = async () => {
        if (window.confirm('Deseja excluir agora?')) {
            try {
                await axios.delete(`http://localhost:4000/editora/${id}`);
                voltar();
            } catch (error) {
                if (error.response) {
                    // O servidor respondeu com um status diferente de 2xx
                    console.error('Erro na resposta do servidor:', error.response.status);
                    console.error('Dados do erro:', error.response.data);
                    alert(`Erro: ${error.response.data.message || 'Erro ao excluir a editora'}`);
                } else if (error.request) {
                    // A solicitação foi feita, mas nenhuma resposta foi recebida
                    console.error('Nenhuma resposta recebida:', error.request);
                    alert('Erro: Nenhuma resposta do servidor.');
                } else {
                    // Algo aconteceu na configuração da solicitação que desencadeou um erro
                    console.error('Erro na configuração da solicitação:', error.message);
                    alert(`Erro: ${error.message}`);
                }
            }
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
            <h1>{id ? 'Alterar editora' : 'Inserir editora'}</h1>

            <h2>{editora}</h2>

            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Nome da editora</Form.Label>
                    <Form.Control type="text" placeholder="Digite o nome da editora" 
                    value={editora} 
                    onChange={(e)=>setEditora(e.target.value)}/>
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


  