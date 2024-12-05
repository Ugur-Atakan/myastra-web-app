import { useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { applyCoupon } from '../../store/slices/marketSlice';
import instance from '../../http/instance';
import toast from 'react-hot-toast';
import { Tag, X } from 'lucide-react';

export default function OrderSummary() {
  const [couponCode, setCouponCode] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  
  const selectedPackage = useAppSelector((state) => state.market.selectedPackage);
  const appliedCoupon = useAppSelector((state) => state.market.appliedCoupon);

  if (!selectedPackage) {
    return null;
  }

  const calculateDiscount = () => {
    if (!appliedCoupon) return 0;

    let discountAmount = 0;
    const basePrice = selectedPackage.price;

    if (basePrice < appliedCoupon.minBasketAmount) {
      return 0;
    }

    if (appliedCoupon.type === 'PERCENTAGE') {
      discountAmount = (basePrice * appliedCoupon.discount) / 100;
      if (appliedCoupon.maxDiscount && discountAmount > appliedCoupon.maxDiscount) {
        discountAmount = appliedCoupon.maxDiscount;
      }
    } else {
      discountAmount = appliedCoupon.discount;
    }

    return discountAmount;
  };

  const subtotal = selectedPackage.price * 0.80;
  const tax = selectedPackage.price * 0.20;
  const discount = calculateDiscount();
  const total = selectedPackage.price - discount;

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) {
      toast.error('Lütfen bir kupon kodu girin');
      return;
    }

    setLoading(true);
    try {
      const response = await instance.post(`/checkout/check-coupon/${couponCode}`);
      const coupon = response.data;

      if (!coupon.isActive) {
        toast.error('Bu kupon kodu artık geçerli değil');
        return;
      }

      if (coupon.usageLimit <= coupon.usedCount) {
        toast.error('Bu kupon kodunun kullanım limiti dolmuş');
        return;
      }

      if (coupon.expiryDate && new Date(coupon.expiryDate) < new Date()) {
        toast.error('Bu kupon kodunun süresi dolmuş');
        return;
      }

      if (selectedPackage.price < coupon.minBasketAmount) {
        toast.error(`Bu kupon kodu minimum ${coupon.minBasketAmount}₺ alışverişlerde geçerlidir`);
        return;
      }

      dispatch(applyCoupon(coupon));
      toast.success('Kupon kodu başarıyla uygulandı');
      setCouponCode('');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Kupon kodu geçersiz');
    } finally {
      setLoading(false);
    }
  };

  const removeCoupon = () => {
    dispatch(applyCoupon(null));
    toast.success('Kupon kodu kaldırıldı');
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm sticky top-8">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Sipariş Özeti</h2>
      
      <div className="space-y-4 mb-6">
        <div className="flex justify-between">
          <span className="text-gray-600">{selectedPackage.name}</span>
          <span className="font-medium">{selectedPackage.price.toFixed(2)}₺</span>
        </div>
      </div>

      {/* Coupon Code Input */}
      <div className="border-t border-gray-200 pt-4 mb-4">
        {appliedCoupon ? (
          <div className="flex items-center justify-between bg-FDEAE9 p-3 rounded-lg">
            <div className="flex items-center gap-2">
              <Tag className="h-5 w-5 text-EF7874" />
              <span className="font-medium">{appliedCoupon.code}</span>
            </div>
            <button
              onClick={removeCoupon}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        ) : (
          <div className="flex gap-2">
            <input
              type="text"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
              placeholder="İndirim Kodu"
              className="flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-EF7874 focus:border-transparent"
            />
            <button
              onClick={handleApplyCoupon}
              disabled={loading}
              className="bg-EF7874 text-white px-4 py-2 rounded-lg font-medium hover:bg-opacity-90 transition-colors disabled:opacity-50"
            >
              {loading ? 'Uygulanıyor...' : 'Uygula'}
            </button>
          </div>
        )}
      </div>
      
      <div className="border-t border-gray-200 pt-4 space-y-2">
        <div className="flex justify-between text-gray-600">
          <span>Ara Toplam</span>
          <span>{subtotal.toFixed(2)}₺</span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span>KDV (%20)</span>
          <span>{tax.toFixed(2)}₺</span>
        </div>
        {discount > 0 && (
          <div className="flex justify-between text-green-600">
            <span>İndirim</span>
            <span>-{discount.toFixed(2)}₺</span>
          </div>
        )}
        <div className="flex justify-between text-lg font-semibold text-gray-900 pt-2 border-t border-gray-200">
          <span>Toplam</span>
          <span>{total.toFixed(2)}₺</span>
        </div>
      </div>
    </div>
  );
}