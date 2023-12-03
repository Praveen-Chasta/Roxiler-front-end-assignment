import React, { Component } from "react";
import { BarChart, Bar, XAxis, YAxis, Legend } from "recharts";
import "./App.css";

class App extends Component {
  state = {
    updatedData: [],
    chartData: [],
    searchText: "",
    selectedMonth: "03",
    currentPage: 1,
    totalPages: 1,
  };

  handleMonthChange = (event) => {
    this.setState({ selectedMonth: event.target.value, currentPage: 1 });
  };

  handleSearchChange = (event) => {
    this.setState({ searchText: event.target.value, currentPage: 1 });
  };

  handleNextPage = () => {
    const { currentPage, totalPages } = this.state;
    if (currentPage < totalPages) {
      this.setState({ currentPage: currentPage + 1 });
    }
  };

  handlePrevPage = () => {
    const { currentPage } = this.state;
    if (currentPage > 1) {
      this.setState({ currentPage: currentPage - 1 });
    }
  };

  componentDidMount() {
    this.fetchBackendData();
    this.barChartData();
  }

  barChartData = async () => {
    const url = "http://localhost:3001/bar-chart?month=2021-11";
    const options = {
      method: "GET",
    };
    const response = await fetch(url, options);
    if (response.ok === true) {
      const barChartData = await response.json();
      console.log(barChartData);
      this.setState({
        chartData: barChartData,
      });
    } else {
      console.log("error");
    }
  };

  fetchBackendData = async () => {
    const url = "http://localhost:3001/transactions";
    const options = {
      method: "GET",
    };
    const response = await fetch(url, options);
    if (response.ok === true) {
      const data = await response.json();
      this.setState({
        updatedData: data,
      });
    } else {
      console.log("error");
    }
  };

  render() {
    const {
      updatedData,
      selectedMonth,
      searchText,
      currentPage,
      totalPages,
      chartData,
    } = this.state;
    const filterData = updatedData.filter((data) =>
      data.title.toLowerCase().includes(searchText.toLowerCase())
    );
    return (
      <>
        <div className="bg-container">
          <h1 className="heading">
            Transaction <br /> Dashboard
          </h1>
          <div className="dropdown-cont">
            <div>
              <label className="label" htmlFor="input">
                Search Transaction
              </label>
              <input
                id="input"
                type="search"
                placeholder="Search Transaction"
                value={searchText}
                onChange={this.handleSearchChange}
              />
            </div>
            <div>
              <label htmlFor="select">Select Month</label>
              <select
                id="select"
                value={selectedMonth}
                onChange={this.handleMonthChange}
              >
                <option value="01">January</option>
                <option value="02">February</option>
                <option value="03">March</option>
                <option value="04">April</option>
                <option value="05">May</option>
                <option value="06">June</option>
                <option value="07">July</option>
                <option value="08">August</option>
                <option value="09">September</option>
                <option value="10">October</option>
                <option value="11">November</option>
                <option value="12">December</option>
              </select>
            </div>
          </div>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Price</th>
                <th>Description</th>
                <th>Category</th>
                <th>Sold</th>
                <th>Image</th>
              </tr>
            </thead>
            <tbody>
              {filterData.map((transaction) => (
                <tr key={transaction.id}>
                  <td>{transaction.id}</td>
                  <td>{transaction.title}</td>
                  <td>{transaction.price}</td>
                  <td>{transaction.description}</td>
                  <td>{transaction.category}</td>
                  <td>{transaction.sold}</td>
                  <td>
                    <img src={transaction.image} alt="title" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div>
            <button className="pagination" onClick={this.handlePrevPage}>
              Previous
            </button>
            <span>{`Page ${currentPage} of ${totalPages}`}</span>
            <button className="pagination" onClick={this.handleNextPage}>
              Next
            </button>
          </div>
        </div>
        <div>
          <h1 className="vaccination-by-coverage-heading">
            Transaction bar chart
          </h1>
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
      </>
    );
  }
}

export default App;
