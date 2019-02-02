import React, { Component } from 'react';
import { Navbar, Form, FormControl, Button } from 'react-bootstrap';
import Axios from 'axios';

const removeArrayDuplicates = arr => {
  return arr.map(e => e["id"])
    // store the keys of the unique objects
    .map((e, i, final) => final.indexOf(e) === i && i)
    // eliminate the dead keys & store unique objects
    .filter(e => arr[e]).map(e => arr[e])
};

class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchInput: "",
      searchRetailer: "all",
      retailerOptions: []
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillMount() {
    this.generateRetailerOptions();
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState(() => ({ [name]: value }));
  }

  generateRetailerOptions() {
    Axios.get('/api/allRetailers').then(res => {
      const uniqueRetailers = removeArrayDuplicates(res.data);
      this.setState(() => ({ retailerOptions: uniqueRetailers }));
    });
  }

  render() {
    return (
      <Navbar className="bg-light justify-content-between">
        <Navbar.Brand>iBotta</Navbar.Brand>
        <Form inline onSubmit={(e) => this.props.handleSubmit(e, { searchInput: this.state.searchInput, searchRetailer: this.state.searchRetailer })}>
          <Form.Group controlId="selectRetailer.ControlSelect1">
            <Form.Label>Select Retailer</Form.Label>
            <Form.Control as="select" name="searchRetailer" onChange={this.handleChange}>
              <option value="all">All Retailers</option>
              {this.state.retailerOptions.length && this.state.retailerOptions.map(({ id, name }) => (
                <option key={id} value={id}>{name}</option>
              ))}
            </Form.Control>
          </Form.Group>
          <FormControl type="text" placeholder="Search" className="mr-sm-2" name="searchInput" onChange={this.handleChange} />
          <Button type="submit">Submit</Button>
        </Form>
      </Navbar>
    )
  }
}

export default Nav;