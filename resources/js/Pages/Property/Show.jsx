import { PROJECT_STATUS_CLASS_MAP, PROJECT_STATUS_TEXT_MAP } from "@/Constants";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router, useForm } from "@inertiajs/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";

export default function Show({
  auth,
  property,
  favorite,
  queryParams = null,
  code,
}) {
  queryParams = queryParams || {};

  // const oneDay = 24 * 60 * 60 * 1000; // hours * minutes * seconds * milliseconds
  // const startDate = new Date("2024-04-18"); // Your specified date
  // const currentDate = new Date(); // Current date and time

  // const daysPassed = Math.round(Math.abs((currentDate - startDate) / oneDay));

  // console.log(`Days passed since April 18, 2024: ${daysPassed}`);

  const oneDay = 24 * 60 * 60 * 1000; // hours * minutes * seconds * milliseconds
  const startDate = new Date(property.created_at); // December is month 11 (0-indexed)
  const currentDate = new Date(); // Current date and time

  const daysPassed = Math.round(Math.abs((currentDate - startDate) / oneDay));

  // const isUser = auth.user.id == !property.createdBy.id ? true : false;

  const deleteProject = (id) => {
    if (!window.confirm("Are you sure you want to delete this property")) {
      return;
    }
    router.delete(route("property.destroy", id));
  };
  console.log(auth.user);
  let { data, setData, post, errors, reset } = useForm({});
  useEffect(() => {
    if (auth.user !== null) {
      setData({ user_id: auth.user.id || "", property_id: property.id || "" });
    }
  }, []);

  const addToFavorite = (e) => {
    e.preventDefault();
    if (post !== null) {
      post(route("favorite.store"));
    } else {
      router.get(route("login"));
    }
  };

  const removeFromFavorite = (id) => {
    router.delete(route("favorite.destroy", id));
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
          {`Property: ${property.address}`}
        </h2>
      }
    >
      <Head title={`Property ${property.id}`} />
      <div>
        <pre className="text-gray-50">
          {JSON.stringify(auth.user, undefined, 2)}
        </pre>
        <pre className="text-gray-50">
          {JSON.stringify(property, undefined, 2)}
        </pre>
        <pre className="text-gray-50">
          {JSON.stringify(favorite, undefined, 2)}
        </pre>
      </div>
      <div className="py-12 ">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 ">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg ">
            <div className="relative">
              <img
                src={property.image_path}
                alt=""
                className="w-full object-cover h-64"
              />
              <div className="absolute top-2 right-2">
                <button
                  className={` py-2 px-3 rounded cursor:pointer text-3xl
                    ${
                      favorite === null
                        ? "text-gray-400"
                        : "text-red-600 hover:text-red-800"
                    }  `}
                  onClick={(e) => {
                    if (favorite) {
                      removeFromFavorite(favorite.id);
                    } else {
                      addToFavorite(e);
                    }
                  }}
                >
                  <FontAwesomeIcon icon={faHeart} />
                </button>
              </div>
            </div>
            <div className="p-6 text-gray-900 dark:text-gray-100 ">
              <div className="grid grid-cols-2 gap-1 mt-2 ">
                <div>
                  <div>
                    <label className="font-bold text-lg">
                      Built in{" "}
                      <span className="text-blue-400 capitalize">
                        {property.year_built}
                      </span>
                    </label>
                  </div>
                  <div className="mt-4">
                    <label className="font-bold text-lg">Price</label>
                    <p className="mt-1">$ {property.price.toLocaleString()}</p>
                  </div>
                  <div className="mt-4">
                    <label className="font-bold text-lg">Area</label>
                    <p className="mt-1">{property.area} sqft </p>
                  </div>
                  <div className="mt-4">
                    <label className="font-bold text-lg">Own</label>
                    <p className="mt-1">{property.owner}</p>
                  </div>
                </div>
                <div>
                  <div className="">
                    <label className="font-bold text-lg">
                      For{" "}
                      <span className="text-blue-400 capitalize">
                        {property.selling_type}{" "}
                      </span>
                    </label>
                  </div>
                  <div className="mt-4">
                    <label className="font-bold text-lg">Type</label>
                    <p className="mt-1 capitalize">{property.type}</p>
                  </div>
                  {/* <div className="mt-4">
                    <label className="font-bold text-lg">Created Date</label>
                    <p className="mt-1">{property.created_at}</p>
                  </div> */}
                  <div className="mt-4">
                    <label className="font-bold text-lg">Created Date</label>
                    <p className="mt-1">{daysPassed} day ago</p>
                  </div>

                  <div className="mt-4">
                    <label className="font-bold text-lg">Address</label>
                    <p className="mt-1">{property.address}</p>
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <label className="font-bold text-lg">About The Property</label>
                <p className="mt-1">{property.description}</p>
              </div>
              <div className="mt-6 flex justify-between gap-3">
                {auth.user !== null && (
                  <div className="flex gap-3">
                    <button
                      // disabled={!isUser}
                      {...(auth.user.id !== property.createdBy.id
                        ? { disabled: true }
                        : "")}
                      onClick={(e) => deleteProject(property.id)}
                      className={` py-2 px-3 rounded cursor:pointer
                    ${
                      auth.user.id !== property.createdBy.id
                        ? "bg-gray-400 text-gray-700"
                        : "bg-red-600 hover:bg-red-800"
                    }  `}
                    >
                      Delete
                    </button>
                    <button
                      className={` py-2 px-3 rounded cursor:pointer
                    ${
                      favorite === null
                        ? "bg-gray-600 hover:bg-gray-700"
                        : "bg-red-600 hover:bg-red-800"
                    }  `}
                      onClick={(e) => {
                        if (favorite) {
                          removeFromFavorite(favorite.id);
                        } else {
                          addToFavorite(e);
                        }
                      }}
                    >
                      {favorite === null ? "Favorite" : "unFavorite"}
                    </button>
                  </div>
                )}

                <div className="flex gap-3">
                  <Link
                    href={route("property.index")}
                    className="py-2 px-3 bg-green-600 hover:bg-green-800 rounded"
                  >
                    Take It
                  </Link>
                  <Link
                    href={route("property.index")}
                    className="py-2 px-3 bg-gray-600 hover:bg-gray-700 rounded"
                  >
                    Return Back
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
