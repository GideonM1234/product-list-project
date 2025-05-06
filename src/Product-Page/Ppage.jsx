import React, { useState } from "react";
import "./Ppage.css";
import { productList } from "../List/list";
import addtoc from "../assets/images/icon-add-to-cart.svg";
import plus from "../assets/images/icon-increment-quantity.svg";
import minus from "../assets/images/icon-decrement-quantity.svg";
import emptycart from "../assets/images/illustration-empty-cart.svg";

function Ppage() {
	const [addedItems, setAddedItems] = useState([]);

	const handleAddToCart = (id, name, price) => {
		if (!isAdded(id)) {
			setAddedItems((prev) => [
				...prev,
				{
					id,
					name,
					price,
					count: 1,
					priceArray: [price],
				},	
			]);
		}
	};
	
	const isAdded = (id) => addedItems.some((item) => item.id === id);
	console.log('Added to cart:',  addedItems);

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

	const handleDecrement = (id) => {
		setAddedItems(
			(prev) =>
				prev
					.map((item) => {
						if (item.id === id) {
							const updatedCount = item.count - 1;
							const updatedPriceArray = item.priceArray.slice(
								0,
								-1
							);
							if (updatedCount === 0) return null; // remove item
							return {
								...item,
								count: updatedCount,
								priceArray: updatedPriceArray,
							};
						}
						return item;
					})
					.filter(Boolean) // remove nulls
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
											className="pimg"
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
					<div>
						<h5>Your Cart ({addedItems.length})</h5>
						<br />
						{addedItems.length === 0 ? (
							<>
								<img src={emptycart} alt="empty Cart" />
								<small>
									Your added items will be added here
								</small>
							</>
						) : (
							<ul>
								{addedItems.map((item) => (
									<li key={item.id}>
										{item.name} × {item.count} — Total: $
										{item.priceArray
											.reduce((sum, p) => sum + p, 0)
											.toFixed(2)}
									</li>
								))}
							</ul>
						)}
					</div>
				</section>
			</section>
		</section>
	);
}

export default Ppage;
