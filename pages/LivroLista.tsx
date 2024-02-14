import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { Menu } from '../componentes/Menu';
import styles from '../styles/Home.module.css';
import { LinhaLivro } from '../componentes/LinhaLivro'; 
import Livro from '../classes/modelo/Livro';

const baseURL = 'http://localhost:3000/api/livros';

const LivroLista: React.FC = () => {
    const [livros, setLivros] = useState<Livro[]>([]);
    const [carregado, setCarregado] = useState<boolean>(false);

    const obter = async () => {
        try {
            const response = await fetch(baseURL);
            const data = await response.json();
            setLivros(data);
            setCarregado(true);
        } catch (error) {
            console.error('Erro ao obter os livros:', error);
        }
    };

    const excluirLivro = async (codigo: number) => {
        try {
            const response = await fetch(`${baseURL}/${codigo}`, { method: 'DELETE' });
            return response.ok;
        } catch (error) {
            console.error('Erro ao excluir o livro:', error);
            return false;
        }
    };

    const excluir = async (codigo: number) => {
        setCarregado(false);
        const sucesso = await excluirLivro(codigo);
        if (sucesso) {
            obter();
        } else {
            setCarregado(true);
        }
    };

    useEffect(() => {
        obter();
    }, []);

    return (
        <div className={styles.container}>
            <Head>
                <title>Lista de Livros</title>
            </Head>
            <Menu />
            <main  className="container">
            <h1 className={styles.title2}>Catálogo de Livros</h1>
                {carregado ? (
                    <table className="table">
                    <thead className="table-dark">
                            <tr>
                                <th>Código</th>
                                <th>Título</th>
                                <th>Editora</th>
                                <th>Autores</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {livros.map(livro => (
                                <LinhaLivro key={livro.codigo} livro={livro} excluir={() => excluir(livro.codigo)} />
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>Carregando...</p>
                )}
            </main>
        </div>
    );
};

export default LivroLista;
