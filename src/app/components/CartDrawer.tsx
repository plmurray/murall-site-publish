"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";

function TrashIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 6h18M19 6l-1 14H6L5 6M10 11v6M14 11v6M9 6V4h6v2" />
    </svg>
  );
}

export default function CartDrawer() {
  const { items, count, total, removeItem, clearCart, isOpen, closeCart } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-stone-900/40 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            aria-hidden="true"
          />

          {/* Drawer */}
          <motion.aside
            className="fixed top-0 right-0 h-full w-full max-w-md bg-white z-50 flex flex-col shadow-2xl"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 300 }}
            role="dialog"
            aria-modal="true"
            aria-label="Shopping cart"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-stone-100">
              <div>
                <h2 className="text-lg font-semibold text-stone-900" style={{ fontFamily: "'EB Garamond', serif" }}>
                  Your cart
                </h2>
                <p className="text-xs text-stone-400" style={{ fontFamily: "Inter, sans-serif" }}>
                  {count} {count === 1 ? "item" : "items"}
                </p>
              </div>
              <button onClick={closeCart} className="p-2 text-stone-400 hover:text-stone-900 transition-colors cursor-pointer rounded-none hover:bg-stone-50" aria-label="Close cart">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center py-20">
                  <div className="w-16 h-16 rounded-none bg-stone-50 border border-stone-100 flex items-center justify-center mb-4">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className="text-stone-300" aria-hidden="true">
                      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" /><line x1="3" x2="21" y1="6" y2="6" /><path d="M16 10a4 4 0 0 1-8 0" />
                    </svg>
                  </div>
                  <p className="text-stone-500 text-sm" style={{ fontFamily: "Inter, sans-serif" }}>Your cart is empty</p>
                  <button onClick={closeCart} className="mt-4 text-xs text-emerald-700 hover:text-emerald-900 font-medium cursor-pointer" style={{ fontFamily: "Inter, sans-serif" }}>
                    Continue browsing →
                  </button>
                </div>
              ) : (
                <ul className="space-y-4">
                  <AnimatePresence>
                    {items.map((item) => (
                      <motion.li
                        key={item.id}
                        layout
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="flex gap-4 py-4 border-b border-stone-50"
                      >
                        <div className="w-16 h-20 rounded-none overflow-hidden flex-shrink-0 bg-stone-100">
                          <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs text-stone-400 uppercase tracking-wide mb-0.5" style={{ fontFamily: "Inter, sans-serif" }}>{item.brand}</p>
                          <p className="text-sm font-medium text-stone-900 truncate" style={{ fontFamily: "'EB Garamond', serif" }}>{item.name}</p>
                          <p className="text-sm font-semibold text-stone-800 mt-1" style={{ fontFamily: "Inter, sans-serif" }}>
                            ${item.price} × {item.quantity}
                            <span className="text-xs font-normal text-stone-400 ml-1">= ${item.price * item.quantity}</span>
                          </p>
                        </div>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="p-1.5 text-stone-300 hover:text-red-400 transition-colors cursor-pointer self-start mt-1 rounded"
                          aria-label={`Remove ${item.name}`}
                        >
                          <TrashIcon />
                        </button>
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </ul>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="px-6 py-5 border-t border-stone-100 space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-stone-500" style={{ fontFamily: "Inter, sans-serif" }}>Subtotal</span>
                  <span className="font-semibold text-stone-900" style={{ fontFamily: "Inter, sans-serif" }}>${total.toFixed(2)}</span>
                </div>
                <p className="text-xs text-stone-400 text-center" style={{ fontFamily: "Inter, sans-serif" }}>
                  Free worldwide shipping on orders over $120
                </p>
                <button className="w-full py-3 rounded-none bg-stone-900 text-white text-sm font-semibold hover:bg-stone-800 transition-colors cursor-pointer" style={{ fontFamily: "Inter, sans-serif" }}>
                  Checkout → ${total.toFixed(2)}
                </button>
                <button onClick={clearCart} className="w-full text-xs text-stone-400 hover:text-stone-600 transition-colors cursor-pointer py-1" style={{ fontFamily: "Inter, sans-serif" }}>
                  Clear cart
                </button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
