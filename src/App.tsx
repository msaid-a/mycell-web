import React from "react";
import "./App.css";
import { ChakraProvider } from "@chakra-ui/react";
import { Routes, Route } from "react-router-dom";
import { ROUTE_PATH } from "./Route";
import { AsyncPage } from "./Component";
import { AppCtx, AppContextInterface } from "./Contex";
import Papa from "papaparse";

function App() {
  const [data, setData] = React.useState<AppContextInterface[] | any>([]);
  const [loading, setLoading] = React.useState(false);

  const getData = async () => {
    setLoading(true);
    Papa.parse(
      "https://docs.google.com/spreadsheets/d/e/2PACX-1vSjzpBRejuozgKaP5czpx9XH4p5kF6adAbfoRvwZ9OC1zq0lNJgN_7_ec_0PmGEUUxx9QXZCNyw5e3H/pub?output=csv",
      {
        download: true,
        header: true,
        complete: (results) => {
          setData(results.data);
        },
      }
    );
    setLoading(false);
  };

  React.useEffect(() => {
    if (data.length === 0) {
      getData();
    }
  }, [data]);

  const {
    HOME,
    PULSA,
    KUOTA,
    ORDER_KUOTA,
    GAME,
    ORDER_GAME,
    TOKEN,
    E_MONEY,
    ORDER_EMONEY,
  } = ROUTE_PATH;

  const ROUTES = [
    { path: HOME, exact: true, page: "" },
    { path: PULSA, exact: true, page: "pulsa" },
    { path: KUOTA, exact: true, page: "paket-data" },
    { path: ORDER_KUOTA, exact: true, page: "paket-data/order" },
    { path: E_MONEY, exact: true, page: "e-money" },
    { path: ORDER_EMONEY, exact: true, page: "e-money/order" },
    { path: GAME, exact: true, page: "game-online" },
    { path: ORDER_GAME, exact: true, page: "game-online/order" },
    { path: TOKEN, exact: true, page: "token-listrik" },
  ];
  return (
    <ChakraProvider>
      <AppCtx.Provider value={data}>
        <Routes>
          {ROUTES.map((route, i) => (
            <Route
              path={route.path}
              index={route.page === ""}
              element={<AsyncPage page={route.page} loading={loading} />}
            />
          ))}
        </Routes>
      </AppCtx.Provider>
    </ChakraProvider>
  );
}

export default App;
