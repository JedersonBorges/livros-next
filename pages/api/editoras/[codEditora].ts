import { NextApiRequest, NextApiResponse } from 'next';
import ControleEditora from '../../../classes/controle/ControleEditora';

const controleEditora = new ControleEditora();

export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        if (req.method === 'GET') {
            const { codEditora } = req.query;
            if (!codEditora || typeof codEditora !== 'string') {
                res.status(400).json({ error: 'Parameter codEditora must be provided as a string' });
                return;
            }
            const nomeEditora = await controleEditora.getNomeEditora(parseInt(codEditora));
            res.status(200).json({ nome: nomeEditora });
        } else {
            res.setHeader('Allow', ['GET']);
            res.status(405).end(`Method ${req.method} Not Allowed`);
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};
