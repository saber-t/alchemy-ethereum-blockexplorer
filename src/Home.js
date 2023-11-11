import { Card, Input, Layout, Col, Row } from "antd";
import { Link } from "react-router-dom";
import { useState } from "react";
import "./App.css";

const { Utils } = require("alchemy-sdk");
const { Search } = Input;
const { Content, Header } = Layout;

function Home({ blockNumber, blockWithTX, alchemy }) {
  const [address, setAddress] = useState("");
  const [balance, setBalance] = useState();

  async function onSearch(value, source) {
    if (value) {
      setAddress(value);
      setBalance(await alchemy.core.getBalance(value));
    } else {
      setBalance("");
    }
  }

  return (
    <Layout className="Layout">
      <Header className="Header">Block Explorer</Header>
      <Content className="Content">
        <div className="Container">
          <Card className="Box">
            <h2>Block Info</h2>
            <Row>
              <Col id="block-title">Latest block</Col>
              <Col id="block-number">
                {" "}
                {blockNumber ? (
                  <Link to={`/block?index=${blockNumber}`}>#{blockNumber}</Link>
                ) : (
                  "Loading"
                )}
              </Col>
            </Row>
          </Card>
          <Card className="Box">
            <h2>View Balance</h2>
            <Search
              id="address-input"
              placeholder="Enter your Address"
              allowClear
              enterButton="Search"
              onSearch={onSearch}
              size="large"
            />
            {balance ? (
              <p>Balance: {Utils.formatEther(balance)} </p>
            ) : (
              <p>Enter address and press search</p>
            )}
          </Card>
        </div>
      </Content>
    </Layout>
  );
}
export default Home;
