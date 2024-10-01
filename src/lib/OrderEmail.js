import nodemailer from "nodemailer";

export const sendOrderEmail = async (orderDetails) => {
  // Configure the transporter
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com", // Replace with your SMTP provider
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: process.env.GMAIL_EMAIL, // Your SMTP email
      pass: process.env.GMAIL_APP_PASSWORD, // Your SMTP password
    },
  });

  transporter.verify(function (error, success) {
    if (error) {
      console.error("Transporter connection failed:", error);
    } else {
      console.log("Transporter connected successfully.");
    }
  });

  // Construct email message
  const emailContent = `
  <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eaeaea; border-radius: 10px;">
    <h2 style="text-align: center; color: #4CAF50;">Thank you for your order!</h2>
    <p style="font-size: 16px;">Hello <strong>${orderDetails.userDetails.firstName}</strong>,</p>
    <p style="font-size: 16px;">Your order ID: <strong>${orderDetails.orderId}</strong> has been confirmed. Here are the details:</p>

    <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
      <thead>
        <tr>
          <th style="text-align: left; padding: 10px; border-bottom: 1px solid #eaeaea;">Product</th>
          <th style="text-align: center; padding: 10px; border-bottom: 1px solid #eaeaea;">Quantity</th>
          <th style="text-align: right; padding: 10px; border-bottom: 1px solid #eaeaea;">Price</th>
        </tr>
      </thead>
      <tbody>
        ${orderDetails.products
      .map(
        (product) => `
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eaeaea;">
                <img src="${product.productImage}" alt="${product.title}" style="width: 50px; height: 50px; object-fit: cover; margin-right: 10px; vertical-align: middle; border-radius: 5px;">
                <span>${product.title}</span>
              </td>
              <td style="text-align: center; padding: 10px; border-bottom: 1px solid #eaeaea;">${product.quantity}</td>
              <td style="text-align: right; padding: 10px; border-bottom: 1px solid #eaeaea;">$${product.price}</td>
            </tr>
          `
      )
      .join("")}
      </tbody>
    </table>

    <div style="margin-top: 20px;">
    <p style="font-size: 16px;"><strong>Discount:</strong> ${orderDetails.discount}%</p>
      <p style="font-size: 16px;"><strong>Total:</strong> $${(orderDetails.paymentDetails.amount / 100).toFixed(2)}</p>
      <p style="font-size: 16px;"><strong>Shipping Address:</strong> ${orderDetails.userDetails.address}</p>
      <p style="font-size: 16px;"><strong>Payment Method:</strong> ${orderDetails.paymentDetails.paymentMethod}</p>
    </div>

    <hr style="margin: 20px 0; border: 0; border-top: 1px solid #eaeaea;">

    <p style="font-size: 14px; color: #555;">We'll be sending a shipping confirmation email when the items have been shipped. If you have any questions, feel free to <a href="mailto:support@decore.com" style="color: #4CAF50; text-decoration: none;">contact our support team</a>.</p>

    <p style="font-size: 16px; text-align: center; color: #333;">Thank you for shopping with us!</p>
    <p style="font-size: 16px; text-align: center; color: #4CAF50;"><strong>Team Decore</strong></p>
  </div>
`;


  // Send the email
  const info = await transporter.sendMail({
    from: '"Your Store" <no-reply@yourstore.com>', // Sender address
    to: orderDetails.userDetails.email, // User email
    subject: "Order Confirmation - " + orderDetails.orderId, // Subject line
    html: emailContent, // HTML body
  });

  console.log("Message sent: %s", info.messageId);
};
