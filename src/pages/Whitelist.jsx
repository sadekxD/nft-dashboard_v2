import { Box, Button, TextField, Typography } from "@mui/material";
import React from "react";
import WhitelistTable from "../components/tables/WhitelistTable";

const Whitelist = () => {
	return (
		<Box>
			<Typography variant="h3" fontSize={24} sx={{ fontWeight: 600 }}>
				ADD WHITELIST
			</Typography>
			<Box component="form" sx={{ mt: 2, mb: 6 }}>
				<TextField
					variant="outlined"
					type="text"
					id="address"
					fullWidth
					placeholder="0xFABB0ac9d68B0B445fB7357272Ff202C5651694a"
					sx={{ maxWidth: 500 }}
					size="small"
				/>
				<Button
					variant="contained"
					sx={{ boxShadow: "none", ml: 2, py: 1, px: 3 }}
				>
					ADD
				</Button>
			</Box>
			<WhitelistTable />
		</Box>
	);
};

export default Whitelist;
