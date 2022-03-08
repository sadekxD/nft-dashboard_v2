import { Typography, Button, Backdrop, CircularProgress } from "@mui/material";
import { Box } from "@mui/system";
import React, { useContext, useEffect, useState } from "react";
import PreSaleDialog from "../components/dialog/PreSaleDialog";

// React Toastify
import { toast } from "react-toastify";

// Ether JS
import { ethers } from "ethers";

// ABI
import DegenHeroesABI from "../abi/DegenHeroesABI.json";
import { AuthContext } from "../provider/AuthProvider";

const PreSale = () => {
	const [open, setOpen] = useState(false);
	const [loading, setLoading] = useState(false);
	const [presalePrice, setPresalePrice] = useState("");
	const [value, setValue] = useState("0.1");
	const { contractAddress } = useContext(AuthContext);

	useEffect(() => {
		_contractStatus();
	}, []);

	const handleDialogBox = (type = "open") => {
		type === "open" ? setOpen(true) : setOpen(false);
	};

	// Get Contract Status
	const _contractStatus = async () => {
		const provider = new ethers.providers.Web3Provider(window.ethereum);
		const signer = provider.getSigner();
		const contract = new ethers.Contract(
			contractAddress,
			DegenHeroesABI,
			signer
		);

		const presaleCost = await contract.presaleCost();
		setPresalePrice(ethers.utils.formatEther(presaleCost));
	};

	const _submit = async (e) => {
		e.preventDefault();

		const provider = new ethers.providers.Web3Provider(window.ethereum);
		const signer = provider.getSigner();
		const contract = new ethers.Contract(
			contractAddress,
			DegenHeroesABI,
			signer
		);

		try {
			setLoading(true);
			const result = await contract.setPresaleCost(
				ethers.utils.parseEther(value)
			);
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

	// Handle Presale Price
	const _presalePrice = async (e) => {
		setValue(e.target.value);
	};

	return (
		<Box>
			<PreSaleDialog
				_submit={_submit}
				_presalePrice={_presalePrice}
				open={open}
				handleDialogbox={handleDialogBox}
			/>
			<Backdrop
				sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1000 }}
				open={loading}
			>
				<CircularProgress color="inherit" />
			</Backdrop>
			<Typography variant="h3" fontSize={24} sx={{ fontWeight: 600 }}>
				Pre Sale Price
			</Typography>
			<Typography variant="h3" fontSize={70} fontWeight={800} sx={{ mt: 2 }}>
				{presalePrice} ETH
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
