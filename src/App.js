import React, { useState } from "react";
// import { BrowserRouter as Router, Switch, Route, BrowserRouter, Routes } from 'react-router-dom';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";
// import Menu from './Components/Navbars/Menu';
import NavBar from "./Components/Navbars/NavBar";
// import SideBar from './Components/Navbars/SideBar';
import { darkTheme, lightTheme } from "./Components/utils/Theme";
import AccountUser from "./Pages/Account/AccountUser";
import DashboardHome from "./Pages/Dashboard/DashboardHome";
import Gainers from "./Pages/GainersLosers/Gainers";
import Losers from "./Pages/GainersLosers/Losers";
import Kyc from "./Pages/KycComponent/Kyc";
import PairExplorer from "./Pages/PairsComponent/PairExplorer";
import StatsMain from "./Pages/Stats/StatsMain";
import Trends from "./Pages/TrendsComponent/Trends";
import "@rainbow-me/rainbowkit/styles.css";

import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { chain, configureChains, createClient, WagmiConfig } from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import { Navigate, useParams } from "react-router-dom";

const { chains, provider } = configureChains(
  [chain.mainnet, chain.polygon, chain.optimism, chain.arbitrum, chain.rinkeby],
  [alchemyProvider({ apiKey: process.env.ALCHEMY_ID }), publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: "My RainbowKit App",
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

const Mainsidebar = styled.div`
  display: flex;
`;
const Main = styled.div`
  flex: 7;
`;
const Wrapper = styled.div`
  background: ${({ theme }) => theme.bgitems};
  padding: 3rem 0;
  color: ${({ theme }) => theme.text};
  height: 100%;
`;

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/home/:chain"
          element={<Layer Component={DashboardHome} />}
        />
        <Route
          path="/pair-explorer/:chain/:pair"
          element={<Layer Component={PairExplorer} />}
          exact
        />
        <Route path="/gainers/:chain" exact element={<Layer Component={Gainers} />} />
        <Route path="/losers/:chain" element={<Layer Component={Losers} />} />
        <Route path="/trends" element={<Layer Component={Trends} />} />
        <Route path="/stats" element={<Layer Component={StatsMain} />} />
        <Route path="/account/:chain" element={<Layer Component={AccountUser} />} />
        <Route path="/account/" element={<Navigate to="/account/ethereum" />} />
        <Route path="/kyc" element={<Layer Component={Kyc} />} />
        <Route path="/" element={<Navigate to="/home/ethereum" />} />
      </Routes>
    </BrowserRouter>

  );
};


const Layer = ({ Component }) => {
  const [darkMode, setDarkMode] = useState(true);

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider chains={chains}>
          <Mainsidebar>
            {/*<Menu darkMode={darkMode} setDarkMode={setDarkMode} />*/}
            <Main>
              <NavBar darkMode={darkMode} setDarkMode={setDarkMode} />
              <Wrapper>
                <Component />
              </Wrapper>
            </Main>
          </Mainsidebar>
        </RainbowKitProvider>
      </WagmiConfig>
    </ThemeProvider>
  );
};

export default App;
