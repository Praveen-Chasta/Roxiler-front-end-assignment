import { BarChart, Bar, XAxis, YAxis, Legend } from "recharts";
import "./index.css";

const CustomBarChart = (props) => {
  const { bChartData } = props;

  return (
    <div>
      <BarChart
        width={500}
        height={300}
        data={bChartData}
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
          radius={[5, 5, 0, 0]}
          barSize="20%"
        />
      </BarChart>
    </div>
  );
};

export default CustomBarChart;
