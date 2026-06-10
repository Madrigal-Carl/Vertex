import { useState, useRef } from "react";
import { createPortal } from "react-dom";
import { ordersList, productsList } from "@/constants/mockData";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { SearchBar } from "@/components/admin/SearchBar";
import { Pagination } from "@/components/admin/Pagination";
import { FilterPanel } from "@/components/admin/FilterPanel";
import {
  LuEye as Eye,
  LuDownload as Download,
  LuX as X,
  LuPlus as Plus,
  LuMinus as Minus,
  LuSearch as Search,
  LuPackage as Package,
  LuCheck as Check,
  LuMapPin as MapPin,
  LuPhone as Phone,
  LuUser as User,
  LuCreditCard as CreditCard,
  LuTruck as Truck,
  LuClock as Clock,
  LuPencil as Edit,
  LuEllipsis as MoreHorizontal,
} from "react-icons/lu";

const cn = (...c) => c.filter(Boolean).join(" ");

const ORDER_TIMELINE = {
  Pending: { step: 0, label: "Pending" },
  Processing: { step: 1, label: "Processing" },
  Completed: { step: 3, label: "Completed" },
  Cancelled: { step: -1, label: "Cancelled" },
};
const TIMELINE_STEPS = [
  "Order Placed",
  "Processing",
  "Ready / Shipped",
  "Delivered",
];

export default function Orders() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [editingOrder, setEditingOrder] = useState(null);
  const [orderDropdown, setOrderDropdown] = useState(null);
  const [orderDropdownRect, setOrderDropdownRect] = useState(null);
  const orderDropdownRefs = useRef({});
  const [isNewOrderOpen, setIsNewOrderOpen] = useState(false);
  const [orderItems, setOrderItems] = useState([]);
  const [productSearch, setProductSearch] = useState("");
  const [openPickerFor, setOpenPickerFor] = useState(null);
  const [pickerRect, setPickerRect] = useState(null);
  const [productPage, setProductPage] = useState(1);
  const [deliveryMethod, setDeliveryMethod] = useState("");
  const cardRefs = useRef({});

  function handleOrderDropdown(id) {
    if (orderDropdown === id) {
      setOrderDropdown(null);
      setOrderDropdownRect(null);
    } else {
      const rect = orderDropdownRefs.current[id]?.getBoundingClientRect();
      setOrderDropdownRect(rect || null);
      setOrderDropdown(id);
    }
  }
  const PRODUCTS_PER_PAGE = 9;

  function itemKey(productId, variantId) {
    return `${productId}::${variantId}`;
  }
  function addVariant(product, variant) {
    const key = itemKey(product.id, variant.id);
    setOrderItems((prev) => {
      const existing = prev.find((i) => i.key === key);
      if (existing) {
        if (existing.qty >= variant.stock) return prev;
        return prev.map((i) => (i.key === key ? { ...i, qty: i.qty + 1 } : i));
      }
      return [
        ...prev,
        {
          key,
          productId: product.id,
          name: product.name,
          price: Number(product.price),
          qty: 1,
          variantId: variant.id,
          variantLabel: variant.label,
          stock: variant.stock,
        },
      ];
    });
    setOpenPickerFor(null);
    setPickerRect(null);
  }
  function incrementQty(key) {
    setOrderItems((prev) =>
      prev.map((i) =>
        i.key === key && i.qty < i.stock ? { ...i, qty: i.qty + 1 } : i,
      ),
    );
  }
  function decrementQty(key) {
    setOrderItems((prev) => {
      const item = prev.find((i) => i.key === key);
      if (!item) return prev;
      if (item.qty <= 1) return prev.filter((i) => i.key !== key);
      return prev.map((i) => (i.key === key ? { ...i, qty: i.qty - 1 } : i));
    });
  }
  function removeItem(key) {
    setOrderItems((prev) => prev.filter((i) => i.key !== key));
  }
  function closeNewOrder() {
    setIsNewOrderOpen(false);
    setOrderItems([]);
    setProductSearch("");
    setOpenPickerFor(null);
    setPickerRect(null);
    setDeliveryMethod("");
  }
  const needsAddress =
    deliveryMethod === "delivery" || deliveryMethod === "courier";
  const orderTotal = orderItems.reduce(
    (sum, item) => sum + item.price * item.qty,
    0,
  );
  const filteredProducts = productsList.filter(
    (p) =>
      p.name.toLowerCase().includes(productSearch.toLowerCase()) ||
      p.category.toLowerCase().includes(productSearch.toLowerCase()),
  );
  const totalProductPages = Math.ceil(
    filteredProducts.length / PRODUCTS_PER_PAGE,
  );
  const pagedProducts = filteredProducts.slice(
    (productPage - 1) * PRODUCTS_PER_PAGE,
    productPage * PRODUCTS_PER_PAGE,
  );
  function getOrderedQtyForVariant(productId, variantId) {
    return (
      orderItems.find(
        (i) => i.productId === productId && i.variantId === variantId,
      )?.qty ?? 0
    );
  }
  function getTotalOrderedQtyForProduct(productId) {
    return orderItems
      .filter((i) => i.productId === productId)
      .reduce((s, i) => s + i.qty, 0);
  }

  function openPicker(productId, e) {
    if (openPickerFor === productId) {
      setOpenPickerFor(null);
      setPickerRect(null);
      return;
    }
    const el = cardRefs.current[productId];
    const rect = el?.getBoundingClientRect();
    setPickerRect(rect || null);
    setOpenPickerFor(productId);
  }

  // Compute fixed position for picker — prefer left side of card
  const PICKER_W = 248;
  let pickerStyle = {};
  if (pickerRect) {
    const spaceLeft = pickerRect.left - 12;
    const spaceRight = window.innerWidth - pickerRect.right - 12;
    const left =
      spaceLeft >= PICKER_W
        ? pickerRect.left - PICKER_W - 8
        : pickerRect.right + 8;
    const top = Math.min(pickerRect.top, window.innerHeight - 360);
    pickerStyle = { left, top, width: PICKER_W };
  }

  const openProduct = openPickerFor
    ? productsList.find((p) => p.id === openPickerFor)
    : null;

  const filteredOrders = ordersList.filter((o) => {
    const matchSearch =
      !search ||
      o.customer.toLowerCase().includes(search.toLowerCase()) ||
      o.id.toLowerCase().includes(search.toLowerCase());
    const matchStatus =
      statusFilter === "all" || o.status.toLowerCase() === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">All Orders</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            {ordersList.length} total orders
          </p>
        </div>
        <div className="flex gap-2">
          <button
            className="inline-flex items-center justify-center gap-2 text-sm font-medium cursor-pointer border border-border bg-transparent rounded-[4px] min-h-9 px-4 hover:bg-secondary"
            data-testid="button-export-csv"
          >
            <Download className="w-4 h-4" /> Export
          </button>
          <button
            className="inline-flex items-center justify-center gap-2 text-sm font-medium cursor-pointer bg-[#E60000] hover:bg-[#CC0000] text-white rounded-[4px] min-h-9 px-4"
            onClick={() => setIsNewOrderOpen(true)}
            data-testid="button-new-order"
          >
            <Plus className="w-4 h-4" /> New Order
          </button>
        </div>
      </div>

      {/* ── NEW ORDER MODAL ── */}
      {isNewOrderOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4"
          onClick={closeNewOrder}
        >
          <div className="fixed inset-0 bg-black/50" />
          <div
            className="relative z-50 bg-card rounded-[8px] w-full max-w-[1200px] h-[90vh] max-h-[820px] shadow-xl overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="px-6 pt-5 pb-4 border-b border-border shrink-0 flex items-start justify-between">
              <div>
                <h2 className="text-lg font-bold">New Walk-in Order</h2>
                <p className="text-sm text-muted-foreground mt-0.5">
                  Fill in the order details and pick products from the
                  catalogue.
                </p>
              </div>
              <button
                className="inline-flex items-center justify-center h-8 w-8 rounded-[4px] hover:bg-secondary cursor-pointer mt-0.5"
                onClick={closeNewOrder}
              >
                <X className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>

            <div className="flex flex-1 min-h-0">
              {/* LEFT PANEL — details + cart */}
              <div className="w-[340px] shrink-0 flex flex-col border-r border-border">
                <div className="flex-1 overflow-y-auto px-5 py-5 space-y-5">
                  {/* Customer */}
                  <section className="space-y-3">
                    <h3 className="text-[10px] font-bold tracking-widest uppercase text-muted-foreground flex items-center gap-1.5">
                      <User className="w-3 h-3" /> Customer
                    </h3>
                    <div className="space-y-2.5">
                      <div className="space-y-1.5">
                        <label className="text-xs font-medium">Full Name</label>
                        <input
                          placeholder="e.g. John Santos"
                          className="flex h-8 w-full rounded-[4px] border border-input bg-transparent px-3 py-1 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#E60000]/30"
                          data-testid="input-customer-name"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-medium">
                          Phone{" "}
                          <span className="text-muted-foreground font-normal">
                            (optional)
                          </span>
                        </label>
                        <input
                          placeholder="+63 912 345 6789"
                          className="flex h-8 w-full rounded-[4px] border border-input bg-transparent px-3 py-1 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#E60000]/30"
                          data-testid="input-customer-phone"
                        />
                      </div>
                    </div>
                  </section>

                  {/* Fulfilment */}
                  <section className="space-y-3">
                    <h3 className="text-[10px] font-bold tracking-widest uppercase text-muted-foreground flex items-center gap-1.5">
                      <Truck className="w-3 h-3" /> Fulfilment
                    </h3>
                    <div className="space-y-2.5">
                      <div className="space-y-1.5">
                        <label className="text-xs font-medium">
                          Delivery Method
                        </label>
                        <select
                          value={deliveryMethod}
                          onChange={(e) => setDeliveryMethod(e.target.value)}
                          className="flex h-8 w-full rounded-[4px] border border-input bg-transparent px-3 py-1 text-sm cursor-pointer focus-visible:outline-none"
                          data-testid="select-delivery-method"
                        >
                          <option value="">Select method</option>
                          <option value="pickup">Pick-up (Walk-in)</option>
                          <option value="delivery">Home Delivery</option>
                          <option value="courier">Third-party Courier</option>
                        </select>
                      </div>
                      {needsAddress && (
                        <div className="space-y-2.5 pt-2 border-t border-dashed border-border">
                          <p className="text-[10px] font-bold tracking-widest uppercase text-muted-foreground flex items-center gap-1.5 pt-0.5">
                            <MapPin className="w-3 h-3" /> Delivery Address
                          </p>
                          <div className="space-y-1.5">
                            <label className="text-xs font-medium">
                              Street / Barangay
                            </label>
                            <input
                              placeholder="e.g. 123 Rizal St., Brgy. San Juan"
                              className="flex h-8 w-full rounded-[4px] border border-input bg-transparent px-3 py-1 text-sm focus-visible:outline-none"
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <div className="space-y-1.5">
                              <label className="text-xs font-medium">
                                City
                              </label>
                              <input
                                placeholder="e.g. Makati"
                                className="flex h-8 w-full rounded-[4px] border border-input bg-transparent px-3 py-1 text-sm focus-visible:outline-none"
                              />
                            </div>
                            <div className="space-y-1.5">
                              <label className="text-xs font-medium">
                                ZIP Code
                              </label>
                              <input
                                placeholder="e.g. 1200"
                                className="flex h-8 w-full rounded-[4px] border border-input bg-transparent px-3 py-1 text-sm focus-visible:outline-none"
                              />
                            </div>
                          </div>
                          <div className="space-y-1.5">
                            <label className="text-xs font-medium">
                              Province / Region
                            </label>
                            <input
                              placeholder="e.g. Metro Manila"
                              className="flex h-8 w-full rounded-[4px] border border-input bg-transparent px-3 py-1 text-sm focus-visible:outline-none"
                            />
                          </div>
                          {deliveryMethod === "courier" && (
                            <div className="space-y-1.5">
                              <label className="text-xs font-medium">
                                Courier / Tracking Ref.{" "}
                                <span className="text-muted-foreground font-normal">
                                  (optional)
                                </span>
                              </label>
                              <input
                                placeholder="e.g. JRS, LBC — tracking #"
                                className="flex h-8 w-full rounded-[4px] border border-input bg-transparent px-3 py-1 text-sm focus-visible:outline-none"
                              />
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </section>

                  {/* Payment */}
                  <section className="space-y-3">
                    <h3 className="text-[10px] font-bold tracking-widest uppercase text-muted-foreground flex items-center gap-1.5">
                      <CreditCard className="w-3 h-3" /> Payment
                    </h3>
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium">
                        Payment Method
                      </label>
                      <select
                        className="flex h-8 w-full rounded-[4px] border border-input bg-transparent px-3 py-1 text-sm cursor-pointer focus-visible:outline-none"
                        data-testid="select-payment-method"
                      >
                        <option value="">Select method</option>
                        <option value="cash">Cash</option>
                        <option value="gcash">GCash</option>
                        <option value="card">Credit / Debit Card</option>
                        <option value="bank">Bank Transfer</option>
                      </select>
                    </div>
                  </section>

                  {/* Items */}
                  <section className="space-y-2">
                    <h3 className="text-[10px] font-bold tracking-widest uppercase text-muted-foreground flex items-center gap-1.5">
                      <Package className="w-3 h-3" /> Items Added{" "}
                      <span className="text-[#E60000] not-uppercase">
                        ({orderItems.length})
                      </span>
                    </h3>
                    {orderItems.length === 0 ? (
                      <div className="border border-dashed border-border rounded-[6px] py-5 text-center">
                        <Package className="w-6 h-6 text-muted-foreground/30 mx-auto mb-1.5" />
                        <p className="text-xs text-muted-foreground">
                          Pick products from the catalogue →
                        </p>
                      </div>
                    ) : (
                      <div className="border border-border rounded-[6px] overflow-hidden divide-y divide-border">
                        {orderItems.map((item) => (
                          <div
                            key={item.key}
                            className="flex items-start gap-2 px-3 py-2.5"
                          >
                            <div className="flex-1 min-w-0">
                              <p className="text-xs font-medium truncate">
                                {item.name}
                              </p>
                              <p className="text-[10px] text-muted-foreground mt-0.5">
                                {item.variantLabel}
                              </p>
                              <p className="text-[10px] text-muted-foreground">
                                ${item.price.toFixed(2)} each · {item.stock} in
                                stock
                              </p>
                            </div>
                            <div className="flex items-center gap-1 shrink-0 mt-0.5">
                              <button
                                onClick={() => decrementQty(item.key)}
                                className="w-5 h-5 rounded border border-border flex items-center justify-center text-muted-foreground hover:border-[#E60000] hover:text-[#E60000] transition-colors cursor-pointer"
                              >
                                <Minus className="w-2.5 h-2.5" />
                              </button>
                              <span className="w-6 text-center text-xs font-semibold">
                                {item.qty}
                              </span>
                              <button
                                onClick={() => incrementQty(item.key)}
                                disabled={item.qty >= item.stock}
                                className="w-5 h-5 rounded border border-border flex items-center justify-center text-muted-foreground hover:border-[#E60000] hover:text-[#E60000] transition-colors disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                              >
                                <Plus className="w-2.5 h-2.5" />
                              </button>
                            </div>
                            <div className="flex items-center gap-1 shrink-0 mt-0.5">
                              <span className="text-xs font-semibold w-14 text-right">
                                ${(item.price * item.qty).toFixed(2)}
                              </span>
                              <button
                                onClick={() => removeItem(item.key)}
                                className="text-muted-foreground hover:text-[#E60000] transition-colors ml-0.5 cursor-pointer"
                              >
                                <X className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </section>
                </div>

                {/* Cart footer */}
                <div className="border-t border-border px-5 py-4 shrink-0 space-y-3 bg-secondary/20">
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between text-muted-foreground text-xs">
                      <span>
                        Subtotal ({orderItems.reduce((s, i) => s + i.qty, 0)}{" "}
                        items)
                      </span>
                      <span>${orderTotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between font-bold text-sm border-t border-border pt-1.5 mt-1.5">
                      <span>Total</span>
                      <span className="text-[#E60000]">
                        ${orderTotal.toFixed(2)}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      className="inline-flex items-center justify-center gap-2 text-sm font-medium cursor-pointer border border-border bg-transparent rounded-[4px] flex-1 h-8 hover:bg-secondary"
                      onClick={closeNewOrder}
                    >
                      Cancel
                    </button>
                    <button
                      className="inline-flex items-center justify-center gap-2 text-sm font-medium cursor-pointer bg-[#E60000] hover:bg-[#CC0000] text-white rounded-[4px] flex-1 h-8 disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={orderItems.length === 0}
                      onClick={closeNewOrder}
                      data-testid="button-save-order"
                    >
                      Create Order
                    </button>
                  </div>
                </div>
              </div>

              {/* RIGHT PANEL — product catalogue */}
              <div className="flex-1 flex flex-col min-w-0">
                <div className="px-5 py-3.5 border-b border-border shrink-0">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                    <input
                      placeholder="Search products by name or category..."
                      value={productSearch}
                      onChange={(e) => {
                        setProductSearch(e.target.value);
                        setProductPage(1);
                      }}
                      className="pl-8 h-8 rounded-[4px] text-sm bg-secondary/60 border border-border w-full px-3 py-1 focus-visible:outline-none"
                      data-testid="input-product-search"
                    />
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto p-4">
                  {pagedProducts.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-sm text-muted-foreground gap-2">
                      <Package className="w-8 h-8 text-muted-foreground/30" />
                      <p>No products found</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 xl:grid-cols-3 gap-3">
                      {pagedProducts.map((product) => {
                        const totalOrdered = getTotalOrderedQtyForProduct(
                          product.id,
                        );
                        const inOrder = totalOrdered > 0;
                        const totalStock = product.variants.reduce(
                          (s, v) => s + v.stock,
                          0,
                        );
                        const isPickerOpen = openPickerFor === product.id;
                        return (
                          <div
                            key={product.id}
                            className="relative"
                            ref={(el) => (cardRefs.current[product.id] = el)}
                          >
                            <div
                              className={cn(
                                "border rounded-[6px] p-3 flex flex-col gap-2 cursor-pointer transition-all hover:shadow-sm select-none",
                                inOrder
                                  ? "border-[#E60000]/40 bg-red-50/60"
                                  : "border-border bg-card hover:border-border/60",
                                isPickerOpen && "ring-2 ring-[#E60000]/30",
                              )}
                              onClick={(e) => openPicker(product.id, e)}
                              data-testid={`product-card-${product.id}`}
                            >
                              <div
                                className={cn(
                                  "w-full h-16 rounded-[4px] flex items-center justify-center",
                                  inOrder ? "bg-red-50" : "bg-secondary",
                                )}
                              >
                                <Package
                                  className={cn(
                                    "w-6 h-6",
                                    inOrder
                                      ? "text-[#E60000]/40"
                                      : "text-muted-foreground/30",
                                  )}
                                />
                              </div>
                              <div className="space-y-0.5">
                                <p className="text-xs font-semibold leading-tight line-clamp-2">
                                  {product.name}
                                </p>
                                <p className="text-[10px] text-muted-foreground">
                                  {product.category}
                                </p>
                              </div>
                              <div className="flex items-center justify-between mt-auto pt-1 gap-1">
                                <span className="text-sm font-bold">
                                  ${product.price}
                                </span>
                                <div className="flex items-center gap-1.5 shrink-0">
                                  <span
                                    className={cn(
                                      "text-[10px] font-medium px-1.5 py-0.5 rounded-[3px]",
                                      totalStock === 0
                                        ? "bg-red-50 text-red-600"
                                        : totalStock < 10
                                          ? "bg-amber-50 text-amber-700"
                                          : "bg-secondary text-muted-foreground",
                                    )}
                                  >
                                    {totalStock === 0
                                      ? "Out of stock"
                                      : `${totalStock} in stock`}
                                  </span>
                                  {inOrder && (
                                    <span className="text-[10px] font-bold bg-[#E60000] text-white px-1.5 py-0.5 rounded-full">
                                      {totalOrdered}
                                    </span>
                                  )}
                                </div>
                              </div>
                              <p className="text-[10px] text-muted-foreground/70">
                                {product.variants.length} variant
                                {product.variants.length !== 1 ? "s" : ""} · tap
                                to select
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

                <div className="px-5 py-2.5 border-t border-border shrink-0 bg-secondary/20 flex items-center justify-between gap-4">
                  <p className="text-[10px] text-muted-foreground">
                    Click a product card to pick a variant. Use +/− on the left
                    to adjust quantities.
                  </p>
                  {totalProductPages > 1 && (
                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        onClick={() =>
                          setProductPage((p) => Math.max(1, p - 1))
                        }
                        disabled={productPage === 1}
                        className="h-6 w-6 rounded border border-border flex items-center justify-center text-xs text-muted-foreground hover:border-foreground/40 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
                      >
                        ‹
                      </button>
                      {Array.from(
                        { length: totalProductPages },
                        (_, i) => i + 1,
                      ).map((p) => (
                        <button
                          key={p}
                          onClick={() => setProductPage(p)}
                          className={cn(
                            "h-6 w-6 rounded border text-xs font-medium transition-colors cursor-pointer",
                            p === productPage
                              ? "bg-[#E60000] text-white border-[#E60000]"
                              : "border-border text-muted-foreground hover:border-foreground/40",
                          )}
                        >
                          {p}
                        </button>
                      ))}
                      <button
                        onClick={() =>
                          setProductPage((p) =>
                            Math.min(totalProductPages, p + 1),
                          )
                        }
                        disabled={productPage === totalProductPages}
                        className="h-6 w-6 rounded border border-border flex items-center justify-center text-xs text-muted-foreground hover:border-foreground/40 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
                      >
                        ›
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── VARIANT PICKER PORTAL — always on top, left of card ── */}
      {openPickerFor &&
        openProduct &&
        pickerRect &&
        createPortal(
          <>
            <div
              className="fixed inset-0 z-[9998]"
              onClick={() => {
                setOpenPickerFor(null);
                setPickerRect(null);
              }}
            />
            <div
              className="fixed z-[9999] rounded-[8px] border border-border bg-card shadow-xl overflow-hidden"
              style={pickerStyle}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="px-4 py-3 border-b border-border bg-secondary/40">
                <p className="text-sm font-semibold leading-tight">
                  {openProduct.name}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  ${openProduct.price} · Select a variant
                </p>
              </div>
              <div className="p-2 space-y-1 max-h-72 overflow-y-auto">
                {openProduct.variants.map((variant) => {
                  const orderedQty = getOrderedQtyForVariant(
                    openProduct.id,
                    variant.id,
                  );
                  const outOfStock = variant.stock === 0;
                  const atMax = orderedQty >= variant.stock;
                  return (
                    <button
                      key={variant.id}
                      disabled={outOfStock}
                      onClick={() => addVariant(openProduct, variant)}
                      className={cn(
                        "w-full flex items-center justify-between px-3 py-2 rounded-[6px] text-left text-sm transition-colors",
                        outOfStock
                          ? "opacity-40 cursor-not-allowed bg-secondary/40"
                          : atMax
                            ? "bg-red-50 border border-[#E60000]/30 cursor-not-allowed"
                            : "hover:bg-secondary border border-transparent hover:border-border cursor-pointer",
                      )}
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        {orderedQty > 0 && (
                          <span className="shrink-0 w-4 h-4 rounded-full bg-[#E60000] text-white text-[9px] font-bold flex items-center justify-center">
                            {orderedQty}
                          </span>
                        )}
                        <span
                          className={cn(
                            "text-xs font-medium truncate",
                            outOfStock && "line-through",
                          )}
                        >
                          {variant.label}
                        </span>
                      </div>
                      <span
                        className={cn(
                          "text-[10px] font-semibold shrink-0 ml-2",
                          outOfStock
                            ? "text-red-400"
                            : variant.stock < 5
                              ? "text-amber-600"
                              : "text-muted-foreground",
                        )}
                      >
                        {outOfStock
                          ? "Out of stock"
                          : atMax
                            ? "Max qty"
                            : `${variant.stock} left`}
                      </span>
                    </button>
                  );
                })}
              </div>
              <div className="px-3 pb-3 pt-1 border-t border-border">
                <button
                  onClick={() => {
                    setOpenPickerFor(null);
                    setPickerRect(null);
                  }}
                  className="w-full text-center text-xs text-muted-foreground hover:text-foreground py-1.5 transition-colors cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </>,
          document.body,
        )}

      {/* ── ORDER VIEW PANEL ── */}
      {selectedOrder && (
        <div
          className="fixed inset-0 z-50 flex justify-end"
          onClick={() => setSelectedOrder(null)}
        >
          <div className="fixed inset-0 bg-black/50" />
          <div
            className="fixed top-0 right-0 z-50 w-full sm:max-w-[440px] h-screen bg-card overflow-y-auto flex flex-col shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-start justify-between px-6 py-5 border-b border-border shrink-0">
              <div>
                <p className="text-xs text-muted-foreground font-medium mb-1">
                  {selectedOrder.date}
                </p>
                <h2 className="text-lg font-bold">{selectedOrder.id}</h2>
                <div className="flex items-center gap-2 mt-1.5">
                  <StatusBadge status={selectedOrder.status} />
                  <StatusBadge status={selectedOrder.paymentStatus} />
                </div>
              </div>
              <button
                className="inline-flex items-center justify-center h-8 w-8 rounded-[4px] hover:bg-secondary cursor-pointer mt-0.5"
                onClick={() => setSelectedOrder(null)}
              >
                <X className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>

            <div className="flex-1 px-6 py-5 space-y-6">
              {/* Timeline */}
              <div>
                <p className="text-[10px] font-bold tracking-widest uppercase text-muted-foreground mb-3">
                  Order Timeline
                </p>
                {selectedOrder.status === "Cancelled" ? (
                  <div className="flex items-center gap-2 px-3 py-2.5 rounded-[6px] bg-red-50 border border-red-100">
                    <X className="w-4 h-4 text-red-500 shrink-0" />
                    <span className="text-sm font-medium text-red-700">
                      Order was cancelled
                    </span>
                  </div>
                ) : (
                  <div className="relative">
                    <div className="absolute left-[13px] top-3 bottom-3 w-px bg-border" />
                    <div className="space-y-0">
                      {TIMELINE_STEPS.map((stepLabel, idx) => {
                        const currentStep =
                          ORDER_TIMELINE[selectedOrder.status]?.step ?? 0;
                        const done = idx < currentStep;
                        const active = idx === currentStep;
                        const future = idx > currentStep;
                        return (
                          <div
                            key={stepLabel}
                            className="flex items-center gap-3 relative py-2"
                          >
                            <div
                              className={cn(
                                "w-[26px] h-[26px] rounded-full border-2 flex items-center justify-center shrink-0 z-10 bg-card",
                                done
                                  ? "border-[#E60000] bg-[#E60000]"
                                  : active
                                    ? "border-[#E60000] bg-white"
                                    : "border-border bg-card",
                              )}
                            >
                              {done ? (
                                <Check className="w-3 h-3 text-white" />
                              ) : active ? (
                                <div className="w-2 h-2 rounded-full bg-[#E60000]" />
                              ) : null}
                            </div>
                            <div>
                              <p
                                className={cn(
                                  "text-sm font-medium",
                                  future
                                    ? "text-muted-foreground"
                                    : "text-foreground",
                                )}
                              >
                                {stepLabel}
                              </p>
                              {active && (
                                <p className="text-[10px] text-muted-foreground mt-0.5">
                                  {selectedOrder.date}
                                </p>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* Customer */}
              <div className="rounded-[6px] border border-border overflow-hidden">
                <div className="px-4 py-2.5 bg-secondary/40 border-b border-border">
                  <p className="text-[10px] font-bold tracking-widest uppercase text-muted-foreground flex items-center gap-1.5">
                    <User className="w-3 h-3" /> Customer
                  </p>
                </div>
                <div className="px-4 py-3 space-y-2">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-[#E60000]/10 text-[#E60000] flex items-center justify-center text-xs font-bold shrink-0">
                      {selectedOrder.customer.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-semibold">
                        {selectedOrder.customer}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Walk-in customer
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Delivery */}
              <div className="rounded-[6px] border border-border overflow-hidden">
                <div className="px-4 py-2.5 bg-secondary/40 border-b border-border">
                  <p className="text-[10px] font-bold tracking-widest uppercase text-muted-foreground flex items-center gap-1.5">
                    <Truck className="w-3 h-3" /> Fulfilment
                  </p>
                </div>
                <div className="px-4 py-3 space-y-1.5">
                  <div className="flex items-center gap-2">
                    <Package className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                    <span className="text-sm">Pick-up / Walk-in</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                    <span className="text-sm text-muted-foreground">
                      Store front
                    </span>
                  </div>
                </div>
              </div>

              {/* Items */}
              <div className="rounded-[6px] border border-border overflow-hidden">
                <div className="px-4 py-2.5 bg-secondary/40 border-b border-border">
                  <p className="text-[10px] font-bold tracking-widest uppercase text-muted-foreground flex items-center gap-1.5">
                    <Package className="w-3 h-3" /> Items ({selectedOrder.items}
                    )
                  </p>
                </div>
                <div className="divide-y divide-border">
                  {Array.from({ length: selectedOrder.items }).map((_, i) => (
                    <div key={i} className="flex items-center gap-3 px-4 py-3">
                      <div className="w-8 h-8 rounded-[4px] bg-secondary flex items-center justify-center shrink-0">
                        <Package className="w-4 h-4 text-muted-foreground/40" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-muted-foreground">
                          Item {i + 1}
                        </p>
                        <p className="text-[10px] text-muted-foreground/60">
                          Variant — ×1
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Payment summary */}
              <div className="rounded-[6px] border border-border overflow-hidden">
                <div className="px-4 py-2.5 bg-secondary/40 border-b border-border">
                  <p className="text-[10px] font-bold tracking-widest uppercase text-muted-foreground flex items-center gap-1.5">
                    <CreditCard className="w-3 h-3" /> Payment
                  </p>
                </div>
                <div className="px-4 py-3 space-y-1.5 text-sm">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Subtotal</span>
                    <span>${selectedOrder.amount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Shipping</span>
                    <span>—</span>
                  </div>
                  <div className="flex justify-between font-bold border-t border-border pt-2 mt-1">
                    <span>Total</span>
                    <span className="text-[#E60000]">
                      ${selectedOrder.amount.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Update status */}
              <div>
                <p className="text-[10px] font-bold tracking-widest uppercase text-muted-foreground mb-2 flex items-center gap-1.5">
                  <Clock className="w-3 h-3" /> Update Status
                </p>
                <select
                  className="flex h-9 w-full rounded-[4px] border border-input bg-transparent px-3 py-1 text-sm cursor-pointer focus-visible:outline-none"
                  defaultValue={selectedOrder.status.toLowerCase()}
                >
                  <option value="pending">Pending</option>
                  <option value="processing">Processing</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            </div>

            <div className="px-6 py-4 border-t border-border shrink-0 flex gap-2">
              <button
                className="flex-1 inline-flex items-center justify-center gap-2 text-sm font-medium cursor-pointer border border-border bg-transparent rounded-[4px] min-h-9 px-4 hover:bg-secondary"
                onClick={() => setSelectedOrder(null)}
              >
                Close
              </button>
              <button
                className="flex-1 inline-flex items-center justify-center gap-2 text-sm font-medium cursor-pointer bg-[#E60000] hover:bg-[#CC0000] text-white rounded-[4px] min-h-9 px-4"
                onClick={() => setSelectedOrder(null)}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── EDIT ORDER MODAL ── */}
      {editingOrder && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={() => setEditingOrder(null)}
        >
          <div className="fixed inset-0 bg-black/50" />
          <div
            className="relative z-50 bg-card rounded-[8px] w-full max-w-xl shadow-xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between px-6 pt-6 pb-4 border-b border-border">
              <div>
                <h2 className="text-lg font-bold">Edit Order</h2>
                <p className="text-sm text-muted-foreground mt-0.5">
                  Update customer info and order status.
                </p>
              </div>
              <button
                className="inline-flex items-center justify-center h-8 w-8 rounded-[4px] hover:bg-secondary cursor-pointer mt-0.5"
                onClick={() => setEditingOrder(null)}
              >
                <X className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>
            <div className="px-6 py-5 space-y-5 max-h-[72vh] overflow-y-auto">
              {/* Preview card */}
              <div className="flex items-center gap-4 p-4 bg-secondary/40 rounded-[8px] border border-border">
                <div className="w-14 h-14 rounded-[8px] bg-[#E60000]/10 border-2 border-[#E60000]/20 flex items-center justify-center shrink-0">
                  <Package className="w-6 h-6 text-[#E60000]/40" />
                </div>
                <div>
                  <p className="text-sm font-semibold">{editingOrder.id}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {editingOrder.items} item
                    {editingOrder.items !== 1 ? "s" : ""} · $
                    {editingOrder.amount.toFixed(2)}
                  </p>
                </div>
              </div>
              {/* Customer */}
              <div>
                <p className="text-[10px] font-bold tracking-widest uppercase text-muted-foreground mb-3 flex items-center gap-1.5">
                  <User className="w-3 h-3" /> Customer
                </p>
                <div className="space-y-3">
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium">Full Name</label>
                    <input
                      defaultValue={editingOrder.customer}
                      className="flex h-9 w-full rounded-[4px] border border-input bg-transparent px-3 py-1 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#E60000]/30"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium flex items-center gap-1.5">
                      <Phone className="w-3 h-3" /> Phone{" "}
                      <span className="text-muted-foreground font-normal">
                        (optional)
                      </span>
                    </label>
                    <input
                      placeholder="+63 912 345 6789"
                      className="flex h-9 w-full rounded-[4px] border border-input bg-transparent px-3 py-1 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#E60000]/30"
                    />
                  </div>
                </div>
              </div>
              {/* Status */}
              <div>
                <p className="text-[10px] font-bold tracking-widest uppercase text-muted-foreground mb-3 flex items-center gap-1.5">
                  <Clock className="w-3 h-3" /> Status
                </p>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium">Order Status</label>
                    <select
                      defaultValue={editingOrder.status.toLowerCase()}
                      className="flex h-9 w-full rounded-[4px] border border-input bg-transparent px-3 py-1 text-sm cursor-pointer focus-visible:outline-none"
                    >
                      <option value="pending">Pending</option>
                      <option value="processing">Processing</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium">
                      Payment Status
                    </label>
                    <select
                      defaultValue={(
                        editingOrder.paymentStatus ?? "unpaid"
                      ).toLowerCase()}
                      className="flex h-9 w-full rounded-[4px] border border-input bg-transparent px-3 py-1 text-sm cursor-pointer focus-visible:outline-none"
                    >
                      <option value="paid">Paid</option>
                      <option value="unpaid">Unpaid</option>
                      <option value="refunded">Refunded</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-2 px-6 py-4 border-t border-border bg-secondary/20">
              <button
                className="inline-flex items-center justify-center gap-2 text-sm font-medium cursor-pointer border border-border bg-transparent rounded-[4px] min-h-9 px-4 hover:bg-secondary"
                onClick={() => setEditingOrder(null)}
              >
                Cancel
              </button>
              <button
                className="inline-flex items-center justify-center gap-2 text-sm font-medium cursor-pointer bg-[#E60000] hover:bg-[#CC0000] text-white rounded-[4px] min-h-9 px-4"
                onClick={() => setEditingOrder(null)}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── ORDERS TABLE ── */}
      <div className="bg-card border border-border rounded-[6px] overflow-hidden flex flex-col">
        <div className="p-4 border-b border-border flex flex-col sm:flex-row gap-3 justify-between items-start sm:items-center">
          <SearchBar
            placeholder="Search by order ID or customer..."
            value={search}
            onChange={setSearch}
            className="w-full sm:w-80"
          />
          <FilterPanel>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="flex h-9 w-[140px] rounded-[4px] border border-input bg-transparent px-3 py-1 text-sm cursor-pointer focus-visible:outline-none"
            >
              <option value="all">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </FilterPanel>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-secondary/60 text-muted-foreground border-b border-border">
              <tr>
                <th className="px-4 py-3 font-medium">Order ID</th>
                <th className="px-4 py-3 font-medium">Customer</th>
                <th className="px-4 py-3 font-medium">Date</th>
                <th className="px-4 py-3 font-medium">Items</th>
                <th className="px-4 py-3 font-mediumt">Amount</th>
                <th className="px-4 py-3 font-medium text-right">Status</th>
                <th className="px-4 py-3 font-medium text-right">
                  Payment Status
                </th>
                <th className="px-4 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredOrders.map((order) => (
                <tr
                  key={order.id}
                  className="hover:bg-secondary/30 transition-colors"
                  data-testid={`row-order-${order.id}`}
                >
                  <td className="px-4 py-3 font-medium text-[#E60000]">
                    {order.id}
                  </td>
                  <td className="px-4 py-3">{order.customer}</td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {order.date}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {order.items}
                  </td>
                  <td className="px-4 py-3 font-medium">
                    ${order.amount.toFixed(2)}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <StatusBadge status={order.status} />
                  </td>
                  <td className="px-4 py-3 text-right">
                    <StatusBadge status={order.paymentStatus} />
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button
                      ref={(el) => (orderDropdownRefs.current[order.id] = el)}
                      className="inline-flex items-center justify-center h-8 w-8 rounded-[4px] border border-transparent bg-transparent hover:bg-secondary cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOrderDropdown(order.id);
                      }}
                      data-testid={`button-actions-${order.id}`}
                    >
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(filteredOrders.length / 10) || 1}
          onPageChange={setCurrentPage}
        />
      </div>

      {/* ── ORDER DROPDOWN PORTAL ── */}
      {orderDropdown &&
        orderDropdownRect &&
        createPortal(
          <>
            <div
              className="fixed inset-0 z-[9998]"
              onClick={() => {
                setOrderDropdown(null);
                setOrderDropdownRect(null);
              }}
            />
            <div
              className="fixed z-[9999] rounded-[4px] border border-border bg-card shadow-md py-1 w-36"
              style={{
                top: orderDropdownRect.bottom + 4,
                left: orderDropdownRect.right - 144,
              }}
            >
              <button
                className="flex items-center gap-2 w-full px-3 py-1.5 text-sm hover:bg-secondary text-left cursor-pointer"
                onClick={() => {
                  const o = ordersList.find((x) => x.id === orderDropdown);
                  if (o) setSelectedOrder(o);
                  setOrderDropdown(null);
                  setOrderDropdownRect(null);
                }}
              >
                <Eye className="w-4 h-4" /> View
              </button>
              <button
                className="flex items-center gap-2 w-full px-3 py-1.5 text-sm hover:bg-secondary text-left cursor-pointer"
                onClick={() => {
                  const o = ordersList.find((x) => x.id === orderDropdown);
                  if (o) setEditingOrder(o);
                  setOrderDropdown(null);
                  setOrderDropdownRect(null);
                }}
              >
                <Edit className="w-4 h-4" /> Edit
              </button>
            </div>
          </>,
          document.body,
        )}
    </div>
  );
}
