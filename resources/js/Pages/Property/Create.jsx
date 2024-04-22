import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import NumberInput from "@/Components/NumberInput";
import SelectInput from "@/Components/SelectInput";
import TextAreaInput from "@/Components/TextAreaInput";
import TextInput from "@/Components/TextInput";
import { PROJECT_STATUS_CLASS_MAP, PROJECT_STATUS_TEXT_MAP } from "@/Constants";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Create({ auth }) {
  const { data, setData, post, errors, reset } = useForm({
    image: "",
    owner: auth.user.name,
    address: "",
    price: "",
    area: "",
    selling_type: "",
    description: "",
    year_built: "",
    rooms: "",
    bathrooms: "",
    garages: "",
    floor: "",
    type: "",
  });
  const onSubmit = (e) => {
    e.preventDefault();
    post(route("property.store"));
  };
  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
          New Property
        </h2>
      }
    >
      <Head title={`Create Property`} />
      {/* <div>
        <pre>{JSON.stringify(code, undefined, 2)}</pre>
      </div> */}
      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900 dark:text-gray-100">
              <form className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
                <div className="mt-4">
                  <InputLabel htmlFor="property_image" value="Property Image" />
                  <TextInput
                    id="property_image"
                    type="file"
                    name="image"
                    className="mt-1 block w-full"
                    onChange={(e) => setData("image", e.target.files[0])}
                  />
                  <InputError message={errors.image} className="mt-2" />
                </div>
                <div className="mt-4">
                  <InputLabel htmlFor="property_price" value="Property Price" />
                  <div className="flex items-center relative gap-2 before:content-['$'] before:absolute before:-left-4 before:text-white">
                    <NumberInput
                      id="property_price"
                      type="number"
                      name="price"
                      value={data.price}
                      className="mt-1 block w-full "
                      isFocused="true"
                      onChange={(e) => setData("price", e.target.value)}
                    />
                  </div>
                  <InputError message={errors.price} className="mt-2" />
                </div>
                <div className="mt-4">
                  <InputLabel htmlFor="property_area" value="Property Area" />
                  <div className="flex items-center relative gap-2 before:content-['ftsq'] before:absolute before:-left-9 before:text-white">
                    <NumberInput
                      id="property_area"
                      type="number"
                      name="area"
                      value={data.area}
                      className="mt-1 block w-full "
                      isFocused="true"
                      onChange={(e) => setData("area", e.target.value)}
                    />
                  </div>
                  <InputError message={errors.price} className="mt-2" />
                </div>
                <div className="mt-4">
                  <InputLabel
                    htmlFor="property_address"
                    value="Property Address"
                  />
                  <TextInput
                    id="property_address"
                    type="text"
                    name="address"
                    value={data.address}
                    className="mt-1 block w-full"
                    isFocused="true"
                    onChange={(e) => setData("address", e.target.value)}
                  />
                  <InputError message={errors.address} className="mt-2" />
                </div>
                <div className="mt-4">
                  <InputLabel
                    htmlFor="property_description"
                    value="About Property"
                  />
                  <TextAreaInput
                    id="property_description"
                    type="text"
                    name="description"
                    value={data.description}
                    className="mt-1 block w-full"
                    onChange={(e) => setData("description", e.target.value)}
                  />
                  <InputError message={errors.description} className="mt-2" />
                </div>
                <div className="mt-4">
                  <InputLabel
                    htmlFor="property_year_built"
                    value="Built Date"
                  />
                  <NumberInput
                    id="property_year_built"
                    type="date"
                    name="year_built"
                    value={data.year_built}
                    className="mt-1 block w-full"
                    onChange={(e) => setData("year_built", e.target.value)}
                  />
                  <InputError message={errors.year_built} className="mt-2" />
                </div>
                <div className="mt-4">
                  <InputLabel
                    htmlFor="property_rooms"
                    value="Number Of Rooms"
                  />
                  <NumberInput
                    id="property_rooms"
                    type="number"
                    name="rooms"
                    value={data.rooms}
                    className="mt-1 block w-full"
                    onChange={(e) => setData("rooms", e.target.value)}
                  />
                  <InputError message={errors.rooms} className="mt-2" />
                </div>
                <div className="mt-4">
                  <InputLabel
                    htmlFor="property_floor"
                    value="Number Of Floors"
                  />
                  <NumberInput
                    id="property_floor"
                    type="number"
                    name="floor"
                    value={data.floor}
                    className="mt-1 block w-full"
                    onChange={(e) => setData("floor", e.target.value)}
                  />
                  <InputError message={errors.floor} className="mt-2" />
                </div>
                <div className="mt-4">
                  <InputLabel
                    htmlFor="property_garages"
                    value="Number Of Garages"
                  />
                  <NumberInput
                    id="property_garages"
                    type="number"
                    name="garages"
                    value={data.garages}
                    className="mt-1 block w-full"
                    onChange={(e) => setData("garages", e.target.value)}
                  />
                  <InputError message={errors.garages} className="mt-2" />
                </div>
                <div className="mt-4">
                  <InputLabel
                    htmlFor="property_bathrooms"
                    value="Number Of Bathrooms"
                  />
                  <NumberInput
                    id="property_bathrooms"
                    type="number"
                    name="bathrooms"
                    value={data.bathrooms}
                    className="mt-1 block w-full"
                    onChange={(e) => setData("bathrooms", e.target.value)}
                  />
                  <InputError message={errors.bathrooms} className="mt-2" />
                </div>
                <div className="mt-4">
                  <InputLabel
                    htmlFor="property_selling_type"
                    value="Property Selling Type"
                  />
                  <SelectInput
                    id="property_selling_type"
                    name="selling_type"
                    value={data.selling_type}
                    className="mt-1 block w-full"
                    onChange={(e) => setData("selling_type", e.target.value)}
                  >
                    <option value="" selected disabled>
                      Select One
                    </option>
                    <option value="sell">Selling</option>
                    <option value="rent">Renting</option>
                  </SelectInput>
                  <InputError message={errors.selling_type} className="mt-2" />
                </div>
                <div className="mt-4">
                  <InputLabel htmlFor="property_type" value="Property Type" />
                  <SelectInput
                    id="property_type"
                    name="type"
                    value={data.type}
                    className="mt-1 block w-full"
                    onChange={(e) => setData("type", e.target.value)}
                  >
                    <option value="" selected disabled>
                      Select One
                    </option>
                    <option value="house">House</option>
                    <option value="appartment">Appartment</option>
                  </SelectInput>
                  <InputError message={errors.type} className="mt-2" />
                </div>
                <div className="mt-4 text-right">
                  <Link
                    href={route("property.index")}
                    className="rounded bg-gray-100 hover:bg-gray-200
                  text-gray-800 py-1 px-3 mr-2 transition-all"
                  >
                    Cancel
                  </Link>
                  <button
                    className="rounded bg-emerald-500 hover:bg-emerald-600
                    transition-all shadow py-1 px-3 text-white"
                    onClick={(e) => onSubmit(e)}
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
