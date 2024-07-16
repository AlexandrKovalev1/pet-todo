import "./App.css";
import { Main } from "common/layout/main/Main";
import { Outlet } from "react-router-dom";
import { Header } from "common/layout/header/Header";
import React, { memo, useEffect } from "react";
import { Sceleton } from "common/components/sceleton/Sceleton";
import { SnackBar } from "common/components/snackBar/SnackBar";
import { useAppDispatch, useAppSelector } from "./store";
import { Container } from "common/components/container/Container";
import { selectIsInitialized } from "app/appSlice";
import { authThunks } from "features/login/model/authSlice";

const App = memo(() => {
  const dispatch = useAppDispatch();
  const initialized = useAppSelector(selectIsInitialized);

  useEffect(() => {
    dispatch(authThunks.initializeApp());
  }, [dispatch]);

  if (!initialized) {
    return <Sceleton />;
  }

  return (
    <div className="App">
      <SnackBar />
      <Header />
      <Main>
        <Container width={"1440px"}>
          <Outlet />
        </Container>
      </Main>
    </div>
  );
});

export default App;
