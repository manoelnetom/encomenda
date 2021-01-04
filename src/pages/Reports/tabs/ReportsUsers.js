import React from "react";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";

import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";

import { useStyles } from "../styles";
import logo from "../../../assets/logo1.png";

export default function AllReports(props) {
  const classes = useStyles();

  function dateNow() {
    const date = new Date(Date.now());
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  }

  return (
    <Container
      maxWidth={false}
      classes={{ root: classes.rootContainer }}
      className={classes.containerBody}
    >
      <div className={classes.tableResults}>
        <Paper variant="outlined" square>
          <Container maxWidth="lg">
            <div className={classes.reportHeader}>
              <img src={logo} alt="logo" />
              <Typography variant="subtitle2">
                {`Data de emissão: ${dateNow()}`}
              </Typography>
            </div>
            <div className={classes.reportTitle}>
              <Typography variant="h3">Relatório de Usuários</Typography>
            </div>
            <br />
            <div style={{ marginTop: 20 }}>
              {/* eslint array-callback-return: "off" */}
              {props.listUsers.map((user, index) => (
                <div key={`${user}${index}`} style={{ margin: 10 }}>
                  <Typography
                    variant="h5"
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    {user.name}
                  </Typography>
                  <Typography variant="subtitle1">
                    {`Quantidade de demandas: ${user.demand_count}`}
                  </Typography>
                  <Typography variant="subtitle1">
                    {`Quantidade de propostas: ${user.proposal_count}`}
                  </Typography>
                  <Typography variant="subtitle1">
                    {`Quantidade de comentários: ${user.comment_count}`}
                  </Typography>
                  <Typography variant="subtitle1">
                    {`Quantidade de curtidas: ${user.like_count}`}
                  </Typography>
                  <Typography variant="subtitle1">
                    {`Pontuação: ${user.score}`}
                  </Typography>

                  <br />
                  <Divider />
                </div>
              ))}
              <div style={{ margin: 10 }}>
                <Typography variant="subtitle1">{`Total de Usuários: ${props.listUsers.length}`}</Typography>
              </div>
            </div>
          </Container>
        </Paper>
      </div>
    </Container>
  );
}
