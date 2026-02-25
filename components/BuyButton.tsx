'use client'

import { useState } from 'react'

interface BuyButtonProps {
  productName: string
  price: number
  inStock: boolean
}

export default function BuyButton({ productName, price, inStock }: BuyButtonProps) {
  const [quantity, setQuantity] = useState(1)
  const [status, setStatus] = useState<'idle' | 'adding' | 'added'>('idle')

  const handleDecrement = () => {
    setQuantity((prev) => Math.max(1, prev - 1))
  }

  const handleIncrement = () => {
    setQuantity((prev) => Math.min(10, prev + 1))
  }

  const handleBuy = async () => {
    if (!inStock || status === 'adding') return

    setStatus('adding')

    // Simulate a short delay for the purchase/add-to-cart action
    await new Promise((resolve) => setTimeout(resolve, 800))

    setStatus('added')

    // Reset after showing confirmation
    setTimeout(() => {
      setStatus('idle')
    }, 2000)
  }

  const total = price * quantity

  return (
    <div className="mt-8 space-y-4">
      {/* Quantity Selector */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Quantity
        </label>
        <div className="inline-flex items-center border border-gray-200 rounded-lg">
          <button
            type="button"
            onClick={handleDecrement}
            disabled={quantity <= 1 || !inStock}
            className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors rounded-l-lg"
            aria-label="Decrease quantity"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
            </svg>
          </button>
          <span className="w-12 h-10 flex items-center justify-center text-sm font-semibold text-gray-900 border-x border-gray-200">
            {quantity}
          </span>
          <button
            type="button"
            onClick={handleIncrement}
            disabled={quantity >= 10 || !inStock}
            className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors rounded-r-lg"
            aria-label="Increase quantity"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </button>
        </div>
      </div>

      {/* Buy Button */}
      <button
        type="button"
        onClick={handleBuy}
        disabled={!inStock || status === 'adding'}
        className={`w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-base font-semibold transition-all duration-200 ${
          !inStock
            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
            : status === 'added'
              ? 'bg-green-600 text-white'
              : status === 'adding'
                ? 'bg-gray-900 text-white opacity-80 cursor-wait'
                : 'bg-gray-900 text-white hover:bg-gray-800 active:scale-[0.98]'
        }`}
      >
        {!inStock ? (
          'Out of Stock'
        ) : status === 'adding' ? (
          <>
            <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            Adding...
          </>
        ) : status === 'added' ? (
          <>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Added to Cart!
          </>
        ) : (
          <>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
            </svg>
            Buy Now — ${total.toFixed(2)}
          </>
        )}
      </button>

      {/* Quantity total hint */}
      {inStock && quantity > 1 && status === 'idle' && (
        <p className="text-sm text-gray-500 text-center">
          {quantity} × ${price.toFixed(2)}
        </p>
      )}
    </div>
  )
}