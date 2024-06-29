import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useAllProduct } from "../context/ShopContext";
import { useCart } from "../pages/Cart-page/CartContext";
import swal from "sweetalert";
import swal2 from "sweetalert2";

export { useState, useEffect, useRef, useCallback, useNavigate, useParams, useLocation, useAllProduct, useCart, swal, swal2, useMemo };
