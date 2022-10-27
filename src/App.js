import './App.css';
import Feed from './features/feed/feed';
import { Provider } from 'react-redux';
import store from './app/store';

function App() {


  return (
    <Provider store = {store}>
      <Feed/>
    </Provider>
  );
}

export default App;
