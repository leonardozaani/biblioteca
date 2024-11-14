
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './paginas/Home';
import Autor from './paginas/Autor';
import Menu from './componentes/Menu';
import Categoria from './paginas/Categoria';
import AutorCadastro from './paginas/AutorCadastro';
import CategoriaCadastro from './paginas/CategoriaCadastro';
import Pessoa from './paginas/Pessoa';
import PessoaCadastro from './paginas/PessoaCadastro';
import Editora from './paginas/Editora';
import EditoraCadastro from './paginas/EditoraCadastro';
import LivrosCadastro from './paginas/LivrosCadastro';
import Livro from './paginas/Livros';
import Funcionario from './paginas/Funcionario';
import FuncionarioCadastro from './paginas/FuncionarioCadastro';
import Emprestar from './paginas/Emprestar';
import Devolver from './paginas/Devolver';
import PessoaHistorico from './paginas/PessoaHistorico';


function App() {
  return (
    <div>
      <Menu />
      <div className='container'>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/autores' element={<Autor />} />
            <Route path='/autor' element={<AutorCadastro />} />
            <Route path='/autor/:id' element={<AutorCadastro />} />
            <Route path='/categorias' element={<Categoria />} />
            <Route path='/categoria' element={<CategoriaCadastro />} />
            <Route path='/categoria/:id' element={<CategoriaCadastro />} />
            <Route path='/pessoas' element={<Pessoa />} />
            <Route path='/pessoa' element={<PessoaCadastro />} />
            <Route path='/pessoa/:id' element={<PessoaCadastro />} />
            <Route path='/editoras' element={<Editora />} />
            <Route path='/editora' element={<EditoraCadastro />} />
            <Route path='/editora/:id' element={<EditoraCadastro />} />
            <Route path='/livros' element={<Livro />} />
            <Route path='/livro' element={<LivrosCadastro />} />
            <Route path='/livro/:id' element={<LivrosCadastro />} />
            <Route path='/funcionarios' element={<Funcionario />} />
            <Route path='/funcionario' element={<FuncionarioCadastro />} />
            <Route path='/funcionario/:id' element={<FuncionarioCadastro />} />
            <Route path='/emprestar/:idlivro' element={<Emprestar />} />
            <Route path='/emprestimos-pendentes' element={<Devolver/>} />
            <Route path='/historico/pessoa/:id' element={<PessoaHistorico/>} />
            <Route path='*' element={<Home />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}
export default App;