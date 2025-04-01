import React from 'react';
import './App.css';
import TaskList from './components/tasks/TaskList';

function App() {
  return (
    <div className="App">
      <header className="App-header" style={{ backgroundColor: '#282c34', color: 'white', padding: '1rem' }}>
        <h1>Task Manager Application</h1>
      </header>
      <main>
        <TaskList />
      </main>
      <footer style={{ marginTop: '2rem', padding: '1rem', backgroundColor: '#f8f9fa', textAlign: 'center' }}>
        <p>Task Manager App - {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
}

export default App;