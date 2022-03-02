import { useState } from "react";
import "./styles/style.scss";
import "react-toastify/dist/ReactToastify.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Routes, Route } from "react-router-dom";

// layout
import AdminLayout from "./layouts/AdminLayout";

// pages & components
import HomePage from "./pages/Home";
import PreSalePage from "./pages/PreSale";
import PublicSalePage from "./pages/PublicSale";
import MintPage from "./pages/Mint";
import WhitelistPage from "./pages/Whitelist";
import AnnouncementPage from "./pages/Announcement";
import ConnectWallet from "./components/wallet/ConnectWallet";

// Context Provider
import AuthProvider from "./provider/AuthProvider";

const theme = createTheme({
	typography: {
		fontFamily: ["Poppins", "san-serif"].join(","),
	},
});

function App() {
	return (
		<AuthProvider>
			<ThemeProvider theme={theme}>
				<Routes>
					<Route
						path="/"
						element={
							<AdminLayout>
								<HomePage />
							</AdminLayout>
						}
					/>
					<Route path="/connect-wallet" element={<ConnectWallet />} />
					<Route
						path="/pre-sale"
						element={
							<AdminLayout>
								<PreSalePage />
							</AdminLayout>
						}
					/>
					<Route
						path="/public-sale"
						element={
							<AdminLayout>
								<PublicSalePage />
							</AdminLayout>
						}
					/>
					<Route
						path="/mint"
						element={
							<AdminLayout>
								<MintPage />
							</AdminLayout>
						}
					/>
					<Route
						path="/whitelist"
						element={
							<AdminLayout>
								<WhitelistPage />
							</AdminLayout>
						}
					/>
				</Routes>
			</ThemeProvider>
		</AuthProvider>
	);
}

export default App;
