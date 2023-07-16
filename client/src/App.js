import './App.css';
import Entry from './component/Entry/Entry';

function App() {
  return (
    <main>
      <header>
        <a href="" className="logo">Logo</a>
        <nav>
          <a href="">Login</a>
          <a href="">Register</a>
        </nav>
      </header>

      <Entry />
    </main>
  );
}

export default App;
