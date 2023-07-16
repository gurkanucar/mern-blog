import './App.css';

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
      <div className="entry">
        <div className="image">
          <img src="https://techcrunch.com/wp-content/uploads/2023/07/GettyImages-500665269.jpg?w=430&h=230&crop=1" />
        </div>

        <div className="texts">
          <h2>On-prem data centers are hanging in, but cloud capacity is growing much faster</h2>
          <div className="info">
            <a className="author" href="">Gurkan UCAR</a>
            <time>2023-07-18 9:39 AM</time>

          </div>
          <p>In 2017, on-prem data centers accounted for nearly 60% of capacity. By 2027, Synergy Research is projecting that number will be cut in half, but that data doesn’t tell the whole story. New research from Synergy finds that on-prem data center growth is actually hanging in, but over the next five years, growth will remain essentially unchanged. At the same time, hyperscale data centers operated by the largest cloud companies will continue to grow at a hefty rate.</p>
        </div>
      </div>

    </main>
  );
}

export default App;
