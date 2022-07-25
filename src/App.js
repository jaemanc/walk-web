import React from 'react';
import Header from './component/Header';
import Main from './component/Main';
import Footer from './component/Footer';
import SideBar from './sidebar';
import Button from './component/Button';
import styles from './css/App.module.css';


function App() {
  return (
    <div className="App">
      <SideBar/>
      <div id="page-wrap">
        <h1 className={styles.title}>title!!!!</h1>
        <Header />
        <Main name='으아아' color='blue'/>
        <Footer />
        <Button text="버튼"/>
      </div>
    </div>
  );
} 

export default App;
