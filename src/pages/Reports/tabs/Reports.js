import React from "react";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";

import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";

import { useStyles } from "../styles";
import logo from "../../../assets/logo1.png";
import ChipLabel from "../../../components/ChipColor";

export default function AllReports(props) {
  const classes = useStyles();
  const msg = "Não disponivel";

  function dateNow() {
    const date = new Date(Date.now());
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  }

  function formatDate(date) {
    const valu = new Date(date.substring(0, 19));

    return `${valu.getDate()}/${valu.getMonth() + 1}/${valu.getFullYear()}`;
  }

  function getProponentsInString(data) {
    const newData = [];

    data.forEach((item) => {
      newData.push(item.name);
    });

    return newData.join(", ");
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
              <Typography variant="h3">Relatório de Demandas</Typography>
            </div>
            <br />
            <div style={{ marginTop: 20 }}>
              {/* eslint array-callback-return: "off" */}
              {props.listDemands.map((demand, index) => (
                <div key={demand.id} style={{ margin: 10 }}>
                  <Typography
                    variant="h5"
                    component={Link}
                    style={{ textDecoration: "none", color: "black" }}
                    to={`/detalhar_demandas/${demand.id}`}
                    target="_blank noopener noreferrer"
                  >
                    {demand.title}
                  </Typography>

                  {props.fields.map((item) => {
                    let component = "";
                    let keywords = "";
                    let proponents = "";
                    let associates = "";
                    const emptyMsg = (field) =>
                      `Esta demanda não possui ${field}.`;

                    if (item === "Palavras-Chave") {
                      demand.keywords.map((key) => {
                        keywords +=
                          keywords === "" ? `${key.word}` : `, ${key.word}`;
                      });
                    }

                    if (item === "Proponentes") {
                      demand.proponents.map((prop) => {
                        proponents +=
                          proponents === "" ? `${prop.name}` : `, ${prop.name}`;
                      });
                    }

                    if (item === "Associados") {
                      demand.associates.map((prop) => {
                        associates +=
                          associates === "" ? `${prop.name}` : `, ${prop.name}`;
                      });
                    }

                    if (item === "Criador") {
                      component = (
                        <Typography
                          key={`${demand.user.name}${index}`}
                          variant="subtitle1"
                        >
                          {`Criador: ${demand.user.name}`}
                        </Typography>
                      );
                    }

                    if (item === "Data de Criação") {
                      component = (
                        <Typography
                          variant="subtitle1"
                          key={`${demand.creation_date}${index}`}
                        >
                          {`Data de criação: ${formatDate(
                            demand.creation_date
                          )}`}
                        </Typography>
                      );
                    }

                    if (item === "Status") {
                      component = (
                        <Typography
                          variant="subtitle1"
                          key={`${demand.demand_status.description}${index}`}
                        >
                          Status:{" "}
                          <ChipLabel
                            description={demand.demand_status.description}
                          />
                        </Typography>
                      );
                    }

                    if (item === "Alcance") {
                      component = (
                        <Typography
                          key={`${demand.demand_scope.description}${index}`}
                          variant="subtitle1"
                        >
                          {`Alcance: ${demand.demand_scope.description}`}
                        </Typography>
                      );
                    }

                    if (item === "Tipo") {
                      component = (
                        <Typography
                          key={`${demand.demand_type.description}${index}`}
                          variant="subtitle1"
                        >
                          {`Tipo: ${demand.demand_type.description}`}
                        </Typography>
                      );
                    }

                    if (item === "Visibilidade") {
                      component = (
                        <Typography
                          key={`${demand.demand_visibility.description}${index}`}
                          variant="subtitle1"
                        >
                          {`Visibilidade: ${demand.demand_visibility.description}`}
                        </Typography>
                      );
                    }

                    if (item === "Descrição") {
                      component = (
                        <Typography
                          key={`${demand.description}${index}`}
                          variant="subtitle1"
                        >
                          {`Descrição: ${demand.description.trim()}`}
                        </Typography>
                      );
                    }

                    if (item === "Problema") {
                      component = (
                        <Typography
                          key={`${demand.problem}${index}`}
                          variant="subtitle1"
                        >
                          {`Problema: ${demand.problem.trim()}`}
                        </Typography>
                      );
                    }

                    if (item === "Critérios de Solução") {
                      component = (
                        <Typography
                          key={`${
                            demand.solutions_criteria
                              ? demand.solutions_criteria.trim()
                              : 1
                          }${index}`}
                          variant="subtitle1"
                        >
                          {`Critérios de Solução:    ${
                            demand.solutions_criteria
                              ? demand.solutions_criteria.trim()
                              : msg
                          }`}
                        </Typography>
                      );
                    }

                    if (item === "Recursos Disponiveis") {
                      component = (
                        <Typography
                          key={`${
                            demand.available_resource
                              ? demand.available_resource.trim()
                              : 2
                          }}${index}`}
                          variant="subtitle1"
                        >
                          {`Recursos Disponiveis: ${
                            demand.available_resource
                              ? demand.available_resource.trim()
                              : msg
                          }`}
                        </Typography>
                      );
                    }

                    if (item === "Palavras-Chave") {
                      component = (
                        <Typography
                          key={`${keywords}${index}`}
                          variant="subtitle1"
                        >
                          {`Palavras-Chave: ${keywords}`}
                        </Typography>
                      );
                    }

                    if (item === "Observação") {
                      component = (
                        <Typography
                          key={`${demand.observation}${index}`}
                          variant="subtitle1"
                        >
                          {`Observação: ${
                            demand.observation ? demand.observation : msg
                          }`}
                        </Typography>
                      );
                    }

                    if (item === "Proponentes") {
                      component = (
                        <Typography
                          key={`${proponents}${index}`}
                          variant="subtitle1"
                        >
                          {`Proponentes: ${
                            proponents === ""
                              ? emptyMsg("Proponentes")
                              : proponents
                          }`}
                        </Typography>
                      );
                    }

                    if (item === "Associados") {
                      component = (
                        <Typography
                          key={`${associates}${index}`}
                          variant="subtitle1"
                        >
                          {`Associados: ${
                            associates === ""
                              ? emptyMsg("Associados")
                              : associates
                          }`}
                        </Typography>
                      );
                    }

                    if (item === "Data inicial para submissão de propostas") {
                      component = (
                        <Typography
                          key={`${demand.initial_submission_date}${index}`}
                          variant="subtitle1"
                        >
                          {`Data inicial para submissão de propostas: ${
                            demand.initial_submission_date
                              ? formatDate(demand.initial_submission_date)
                              : msg
                          }`}
                        </Typography>
                      );
                    }

                    if (item === "Data final para submissão de propostas") {
                      component = (
                        <Typography
                          key={`${demand.final_submission_date}${index}`}
                          variant="subtitle1"
                        >
                          {`Data final para submissão de propostas: ${
                            demand.final_submission_date
                              ? formatDate(demand.final_submission_date)
                              : msg
                          }`}
                        </Typography>
                      );
                    }

                    if (item === "Visibilidade das Propostas de solução") {
                      component = (
                        <Typography
                          key={`${demand.proposal_visibility.description}${index}`}
                          variant="subtitle1"
                        >
                          {`Visibilidade das Propostas de solução: ${demand.proposal_visibility.description}`}
                        </Typography>
                      );
                    }

                    if (item === "Propostas") {
                      component = (
                        <div key={`${demand.proposals.length}${index}`}>
                          {demand.demand_status.description === "Fechada" && (
                            <div>
                              <Typography
                                variant="subtitle1"
                                style={{
                                  fontWeight: "bold",
                                  marginBottom: 10,
                                  marginTop: 10,
                                }}
                              >
                                Proposta Selecionada
                              </Typography>
                              <Typography variant="subtitle1">
                                {`Criador: ${demand.chosen_proposal.creator.name}`}
                              </Typography>
                              <Typography variant="subtitle1">
                                {`Data de criação: ${formatDate(
                                  demand.chosen_proposal.creation_date
                                )}`}
                              </Typography>
                              <Typography variant="subtitle1">
                                {`Proponentes: ${getProponentsInString(
                                  demand.chosen_proposal.proponents
                                )}`}
                              </Typography>
                              <Typography variant="subtitle1">
                                {`Descrição: ${demand.chosen_proposal.description.trim()}`}
                              </Typography>
                            </div>
                          )}
                          <br />
                          <Typography
                            variant="subtitle1"
                            style={{
                              fontWeight: "bold",
                              marginBottom: 10,
                              marginTop: 10,
                            }}
                          >
                            Propostas
                          </Typography>
                          {demand.solution_proposals.length !== 0 ? (
                            <>
                              {demand.solution_proposals.map((prop) => (
                                <div key={prop.id}>
                                  <Typography variant="subtitle1">
                                    {`Criador: ${prop.creator.name}`}
                                  </Typography>
                                  <Typography variant="subtitle1">
                                    {`Data de criação: ${formatDate(
                                      prop.creation_date
                                    )}`}
                                  </Typography>
                                  <Typography variant="subtitle1">
                                    {`Proponentes: ${getProponentsInString(
                                      prop.proponents
                                    )}`}
                                  </Typography>
                                  <Typography variant="subtitle1">
                                    {`Descrição: ${prop.description.trim()}`}
                                  </Typography>
                                </div>
                              ))}
                            </>
                          ) : (
                            <Typography variant="subtitle1">
                              Não há propostas submetidas nesta demanda.
                            </Typography>
                          )}
                        </div>
                      );
                    }

                    if (item === "Quantidade de propostas submetidas") {
                      component = (
                        <Typography
                          key={`${demand.proposals.length}${index}`}
                          variant="subtitle1"
                        >
                          {`Quantidade de propostas submetidas: ${demand.proposals.length}`}
                        </Typography>
                      );
                    }

                    if (item === "Quantidade de curtidas") {
                      component = (
                        <Typography key={item} variant="subtitle1">
                          {`Quantidade de curtidas: ${demand.like_count}`}
                        </Typography>
                      );
                    }

                    if (item === "Quantidade de comentários") {
                      component = (
                        <Typography key={item} variant="subtitle1">
                          {`Quantidade de comentários: ${demand.comment_count}`}
                        </Typography>
                      );
                    }
                    return component;
                  })}
                  <br />
                  <Divider />
                </div>
              ))}
              <div style={{ margin: 10 }}>
                <Typography variant="subtitle1">{`Total de demandas: ${props.listDemands.length}`}</Typography>
              </div>
            </div>
          </Container>
        </Paper>
      </div>
    </Container>
  );
}
