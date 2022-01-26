import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TableSortLabel,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import MoreIcon from "@mui/icons-material/More";
import {useContext, useState} from "react";
import {CoinsContext} from "../App";
import {getNumber} from "../utils";
import LineChart from "./LineChart";
import {TablePagination} from "@mui/material";
import {Popover} from "@mui/material";

const TableComponent = () => {
  let coinsData = useContext(CoinsContext);
  const coinsHistory = coinsData.coinsHistory;
  const [orderDirection, setOrderDirection] = useState("desc");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [anchorEl, setAnchorEl] = useState(null);

  const handlePopover = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const open = Boolean(anchorEl);
  const popoverId = open ? "simple-popover" : undefined;

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
    coinsData = sortArray(coinsData.coins, orderDirection);
    setOrderDirection(orderDirection === "asc" ? "desc" : "asc");
  };

  return (
    <div  className="container">
      <TableContainer style={{  marginLeft: 100 }} className= "table-container" component={Paper} >
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
            {coinsData?.coins
              ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row,i) => (
                <TableRow key={row.id}>
                  <TableCell component="th" scope="row">
                    {row.rank}
                  </TableCell>
                  <TableCell align="right">
                    <img
                      style={{height: "25px"}}
                      src={row.icon}
                      alt="icon"
                    ></img>
                    {row.name + " "}
                    <span>{row.symbol} </span>
                  </TableCell>
                  <TableCell align="right">{row.priceChange1d + "%"}</TableCell>
                  <TableCell align="right">{row.price>=1? row.price.toFixed(2):row.price.toFixed(6)}$</TableCell>
                  <TableCell align="right">{row.priceBtc.toFixed(8)}</TableCell>
                  <TableCell align="right">
                    {getNumber(row.marketCap)}
                  </TableCell>
                  <TableCell align="right">{getNumber(row.volume)}</TableCell>
                  <TableCell align="right">
                    {/*           //////////////////////////////////////////////////////////////////////////////////////   */}
                    {<LineChart id={row.id}  coinHistory={coinsHistory[i]?coinsHistory[i].chart:[]} />}
                  </TableCell>
                  <TableCell align="right">
                    <button onClick={handlePopover}>
                      <MoreVertIcon />
                    </button>
                    <Popover
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
                    </Popover>
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