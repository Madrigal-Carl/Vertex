export const kpiData = {
    totalRevenue: 124500,
    productSales: 89000,
    serviceSales: 35500,
    totalOrders: 1450,
    pendingOrders: 42,
    totalCustomers: 890
};
export const revenueTrend = [
    { name: 'Jan', revenue: 15000 },
    { name: 'Feb', revenue: 18000 },
    { name: 'Mar', revenue: 22000 },
    { name: 'Apr', revenue: 21000 },
    { name: 'May', revenue: 28000 },
    { name: 'Jun', revenue: 32000 }
];
export const productVsService = [
    { name: 'Jan', product: 10000, service: 5000 },
    { name: 'Feb', product: 12000, service: 6000 },
    { name: 'Mar', product: 15000, service: 7000 },
    { name: 'Apr', product: 14000, service: 7000 },
    { name: 'May', product: 19000, service: 9000 },
    { name: 'Jun', product: 21000, service: 11000 }
];
export const monthlyOrders = [
    { name: 'Jan', orders: 150 },
    { name: 'Feb', orders: 180 },
    { name: 'Mar', orders: 210 },
    { name: 'Apr', orders: 195 },
    { name: 'May', orders: 250 },
    { name: 'Jun', orders: 280 }
];
export const salesByCategory = [
    { name: 'Electronics', sales: 45000 },
    { name: 'Accessories', sales: 25000 },
    { name: 'Apparel', sales: 15000 },
    { name: 'Home', sales: 12000 }
];
export const recentOrders = [
    { id: 'ORD-001', customer: 'John Doe', date: '2023-10-25', status: 'Completed', amount: 150.00 },
    { id: 'ORD-002', customer: 'Jane Smith', date: '2023-10-25', status: 'Pending', amount: 85.50 },
    { id: 'ORD-003', customer: 'Bob Johnson', date: '2023-10-24', status: 'Processing', amount: 210.00 },
    { id: 'ORD-004', customer: 'Alice Williams', date: '2023-10-24', status: 'Completed', amount: 45.00 },
    { id: 'ORD-005', customer: 'Charlie Brown', date: '2023-10-23', status: 'Cancelled', amount: 120.00 }
];
export const lowStockProducts = [
    { id: 'PROD-001', name: 'Wireless Headphones', stock: 5 },
    { id: 'PROD-002', name: 'USB-C Cable', stock: 2 },
    { id: 'PROD-003', name: 'Bluetooth Mouse', stock: 8 }
];
export const mostBookedServices = [
    { id: 'SRV-001', name: 'Device Repair', bookings: 45 },
    { id: 'SRV-002', name: 'Setup & Installation', bookings: 32 },
    { id: 'SRV-003', name: 'Consultation', bookings: 28 }
];
export const recentReviews = [
    { id: 'REV-001', product: 'Wireless Headphones', customer: 'John D.', rating: 5, date: '2023-10-25' },
    { id: 'REV-002', product: 'USB-C Cable', customer: 'Jane S.', rating: 4, date: '2023-10-24' },
    { id: 'REV-003', product: 'Device Repair', customer: 'Bob J.', rating: 5, date: '2023-10-23' }
];
export const ordersList = Array.from({ length: 25 }).map((_, i) => ({
    id: `ORD-${String(i + 1).padStart(3, '0')}`,
    orderNumber: `100${i + 1}`,
    productsCount: Math.floor(Math.random() * 5) + 1,
    total: (Math.random() * 500 + 20).toFixed(2),
    paymentStatus: ['Paid', 'Pending', 'Failed'][Math.floor(Math.random() * 3)],
    orderStatus: ['Pending', 'Processing', 'Completed', 'Cancelled'][Math.floor(Math.random() * 4)],
    date: `2023-10-${Math.floor(Math.random() * 28 + 1).toString().padStart(2, '0')}`
}));
const PRODUCT_CATALOG = [
    { name: 'Wireless Noise-Cancelling Headphones', category: 'Electronics', price: 149.99, variants: [{ id: 'v1', label: 'Black', stock: 12 }, { id: 'v2', label: 'White', stock: 5 }, { id: 'v3', label: 'Midnight Blue', stock: 0 }] },
    { name: 'USB-C Charging Cable', category: 'Accessories', price: 19.99, variants: [{ id: 'v1', label: '1m', stock: 34 }, { id: 'v2', label: '2m', stock: 18 }, { id: 'v3', label: '3m', stock: 7 }] },
    { name: 'Bluetooth Mechanical Keyboard', category: 'Electronics', price: 89.99, variants: [{ id: 'v1', label: 'Black / Brown Switch', stock: 8 }, { id: 'v2', label: 'White / Red Switch', stock: 3 }, { id: 'v3', label: 'Gray / Blue Switch', stock: 0 }] },
    { name: 'Laptop Stand (Adjustable)', category: 'Accessories', price: 45.00, variants: [{ id: 'v1', label: 'Silver', stock: 22 }, { id: 'v2', label: 'Space Gray', stock: 9 }] },
    { name: 'Wireless Charging Pad', category: 'Electronics', price: 34.99, variants: [{ id: 'v1', label: 'Black', stock: 41 }, { id: 'v2', label: 'White', stock: 15 }] },
    { name: 'Graphic Tee', category: 'Apparel', price: 25.00, variants: [{ id: 'v1', label: 'S / White', stock: 10 }, { id: 'v2', label: 'M / White', stock: 14 }, { id: 'v3', label: 'L / White', stock: 6 }, { id: 'v4', label: 'XL / Black', stock: 0 }] },
    { name: 'Hoodie (Heavyweight)', category: 'Apparel', price: 59.99, variants: [{ id: 'v1', label: 'S / Gray', stock: 5 }, { id: 'v2', label: 'M / Gray', stock: 12 }, { id: 'v3', label: 'L / Black', stock: 8 }, { id: 'v4', label: 'XL / Black', stock: 2 }] },
    { name: 'Smart LED Desk Lamp', category: 'Home', price: 55.00, variants: [{ id: 'v1', label: 'White', stock: 19 }, { id: 'v2', label: 'Black', stock: 11 }] },
    { name: 'Ergonomic Mouse', category: 'Electronics', price: 69.99, variants: [{ id: 'v1', label: 'Black (Right-hand)', stock: 26 }, { id: 'v2', label: 'White (Right-hand)', stock: 7 }] },
    { name: 'Monitor Privacy Screen', category: 'Accessories', price: 39.99, variants: [{ id: 'v1', label: '24"', stock: 4 }, { id: 'v2', label: '27"', stock: 9 }, { id: 'v3', label: '32"', stock: 2 }] },
    { name: 'Portable Power Bank', category: 'Electronics', price: 49.99, variants: [{ id: 'v1', label: '10,000 mAh / Black', stock: 31 }, { id: 'v2', label: '20,000 mAh / Black', stock: 14 }, { id: 'v3', label: '20,000 mAh / White', stock: 0 }] },
    { name: 'Desk Organizer Set', category: 'Home', price: 29.99, variants: [{ id: 'v1', label: 'Natural Wood', stock: 17 }, { id: 'v2', label: 'Black Mesh', stock: 9 }] },
    { name: 'Webcam HD 1080p', category: 'Electronics', price: 79.99, variants: [{ id: 'v1', label: 'Black', stock: 6 }, { id: 'v2', label: 'White', stock: 3 }] },
    { name: 'Cable Management Kit', category: 'Accessories', price: 15.99, variants: [{ id: 'v1', label: 'Black', stock: 52 }, { id: 'v2', label: 'White', stock: 38 }] },
    { name: 'Anti-Fatigue Floor Mat', category: 'Home', price: 49.00, variants: [{ id: 'v1', label: 'Black / Small', stock: 8 }, { id: 'v2', label: 'Black / Large', stock: 4 }, { id: 'v3', label: 'Gray / Large', stock: 0 }] },
];
export const productsList = PRODUCT_CATALOG.map((p, i) => ({
    id: `PROD-${String(i + 1).padStart(3, '0')}`,
    name: p.name,
    category: p.category,
    variants: p.variants,
    variantsCount: p.variants.length,
    stock: p.variants.reduce((s, v) => s + v.stock, 0),
    price: p.price.toFixed(2),
    discount: i % 5 === 0 ? 10 : i % 7 === 0 ? 15 : 0,
    status: i % 6 === 0 ? 'Draft' : i % 11 === 0 ? 'Archived' : 'Active',
}));
export const servicesList = Array.from({ length: 10 }).map((_, i) => ({
    id: `SRV-${String(i + 1).padStart(3, '0')}`,
    name: `Service ${i + 1}`,
    category: ['Repair', 'Setup', 'Consultation'][Math.floor(Math.random() * 3)],
    bookings: Math.floor(Math.random() * 50),
    status: ['Active', 'Draft'][Math.floor(Math.random() * 2)]
}));
export const staffList = [
    { id: 'USR-001', name: 'Alice Admin', email: 'alice@example.com', role: 'Admin', status: 'Active' },
    { id: 'USR-002', name: 'Bob Tech', email: 'bob@example.com', role: 'Technician', status: 'Active' },
    { id: 'USR-003', name: 'Charlie Cash', email: 'charlie@example.com', role: 'Cashier', status: 'Inactive' }
];
export const inventorySerialNumbers = [
    { serial: 'SN-1001', product: 'Wireless Headphones', variant: 'Black', status: 'In Stock', date: '2023-10-01' },
    { serial: 'SN-1002', product: 'Wireless Headphones', variant: 'White', status: 'Sold', date: '2023-10-02' },
    { serial: 'SN-1003', product: 'USB-C Cable', variant: '1m', status: 'Reserved', date: '2023-10-03' }
];
