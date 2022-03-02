import { Typography, Button } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import PreSaleDialog from "../components/dialog/PreSaleDialog";

const PreSale = () => {
	const [open, setOpen] = useState(false);

	const handleDialogBox = (type = "open") => {
		type === "open" ? setOpen(true) : setOpen(false);
	};

	return (
		<Box>
			<PreSaleDialog open={open} handleDialogbox={handleDialogBox} />
			<Typography variant="h3" fontSize={24} sx={{ fontWeight: 600 }}>
				Pre Sale Price
			</Typography>
			<Typography variant="h3" fontSize={70} fontWeight={800} sx={{ mt: 2 }}>
				0.1 ETH
			</Typography>
			<Button
				variant="contained"
				color="primary"
				sx={{
					boxShadow: "none",
					fontSize: 20,
					fontWeight: 500,
					py: 2,
					px: 6,
					mt: 2,
				}}
				onClick={() => handleDialogBox("open")}
			>
				UPDATE
			</Button>
		</Box>
	);
};

export default PreSale;
