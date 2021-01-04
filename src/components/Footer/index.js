import React from 'react';
import './styles.css';
import Link from '@material-ui/core/Link'
import logoIfba from '../../assets/logo_ifba.png'
import logoGsort from '../../assets/gsort.png';

export default function () {
    return (
        <footer>
            <div className="app-footer">
                <div className="logos">
                    <a href="http://gsort.ifba.edu.br">
                        <img className="img" src={logoGsort} alt="" />
                    </a>
                    <a href="https://portal.ifba.edu.br/">
                        <img className="img" src={logoIfba} alt="" />
                    </a>
                </div>
                <span className="span">
                    &copy;2020. Desenvolvido por
                    {" "}
                    <Link color="primary" underline="none" href="http://gsort.ifba.edu.br">
                        <strong>GSORT</strong>.
                    </Link>
                </span>
            </div>
        </footer>
    );
}