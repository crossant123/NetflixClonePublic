import React, { useEffect, useState } from "react";
import "./Nav.css";
import { useNavigate } from "react-router-dom";

function Nav() {
	const [show, handleShow] = useState(false);

	//Navigate function for changing page based on history
	const navigate = useNavigate();

	//code below is responsible for effect on navbar
	const transitionNavBar = () => {
		if (window.scrollY > 100) {
			handleShow(true);
		} else {
			handleShow(false);
		}
	};

	useEffect(() => {
		window.addEventListener("scroll", transitionNavBar);
		return () => window.removeEventListener("scroll", transitionNavBar);
	}, []);

	return (
		<div className={`nav ${show && "nav_black"}`}>
			<div className="nav__content">
				<img
					onClick={() => {
						navigate("/");
					}}
					className="nav__logo"
					src="https://upload.wikimedia.org/wikipedia/commons/7/7a/Logonetflix.png"
					alt=""
				/>

				{/* Search */}
				<img
					onClick={() => {
						navigate("/profile");
					}}
					className="nav__avitar"
					src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/84c20033850498.56ba69ac290ea.png"
					alt=""
				/>
			</div>
		</div>
	);
}

export default Nav;
