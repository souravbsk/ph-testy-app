import React, { useContext, useEffect, useMemo, useState } from "react";
import { MaterialReactTable } from "material-react-table";
import {
  useDeleteRecipeByIdMutation,
  useGetAllRecipeByEmailMutation,
} from "../../ReduxStore/api/RecipeApi";
import { AuthContext } from "../../Provider/AuthProvider";
import { FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";

const RecipeList = () => {
  const { user } = useContext(AuthContext);
  const [getRecipeList, { data, isLoading, isError, error }] =
    useGetAllRecipeByEmailMutation();
  const [refetch, setRefetch] = useState(false);
  const [
    deleteRecipe,
    {
      data: deleteData,
      isLoading: isDeleteLoading,
      isError: isDeleteError,
      error: deleteError,
    },
  ] = useDeleteRecipeByIdMutation();
  useEffect(() => {
    if (user) {
      const handleGetRecipe = async () => {
        const res = getRecipeList(user?.email);
      };
      handleGetRecipe();
    }
  }, [user, refetch]);

  console.log(data, "fsafsadf");

  const handleDeleteRecipe = async (value) => {
    console.log(value);

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        console.log("first");
        deleteRecipe(value?._id).then((res) => {
          if (res.data.data?.deletedCount > 0) {
            setRefetch(!refetch);
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };

  const columns = useMemo(
    () => [
      {
        header: "#",
        size: 20,
        accessorFn: (row, i) => i + 1,
      },
      {
        header: "Image",
        accessorFn: (row) => (
          <div className="avatar">
            <div className="w-14 rounded-full ">
              <img src={row?.recipe_image} />
            </div>
          </div>
        ),
        size: 40,
      },
      {
        header: "Recipe Name",
        accessorKey: "recipe_name",
        size: 40,
      },
      {
        header: "Category",
        accessorKey: "category",
        size: 40,
      },
      {
        header: "Country",
        accessorKey: "country",
        size: 40,
      },
      {
        header: "Watch Count",
        accessorKey: "watchCount",
        size: 40,
      },
      {
        header: "purchased",
        accessorFn: (row) =>
          row?.purChased_by.length > 0 ? row?.purChased_by.length : 0,
        size: 40,
      },
      {
        header: "Video",
        accessorFn: (row) => (
          <>
            <iframe
              className=" w-full  h-20 card"
              src={`https://www.youtube.com/embed/${row?.embedded_code}`}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </>
        ),
        size: 100,
      },
      {
        header: "Action",
        Cell: ({ row }) => (
          <div className="">
            <button
              onClick={() => handleDeleteRecipe(row?.original)}
              className="text-lg px-3 py-3 bg-[#F97316] text-white rounded-lg"
            >
              <FaTrash></FaTrash>
            </button>
          </div>
        ),
      },
    ],
    []
  );
  return (
    <MaterialReactTable
      state={{ isLoading: isLoading || isDeleteLoading }}
      columns={columns}
      data={data?.success ? data?.data : []}
    />
  );
};

export default RecipeList;
