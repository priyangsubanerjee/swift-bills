/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import { Inter } from "next/font/google";
import { Icon } from "@iconify/react";

// Lorem ipsum, dolor sit amet consectetur adipisicing elit. Facere dolores laboriosam, pariatur dolor, nisi, ab ullam accusantium alias harum perferendis odit voluptatibus! Fugit dolore at quibusdam! Molestiae eum vitae cupiditate.

export default function Home() {
  const staticImages = () => {
    return (
      <>
        <img
          src="https://st2.depositphotos.com/1801102/6176/v/950/depositphotos_61769123-stock-illustration-street-shop-sketch.jpg"
          className="absolute inset-y-0 left-0 w-1/2 object-cover z-0 opacity-5"
          alt=""
        />
        <img
          src="https://i.pinimg.com/originals/73/28/28/732828e6a1e33b7c026bade723c0b0a8.jpg"
          className="absolute inset-y-0 right-0 w-1/2 object-cover z-0 opacity-5"
          alt=""
        />
      </>
    );
  };

  return (
    <main className="fixed inset-0 max-h-screen overflow-auto">
      <div className="bg-gradient-to-b from-neutral-50 to-neutral-50 pb-7 border-b flex flex-col items-center justify-center relative overflow-hidden">
        {staticImages()}
        <section className="inset-0 h-fit w-full z-0 flex flex-col items-center justify-center">
          <div className="text-center mt-24 z-10">
            <h1 className="font-dancing-script text-5xl">Swift Bills</h1>
            <p className="text-sm mt-4">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
              voluptatibus.
            </p>
          </div>
          <div className="mt-16">
            <button className="flex items-center justify-center space-x-1 hover:underline">
              <h2 className="font-semibold text-xs uppercase tracking-wider">
                CHOOSE YOUR STORE
              </h2>
              <Icon height={17} icon="icon-park-outline:right" />
            </button>
          </div>
          <div className="flex items-center mt-5 space-x-4">
            <div className="flex flex-col items-center justify-center">
              <div className="h-16 w-16 bg-white rounded-full border"></div>
              <span className="text-xs mt-2">Store 1</span>
            </div>
            <div className="flex flex-col items-center justify-center">
              <div className="h-16 w-16 bg-white rounded-full border"></div>
              <span className="text-xs mt-2">Store 1</span>
            </div>
          </div>
        </section>
      </div>
      <div className="px-24 mt-10 flex">
        <div className="w-[60%] h-screen">
          <div className="flex items-center">
            <span className="h-10 w-10 border-2 font-semibold text-lg border-black flex items-center justify-center rounded-full">
              1
            </span>
            <span className="font-poppins font-semibold ml-3 text-xl text-neutral-900">
              Billing Details
            </span>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-10">
            <div>
              <label
                className="text-xs font-medium text-neutral-500"
                htmlFor=""
              >
                Name
              </label>
              <input
                type="text"
                className="w-full h-12 border outline-none border-black/10 rounded px-4 mt-1"
                placeholder="Enter receivers name"
              />
            </div>
            <div>
              <label
                className="text-xs font-medium text-neutral-500"
                htmlFor=""
              >
                Phone
              </label>
              <input
                type="tel"
                className="w-full h-12 border outline-none border-black/10 rounded px-4 mt-1"
                placeholder="Enter receivers phone number"
              />
            </div>
            <div>
              <label
                className="text-xs font-medium text-neutral-500"
                htmlFor=""
              >
                Email
              </label>
              <input
                type="tel"
                className="w-full h-12 border outline-none border-black/10 rounded px-4 mt-1"
                placeholder="Enter receivers phone number"
              />
            </div>
            <div>
              <label
                className="text-xs font-medium text-neutral-500"
                htmlFor=""
              >
                Zip code
              </label>
              <input
                type="tel"
                className="w-full h-12 border outline-none border-black/10 rounded px-4 mt-1"
                placeholder="Enter receivers phone number"
              />
            </div>
            <div>
              <label
                className="text-sm font-medium text-neutral-500"
                htmlFor=""
              >
                Phone
              </label>
              <textarea
                name=""
                placeholder="Receivers address"
                id=""
                className="w-full outline-none border border-black/10 rounded p-4 mt-1 h-36 resize-none"
              ></textarea>
            </div>
          </div>
          <div className="flex items-center mt-16">
            <span className="h-10 w-10 border-2 font-semibold text-lg border-black flex items-center justify-center rounded-full">
              2
            </span>
            <span className="font-poppins font-semibold ml-3 text-xl text-neutral-900">
              Purchased Items
            </span>
          </div>
          <div className="mt-10">
            <div className="flex items-center">
              <input
                type="text"
                className="px-4 h-12 outline-none w-full border overflow-hidden rounded"
                placeholder="Name"
                name=""
                id=""
              />
              <div className="flex items-center h-12 border rounded overflow-hidden w-fit shrink-0 ml-4">
                <button className="flex items-center justify-center px-3 bg-neutral-50/10 h-full border-r border-black/10">
                  +
                </button>
                <span className="px-3">0</span>
                <button className="flex items-center justify-center px-3 bg-neutral-50/10 h-full border-l border-black/10">
                  -
                </button>
              </div>
              <div className="flex items-center h-12 border rounded overflow-hidden w-fit shrink-0 ml-4">
                <button className="flex items-center justify-center px-3 bg-neutral-50/10 h-full border-r border-black/10">
                  ₹
                </button>
                <input
                  type="text"
                  className="px-4 h-12 outline-none max-w-[100px]"
                  placeholder="Price"
                  name=""
                  id=""
                />
              </div>
              <button className="px-6 h-12 outline-none text-sm rounded shrink-0 bg-slate-800 text-white ml-4">
                Add ₹0
              </button>
            </div>

            <table className="w-full mt-10">
              <thead className="pl-3 w-full">
                <tr>
                  <th className="font-normal px-5 py-4 text-sm text-left">
                    No.
                  </th>
                  <th className="font-normal px-5 py-4 text-sm text-left">
                    Name
                  </th>
                  <th className="font-normal px-5 py-4 text-sm text-left">
                    Price
                  </th>
                  <th className="font-normal px-5 py-4 text-sm text-left">
                    Quantity
                  </th>
                  <th className="font-normal px-5 py-4 text-sm text-left">
                    Total
                  </th>
                  <th className="font-normal px-5 py-4 text-sm text-left"></th>
                </tr>
              </thead>
              <tbody className="w-full">
                <tr className="overflow-hidden w-fit shrink-0 border-b">
                  <td className="font-normal px-5 py-3 text-sm text-left">
                    {0 + 1}
                  </td>
                  <td className="font-normal px-5 py-3 text-sm text-left">
                    2e3e
                  </td>
                  <td className="font-normal px-5 py-3 text-sm text-left">
                    <button className="h-10 w-10 bg-neutral-50 rounded-md flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 256 256"
                      >
                        <path
                          fill="currentColor"
                          d="M230.92 212c-15.23-26.33-38.7-45.21-66.09-54.16a72 72 0 1 0-73.66 0c-27.39 8.94-50.86 27.82-66.09 54.16a8 8 0 1 0 13.85 8c18.84-32.56 52.14-52 89.07-52s70.23 19.44 89.07 52a8 8 0 1 0 13.85-8ZM72 96a56 56 0 1 1 56 56a56.06 56.06 0 0 1-56-56Z"
                        />
                      </svg>
                    </button>
                  </td>
                  <td className="font-normal px-5 py-3 text-sm text-left">
                    <button className="h-10 w-10 bg-neutral-50 rounded-md flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="currentColor"
                          d="M5 3h13a3 3 0 0 1 3 3v13a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3V6a3 3 0 0 1 3-3m0 1a2 2 0 0 0-2 2v11.59l4.29-4.3l2.5 2.5l5-5L20 16V6a2 2 0 0 0-2-2H5m4.79 13.21l-2.5-2.5L3 19a2 2 0 0 0 2 2h13a2 2 0 0 0 2-2v-1.59l-5.21-5.2l-5 5M7.5 6A2.5 2.5 0 0 1 10 8.5A2.5 2.5 0 0 1 7.5 11A2.5 2.5 0 0 1 5 8.5A2.5 2.5 0 0 1 7.5 6m0 1A1.5 1.5 0 0 0 6 8.5A1.5 1.5 0 0 0 7.5 10A1.5 1.5 0 0 0 9 8.5A1.5 1.5 0 0 0 7.5 7Z"
                        />
                      </svg>
                    </button>
                  </td>
                  <td className="font-normal px-5 py-3 text-sm text-left">
                    Laddoo
                  </td>
                  <td className="font-normal px-5 py-3 text-sm text-right">
                    <div className="flex items-center justify-center text-neutral-600">
                      <Icon height={20} icon="ion:close-outline" />
                    </div>
                  </td>
                </tr>
                <tr className="overflow-hidden w-fit shrink-0 border-b">
                  <td className="font-normal px-5 py-3 text-sm text-left">
                    {0 + 1}
                  </td>
                  <td className="font-normal px-5 py-3 text-sm text-left">
                    2e3e
                  </td>
                  <td className="font-normal px-5 py-3 text-sm text-left">
                    <button className="h-10 w-10 bg-neutral-50 rounded-md flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 256 256"
                      >
                        <path
                          fill="currentColor"
                          d="M230.92 212c-15.23-26.33-38.7-45.21-66.09-54.16a72 72 0 1 0-73.66 0c-27.39 8.94-50.86 27.82-66.09 54.16a8 8 0 1 0 13.85 8c18.84-32.56 52.14-52 89.07-52s70.23 19.44 89.07 52a8 8 0 1 0 13.85-8ZM72 96a56 56 0 1 1 56 56a56.06 56.06 0 0 1-56-56Z"
                        />
                      </svg>
                    </button>
                  </td>
                  <td className="font-normal px-5 py-3 text-sm text-left">
                    <button className="h-10 w-10 bg-neutral-50 rounded-md flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="currentColor"
                          d="M5 3h13a3 3 0 0 1 3 3v13a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3V6a3 3 0 0 1 3-3m0 1a2 2 0 0 0-2 2v11.59l4.29-4.3l2.5 2.5l5-5L20 16V6a2 2 0 0 0-2-2H5m4.79 13.21l-2.5-2.5L3 19a2 2 0 0 0 2 2h13a2 2 0 0 0 2-2v-1.59l-5.21-5.2l-5 5M7.5 6A2.5 2.5 0 0 1 10 8.5A2.5 2.5 0 0 1 7.5 11A2.5 2.5 0 0 1 5 8.5A2.5 2.5 0 0 1 7.5 6m0 1A1.5 1.5 0 0 0 6 8.5A1.5 1.5 0 0 0 7.5 10A1.5 1.5 0 0 0 9 8.5A1.5 1.5 0 0 0 7.5 7Z"
                        />
                      </svg>
                    </button>
                  </td>
                  <td className="font-normal px-5 py-3 text-sm text-left">
                    Laddoo
                  </td>
                  <td className="font-normal px-5 py-3 text-sm text-right">
                    <div className="flex items-center justify-center text-neutral-600">
                      <Icon height={20} icon="ion:close-outline" />
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}
