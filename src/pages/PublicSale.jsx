import {
	Backdrop,
	Box,
	Button,
	CircularProgress,
	Typography,
} from "@mui/material";
import PublicSaleDialog from "../components/dialog/PublicSaleDialog";
import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";

// React Toastify
import { toast } from "react-toastify";

// Ether JS
import { ethers } from "ethers";

// ABI
import DegenHeroesABI from "../abi/DegenHeroesABI.json";

const PublicSale = () => {
	const [open, setOpen] = useState(false);
	const [loading, setLoading] = useState(false);
	const [publicsalePrice, setPublicsalePrice] = useState("");
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

		const publicsaleCost = await contract.publicsaleCost();
		setPublicsalePrice(ethers.utils.formatEther(publicsaleCost));
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
			const result = await contract.setPublicsaleCost(
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

	// Handle Publicsale Price
	const _publicsalePrice = async (e) => {
		setValue(e.target.value);
	};

	return (
		<Box>
			<Backdrop
				sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1000 }}
				open={loading}
			>
				<CircularProgress color="inherit" />
			</Backdrop>
			<PublicSaleDialog
				_submit={_submit}
				_publicsalePrice={_publicsalePrice}
				open={open}
				handleDialogbox={handleDialogBox}
			/>
			<Typography variant="h3" fontSize={24} sx={{ fontWeight: 600 }}>
				Public Sale Price
			</Typography>
			<Typography variant="h3" fontSize={70} fontWeight={800} sx={{ mt: 2 }}>
				{publicsalePrice} ETH
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
