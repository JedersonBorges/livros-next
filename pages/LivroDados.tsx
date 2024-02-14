import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { Menu } from '../componentes/Menu';
import styles from '../styles/Home.module.css';
import ControleEditora from '../classes/controle/ControleEditora';
import Livro from '../classes/modelo/Livro';

const controleEditora = new ControleEditora();
const baseURL = 'http://localhost:3000/api/livros';

const LivroDados: React.FC = () => {
    const [titulo, setTitulo] = useState<string>('');
    const [resumo, setResumo] = useState<string>('');
    const [autores, setAutores] = useState<string>('');
    const [codEditora, setCodEditora] = useState<number>(0);
    const [opcoes, setOpcoes] = useState<{ value: number; text: string }[]>(controleEditora.getEditoras().map(editora => ({ value: editora.codEditora, text: editora.nome })));
    const navigate = useRouter().push;

    const tratarCombo = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setCodEditora(Number(event.target.value));
    };

    const incluir = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const novoLivro = new Livro(0, codEditora, titulo, resumo, autores.split('\n'));
        try {
            const response = await fetch(baseURL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(novoLivro)
            });
            if (response.ok) {
                navigate('/livroLista');
            } else {
                console.error('Falha ao incluir o livro.');
            }
        } catch (error) {
            console.error('Erro ao tentar incluir o livro:', error);
        }
    };

    return (
        <div className={styles.container}>
            <Head>
                <title>Loja Next - Dados do Livro</title>
            </Head>
            <Menu />
            <main className="container mt-4">
    <h1 className={styles.title2}>Dados do Livro</h1>
      <form onSubmit={incluir}>
        <div className="mb-3">
          <label htmlFor="titulo" className="form-label">Título</label>
          <input type="text" className="form-control" id="titulo" value={titulo} onChange={e => setTitulo(e.target.value)} />
        </div>
        <div className="mb-3">
          <label htmlFor="resumo" className="form-label">Resumo</label>
          <textarea className="form-control" id="resumo" value={resumo} onChange={e => setResumo(e.target.value)} />
        </div>
        <div className="mb-3">
          <label htmlFor="autores" className="form-label">Autores (1 por linha)</label>
          <textarea className="form-control" id="autores" value={autores} onChange={e => setAutores(e.target.value)} />
        </div>
        <div className="mb-3">
          <label htmlFor="editora" className="form-label">Editora</label>
          <select className="form-select" id="editora" value={codEditora} onChange={tratarCombo}>
            {opcoes.map(opcao => (
              <option key={opcao.value} value={opcao.value}>{opcao.text}</option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn btn-primary">Salvar Dados</button>
      </form>
    </main>
        </div>
    );
};

export default LivroDados;
