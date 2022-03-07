import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import AutoAwesomeMosaicIcon from "@mui/icons-material/AutoAwesomeMosaic";
import {
	IconButton,
	Typography,
	Switch,
	FormControlLabel,
	Backdrop,
	CircularProgress,
} from "@mui/material";

// React Toastify
import { toast } from "react-toastify";

// Ether JS
import { ethers } from "ethers";

// ABI
import DegenHeroesABI from "../abi/DegenHeroesABI.json";

// Deployed Contract Address
const contractAddress = "0xABD09f6655143fFA3657287267b2bfE4A84A1F48";

const Home = () => {
	const [paused, setPaused] = useState(false);
	const [revealed, setRevealed] = useState(false);
	const [presaleStatus, setPresaleStatus] = useState(false);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		_contractStatus();
	}, []);

	// Smart Contract Status
	const _contractStatus = async () => {
		const provider = new ethers.providers.Web3Provider(window.ethereum);
		const signer = provider.getSigner();
		const contract = new ethers.Contract(
			contractAddress,
			DegenHeroesABI,
			signer
		);

		const mintingState = await contract.paused();
		setPaused(mintingState);

		const presaleState = await contract.paused();
		presaleStatus(presaleState);

		const revealedState = await contract.revealed();
		setRevealed(revealedState);
	};

	// Handle Minting Status
	const _minting = async (e) => {
		const provider = new ethers.providers.Web3Provider(window.ethereum);
		const signer = provider.getSigner();
		const contract = new ethers.Contract(
			contractAddress,
			DegenHeroesABI,
			signer
		);
		try {
			setLoading(true);
			const result = await contract.setPaused(e.target.checked);
			await result.wait();
			setLoading(false);
			toast.success("Change successfull", {
				position: "bottom-right",
			});
			_contractStatus();
		} catch (err) {
			setLoading(false);
			toast.error(err.message, {
				position: "bottom-right",
			});
		}
	};

	// Handle Presale Status
	const _presale = async (e) => {
		const provider = new ethers.providers.Web3Provider(window.ethereum);
		const signer = provider.getSigner();
		const contract = new ethers.Contract(
			contractAddress,
			DegenHeroesABI,
			signer
		);
		try {
			setLoading(true);
			const result = await contract.setPresale(e.target.checked);
			await result.wait();
			setLoading(false);
			toast.success("Change successfull", {
				position: "bottom-right",
			});
			_contractStatus();
		} catch (err) {
			setLoading(false);
			toast.error(err.message, {
				position: "bottom-right",
			});
		}
	};

	// Handle Reveal Metadata
	const _reveal = async (e) => {
		const provider = new ethers.providers.Web3Provider(window.ethereum);
		const signer = provider.getSigner();
		const contract = new ethers.Contract(
			contractAddress,
			DegenHeroesABI,
			signer
		);
		try {
			setLoading(true);
			const result = await contract.setRevealed(e.target.checked);
			await result.wait();
			setLoading(false);
			toast.success("Change successfull", {
				position: "bottom-right",
			});
			_contractStatus();
		} catch (err) {
			setLoading(false);
			toast.error(err.message, {
				position: "bottom-right",
			});
		}
	};

	return (
		<Box>
			<Backdrop
				sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
				open={loading}
			>
				<CircularProgress color="inherit" />
			</Backdrop>

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
			</Box>
			<Box sx={{ mt: 6 }}>
				<Typography variant="h3" fontSize={24} fontWeight="600">
					Allow Minting ( Yes /No)
				</Typography>
				<FormControlLabel
					value="top"
					control={<Switch color="primary" />}
					label="Minting"
					labelPlacement="end"
					onChange={_minting}
					checked={paused}
					sx={{
						my: 2,
					}}
				/>
			</Box>
			<hr />
			<Box sx={{ mt: 6 }}>
				<Typography variant="h3" fontSize={24} fontWeight="600">
					Pesale ( Yes /No)
				</Typography>
				<FormControlLabel
					value="top"
					control={<Switch color="primary" />}
					label="Presale"
					labelPlacement="end"
					onChange={_presale}
					checked={presaleStatus}
					sx={{
						my: 2,
					}}
				/>
			</Box>
			<hr />
			<Box sx={{ mt: 6 }}>
				<Typography variant="h3" fontSize={24} fontWeight="600">
					Reveal ( Yes /No)
				</Typography>
				<FormControlLabel
					value="top"
					control={<Switch color="primary" />}
					label="Reveal"
					labelPlacement="end"
					onChange={_reveal}
					checked={revealed}
					sx={{
						my: 2,
					}}
				/>
			</Box>
			<hr />
		</Box>
	);
};

export default Home;
