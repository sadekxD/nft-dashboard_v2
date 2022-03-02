import { Typography, Button } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import Header from "../components/header/Header";
import SideNavigation from "../components/sidebar/SideNavigation";

const AdminLayout = ({ children }) => {
	return (
		<div>
			<Box
				sx={{
					display: "flex",
				}}
			>
				<Box
					sx={{
						height: "calc(100vh - 0px)",
						width: 320,
						borderRight: "2px solid #FCF3F3",
						display: "flex",
						flexDirection: "column",
					}}
				>
					<Box>
						<Typography
							variant="h5"
							component="div"
							textAlign="center"
							my={4}
							fontWeight="600"
						>
							NFT DASHBOARD
						</Typography>
						<SideNavigation />
					</Box>
					<Button
						variant="contained"
						sx={{
							boxShadow: "none",
							fontSize: 18,
							fontWeight: 500,
							borderRadius: 20,
							mt: "auto",
							width: "fit-content",
							mb: 4,
							mx: "auto",
							textTransform: "capitalize",
						}}
					>
						Withdraw Funds
					</Button>
				</Box>
				<Box sx={{ flexGrow: 1 }}>
					<Header />
					<Box sx={{ p: 6 }}>{children}</Box>
				</Box>
			</Box>
		</div>
	);
};

export default AdminLayout;
