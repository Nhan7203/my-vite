import React from "react";
import './ProductDetail.css';
import Footer from "../../components/Footer/footer";
import Navbar from "../../components/Navbar/Navbar";

const ProductDetail = () => {
    return (
        <>
            <Navbar />
            <div className="body-detail">

                <div className="grid-12">
                    <div className="big-image">
                        <img src="" alt="" />
                    </div>
                    <div className="content-product">
                        <p className="name-pro">Meiji Growing up Formula</p>
                        <div className="rating-sold">
                            <span className="sold">Available: 1</span>
                        </div>

                        <h3>1,003.87
                            <span>$</span>
                        </h3>
                        <div className="trans-zalo">
                            <div className="img-zalo">
                                <img src="" alt="" />
                            </div>

                            <span>30,000 VND discount for orders from 900,000 VND when entering code ZLPYEUCON to pay with ZaloPay wallet</span>
                        </div>
                        <div className="quantity-content">
                            <span>Quantity</span>
                            <div>
                                <div id="btMinus">
                                    <img src="./src/assets/minus.svg" alt="" />
                                </div>

                                <span id="quantity">1</span>
                                <div id="btPlus">
                                    <img src="./src/assets/plus.svg" alt="" />
                                </div>
                            </div>

                        </div>

                        <div className="button-cart">
                            <span id="add-cart">Add to cart</span>
                            <span className="buy-now">Buy now</span>
                        </div>

                    </div>

                    <img className="img-1" src="" alt="" />
                    <img className="img-2" src="" alt="" />
                    <img className="img-3" src="" alt="" />



                </div>

                <div className="reiew">
                    <p>Reviews</p>
                    <div className="uder-line"></div>
                    <div className="vote-star">
                        <div>
                            <div>
                                <p>5.0</p>
                                <p>
                                    <img className="star" src="" alt="" />
                                </p>
                                <p>Có 154 lượt đánh giá</p>
                            </div>

                            <div className="choose-vote">
                                <div className="5-start">
                                    5
                                    <img src="" alt="" />
                                </div>

                                <div className="5-start">
                                    4
                                    <img src="" alt="" />
                                </div>

                                <div className="5-start">
                                    3
                                    <img src="" alt="" />
                                </div>

                                <div className="5-start">
                                    2
                                    <img src="" alt="" />
                                </div>

                                <div className="5-start">
                                    1
                                    <img src="" alt="" />
                                </div>

                            </div>
                        </div>
                    </div>

                    <div className="comment">
                        <div className="person">
                            <div className="avatar">
                                <img src=" " alt="" />
                            </div>
                            <p>Nhan</p>
                            <div>
                                <img src=" " alt="" />
                                <span>17/05/2024</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </>

    )

}

export default ProductDetail;