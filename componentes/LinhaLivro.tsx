import React, { useEffect, useState } from 'react';
import ControleEditora from '../classes/controle/ControleEditora'; 
import Livro from '../classes/modelo/Livro'; 

const controleEditora = new ControleEditora();

interface LinhaLivroProps {
    livro: Livro;
    excluir: () => void;
}

export const LinhaLivro: React.FC<LinhaLivroProps> = ({ livro, excluir }) => {
    const [editora, setEditora] = useState<string>('');

    useEffect(() => {
        const carregarNomeEditora = async () => {
            try {
                const nome = await controleEditora.getNomeEditora(livro.codEditora);
                setEditora(nome || ''); 
            } catch (error) {
                console.error('Erro ao carregar nome da editora:', error);
            }
        };

        carregarNomeEditora();

        return () => {}; 
    }, [livro.codEditora]); 

    return (
        <tr>
            <td>{livro.codigo}</td>
            <td>{livro.titulo}</td>
            <td>{editora}</td>
            <td>{livro.autores.join(', ')}</td> 
            <td>
                <button className="btn btn-danger" onClick={excluir}>Excluir</button>
            </td>
        </tr>
    );
};
