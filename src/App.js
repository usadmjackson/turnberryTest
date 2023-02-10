import React, { useState, useEffect } from "react";

const calculatePoints = (amount) => {
  let points = 0;
  if (amount > 100) {
    points += 2 * (amount - 100);
  }
  if (amount > 50) {
    points += 1 * (Math.min(amount, 100) - 50);
  }
  return points;
};

const CustomerRewards = () => {
  const [data, setData] = useState([]);
  const [rewards, setRewards] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      //Simulate API call to fetch data
      setTimeout(() => {
        const response = [
          { transactionId: 1, customerId: 1, month: "January", amount: 120 },
          { transactionId: 2, customerId: 1, month: "January", amount: 90 },
          { transactionId: 3, customerId: 1, month: "February", amount: 90 },
          { transactionId: 4, customerId: 1, month: "March", amount: 110 },
          { transactionId: 5, customerId: 2, month: "January", amount: 70 },
          { transactionId: 6, customerId: 2, month: "February", amount: 80 },
          { transactionId: 7, customerId: 2, month: "February", amount: 150 },
          { transactionId: 8, customerId: 2, month: "March", amount: 100 },
        ];
        setData(response);
        setLoading(false);
      }, 2000);
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (!loading && data) {
      const rewards = {};
      data.forEach(({ customerId, amount, month }) => {
        if (!rewards[customerId]) {
          rewards[customerId] = {
            Total: 0,
          };
        }
        if (!rewards[customerId][month]) {
          rewards[customerId][month] = 0;
        }
        const points = calculatePoints(amount);
        rewards[customerId].Total += points;
        rewards[customerId][month] += points;
      });
      console.log(rewards);
      setRewards(rewards);
    }
  }, [data]);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Customer Id</th>
              <th>Month</th>
              <th>Amount</th>
              <th>Points</th>
            </tr>
          </thead>
          <tbody>
            {data.map(({ transactionId, customerId, month, amount }) => (
              <tr key={transactionId}>
                <td>{customerId}</td>
                <td>{month}</td>
                <td>{amount}</td>
                <td>{calculatePoints(amount)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {!loading &&
        Object.keys(rewards).map((customerId) => (
          <table>
            <thead>
              <tr>
                <th>
                  <h2>Customer Id: {customerId}</h2>
                </th>
              </tr>
            </thead>
            <tbody key={customerId}>
              {Object.keys(rewards[customerId]).map((key) => (
                <tr key={key}>
                  <td>{key}</td>
                  <td>{rewards[customerId][key]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ))}
    </div>
  );
};

export default CustomerRewards;
