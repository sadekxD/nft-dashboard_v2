import { Box, Button, Typography } from "@mui/material";
import PublicSaleDialog from "../components/dialog/PublicSaleDialog";
import React, { useState } from "react";

const PublicSale = () => {
	const [open, setOpen] = useState(false);

	const handleDialogBox = (type = "open") => {
		type === "open" ? setOpen(true) : setOpen(false);
	};

	return (
		<Box>
			<PublicSaleDialog open={open} handleDialogbox={handleDialogBox} />
			<Typography variant="h3" fontSize={24} sx={{ fontWeight: 600 }}>
				Public Sale Price
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

export default PublicSale;
