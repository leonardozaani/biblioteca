import autor from './AutorModel.js';
import categoria from './CategoriaModel.js';
import editora from './EditoraModel.js';
import emprestimo from './EmprestimoModel.js';
import livro from './LivroModel.js';
import livroautor from './LivroAutorModel.js';
import pessoa from './PessoaModel.js';

categoria.hasMany(livro, {foreignKey:'idcategoria'});
livro.belongsTo(categoria, {as: 'categoria', foreignKey: 'idcategoria'});

editora.hasMany(livro, {foreignKey:'ideditora'});
livro.belongsTo(editora, {as: 'editora', foreignKey: 'ideditora'});

livro.hasMany(emprestimo, {foreignKey:'idlivro'});
emprestimo.belongsTo(livro, {as: 'livro', foreignKey: 'idlivro'});

pessoa.hasMany(emprestimo, {foreignKey:'idpessoa'});
emprestimo.belongsTo(pessoa, {as: 'pessoa', foreignKey: 'idpessoa'});

livroautor.belongsTo(autor, {as: 'autor', foreignKey: 'idautor'});
livroautor.belongsTo(livro, {as: 'livro', foreignKey: 'idlivro'});

