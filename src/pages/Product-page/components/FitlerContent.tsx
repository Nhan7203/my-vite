import React from 'react'
import { Brand, ageOptions, categoryOptions } from '../../../interfaces'

interface FitlerContentProps {
    brandId: number
    forAgeId: number   
    categoryId: number
    brandList: Brand[]
    handleAgeChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    handleBrandChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    handleCategoryChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  }

const FitlerContent: React.FC<FitlerContentProps> = ({
    brandId,
    forAgeId,
    categoryId,
    brandList,
    handleAgeChange,
    handleBrandChange,
    handleCategoryChange,
  }) => {
  return (
    <div className="all-filter">
              <div className="content-filter-head">

                <p className="text-cate">Category</p>
                <div className="content-cate">
                {categoryOptions.map((category) => (
                      <ul key={category.id}>
                        <li>
                          <input
                            type="checkbox"
                            value={category.id}
                            checked={categoryId === category.id}
                            onChange={handleCategoryChange}
                          />
                        </li>
                        <li>
                          <span>{category.name}</span>
                        </li>
                      </ul>
                    ))}
                </div>

                <div className="content-filter-age">
                  <p className="text-fotage">For age</p>
                  <div className="content-cate">
                  {ageOptions.map((age) => (
                      <ul key={age.id}>
                        <li>
                          <input
                            type="checkbox"
                            value={age.id}
                            checked={forAgeId === age.id}
                            onChange={handleAgeChange}
                          />
                        </li>
                        <li>
                          <span>{age.name}</span>
                        </li>
                      </ul>
                    ))}
                  </div>
                </div>
                
                <div className="content-filter-brand">
                  <p className="text-brand">For brand</p>
                  <div className="content-cate">
                    {brandList.map((brand) => (
                      <ul key={brand.brandId}>
                        <li>
                          <input
                            type="checkbox"
                            value={brand.brandId}
                            checked={brandId === brand.brandId}
                            onChange={handleBrandChange}
                          />
                        </li>
                        <li>
                          <span>{brand.name}</span>
                        </li>
                      </ul>
                    ))}
                  </div>
                </div>

                <div className="filter-under-line"></div>
              </div>
            </div>
  )
}

export default FitlerContent