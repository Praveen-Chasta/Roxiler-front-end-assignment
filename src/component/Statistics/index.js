import "./index.css";

const Statistics = (props) => {
  const { sChartData } = props;
  const { totalSaleAmount, totalSold, totalNotSold } = sChartData;

  return (
    <ul className="ul-list">
      <li className="list-items">
        <strong>Total Sale Amount: </strong> {Math.round(totalSaleAmount)}
        <br />
        <strong>Total Sold: </strong> {totalSold}
        <br />
        <strong>Total Not Sold: </strong> {totalNotSold}
      </li>
    </ul>
  );
};

export default Statistics;
