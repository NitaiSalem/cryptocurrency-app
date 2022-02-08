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
import MoreIcon from "@mui/icons-material/More";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import {useContext, useEffect, useState} from "react";
import {CoinsContext} from "../App";
import {getNumber} from "../utils";
import LineChart from "./LineChart";
import "./table.scss";
import OptionsMenu from "./OptionsMenu";

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

  console.log(" coins in table ", coins);
  console.log("coinshistory intable", coinsHistory);
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
                <TableCell
                  className={classes.tableCell}
                  onClick={handleSortRequest}
                >
                  <TableSortLabel active={true} direction={orderDirection}>
                    #
                  </TableSortLabel>
                </TableCell>
                <TableCell className={classes.nameCell}>Name</TableCell>
                <TableCell className={classes.tableCell}>24H CHANGE</TableCell>
                <TableCell className={classes.tableCell}>PRICE</TableCell>
                <TableCell className={classes.tableCell}>
                  PRICE IN BTC
                </TableCell>
                <TableCell className={classes.tableCell}>MARKET CAP</TableCell>
                <TableCell className={classes.tableCell}>VOLUME 24H</TableCell>
                <TableCell className={classes.tableCell}>
                  PRICE GRAPH(7D)
                </TableCell>
                <TableCell align="center" className={classes.tableCell}>
                  <MoreIcon />
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {coins
                ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((coin, i) => (
                  <TableRow className={classes.tableRow} key={coin.id}>
                    <TableCell
                      className={classes.tableCell}
                      component="th"
                      scope="row"
                    >
                      {coin.rank}
                    </TableCell>
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
                        <span>{coin.name + " "} &#8226; </span>
                        <span style={{color: "rgb(83, 83, 83,0.6)"}}>
                          &nbsp;
                          {coin.symbol}
                        </span>
                      </div>
                    </TableCell>
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
                    <TableCell className={classes.tableCell}>
                      $
                      {coin.price >= 1
                        ? coin.price.toFixed(2)
                        : coin.price.toFixed(6)}
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                      {coin.priceBtc.toFixed(8)}
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                      {getNumber(coin.marketCap)}
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                      {getNumber(coin.volume)}
                    </TableCell>
                    <TableCell
                      className={classes.tableCell}
                      align="right"
                      style={{width: "150px"}}
                    >
                      {
                        <LineChart
                          index={i}
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
        </TableContainer>
      </Grid>
    </div>
  );
};

export default TableComponent;
