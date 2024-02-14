import React from 'react';
import Link from 'next/link';

export const Menu: React.FC = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <Link href="/" passHref>
                    <span className="navbar-brand">Home</span>
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link href="/LivroLista" passHref>
                                <span className="nav-link">Catálogo</span>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link href="LivroDados" passHref>
                                <span className="nav-link">Novo</span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};
