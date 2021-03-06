import { ethers } from "ethers";
import { toast } from "react-toastify";
import React, { createContext, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
	const navigate = useNavigate();
	const { pathname } = useLocation();

	const [connected, setConnected] = useState(false);
	const owner = "0xB6aa5D4d08D74705d7bc4ce3a3b6E58aAE92121F";
	const contractAddress = "0x3Be229cc191d08dCf9737646cb89C0604eBB7b54";

	useEffect(() => {
		checkWalletConnected();
	}, [pathname]);

	useEffect(() => {
		window.ethereum.on("accountsChanged", async () => {
			navigate("/connect-wallet");
		});
	}, [window]);

	const checkWalletConnected = async () => {
		const { ethereum } = window;
		const accounts = await ethereum.request({ method: "eth_accounts" });
		const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
		const { chainId } = await provider.getNetwork();
		if (accounts.length > 0) {
			if (chainId === 1) {
				if (accounts.includes(owner.toLowerCase())) {
					return navigate(pathname);
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

	return (
		<AuthContext.Provider
			value={{ owner, connected, setConnected, contractAddress }}
		>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthProvider;
