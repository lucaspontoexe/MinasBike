import React from 'react';
import './styles.css';
import Button from '../Button';
import iconApproved from '../../assets/icons/approved-signal.svg';
import iconError from '../../assets/icons/error-signal.svg';

export default function Modal(props) {
    const { children, type, onClose } = props;

    const types = {
        error: {
            image: iconError,
            alt: 'Ícone Erro',
            color: '#DC2438',
            message: (
                <span className="text">
                    Erro
                    <br />
                    {children}
                </span>
            ),
        },
        success: {
            image: iconApproved,
            alt: 'Ícone Aprovado',
            color: '#30CC57',
            message: (
                <span className="text">
                    {children}
                    <br />
                    com sucesso!
                </span>
            ),
        },
    };

    return (
        <div className="fundo">
            <div className="retangulo">
                <img
                    src={types[type].image}
                    alt={types[type].alt}
                    className="icone"
                ></img>

                {types[type].message}

                <Button onClick={onClose} color={types[type].color}>
                    Fechar
                </Button>
            </div>
        </div>
    );
}
