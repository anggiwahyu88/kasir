const express = require("express");
const transactions = express.Router();
const response = require("../helpers/response");

const { randomOrderNumber } = require("../helpers/utils");
const {
  fetchTransaction,
  addTransaction,
} = require("../controllers/transactions");

transactions.route("/").post(async (req, res) => {
  const { total_price, paid_amount, products } = req.body;
  const order = {
    no_order: randomOrderNumber(),
    total_price,
    paid_amount,
  };

  try {
    const result = await addTransaction(order, products);
    response.success(result, "transaction created!", res);
  } catch (err) {
    response.error({ error: err.message }, req.originalUrl, 403, res);
  }
});

/**
 * @swagger
 * components:
 *   schemas:
 *     transaction:
 *        type: object
 *        properties:
 *          id: 
 *            type: 
 *              integer
 */

//Swagger get Transactions
/**
 * @swagger
 * /transactions:
 *   get:
 *     summary: transaction fetcher
 *     tags: [transactions]
 *     responses:
 *       200:
 *         description: product fetched
 *       403:
 *         description: failed to fetch product
 */

//Swagger post Transactions
/**
 * @swagger
 * /transactions:
 *   post:
 *     summary: transaction fetcher
 *     tags: [transactions]
 *     requestBody:
 *       description: Optional description in *Markdown*
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/transaction'
 *         text/plain:
 *           schema:
*            type: string
 *     responses:
 *       200:
 *         description: product fetched
 *       403:
 *         description: failed to fetch product
 */

transactions.route("/").get(async (req, res) => {
  try {
    const result = await fetchTransaction();
    response.success(result, "transaction fetched!", res);
  } catch (err) {
    response.error({ error: err.message }, req.originalUrl, 403, res);
  }
});

module.exports = transactions;
