import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import swal from "sweetalert";
import swal2 from "sweetalert2";
import { useCart } from "../pages/Cart-page/CartContext";
import { useAllProduct } from "../context/ShopContext";
export { useState, useEffect, useNavigate, useParams, useAllProduct, useCart, swal, swal2 };
