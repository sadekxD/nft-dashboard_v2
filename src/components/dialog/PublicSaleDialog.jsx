import CancelIcon from "@mui/icons-material/Cancel";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useTheme } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import EditIcon from "@mui/icons-material/Edit";
import { Box } from "@mui/system";
import { TextField } from "@mui/material";

const useStyle = makeStyles((theme) => ({
	paper: {
		borderRadius: "1rem",
		width: 480,
	},
	topPaperScrollBody: {
		verticalAlign: "middle",
	},
}));

export default function PublicSaleDialog({ open, handleDialogbox, children }) {
	const classes = useStyle();
	const theme = useTheme();

	return (
		<Dialog
			open={open}
			onClose={() => handleDialogbox("close")}
			aria-labelledby="responsive-dialog-title"
			classes={{
				paper: classes.paper,
				scrollPaper: classes.topScrollPaper,
				paperScrollBody: classes.topPaperScrollBody,
			}}
		>
			<DialogTitle
				id="responsive-dialog-title"
				sx={{ display: "flex", alignItems: "center" }}
			>
				<EditIcon sx={{ mr: 2, color: "#017CC0", fontSize: 33 }} />
				Change Public Sale Price
			</DialogTitle>
			<DialogContent>
				<Box component="form" sx={{ py: 3 }}>
					<TextField
						id="pre-sale-price"
						fullWidth
						label="Price"
						variant="outlined"
						type="number"
						placeholder="0.1 eth"
					/>
					<Button
						variant="contained"
						sx={{ display: "block", mt: 2, ml: "auto", boxShadow: "none" }}
					>
						Update
					</Button>
				</Box>
			</DialogContent>
			<DialogActions>
				<Button
					sx={{ boxShadow: "none" }}
					onClick={() => handleDialogbox("close")}
				>
					Close
				</Button>
			</DialogActions>
		</Dialog>
	);
}
