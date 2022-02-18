import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  TablePagination,
  Grid,
} from "@mui/material";
import {makeStyles} from "@mui/styles";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import {useContext, useState} from "react";
import {CoinsContext} from "../App";
import {getNumber} from "../utils";
import LineChart from "./LineChart";
import "./table.scss";
import OptionsMenu from "./OptionsMenu";
import ColumnsMenu from "./ColumnsMenu";
const useStyles = makeStyles({
  root: {},
  table: {},
  nameCell: {
    whiteSpace: "nowrap",
  },
  tableCell: {
    paddingRight: 4,
    paddingLeft: 10,
    paddingTop: 2,
    paddingBottom: 2,
  },
});

const TableComponent = () => {
  const classes = useStyles();
  const {coinsHistory, coins, setCoins, setCoinsHistory} =
    useContext(CoinsContext);
  const [orderDirection, setOrderDirection] = useState("desc");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [shownColumns, setShownColumns] = useState({
    "Rank ": true,
    "1h Change": false,
    "24h Change": true,
    "7d Change": false,
    "Price ": true,
    "price in BTC": true,
    "Market Cap": true,
    "24 Volume": true,
  });

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const sortArray = (arr, orderBy) => {
    switch (orderBy) {
      case "asc":
      default:
        return arr.sort((a, b) =>
          a.rank > b.rank ? 1 : b.rank > a.rank ? -1 : 0
        );
      case "desc":
        return arr.sort((a, b) =>
          a.rank < b.rank ? 1 : b.rank < a.rank ? -1 : 0
        );
    }
  };

  const handleSortRequest = () => {
    setCoins(sortArray(coins, orderDirection));
    setOrderDirection(orderDirection === "asc" ? "desc" : "asc");
    setCoinsHistory(coinsHistory.reverse());
  };

  const handleDelete = (coin, index) => {
    setCoins(coins.filter((coinsObj) => coinsObj.id !== coin.id));
    coinsHistory.splice(index, 1);
  };

  return (
    <div className="container">
      <Grid item xs={12}>
        <TableContainer className={classes.root}>
          <Table
            className={classes.table}
            aria-label="simple table"
            stickyHeader
          >
            <TableHead>
              <TableRow className={classes.tableRow}>
                {shownColumns["Rank "] && (
                  <TableCell
                    className={classes.tableCell}
                    onClick={handleSortRequest}
                  >
                    <TableSortLabel active={true} direction={orderDirection}>
                      #
                    </TableSortLabel>
                  </TableCell>
                )}

                <TableCell className={classes.nameCell}>Name</TableCell>
                {shownColumns["1h Change"] && (
                  <TableCell className={classes.tableCell}>1H CHANGE</TableCell>
                )}
                {shownColumns["24h Change"] && (
                  <TableCell className={classes.tableCell}>
                    24H CHANGE
                  </TableCell>
                )}

                {shownColumns["7d Change"] && (
                  <TableCell className={classes.tableCell}>7D CHANGE</TableCell>
                )}
                {shownColumns["Price "] && (
                  <TableCell className={classes.tableCell}>PRICE</TableCell>
                )}
                {shownColumns["Price in BTC"] && (
                  <TableCell className={classes.tableCell}>
                    PRICE IN BTC
                  </TableCell>
                )}
                {shownColumns["Market Cap"] && (
                  <TableCell className={classes.tableCell}>
                    MARKET CAP
                  </TableCell>
                )}
                {shownColumns["24 Volume"] && (
                  <TableCell className={classes.tableCell}>
                    VOLUME 24H
                  </TableCell>
                )}

                <TableCell className={classes.tableCell}>
                  PRICE GRAPH(7D)
                </TableCell>
                <TableCell align="center" className={classes.tableCell}>
                  <ColumnsMenu
                    shownColumns={shownColumns}
                    setShownColumns={setShownColumns}
                  />
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {coins
                ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((coin, i) => (
                  <TableRow className={classes.tableRow} key={coin.id}>
                    {shownColumns["Rank "] && (
                      <TableCell
                        className={classes.tableCell}
                        component="th"
                        scope="row"
                      >
                        {coin.rank}
                      </TableCell>
                    )}

                    <TableCell
                      align="center"
                      id={"coinName"}
                      className={classes.nameCell}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          flexWrap: "noWrap",
                        }}
                      >
                        <img
                          style={{
                            height: "22px",
                            paddingRight: "5px",
                          }}
                          src={coin.icon}
                          alt="icon"
                        />
                        <span>{coin.name} </span>
                        <span style={{color: "rgb(83, 83, 83,0.6)"}}>
                          &nbsp; &#8226; &nbsp;
                          {coin.symbol}
                        </span>
                      </div>
                    </TableCell>
                    {shownColumns["1h Change"] && (
                      <TableCell
                        className={classes.tableCell}
                        style={{
                          color:
                            coin.priceChange1h > 0
                              ? "rgb(43, 139, 85)"
                              : "rgb(194, 39, 39)",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            flexWrap: "noWrap",
                          }}
                        >
                          {coin.priceChange1h > 0 ? (
                            <ArrowDropUpIcon />
                          ) : (
                            <ArrowDropDownIcon />
                          )}
                          {coin.priceChange1h + "%"}
                        </div>
                      </TableCell>
                    )}

                    {shownColumns["24h Change"] && (
                      <TableCell
                        className={classes.tableCell}
                        style={{
                          color:
                            coin.priceChange1d > 0
                              ? "rgb(43, 139, 85)"
                              : "rgb(194, 39, 39)",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            flexWrap: "noWrap",
                          }}
                        >
                          {coin.priceChange1d > 0 ? (
                            <ArrowDropUpIcon />
                          ) : (
                            <ArrowDropDownIcon />
                          )}
                          {coin.priceChange1d + "%"}
                        </div>
                      </TableCell>
                    )}

                    {shownColumns["7d Change"] && (
                      <TableCell
                        className={classes.tableCell}
                        style={{
                          color:
                            coin.priceChange1w > 0
                              ? "rgb(43, 139, 85)"
                              : "rgb(194, 39, 39)",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            flexWrap: "noWrap",
                          }}
                        >
                          {coin.priceChange1w > 0 ? (
                            <ArrowDropUpIcon />
                          ) : (
                            <ArrowDropDownIcon />
                          )}
                          {coin.priceChange1w + "%"}
                        </div>
                      </TableCell>
                    )}
                    {shownColumns["Price "] && (
                      <TableCell className={classes.tableCell}>
                        $
                        {coin.price >= 1
                          ? coin.price.toFixed(2)
                          : coin.price.toFixed(6)}
                      </TableCell>
                    )}
                    {shownColumns["Price in BTC"] && (
                      <TableCell className={classes.tableCell}>
                        {coin.priceBtc.toFixed(8)}
                      </TableCell>
                    )}
                    {shownColumns["Market Cap"] && (
                      <TableCell className={classes.tableCell}>
                        {getNumber(coin.marketCap)}
                      </TableCell>
                    )}
                    {shownColumns["24 Volume"] && (
                      <TableCell className={classes.tableCell}>
                        {getNumber(coin.volume)}
                      </TableCell>
                    )}

                    <TableCell
                      className={classes.tableCell}
                      align="right"
                      style={{width: "150px"}}
                    >
                      {
                        <LineChart
                          index={i}
                          coin={coin}
                          coinsHistory={coinsHistory[i] ? coinsHistory : []}
                        />
                      }
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                      <OptionsMenu
                        coin={coin}
                        coinsHistory={coinsHistory}
                        index={i}
                        handleDelete={handleDelete}
                      />
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          className="table-pagination"
          rowsPerPageOptions={[20, 100, 300]}
          component="div"
          count={coins && coins.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Grid>
    </div>
  );
};

export default TableComponent;
