import { Legend, PieChart, Pie, Cell } from "recharts";

const CustomPieChart = (props) => {
  const { chartData } = props;

  return (
    <div className="vaccination-by-gender-container">
      <h1 className="vaccination-by-gender-heading">Transaction Pie chart</h1>

      <PieChart width={1000} height={300}>
        <Pie
          cx="50%"
          cy="60%"
          data={chartData}
          startAngle={180}
          endAngle={0}
          innerRadius="30%"
          outerRadius="60%"
          dataKey="count"
        >
          <Cell name="electronic" fill="#5a8dee" />
          <Cell name="jewellery" fill="#f54394" />
          <Cell name="men's cloathing" fill="#2cc6c6" />
        </Pie>
        <Legend
          iconType="circle"
          layout="horizontal"
          verticalAlign="bottom"
          align="center"
          wrapperStyle={{ fontSize: 12, fontFamily: "Roboto" }}
        />
      </PieChart>
    </div>
  );
};

export default CustomPieChart;
