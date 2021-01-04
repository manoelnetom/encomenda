import React from 'react';
import {
    Avatar,
    Table,
    TableContainer,
    TableRow,
    TableCell,
    TableBody,
    Checkbox,
    TableHead,
    Typography
} from "@material-ui/core";
import useStyles from '../style';


// Cabeçalho da tabela
const titleHeads = [
    {
        id: 0,
        title: "Nome",
    },
    {
        id: 1,
        title: "Usuário",
    },
];

export default function (props) {
    const classes = useStyles();

    return (
        <>
            <TableContainer className={classes.tableContainer}>
                <Table classes={{ root: classes.rootTableParent }} stickyHeader className={classes.table}>
                    <TableHead classes={{ root: classes.rootTable }}>
                        <TableRow className={classes.tableHead}>
                            {titleHeads.map((column) => (
                                <TableCell
                                    key={column.id}
                                    aling="left"
                                    className={classes.tableCell}
                                >
                                    {column.title}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody classes={{ root: classes.rootTable }}>
                        {props.usersSeach.map((userData, index) => (
                            <TableRow role="checkbox" hover key={index}>
                                <TableCell aling="left">
                                    <div className={classes.tableCellName}>
                                        <Checkbox
                                            onChange={() => {
                                                props.handleAddParticipants(userData);
                                            }}
                                            disabled={props.existisInParticipants(
                                                userData.username
                                            )}
                                        />
                                        <Avatar
                                            src={userData.photo}
                                            alt=""
                                            className={classes.img}
                                            disabled={props.existisInParticipants(
                                                userData.username
                                            )}
                                        />
                                        <Typography>{userData.name}</Typography>
                                    </div>
                                </TableCell>
                                <TableCell aling="left">
                                    {userData.username}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}