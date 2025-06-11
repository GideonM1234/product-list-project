import React, { useState, useEffect } from "react";
import "./Ppage.css";
import { productList } from "../List/list";
import addtoc from "../assets/images/icon-add-to-cart.svg";
import plus from "../assets/images/icon-increment-quantity.svg";
import minus from "../assets/images/icon-decrement-quantity.svg";
import emptycart from "../assets/images/illustration-empty-cart.svg";
import cancel from "../assets/images/icon-remove-item.svg";
import carbon from "../assets/images/icon-carbon-neutral.svg";
import check from "../assets/images/icon-order-confirmed.svg";

function Ppage() {
	const [showOrderConfirmation, setShowOrderConfirmation] = useState(false);

	const [addedItems, setAddedItems] = useState(() => {
		const storedItems = localStorage.getItem("cartItems");
		return storedItems ? JSON.parse(storedItems) : [];
	});

	useEffect(() => {
		localStorage.setItem("cartItems", JSON.stringify(addedItems));
		console.log("addedItems:", addedItems);
	}, [addedItems]);

	// Dim background when order confirmation is shown
	useEffect(() => {
		if (showOrderConfirmation) {
			document.body.classList.add("modal-active");
		} else {
			document.body.classList.remove("modal-active");
		}
	}, [showOrderConfirmation]);

	const handleAddToCart = (id, image, name, price) => {
		if (!isAdded(id)) {
			setAddedItems((prev) => [
				...prev,
				{
					id,
					name,
					price,
					image,
					count: 1,
					priceArray: [price],
				},
			]);
		}
	};

	const toggleOrderSection = () => {
		setShowOrderConfirmation(true);
	};

	const isAdded = (id) => addedItems.some((item) => item.id === id);

	const handleIncrement = (id) => {
		setAddedItems((prev) =>
			prev.map((item) =>
				item.id === id
					? {
							...item,
							count: item.count + 1,
							priceArray: [...item.priceArray, item.price],
					  }
					: item
			)
		);
	};

	const removeItem = (id) => {
		setAddedItems((prev) => prev.filter((item) => item.id !== id));
	};

	const handleDecrement = (id) => {
		setAddedItems((prev) =>
			prev
				.map((item) => {
					if (item.id === id) {
						const updatedCount = item.count - 1;
						const updatedPriceArray = item.priceArray.slice(0, -1);
						if (updatedCount === 0) return null;
						return {
							...item,
							count: updatedCount,
							priceArray: updatedPriceArray,
						};
					}
					return item;
				})
				.filter(Boolean)
		);
	};

	return (
		<section className="Desert-main-container">
			<h1 className="Dess">Desserts</h1>
			<br />

			<section className="Desert-flex">
				<section>
					<div className="dessert-grid">
						{productList.map((product) => {
							const cartItem = addedItems.find(
								(item) => item.id === product.id
							);
							return (
								<div key={product.id} className="product-card">
									<div>
										<img
											className={`pimg${
												isAdded(product.id)
													? " redline"
													: ""
											}`}
											src={
												product.image?.desktop ||
												"default-image-path.jpg"
											}
											alt={
												product.name || "Product Image"
											}
										/>
										<br />
										<div
											onClick={() =>
												handleAddToCart(
													product.id,
													product.image?.thumbnail ||
														product.image?.mobile ||
														product.image?.tablet ||
														product.image
															?.desktop ||
														"default-image-path.jpg",
													product.name,
													product.price
												)
											}
											className={
												!isAdded(product.id)
													? "add-style"
													: "added-style"
											}
										>
											{!isAdded(product.id) ? (
												<div>
													<span
														style={{
															display: "flex",
															gap: "5px",
															justifyContent:
																"center",
														}}
													>
														<img
															src={addtoc}
															alt=""
														/>
														Add to Cart
													</span>
												</div>
											) : (
												<div>
													<span className="add-dec-box">
														<div
															className="btn-tg-div"
															onClick={() =>
																handleDecrement(
																	product.id
																)
															}
														>
															<img
																className="min"
																src={minus}
																alt=""
															/>
														</div>
														<div>
															<p>
																{cartItem?.count ||
																	1}
															</p>
														</div>
														<div
															className="btn-tg-div"
															onClick={() =>
																handleIncrement(
																	product.id
																)
															}
														>
															<img
																className="plus"
																src={plus}
																alt=""
															/>
														</div>
													</span>
												</div>
											)}
										</div>
									</div>
									<small className="product-category">
										{product.category}
									</small>
									<h2 className="product-name">
										{product.name}
									</h2>
									<p className="product-price">
										${product.price.toFixed(2)}
									</p>
								</div>
							);
						})}
					</div>
				</section>

				<section>
					<div className="cart-container">
						<h5>
							Your Cart (
							{addedItems.reduce(
								(total, item) => total + item.count,
								0
							)}
							)
						</h5>
						<br />
						{addedItems.length === 0 ? (
							<>
								<img
									src={emptycart}
									className="emptycartimg"
									alt="empty Cart"
								/>
								<small className="addnot-info">
									Your added items will be added here
								</small>
							</>
						) : (
							<div>
								{addedItems.map((item) => (
									<div key={item.id} className="cart-item">
										<div className="itn-cont">
											<small className="it-name">
												{item.name}
											</small>
											<div className="itner">
												<span>
													<small>{item.count}x</small>
												</span>
												<span>
													<small>
														@{" "}
														{item.price.toFixed(2)}
													</small>
												</span>
												<span>
													<small>
														$
														{item.priceArray
															.reduce(
																(sum, p) =>
																	sum + p,
																0
															)
															.toFixed(2)}
													</small>
												</span>
											</div>
										</div>

										<div
											onClick={() => removeItem(item.id)}
											className="remove-item"
										>
											<img src={cancel} alt="Remove" />
										</div>
									</div>
								))}
								<div>
									<br />
									<span className="tt-cont">
										<small>Order Total</small>
										<h1>
											$
											{addedItems
												.reduce(
													(acc, item) =>
														acc +
														item.price * item.count,
													0
												)
												.toFixed(2)}
										</h1>
									</span>
								</div>
								<br />
								<div className="carb-cont">
									<span>
										<img src={carbon} alt="" /> This is a{" "}
										<span className="carb">
											carbon-neutral
										</span>{" "}
										delivery
									</span>
								</div>
								<br />
								<div className="btn-confirm">
									<button className="btn-confirm-btn" onClick={toggleOrderSection}>
										Confirm Order
									</button>
								</div>
							</div>
						)}
					</div>
				</section>
			</section>

			{/* Dim background when order is confirmed */}
			{showOrderConfirmation && (
				<div className="dim-background show">
					<section
						className={`ord-com-sect`}
					>
						<div className="ordDcont">
							<div className="ord-com-head">
								<img src={check} alt="" />
								<br />
								<h2>Order Confirmed</h2>
								<small>We hope you enjoy your food!</small>
							</div>
							<br />
							<div className="ord-com-conts">
								{addedItems.map((item) => (
									<div className="ord-com-cont">
										<div
											className="ord-com-item-cont"
											key={item.id}
										>
											<div className="ord-com-item">
												<div>
													<img
														src={item.image}
														alt=""
													/>
												</div>
												<div>
													<div>
														<small className="it-name">
															{item.name}
														</small>
													</div>
													<div className="prevs">
														<span>
															<small>
																{item.count}x
															</small>
														</span>
														<span>
															<small>
																@
																{item.priceArray
																	.reduce(
																		(
																			sum,
																			p
																		) =>
																			sum +
																			p,
																		0
																	)
																	.toFixed(2)}
															</small>
														</span>
													</div>
												</div>
											</div>
										</div>
										<div className="price-num">
											<p>${item.price.toFixed(2)}</p>
										</div>
									</div>
								))}{" "}
								<br />
								<div className="ttotal">
									<div>
										<p>Order Total</p>
									</div>
									<div>
										<h1>
											$
											{addedItems
												.reduce(
													(acc, item) =>
														acc +
														item.price * item.count,
													0
												)
												.toFixed(2)}
										</h1>
									</div>
								</div>
							</div>
						</div>
						<br />
						<div>
							<button
								onClick={() => {
									setShowOrderConfirmation(false);
									setAddedItems([]);
								}}
								className="new-order-btn"
							>
								Start New Order
							</button>
						</div>
					</section>
				</div>
			)}
		</section>
	);
}

export default Ppage;
