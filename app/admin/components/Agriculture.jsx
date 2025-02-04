import React from "react";

const agriculturalists = [
  {
    id: 1,
    name: "John Doe",
    experience: "10 years",
    phone: "555-1234",
    email: "john.doe@example.com",
    price: "₹100/hr",
    image: "https://placehold.co/400x200?text=John+Doe",
  },
  {
    id: 2,
    name: "Jane Smith",
    experience: "8 years",
    phone: "555-5678",
    email: "jane.smith@example.com",
    price: "₹90/hr",
    image: "https://placehold.co/400x200?text=Jane+Smith",
  },
  {
    id: 3,
    name: "Robert Brown",
    experience: "12 years",
    phone: "555-9012",
    email: "robert.brown@example.com",
    price: "₹120/hr",
    image: "https://placehold.co/400x200?text=Robert+Brown",
  },
];

const AgriculturalistsList = () => {
  return (
    <section className="p-10 bg-gray-100">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold">Agriculturalist Experts</h2>
        <p className="text-gray-600 mt-2">
          Get professional advice from our top agriculturalists
        </p>
      </div>

      <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-6 mt-6">
        {agriculturalists.map((expert) => (
          <div key={expert.id} className="bg-white rounded shadow-lg overflow-hidden">
            <img
              src={expert.image}
              alt={expert.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="font-bold text-lg">{expert.name}</h3>
              <p className="text-gray-500 text-sm">
                Experience: {expert.experience}
              </p>
              <div className="mt-4 text-gray-700 space-y-1">
                <p className="text-sm">
                  <span className="font-semibold">Phone:</span> {expert.phone}
                </p>
                <p className="text-sm">
                  <span className="font-semibold">Email:</span> {expert.email}
                </p>
                <p className="text-sm mt-2">
                  <span className="font-semibold">Consulting Price:</span>{" "}
                  {expert.price}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AgriculturalistsList;
