import { createContext, useEffect } from "react";
import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { ethers } from "ethers";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { AuthContext } from "../../provider/AuthProvider";

const ConnectWallet = () => {
	const navigate = useNavigate();
	const { owner } = createContext(AuthContext);

	useEffect(() => {
		checkWalletConnected();
	}, []);

	const checkWalletConnected = async () => {
		const { ethereum } = window;
		const accounts = await ethereum.request({ method: "eth_accounts" });
		const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
		const { chainId } = await provider.getNetwork();
		if (accounts.length > 0) {
			if (chainId === 4) {
				if (accounts.includes(owner.toLowerCase())) {
					return navigate("/");
				} else {
					return toast("Not the owner.");
				}
			} else {
				console.log("hello");
				return toast("Please Connect to Mainnet.");
			}
		} else {
			return navigate("/connect-wallet");
		}
	};

	const _connect = async () => {
		const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
		await provider.send("eth_requestAccounts", []);
		const signer = provider.getSigner();
		await signer.getAddress();
		checkWalletConnected();
	};

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
					Please connect your wallet
				</Typography>
				<Button
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
				</Button>
			</Box>
			<ToastContainer />
		</Box>
	);
};

export default ConnectWallet;
