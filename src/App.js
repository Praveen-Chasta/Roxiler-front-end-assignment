import React, { Component } from "react";
import CustomPieChart from "./component/CustomPieChart";
import CustomBarChart from "./component/CustomBarChart";
import "./App.css";

class App extends Component {
  state = {
    updatedData: [],
    bChartData: [],
    pChartData: [],
    searchText: "",
    selectedMonth: "03",
    bSelectedMonth: "03",
    pSelectedMonth: "03",
    sSelectedMonth: "03",
    currentPage: 1,
    totalPages: 6,
  };

  handlePieMonthChange = (event) => {
    this.setState({ pSelectedMonth: event.target.value, currentPage: 1 });
  };

  handleBarMonthChange = (event) => {
    this.setState({ bSelectedMonth: event.target.value, currentPage: 1 });
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
    const url = `http://localhost:3001/statisticst?month=${sSelectedMonth}`;
    const options = {
      method: "GET",
    };
    const response = await fetch(url, options);
    if (response.ok === true) {
      const pieChartDataValue = await response.json();

      this.setState({
        pChartData: pieChartDataValue,
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
    } = this.state;

    const filterData = updatedData.filter((data) =>
      data.title.toLowerCase().includes(searchText.toLowerCase())
    );
    console.log(bChartData);
    console.log(pChartData);
    console.log(bSelectedMonth);
    console.log(pSelectedMonth);
    return (
      <>
        <div className="bg-container">
          <h1 className="heading">
            Transaction <br /> Dashboard
          </h1>
          <div>
            <div>
              <label htmlFor="bSelect">Select Month</label>
              <select
                id="bSelect"
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
            <CustomBarChart bChartData={bChartData} />;
          </div>
          <div>
            <div>
              <label htmlFor="pSelect">Select Month</label>
              <select
                id="pSelect"
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
      </>
    );
  }
}

export default App;
