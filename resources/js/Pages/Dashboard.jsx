import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import DashboardLayout from "@/Layouts/DashboardLayout";
import { Head, router } from "@inertiajs/react";
import videobg from "../../images/bg1.mp4";
import logobg from "../../images/logo6.png";
import TextInput from "@/Components/TextInput";
export default function Dashboard({ auth }) {
  let queryParams = {};
  const searchFieldChanged = function (name, value) {
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

  return (
    <DashboardLayout user={auth.user}>
      <Head title="Dashboard" />
      <div className="z-10 absolute top-0 left-0 w-full h-full text-white bg-black opacity-25">
        {" "}
        <video
          src={videobg}
          className="w-full h-full object-cover"
          autoPlay
          loop
          muted
        ></video>
      </div>
      <div className="p-6 z-20 absolute top-0 left-0 w-full h-full flex-col text-white flex justify-center items-center">
        <img src={logobg} alt="" />
        <th className="px-3 py-3 md:w-10/12 lg:w-9/12	w-full">
          <TextInput
            className=" text-xs w-full sm:text-sm"
            placeholder="Search Your Property By Name"
            onKeyPress={(e) => onKeyPress("name", e)}
          />
        </th>
      </div>
    </DashboardLayout>
  );
}
