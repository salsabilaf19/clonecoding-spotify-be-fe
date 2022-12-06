import { Route, Routes, Navigate } from "react-router-dom";

const PrivateRoute = ({ component: Component, user, ...rest }) => {
	const styles = {
		padding: "6rem 0 0 26rem",
		backgroundColor: "#181818",
		color: "#ffffff",
		minHeight: "calc(100vh - 6rem)",
	};

	return (
		<Routes>
		
		<Route
			{...rest}
			render={(props) =>
				user ?
				(
					<div style={styles}>
						<Component {...props} />
					</div>
				) : (
					<Navigate
						to={{ pathname: "/login", state: { from: props.location } }}
					/>
				)
			}
		/>
		</Routes>

	);
};

export default PrivateRoute;
