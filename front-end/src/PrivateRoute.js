import { Route, Switch, Redirect } from "react-router-dom";
const PrivateRoute = ({ component: Component, user, ...rest }) => {
	const styles = {
		padding: "6rem 0 0 26rem",
		backgroundColor: "#181818",
		color: "#ffffff",
		minHeight: "calc(100vh - 6rem)",
	};

	return (
		<Switch>
		<Route
			{...rest}
			render={(props) =>
				user ?
				(
					<div style={styles}>
						<Component {...props} />
					</div>
				) : (
					<Redirect
						to={{ pathname: "/login", state: { from: props.location } }}
					/>
				)
			}
		/>
		</Switch>

	);
};

export default PrivateRoute;
