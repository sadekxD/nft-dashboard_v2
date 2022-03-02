import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../provider/AuthProvider";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

const Header = () => {
	// const [owner, setOwner] = useState();
	const { owner } = useContext(AuthContext);

	// useEffect(() => {
	// 	_getOwner();
	// }, []);

	// const _getOwner = async () => {
	// 	const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
	// 	await provider.send("eth_requestAccounts", []);
	// 	const signer = provider.getSigner();
	// 	setOwner(await signer.getAddress());
	// };

	const _disconnect = () => {
		const ethereum = window.ethereum;
		if (ethereum) {
			ethereum.on("accountsChanged", () => {
				console.log("MetaMask discconnected");
			});
		}
	};

	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar
				position="static"
				sx={{
					backgroundColor: "#fff",
					boxShadow: "none",
				}}
			>
				<Toolbar sx={{ height: 80 }}>
					<IconButton
						size="large"
						edge="start"
						color="inherit"
						aria-label="menu"
						sx={{ mr: 2, color: "#000" }}
					>
						<MenuIcon />
					</IconButton>
					<Typography
						variant="h6"
						component="div"
						color="#000"
						sx={{ flexGrow: 1 }}
					></Typography>
					<Box
						variant="contained"
						sx={{
							width: 200,
							height: 50,
							borderRadius: 30,
							px: 2,
							border: "1px solid rgba(0,0,0,.1)",
							display: "flex",
							alignItems: "center",
							cursor: "pointer",
							"&::before": {
								content: '""',
								height: 12,
								minWidth: 12,
								width: 12,
								mr: 1,
								borderRadius: "50%",
								backgroundColor: "limegreen",
							},
							color: "rgba(0, 0, 0, .87)",
						}}
					>
						<Typography fontSize={12}>{owner?.slice(0, 18)} ...</Typography>
					</Box>
				</Toolbar>
			</AppBar>
		</Box>
	);
};

export default Header;
