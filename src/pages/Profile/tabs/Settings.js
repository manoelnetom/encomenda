import React, { useState, useEffect } from 'react';
import {
    Container,
    Card,
    AppBar,
    Toolbar,
    CardContent,
    Typography,
    Grid,
    Button,
    LinearProgress
} from "@material-ui/core";
import useStyles from '../styles';
import Question from '../Questions';
import userService from '../../../service/userService';
import MessageAlert from '../../../components/MessageAlert';
import debounce from 'lodash.debounce';

/*
Componente referente a tab de settings
*/

const valuesIntials = [
    { name: "", description: "", kind: "" },
    { name: "", description: "", kind: "" },
    { name: "", description: "", kind: "" },
    { name: "", description: "", kind: "" },
    { name: "", description: "", kind: "" },
    { name: "", description: "", kind: "" },
]

//guarda os status iniciais dos switches
const valuesSwitch = {
    notifica_noticias: false,
    notifica_projetos_destaque: false,
    notifica_associado: false,
    notifica_demanda_liberada: false,
    notifica_demanda_fechada: false,
    notifica_proponente_demanda: false,
}

export default function (props) {
    const classes = useStyles();
    //guarda o array modificado
    const [settings, setSettings] = useState([]);
    //service do user
    const { stateToken, handleMessageAlert, getSettings, updateSetting } = userService();
    //usada no componente para trabalhar os estados do switch separadamente
    const [stateSwitch, setStateSwitch] = useState(valuesSwitch);

    useEffect(() => {
        async function getData() {
            return await getSettings();
        }
        //carrega e trata os dados que vem do bd
        getData().then((response) => {
            var data = response.data;
            var keysSwitch = Object.keys(valuesSwitch);
            for (let i = 0; i < data.length; i++) {
                var keys = Object.keys(data[i]);
                var values = Object.values(data[i]);
                var bool = values[0] === "true" ? true : false;
                if (keys[0] === keysSwitch[i]) {
                    valuesSwitch[keys[0]] = bool;
                }
                valuesIntials[i].name= keys[0];
                valuesIntials[i].description = values[1];
                valuesIntials[i].kind = values[2];
            }
            setSettings(valuesIntials);
        });
        // eslint-disable-next-line
    }, [])

    //muda o status do switch. Há o debounce que gera um delay ao mostrar a resposta, permanecendo a última
    //caso o usuário clique várias vezes
    const handleSwitch=debounce (async (value, checked) =>{
        var setting_value = checked ? "true": "false";
        const response=await updateSetting(value, setting_value);
        if(response!== undefined){
            if(response.status === 200){
                setStateSwitch({ ...stateSwitch, [value]: checked });
            }
        }
    },500);

    return (

        <Container
            maxWidth={false}
            classes={{ root: classes.rootContainerSettings }}
            className={classes.box}
        >
            <Card className={classes.card}>
                <AppBar
                    position="static"
                    elevation={0}
                    className={classes.cardAppBar}
                >
                    <Toolbar className={classes.cardAppBar}>
                        <Typography variant="body1" color="inherit">
                            Marque os campos abaixo
                        </Typography>
                    </Toolbar>
                </AppBar>
                <CardContent>
                    {settings.length === 0 ?
                        <LinearProgress/>
                    :
                        <Grid container spacing={3}>
                            <Question
                                question={settings[0].description}
                                kind={settings[0].kind}
                                checked={stateSwitch.notifica_noticias}
                                name="notifica_noticias"
                                onChange={(e)=>handleSwitch(e.target.name, e.target.checked)}
                            />

                            <Question
                                question={settings[1].description}
                                kind={settings[1].kind}
                                checked={stateSwitch.notifica_projetos_destaque}
                                name="notifica_projetos_destaque"
                                onChange={(e)=>handleSwitch(e.target.name, e.target.checked)}
                            />
                            <Question
                                question={settings[2].description}
                                kind={settings[2].kind}
                                checked={stateSwitch.notifica_associado}
                                name="notifica_associado"
                                onChange={(e)=>handleSwitch(e.target.name, e.target.checked)}
                            />
                            <Question
                                question={settings[3].description}
                                kind={settings[3].kind}
                                checked={stateSwitch.notifica_demanda_liberada}
                                name="notifica_demanda_liberada"
                                onChange={(e)=>handleSwitch(e.target.name, e.target.checked)}
                            />
                            <Question
                                question={settings[4].description}
                                kind={settings[4].kind}
                                checked={stateSwitch.notifica_demanda_fechada}
                                name="notifica_demanda_fechada"
                                onChange={(e)=>handleSwitch(e.target.name, e.target.checked)}
                            />
                            <Question
                                question={settings[5].description}
                                kind={settings[5].kind}
                                checked={stateSwitch.notifica_proponente_demanda}
                                name="notifica_proponente_demanda"
                                onChange={(e)=>handleSwitch(e.target.name, e.target.checked)}
                            />
                        </Grid>
                    }
                    <br />
                </CardContent>
            </Card>
            {stateToken &&
                <MessageAlert
                    warning
                    message={process.env.REACT_APP_MSG_TOKEN_EXPIRATION}
                    onCancel={handleMessageAlert}
                    buttons={
                        <>
                            <Button
                                variant="contained"
                                className={classes.buttonGerir}
                                onClick={handleMessageAlert}
                            >
                                Ok
                            </Button>
                        </>
                    }
                />
            }
        </Container>
    );
}