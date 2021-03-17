import _ from "lodash";
import React, { Component } from "react";
import { Search, Grid, Header, Segment } from "semantic-ui-react";
import styled from "styled-components";

const source = _.times(5, () => ({
  title: "test",
  description: "test",
  image: "test",
  price: "test",
}));

const initialState = { isLoading: false, results: [], value: "" };

class SearchBar extends Component {
  state = initialState;

  handleResultSelect = (e, { result }) =>
    this.setState({ value: result.title });

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value });

    setTimeout(() => {
      if (this.state.value.length < 1) return this.setState(initialState);

      const re = new RegExp(_.escapeRegExp(this.state.value), "i");
      const isMatch = (result) => re.test(result.title);

      this.setState({
        isLoading: false,
        results: _.filter(source, isMatch),
      });
    }, 300);
  };

  render() {
    const { isLoading, value, results } = this.state;

    const StyledSearchBar = styled(Search)``;

    return (
      <Search
        fluid
        loading={isLoading}
        onResultSelect={this.handleResultSelect}
        onSearchChange={_.debounce(this.handleSearchChange, 500, {
          leading: true,
        })}
        results={results}
        value={value}
      />
    );
  }
}

export default SearchBar;
