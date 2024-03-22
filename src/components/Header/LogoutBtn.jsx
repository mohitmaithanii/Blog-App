import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth";
import { logout } from "../../store/authSlice";

function LogoutBtn() {
	const dispatch = useDispatch();

	// Define a function called logoutHandler that will be called when the Logout button is clicked
	const logoutHandler = () => {
		// Call the logout function from the authService to log out the user
		authService.logout().then(() => {
			dispatch(logout());
		});
	};
	return (
		<button
			className="px-6 py-2 duration-200 rounded-full inline-bock hover:bg-blue-100"
			onClick={logoutHandler}
		>
			Logout
		</button>
	);
}

export default LogoutBtn;
