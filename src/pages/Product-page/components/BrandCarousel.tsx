import React, { useRef } from "react";
import { MdNavigateBefore, MdNavigateNext } from "../../../import/import-libary";
import { Brand } from "../../../interfaces";
interface BrandCarouselProps {
  brandId: number;
  brandList: Brand[];
  handleBrand: (value: number) => void;
}

const BrandCarousel: React.FC<BrandCarouselProps> = ({
  brandId,
  brandList,
  handleBrand,
}) => {

  const getGridColumn = (index: number) => {
    const columns = 15;
    const start = 1 + (index % columns) * 2;
    const end = start + 1;
    return `${start} / ${end}`;

  };
//-----------------------------------------------------------------

  const containerRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollLeft -= 1200;
    }
  };

  const scrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollLeft += 1200;
    }
  };

  return (
    <>
      <button className="scroll-left" onClick={scrollLeft}>
        <MdNavigateBefore />
      </button>
      <div
        ref={containerRef}
        style={{
          overflow: "auto",
          zIndex: "0",
        }}
      >
        {brandList.map((brand, index) => (
          <div
            key={brand.brandId}
            className={`element-brand ${
              brandId === brand.brandId ? "active" : ""
            }`}
            style={{
              gridColumn: getGridColumn(index),
              zIndex: "0",
            }}
          >
            <img
              src={brand.imageBrandUrl}
              className="element-img-brand"
              alt=""
              onClick={() => handleBrand(brand.brandId)}
            />
          </div>
        ))}
      </div>
      <button className="scroll-right" onClick={scrollRight}>
        <MdNavigateNext />
      </button>
    </>
  );
};

export default BrandCarousel;
