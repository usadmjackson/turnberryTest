import React, { useState, useEffect, useMemo } from "react";

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

  useEffect(() => {
    const fetchData = async () => {
      //Simulate API call to fetch data
      setTimeout(() => {
        const response = [
          { transactionId: 1, customerId: 1, date: "2023/01/02", amount: 120 },
          { transactionId: 2, customerId: 1, date: "2023/01/02", amount: 90 },
          { transactionId: 3, customerId: 1, date: "2023/02/02", amount: 90 },
          { transactionId: 4, customerId: 1, date: "2023/03/02", amount: 110 },
          { transactionId: 5, customerId: 2, date: "2022/08/09", amount: 70 },
          { transactionId: 6, customerId: 2, date: "2022/09/22", amount: 80 },
          { transactionId: 7, customerId: 2, date: "2022/09/30", amount: 150 },
          { transactionId: 8, customerId: 2, date: "2022/10/11", amount: 100 },
        ];
        setData(response);
      }, 2000);
    };

    fetchData();
  }, []);

  const rewards = useMemo(() => {
    const rewards = {};
    data.forEach(({ customerId, amount, date }) => {
      if (!rewards[customerId]) {
        rewards[customerId] = {
          Total: 0,
        };
      }
      let month =
        new Date(date).getFullYear() + "/" + (new Date(date).getMonth() + 1);
      if (!rewards[customerId][month]) {
        rewards[customerId][month] = 0;
      }
      const points = calculatePoints(amount);
      rewards[customerId].Total += points;
      rewards[customerId][month] += points;
    });
    console.log(rewards);
    return rewards;
  }, [data]);

  return (
    <div>
      {data.length === 0 ? (
        <p>Loading...</p>
      ) : (
        <>
          <table>
            <thead>
              <tr>
                <th>Customer Id</th>
                <th>Date</th>
                <th>Amount</th>
                <th>Points</th>
              </tr>
            </thead>
            <tbody>
              {data.map(({ transactionId, customerId, date, amount }) => (
                <tr key={transactionId}>
                  <td>{customerId}</td>
                  <td>{date}</td>
                  <td>{amount}</td>
                  <td>{calculatePoints(amount)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {Object.keys(rewards).map((customerId) => (
            <table key={customerId}>
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
        </>
      )}
    </div>
  );
};

export default CustomerRewards;
