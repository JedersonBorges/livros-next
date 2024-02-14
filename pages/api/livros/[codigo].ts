import { NextApiRequest, NextApiResponse } from 'next';
import ControleLivros from '../../../classes/controle/ControleLivros';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        if (req.method === 'DELETE') {
            const { codigo } = req.query;
            if (!codigo || typeof codigo !== 'string') {
                res.status(400).json({ error: 'Código do livro inválido' });
                return;
            }
            const controleLivros = new ControleLivros();
            controleLivros.excluir(parseInt(codigo));
            res.status(200).json({ message: 'Livro excluído com sucesso!' });
        } else {
            res.setHeader('Allow', ['DELETE']);
            res.status(405).end(`Method ${req.method} Not Allowed`);
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};
