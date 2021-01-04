import React, { useContext, useState, useEffect } from "react";
import {
  Grid,
  Card,
  CardContent,
  CardHeader,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  Tabs,
  Tab,
  TableRow,
  Container,
  Link,
  Avatar,
} from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";
import Page from "../../components/Page/index";
import useStyles from "./styles";
import { Context } from "../../contexts/authContext/AuthContext";
import TabPanel from "../../components/TabPanel";
import { capitalize } from "../../utils/helpers";
import Footer from "../../components/Footer";
import { getAdminStatistics } from "../../service/statistics";
import history from "../../history";

const model = {
  total_users: 0,
  total_demands: 0,
  total_proposals: 0,
  demands_per_status: {},
  proposals_per_visibility: {},
  demands_ranking: [],
  proposals_ranking: [],
  users_ranking: [],
  newest_demands_per_status: [],
  newest_news: [],
  newest_featured_projects: [],
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

export default function Home() {
  const classes = useStyles();

  const { user, isAdmin } = useContext(Context);

  // Muda valores das Tabs de Demandas
  const [value, setValue] = useState(0);

  // Muda valores das Tabs de Propostas de solução
  const [valueSolutions, setValueSolutions] = useState(0);

  const [statsData, setStatsData] = useState(model);

  // Altera a tab atual de Demandas
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // Altera a tab atual de Propostas de solução
  const handleChangeSolutions = (event, newValue) => {
    setValueSolutions(newValue);
  };

  useEffect(() => {
    async function load() {
      const data = await getAdminStatistics();

      if (data.worked) {
        setStatsData(data.project);
      }
    }

    load();
  }, []);

  function handleGoToDetail(id) {
    history.push(`/detalhar_demandas/${id}`);
  }

  function formatDate(date) {
    const valu = new Date(date.substring(0, 19));

    return `${valu.getDate()}/${valu.getMonth() + 1}/${valu.getFullYear()}`;
  }

  return (
    <Page title="Home" className={classes.root}>
      {isAdmin ? (
        <>
          <header className={classes.header}>
            <Container maxWidth={false} className={classes.container}>
              <Typography variant="h5">
                Bem Vindo(a),
                <br />
                {capitalize(user.name.split(" ")[0])}
              </Typography>
            </Container>
          </header>

          <Container maxWidth={false}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={4} lg={4}>
                <Container maxWidth="lg">
                  <Card variant="outlined" className={classes.card}>
                    <CardHeader
                      className={classes.cardHeader}
                      title="Total de Usuários"
                      titleTypographyProps={{ align: "center" }}
                    />

                    <CardContent>
                      <Container maxWidth="lg">
                        <Typography variant="h2" className={classes.color}>
                          {statsData ? statsData.total_users : ""}
                        </Typography>
                      </Container>
                    </CardContent>
                  </Card>
                </Container>
              </Grid>
              <Grid item xs={12} md={4} lg={4}>
                <Container maxWidth="lg">
                  <Card variant="outlined" className={classes.card}>
                    <CardHeader
                      className={classes.cardHeader}
                      title="Total de Demandas"
                      titleTypographyProps={{ align: "center" }}
                    />

                    <CardContent>
                      <Container maxWidth="lg">
                        <Typography variant="h2" className={classes.color}>
                          {statsData ? statsData.total_demands : ""}
                        </Typography>
                      </Container>
                    </CardContent>
                  </Card>
                </Container>
              </Grid>
              <Grid item xs={12} md={4} lg={4}>
                <Container maxWidth="lg">
                  <Card variant="outlined" className={classes.card}>
                    <CardHeader
                      className={classes.cardHeader}
                      title="Total de Propostas de Solução"
                      titleTypographyProps={{ align: "center" }}
                    />

                    <CardContent>
                      <Container maxWidth="lg">
                        <Typography variant="h2" className={classes.color}>
                          {statsData ? statsData.total_proposals : ""}
                        </Typography>
                      </Container>
                    </CardContent>
                  </Card>
                </Container>
              </Grid>
              <Grid item xs={12} md={7} lg={8}>
                <Container maxWidth="lg">
                  <Card variant="outlined" className={classes.cardRanking}>
                    <CardHeader
                      className={classes.cardHeader}
                      title="Demandas"
                      titleTypographyProps={{ align: "center" }}
                    />

                    <Tabs
                      value={value}
                      onChange={handleChange}
                      classes={{
                        indicator: classes.tabsIndicator,
                      }}
                      className={classes.tabsText}
                      scrollButtons="auto"
                      variant="scrollable"
                    >
                      <Tab label="Submetida" {...a11yProps(0)} />
                      <Tab label="Liberada" {...a11yProps(1)} />
                      <Tab label="Fechada" {...a11yProps(2)} />
                      <Tab label="Cancelada" {...a11yProps(3)} />
                    </Tabs>

                    <TabPanel value={value} index={0}>
                      <CardContent>
                        <TableContainer>
                          <Table className={classes.table}>
                            <TableBody>
                              {statsData.newest_demands_per_status
                                .submetida && (
                                <>
                                  {statsData.newest_demands_per_status.submetida.map(
                                    (demand, index) => (
                                      <TableRow
                                        hover
                                        key={demand.id}
                                        style={{ cursor: "pointer" }}
                                        onClick={() => {
                                          handleGoToDetail(demand.id);
                                        }}
                                      >
                                        <TableCell align="left">
                                          <Typography>
                                            {demand.title}
                                          </Typography>
                                          <Typography variant="caption" noWrap>
                                            {demand.description}
                                          </Typography>
                                          <br />
                                          <Typography variant="caption">
                                            {formatDate(demand.creation_date)}
                                          </Typography>
                                        </TableCell>
                                      </TableRow>
                                    )
                                  )}
                                </>
                              )}
                            </TableBody>
                          </Table>
                        </TableContainer>
                      </CardContent>
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                      <CardContent>
                        <TableContainer>
                          <Table className={classes.table}>
                            <TableBody>
                              {statsData.newest_demands_per_status.liberada && (
                                <>
                                  {statsData.newest_demands_per_status.liberada.map(
                                    (demand, index) => (
                                      <TableRow
                                        hover
                                        key={demand.id}
                                        style={{ cursor: "pointer" }}
                                        onClick={() => {
                                          handleGoToDetail(demand.id);
                                        }}
                                      >
                                        <TableCell align="left">
                                          <Typography>
                                            {demand.title}
                                          </Typography>
                                          <Typography variant="caption" noWrap>
                                            {demand.description}
                                          </Typography>
                                          <br />
                                          <Typography variant="caption">
                                            {formatDate(demand.creation_date)}
                                          </Typography>
                                        </TableCell>
                                      </TableRow>
                                    )
                                  )}
                                </>
                              )}
                            </TableBody>
                          </Table>
                        </TableContainer>
                      </CardContent>
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                      <CardContent>
                        <TableContainer>
                          <Table className={classes.table}>
                            <TableBody>
                              {statsData.newest_demands_per_status.fechada && (
                                <>
                                  {statsData.newest_demands_per_status.fechada.map(
                                    (demand, index) => (
                                      <TableRow
                                        hover
                                        key={demand.id}
                                        style={{ cursor: "pointer" }}
                                        onClick={() => {
                                          handleGoToDetail(demand.id);
                                        }}
                                      >
                                        <TableCell align="left">
                                          <Typography>
                                            {demand.title}
                                          </Typography>
                                          <Typography variant="caption" noWrap>
                                            {demand.description}
                                          </Typography>
                                          <br />
                                          <Typography variant="caption">
                                            {formatDate(demand.creation_date)}
                                          </Typography>
                                        </TableCell>
                                      </TableRow>
                                    )
                                  )}
                                </>
                              )}
                            </TableBody>
                          </Table>
                        </TableContainer>
                      </CardContent>
                    </TabPanel>
                    <TabPanel value={value} index={3}>
                      <CardContent>
                        <TableContainer>
                          <Table className={classes.table}>
                            <TableBody>
                              {statsData.newest_demands_per_status
                                .cancelada && (
                                <>
                                  {statsData.newest_demands_per_status.cancelada.map(
                                    (demand, index) => (
                                      <TableRow
                                        hover
                                        key={demand.id}
                                        style={{ cursor: "pointer" }}
                                        onClick={() => {
                                          handleGoToDetail(demand.id);
                                        }}
                                      >
                                        <TableCell align="left">
                                          <Typography>
                                            {demand.title}
                                          </Typography>
                                          <Typography variant="caption" noWrap>
                                            {demand.description}
                                          </Typography>
                                          <br />
                                          <Typography variant="caption">
                                            {formatDate(demand.creation_date)}
                                          </Typography>
                                        </TableCell>
                                      </TableRow>
                                    )
                                  )}
                                </>
                              )}
                            </TableBody>
                          </Table>
                        </TableContainer>
                      </CardContent>
                    </TabPanel>
                  </Card>
                </Container>
              </Grid>
              <Grid item xs={12} md={5} lg={4}>
                <Container maxWidth="lg">
                  <Card variant="outlined" className={classes.cardRanking}>
                    <CardHeader
                      className={classes.cardHeader}
                      title="Ranking de Demandas"
                      titleTypographyProps={{ align: "center" }}
                    />

                    <CardContent>
                      <TableContainer>
                        <Table className={classes.table}>
                          <TableBody>
                            {statsData.demands_ranking.map((demand, index) => (
                              <TableRow
                                style={{ cursor: "pointer" }}
                                hover
                                key={demand.id}
                                onClick={() => {
                                  handleGoToDetail(demand.id);
                                }}
                              >
                                {index < 5 && (
                                  <>
                                    <TableCell align="center">
                                      {index + 1}º
                                    </TableCell>
                                    <TableCell align="center">
                                      {demand.title}
                                    </TableCell>
                                  </>
                                )}
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </CardContent>
                  </Card>
                </Container>
              </Grid>
              <Grid item xs={12} md={7} lg={8}>
                <Container maxWidth="lg">
                  <Card variant="outlined" className={classes.cardRanking}>
                    <CardHeader
                      className={classes.cardHeader}
                      title="Status "
                      titleTypographyProps={{ align: "center" }}
                    />
                    <Tabs
                      value={valueSolutions}
                      onChange={handleChangeSolutions}
                      classes={{
                        indicator: classes.tabsIndicator,
                      }}
                      className={classes.tabsText}
                      variant="fullWidth"
                    >
                      <Tab label="Demandas" {...a11yProps(0)} />
                      <Tab label="Propostas" {...a11yProps(1)} />
                    </Tabs>
                    <TabPanel value={valueSolutions} index={0}>
                      <CardContent>
                        <TableContainer>
                          <Table className={classes.table}>
                            <TableBody>
                              <TableRow hover>
                                <TableCell align="left">
                                  <Typography>
                                    {`Em Edição: ${statsData.demands_per_status.em_edicao}`}
                                  </Typography>
                                </TableCell>
                              </TableRow>
                              <TableRow hover>
                                <TableCell align="left">
                                  <Typography>
                                    {`Submetidas: ${statsData.demands_per_status.submetida}`}
                                  </Typography>
                                </TableCell>
                              </TableRow>
                              <TableRow hover>
                                <TableCell align="left">
                                  <Typography>
                                    {`Liberadas: ${statsData.demands_per_status.liberada}`}
                                  </Typography>
                                </TableCell>
                              </TableRow>
                              <TableRow hover>
                                <TableCell align="left">
                                  <Typography>
                                    {`Fechadas ${statsData.demands_per_status.fechada}`}
                                  </Typography>
                                </TableCell>
                              </TableRow>
                              <TableRow hover>
                                <TableCell align="left">
                                  <Typography>
                                    {`Canceladas ${statsData.demands_per_status.cancelada}`}
                                  </Typography>
                                </TableCell>
                              </TableRow>
                            </TableBody>
                          </Table>
                        </TableContainer>
                      </CardContent>
                    </TabPanel>
                    <TabPanel value={valueSolutions} index={1}>
                      <CardContent>
                        <TableContainer>
                          <Table className={classes.table}>
                            <TableBody>
                              <TableRow hover>
                                <TableCell align="left">
                                  <Typography>
                                    {`Públicas ${statsData.proposals_per_visibility.publicas}`}
                                  </Typography>
                                </TableCell>
                              </TableRow>
                              <TableRow hover>
                                <TableCell align="left">
                                  <Typography>
                                    {`Privadas ${statsData.proposals_per_visibility.privadas}`}
                                  </Typography>
                                </TableCell>
                              </TableRow>
                            </TableBody>
                          </Table>
                        </TableContainer>
                      </CardContent>
                    </TabPanel>
                  </Card>
                </Container>
              </Grid>
              <Grid item xs={12} md={5} lg={4}>
                <Container maxWidth="lg">
                  <Card variant="outlined" className={classes.cardRanking}>
                    <CardHeader
                      className={classes.cardHeader}
                      title="Ranking de usuários"
                      titleTypographyProps={{ align: "center" }}
                    />

                    <CardContent>
                      <TableContainer>
                        <Table className={classes.table}>
                          <TableBody>
                            {statsData.users_ranking.map((userData, index) => (
                              <TableRow hover key={userData.username}>
                                {index < 5 && (
                                  <>
                                    <TableCell align="center">
                                      {index + 1}º
                                    </TableCell>
                                    <TableCell align="right">
                                      <Avatar
                                        src={
                                          userData.photo_url
                                            ? userData.photo_url
                                            : "data:image/png;base64,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"
                                        }
                                        className={classes.avatar}
                                        alt="static image"
                                      />
                                    </TableCell>
                                    <TableCell align="left">
                                      {userData.name}
                                    </TableCell>
                                  </>
                                )}
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </CardContent>
                  </Card>
                </Container>
              </Grid>
              <Grid item xs={12} md={6} lg={6}>
                <Container maxWidth="lg">
                  <Card variant="outlined" className={classes.cardRanking}>
                    <CardHeader
                      className={classes.cardHeader}
                      title="Projetos em destaque"
                      titleTypographyProps={{ align: "center" }}
                    />
                    <CardContent>
                      <TableContainer>
                        <Table className={classes.table}>
                          <TableBody>
                            {statsData.newest_featured_projects.map(
                              (project, index) => (
                                <TableRow
                                  hover
                                  key={project.id}
                                  style={{ cursor: "pointer" }}
                                >
                                  {index < 5 && (
                                    <>
                                      <TableCell align="left">
                                        <Typography>{project.title}</Typography>
                                        <Typography
                                          color="textSecondary"
                                          variant="h5"
                                        >
                                          {project.description}
                                        </Typography>
                                        <Link
                                          component={RouterLink}
                                          to={`/project/${project.id}`}
                                        >
                                          Ver mais
                                        </Link>{" "}
                                      </TableCell>
                                    </>
                                  )}
                                </TableRow>
                              )
                            )}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </CardContent>
                  </Card>
                </Container>
              </Grid>
              <Grid item xs={12} md={6} lg={6}>
                <Card variant="outlined" className={classes.cardRanking}>
                  <CardHeader
                    className={classes.cardHeader}
                    title="Notícias"
                    titleTypographyProps={{ align: "center" }}
                  />
                  <CardContent>
                    <TableContainer>
                      <Table>
                        <TableBody>
                          {statsData.newest_news.map((data, index) => (
                            <TableRow
                              hover
                              key={data.id}
                              className={classes.row}
                            >
                              <TableCell align="left">
                                <Typography>{data.title}</Typography>
                                <Typography color="textSecondary" variant="h5">
                                  {data.description}
                                </Typography>
                                <Link
                                  component={RouterLink}
                                  to={`/notice/${data.id}`}
                                >
                                  Ver mais
                                </Link>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Container>
        </>
      ) : (
        <>
          <header className={classes.header}>
            <Container maxWidth={false} className={classes.container}>
              <Typography variant="h5">
                {" "}
                Bem Vindo(a),
                <br />
                {capitalize(user.name.split(" ")[0])}
              </Typography>
            </Container>
          </header>
          <Container maxWidth={false}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={4} lg={4}>
                <Container maxWidth="lg">
                  <Card variant="outlined" className={classes.card}>
                    <CardHeader
                      className={classes.cardHeader}
                      title="Total de Usuários"
                      titleTypographyProps={{ align: "center" }}
                    />

                    <CardContent>
                      <Container maxWidth="lg">
                        <Typography variant="h2" className={classes.color}>
                          {statsData ? statsData.total_users : ""}
                        </Typography>
                      </Container>
                    </CardContent>
                  </Card>
                </Container>
              </Grid>
              <Grid item xs={12} md={4} lg={4}>
                <Container maxWidth="lg">
                  <Card variant="outlined" className={classes.card}>
                    <CardHeader
                      className={classes.cardHeader}
                      title="Total de Demandas"
                      titleTypographyProps={{ align: "center" }}
                    />

                    <CardContent>
                      <Container maxWidth="lg">
                        <Typography variant="h2" className={classes.color}>
                          {statsData ? statsData.total_demands : ""}
                        </Typography>
                      </Container>
                    </CardContent>
                  </Card>
                </Container>
              </Grid>
              <Grid item xs={12} md={4} lg={4}>
                <Container maxWidth="lg">
                  <Card variant="outlined" className={classes.card}>
                    <CardHeader
                      className={classes.cardHeader}
                      title="Total de Propostas de Solução"
                      titleTypographyProps={{ align: "center" }}
                    />

                    <CardContent>
                      <Container maxWidth="lg">
                        <Typography variant="h2" className={classes.color}>
                          {statsData ? statsData.total_proposals : ""}
                        </Typography>
                      </Container>
                    </CardContent>
                  </Card>
                </Container>
              </Grid>
              <Grid item xs={12} md={7} lg={8}>
                <Container maxWidth="lg">
                  <Card variant="outlined" className={classes.cardRanking}>
                    <CardHeader
                      className={classes.cardHeader}
                      title="Demandas"
                      titleTypographyProps={{ align: "center" }}
                    />

                    <Tabs
                      value={value}
                      onChange={handleChange}
                      classes={{
                        indicator: classes.tabsIndicator,
                      }}
                      className={classes.tabsText}
                      scrollButtons="auto"
                      variant="scrollable"
                    >
                      <Tab label="Em Edição" {...a11yProps(0)} />
                      <Tab label="Liberada" {...a11yProps(1)} />
                      <Tab label="Fechada" {...a11yProps(2)} />
                      <Tab label="Cancelada" {...a11yProps(3)} />
                    </Tabs>
                    <TabPanel value={value} index={0}>
                      <CardContent>
                        <TableContainer>
                          <Table className={classes.table}>
                            <TableBody>
                              {statsData.newest_demands_per_status
                                .em_edicao && (
                                <>
                                  {statsData.newest_demands_per_status.em_edicao.map(
                                    (demand, index) => (
                                      <TableRow
                                        hover
                                        key={demand.id}
                                        style={{ cursor: "pointer" }}
                                        onClick={() => {
                                          handleGoToDetail(demand.id);
                                        }}
                                      >
                                        <TableCell align="left">
                                          <Typography>
                                            {demand.title}
                                          </Typography>
                                          <Typography variant="caption" noWrap>
                                            {demand.description}
                                          </Typography>
                                          <br />
                                          <Typography variant="caption">
                                            {formatDate(demand.creation_date)}
                                          </Typography>
                                        </TableCell>
                                      </TableRow>
                                    )
                                  )}
                                </>
                              )}
                            </TableBody>
                          </Table>
                        </TableContainer>
                      </CardContent>
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                      <CardContent>
                        <TableContainer>
                          <Table className={classes.table}>
                            <TableBody>
                              {statsData.newest_demands_per_status.liberada && (
                                <>
                                  {statsData.newest_demands_per_status.liberada.map(
                                    (demand, index) => (
                                      <TableRow
                                        hover
                                        key={demand.id}
                                        style={{ cursor: "pointer" }}
                                        onClick={() => {
                                          handleGoToDetail(demand.id);
                                        }}
                                      >
                                        <TableCell align="left">
                                          <Typography>
                                            {demand.title}
                                          </Typography>
                                          <Typography variant="caption" noWrap>
                                            {demand.description}
                                          </Typography>
                                          <br />
                                          <Typography variant="caption">
                                            {formatDate(demand.creation_date)}
                                          </Typography>
                                        </TableCell>
                                      </TableRow>
                                    )
                                  )}
                                </>
                              )}
                            </TableBody>
                          </Table>
                        </TableContainer>
                      </CardContent>
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                      <CardContent>
                        <TableContainer>
                          <Table className={classes.table}>
                            <TableBody>
                              {statsData.newest_demands_per_status.fechada && (
                                <>
                                  {statsData.newest_demands_per_status.fechada.map(
                                    (demand, index) => (
                                      <TableRow
                                        hover
                                        key={demand.id}
                                        style={{ cursor: "pointer" }}
                                        onClick={() => {
                                          handleGoToDetail(demand.id);
                                        }}
                                      >
                                        <TableCell align="left">
                                          <Typography>
                                            {demand.title}
                                          </Typography>
                                          <Typography variant="caption" noWrap>
                                            {demand.description}
                                          </Typography>
                                          <br />
                                          <Typography variant="caption">
                                            {formatDate(demand.creation_date)}
                                          </Typography>
                                        </TableCell>
                                      </TableRow>
                                    )
                                  )}
                                </>
                              )}
                            </TableBody>
                          </Table>
                        </TableContainer>
                      </CardContent>
                    </TabPanel>
                    <TabPanel value={value} index={3}>
                      <CardContent>
                        <TableContainer>
                          <Table className={classes.table}>
                            <TableBody>
                              {statsData.newest_demands_per_status
                                .cancelada && (
                                <>
                                  {statsData.newest_demands_per_status.cancelada.map(
                                    (demand, index) => (
                                      <TableRow
                                        hover
                                        key={demand.id}
                                        style={{ cursor: "pointer" }}
                                        onClick={() => {
                                          handleGoToDetail(demand.id);
                                        }}
                                      >
                                        <TableCell align="left">
                                          <Typography>
                                            {demand.title}
                                          </Typography>
                                          <Typography variant="caption" noWrap>
                                            {demand.description}
                                          </Typography>
                                          <br />
                                          <Typography variant="caption">
                                            {formatDate(demand.creation_date)}
                                          </Typography>
                                        </TableCell>
                                      </TableRow>
                                    )
                                  )}
                                </>
                              )}
                            </TableBody>
                          </Table>
                        </TableContainer>
                      </CardContent>
                    </TabPanel>
                  </Card>
                </Container>
              </Grid>

              <Grid item xs={12} md={5} lg={4}>
                <Container maxWidth="lg">
                  <Card variant="outlined" className={classes.cardRanking}>
                    <CardHeader
                      className={classes.cardHeader}
                      title="Ranking de usuários"
                      titleTypographyProps={{ align: "center" }}
                    />

                    <CardContent>
                      <TableContainer>
                        <Table className={classes.table}>
                          <TableBody>
                            {statsData.users_ranking.map((userData, index) => (
                              <TableRow hover key={userData.username}>
                                {index < 5 && (
                                  <>
                                    <TableCell align="center">
                                      {index + 1}º
                                    </TableCell>
                                    <TableCell align="right">
                                      <Avatar
                                        src={
                                          userData.photo_url
                                            ? userData.photo_url
                                            : "data:image/png;base64,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"
                                        }
                                        className={classes.avatar}
                                        alt="static image"
                                      />
                                    </TableCell>
                                    <TableCell align="left">
                                      {userData.name}
                                    </TableCell>
                                  </>
                                )}
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </CardContent>
                  </Card>
                </Container>
              </Grid>
              <Grid item xs={12} md={6} lg={6}>
                <Container maxWidth="lg">
                  <Card variant="outlined" className={classes.cardRanking}>
                    <CardHeader
                      className={classes.cardHeader}
                      title="Projetos em destaque"
                      titleTypographyProps={{ align: "center" }}
                    />
                    <CardContent>
                      <TableContainer>
                        <Table className={classes.table}>
                          <TableBody>
                            {statsData.newest_featured_projects.map(
                              (project, index) => (
                                <TableRow
                                  hover
                                  key={project.id}
                                  style={{ cursor: "pointer" }}
                                >
                                  {index < 5 && (
                                    <>
                                      <TableCell align="left">
                                        <Typography>{project.title}</Typography>
                                        <Typography
                                          color="textSecondary"
                                          variant="h5"
                                        >
                                          {project.description}
                                        </Typography>
                                        <Link
                                          component={RouterLink}
                                          to={`/project/${project.id}`}
                                        >
                                          Ver mais
                                        </Link>{" "}
                                      </TableCell>
                                    </>
                                  )}
                                </TableRow>
                              )
                            )}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </CardContent>
                  </Card>
                </Container>
              </Grid>
              <Grid item xs={12} md={6} lg={6}>
                <Card variant="outlined" className={classes.cardRanking}>
                  <CardHeader
                    className={classes.cardHeader}
                    title="Notícias"
                    titleTypographyProps={{ align: "center" }}
                  />
                  <CardContent>
                    <TableContainer>
                      <Table>
                        <TableBody>
                          {statsData.newest_news.map((data, index) => (
                            <TableRow
                              hover
                              key={data.id}
                              className={classes.row}
                            >
                              <TableCell align="left">
                                <Typography>{data.title}</Typography>
                                <Typography color="textSecondary" variant="h5">
                                  {data.description}
                                </Typography>
                                <Link
                                  component={RouterLink}
                                  to={`/notice/${data.id}`}
                                >
                                  Ver mais
                                </Link>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Container>
        </>
      )}
      <Footer />
    </Page>
  );
}
