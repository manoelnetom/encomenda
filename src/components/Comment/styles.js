import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  iconButtonRootCommentsLike: {
    padding: 0,
    paddingRight: "0.4rem",
  },
  like: {
    color: "#3498db",
  },
  collapseComments: {
    display: "flex",
    padding: "0.5rem 0.5rem",
    width: "100%",
  },
  collapse: {
    display: "flex",
    flex: "1",
    width: "100%",
  },
  wrapper: {
    flex: "1",
  },
  comments: {
    display: "flex",
    // padding: '16px 16px',
    flexDirection: "column",
    width: "100%",
    paddingTop: "1rem",
  },
  fieldsComments: {
    flex: "1",
    display: "flex",
    paddingBottom: "1rem",
    width: "100%",
    // marginBottom: '15px',
    flexDirection: "column",
    alignItems: "flex-start",
  },
  buttonComment: {
    background: "#122230",
    color: "#fff",
    transition: "0.5s",
    marginTop: "0.5rem",
    "&:hover": {
      backgroundColor: "#547591",
    },
  },
  listComments: {
    display: "flex",
    paddingTop: "16px",
  },
  commentsUser: {
    display: "flex",
    // paddingTop: '16px',
    flexDirection: "column",
    flex: "1",
  },
  commentUser: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    flex: "1",
  },
  commentAvatar: {
    width: "30px",
    height: "30px",
    marginRight: "10px",
  },
  userNameComments: {
    fontWeight: "500",
  },
  coment: {
    marginLeft: "2.5rem",
    display: "flex",
    flexDirection: "column",
    flex: "1",
  },
  characteristicComment: {
    display: "flex",
    flexDirection: "row",
    flex: "1",
    marginTop: "5px",
    flexWrap: "wrap",
    alignItems: "center",
  },
  commentsLike: {
    display: "flex",
    alignItems: "center",
    marginRight: "10px",
  },
  commentsData: {
    marginLeft: "5px",
    marginRight: "5px",
    color: "gray",
    fontStyle: "italic",
  },
  likeComment: {
    display: "flex",
    padding: "0.5rem 0.5rem",
    width: "100%",
    paddingTop: "1.5rem",
  },
  iconButtonComment: {
    display: "flex",
    alignItems: "center",
    paddingRight: "1.2rem",
  },
  rootIconButton: {
    padding: 0,
    paddingRight: "0.4rem",
  },
}));

export default useStyles;
