import React, { createRef } from "react";
import { Typography, Container } from "@material-ui/core";
import useStyles from "./style.js";
import notFoundIcon from "../../assets/404.svg";
import Page from "../../components/Page/index";

function NotFound() {
  const classes = useStyles();
  const ref = createRef();
  return (
    <Page title="Página não encontrada" ref={ref} className={classes.root}>
      <Container maxWidth="lg" className={classes.container}>
        <img src={notFoundIcon} alt="icon" className={classes.img} />
        <Typography variant="h6" className={classes.title}>
          Ops, não foi possivel encontrar a página pesquisada!
        </Typography>
      </Container>
    </Page>
  );
}

export default NotFound;
