import { BarChart, Bar, XAxis, YAxis, Legend } from "recharts";

const CustomBarChart = (props) => {
  const { chartData } = props;

  return (
    <div>
      <h1 className="bar-chart-heading">Transaction bar chart</h1>
      <BarChart
        width={900}
        height={400}
        data={chartData}
        margin={{
          top: 5,
        }}
      >
        <XAxis
          dataKey="range"
          tick={{
            stroke: "#6c757d",
            strokeWidth: 1,
            fontSize: 15,
            fontFamily: "Roboto",
          }}
        />
        <YAxis
          tickFormatter={(value) => `${value} Counts`}
          tick={{
            stroke: "#6c757d",
            strokeWidth: 0.5,
            fontSize: 15,
            fontFamily: "Roboto",
          }}
        />
        <Legend
          wrapperStyle={{
            paddingTop: 20,
            textAlign: "center",
            fontSize: 12,
            fontFamily: "Roboto",
          }}
        />
        <Bar
          name="counts"
          dataKey="count"
          fill="#5a8dee"
          radius={[10, 10, 0, 0]}
          barSize="20%"
        />
      </BarChart>
    </div>
  );
};

export default CustomBarChart;
