import React, { useState } from "react";
import "./Ppage.css";
import { productList } from "../List/list";
import addtoc from "../assets/images/icon-add-to-cart.svg";
import plus from "../assets/images/icon-increment-quantity.svg";
import minus from "../assets/images/icon-decrement-quantity.svg";
import emptycart from "../assets/images/illustration-empty-cart.svg"
function Ppage() {
	const [addedItems, setAddedItems] = useState([]);
	const [productCounts, setProductCounts] = useState({});
    const [addcart, setaddcart] = useState(0)
	  
	const handleAddToCart = (id, name, price) => {
		setAddedItems((prev) => {
			const updated = [...prev, { id, name, price }];
			console.log("Cart now:", updated);
			return updated;
		});
	};

	const isAdded = (id) => addedItems.some((item) => item.id === id);

	const handleIncrement = (id) => {
		setProductCounts((prev) => ({
			...prev,
			[id]: (prev[id] || 1) + 1,
		}));
	};

	const handleDecrement = (id) => {
		setProductCounts((prev) => ({
			...prev,
			[id]: Math.max((prev[id] || 1) - 1, 1),
		}));
	};

	return (
		<section className="Desert-main-container">
			<h1 className="Dess">Desserts</h1>
			<br />

			<section className="Desert-flex">
				<section>
					<div className="dessert-grid">
						{productList.map((product) => (
							<div key={product.id} className="product-card">
								<div>
									<img
										className="pimg"
										src={
											product.image?.desktop ||
											"default-image-path.jpg"
										}
										alt={product.name || "Product Image"}
									/>
									<br />

									{/* Add to Cart Div */}
									<div
										onClick={() =>
											handleAddToCart(
												product.id,
												product.name,
												product.price.toFixed(2)
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
													<img src={addtoc} alt="" />
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
															{productCounts[
																product.id
															] || 1}
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
								<h2 className="product-name">{product.name}</h2>
								<p className="product-price">
									${product.price.toFixed(2)}
								</p>
							</div>
						))}
					</div>
				</section>

				<section>
					<div>
						<h5>Your Cart ({addcart}) </h5><br />
						<img src={emptycart} alt="empty Cart" />
						<small>Your added items will be added here</small>
					</div>
				</section>
			</section>
		</section>
	);
}

export default Ppage;
