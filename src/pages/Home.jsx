import { Box } from "@mui/system";
import React from "react";
import AutoAwesomeMosaicIcon from "@mui/icons-material/AutoAwesomeMosaic";
import { IconButton, Typography } from "@mui/material";

const Home = () => {
	return (
		<Box sx={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
			<Box
				sx={{
					flex: 1,
					height: 200,
					borderRadius: 4,
					border: "2px solid #FCF3F3",
					boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.1)",
					transition: ".3s",
					cursor: "pointer",
					minWidth: 300,
					display: "flex",
					px: 3,
					py: 4,
					gap: 2,
					"&:hover": {
						boxShadow: "0px 8px 40px rgba(0, 0, 0, 0.1)",
					},
				}}
			>
				<IconButton
					sx={{
						width: "fit-content",
						height: "fit-content",
						p: 2,
						backgroundColor: "#220037",
						"&:hover": {
							backgroundColor: "#220037dc",
						},
					}}
				>
					<AutoAwesomeMosaicIcon sx={{ fontSize: 32, color: "#E8B9B9" }} />
				</IconButton>
				<Box>
					<Typography variant="h3" fontSize={24} fontWeight="600">
						Ethereum Collected
					</Typography>
					<Typography
						variant="h2"
						fontSize={44}
						fontWeight="800"
						mt={2}
						color="#220037"
					>
						3 ETH.
					</Typography>
				</Box>
			</Box>
			<Box
				sx={{
					flex: 1,
					height: 200,
					borderRadius: 4,
					border: "2px solid #FCF3F3",
					boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.1)",
					minWidth: 300,
					display: "flex",
					padding: 3,
					gap: 2,
				}}
			>
				<IconButton
					sx={{
						width: "fit-content",
						height: "fit-content",
						p: 2,
						backgroundColor: "#220037",
						"&:hover": {
							backgroundColor: "#220037dc",
						},
					}}
				>
					<AutoAwesomeMosaicIcon sx={{ fontSize: 32, color: "#E8B9B9" }} />
				</IconButton>
				<Box>
					<Typography variant="h3" fontSize={24} fontWeight="600">
						Ethereum Collected
					</Typography>
					<Typography
						variant="h2"
						fontSize={44}
						fontWeight="800"
						mt={2}
						color="#220037"
					>
						3 ETH.
					</Typography>
				</Box>
			</Box>
			<Box
				sx={{
					flex: 1,
					height: 200,
					borderRadius: 4,
					border: "2px solid #FCF3F3",
					boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.1)",
					minWidth: 300,
					display: "flex",
					padding: 3,
					gap: 2,
				}}
			>
				<IconButton
					sx={{
						width: "fit-content",
						height: "fit-content",
						p: 2,
						backgroundColor: "#220037",
						"&:hover": {
							backgroundColor: "#220037dc",
						},
					}}
				>
					<AutoAwesomeMosaicIcon sx={{ fontSize: 32, color: "#E8B9B9" }} />
				</IconButton>
				<Box>
					<Typography variant="h3" fontSize={24} fontWeight="600">
						Ethereum Collected
					</Typography>
					<Typography
						variant="h2"
						fontSize={44}
						fontWeight="800"
						mt={2}
						color="#220037"
					>
						3 ETH.
					</Typography>
				</Box>
			</Box>
		</Box>
	);
};

export default Home;
