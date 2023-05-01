const nodemailer = require('nodemailer');
const pdfkit = require('pdfkit');
const fs = require('fs');

require('dotenv').config();

// Specifying invoice details
const invoice = {
  id: 11111,
  date: '2023-04-21',
  items: [
    { description: 'Item 1', amount: 100 },
    { description: 'Item 2', amount: 200 },
    { description: 'Item 3', amount: 300 },
  ],
  total: 600,
  customer: {
    name: 'deneme customer',
    email: 'hasanbosver@gmail.com'
  }
};

// Creating the PDF document
const doc = new pdfkit();
doc.pipe(fs.createWriteStream('invoice.pdf'));
doc.text(`Invoice #${invoice.id}`, { align: 'center' });
doc.text(`Date: ${invoice.date}`, { align: 'right' });
doc.moveDown();
invoice.items.forEach((item) => {
  doc.text(`${item.description}: $${item.amount.toFixed(2)}`);
});
doc.moveDown();
doc.text(`Total: $${invoice.total.toFixed(2)}`, { align: 'right' });
doc.end();

// Create the email message
const message = {
  from: 'Wardrobewizard',
  to: invoice.customer.email,
  subject: `Invoice #${invoice.id}`,
  html: `<p>Dear ${invoice.customer.name},</p><p>Please find attached your invoice for ${invoice.date}.</p><p>Thank you for your business!</p>`,
  attachments: [
    {
      filename: 'invoice.pdf',
      path: 'invoice.pdf',
      contentType: 'application/pdf'
    }
  ]
};

// Sender Infos
const transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: "cs308mail@gmail.com",
        pass: "xmzxtzqwjcjycthe"
    }
});
  
transport.sendMail(message, (err, info) => {
    if (err) {
      console.error(err);
    } else {
      console.log(info);
    }
});

/*

const nodemailer = require('nodemailer');
const pdfkit = require('pdfkit');
const fs = require('fs');

import dotenv from "dotenv";

dotenv.config();

// Specifying invoice details
const invoice = {
  id: 11111,
  date: '2023-04-21',
  items: [
    { description: 'Item 1', amount: 100 },
    { description: 'Item 2', amount: 200 },
    { description: 'Item 3', amount: 300 },
  ],
  total: 600,
  customer: {
    name: 'deneme customer',
    email: 'hasanbosver@gmail.com'
  }
};

// Creating the PDF document
const doc = new pdfkit();
doc.pipe(fs.createWriteStream('invoice.pdf'));
doc.text(`Invoice #${invoice.id}`, { align: 'center' });
doc.text(`Date: ${invoice.date}`, { align: 'right' });
doc.moveDown();
invoice.items.forEach((item) => {
  doc.text(`${item.description}: $${item.amount.toFixed(2)}`);
});
doc.moveDown();
doc.text(`Total: $${invoice.total.toFixed(2)}`, { align: 'right' });
doc.end();

// Create the email message
const message = {
  from: 'Wardrobewizard',
  to: invoice.customer.email,
  subject: `Invoice #${invoice.id}`,
  html: `<p>Dear ${invoice.customer.name},</p><p>Please find attached your invoice for ${invoice.date}.</p><p>Thank you for your business!</p>`,
  attachments: [
    {
      filename: 'invoice.pdf',
      path: 'invoice.pdf',
      contentType: 'application/pdf'
    }
  ]
};

// Sender Infos
const transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.INVOICE_MAIL,
        pass: process.env.INVOICE_PASSWRD
    }
});
  
transport.sendMail(message, (err: Error | null, info: any) => {
    if (err) {
      console.error(err);
    } else {
      console.log(info);
    }
});

*/