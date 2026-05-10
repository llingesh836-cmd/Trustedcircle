export type VoucherAmount = 100 | 500 | 1000;

export type Voucher = {
  id: string;
  brand: string;
  discount: number;
  description: string;
  image: string;
  codes: Record<VoucherAmount, string[]>;
};

export type User = {
  phone: string;
  name: string;
  email: string;
};

export type OrderStatus = 'created' | 'paid' | 'completed';

export type Order = {
  id: string;
  voucherId: string;
  voucherName: string;
  amount: VoucherAmount;
  quantity: number;
  status: OrderStatus;
  userPhone: string;
  userName: string;
  userEmail: string;
  voucherCode?: string;
  createdAt: string;
};

export const vouchers: Voucher[] = [
  {
    id: 'amazon',
    brand: 'Amazon',
    discount: 5,
    description: 'Shop everything on Amazon with instant savings.',
    image: '/placeholder-amazon.png',
    codes: {
      100: ['AMAZON100-XYZ123', 'AMAZON100-XYZ456', 'AMAZON100-XYZ789'],
      500: ['AMAZON500-ABC456', 'AMAZON500-ABC789'],
      1000: ['AMAZON1000-DEF123'],
    },
  },
  {
    id: 'flipkart',
    brand: 'Flipkart',
    discount: 6,
    description: 'Discounted Flipkart vouchers for popular categories.',
    image: '/placeholder-flipkart.png',
    codes: {
      100: ['FLIP100-XYZ123', 'FLIP100-XYZ456'],
      500: ['FLIP500-ABC456', 'FLIP500-ABC789'],
      1000: ['FLIP1000-DEF123'],
    },
  },
  {
    id: 'myntra',
    brand: 'Myntra',
    discount: 7,
    description: 'Fashion gift vouchers for your favourite brands.',
    image: '/placeholder-myntra.png',
    codes: {
      100: ['MYNTRA100-XYZ123', 'MYNTRA100-XYZ456'],
      500: ['MYNTRA500-ABC456'],
      1000: ['MYNTRA1000-DEF123'],
    },
  },
  {
    id: 'bookmyshow',
    brand: 'BookMyShow',
    discount: 4,
    description: 'Movie and event vouchers with instant value.',
    image: '/placeholder-bms.png',
    codes: {
      100: ['BMS100-XYZ123', 'BMS100-XYZ456'],
      500: ['BMS500-ABC456'],
      1000: ['BMS1000-DEF123'],
    },
  },
  {
    id: 'kfc',
    brand: 'KFC',
    discount: 3,
    description: 'Treat yourself with crispy KFC vouchers.',
    image: '/placeholder-kfc.png',
    codes: {
      100: ['KFC100-XYZ123'],
      500: ['KFC500-ABC456'],
      1000: ['KFC1000-DEF123'],
    },
  },
  {
    id: 'dominos',
    brand: 'Domino’s',
    discount: 2,
    description: 'Pizza vouchers for your next party night.',
    image: '/placeholder-dominos.png',
    codes: {
      100: ['DOM100-XYZ123'],
      500: ['DOM500-ABC456'],
      1000: ['DOM1000-DEF123'],
    },
  },
];

export const users: User[] = [];
export const orders: Order[] = [];
export const otpStore: Record<string, string> = {};

const makeId = () => Math.random().toString(36).substring(2, 10).toUpperCase();

export const getVoucherById = (id: string) => vouchers.find((voucher) => voucher.id === id);

export const getOrdersForPhone = (phone: string) => orders.filter((order) => order.userPhone === phone);

export const getOrderById = (id: string) => orders.find((order) => order.id === id);

export const createOrder = ({
  voucherId,
  amount,
  quantity,
  userPhone,
  userName,
  userEmail,
}: {
  voucherId: string;
  amount: VoucherAmount;
  quantity: number;
  userPhone: string;
  userName: string;
  userEmail: string;
}): Order | { error: string } => {
  const voucher = getVoucherById(voucherId);
  if (!voucher) {
    return { error: 'Voucher not found.' };
  }

  const availableCodes = voucher.codes[amount] ?? [];
  if (availableCodes.length < quantity) {
    return { error: 'Not enough inventory for the selected amount.' };
  }

  const order: Order = {
    id: `ORD-${makeId()}`,
    voucherId,
    voucherName: voucher.brand,
    amount,
    quantity,
    status: 'created',
    userPhone,
    userName,
    userEmail,
    createdAt: new Date().toISOString(),
  };

  orders.push(order);
  return order;
};

export const verifyPaymentForOrder = (orderId: string): Order | { error: string } => {
  const order = getOrderById(orderId);
  if (!order) {
    return { error: 'Order not found.' };
  }

  if (order.status === 'completed') {
    return order;
  }

  const voucher = getVoucherById(order.voucherId);
  if (!voucher) {
    return { error: 'Voucher not found.' };
  }

  const codes = voucher.codes[order.amount];
  if (!codes || codes.length < order.quantity) {
    return { error: 'Voucher codes unavailable for payment.' };
  }

  const assigned = codes.splice(0, order.quantity).join(', ');
  order.status = 'completed';
  order.voucherCode = assigned;
  return order;
};

export const createUser = ({ phone, name, email }: User) => {
  const existing = users.find((user) => user.phone === phone);
  if (existing) {
    existing.name = name;
    existing.email = email;
    return existing;
  }

  const user = { phone, name, email };
  users.push(user);
  return user;
};
