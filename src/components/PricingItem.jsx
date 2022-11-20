import React from "react";
import { Button, Text } from "./common";

function PricingItem({
  name,
  description,
  price,
  onClick = () => {},
  loading = false,
  id,
}) {
  return (
    <div className="flex flex-col p-6 max-w-lg text-center text-white shadow border-gray-600 bg-gray-800 rounded-md">
      <Text variant="h1">{name}</Text>
      <Text>{description}</Text>
      <Text variant="h2" className="my-4">
        ${price} / month
      </Text>
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
