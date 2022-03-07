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
import WhitelistPage from "./pages/Whitelist";
import ConnectWallet from "./components/wallet/ConnectWallet";
import Install from "./components/install/Install";

// Context Provider
import AuthProvider from "./provider/AuthProvider";

// React Toastify Container
import { ToastContainer } from "react-toastify";

const theme = createTheme({
	typography: {
		fontFamily: ["Poppins", "san-serif"].join(","),
	},
});

function App() {
	if (!window.ethereum) {
		return <Install />;
	}

	return (
		<AuthProvider>
			<ToastContainer />
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
