import React from 'react';
import {
  Collapse,
  Divider,
  Button,
  TextField,
  IconButton,
  Avatar,
} from '@material-ui/core';
import { ThumbUpAlt, ModeComment } from '@material-ui/icons';
import useStyles from './styles';

/*
    Componente do comentário utilizado na demanda e proposta
*/

export default function Comment(props) {
  const classes = useStyles();

  return (
    <>
      <>
        <div className={classes.likeComment}>
          <div className={classes.iconButtonComment}>
            <IconButton classes={{ root: classes.rootIconButton }} onClick={props.changeLike}>
              <ThumbUpAlt
                className={props.has_liked ? classes.like : ""}
              />
            </IconButton>
                        +{props.like_count}
          </div>
          <div className={classes.iconButtonComment}>
            <IconButton
              classes={{ root: classes.rootIconButton }}
              onClick={props.changeComment}>
              <ModeComment />
            </IconButton>
                        +{props.comments}
          </div>
        </div>
        <div className={classes.collapseComments}>
          <Collapse className={classes.collapse} classes={{ wrapper: classes.wrapper }} in={props.stateComment}>
            <Divider />
            <div className={classes.comments}>
              <div className={classes.fieldsComments}>
                <TextField
                  fullWidth
                  variant="outlined"
                  name="comments"
                  type="text"
                  label="Digite seu comentário"
                  value={props.value}
                  onChange={props.handleChangeComment}
                />
                <Button variant="contained" className={classes.buttonComment} onClick={props.clickComment} disableElevation component="span">
                  Comentar
                        </Button>
              </div>
              <Divider />
              {props.list.length === 0 ? null
                : props.list.map((comment, i) => (
                  <div key={i} className={classes.listComments}>
                    <div className={classes.commentsUser}>
                      <div className={classes.commentUser}>
                        <Avatar className={classes.commentAvatar} src={comment.creator.photo_url !== null ? comment.creator.photo_url : props.staticImg} />
                        <p className={classes.userNameComments}>{comment.creator.name}</p>
                      </div>
                      <div className={classes.coment}>
                        <p>{comment.description}</p>
                        <div className={classes.characteristicComment}>
                          <div className={classes.commentsLike}>
                            <IconButton classes={{ root: classes.iconButtonRootCommentsLike }} onClick={(event) => props.changeLikeComment(comment)}>
                              <ThumbUpAlt className={comment.has_liked ? classes.like : ''} />
                            </IconButton>
                                                +
                                                {comment.like_count}
                          </div>
                          <div className={classes.commentsData}>
                            {props.formatDate(comment.creation_date)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </Collapse>
        </div>
      </>

    </>
  );
}
