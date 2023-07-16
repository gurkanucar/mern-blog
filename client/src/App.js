import './App.css';
import Entry from './component/Entry/Entry';
import Header from './component/Header/Header';

import { Route, Routes } from "react-router-dom";
import Layout from './component/Layout/Layout';

function App() {
  return (
    <Routes >
      <Route path='/' element={<Layout />}>
        <Route index element={
          <Entry />
        } />
        <Route path={"/login"} element={
          <div>login</div>
        } />
        <Route path={"/register"} element={
          <div>register</div>
        } />
      </Route>
    </Routes >);
}

export default App;
