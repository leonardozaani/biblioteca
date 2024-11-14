import { useState, useEffect } from "react";
import TituloListagem from "../componentes/TituloListagem";
import Table from 'react-bootstrap/Table';
import axios from "axios"
import Button from "react-bootstrap/esm/Button";

export default function Devolver() {
    const [dados, setDados] = useState([]);

    const listar = async () => {
        const { data } = await axios.get('http://localhost:4000/emprestimo/pendentes');
        setDados(data);
    };

    useEffect (() => {
        listar();
    }, []);
    
    const devolver = async (idemprestimo) => {
        if (window.confirm('Deseja devolver agora?')) {
            const json = {
                "idemprestimo": idemprestimo
            };
            await axios.put(`http://localhost:4000/devolver`, json);
            listar();
        }
    }

    return (
        <>
            <TituloListagem titulo="Listagem de empréstimos pendentes"
                subtitulo="Neste local você visualiza todos os empréstimos pendentes de devolução."
                url=""/>


            <Table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Código</th>
                        <th>Livro</th>
                        <th>Pessoa</th>
                        <th>Data Empréstimo</th>
                        <th>Data Vencimento</th>
                    </tr>
                </thead>
                <tbody>
                    { dados.map((d, i) => (
                        <tr key={i}>
                            <td>
                                <Button onClick={() => devolver(d.idemprestimo)}
                                className="btn btn-primary">Devolver</Button>
                            </td>
                            <td>{d.idemprestimo}</td>
                            <td>{d.idlivro} - {d.livro.titulo}</td>
                            <td>{d.idpessoa} - {d.pessoa.pessoa}</td>
                            <td>{d.emprestimo}</td>
                            <td>{d.vencimento}</td>
                        </tr>
                    )) }
                </tbody>
            </Table>
        </>
    );
}