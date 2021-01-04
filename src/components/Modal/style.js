import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  modal: {
    maxWidth: "100vw",
    maxHeight: "98vh",
    height: "auto",
    backgroundColor: "transparent",
    marginTop: '0.8rem',
    with: "auto",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  tableContainer: {
    maxHeight: "75vh",
  },

  table: {
    overflowX: "scroll",
    overflowY: "hidden",
  },
  rootTableParent: {
    display: 'inline-table'
  },
  tableRow: {
    cursor: "pointer",
  },
  tableCell: {
    width: "170px",
    color: "white",
    background: "#122230",
    fontSize: "16px",
  },

  img: {
    width: "40px",
    height: "40px",
    marginRight: "5px",
  },

  tableCellName: {
    display: "flex",
    justifyContent: "start",
    alignItems: "center",
  },
  rootContainer: {
    paddingLeft: '0.5rem',
    paddingRight: '0.5rem',
    paddingTop: '0.5rem',
  },
  rootTable: {
    display: 'contents'
  }
});

export default useStyles;
