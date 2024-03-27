import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

/* This component handles the navigation and loading for a protected route based on the authentication status.
Children components are rendered when loading is complete and the user's authentication status is valid. */

export default function Protected({ children, authentication = true }) {
	const navigate = useNavigate();
	const [loader, setLoader] = useState(true);
	const authStatus = useSelector((state) => state.auth.status);

	// Navigate to the respective route (home or login) based on the authStatus
	useEffect(() => {
		/* //! make it more easy to understand

		if (authStatus === true) {
			navigate("/");
		} else if (authStatus === false) {
			navigate("/login");
		} */

		//let authValue = authStatus === true ? true : false

		if (authentication && authStatus !== authentication) {
			navigate("/login");
		} else if (!authentication && authStatus !== authentication) {
			navigate("/");
		}

		// Set the loader to false after the navigation is completed
		setLoader(false);
	}, [authStatus, navigate, authentication]);

	return loader ? <h1>Loading...</h1> : <>{children}</>;
}
