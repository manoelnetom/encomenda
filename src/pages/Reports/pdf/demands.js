import React from "react";

import { Button } from "@material-ui/core";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { useStyles } from "../styles.js";

pdfMake.vfs = pdfFonts.pdfMake.vfs;

function dateNow2() {
  const date = new Date(Date.now());
  return `${date.getDate()}_${date.getMonth() + 1}_${date.getFullYear()}`;
}

function formatDate(data) {
  if (data) {
    const date = new Date(data.substring(0, 19));
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  }
  return "Não Dísponivel";
}

function generatePDF(data, fields) {
  const array = [];
  const msg = "Não Disponivel";
  const emptyMsg = "Não há propostas submetidas nesta demanda!";
  let keywords = "";
  let proponents = "";
  let associates = "";
  let proposalProponents = [];
  const chosenProposalProponents = [];
  /* eslint array-callback-return: "off" */
  data.map((value) => {
    array.push({ text: value.title, style: "demandTitle" });

    fields.map((item) => {
      if (item === "Palavras-Chave") {
        value.keywords.map((key) => {
          keywords += keywords === "" ? `${key.word}` : `, ${key.word}`;
        });
      }
      if (item === "Proponentes") {
        value.proponents.map((prop) => {
          proponents += proponents === "" ? `${prop.name}` : `, ${prop.name}`;
        });
      }

      if (item === "Associados") {
        value.associates.map((prop) => {
          associates += associates === "" ? `${prop.name}` : `, ${prop.name}`;
        });
      }

      if (item === "Criador") {
        array.push({ text: `Criador: ${value.user.name}`, style: "item" });
      }

      if (item === "Data de Criação") {
        array.push({
          text: `Data de criação: ${formatDate(value.creation_date)}`,
          style: "item",
        });
      }
      if (item === "Status") {
        array.push({
          text: `Status: ${value.demand_status.description}`,
          style: "item",
        });
      }
      if (item === "Alcance") {
        array.push({
          text: `Alcance: ${value.demand_scope.description}`,
          style: "item",
        });
      }

      if (item === "Tipo") {
        array.push({
          text: `Tipo: ${value.demand_type.description}`,
          style: "item",
        });
      }
      if (item === "Visibilidade") {
        array.push({
          text: `Visibilidade: ${value.demand_visibility.description}`,
          style: "item",
        });
      }

      if (item === "Descrição") {
        array.push({
          text: `Descrição: ${value.description.trim()}`,
          style: "item",
        });
      }

      if (item === "Problema") {
        array.push({
          text: `Problema: ${value.problem.trim()}`,
          style: "item",
        });
      }

      if (item === "Critérios de Solução") {
        array.push({
          text: `Critérios de Solução: ${
            value.solutions_criteria ? value.solutions_criteria.trim() : msg
          }`,
          style: "item",
        });
      }

      if (item === "Recursos Disponiveis") {
        array.push({
          text: `Recursos Disponiveis: ${
            value.available_resource ? value.available_resource.trim() : msg
          }`,
          style: "item",
        });
      }

      if (item === "Palavras-Chave") {
        array.push({
          text: `Palavras-Chave: ${keywords === "" ? msg : keywords}`,
          style: "item",
        });
      }

      if (item === "Observação") {
        array.push({
          text: `Observação: ${value.observation ? value.observation : msg}`,
          style: "item",
        });
      }

      if (item === "Proponentes") {
        array.push({
          text: `Proponentes: ${proponents === "" ? msg : proponents}`,
          style: "item",
        });
      }

      if (item === "Associados") {
        array.push({
          text: `Associados: ${associates === "" ? msg : associates}`,
          style: "item",
        });
      }

      if (item === "Data inicial para submissão de propostas") {
        array.push({
          text: `Data inicial para submissão de propostas: ${formatDate(
            value.initial_submission_date
          )}`,
          style: "item",
        });
      }

      if (item === "Data final para submissão de propostas") {
        array.push({
          text: `Data final para submissão de propostas: ${formatDate(
            value.final_submission_date
          )}`,
          style: "item",
        });
      }

      if (item === "Visibilidade das Propostas de solução") {
        array.push({
          text: `Visibilidade das propostas de solução: ${value.proposal_visibility.description}`,
          style: "item",
        });
      }

      if (item === "Propostas") {
        if (value.demand_status.description === "Fechada") {
          value.chosen_proposal.proponents.map((prop) =>
            chosenProposalProponents.push(prop.name)
          );
          array.push({ text: " " });
          array.push({ text: "Proposta Selecionada", style: "proposalTitle" });
          array.push({ text: " " });
          array.push({
            text: `Criador: ${value.chosen_proposal.creator.name}`,
            style: "item",
          });

          array.push({
            text: `Data de criação: ${formatDate(
              value.chosen_proposal.creation_date
            )}`,
            style: "item",
          });

          array.push({
            text: `Proponentes: ${chosenProposalProponents.join(", ")}`,
            style: "item",
          });

          array.push({
            text: `Descrição: ${value.chosen_proposal.description.trim()}`,
            style: "item",
          });
          array.push({ text: " " });
        }

        array.push({ text: " " });
        array.push({ text: "Propostas Submetidas", style: "proposalTitle" });
        array.push({ text: " " });

        value.solution_proposals.length === 0
          ? array.push({ text: emptyMsg, style: "item" })
          : value.solution_proposals.map((solution) => {
              solution.proponents.forEach((user, index) => {
                proposalProponents.push(user.name);
              });
              array.push({
                text: `Criador: ${solution.creator.name}`,
                style: "item",
              });

              array.push({
                text: `Data de criação: ${formatDate(solution.creation_date)}`,
                style: "item",
              });

              array.push({
                text: `Proponentes: ${proposalProponents.join(", ")}`,
                style: "item",
              });

              array.push({
                text: `Descrição: ${solution.description.trim()}`,
                style: "item",
              });
              array.push({ text: " " });
              proposalProponents = [];
            });
      }

      if (item === "Quantidade de propostas submetidas") {
        array.push({
          text: `Quantidade de propostas submetidas: ${value.solution_proposals.length}`,
          style: "item",
        });
      }

      if (item === "Quantidade de curtidas") {
        array.push({
          text: `Quantidade de Curtidas: ${value.like_count}`,
          style: "item",
        });
      }

      if (item === "Quantidade de comentários") {
        array.push({
          text: `Quantidade de Comentários: ${value.comment_count}`,
          style: "item",
        });
      }
    });
  });

  return {
    pageSize: "A4",
    info: { title: `vti_rel_demanda-${dateNow2()}` },
    footer: [
      { text: `Quantidade total de demandas: ${data.length}`, style: "footer" },
    ],
    content: [
      {
        image:
          "data:image/png;base64,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",
        width: 150,
        style: "img",
      },
      { text: "Relatório de Demandas", style: "title" },

      array,
    ],
    styles: {
      header: {
        bold: true,
        fontSize: 15,
      },
      title: {
        fontSize: 18,
        bold: true,
        alignment: "center",
        margin: [0, 20, 0, 20],
      },
      img: {
        alignment: "left",
      },
      subTitle: {
        fontSize: 10,
        margin: [10, 5, 10, 5],
        alignment: "left",
      },
      item: {
        margin: [10, 0, 10, 0],
      },
      demandTitle: {
        bold: true,
        fontSize: 15,
        margin: [0, 10, 0, 3],
      },
      footer: {
        fontSize: 10,
        alignment: "left",
        margin: [40, 10, 40, 10],
      },
      proposalTitle: {
        bold: true,
        margin: [10, 0, 10, 0],
      },
    },
    defaultStyle: {
      fontSize: 12,
    },
  };
}

const PdfGenerator = ({ list, fields }) => {
  const classes = useStyles();

  const jspdfGenerator = async () => {
    const pdf = generatePDF(list, fields);
    pdfMake.createPdf(pdf).download(` vti_rel_demanda${dateNow2()}`);
  };

  return (
    <div>
      <Button
        variant="contained"
        className={classes.buttonGerir}
        onClick={jspdfGenerator}
      >
        Exportar PDF
      </Button>
    </div>
  );
};

export default PdfGenerator;
