import { Card, Descriptions, Tabs, Table } from "antd";
import { Link } from "react-router-dom";
const { Utils } = require("alchemy-sdk");

function Block({ blockNumber, blockWithTX }) {
  const { TabPane } = Tabs;

  const blockItems = [
    {
      key: "1",
      label: "hash",
      children: blockWithTX ? blockWithTX.hash : "Loading",
    },
    {
      key: "2",
      label: "parent hash",
      children: blockWithTX ? blockWithTX.parentHash : "Loading",
    },
    {
      key: "3",
      label: "number",
      children: blockWithTX ? blockWithTX.number : "Loading",
    },
    {
      key: "4",
      label: "timestamp",
      children: blockWithTX ? blockWithTX.timestamp : "Loading",
    },
    {
      key: "5",
      label: "nonce",
      children: blockWithTX ? blockWithTX.nonce : "Loading",
    },
    {
      key: "6",
      label: "difficulty",
      children: blockWithTX ? blockWithTX.difficulty : "Loading",
    },
    {
      key: "7",
      label: "gas limit",
      children: blockWithTX ? blockWithTX.gasLimit.toNumber() : "Loading",
    },
    {
      key: "8",
      label: "gas used",
      children: blockWithTX ? blockWithTX.gasUsed.toNumber() : "Loading",
    },
    {
      key: "9",
      label: "miner",
      children: blockWithTX ? blockWithTX.miner : "Loading",
    },
    {
      key: "10",
      label: "extra data",
      children: blockWithTX ? blockWithTX.extraData : "Loading",
    },
    {
      key: "12",
      label: "base fee per gas",
      children: blockWithTX
        ? Utils.formatUnits(blockWithTX.baseFeePerGas, "gwei")
        : "Loading",
    },
  ];

  const columns = [
    {
      title: "Txn Hash",
      dataIndex: "hash",
      key: "hash",
    },
    {
      title: "From",
      dataIndex: "from",
      key: "from",
    },
    {
      title: "To",
      dataIndex: "to",
      key: "to",
    },
    {
      title: "Value",
      dataIndex: "value",
      key: "value",
    },
    {
      title: "Detail",
      dataIndex: "detail",
      key: "detail",
    },
  ];
  let dataSourceLoading = [
    { key: 1, hash: 1, from: "from", to: "to", value: "value", detail: "" },
  ];
  if (blockWithTX) {
    dataSourceLoading = blockWithTX.transactions.map((e, i) => {
      return {
        key: i,
        hash: e.hash.slice(0, 10) + "..." + e.hash.slice(-10),
        from: e.from,
        to: e.to,
        value: Utils.formatEther(e.value),
        detail: <Link to={`/tx?index=${e.transactionIndex}`}>Detail</Link>,
      };
    });
  }

  return (
    <div>
      <Tabs>
        <TabPane tab="Overview" key="1">
          <Card>
            {blockWithTX ? (
              <Descriptions
                bordered={true}
                column={1}
                title={
                  blockNumber ? `Block #${blockNumber}` : "Block is Loading"
                }
                items={blockItems}
              />
            ) : (
              <div>Block is Loading...</div>
            )}
          </Card>
        </TabPane>
        <TabPane tab="Transactions" key="2">
          <Table
            pagination={false}
            columns={columns}
            dataSource={dataSourceLoading}
          />
        </TabPane>
      </Tabs>
    </div>
  );
}

export default Block;
