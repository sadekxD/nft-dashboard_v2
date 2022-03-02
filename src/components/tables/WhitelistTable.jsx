import * as React from "react";
import PropTypes from "prop-types";
import DeleteIcon from "@mui/icons-material/Delete";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { visuallyHidden } from "@mui/utils";

function createData(sl_no, address, _, minted) {
	return {
		sl_no,
		address,
		_,
		minted,
	};
}

const rows = [
	createData(1, "0xFABB0ac9d68B0B445fB7357272Ff202C5651694a", "", false),
	createData(2, "0xFABB0ac9d68B0B445fB7357272Ff202C5651694a", "", true),
	createData(3, "0xFABB0ac9d68B0B445fB7357272Ff202C5651694a", "", false),
	createData(4, "0xFABB0ac9d68B0B445fB7357272Ff202C5651694a", "", true),
	createData(5, "0xFABB0ac9d68B0B445fB7357272Ff202C5651694a", "", false),
	createData(6, "0xFABB0ac9d68B0B445fB7357272Ff202C5651694a", "", true),
	createData(7, "0xFABB0ac9d68B0B445fB7357272Ff202C5651694a", "", false),
	createData(8, "0xFABB0ac9d68B0B445fB7357272Ff202C5651694a", "", false),
];

function descendingComparator(a, b, orderBy) {
	if (b[orderBy] < a[orderBy]) {
		return -1;
	}
	if (b[orderBy] > a[orderBy]) {
		return 1;
	}
	return 0;
}

function getComparator(order, orderBy) {
	return order === "desc"
		? (a, b) => descendingComparator(a, b, orderBy)
		: (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
	const stabilizedThis = array.map((el, index) => [el, index]);
	stabilizedThis.sort((a, b) => {
		const order = comparator(a[0], b[0]);
		if (order !== 0) {
			return order;
		}
		return a[1] - b[1];
	});
	return stabilizedThis.map((el) => el[0]);
}

const headCells = [
	{
		id: "sl_no",
		numeric: true,
		label: "SL no.",
	},
	{
		id: "adress",
		numeric: false,
		label: "Wallet Address",
	},
	{ id: "minted", numeric: true, label: "Minted" },
	{ id: "actions", numeric: false, label: "Actions" },
];

function EnhancedTableHead(props) {
	const { order, orderBy, onRequestSort } = props;
	const createSortHandler = (property) => (event) => {
		onRequestSort(event, property);
	};

	return (
		<TableHead sx={{ backgroundColor: "#FCF3F3" }}>
			<TableRow>
				{headCells.map((headCell) => (
					<TableCell
						key={headCell.id}
						align="left"
						sx={{ minWidth: 100, color: "#7265C3", border: "none" }}
						sortDirection={orderBy === headCell.id ? order : false}
					>
						{headCell.id !== "actions" ? (
							<TableSortLabel
								active={orderBy === headCell.id}
								direction={orderBy === headCell.id ? order : "asc"}
								onClick={createSortHandler(headCell.id)}
							>
								{headCell.label}
								{orderBy === headCell.id ? (
									<Box component="span" sx={visuallyHidden}>
										{order === "desc"
											? "sorted descending"
											: "sorted ascending"}
									</Box>
								) : null}
							</TableSortLabel>
						) : (
							""
						)}
					</TableCell>
				))}
			</TableRow>
		</TableHead>
	);
}

EnhancedTableHead.propTypes = {
	numSelected: PropTypes.number.isRequired,
	onRequestSort: PropTypes.func.isRequired,
	onSelectAllClick: PropTypes.func.isRequired,
	order: PropTypes.oneOf(["asc", "desc"]).isRequired,
	orderBy: PropTypes.string.isRequired,
	rowCount: PropTypes.number.isRequired,
};

const EnhancedTableToolbar = (props) => {
	const { numSelected } = props;

	return (
		<Toolbar
			sx={{
				pl: { sm: 2 },
				pr: { xs: 1, sm: 1 },
			}}
		>
			<Typography
				sx={{ flex: "1 1 100%" }}
				variant="h6"
				id="tableTitle"
				component="div"
			>
				Whitelist
			</Typography>
		</Toolbar>
	);
};

EnhancedTableToolbar.propTypes = {
	numSelected: PropTypes.number.isRequired,
};

export default function WhitelistTable() {
	const [order, setOrder] = React.useState("asc");
	const [orderBy, setOrderBy] = React.useState("calories");
	const [selected, setSelected] = React.useState([]);
	const [page, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(5);

	const handleRequestSort = (event, property) => {
		const isAsc = orderBy === property && order === "asc";
		setOrder(isAsc ? "desc" : "asc");
		setOrderBy(property);
	};

	const handleSelectAllClick = (event) => {
		if (event.target.checked) {
			const newSelecteds = rows.map((n) => n.name);
			setSelected(newSelecteds);
			return;
		}
		setSelected([]);
	};

	const handleClick = (event, name) => {
		const selectedIndex = selected.indexOf(name);
		let newSelected = [];

		if (selectedIndex === -1) {
			newSelected = newSelected.concat(selected, name);
		} else if (selectedIndex === 0) {
			newSelected = newSelected.concat(selected.slice(1));
		} else if (selectedIndex === selected.length - 1) {
			newSelected = newSelected.concat(selected.slice(0, -1));
		} else if (selectedIndex > 0) {
			newSelected = newSelected.concat(
				selected.slice(0, selectedIndex),
				selected.slice(selectedIndex + 1)
			);
		}

		setSelected(newSelected);
	};

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	const isSelected = (name) => selected.indexOf(name) !== -1;

	// Avoid a layout jump when reaching the last page with empty rows.
	const emptyRows =
		page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

	return (
		<Box sx={{ width: "100%" }}>
			<Paper
				sx={{
					width: "100%",
					mb: 2,
					boxShadow: "0px 0px 30px rgba(0, 0, 0, 0.1)",
					borderRadius: 2,
				}}
			>
				<EnhancedTableToolbar numSelected={selected.length} />
				<TableContainer>
					<Table
						sx={{
							minWidth: 750,
						}}
						aria-labelledby="tableTitle"
						size="medium"
					>
						<EnhancedTableHead
							numSelected={selected.length}
							order={order}
							orderBy={orderBy}
							onSelectAllClick={handleSelectAllClick}
							onRequestSort={handleRequestSort}
							rowCount={rows.length}
						/>
						<TableBody>
							{stableSort(rows, getComparator(order, orderBy))
								.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
								.map((row, index) => {
									const isItemSelected = isSelected(row.name);
									const labelId = `enhanced-table-checkbox-${index}`;

									return (
										<TableRow
											hover
											onClick={(event) => handleClick(event, row.sl_no)}
											role="checkbox"
											aria-checked={isItemSelected}
											tabIndex={-1}
											key={row.sl_no}
											selected={isItemSelected}
											sx={{ cursor: "pointer" }}
										>
											<TableCell
												component="th"
												id={labelId}
												scope="row"
												padding="none"
												sx={{
													pl: 3,
													fontWeight: 600,
													borderBottom: "2px solid #FCF3F3",
												}}
											>
												{row.sl_no}
											</TableCell>
											<TableCell
												align="left"
												sx={{ borderBottom: "2px solid #FCF3F3" }}
											>
												{row.address}
											</TableCell>
											<TableCell
												align="left"
												sx={{ borderBottom: "2px solid #FCF3F3" }}
											>
												<Box
													sx={{
														borderRadius: 2,
														backgroundColor: row.minted
															? "rgba(10, 255, 78, 0.47)"
															: "rgba(88, 255, 10, .47)",
														width: "fit-content",
														fontWeight: 500,

														color: row.minted ? "#3D6805" : "#5CA500",
														px: 1,
														py: 0.5,
														ml: row.minted ? 0.4 : 0,
													}}
												>
													{row.minted ? "True" : "False"}
												</Box>
											</TableCell>
											<TableCell
												align="left"
												sx={{ borderBottom: "2px solid #FCF3F3" }}
											>
												<Box>
													<Tooltip title="remove" arrow placement="top">
														<IconButton
															sx={{
																backgroundColor: "rgba(244, 67, 67, 0.53)",
																"&:hover": {
																	backgroundColor: "#FF0000",
																},
															}}
														>
															<DeleteIcon sx={{ color: "#fff" }} />
														</IconButton>
													</Tooltip>
												</Box>
											</TableCell>
										</TableRow>
									);
								})}
							{emptyRows > 0 && (
								<TableRow
									style={{
										height: 53 * emptyRows,
									}}
								>
									<TableCell colSpan={6} />
								</TableRow>
							)}
						</TableBody>
					</Table>
				</TableContainer>
				<TablePagination
					rowsPerPageOptions={[5, 10, 25]}
					component="div"
					count={rows.length}
					rowsPerPage={rowsPerPage}
					page={page}
					onPageChange={handleChangePage}
					onRowsPerPageChange={handleChangeRowsPerPage}
				/>
			</Paper>
		</Box>
	);
}
