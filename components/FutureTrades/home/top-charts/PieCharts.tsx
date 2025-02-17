import React from "react";
import { ResponsiveContainer, PieChart, Pie, Cell, Label } from "recharts";

const COLORS = ["#f6465d", "#0ecb81"];
export default function PieCharts({ tradeDatas }: any) {
  const data02 = [
    {
      name: "Group A",
      value: tradeDatas?.getHighestVolumePair?.short_account * 100,
    },
    {
      name: "Group B",
      value: tradeDatas?.getHighestVolumePair?.long_account * 100,
    },
  ];
  return (
    <div className="tradex-h-full tradex-bg-background-primary tradex-rounded-md ">
      <div className="p-3">
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <span className="text-12 text-primary">
              Long/Short Ratio{" "}
              <span className="ml-1 px-1 rounded text-F0B90B bg-3C2601">
                {tradeDatas?.getHighestVolumePair?.hour} hour
              </span>
            </span>
            <div className="d-flex align-items-center">
              <h5 className="text-14 text-primary mr-1">
                {tradeDatas?.getHighestVolumePair?.coin_pair}
              </h5>
              <span className="text-12 text-primary">
                {tradeDatas?.getHighestVolumePair?.type}
              </span>
            </div>
          </div>
        </div>

        <div className="row pt-3">
          <div className="col-6 pl-3 pr-1">
            <div>
              <span className="d-inline-block width-6 height-6 bg-F6465D margin-r-6"></span>
              <span className="text-12 text-primary">Short Account%</span>
              <h5 className="text-16 text-primary ml-12">
                {tradeDatas?.getHighestVolumePair?.short_account || 0}%
              </h5>
            </div>
            <div>
              <span className="d-inline-block width-6 height-6 bg-0ECB81 margin-r-6"></span>
              <span className="text-12 text-primary">Long Account%</span>
              <h5 className="text-16 text-primary ml-12">
                {tradeDatas?.getHighestVolumePair?.long_account || 0}%
              </h5>
            </div>
            <div>
              <span className="text-12 text-primary ml-12">
                Long/Short Ratio
              </span>
              <h5 className="text-16 text-primary ml-12">
                {tradeDatas?.getHighestVolumePair?.ratio || 0}
              </h5>
            </div>
          </div>
          <div className="col-6 px-1 d-flex align-items-center">
            <div className="w-full h-100">
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={data02}
                    innerRadius={30}
                    outerRadius={50}
                    dataKey="value"
                    stroke="none"
                  >
                    {data02.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                    <Label
                      value={tradeDatas?.getHighestVolumePair?.ratio}
                      position="center"
                    />
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
