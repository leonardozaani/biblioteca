import { useState, useEffect } from "react";
import TituloListagem from "../componentes/TituloListagem";
import Table from 'react-bootstrap/Table';
import axios from "axios"
import { Link } from "react-router-dom";

export default function Pessoa() {
    const [dados, setDados] = useState([]);

    const listar = async () => {
        const { data } = await axios.get('http://localhost:4000/pessoa');
        setDados(data);
    };

    useEffect (() => {
        listar();
    }, []);
    
    return (
        <>
            <TituloListagem titulo="Listagem de pessoas"
                subtitulo="Neste local você gerencia todos as pessoas da biblioteca."
                url="/pessoa"/>


            <Table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>#</th>
                        <th>Código</th>
                        <th>Pessoa</th>
                        <th>email</th>
                        <th>telefone</th>
                    </tr>
                </thead>
                <tbody>
                    { dados.map((d, i) => (
                        <tr key={i}>
                            <td>
                                <Link to={'/pessoa/' + d.idpessoa}
                                className="btn btn-primary">Alterar</Link>
                            </td>
                            <td>
                                <Link to={'/historico/pessoa/' + d.idpessoa}
                                className="btn btn-primary">Histórico</Link>
                            </td>
                            <td>{d.idpessoa}</td>
                            <td>{d.pessoa}</td>
                            <td>{d.email}</td>
                            <td>{d.telefone}</td>
                        </tr>
                    )) }
                </tbody>
            </Table>
        </>
    );
}