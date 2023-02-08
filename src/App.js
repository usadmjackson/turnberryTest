import React, { useState, useEffect } from 'react';

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
      const response = [
        { customerId: 1, month: 'January', amount: 120 },
        { customerId: 1, month: 'February', amount: 90 },
        { customerId: 1, month: 'March', amount: 110 },
        { customerId: 2, month: 'January', amount: 70 },
        { customerId: 2, month: 'February', amount: 80 },
        { customerId: 2, month: 'March', amount: 100 },
      ];

      setData(response);
      setLoading(false);
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (!loading) {
      const rewards = {};
      data.forEach(({ customerId, amount }) => {
        if (!rewards[customerId]) {
          rewards[customerId] = {
            total: 0,
          };
        }
        const points = calculatePoints(amount);
        rewards[customerId].total += points;
      });
      setRewards(rewards);
    }
  }, [data, loading]);

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
            {data.map(({ customerId, month, amount }, index) => (
              <tr key={index}>
                <td>{customerId}</td>
                <td>{month}</td>
                <td>{amount}</td>
                <td>{calculatePoints(amount)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {!loading && (
        <div>
          {Object.keys(rewards).map((customerId) => (
            <div key={customerId}>
              <h2>Customer Id: {customerId}</h2>
              <p>Total Points: {rewards[customerId].total}</p>
            </div>
          ))}
        </div>)}
    </div>
  )
}

export default CustomerRewards;