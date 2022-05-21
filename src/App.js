import React, { useEffect, useState } from "react";
import Pagination from "./Pagination/Pagination";
import "./App.css";
export default function App() {
  const [data, setData] = useState({
    page: 1,
    take: 10,
  });
  useEffect(() => {
    console.log(`take ${data.take},from page:${data.page}`);
  }, [data]);
  const totalItmes = 200;
  return (
    <div className="App">
      <Pagination
        // required props
        totalItmes={totalItmes}
        state={data}
        setState={setData}
        // optional props
        loading={false}
        activeClassName={"activeClassName"}
        pageItemsClassName={"pageItemsClassName"}
        buttonsClassName={"buttonsClassName"}
        buttonsText={{ prev: "قبلی", next: "بعدی" }}
        takeChangerCounts={[10,50,100]}
        showTakeChanger={true}
        takeChangerClassName={"takeChangerClassName"}
        takeChangerText={"Rows :"}
      />
    </div>
  );
}
