/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import { v4 as uuidv4 } from "uuid";
import { Inter } from "next/font/google";
import { Icon } from "@iconify/react";
import StoreCard from "@/components/StoreCard";
import { useEffect, useState } from "react";
import PurchaseRow from "@/components/PurchaseRow";
import { decrypt, encrypt } from "@/helper/crypto";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  const [savedCustomers, setSavedCustomers] = useState([]);
  const [savedStores, setSavedStores] = useState([]);

  const [customerQuery, setCustomerQuery] = useState("");
  const [saveBillingDetails, setSaveBillingDetails] = useState(false);
  const [billingDetails, setBillingDetails] = useState({
    name: "",
    phone: "",
    email: "",
    zipCode: "",
    address: "",
  });
  const [storeDetails, setStoreDetails] = useState({
    name: "",
    phone: "",
    email: "",
    zipCode: "",
    address: "",
  });

  const [total, setTotal] = useState(0);
  const [items, setItems] = useState([]);
  const [item, setItem] = useState({
    name: "",
    price: "",
    quantity: 1,
  });
  const [chooseCustomerOpen, setChooseCustomerOpen] = useState(false);

  const addItem = () => {
    if (item.name === "" || item.price === "") return;

    let newItems = [...items];
    newItems.push(item);
    setItems(newItems);
    setItem({
      id: uuidv4(),
      name: "",
      price: "",
      quantity: 1,
    });
  };

  const onRemove = (index) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);
  };

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

  const AddItemRow = () => (
    <div className="hidden lg:flex items-center">
      <input
        type="text"
        className="px-4 h-12 outline-none w-full border overflow-hidden rounded"
        placeholder="Name"
        value={item.name}
        onChange={(e) => setItem({ ...item, name: e.target.value })}
        name=""
        id=""
      />
      <div className="flex items-center justify-between h-12 border rounded overflow-hidden w-[130px] shrink-0 ml-4">
        <button
          onClick={() => {
            setItem({
              ...item,
              quantity: item.quantity + 1,
            });
          }}
          className="flex items-center justify-center px-3 bg-neutral-50/10 w-[40px] h-full border-r border-black/10"
        >
          +
        </button>
        <input
          type="tel"
          className="h-12 outline-none w-[50px] text-center"
          placeholder="Quantity"
          readOnly
          value={item.quantity}
          onChange={(e) => setItem({ ...item, quantity: e.target.value })}
          name=""
          id=""
        />
        <button
          onClick={() => {
            setItem({
              ...item,
              quantity: item.quantity > 1 ? item.quantity - 1 : 1,
            });
          }}
          className="flex items-center justify-center px-3 bg-neutral-50/10 h-full w-[40px] border-l border-black/10"
        >
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
          value={item.price}
          onChange={(e) => setItem({ ...item, price: e.target.value })}
          name=""
          id=""
        />
      </div>
      <button
        onClick={() => {
          addItem();
        }}
        className="w-[130px] h-12 outline-none text-sm rounded shrink-0 bg-slate-800 text-white ml-4"
      >
        Add ₹{item.price * item.quantity}
      </button>
    </div>
  );

  useEffect(() => {
    let total = 0;
    items.forEach((item) => {
      total += item.price * item.quantity;
    });
    setTotal(total);
  }, [items]);

  useEffect(() => {
    let localCustomerDetails = localStorage.getItem("customerDetails");
    if (localCustomerDetails) {
      localCustomerDetails = JSON.parse(
        decrypt(JSON.parse(localCustomerDetails))
      );
      if (customerQuery === "") {
        setSavedCustomers(localCustomerDetails);
        return;
      }
      localCustomerDetails = localCustomerDetails.filter(
        (customer) =>
          customer.name.toLowerCase().includes(customerQuery.toLowerCase()) ||
          customer.phone.includes(customerQuery) ||
          customer.email.toLowerCase().includes(customerQuery.toLowerCase()) ||
          customer.zipCode.includes(customerQuery)
      );
      setSavedCustomers(localCustomerDetails);
    } else {
      setSavedCustomers([]);
    }
  }, [customerQuery]);

  useEffect(() => {
    let localCustomerDetails = localStorage.getItem("customerDetails");
    if (localCustomerDetails) {
      localCustomerDetails = JSON.parse(
        decrypt(JSON.parse(localCustomerDetails))
      );
      setSavedCustomers(localCustomerDetails);
    } else {
      setSavedCustomers([]);
    }
  }, []);

  const generateInvoice = () => {
    if (items.length === 0) {
      alert("Please add items to generate invoice");
      return;
    } else if (
      billingDetails.name == "" ||
      billingDetails.phone == "" ||
      billingDetails.zipCode == ""
    ) {
      alert("Please fill all the billing details");
      return;
    }

    if (saveBillingDetails) {
      let localCustomerDetails = localStorage.getItem("customerDetails");
      if (localCustomerDetails) {
        localCustomerDetails = JSON.parse(
          decrypt(JSON.parse(localCustomerDetails))
        );
        localCustomerDetails.push({
          ...billingDetails,
        });
        localCustomerDetails = encrypt(JSON.stringify(localCustomerDetails));
        localStorage.setItem(
          "customerDetails",
          JSON.stringify(localCustomerDetails)
        );
      } else {
        localCustomerDetails = [];
        localCustomerDetails.push({
          ...billingDetails,
        });
        localCustomerDetails = encrypt(JSON.stringify(localCustomerDetails));
        localStorage.setItem(
          "customerDetails",
          JSON.stringify(localCustomerDetails)
        );
      }
    }
    // get saved billing details from local storage

    let invoiceId = uuidv4();
    let localBillingDetails = localStorage.getItem("billingDetails");
    if (localBillingDetails) {
      localBillingDetails = JSON.parse(
        decrypt(JSON.parse(localBillingDetails))
      );
      localBillingDetails.push({
        id: invoiceId,
        ...billingDetails,
        storeDetails,
        items,
        total,
      });
      localBillingDetails = encrypt(JSON.stringify(localBillingDetails));
      localStorage.setItem(
        "billingDetails",
        JSON.stringify(localBillingDetails)
      );
      router.push(`/invoice/${invoiceId}`);
    } else {
      localBillingDetails = [];
      localBillingDetails.push({
        id: invoiceId,
        ...billingDetails,
        storeDetails,
        items,
        total,
      });
      localBillingDetails = encrypt(JSON.stringify(localBillingDetails));
      localStorage.setItem(
        "billingDetails",
        JSON.stringify(localBillingDetails)
      );
      router.push(`/invoice/${invoiceId}`);
    }
  };

  return (
    <main className="fixed inset-0 max-h-screen overflow-y-auto overflow-x-hidden pb-16">
      <div className="bg-gradient-to-b from-white to-slate-50 pb-7 border-b flex flex-col items-center justify-center relative overflow-hidden">
        {staticImages()}
        <nav className="w-full h-16 flex items-center px-16 justify-center lg:justify-end">
          <ul className="flex items-center space-x-10 text-sm">
            <li>Settings</li>
            <li>Stores</li>
            <li>History</li>
            <li>Login</li>
          </ul>
        </nav>
        <section className="inset-0 h-fit w-full z-0 flex flex-col items-center justify-center mt-10">
          <div className="text-center z-10">
            <h1 className="font-dancing-script text-5xl">Swift Bills</h1>
            <p className="text-sm mt-4">
              Butter smooth billing system for your small business needs.
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
            <StoreCard />
            <StoreCard />
          </div>
        </section>
      </div>
      <div className="px-6 lg:px-24 mt-10 lg:flex">
        <section className="lg:w-[60%]">
          <section>
            <div className="flex items-center">
              <span className="h-10 w-10 border-2 font-semibold text-lg border-black flex items-center justify-center rounded-full">
                1
              </span>
              <span className="font-poppins font-semibold ml-3 text-xl text-neutral-900">
                Billing Details
              </span>
            </div>
            <div className=" mt-10">
              <div>
                {savedCustomers.length > 0 && (
                  <button
                    onClick={() => setChooseCustomerOpen(true)}
                    className="text-sm text-blue-600 hover:underline"
                  >
                    Choose existing customer
                  </button>
                )}
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-7">
                <div>
                  <label
                    className="text-xs font-medium text-neutral-500"
                    htmlFor=""
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    value={billingDetails.name}
                    onChange={(e) =>
                      setBillingDetails({
                        ...billingDetails,
                        name: e.target.value,
                      })
                    }
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
                    value={billingDetails.phone}
                    onChange={(e) =>
                      setBillingDetails({
                        ...billingDetails,
                        phone: e.target.value,
                      })
                    }
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
                    type="email"
                    value={billingDetails.email}
                    onChange={(e) =>
                      setBillingDetails({
                        ...billingDetails,
                        email: e.target.value,
                      })
                    }
                    className="w-full h-12 border outline-none border-black/10 rounded px-4 mt-1"
                    placeholder="Enter receivers email"
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
                    value={billingDetails.zipCode}
                    onChange={(e) =>
                      setBillingDetails({
                        ...billingDetails,
                        zipCode: e.target.value,
                      })
                    }
                    className="w-full h-12 border outline-none border-black/10 rounded px-4 mt-1"
                    placeholder="Enter receivers zip code"
                  />
                </div>
                <div>
                  <label
                    className="text-sm font-medium text-neutral-500"
                    htmlFor=""
                  >
                    Address
                  </label>
                  <textarea
                    name=""
                    placeholder="Receivers address"
                    value={billingDetails.address}
                    onChange={(e) =>
                      setBillingDetails({
                        ...billingDetails,
                        address: e.target.value,
                      })
                    }
                    id=""
                    className="w-full outline-none border border-black/10 rounded p-4 mt-1 h-36 resize-none"
                  ></textarea>
                </div>
              </div>
              <div className="mt-8">
                <label
                  className="text-sm font-medium text-neutral-500"
                  htmlFor=""
                >
                  Save details
                </label>

                <div className="flex items-center mt-3">
                  <input
                    type="checkbox"
                    className="h-4 w-4 border border-black/10 rounded mr-2"
                    checked={saveBillingDetails}
                    onChange={(e) => setSaveBillingDetails(e.target.checked)}
                    name=""
                    id=""
                  />
                  <span className="text-sm">Save billing details</span>
                </div>
              </div>
            </div>
          </section>
          <section>
            <div className="flex items-center mt-16">
              <span className="h-10 w-10 border-2 font-semibold text-lg border-black flex items-center justify-center rounded-full">
                2
              </span>
              <span className="font-poppins font-semibold ml-3 text-xl text-neutral-900">
                Purchased Items
              </span>
            </div>
            <div className="mt-10 overflow-x-auto">
              {AddItemRow()}
              {items.length > 0 && (
                <table className="w-full mt-10 overflow-auto whitespace-nowrap">
                  <thead className="pl-3 w-full">
                    <tr>
                      <th className="font-medium px-5 py-4 text-sm text-left text-neutral-600">
                        No.
                      </th>
                      <th className="font-medium px-5 py-4 text-sm text-left text-neutral-600">
                        Name
                      </th>
                      <th className="font-medium px-5 py-4 text-sm text-left text-neutral-600">
                        Price
                      </th>
                      <th className="font-medium px-5 py-4 text-sm text-left text-neutral-600">
                        Quantity
                      </th>
                      <th className="font-medium px-5 py-4 text-sm text-left text-neutral-600">
                        Total
                      </th>
                      <th className="font-medium px-5 py-4 text-sm text-left"></th>
                    </tr>
                  </thead>
                  <tbody className="w-full">
                    {items.map((item, index) => (
                      <PurchaseRow
                        key={index}
                        item={item}
                        index={index}
                        onRemove={onRemove}
                      />
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </section>
        </section>
        <section className="lg:w-[40%] lg:pl-16 mt-20 lg:mt-0">
          <div className="bg-neutral-50/50 px-4 py-5 min-h-[200px] border">
            <div className="flex items-center justify-center whitespace-nowrap">
              <div className="h-[1px] w-full bg-slate-200"></div>
              <span className="shrink-0 ml-5">
                <Icon height={24} icon="solar:bill-list-linear" />
              </span>
              <span className="font-semibold text-neutral-600 font-poppins ml-2 mr-5">
                Bill preview
              </span>
              <div className="h-[1px] w-full bg-slate-200"></div>
            </div>

            <div className="mt-7 border-b border-neutral-200 pb-6">
              {items.map((item, index) => (
                <div
                  key={index}
                  className="grid grid-cols-5 items-center justify-between mt-5"
                >
                  <span className="text-sm col-span-3 font-medium text-neutral-600">
                    {item.name}
                  </span>
                  <span className="text-sm font-medium text-right text-neutral-600">
                    {item.quantity}
                  </span>
                  <span className="text-sm font-medium text-right text-neutral-600">
                    ₹{item.price * item.quantity}
                  </span>
                </div>
              ))}
            </div>
            <div className="flex justify-between items-center">
              <p className="text-sm font-semibold text-neutral-700 mt-7">
                Total Amount
              </p>

              <span className="text-base font-medium text-neutral-700">
                ₹{total}
              </span>
            </div>
            <button
              onClick={() => {
                generateInvoice();
              }}
              className="h-12 w-full bg-slate-900 text-white tracking-wide mt-10 rounded"
            >
              Generate Invoice
            </button>
          </div>
        </section>
      </div>
      {chooseCustomerOpen && (
        <div className="fixed inset-0 h-full w-full bg-black/50 flex items-center justify-center">
          <div className="bg-white w-[550px] h-[500px] relative overflow-y-auto rounded-md">
            <div className="bg-white sticky top-0 inset-x-0 border-b">
              <div className="flex items-center justify-between bg-slate-50 h-16 px-6 border-b">
                <div className="flex items-center space-x-2">
                  <span className="text-base font-semibold text-slate-700">
                    Choose customer
                  </span>
                </div>
                <button
                  onClick={() => setChooseCustomerOpen(false)}
                  className="text-sm"
                >
                  Cancel
                </button>
              </div>
              <div className="flex items-center px-6">
                <span>
                  <Icon height={17} icon="carbon:search" />
                </span>
                <input
                  type="text"
                  value={customerQuery}
                  onChange={(e) => setCustomerQuery(e.target.value)}
                  placeholder="Search customer"
                  className="h-12 outline-none px-3 w-full text-sm"
                />
              </div>
            </div>
            <div className="mt-4">
              {savedCustomers.map((customer, index) => (
                <div
                  key={index}
                  className="text-xs space-y-1 text-neutral-600 border-b pb-4 px-6 mb-4 flex items-center justify-between"
                >
                  <div className="text-xs space-y-1 text-neutral-600">
                    <p className="text-sm text-neutral-800 font-medium">
                      {customer.name}
                    </p>
                    <p>
                      {customer.phone} | {customer.zipCode}
                    </p>
                    <p>{customer.email}</p>
                    <p>{customer.address}</p>
                  </div>
                  <div className="justify-end flex">
                    <button
                      onClick={() => {
                        setBillingDetails({
                          ...customer,
                        });
                        setChooseCustomerOpen(false);
                        setSaveBillingDetails(false);
                      }}
                      className="border px-3 py-2 rounded text-sm"
                    >
                      Choose
                    </button>
                  </div>
                </div>
              ))}
            </div>
            {/* <div className="sticky top-0 inset-x-0 border-b">
              <div className="flex items-center justify-end">
                <input
                  type="text"
                  value={customerQuery}
                  onChange={(e) => setCustomerQuery(e.target.value)}
                  placeholder="Search customer"
                  className="w-full h-12 outline-none px-4"
                  name=""
                  id=""
                />
                <button
                  onClick={() => setChooseCustomerOpen(false)}
                  className="text-sm px-4 h-12 border-l bg-neutral-50"
                >
                  Cancel
                </button>
              </div>
            </div>
            <div className="p-6">
              {savedCustomers.map((customer, index) => (
                <div
                  key={index}
                  className="text-xs space-y-1 text-neutral-600 border-b pb-3 mb-3 flex items-center justify-between"
                >
                  <div className="text-xs space-y-1 text-neutral-600">
                    <p className="text-sm text-neutral-800 font-medium">
                      {customer.name}
                    </p>
                    <p>
                      {customer.phone} | {customer.zipCode}
                    </p>
                    <p>{customer.email}</p>
                    <p>{customer.address}</p>
                  </div>
                  <div className="justify-end flex">
                    <button
                      onClick={() => {
                        setBillingDetails({
                          ...customer,
                        });
                        setChooseCustomerOpen(false);
                        setSaveBillingDetails(false);
                      }}
                      className="border px-3 py-2 rounded text-sm"
                    >
                      Choose
                    </button>
                  </div>
                </div>
              ))}
            </div> */}
          </div>
        </div>
      )}
    </main>
  );
}
