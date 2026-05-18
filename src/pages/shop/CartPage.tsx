import React from 'react';
import CartSidebar from '@/components/plant/CartSidebar';

const CartPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-emerald-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => window.history.back()}
                className="flex items-center gap-2 text-emerald-600 hover:text-emerald-700 transition-colors duration-200 px-4 py-2 rounded-lg hover:bg-emerald-50"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                <span className="font-medium">Back</span>
              </button>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                  <span className="text-emerald-600">🛒</span>
                  Shopping Cart
                </h1>
                <p className="text-gray-600 mt-1">
                  Review your plant selections before checkout
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex">
        <CartSidebar />
      </div>
    </div>
  );
};

export default CartPage;