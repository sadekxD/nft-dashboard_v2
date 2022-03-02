import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import DraftsIcon from "@mui/icons-material/Drafts";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const NavigationItem = ({ route, title, icon, disabled = false, ...props }) => {
	const [active, setActive] = useState(false);
	return (
		<>
			{!disabled ? (
				<NavLink to={route || "/"} className="nav-link">
					<ListItemButton className="nav-item" {...props}>
						<ListItemIcon>{icon || <DraftsIcon />}</ListItemIcon>
						<ListItemText
							sx={{
								".MuiListItemText-primary": {
									fontWeight: active ? 600 : 500,
								},
							}}
							primary={title || "Test"}
						/>
					</ListItemButton>
				</NavLink>
			) : (
				<ListItemButton className="nav-item" {...props}>
					<ListItemIcon>{icon || <DraftsIcon />}</ListItemIcon>
					<ListItemText
						sx={{
							".MuiListItemText-primary": {
								fontWeight: active ? 600 : 500,
							},
						}}
						primary={title || "Test"}
					/>
				</ListItemButton>
			)}
		</>
	);
};

export default NavigationItem;
