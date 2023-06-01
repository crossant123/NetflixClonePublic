import React, { useEffect, useState } from "react";
import "./PlansScreen.css";
import {
	collection,
	getDocs,
	query,
	addDoc,
	where,
	onSnapshot,
} from "firebase/firestore";
import firestore from "../firebase.js";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice.js";
import { loadStripe, createCheckoutSession } from "@stripe/stripe-js";

function PlansScreen() {
	const [products, setProducts] = useState([]);
	const [subscription, setSubscription] = useState(null);
	const [prices, setPrices] = useState([]);
	const user = useSelector(selectUser);

	useEffect(() => {
		//This needs to be trimmed with query for active products
		const productsRef = collection(firestore, "products");
		const activeProductsQuery = query(productsRef, where("active", "==", true));
		const querySnapshot = getDocs(activeProductsQuery);

		querySnapshot.then((ProductSnap) => {
			const products = {};
			ProductSnap.forEach(async (productDoc) => {
				products[productDoc.id] = productDoc.data();

				//Area Handles Price Collection
				//prices must be iterated to get any amount of prices
				//Price must be added to products as value
				//
				const priceRef = collection(productDoc.ref, "prices");
				const priceQuery = query(priceRef);
				const priceQuerySnapshot = getDocs(priceQuery);
				priceQuerySnapshot.then((pricesSnap) => {
					const prices = [];
					products[productDoc.id].prices = prices;
					pricesSnap.forEach((priceDoc) => {
						prices.push({
							priceId: priceDoc.id,
							priceData: priceDoc.data(),
						});
					});
				});
			});
			setProducts(products);
		});
	}, []);

	useEffect(() => {
		const subscriptionsRef = collection(
			firestore,
			"customers",
			user.uid,
			"subscriptions"
		); //copyable statement for grabbing subcollections using v9
		const subscriptionsQuery = query(subscriptionsRef); //how to setup query with statements using v9
		const subscriptionsQuerySnapshot = getDocs(subscriptionsQuery); //get function can use query or extends using just references +
		//vvvvv Data manipulation here vvvvv
		const getSubscriptionData = async () => {
			subscriptionsQuerySnapshot.then((subscriptionsSnap) => {
				subscriptionsSnap.forEach(async (subscription) => {
					setSubscription({
						role: subscription.data().role,
						current_period_end: subscription.data().current_period_end.seconds,
						current_period_start:
							subscription.data().current_period_start.seconds,
					});
				});
			});
		};
		getSubscriptionData();
	}, [user.uid]);

	const loadCheckout = async (priceId) => {
		//init stripe
		const stripe = loadStripe(process.env.REACT_APP_STRIPE_API_KEY);

		const checkoutSessionsCollection = collection(
			firestore,
			"customers",
			user.uid,
			"checkout_sessions"
		);
		const docRef = await addDoc(checkoutSessionsCollection, {
			price: priceId,
			success_url: window.location.origin,
			cancel_url: window.location.origin,
		});

		onSnapshot(docRef, (snap) => {
			const { error, url } = snap.data();
			console.log(url);
			if (error) {
				//Show an error to customer
				//Check cloud function logs in the firebase console
				alert(`Oops, It broke here:  ${error.message}`);
			}
			if (url) {
				window.location.replace(url);
			}
		});
	};

	return (
		<div className="PlansScreen">
			{Object.entries(products).map(([productId, productData]) => {
				//TODO: Add some logic
				const isCurrentPackage = productData.name
					?.toLowerCase()
					.includes(subscription?.role);

				return (
					<div className="planScreen__plan">
						<div className="planscreen__info">
							<h5>{productData.name}</h5>
							<h6>{productData.description}</h6>
						</div>
						{/* Could Create a different button that shows a button for each price */}
						{/* Could Show a modal of all prices for the product clicked */}
						{/* Could see if stripe has a way to set up the checkout page with the different price options and order data in table*/}

						<button
							onClick={
								() =>
									!isCurrentPackage &&
									loadCheckout(productData.prices?.[0].priceId)
								//console.log(productData.prices?.[0].priceId)
							}
						>
							{isCurrentPackage ? "Current Package" : "subscribe"}
						</button>
					</div>
				);
			})}
		</div>
	);
}

export default PlansScreen;
