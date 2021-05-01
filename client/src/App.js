import "./App.css";
import { Redirect, BrowserRouter as Router, Route } from "react-router-dom";
import PrivateRoute from "./components/Routing/PrivateRoute";

// Redux imports
import { Provider } from "react-redux";
import store from "./store";

// import components
import Alert from "./components/Alert";
import NavBar from "./components/Home/NavBar";
import Home from "./components/Home/Home";
import Chat from "./components/Chat/Chat";
import Login from "./components/Register-Login/Login";
import Register from "./components/Register-Login/Register";
import { useEffect } from "react";
import setAuthToken from "./utils/setAuthToken";
import { loadUser } from "./actions/auth";
import { LOGOUT } from "./actions/types";
import { ContactsProvider } from "./contexts/ContactsProvider";
import { SocketProvider } from "./contexts/SocketProvider";

const App = () => {
  // const id = auth && auth.user && auth.user.data._id;
  // console.log(id);
  useEffect(() => {
    if (localStorage.token) setAuthToken(localStorage.token);
    store.dispatch(loadUser());
    //console.log(this.props.auth);
    // log user out from all tabs if they log out in one tab
    window.addEventListener("storage", () => {
      if (!localStorage.token) store.dispatch({ type: LOGOUT });
    });
  }, []);

  return (
    <>
      <Provider store={store}>
        <ContactsProvider>
          <Router>
            <NavBar />
            <Route
              exact
              path="/"
              render={() =>
                localStorage.token ? <Redirect to="/chat" /> : <Home />
              }
            />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <PrivateRoute exact path="/chat" component={Chat} />
          </Router>
        </ContactsProvider>
      </Provider>
    </>
  );
};

export default App;
