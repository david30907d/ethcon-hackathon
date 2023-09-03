import { Table } from "antd";
import { useState, useEffect } from "react";
import { getColumnsForSuggestionsTable } from "../../utils/tableExpansionUtils";

export default function SuggestionsForBetterStableCoins(props) {
  const { wording, topNData, portfolioApr } = props;
  const [data, setData] = useState([]);
  const commonColumns = getColumnsForSuggestionsTable(portfolioApr);

  useEffect(() => {
    if (topNData) {
      let extractedData = topNData.map((metadata, idx) => ({
        key: idx,
        chain: metadata.chain,
        pool: metadata.project,
        coin: metadata.symbol,
        tvl: metadata.tvlUsd / 1e6,
        apr: ((metadata.apy / 100 + 1) ** (1 / 365) - 1) * 365,
      }));
      if (extractedData.length === 0) {
        extractedData = [
          {
            key: 1,
            chain: "",
            pool: "",
            coin: "Your Current Pool is the best one",
            tvl: 0,
            apr: "",
          },
        ];
      }
      setData(extractedData);
    }
  }, [topNData]);

  return (
    <div>
      <h2 className="ant-table-title">{wording}:</h2>
      <Table
        columns={commonColumns}
        dataSource={data}
        pagination={false}
        scroll={{
          x: 600,
          y: props.windowHeight,
        }}
      />
    </div>
  );
}
