import React from "react";
import { Card, Collapse, Descriptions } from "antd";
import ReactJson from "@microlink/react-json-view";
import { useSearchParams } from "react-router-dom";

const { Utils } = require("alchemy-sdk");

function Transactions({ blockNumber, blockWithTX }) {
  const [searchParams, setSearchParams] = useSearchParams();
  console.log("type: ", searchParams);
  let index = searchParams.get("index");

  const { Panel } = Collapse;

  const blockItems = [
    {
      key: "1",
      label: "hash",
      children: blockWithTX ? blockWithTX.transactions[index].hash : "Loading",
    },
    {
      key: "2",
      label: "type",
      children: blockWithTX ? blockWithTX.transactions[index].type : "Loading",
    },
    {
      key: "3",
      label: "blockHash",
      children: blockWithTX
        ? blockWithTX.transactions[index].blockHash
        : "Loading",
    },
    {
      key: "4",
      label: "transactionIndex",
      children: blockWithTX
        ? blockWithTX.transactions[index].transactionIndex
        : "Loading",
    },
    {
      key: "5",
      label: "confirmations",
      children: blockWithTX
        ? blockWithTX.transactions[index].confirmations
        : "Loading",
    },
    {
      key: "6",
      label: "from",
      children: blockWithTX ? blockWithTX.transactions[index].from : "Loading",
    },
    {
      key: "7",
      label: "gasPrice",
      children: blockWithTX
        ? Utils.formatUnits(blockWithTX.transactions[index].gasPrice, "gwei")
        : "Loading",
    },
    {
      key: "8",
      label: "maxPriorityFeePerGas",
      children: blockWithTX
        ? Utils.formatUnits(
            blockWithTX.transactions[index].maxPriorityFeePerGas,
            "gwei"
          )
        : "Loading",
    },
    {
      key: "9",
      label: "maxFeePerGas",
      children: blockWithTX
        ? Utils.formatUnits(
            blockWithTX.transactions[index].maxFeePerGas,
            "gwei"
          )
        : "Loading",
    },
    {
      key: "10",
      label: "gasLimit",
      children: blockWithTX
        ? blockWithTX.transactions[index].gasLimit.toNumber()
        : "Loading",
    },
    {
      key: "11",
      label: "to",
      children: blockWithTX ? blockWithTX.transactions[index].to : "Loading",
    },
    {
      key: "12",
      label: "value",
      children: blockWithTX
        ? Utils.formatEther(blockWithTX.transactions[index].value)
        : "Loading",
    },
    {
      key: "13",
      label: "nonce",
      children: blockWithTX ? blockWithTX.transactions[index].nonce : "Loading",
    },
    {
      key: "14",
      label: "data",
      children: blockWithTX ? blockWithTX.transactions[index].data : "Loading",
    },
    {
      key: "15",
      label: "chainId",
      children: blockWithTX
        ? blockWithTX.transactions[index].chainId
        : "Loading",
    },
  ];

  return (
    <div>
      <Card>
        {blockWithTX ? (
          <Descriptions bordered={true} column={1} items={blockItems} />
        ) : (
          <div>Block is Loading...</div>
        )}
      </Card>
      <Card>
        <Collapse>
          <Panel header="Raw JSON" key={1}>
            {blockWithTX ? (
              <ReactJson src={blockWithTX.transactions[index]} />
            ) : (
              "Block is Loading"
            )}
          </Panel>
        </Collapse>
      </Card>
    </div>
  );
}
export default Transactions;
