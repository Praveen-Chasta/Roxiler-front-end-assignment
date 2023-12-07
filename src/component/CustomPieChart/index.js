import { PieChart, Pie, Legend, Cell } from "recharts";
import "./index.css";

const CustomPieChart = (props) => {
  const { pChartData } = props;

  const transformedData = pChartData.map((entry, index) => ({
    name: Object.keys(entry)[0],
    value: Object.values(entry)[0],
    id: index,
  }));

  return (
    <div>
      <PieChart width={550} height={300}>
        <Pie
          cx="50%"
          cy="40%"
          data={transformedData}
          startAngle={0}
          endAngle={360}
          innerRadius="30%"
          outerRadius="60%"
          dataKey="value"
        >
          {transformedData.map((entry, index) => (
            <Cell key={`cell-${entry.id}`} fill={getPieChartColor(index)} />
          ))}
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

const getPieChartColor = (index) => {
  const colors = [
    "#5a8dee",
    "#f54394",
    "#2cc6c6",
    "#ffbb78",
    "#98df8a",
    "#d62728",
    "#c49c94",
  ];
  return colors[index % colors.length];
};

export default CustomPieChart;
