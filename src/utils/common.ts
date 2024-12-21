import { OrderStatus } from "../types/enums";

export const formatOrderStatus= (status:OrderStatus) => {
    switch (status) {
        case OrderStatus.PAYMENT_PENDING:
            return 'Ödeme Bekleniyor';
        case OrderStatus.PENDING:
            return 'Beklemede';
        case OrderStatus.IN_PROGRESS:
            return 'İşlemde';
        case OrderStatus.COMPLETED:
            return 'Tamamlandı';
        case OrderStatus.REJECTED:
            return 'Reddedildi';
        case OrderStatus.CANCELLED:
            return 'İptal Edildi';
        case OrderStatus.REFUNDED:
            return 'İade Edildi';
        case OrderStatus.ERROR:
            return 'Hata';
        case OrderStatus.PROGRESS_ERROR:
            return 'İşleme Hatası';
        case OrderStatus.FAILED:
            return 'Başarısız';
        default:
            return 'Bilinmeyen Durum';

    }
  }