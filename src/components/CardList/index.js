import React from "react";
import {
  Card,
  CardHeader,
  CardContent,
  Box,
  Divider,
  Typography,
  Avatar,
  IconButton,
  CardActionArea,
} from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { useStyles } from "./style.js";
import history from "../../history";

function CardList({ data, user, title, proposal, proposalID }) {
  const classes = useStyles();

  function handleGoToDetailProposal() {
    history.push(`/propostas/${proposalID}`);
  }

  return (
    <Card variant="outlined" elevation={0} square>
      <CardHeader
        title={title}
        className={classes.header}
        action={
          <IconButton style={{ cursor: "default" }}>
            <MoreVertIcon style={{ color: "transparent" }} />
          </IconButton>
        }
      />
      {proposal ? (
        <CardActionArea onClick={handleGoToDetailProposal}>
          <CardContent>
            {user && (
              <div>
                <Box className={classes.box}>
                  <Avatar src={user.photo_url} />
                  <Typography component="span" className={classes.creatorName}>
                    {user.name}
                  </Typography>
                </Box>
              </div>
            )}

            {proposal ? (
              <Box className={classes.box}>
                <Typography
                  component="span"
                  noWrap
                  className={classes.description}
                >
                  {proposal}
                </Typography>
              </Box>
            ) : (
              ""
            )}

            {data && (
              <>
                {data.map((usersData, index) => (
                  <div key={usersData.username}>
                    {index > 0 && (
                      <>
                        <br />
                        <Divider />
                        <br />
                      </>
                    )}
                    <Box className={classes.box}>
                      <Avatar src={usersData.photo_url} />
                      <Typography
                        component="span"
                        className={classes.creatorName}
                      >
                        {usersData.name}
                      </Typography>
                    </Box>
                  </div>
                ))}
              </>
            )}
          </CardContent>
        </CardActionArea>
      ) : (
        <CardContent>
          {user && (
            <div>
              <Box className={classes.box}>
                <Avatar src={user.photo_url} />
                <Typography component="span" className={classes.creatorName}>
                  {user.name}
                </Typography>
              </Box>
            </div>
          )}

          {proposal ? (
            <Box className={classes.box}>
              <Typography
                component="span"
                noWrap
                className={classes.description}
              >
                {proposal}
              </Typography>
            </Box>
          ) : (
            ""
          )}

          {data && (
            <>
              {data.map((usersData, index) => (
                <div key={usersData.username}>
                  {index > 0 && (
                    <>
                      <br />
                      <Divider />
                      <br />
                    </>
                  )}
                  <Box className={classes.box}>
                    <Avatar src={usersData.photo_url} />
                    <Typography
                      component="span"
                      className={classes.creatorName}
                    >
                      {usersData.name}
                    </Typography>
                  </Box>
                </div>
              ))}
            </>
          )}
        </CardContent>
      )}
    </Card>
  );
}

export default CardList;
