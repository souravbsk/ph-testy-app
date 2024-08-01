import React, { useContext, useState } from "react";
import TitleSection from "../../components/TitleSection/TitleSection";
import Button from "../../components/Button/Button";
import { AuthContext } from "../../Provider/AuthProvider";
import { useAddNewRecipeMutation } from "../../ReduxStore/api/RecipeApi";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { setReFetch } from "../../ReduxStore/slices/coinSlice";

const AddRecipe = () => {
  const { user } = useContext(AuthContext);
  const [addRecipe, { isLoading }] = useAddNewRecipeMutation();
  const [youtubeCode, setYoutubeCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { isCoinRefetch } = useSelector((state) => state.coin);
  const dispatch = useDispatch();

  const imgKey = "a7bbb2deb934c4cc51b1058207d12d2e";
  const url = `https://api.imgbb.com/1/upload?key=${imgKey}`;

  const handleAddRecipe = async (e) => {
    e.preventDefault();
    const form = e.target;
    const title = form.title.value;
    const description = form.description.value;
    const embeddedcode = form.embeddedcode.value;
    const country = form.country.value;
    const category = form.category.value;
    const inputImage = form.image.files[0];
    setLoading(true);

    // Validate YouTube embed code

    // Validate YouTube video ID
    const regex = /\b(youtube\.com|watch|embed|https|youtube|http|iframe)\b/g;

    // Test the input against the modified regex
    if (regex.test(embeddedcode)) {
      setError("Please enter a valid YouTube video URL or ID.");
      setLoading(false);

      return;
    }
    setError("");

    console.log("second");

    const formData = new FormData();
    formData.append("image", inputImage);

    try {
      const imageResponse = await fetch(url, {
        method: "POST",
        body: formData,
      }).then((res) => res.json());

      if (imageResponse.success) {
        const imgUrl = imageResponse.data.display_url;
        const newRecipe = {
          recipe_name: title,
          recipe_image: imgUrl,
          creator_Email: user.email,
          recipe_details: description,
          embedded_code: embeddedcode,
          country,
          category,
        };

        const response = await addRecipe(newRecipe);
        if (response?.data?.data?.insertedId) {
          dispatch(setReFetch(!isCoinRefetch));
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Recipe Successfully Added",
            showConfirmButton: false,
            timer: 1500,
          });
          form.reset();
          setError("");
          setYoutubeCode("");
          setLoading(false);
        }
      }
    } catch (err) {
      console.error(err);
      setError("An error occurred while adding the recipe.");
    }
  };

  return (
    <div className="thingIntro-BG bg-no-repeat bg-top bg-contain">
      <div className="container pt-20">
        <TitleSection className="text-center mb-12">Add Recipe</TitleSection>
        <div>
          <form
            onSubmit={handleAddRecipe}
            className="card p-8 border-2 bg-gray-200 border-[#111827]"
          >
            <div className="form-control">
              <label className="label">
                <span className="label-text">Recipe Name</span>
              </label>
              <input
                type="text"
                placeholder="Recipe Name"
                name="title"
                className="input input-bordered"
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Recipe Details</span>
              </label>
              <textarea
                className="textarea textarea-bordered w-full h-40"
                placeholder="Recipe details"
                name="description"
                required
              ></textarea>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Embedded YouTube Video Code</span>
              </label>
              <input
                type="text"
                onChange={(e) => setYoutubeCode(e.target.value)}
                value={youtubeCode}
                placeholder="e.g., dQw4w9WgXcQ"
                className="input input-bordered"
                name="embeddedcode"
                required
              />
              {error && <p className="text-red-500">{error}</p>}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Country</span>
              </label>
              <input
                type="text"
                placeholder="Country"
                className="input input-bordered"
                name="country"
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Category</span>
              </label>
              <select
                name="category"
                required
                className="select select-bordered w-full"
              >
                <option disabled selected>
                  Choose a category
                </option>
                <option>Appetizer</option>
                <option>Main Course</option>
                <option>Dessert</option>
                <option>Side Dish</option>
                <option>Snack</option>
                <option>Soup</option>
              </select>
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Recipe Image</span>
              </label>
              <input
                type="file"
                name="image"
                className="file-input file-input-bordered w-full"
                required
              />
            </div>

            <div className="form-control text-center mt-6">
              <Button className="text-center">
                {isLoading || loading ? (
                  <span className="loading loading-bars loading-md"></span>
                ) : (
                  "Add New Recipe"
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="w-16 h-16 border-4 border-t-4 border-gray-200 rounded-full animate-spin border-t-[#F97316]"></div>
        </div>
      )}
    </div>
  );
};

export default AddRecipe;
