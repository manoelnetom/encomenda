import React, { useState } from 'react';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import { useStyles, StyledTableSortLabel } from '../styles';
import ChipLabel from '../../../components/ChipColor';

//Cabeçalho da tabela
const titleHeads = [
    { id: 0, title: 'Status' },
    { id: 1, title: 'Título' },
    { id: 2, title: 'Descrição' },
    { id: 3, title: 'Palavras-Chave' },
    { id: 4, title: 'Propostas até' },
    { id: 5, title: '#Propostas' },
    { id: 6, title: '#Likes' },
    { id: 7, title: '#Comentários' }
];

//data crescente
function dateCompareAsc(a, b) {
    return new Date(a.final_submission_date) - new Date(b.final_submission_date);
}

//data decrescente
function dateCompareDesc(a, b) {
    return new Date(b.final_submission_date) - new Date(a.final_submission_date);
}

//função que compara todas as colunas
function stableSort(array, orderBy, order) {
    var stabilizedThis = array;
    switch (order) {
        case 'asc':
            orderBy === 0 && stabilizedThis.sort((a, b) => a.demand_status.description.localeCompare(b.demand_status.description));
            orderBy === 1 && stabilizedThis.sort((a, b) => a.title.localeCompare(b.title));
            orderBy === 2 && stabilizedThis.sort((a, b) => a.description.localeCompare(b.description));
            orderBy === 3 && stabilizedThis.sort((a, b) => a.keywords[0].word.localeCompare(b.keywords[0].word));
            orderBy === 4 && stabilizedThis.sort(dateCompareAsc);
            orderBy === 5 && stabilizedThis.sort((a, b) => (a.proposals.length - b.proposals.length));
            orderBy === 6 && stabilizedThis.sort((a, b) => (a.like_count - b.like_count));
            orderBy === 7 && stabilizedThis.sort((a, b) => (a.comments.length - b.comments.length));
            break;
        case 'desc':
            orderBy === 0 && stabilizedThis.sort((b, a) => a.demand_status.description.localeCompare(b.demand_status.description));
            orderBy === 1 && stabilizedThis.sort((b, a) => a.title.localeCompare(b.title));
            orderBy === 2 && stabilizedThis.sort((b, a) => a.description.localeCompare(b.description));
            orderBy === 3 && stabilizedThis.sort((b, a) => a.keywords[0].word.localeCompare(b.keywords[0].word));
            orderBy === 4 && stabilizedThis.sort(dateCompareDesc);
            orderBy === 5 && stabilizedThis.sort((b, a) => (a.proposals.length - b.proposals.length));
            orderBy === 6 && stabilizedThis.sort((b, a) => (a.like_count - b.like_count));
            orderBy === 7 && stabilizedThis.sort((b, a) => (a.comments.length - b.comments.length));
            break;
        default:
            break;

    }
    return stabilizedThis;
}

//componente head da tabela
function EnhancedTableHead(props) {
    const { order, orderBy, onRequestSort } = props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                {titleHeads.map((headCell) => (
                    <TableCell
                        classes={{ stickyHeader: props.stickyHeader }}
                        key={headCell.id}
                        align='left'
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <StyledTableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.title}
                        </StyledTableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}


/* 
    Componente para preencher as tabelas referente a escolha da tab.
*/

export default function AllDemands(props) {
    const classes = useStyles();
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState(1);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    function changePage(event, newPage) {
        setPage(newPage);
    }

    function changeRowsPerPage(event) {
        setRowsPerPage(+event.target.value);
        setPage(0);
    }

    //formata a data
    function formatDate(date) {
        var value = new Date(date);
        return value.getDate() + "/" + (value.getMonth() + 1) + "/" + value.getFullYear();
    }

    function handleRequestSort(event, property) {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    }

    return (
        <Container maxWidth={false} classes={{ root: classes.rootContainer }} className={classes.containerBody}>
            <div className={classes.tableResults}>
                <Paper>
                    <TableContainer className={classes.tableContainer}>
                        <Table stickyHeader aria-label="sticky table">
                            <EnhancedTableHead
                                order={order}
                                orderBy={orderBy}
                                onRequestSort={handleRequestSort}
                                visuallyHidden={classes.visuallyHidden}
                                stickyHeader={classes.stickyHeader}
                            />
                            <TableBody>
                                {stableSort(props.listDemands, orderBy, order)
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((demand, i) => {
                                        return (
                                            <TableRow key={i} className={classes.tableRow} hover onClick={event => props.click(demand)} >

                                                <TableCell>
                                                    <ChipLabel
                                                        description={demand.demand_status.description}
                                                    />
                                                </TableCell>

                                                <TableCell>{demand.title}</TableCell>
                                                <TableCell>
                                                    <div className={classes.limitWidthText}>{demand.description}</div>
                                                </TableCell>
                                                <TableCell>
                                                    {demand.keywords.map((key) => {
                                                        return key.word;
                                                    }).join(', ')}
                                                </TableCell>
                                                <TableCell>{formatDate(demand.final_submission_date)}</TableCell>
                                                <TableCell>
                                                    {demand.proposal_visibility.description === 'Privadas'
                                                        ? "Indisponível" :
                                                        demand.proposal_count}
                                                </TableCell>
                                                <TableCell>{demand.like_count}</TableCell>
                                                <TableCell>{demand.comment_count}</TableCell>
                                            </TableRow>
                                        )
                                    })
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        labelRowsPerPage="Linhas por página"
                        rowsPerPageOptions={[10, 25, 100]}
                        component="div"
                        count={props.demands}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onChangePage={changePage}
                        onChangeRowsPerPage={changeRowsPerPage}
                    />
                </Paper>
            </div>
        </Container>
    );
}

