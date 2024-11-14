import { useState, useEffect } from "react";
import TituloListagem from "../componentes/TituloListagem";
import Table from 'react-bootstrap/Table';
import axios from "axios"
import { Link } from "react-router-dom";

export default function Funcionario() {
    const [dados, setDados] = useState([]);

    const listar = async () => {
        const { data } = await axios.get('http://localhost:4000/funcionarios');
        setDados(data);
    };

    useEffect (() => {
        listar();
    }, []);
    
    return (
        <>
            <TituloListagem titulo="Listagem de funcionários"
                subtitulo="Neste local você gerencia todos os funcionários da biblioteca."
                url="/funcionario"/>


            <Table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Código</th>
                        <th>Nome</th>
                        <th>Email</th>
                        <th>Senha</th>
                    </tr>
                </thead>
                <tbody>
                    { dados.map((d, i) => (
                        <tr key={i}>
                            <td>
                                <Link to={'/funcionario/' + d.idfuncionario}
                                className="btn btn-primary">Alterar</Link>
                            </td>
                            <td>{d.idpessoa}</td>
                            <td>{d.nome}</td>
                            <td>{d.email}</td>
                            <td>{d.senha}</td>
                        </tr>
                    )) }
                </tbody>
            </Table>
        </>
    );
}