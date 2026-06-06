export const orderSubmittedTemplate = ({ orderNumber, totalAmount }) => `
  <div style="font-family: Arial, sans-serif; padding: 20px;">
    <h1>Order Submitted Successfully</h1>

    <p>
      Thank you for your order. We've received your order and it is currently
      being processed.
    </p>

    <div
      style="
        background:#f5f5f5;
        padding:15px;
        border-radius:5px;
        margin:20px 0;
      "
    >
      <p><strong>Order Number:</strong> ${orderNumber}</p>
      <p><strong>Total Amount:</strong> ₱${Number(totalAmount).toLocaleString()}</p>
    </div>

    <p>
      We'll send another email once your order status has been updated.
    </p>

    <p style="margin-top:20px;color:gray;font-size:12px;">
      Thank you for shopping with us.
    </p>
  </div>
`;
