import React from 'react';
import './styles.css';
import Button from '../../components/Button';
import iconApproved from '../../assets/icons/approved-signal.svg';

export default function Approved(props) {
    const { children, onClose } = props;
    return (
        <div className="fundo">
            <div className="retangulo">
                <img src={iconApproved} alt="Ícone Aprovado" className="icone"></img>
                <span className="textOne">{children}</span>
                <span className="text">com sucesso!</span>
                <Button onClick={onClose} color="#30CC57">
                    Fechar
                </Button>
            </div>
        </div>
    );
}
