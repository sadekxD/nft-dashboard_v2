import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import SideNavigation from "../components/sidebar/SideNavigation";
import { Backdrop, Button, CircularProgress } from "@mui/material";
import { AuthContext } from "../provider/AuthProvider";

// React Toastify
import { toast } from "react-toastify";

// Ether Js
import { ethers } from "ethers";

// ABI
import DegenHeroesABI from "../abi/DegenHeroesABI.json";

const drawerWidth = 320;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
	({ theme, open }) => ({
		flexGrow: 1,
		padding: theme.spacing(3),
		transition: theme.transitions.create("margin", {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
		marginLeft: `-${drawerWidth}px`,
		...(open && {
			transition: theme.transitions.create("margin", {
				easing: theme.transitions.easing.easeOut,
				duration: theme.transitions.duration.enteringScreen,
			}),
			marginLeft: 0,
		}),
	})
);

const AppBar = styled(MuiAppBar, {
	shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
	transition: theme.transitions.create(["margin", "width"], {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	...(open && {
		width: `calc(100% - ${drawerWidth}px)`,
		marginLeft: `${drawerWidth}px`,
		transition: theme.transitions.create(["margin", "width"], {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen,
		}),
	}),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
	display: "flex",
	alignItems: "center",
	padding: theme.spacing(0, 1),
	// necessary for content to be below app bar
	...theme.mixins.toolbar,
	justifyContent: "flex-end",
}));

export default function AdminLayout({ children }) {
	const { owner, contractAddress } = React.useContext(AuthContext);
	const theme = useTheme();
	const [open, setOpen] = React.useState(false);
	const [loading, setLoading] = React.useState(false);

	React.useEffect(() => {
		const _resize = () => {
			if (window.innerWidth >= 1200) {
				setOpen(true);
			} else {
				setOpen(false);
			}
		};

		window.addEventListener("load", _resize);
		window.addEventListener("resize", _resize);
	}, []);

	const handleDrawerOpen = () => {
		setOpen(true);
	};

	const handleDrawerClose = () => {
		setOpen(false);
	};

	// Widraw Funds
	const _withdraw = async () => {
		const provider = new ethers.providers.Web3Provider(window.ethereum);
		const signer = provider.getSigner();
		const contract = new ethers.Contract(
			contractAddress,
			DegenHeroesABI,
			signer
		);

		try {
			setLoading(true);
			const result = await contract.withDraw();
			await result.wait();
			setLoading(false);
			toast.success("Funds withdraw successful", {
				position: "bottom-right",
			});
		} catch (err) {
			setLoading(false);
			toast.error(err.message, {
				position: "bottom-right",
			});
		}
	};

	return (
		<Box sx={{ display: "flex" }}>
			<Backdrop
				sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
				open={loading}
			>
				<CircularProgress color="inherit" />
			</Backdrop>
			<CssBaseline />
			<AppBar
				position="fixed"
				sx={{
					backgroundColor: "#fff",
					boxShadow: "none",
				}}
				open={open}
			>
				<Toolbar>
					<Toolbar
						sx={{
							height: 80,
							flex: 1,
							display: "flex",
							justifyContent: "space-between",
						}}
					>
						<IconButton
							size="large"
							edge="start"
							color="inherit"
							aria-label="menu"
							onClick={handleDrawerOpen}
							sx={{ mr: 2, color: "#000", ...(open && { display: "none" }) }}
						>
							<MenuIcon />
						</IconButton>
						<Typography
							variant="h6"
							component="div"
							color="#000"
							sx={{ flexGrow: 1 }}
						></Typography>
						<Box
							variant="contained"
							sx={{
								width: 200,
								height: 50,
								borderRadius: 30,
								px: 2,
								border: "1px solid rgba(0,0,0,.1)",
								display: "flex",
								alignItems: "center",
								cursor: "pointer",
								"&::before": {
									content: '""',
									height: 12,
									minWidth: 12,
									width: 12,
									mr: 1,
									borderRadius: "50%",
									backgroundColor: "limegreen",
								},
								color: "rgba(0, 0, 0, .87)",
							}}
						>
							<Typography fontSize={12}>{owner?.slice(0, 18)} ...</Typography>
						</Box>
					</Toolbar>
				</Toolbar>
			</AppBar>
			<Drawer
				sx={{
					width: drawerWidth,
					flexShrink: 0,
					"& .MuiDrawer-paper": {
						width: drawerWidth,
						boxSizing: "border-box",
					},

					".MuiPaper-root": {
						overflow: "hidden",
					},
				}}
				variant="persistent"
				anchor="left"
				open={open}
			>
				<DrawerHeader>
					<IconButton
						size="large"
						sx={{ color: "#000" }}
						onClick={handleDrawerClose}
					>
						{theme.direction === "ltr" ? (
							<ChevronLeftIcon />
						) : (
							<ChevronRightIcon />
						)}
					</IconButton>
				</DrawerHeader>
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
						onClick={_withdraw}
					>
						Withdraw Funds
					</Button>
				</Box>
			</Drawer>
			<Main open={open}>
				<DrawerHeader />
				<Box sx={{ p: 6 }}>{children}</Box>
			</Main>
		</Box>
	);
}
