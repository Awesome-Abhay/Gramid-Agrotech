import Link from "next/link";
export default function ActionBoxes() {
  return (
    <>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-6 p-6">
        {/* Add Box */}
        <Link href='/admin/add' className="w-40 h-40 flex items-center justify-center bg-blue-100 hover:bg-blue-200 text-blue-700 font-semibold text-lg rounded-2xl shadow-md transition duration-300 cursor-pointer">
          Add
        </Link>

        {/* Edit Box */}
        <Link href='/admin/edit' className="w-40 h-40 flex items-center justify-center bg-green-100 hover:bg-green-200 text-green-700 font-semibold text-lg rounded-2xl shadow-md transition duration-300 cursor-pointer">
          Edit
        </Link>
      </div>
      {/* <!-- Features --> */}
      <section className="bg-white py-10">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center px-6">
          <div className="w-full md:w-1/2 flex justify-center md:justify-start">
            <img src="images/Bazzar/f1.jpg" alt="Farmer in field" className="w-72 h-auto rounded  border-yellow-300 shadow-yellow-600 shadow-xl" />
          </div>
          <div className="w-full md:w-1/2 text-center md:text-left mt-6 md:mt-0">
            <h2 className="text-3xl font-bold text-gray-900">Welcome to AgriMart: Your Trusted Partner in Farming Success! 🌾</h2>
            <p className="text-gray-600 mt-4">
              At AgriMart, we are committed to empowering farmers with the best tools, equipment, and resources to grow their farms and livelihoods.
              Our online shop offers a wide range of agricultural products tailored to meet the unique needs of every farmer.
            </p>
            <Link href='/market' target='_blank' className="mt-4 px-5 py-2 border-2 border-black text-black font-semibold rounded shadow hover:bg-gray-200 flex items-center gap-2 w-max">
              Join 🤝
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
