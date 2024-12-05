export interface Coupon {
  id: string;
  type: 'PERCENTAGE' | 'FIXED';
  code: string;
  discount: number;
  minBasketAmount: number;
  maxDiscount: number;
  expiryDate: Date | null;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  usageLimit: number;
  usedCount: number;
  createdById: string;
}