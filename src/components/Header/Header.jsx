import { Container, Logo, LogoutBtn } from "../index";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Header() {
	// Use the useSelector hook to get the authStatus from the Redux store
	const authStatus = useSelector((state) => state.auth.status);

	// Use the useNavigate hook to navigate to different pages
	const navigate = useNavigate();

	// Define an array of navigation items
	const navItems = [
		{
			name: "Home",
			slug: "/",
			active: true,
		},
		{
			name: "Login",
			slug: "/login",
			active: !authStatus,
		},
		{
			name: "Signup",
			slug: "/signup",
			active: !authStatus,
		},
		{
			name: "All Posts",
			slug: "/all-posts",
			active: authStatus,
		},
		{
			name: "Add Post",
			slug: "/add-post",
			active: authStatus,
		},
	];

	return (
		<header className="py-3 bg-gray-500 shadow">
			<Container>
				<nav className="flex">
					<div className="mr-4">
						<Link to="/">
							<Logo width="70px" />
						</Link>
					</div>
					<ul className="flex ml-auto">
						{navItems.map(
							(item) =>
								item.active ? ( // If item is active
									<li key={item.name}>
										<button
											onClick={() => navigate(item.slug)}
											className="px-6 py-2 duration-200 rounded-full inline-bock hover:bg-blue-100"
										>
											{item.name}
										</button>
									</li>
								) : null // Otherwise, don't render anything
						)}
						{/* If user is authenticated */}
						{authStatus && (
							<li>
								<LogoutBtn />
							</li>
						)}
					</ul>
				</nav>
			</Container>
		</header>
	);
}

export default Header;
