import { useEffect, useState } from "react";
import Layout from "@/components/layouts/Layout";
import api from "./api";
import styles from "@/styles/Home.module.css";
import TransactionList from "@/components/elements/TransactionList/TransactionList";

export default function Transaction() {
  const [transactions, setTransaction] = useState([]);

  const fetchTransaction = async () => {
    try {
      const response = await api.get("/transactions");
      const data = await response.data.payload.transactions;
      setTransaction(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTransaction();
  }, []);

  return (
    <Layout>
      <p>transaction</p>
      <div className={styles.home}>
        <TransactionList transactions={transactions} />
      </div>
    </Layout>
  );
}
