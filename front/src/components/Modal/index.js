import React from 'react';
import './styles.css';
import Button from '../Button';
import iconApproved from 'assets/icons/approved-signal.svg';
import iconError from 'assets/icons/error-signal.svg';
import tempIcon from 'assets/icons/add_files.svg';

export default function Modal(props) {
  const { children, type, onClose, onConfirm } = props;

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
    confirmation: {
      image: tempIcon,
      alt: 'temporário',
      color: '#cc5730',
      message: (
        <>
          <span className="text">Tem certeza?</span>
          {/* talvez esse botão fique junto ao outro */}
          <Button onClick={onConfirm}>Confirmar</Button>
        </>
      ),
    },
    loading: {
      image: tempIcon,
      alt: 'temporário',
      color: '#cc5730',
      message: 'carregando...',
    }
  };

  return (
    <div className="fundo">
      <div className="retangulo">
        <img src={types[type].image} alt={types[type].alt} className="icone"></img>

        {types[type].message}

        <Button onClick={onClose} color={types[type].color}>
          Fechar
        </Button>
      </div>
    </div>
  );
}
