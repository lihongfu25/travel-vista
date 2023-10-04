// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '@frontend/configuration';
import { Route, Routes, Link } from 'react-router-dom';
import Login from './auth/login/login';

export function App() {
  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route
          path="/"
          element={
            <div>
              This is the generated root route.{' '}
              <Link to="/page-2">Click here for page 2.</Link>
            </div>
          }
        />
        <Route
          path="/page-2"
          element={
            <div>
              <Link to="/">Click here to go back to root page.</Link>
            </div>
          }
        />
        <Route path="/auth">
          <Route path="login" element={<Login />} />
        </Route>
      </Routes>
    </ThemeProvider>
  );
}

export default App;
