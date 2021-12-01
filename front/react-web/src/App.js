import { PAGE_URL } from './utils/uris';
import {Switch, Route} from 'react-router-dom'
import NavBar from './components/common/NavBar';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import PostPage from './pages/PostPage'
import PostListPage from './pages/PostListPage';
import Palette from './utils/styles/palette';
import PostWriteQuill from './components/post/PostWriteQuill';

//        <Route exact path={PAGE_URL.HOME} component={HomePage}></Route>


function App() {
  return (
    <div className="App">
      <Palette/>
      <NavBar></NavBar>
      <Switch>
        <Route path={PAGE_URL.SIGNUP} component={SignUpPage}></Route>
        <Route path={PAGE_URL.LOGIN} component={LoginPage}></Route>
        <Route exact path={PAGE_URL.HOME} component={PostListPage}/>
        <Route exact path={PAGE_URL.POST} component={PostPage}></Route>
        <Route path={PAGE_URL.POSTWITE} component={PostWriteQuill}></Route>
      </Switch>
    </div>
  );
}

export default App;
