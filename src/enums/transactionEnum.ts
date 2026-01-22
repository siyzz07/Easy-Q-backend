export enum TransactionTypeEnum {
  RAZORPAY = "razorpay",
  WALLET = "wallet",
  PAYATSHOP = 'payAtShop'
}

export enum TransactionStatusEnum {
  CREATED = "created",
  SUCCESS = "success",
  FAILED = "failed",
  REFUNDED = "refunded",
}

export enum TransactionOwnerTypeEnu  {
  CUSTOMER = "customer",
  VENDOR = "vendor",
  ADMIN = "admin",
}