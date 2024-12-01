import { useAppSelector } from '../../store/hooks';



export default function OrderSummary() {
  const selectedPackage = useAppSelector((state) => state.market.selectedPackage);

  if (!selectedPackage) {
    return null;
  }

  const order = {
    items: [
      {
        id: 1,
        name: selectedPackage.name,
        price: selectedPackage.price,
      }
    ],
    tax: selectedPackage.price * 0.20, // %20 KDV
    subtotal: selectedPackage.price*0.80,
    shipping: 0,
    discount: 0,
   
    total: selectedPackage.price * 1 // Fiyat + %20 KDV
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm sticky top-8">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Sipariş Özeti</h2>
      
      <div className="space-y-4 mb-6">
        {order.items.map((item) => (
          <div key={item.id} className="flex justify-between">
            <span className="text-gray-600">{item.name}</span>
            <span className="font-medium">{item.price.toFixed(2)}₺</span>
          </div>
        ))}
      </div>
      
      <div className="border-t border-gray-200 pt-4 space-y-2">
        <div className="flex justify-between text-gray-600">
          <span>Ara Toplam</span>
          <span>{order.subtotal.toFixed(2)}₺</span>
        </div>
        {order.shipping > 0 && (
          <div className="flex justify-between text-gray-600">
            <span>Kargo</span>
            <span>{order.shipping.toFixed(2)}₺</span>
          </div>
        )}
        {order.discount > 0 && (
          <div className="flex justify-between text-green-600">
            <span>İndirim</span>
            <span>-{order.discount.toFixed(2)}₺</span>
          </div>
        )}
        <div className="flex justify-between text-gray-600">
          <span>KDV (%20)</span>
          <span>{order.tax.toFixed(2)}₺</span>
        </div>
        <div className="flex justify-between text-lg font-semibold text-gray-900 pt-2 border-t border-gray-200">
          <span>Toplam</span>
          <span>{order.total.toFixed(2)}₺</span>
        </div>
      </div>
    </div>
  );
}