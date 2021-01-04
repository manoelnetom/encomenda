import React from "react";
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  CardHeader,
} from "@material-ui/core";
import QueryBuilderIcon from "@material-ui/icons/QueryBuilder";
import PersonIcon from "@material-ui/icons/Person";
import { Link } from "react-router-dom";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { localFormatDate } from "../../utils/helpers";
import useStyles from "./style.js";
import ToolTip from "../ToolTip/index";

function NoticeCard({
  notice,
  wrap,
  isAdmin,
  isDetail,
  handleUpdate,
  handleDelete,
}) {
  const classes = useStyles();
  return (
    <Card
      key={notice.id}
      square
      variant="outlined"
      elevation={0}
      className={classes.card}
    >
      {isDetail && (
        <CardHeader
          title={notice.title}
          className={classes.cardHeader}
          action={
            <>
              <IconButton style={{ color: "transparent", cursor: "default" }}>
                <EditIcon />
              </IconButton>
              {isAdmin && (
                <>
                  <ToolTip position="top" title="Editar">
                    <span>
                      <IconButton
                        style={{ color: "#f5f5f5" }}
                        onClick={handleUpdate}
                      >
                        <EditIcon />
                      </IconButton>
                    </span>
                  </ToolTip>
                  <ToolTip position="top" title="Apagar">
                    <span>
                      <IconButton
                        style={{ color: "#f5f5f5" }}
                        onClick={handleDelete}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </span>
                  </ToolTip>
                </>
              )}
            </>
          }
        />
      )}
      <CardContent>
        {isDetail ? (
          ""
        ) : (
          <div className={classes.creatorData}>
            <Typography variant="h5" align="left" className={classes.cardTitle}>
              {notice.title}
            </Typography>
          </div>
        )}

        <div className={classes.box}>
          <div className={classes.creatorData}>
            <Typography variant="subtitle1" color="textSecondary" align="left">
              <PersonIcon color="disabled" />
            </Typography>
            <Typography
              variant="subtitle1"
              color="textSecondary"
              align="left"
              style={{
                marginLeft: 2,
                color: "#122230",
                fontWeight: "bold",
              }}
            >
              {notice.creator.name}
            </Typography>
          </div>
          <div className={classes.timeData}>
            <Typography variant="subtitle1" color="textSecondary" align="left">
              <QueryBuilderIcon color="disabled" />
            </Typography>
            <Typography
              variant="subtitle1"
              align="left"
              style={{ marginLeft: 2 }}
            >
              {localFormatDate(notice.creation_date.substring(0, 19))}
            </Typography>
          </div>
        </div>
      </CardContent>

      <CardContent>
        <Typography variant="h5" noWrap={wrap}>
          {notice.description}
        </Typography>
        {wrap && (
          <Typography component={Link} to={`/notice/${notice.id}`}>
            Ver mais
          </Typography>
        )}
      </CardContent>
    </Card>
  );
}

export default NoticeCard;
