create table pessoa(
  idpessoa bigserial not null, 
  pessoa varchar(40) not null,
  email varchar(40) not null, 
  telefone varchar(15) not null,	
  constraint pk_pessoa primary key (idpessoa)	
);

create table autor(
  idautor bigserial not null, 
  autor varchar(40) not null,
  constraint pk_autor primary key (idautor)	
);

create table editora(
  ideditora bigserial not null, 
  editora varchar(40) not null,
  constraint pk_editora primary key (ideditora)	
);

create table categoria(
  idcategoria bigserial not null, 
  categoria varchar(40) not null,
  constraint pk_categoria primary key (idcategoria)	
);

create table livro(
  idlivro bigserial not null, 
  titulo varchar(40) not null,
  ano integer not null,
  paginas integer not null,
  edicao integer not null,
  resumo text null,
  emprestado boolean default false,
  idcategoria bigint not null,
  ideditora bigint not null,	
  constraint pk_livro primary key (idlivro),
  constraint fk_livro_categoria foreign key (idcategoria) references categoria(idcategoria),
  constraint fk_livro_editora foreign key (ideditora) references editora(ideditora)	
);

create table livroautor(
  idlivroautor bigserial not null, 
  idlivro bigint not null,
  idautor bigint not null,	
  constraint pk_livroautor primary key (idlivroautor),
  constraint fk_livroautor_livro foreign key (idlivro) references livro(idlivro),
  constraint fk_livroautor_autor foreign key (idautor) references autor(idautor)	
);


create table emprestimo(
  idemprestimo bigserial not null, 
  idlivro bigint not null,
  idpessoa bigint not null,	
  emprestimo date not null default current_date,
  vencimento date not null,
  devolucao date null,	
  constraint pk_emprestimo primary key (idemprestimo),
  constraint fk_emprestimo_livro foreign key (idlivro) references livro(idlivro),
  constraint fk_emprestimo_pessoa foreign key (idpessoa) references pessoa(idpessoa)	
);

ALTER TABLE emprestimo ADD COLUMN atrasado BOOLEAN DEFAULT false; 

SELECT * FROM EMPRESTIMO

UPDATE emprestimo SET vencimento = '2024-02-02' WHERE idemprestimo = 8; 

CREATE OR REPLACE PROCEDURE marcar_emprestimos_em_atraso_com_procedure()
LANGUAGE plpgsql
AS $$
BEGIN
    UPDATE emprestimo
    SET atrasado = true
    WHERE vencimento < CURRENT_DATE AND devolucao > vencimento;
END;
$$;

Call marcar_emprestimos_em_atraso_com_procedure();

ALTER TABLE emprestimo ADD COLUMN atrasado BOOLEAN DEFAULT false; 

update emprestimo set vencimento = '2024-06-10' WHERE idemprestimo = 19;


SELECT 
    e.idemprestimo,
    e.emprestimo AS data_emprestimo,
    e.vencimento AS data_vencimento,
    e.devolucao AS data_devolucao,
    l.titulo AS titulo_livro,
    l.ano AS ano_livro,
    l.paginas AS paginas_livro,
    l.edicao AS edicao_livro,
    p.pessoa AS nome_pessoa,
    p.email AS email_pessoa,
    p.telefone AS telefone_pessoa
FROM 
    emprestimo e
JOIN 
    livro l ON e.idlivro = l.idlivro
JOIN 
    pessoa p ON e.idpessoa = p.idpessoa
ORDER BY 
    e.emprestimo DESC;

CREATE OR REPLACE PROCEDURE marcar_emprestimos_em_atraso_com_procedure1()
LANGUAGE plpgsql
AS $$
BEGIN
    UPDATE emprestimo
    SET atrasado = true
    WHERE vencimento < CURRENT_DATE AND devolucao > vencimento;
END;
$$;

SELECT * FROM EMPRESTIMO

CALL marcar_emprestimos_em_atraso_com_procedure1();