const Xendit = require("xendit-node");
const x = new Xendit({
    secretKey: process.env.XENDIT_SECRET,
});

const { Invoice } = x;
const invoice = new Invoice({});

class XenditInvoice {
static createInvoice(externalID, amount, customer) {
    return invoice.createInvoice({
    externalID: externalID,
    amount,
    successRedirectURL: "http://localhost:3000/success",
    payerEmail: customer.email,
    });
}
static expireInvoice(invoiceID) {
    return invoice.expireInvoice({ invoiceID })
}
static getInvoice(invoiceID) {
    return invoice.getInvoice({ invoiceID })
}
}
module.exports = XenditInvoice