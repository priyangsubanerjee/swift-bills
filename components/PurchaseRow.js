import { Icon } from "@iconify/react";
import React from "react";

function PurchaseRow({ item, index, onRemove }) {
  return (
    <tr className="overflow-hidden w-fit shrink-0 border-b">
      <td className="font-normal px-5 py-3 text-sm text-left">{index + 1}</td>
      <td className="font-normal px-5 py-3 text-sm text-left">{item.name}</td>
      <td className="font-normal px-5 py-3 text-sm text-left">{item.price}</td>
      <td className="font-normal px-5 py-3 text-sm text-left">
        {item.quantity}
      </td>
      <td className="font-normal px-5 py-3 text-sm text-left">
        {item.price * item.quantity}
      </td>
      <td className="font-normal px-5 py-3 text-sm text-right">
        <button
          onClick={() => onRemove(index)}
          className="flex items-center justify-center text-neutral-600"
        >
          <Icon height={20} icon="ion:close-outline" />
        </button>
      </td>
    </tr>
  );
}

export default PurchaseRow;
