import * as React from "react";
import List from "@mui/material/List";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import SendIcon from "@mui/icons-material/Send";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import StarBorder from "@mui/icons-material/StarBorder";
import HomeIcon from "@mui/icons-material/Home";
import NavigationItem from "./NavigationItem";
import { Box } from "@mui/system";

const SideNavigation = () => {
	const [open, setOpen] = React.useState(true);

	const handleClick = () => {
		setOpen(!open);
	};

	return (
		<List
			sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
			component="nav"
			aria-labelledby="nested-list-subheader"
		>
			<NavigationItem
				icon={
					<Box
						sx={{
							height: 12,
							width: 12,
							backgroundColor: "primary.main",
							borderRadius: "50%",
						}}
					></Box>
				}
				sx={{ pl: 4, py: 2 }}
				title="Home"
				route="/"
			/>

			<NavigationItem
				sx={{ pl: 4, py: 2 }}
				onClick={handleClick}
				icon={
					<Box
						sx={{
							height: 12,
							width: 12,
							backgroundColor: "primary.main",
							borderRadius: "50%",
						}}
					></Box>
				}
				title="Sales"
				disabled={true}
			>
				{open ? <ExpandLess /> : <ExpandMore />}
			</NavigationItem>
			<Collapse in={open} timeout="auto" unmountOnExit>
				<List component="div" disablePadding>
					<NavigationItem
						icon={
							<Box
								sx={{
									height: 12,
									width: 12,
									backgroundColor: "primary.main",
									borderRadius: "50%",
								}}
							></Box>
						}
						sx={{ pl: 8, py: 2 }}
						title="Pre Sale"
						route="/pre-sale"
					/>
					<NavigationItem
						icon={
							<Box
								sx={{
									height: 12,
									width: 12,
									backgroundColor: "primary.main",
									borderRadius: "50%",
								}}
							></Box>
						}
						sx={{ pl: 8, py: 2 }}
						title="Public Sale"
						route="/public-sale"
					/>
				</List>
			</Collapse>
			<NavigationItem
				icon={
					<Box
						sx={{
							height: 12,
							width: 12,
							backgroundColor: "primary.main",
							borderRadius: "50%",
						}}
					></Box>
				}
				sx={{ pl: 4, py: 2 }}
				title="Whitelist"
				route="/whitelist"
			/>
		</List>
	);
};

export default SideNavigation;
