import React, { createContext, useContext, useState } from "react";
import "./App.css";
import Profile from "./components/Profile";
import Counter from "./components/Counter";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory,
  useLocation,
} from "react-router-dom";

export default function App() {
  return (
    <ProvideAuth>
      <Router>
        <div>
          <AuthButton />
          <ul>
            <li>
              <Link to="/public">Public Page</Link>
            </li>
            <li>
              <Link to="/protected">Protected Page</Link>
            </li>
          </ul>
          <Switch>
            <Route path="/public">
              <Counter />
            </Route>
            <Route path="/login">
              <LoginPage />
            </Route>
            <PrivateRoute path="/protected">
              <Profile />
            </PrivateRoute>
          </Switch>
        </div>
      </Router>
    </ProvideAuth>
  );
}

const fakeAuth = {
  isAuthenticated: false,
  signin(cb: () => void) {
    fakeAuth.isAuthenticated = true;
    setTimeout(cb, 100);
  },
  signout(cb: () => void) {
    fakeAuth.isAuthenticated = false;
    setTimeout(cb, 100);
  },
};

interface ProvideAuth {
  user: string | null;
  signin: (cb: () => void) => void;
  signout: (cb: () => void) => void;
}

const authContext = createContext<ProvideAuth | null>(null);

function ProvideAuth({ children }: { children: React.ReactElement }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

function useAuth() {
  return useContext(authContext);
}

function useProvideAuth() {
  const [user, setUser] = useState<string | null>(null);

  const signin = (cb: () => void) => {
    return fakeAuth.signin(() => {
      setUser("user");
      cb();
    });
  };

  const signout = (cb: () => void) => {
    return fakeAuth.signout(() => {
      setUser(null);
      cb();
    });
  };

  return {
    user,
    signin,
    signout,
  };
}

function AuthButton() {
  let history = useHistory();
  let auth = useAuth();

  if (auth === null) {
    return <p>You are not logged in.</p>;
  }

  return (
    <p>
      Welcome!{" "}
      <button
        onClick={() => {
          if (auth !== null) {
            auth.signout(() => history.push("/"));
          }
        }}
      >
        Sign Out
      </button>
    </p>
  );
}
interface PrivateRouteProps {
  children: React.ReactElement;
  path: string;
}
function PrivateRoute({ children, ...rest }: PrivateRouteProps) {
  let auth = useAuth();
  return (
    <Route
      {...rest}
      render={({ location }) =>
        auth && auth.user ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}

interface From {
  from: {
    pathname: string;
  };
}

function LoginPage() {
  let history = useHistory();
  let location = useLocation<From>();
  let auth = useAuth();

  let { from } = location.state || { from: { pathname: "/" } };
  let login = () => {
    auth &&
      auth.signin(() => {
        history.replace(from);
      });
  };

  return (
    <div>
      <p>You must log in to view the page at {from.pathname}</p>
      <button onClick={login}>Log in</button>
    </div>
  );
}
