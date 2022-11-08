import './App.css';
import Feed from './features/feed/feed';
import PopupArticle from './features/popupArticle/popupArticle';
import { Provider } from 'react-redux';
import store from './app/store';

function App() {

  return (
    <Provider store = {store}>
      <PopupArticle/>
      <Feed/>
    </Provider>
  );
}

export default App;
