import React, { Component } from "react";
import { CiSearch } from "react-icons/ci";
import CustomPieChart from "./component/CustomPieChart";
import CustomBarChart from "./component/CustomBarChart";
import Statistics from "./component/Statistics";
import "./App.css";

class App extends Component {
  state = {
    updatedData: [],
    bChartData: [],
    pChartData: [],
    sChartData: [],
    searchText: "",
    selectedMonth: "03",
    bSelectedMonth: "03",
    pSelectedMonth: "03",
    sSelectedMonth: "03",
    currentPage: 1,
    totalPages: 6,
  };

  handleStatisticsMonthChange = (event) => {
    this.setState(
      { sSelectedMonth: event.target.value, currentPage: 1 },
      this.statisticsData
    );
  };

  handlePieMonthChange = (event) => {
    this.setState(
      { pSelectedMonth: event.target.value, currentPage: 1 },
      this.pieChartData
    );
  };

  handleBarMonthChange = (event) => {
    this.setState(
      { bSelectedMonth: event.target.value, currentPage: 1 },
      this.barChartData
    );
  };

  handleMonthChange = (event) => {
    this.setState(
      { selectedMonth: event.target.value, currentPage: 1 },
      this.fetchBackendData
    );
  };

  handleSearchChange = (event) => {
    this.setState({ searchText: event.target.value, currentPage: 1 });
  };

  handleNextPage = () => {
    const { currentPage, totalPages } = this.state;
    if (currentPage < totalPages) {
      this.setState({ currentPage: currentPage + 1 }, () => {
        this.fetchBackendData();
      });
    }
  };

  handlePrevPage = () => {
    const { currentPage } = this.state;
    if (currentPage > 1) {
      this.setState({ currentPage: currentPage - 1 }, () => {
        this.fetchBackendData();
      });
    }
  };

  componentDidMount() {
    this.fetchBackendData();
    this.barChartData();
    this.pieChartData();
    this.statisticsData();
  }

  statisticsData = async () => {
    const { sSelectedMonth } = this.state;
    const url = `http://localhost:3001/statistics?month=${sSelectedMonth}`;
    const options = {
      method: "GET",
    };
    const response = await fetch(url, options);
    if (response.ok === true) {
      const statisticsChartDataValue = await response.json();

      this.setState({
        sChartData: statisticsChartDataValue,
      });
    } else {
      console.log("error");
    }
  };

  pieChartData = async () => {
    const { pSelectedMonth } = this.state;
    const url = `http://localhost:3001/pie-chart?month=${pSelectedMonth}`;
    const options = {
      method: "GET",
    };
    const response = await fetch(url, options);
    if (response.ok === true) {
      const pieChartDataValue = await response.json();
      console.log("Pie Chart Data:", pieChartDataValue);
      this.setState({
        pChartData: pieChartDataValue,
      });
    } else {
      console.log("error");
    }
  };

  barChartData = async () => {
    const { bSelectedMonth } = this.state;
    const url = `http://localhost:3001/bar-chart?month=${bSelectedMonth}`;
    const options = {
      method: "GET",
    };
    const response = await fetch(url, options);
    if (response.ok === true) {
      const barChartDataValue = await response.json();
      console.log("Bar Chart Data:", barChartDataValue);
      this.setState({
        bChartData: barChartDataValue,
      });
    } else {
      console.log("error");
    }
  };

  fetchBackendData = async () => {
    const { currentPage, searchText, selectedMonth } = this.state;
    const url = `http://localhost:3001/transactions-search?search=${searchText}&page=${currentPage}&perPage=10&month=${selectedMonth}`;

    const options = {
      method: "GET",
    };
    const response = await fetch(url, options);
    if (response.ok === true) {
      const data = await response.json();
      console.log(data);
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
      bChartData,
      bSelectedMonth,
      pChartData,
      pSelectedMonth,
      sSelectedMonth,
      sChartData,
    } = this.state;

    const filterData = updatedData.filter((data) =>
      data.title.toLowerCase().includes(searchText.toLowerCase())
    );
    console.log(pChartData);
    return (
      <>
        <div className="bg-container">
          <h1 className="heading">Transaction Dashboard</h1>
          <div className="chart-container">
            <div className="statistics-bg-container">
              <div className="statistics-container">
                <h3>Statistics</h3>
                <select
                  className="select-element"
                  value={sSelectedMonth}
                  onChange={this.handleStatisticsMonthChange}
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
              <Statistics sChartData={sChartData} />
            </div>
            <div>
              <div className="statistics-container">
                <h3>Bar Chart</h3>
                <select
                  className="select-element"
                  value={bSelectedMonth}
                  onChange={this.handleBarMonthChange}
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
              <CustomBarChart bChartData={bChartData} />
            </div>
            <div>
              <div className="statistics-container">
                <h3>Pie Chart</h3>
                <select
                  className="select-element"
                  value={pSelectedMonth}
                  onChange={this.handlePieMonthChange}
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
              <CustomPieChart pChartData={pChartData} />
            </div>
          </div>
          <div className="bottom-container">
            <h2 className="heading-1">Transaction Table</h2>
            <div className="dropdown-cont">
              <div className="search-input">
                <input
                  type="search"
                  placeholder="Search Transaction"
                  value={searchText}
                  onChange={this.handleSearchChange}
                  className="input-value"
                />
                <CiSearch className="search-icon" />
              </div>
              <div>
                <select
                  value={selectedMonth}
                  onChange={this.handleMonthChange}
                  className="select-element-2"
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
              {filterData.length === 0 ? (
                <tr>
                  <td colSpan="7" className="no-item">
                    No items found
                  </td>
                </tr>
              ) : (
                filterData.map((transaction) => (
                  <tr key={transaction.id}>
                    <td>{transaction.id}</td>
                    <td>{transaction.title}</td>
                    <td>{Math.round(transaction.price)}</td>
                    <td>{transaction.description}</td>
                    <td>{transaction.category}</td>
                    <td>{transaction.sold}</td>
                    <td>
                      <img
                        src={transaction.image}
                        alt="title"
                        className="image"
                      />
                    </td>
                  </tr>
                ))
              )}
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
      </>
    );
  }
}

export default App;
