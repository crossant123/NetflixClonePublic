import React, { useRef } from "react";
import "./SignInScreen.css";
import { auth } from "../firebase";
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
} from "firebase/auth";

function SignInScreen() {
	const emailRef = useRef(null);
	const pwRef = useRef(null);

	const register = (e) => {
		e.preventDefault();

		createUserWithEmailAndPassword(
			auth,
			emailRef.current.value,
			pwRef.current.value
		)
			.then((authUser) => {})
			.catch((error) => {
				alert(error.message);
			});
	};
	const signIn = (e) => {
		e.preventDefault();

		signInWithEmailAndPassword(
			auth,
			emailRef.current.value,
			pwRef.current.value
		)
			.then((authUser) => {})
			.catch((error) => {
				alert(error.message);
			});
	};

	return (
		<div className="SignInScreen">
			<form>
				<h1>Sign In</h1>
				<input
					ref={emailRef}
					autoComplete="email"
					placeholder="Email Address"
					type="email"
				/>
				<input
					ref={pwRef}
					autoComplete="current-password"
					placeholder="Password"
					type="password"
				/>
				<button onClick={signIn} type="submit">
					Sign In
				</button>

				<h4>
					<span className="SignInScreen__grey">New to Netflix? </span>
					<span className="SignInScreen__link" onClick={register}>
						Sign Up now.
					</span>
				</h4>
			</form>
		</div>
	);
}

export default SignInScreen;
