import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

const Install = () => {
	return (
		<Box
			sx={{
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				height: "100vh",
			}}
		>
			<Box
				sx={{
					maxHeight: 400,
					maxWidth: 360,
					height: "100%",
					width: "100%",
					borderRadius: "30px",
					boxShadow: "0px 0px 6px rgba(3, 0, 154, 0.15)",
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					padding: 4,
				}}
			>
				<Box
					component="img"
					sx={{
						height: 160,
						width: 160,
						objectFit: "contain",
						borderRadius: 2,
					}}
					src="/images/img-1.jpeg"
					alt=""
				/>
				<Typography
					variant="h6"
					component="p"
					fontWeight="600"
					textAlign="center"
					sx={{ mt: 2 }}
				>
					Please install metamask.
				</Typography>
				{/* <Button
					variant="contained"
					onClick={_connect}
					sx={{
						boxShadow: "none",
						fontSize: 18,
						fontWeight: 500,
						width: "fit-content",
						mt: 5,
					}}
				>
					Connect Wallet
				</Button> */}
			</Box>
		</Box>
	);
};

export default Install;
