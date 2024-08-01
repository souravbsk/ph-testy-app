import React from "react";
import { useGetAllCountryCategoryQuery } from "../../ReduxStore/api/ViewRequestApi";

const RecipeFilter = ({
  searchTerm,
  onSearchChange,
  selectedCountry,
  onCountryChange,
  selectedCategory,
  onCategoryChange,
}) => {
  const { data, isLoading, isError, error } = useGetAllCountryCategoryQuery();

  return (
    <div className="md:my-8 my-4">
      <form className="flex md:flex-row flex-col md:items-center  gap-4 justify-between">
        <div className="form-control">
          <label className="input input-bordered flex items-center gap-2">
            <input
              type="text"
              className="grow"
              placeholder="Search"
              value={searchTerm}
              onChange={onSearchChange}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-4 h-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                clipRule="evenodd"
              />
            </svg>
          </label>
        </div>
        <div className="form-control">
          <div className="flex items-center gap-4">
            <select
              className="select select-bordered w-full"
              value={selectedCountry}
              onChange={onCountryChange}
            >
              <option value="">Select Country</option>
              {data?.data?.countryNames?.map((country, i) => (
                <option key={i} value={country}>
                  {country}
                </option>
              ))}
            </select>
            <select
              className="select select-bordered w-full"
              value={selectedCategory}
              onChange={onCategoryChange}
            >
              <option value="">
                Choose a category
              </option>
              <option value="Appetizer">Appetizer</option>
              <option value="Main Course">Main Course</option>
              <option value="Dessert">Dessert</option>
              <option value="Side Dish">Side Dish</option>
              <option value="Snack">Snack</option>
              <option value="Soup">Soup</option>
            </select>
          </div>
        </div>
      </form>
    </div>
  );
};

export default RecipeFilter;
