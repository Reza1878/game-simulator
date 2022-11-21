import React from "react";
import { CheckCircle } from "react-feather";
import { Button, Text } from "./common";

function PricingItem({
  name,
  description,
  price,
  onClick = () => {},
  loading = false,
  id,
  features = [],
}) {
  return (
    <div className="flex flex-col p-6 max-w-lg text-center text-white shadow border-gray-600 bg-gray-800 rounded-md mx-auto lg:mx-0">
      <Text variant="h1">{name}</Text>
      <Text>{description}</Text>
      <Text variant="h2" className="my-4">
        ${price} / month
      </Text>
      <div className="mx-auto">
        {features.map((item, index) => (
          <div className="flex gap-2 mb-1">
            <div className="bg-secondary items-center flex rounded-full p-1">
              <CheckCircle className="text-black" size={18} />
            </div>
            <Text key={index}>{item.trim()}</Text>
          </div>
        ))}
      </div>
      <Button
        isLoading={loading}
        className="w-full mt-4 bg-secondary text-black opacity-80 hover:opacity-100"
        onClick={() => onClick(id)}
      >
        Get Started
      </Button>
    </div>
  );
}

export default PricingItem;
