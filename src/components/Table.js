import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TableSortLabel,
  Menu,
  MenuItem,
  Button,
} from "@mui/material";
import MoreIcon from "@mui/icons-material/More";
import {useContext, useState} from "react";
import {CoinsContext} from "../App";
import {getNumber} from "../utils";
import LineChart from "./LineChart";
import {TablePagination} from "@mui/material";
import {Popover} from "@mui/material";
import "./table.scss";
import IsolatedMenu from "./IsolatedMenu";

const TableComponent = () => {
  let coinsData = useContext(CoinsContext);

  const {coinsHistory, coins, setToCompare, toCompare} =
    useContext(CoinsContext);

  console.log("to compare value here", toCompare);

  const [orderDirection, setOrderDirection] = useState("desc");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const open = Boolean(anchorEl);

  const handleChangeRowsPerPage = (event) => {
    console.log(" the event here ", event);
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
    coinsData = sortArray(coins, orderDirection);
    setOrderDirection(orderDirection === "asc" ? "desc" : "asc");
  };
  

  return (
    <div className="container">
      <TableContainer
        style={{marginLeft: 100}}
        className="table-container"
        component={Paper}
      >
        <Table aria-label="simple table" stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell onClick={handleSortRequest}>
                <TableSortLabel active={true} direction={orderDirection}>
                  #
                </TableSortLabel>
              </TableCell>
              <TableCell>Name</TableCell>
              <TableCell align="right">24H CHANGE</TableCell>
              <TableCell align="right">PRICE</TableCell>
              <TableCell align="right">PRICE IN BTC</TableCell>
              <TableCell align="right">MARKET CAP</TableCell>
              <TableCell align="right">VOLUME 24H</TableCell>
              <TableCell align="right">PRICE GRAPH(7D)</TableCell>
              <TableCell align="right">
                <MoreIcon />
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {coins
              ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((coin, i) => (
                <TableRow key={coin.id}>
                  <TableCell component="th" scope="row">
                    {coin.rank}
                  </TableCell>
                  <TableCell align="right">
                    <img
                      style={{height: "25px"}}
                      src={coin.icon}
                      alt="icon"
                    ></img>
                    {coin.name + " "}
                    <span>{coin.symbol} </span>
                  </TableCell>
                  <TableCell
                    align="right"
                    style={{
                      color:
                        coin.priceChange1d > 0
                          ? "rgb(1, 110, 74)"
                          : "rgb(161, 0, 0)",
                    }}
                  >
                    {coin.priceChange1d + "%"}
                  </TableCell>
                  <TableCell align="right">
                    {coin.price >= 1
                      ? coin.price.toFixed(2)
                      : coin.price.toFixed(6)}
                    $
                  </TableCell>
                  <TableCell align="right">
                    {coin.priceBtc.toFixed(8)}
                  </TableCell>
                  <TableCell align="right">
                    {getNumber(coin.marketCap)}
                  </TableCell>
                  <TableCell align="right">{getNumber(coin.volume)}</TableCell>
                  <TableCell align="right" style={{width: "200px"}}>
                    {/*           //////////////////////////////////////////////////////////////////////////////////////   */}
                    {
                      <LineChart
                        id={coin.id}
                        coinHistory={
                          coinsHistory[i] ? coinsHistory[i].chart : []
                        }
                      />
                    }
                  </TableCell>
                  <TableCell align="right">
                    {/* <button onClick={handlePopover}>
                      <MoreVertIcon />
                    </button> */}
                 
                    {/* <button onClick={()=> handleAddToCompare(coin,coinsHistory[i].chart)}>Add to compare</button> */}
                    <IsolatedMenu coin={coin} coinsHistory={coinsHistory} index={i} />
                    {/* <Popover
                      id={popoverId}
                      open={open}
                      anchorEl={anchorEl}
                      onClose={handleClose}
                      anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "left",
                      }}
                    >
                      <button>delete</button>
                      <button onClick={()=> handleAddToCompare(coin,coinsHistory[i].chart)}>Add to compare</button>
                    </Popover> */}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[20, 100, 300]}
          component="div"
          count={coinsData.coins && coinsData.coins.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </div>
  );
};

export default TableComponent;

/*

option to remove line 

You could also do this using the prototype methods .update() and .removeData() (http://www.chartjs.org/docs/#line-chart-prototype-methods for Line chart methods - each type has the similar methods)
 but since your changes require you to remove data from both ends of the graph, .destroy() would be an easier option.

*/
