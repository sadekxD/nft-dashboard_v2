import {
	Backdrop,
	Box,
	Button,
	CircularProgress,
	Typography,
} from "@mui/material";
import React, { useContext, useState } from "react";
import WhitelistTable from "../components/tables/WhitelistTable";
import { AuthContext } from "../provider/AuthProvider";

// React Toastify
import { toast } from "react-toastify";

// Ether JS
import { ethers } from "ethers";

// ABI
import DegenHeroesABI from "../abi/DegenHeroesABI.json";

const Whitelist = () => {
	const [addresses, setAddresses] = useState([]);
	const [loading, setLoading] = useState(false);
	const { contractAddress } = useContext(AuthContext);

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
			if (addresses.length > 1) {
				setLoading(true);
				const result = await contract.setWhitelistUsers(addresses);
				await result.wait();
				setLoading(false);
				toast.success("Change successfull", {
					position: "bottom-right",
				});
			}
			// _contractStatus();
		} catch (err) {
			setLoading(false);
			toast.error(err.message, {
				position: "bottom-right",
			});
		}
	};

	const _handleAddress = (e) => {
		var reader = new FileReader();
		reader.onload = onReaderLoad;
		reader.readAsText(e.target.files[0]);
	};

	function onReaderLoad(event) {
		var obj = JSON.parse(event.target.result);
		setAddresses(obj);
	}

	function createData(sl_no, address) {
		return {
			sl_no,
			address,
		};
	}

	console.log(addresses);

	return (
		<Box>
			<Backdrop
				sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1000 }}
				open={loading}
			>
				<CircularProgress color="inherit" />
			</Backdrop>
			<Typography variant="h3" fontSize={24} fontWeight="600">
				Add Whitelist
			</Typography>
			<Box
				component="form"
				sx={{ mt: 2, mb: 6, display: "block" }}
				onSubmit={_submit}
			>
				<input type="file" accept=".json" required onChange={_handleAddress} />
				<Button
					variant="contained"
					type="submit"
					sx={{ boxShadow: "none", ml: 2, py: 1, px: 3 }}
				>
					ADD
				</Button>
			</Box>
			<WhitelistTable
				rows={addresses.map((item, i) => createData(i + 1, item))}
			/>
		</Box>
	);
};

export default Whitelist;
