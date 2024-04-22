import Pagination from "@/Components/Pagination";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import { PROJECT_STATUS_CLASS_MAP, PROJECT_STATUS_TEXT_MAP } from "@/Constants";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/16/solid";
import { useEffect, useState } from "react";
import InputLabel from "@/Components/InputLabel";

export default function Index({ auth, properties, queryParams = null }) {
  queryParams = queryParams || {};
  const searchFieldChanged = function (name, value) {
    queryParams.filterType = filterType;

    if (queryParams.page) {
      queryParams.page = 1;
    }
    if (value) {
      queryParams[name] = value;
    } else {
      delete queryParams[name];
    }

    router.get(route("property.index"), queryParams);
  };
  const onKeyPress = function (name, e) {
    if (e.key !== "Enter") return;
    searchFieldChanged(name, e.target.value);
  };
  const sortChanged = (name) => {
    if (name === queryParams.sort_field) {
      if (queryParams.sort_direction === "asc") {
        queryParams.sort_direction = "desc";
      } else {
        queryParams.sort_direction = "asc";
      }
    } else {
      queryParams.sort_field = name;
      queryParams.sort_direction = "asc";
    }
    router.get(route("property.index"), queryParams);
  };
  const deleteProject = (id) => {
    if (!window.confirm("Are you sure you want to delete this property")) {
      return;
    }
    router.delete(route("property.destroy", id));
  };
  const [filterType, setFilterType] = useState(
    queryParams.filterType || "Rooms"
  );
  const [minPointer, setMinPointer] = useState("" || 10);
  const [maxPointer, setMaxPointer] = useState("" || 10);
  useEffect(() => {
    if (filterType) {
      switch (filterType) {
        case "Rooms":
          setMinPointer(queryParams.minRooms || 1);
          setMaxPointer(queryParams.maxRooms || 10);
          break;
        case "Floors":
          setMinPointer(queryParams.minFloors || 1);
          setMaxPointer(queryParams.maxFloors || 10);
          break;
        case "Garages":
          setMinPointer(queryParams.minGarages || 1);
          setMaxPointer(queryParams.maxGarages || 10);
          break;
        // case "Bedrooms":
        //   setMinPointer(queryParams.minBedrooms);
        //   setMaxPointer(queryParams.maxBedrooms|| 10);
        //   break;
        // case "Bathrooms":
        //   setMinPointer(queryParams.minBathrooms);
        //   setMaxPointer(queryParams.maxBathrooms|| 10);
        //   break;
        // case "Area":
        //   setMinPointer(queryParams.minArea);
        //   setMaxPointer(queryParams.maxArea|| 10);
        //   break;
        // case "Price":
        //   setMinPointer(queryParams.minPrice);
        //   setMaxPointer(queryParams.maxPrice|| 10);
        //   break;
        default:
          setMinPointer(1);
          setMaxPointer(10);
      }
    }
  }, [filterType]);

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="flex justify-between items-center">
          <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            Properties
          </h2>
          <Link
            href={route("property.create")}
            className="bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600"
          >
            Add New
          </Link>
        </div>
      }
    >
      <Head title="Properties" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <div
              className="text-xs text-gray-700 uppercase bg-gray-50
                dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500"
            >
              <tr className="media text-nowrap flex items-center justify-center">
                <div className="media-3 flex justify-center flex-nowrap">
                  <th className="lg:px-3 media-2 table-cell  px-2 py-3"></th>
                  <th className="px-2 py-2 lg:py-3 lg:px-3 w-4/5">
                    <TextInput
                      defaultValue={queryParams.name}
                      className="text-xs lg:text-sm w-full"
                      placeholder="Property Name"
                      onBlur={(e) => searchFieldChanged("name", e.target.value)}
                      onKeyPress={(e) => onKeyPress("name", e)}
                    />
                  </th>

                  <th className="px-2 py-2 lg:py-3 lg:px-3 w-4/5">
                    <SelectInput
                      // defaultValue={queryParams.status}
                      defaultValue={queryParams.status}
                      className="w-full text-xs lg:text-sm"
                      onChange={(e) =>
                        searchFieldChanged("status", e.target.value)
                      }
                    >
                      <option value="" selected disabled>
                        Select Status
                      </option>
                      <option value="">All Properties</option>
                      <option value="sell">Selling</option>
                      <option value="rent">Renting</option>
                    </SelectInput>
                  </th>
                </div>
                <div className="media flex items-center justify-evenly">
                  <div className="flex md:inline flex-wrap items-center justify-center">
                    <th className="lg:px-3 px-2  align-middle h-full">
                      <div>
                        <InputLabel
                          className="text-xxs mb-0.5 lg:mb-2 lg:text-xs"
                          htmlFor="property_area"
                          value={`Min ${filterType}`}
                        />
                      </div>
                      <div>
                        <input
                          type="range"
                          defaultValue={minPointer}
                          className="lg:w-full w-16"
                          step={1}
                          min={1}
                          max={10}
                          autofocus
                          onMouseUp={(e) => {
                            searchFieldChanged(
                              `min${filterType}`,
                              e.target.value
                            );
                          }}
                          onChange={(e) => setMinPointer(e.target.value)}
                        />
                      </div>
                      <div>
                        <output className="block">{minPointer}</output>
                      </div>
                    </th>
                    <th className="lg:px-3 px-2  align-middle h-full">
                      <div>
                        <InputLabel
                          className="text-xxs mb-0.5 lg:mb-2 lg:text-xs"
                          htmlFor="property_area"
                          value={`Max ${filterType}`}
                        />
                      </div>
                      <div>
                        <input
                          type="range"
                          defaultValue={maxPointer}
                          className="lg:w-full w-16"
                          step={1}
                          min={1}
                          max={10}
                          autofocus
                          onMouseUp={(e) =>
                            searchFieldChanged(
                              `max${filterType}`,
                              e.target.value
                            )
                          }
                          onChange={(e) => setMaxPointer(e.target.value)}
                        />
                      </div>
                      <div>
                        <output className="block">{maxPointer}</output>
                      </div>
                    </th>
                  </div>
                  <div className="flex md:inline flex-wrap items-center justify-center">
                    <th className="lg:px-3 px-2  py-3 ">
                      <SelectInput
                        // defaultValue={queryParams.status}
                        defaultValue={queryParams.filterType}
                        className="w-full text-xs lg:text-sm"
                        onChange={(e) => {
                          setFilterType(e.target.value);
                          searchFieldChanged("filterType", e.target.value);
                        }}
                      >
                        <option value="" disabled>
                          Filter
                        </option>
                        <option value="Rooms" selected>
                          Rooms
                        </option>
                        <option value="Floors">Floors</option>
                        <option value="Garages">Garages</option>
                      </SelectInput>
                    </th>
                    <th className="lg:px-3 px-2  py-3 text-nowrap">
                      <Link
                        href={route("property.index")}
                        className="text-xxs md:text-xsm px-2 py-2 lg:py-3 bg-gray-800 text-gray-300 rounded-md"
                      >
                        Reset
                      </Link>
                    </th>
                    <th className="lg:px-3 media-2 table-cell px-2 py-3"></th>
                  </div>
                </div>
              </tr>
            </div>
            <div className="p-6 text-gray-900 dark:text-gray-100">
              {/* <pre>{JSON.stringify(properties.data, undefined, 2)}</pre> */}
              {/* <pre>{JSON.stringify(queryParams, undefined, 2)}</pre> */}
              <div className="overflow-auto">
                <div className="mb-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 rounded-md w-full text-sm text-center p-2 bg-gray-800">
                  {properties.data.map((property) => (
                    <Link href={route("property.show", property.id)}>
                      <div className="h-full relative bg-gray-100 dark:bg-gray-700 dark:text-gray-400 rounded-md shadow-lg ">
                        <div className="flex flex-col h-full ">
                          <img
                            className=" w-full object-cover overflow-hidden rounded-t-md"
                            src={property.image_path}
                            alt=""
                          />
                          <div className="h-2/6 grow flex flex-col justify-between p-2  text-left">
                            <div className="">
                              <p className="text-[16px] font-bold md:text-md lg:text-lg text-white">
                                $ {property.price.toLocaleString()}
                              </p>
                              <p className="text-[14px] md:text-s dark:text-gray-100">
                                {property.rooms} bds | {property.bathrooms} ba |{" "}
                                {property.area} sqft - {property.address}
                              </p>
                            </div>
                            <div>
                              <p className=" text-right text-sm">
                                {property.owner}
                              </p>
                            </div>
                          </div>
                        </div>
                        {auth.user !== null ? (
                          <Link
                            href={route("property.edit", property.id)}
                            className={`text-white justify-center
                          items-center absolute top-5 right-5
                          rounded-md bg-blue-400 w-12 h-8
                          ${
                            property.createdBy.id == auth.user.id
                              ? "flex"
                              : "hidden"
                          }
                          `}
                          >
                            Edit
                          </Link>
                        ) : (
                          ""
                        )}
                      </div>
                    </Link>
                  ))}
                </div>
                <Pagination links={properties.meta.links} />

                {/* <Pagination
                  links={properties.meta.links}
                  currentPage={properties.current_page}
                  lastPage={properties.last_page}
                  path={route("property.index")}
                  queryParams={queryParams}
                  onPageChange={(page) => {
                    queryParams.page = page;
                    router.get(route("property.index"), queryParams);
                  }}
                  onPageSizeChange={(size) => {
                    queryParams.per_page = size;
                    router.get(route("property.index"), queryParams);
                  }}
                  onPageNumberChange={(page) => {
                    queryParams.page = page;
                    router.get(route("property.index"), queryParams);
                  }}
                  onSortChange={(name) => {
                    sortChanged(name);
                  }}
                  sortField={queryParams.sort_field}
                  sortDirection={queryParams.sort_direction}
                  sortOptions={[
                    { value: "created_at", label: "Date" },
                    { value: "price", label: "Price" },
                  ]}
                  searchFieldChanged={searchFieldChanged}
                  onKeyPress={onKeyPress}
                  searchField={queryParams.search}
                  searchPlaceholder="Search"
                /> */}

                {/* <table
                  className="w-full text-sm text-left rtl:text-right
              text-gray-500 dark:text-gray-400 "
                >
                  <thead
                    className="text-xs text-gray-700 uppercase bg-gray-50
                dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500"
                  >
                    <tr className="text-nowrap">
                      <th className="px-3 py-3"></th>
                      <th className="px-3 py-3"></th>
                      <th className="px-3 py-3 ">
                        <TextInput
                          defaultValue={queryParams.name}
                          className="w-full"
                          placeholder="Property Name"
                          onBlur={(e) =>
                            searchFieldChanged("name", e.target.value)
                          }
                          onKeyPress={(e) => onKeyPress("name", e)}
                        />
                      </th>
                      <th className="px-3 py-3 ">
                        <SelectInput
                          // defaultValue={queryParams.status}
                          defaultValue={queryParams.status}
                          className="w-full md:text-xs"
                          onChange={(e) =>
                            searchFieldChanged("status", e.target.value)
                          }
                        >
                          <option value="" selected disabled>
                            Select Status
                          </option>
                          <option value="">All Properties</option>
                          <option value="sell">Selling</option>
                          <option value="rent">Renting</option>
                        </SelectInput>
                      </th>
                      <th className="px-3 py-3 text-nowrap"></th>
                      <th className="px-3 py-3 text-nowrap"></th>
                      <th className="px-3 py-3"></th>
                      <th className="px-3 py-3 text-right"></th>
                    </tr>
                  </thead>
                  <thead
                    className="text-xs text-gray-700 uppercase bg-gray-50
                dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500"
                  >
                    <tr className="text-nowrap">
                      <th onClick={(e) => sortChanged("id")}>
                        <div className="px-3 py-3 flex justify-between items-center gap-1 cursor-pointer">
                          ID
                          <div>
                            <ChevronUpIcon
                              className={
                                "w-4 h-4 " +
                                (queryParams.sort_field === "id" &&
                                queryParams.sort_direction === "desc"
                                  ? "text-white"
                                  : "")
                              }
                              aria-hidden="true"
                            />
                            <ChevronDownIcon
                              className={
                                "w-4 h-4 -mt-2 " +
                                (queryParams.sort_field === "id" &&
                                queryParams.sort_direction === "asc"
                                  ? "text-white"
                                  : "")
                              }
                              aria-hidden="true"
                            />
                          </div>
                        </div>
                      </th>
                      <th className="px-3 py-3">Image</th>
                      <th onClick={(e) => sortChanged("name")}>
                        <div className="px-3 py-3 flex justify-between items-center gap-1 cursor-pointer">
                          Name
                          <div>
                            <ChevronUpIcon
                              className={
                                "w-4 h-4 " +
                                (queryParams.sort_field === "name" &&
                                queryParams.sort_direction === "desc"
                                  ? "text-white"
                                  : "")
                              }
                              aria-hidden="true"
                            />
                            <ChevronDownIcon
                              className={
                                "w-4 h-4 -mt-2 " +
                                (queryParams.sort_field === "name" &&
                                queryParams.sort_direction === "asc"
                                  ? "text-white"
                                  : "")
                              }
                              aria-hidden="true"
                            />
                          </div>
                        </div>
                      </th>
                      <th onClick={(e) => sortChanged("status")}>
                        <div className="px-3 py-3 flex justify-between items-center gap-1 cursor-pointer">
                          Status
                          <div>
                            <ChevronUpIcon
                              className={
                                "w-4 h-4 " +
                                (queryParams.sort_field === "status" &&
                                queryParams.sort_direction === "desc"
                                  ? "text-white"
                                  : "")
                              }
                              aria-hidden="true"
                            />
                            <ChevronDownIcon
                              className={
                                "w-4 h-4 -mt-2 " +
                                (queryParams.sort_field === "status" &&
                                queryParams.sort_direction === "asc"
                                  ? "text-white"
                                  : "")
                              }
                              aria-hidden="true"
                            />
                          </div>
                        </div>
                      </th>
                      <th onClick={(e) => sortChanged("created_at")}>
                        <div className="px-3 py-3 text-nowrap flex justify-between items-center gap-1 cursor-pointer">
                          Created Date
                          <div>
                            <ChevronUpIcon
                              className={
                                "w-4 h-4 " +
                                (queryParams.sort_field === "created_at" &&
                                queryParams.sort_direction === "desc"
                                  ? "text-white"
                                  : "")
                              }
                              aria-hidden="true"
                            />
                            <ChevronDownIcon
                              className={
                                "w-4 h-4 -mt-2 " +
                                (queryParams.sort_field === "created_at" &&
                                queryParams.sort_direction === "asc"
                                  ? "text-white"
                                  : "")
                              }
                              aria-hidden="true"
                            />
                          </div>
                        </div>
                      </th>
                      <th onClick={(e) => sortChanged("due_date")}>
                        <div className="px-3 py-3 text-nowrap flex justify-between items-center gap-1 cursor-pointer">
                          Due Date
                          <div>
                            <ChevronUpIcon
                              className={
                                "w-4 h-4 " +
                                (queryParams.sort_field === "due_date" &&
                                queryParams.sort_direction === "desc"
                                  ? "text-white"
                                  : "")
                              }
                              aria-hidden="true"
                            />
                            <ChevronDownIcon
                              className={
                                "w-4 h-4 -mt-2 " +
                                (queryParams.sort_field === "due_date" &&
                                queryParams.sort_direction === "asc"
                                  ? "text-white"
                                  : "")
                              }
                              aria-hidden="true"
                            />
                          </div>
                        </div>
                      </th>
                      <th className="px-3 py-3">Created By</th>
                      <th className="px-3 py-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {properties.data.map((property) => (
                      <tr
                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                        key={property.id}
                      >
                        <td className="px-3 py-3">{property.id}</td>
                        <td className="px-3 py-3">
                          <img
                            src={property.image_path}
                            style={{ width: 70 }}
                          />
                        </td>
                        <th className="px-3 py-3 text-gray-50">
                          <Link
                            className="hover:underline"
                            href={route("property.show", property.id)}
                          >
                            {property.name}
                          </Link>
                        </th>
                        <td className="px-3 py-3">
                          <span
                            className={
                              "px-2 py-1 text-white rounded " +
                              PROJECT_STATUS_CLASS_MAP[property.status]
                            }
                          >
                            {PROJECT_STATUS_TEXT_MAP[property.status]}
                          </span>
                        </td>
                        <td className="px-3 py-3 text-nowrap">
                          {property.created_at}
                        </td>
                        <td className="px-3 py-3 text-nowrap">
                          {property.due_date}
                        </td>
                        <td className="px-3 py-3">{property.createdBy.name}</td>
                        <td className="px-3 py-3">
                          <Link
                            href={route("property.edit", property.id)}
                            className=" text-blue-500 hover:text-blue-600 hover:underline mx-1 font-medium"
                          >
                            Edit
                          </Link>
                          <button
                            onClick={(e) => deleteProject(property.id)}
                            className=" text-red-500 hover:text-red-600 hover:underline mx-1 font-medium"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
