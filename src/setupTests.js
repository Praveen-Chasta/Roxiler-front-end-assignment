// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";

import React, { Component } from "react";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      transactions: [],
      selectedMonth: "03",
      searchText: "",
      currentPage: 1,
      totalPages: 1,
    };
  }

  componentDidMount() {
    this.fetchTransactions();
  }

  componentDidUpdate(prevProps, prevState) {
    const { selectedMonth, searchText, currentPage } = this.state;
    if (
      selectedMonth !== prevState.selectedMonth ||
      searchText !== prevState.searchText ||
      currentPage !== prevState.currentPage
    ) {
      this.fetchTransactions();
    }
  }

  fetchTransactions = async () => {
    const { selectedMonth, searchText, currentPage } = this.state;
    const options = {
      method: "GET",
    };
    try {
      const response = await fetch(
        `/transactions?month=${selectedMonth}&search=${searchText}&page=${currentPage}`,
        options
      );
      this.setState({
        transactions: data || [],
        totalPages: Math.ceil(response.headers["x-total-count"] / 10), // Assuming 10 items per page
      });
    } catch (error) {
      console.error("Error fetching transactions:", error.message);
    }
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

  render() {
    const {
      selectedMonth,
      searchText,
      transactions,
      currentPage,
      totalPages,
    } = this.state;

    return (
      <div>
        <h1>Transactions</h1>
        <div>
          <label>Select Month:</label>
          <select value={selectedMonth} onChange={this.handleMonthChange}>
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
        <div>
          <label>Search Transaction:</label>
          <input
            type="text"
            value={searchText}
            onChange={this.handleSearchChange}
          />
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
            {transactions.map((transaction) => (
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
          <button onClick={this.handlePrevPage}>Previous</button>
          <span>{`Page ${currentPage} of ${totalPages}`}</span>
          <button onClick={this.handleNextPage}>Next</button>
        </div>
      </div>
    );
  }
}

export default App;


<tbody>
              {transactions.map((transaction) => (
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



           
           