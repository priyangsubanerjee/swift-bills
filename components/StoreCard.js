import { Icon } from "@iconify/react";
import React from "react";

function StoreCard() {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="h-16 w-16 bg-white rounded-full border flex items-center justify-center cursor-pointer">
        <Icon height={20} icon="clarity:store-line" />
      </div>
      <span className="text-xs mt-2">Store 1</span>
    </div>
  );
}

export default StoreCard;
