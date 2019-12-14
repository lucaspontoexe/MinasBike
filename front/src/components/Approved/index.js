import React from 'react';
import './styles.css';
import Button from '../../components/Button';
import iconApproved from '../../assets/icons/approved-signal.svg'

export default function Approved(props) {
    const { children, color, textColor } = props;
    return (
        <div className="fundo">
            <div className="retangulo">
                <img src={iconApproved} className="icone"></img>
                <text className="textOne">{children}</text>
                <text className="text">com sucesso!</text>
                <Button type="submit" color="#30CC57">Fechar</Button>
            </div>
            

        </div>
    );
}
