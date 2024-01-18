// import logo from './logo.svg';
import Header from './components/Header'
import Content from './components/Content'
import Home from './pages/Home';
import './App.css';
import 'antd/dist/antd.css';

function App() {
  return (
    <Home>
      <Header />    
      <div style={{
        "padding": "0 20px"
      }}>
        <Content />
      </div>
    </Home>
  );
}

export default App;
