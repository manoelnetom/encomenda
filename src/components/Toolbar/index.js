import React from 'react';
import clsx from 'clsx';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import SearchSharp from '@material-ui/icons/SearchSharp';
import ExitToAppSharpIcon from '@material-ui/icons/ExitToAppSharp';
import { Link } from 'react-router-dom';
import useStyles from './style';
import staticImg from '../../assets/static-profile.svg';
import Avatar from '@material-ui/core/Avatar';
import AccountCircleSharpIcon from '@material-ui/icons/AccountCircleSharp';
import { capitalize } from '../../utils/helpers.js';
import logo1 from '../../assets/logo1.png';
//import logo3 from '../../assets/logo3.png';

/*
Componente Toolbar. Contém o botão do menu, que abre o drawer ao ser clicado, o logo e
o botão que abriará várias opções para o usuário.
Props:
  -variavél open: diz em que estado está o drawer.
  -função para o onClick: muda o estado do open para true, permitindo a exibição do drawer.
  -logo: passa a img q será exibida. OBS: ver a possibilida de colocar fixo, já que mudará nas pages.
  -função onCLick do menu a direita: terá as opções para o usuário. Ex: perfil, logout e etc.
  -função onClose: fecha as opções do usuário mudando o estado do open do menu. Observar no componentes/Layout

OBS: ver a possibilidade de automatizar o MenuItem, pois para cada usuário será diferentes opções.
*/

export default function (props) {
  const classes = useStyles();
  var name = props.name.split(' ');
  var secondName = name.length > 1 ? capitalize(name[name.length - 1]) : "";

  return (
    <>
      <Toolbar className={classes.toolbar}>
        <div className={classes.elementToolbar}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={props.handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: props.open,
            })}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title} noWrap>
            <Link to="/home" className={classes.link}>
              <img className={classes.img} src={logo1} alt="Vitrine Tecnológica" />
            </Link>
          </Typography>
          <div>
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={props.handleMenu}
              color="inherit"
              classes={{ root: classes.rootIconButton }}
            >
              <div className={classes.perfil}>
                <div className={classes.configPerfil}>
                  <span className={classes.name}>{capitalize(name[0]) + " " + capitalize(secondName)}</span>
                  <span className={classes.typePerfil}>{`${props.perfil} | ${props.scope}`}</span>
                </div>
                {props.photo_url === null ?
                  <Avatar src={staticImg} alt="" /> :
                  <Avatar src={props.photo_url} alt="" />
                }
              </div>
            </IconButton>
            <Menu
              id="menu-appbar"
              getContentAnchorEl={null}
              anchorEl={props.anchorEl}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
              }}
              open={props.op}
              onClose={props.handleClose}
              classes={{
                paper: '1rem'
              }}
            >
              <MenuItem onClick={props.goProfile}>
                <div className={classes.perfil}>
                  <AccountCircleSharpIcon />
                Perfil
              </div>
              </MenuItem>

              {props.isAdmin && (
                <MenuItem onClick={props.searchProfile}>
                  <SearchSharp />
                Pesquisar Perfil
                </MenuItem>
              )}
              <MenuItem onClick={props.logout}>
                <ExitToAppSharpIcon />
              Logout
            </MenuItem>

            </Menu>
          </div>
        </div>
      </Toolbar>
    </>
  );
}
