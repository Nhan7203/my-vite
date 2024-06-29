import { getBrand } from "../../../apiServices/BrandServices/brandServices";
import { search } from "../../../apiServices/ProductServices/productServices";
import { useEffect, useLocation, useState } from "../../../import/import-another";
import { Brand, aProduct } from "../../../interfaces";

const useProductFilter = () => {
    const location = useLocation();
    const [orderBy, setOrderBy] = useState('');
    const [brandId, setBrandId] = useState<number>(0);
    const [activeOrder, setActiveOrder] = useState('');
    const [forAgeId, setForAgeId] = useState<number>(0);
    const [categoryId, setCategoryId] = useState<number>(0);
    const [products, setProducts] = useState<aProduct[]>([]);
    const [isBrandChecked, setIsBrandChecked] = useState(false);
    const [isForAgeChecked, setIsForAgeChecked] = useState(false);
    const [isCategoryChecked, setIsCategoryChecked] = useState(false);
    const [brandList, setBrandList] = useState<Brand[]>([]);
  
    useEffect(() => {
      const fetchProductsByFilter = async () => {
        const queryParams = new URLSearchParams();
  
        if (isCategoryChecked && categoryId !== 0) {
          queryParams.append('categoryId', categoryId.toString());
        }
  
        if (isForAgeChecked && forAgeId !== 0) {
          queryParams.append('forAgeId', forAgeId.toString());
        }
  
        if (isBrandChecked && brandId !== 0) {
          queryParams.append('brandId', brandId.toString());
        }
  
        if (orderBy === 'price') {
          queryParams.append('orderBy', 'price');
        } else if (orderBy === 'priceDesc') {
          queryParams.append('orderBy', 'priceDesc');
        }
  
        if (location.state && location.state.query) {
          queryParams.append('search', location.state.query);
        }
  
        const response = await search(queryParams);
        setProducts(response);
      };
      fetchProductsByFilter();
    }, [
      orderBy,
      brandId,
      forAgeId,
      categoryId,
      isBrandChecked,
      location.state,
      isForAgeChecked,
      isCategoryChecked,
    ]);
  
    useEffect(() => {
      const fetchData = async () => {
        const result = await getBrand();
        setBrandList(result);
      };
      fetchData();
    }, []);
  
    const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      if (e.target.checked) {
        setCategoryId(Number(value));
        setIsCategoryChecked(true);
      } else {
        setCategoryId(0);
        setIsCategoryChecked(false);
      }
    };
  
    const handleBrandChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      if (e.target.checked) {
        setBrandId(Number(value));
        setIsBrandChecked(true);
      } else {
        setBrandId(0);
        setIsBrandChecked(false);
      }
    };
  
    const handleBrand = (value: number) => {
      setBrandId(brandId);
      handleBrandChange({
        target: { value: String(value), checked: value !== 0 },
      } as React.ChangeEvent<HTMLInputElement>);
    };
  
    const handleAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      if (e.target.checked) {
        setForAgeId(Number(value));
        setIsForAgeChecked(true);
      } else {
        setForAgeId(0);
        setIsForAgeChecked(false);
      }
    };
  
    const handleOrderChange = (value: string) => {
      if (value === 'price') {
        setOrderBy('price');
        setActiveOrder('price');
      } else if (value === 'priceDesc') {
        setOrderBy('priceDesc');
        setActiveOrder('priceDesc');
      } else {
        setOrderBy('');
        setActiveOrder('');
      }
    };
  
    return {
      products,
      brandList,
      brandId,
      activeOrder,
      forAgeId,
      categoryId,
      handleCategoryChange,
      handleBrandChange,
      handleBrand,
      handleAgeChange,
      handleOrderChange,
    };
  };
  
  export default useProductFilter;