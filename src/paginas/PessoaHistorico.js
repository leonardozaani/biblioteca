import { useState, useEffect } from "react";
import TituloListagem from "../componentes/TituloListagem";
import Table from 'react-bootstrap/Table';
import axios from "axios"
import { Link, useNavigate, useParams } from "react-router-dom";

export default function PessoaHistorico() {
    const [dados, setDados] = useState([]);

    const { id } = useParams();

    const listar = async (idpessoa) => {
        const { data } = await axios.get('http://localhost:4000/emprestimo/pessoa/' + idpessoa);
        setDados(data);
    };

    useEffect (() => {
        listar(id);
    }, []);
    
    return (
        <>
            <TituloListagem titulo="Listagem do histórico de livros emprestados da pessoa"
                subtitulo="Neste local você visualiza todos os empréstimos que uma pessoa já fez."
                url=""/>


            <Table>
                <thead>
                    <tr>
                        <th>Código</th>
                        <th>Livro</th>
                        <th>Data Empréstimo</th>
                        <th>Data vencimento</th>
                        <th>Data devolução</th>
                    </tr>
                </thead>
                <tbody>
                    { dados.map((d, i) => (
                        <tr key={i}>
                            <td>{d.idemprestimo}</td>
                            <td>{d.idlivro} - {d.livro.titulo}</td>
                            <td>{d.emprestimo}</td>
                            <td>{d.vencimento}</td>
                            <td>{d.devolucao}</td>
                        </tr>
                    )) }
                </tbody>
            </Table>
        </>
    );
}