import { useState, useEffect, useCallback, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAllProduct } from "../context/ShopContext";
import { useCart } from "../pages/Cart-page/CartContext";
import swal from "sweetalert";
import swal2 from "sweetalert2";

export { useState, useEffect, useCallback, useNavigate, useParams, useAllProduct, useCart, swal, swal2, useMemo };
