import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../modules";
import { logoutAsync } from "../modules/auth";

const LogoutButton = (): JSX.Element => {
  const loadingLogout = useSelector(
    (state: RootState) => state.auth.loading.LOGOUT,
  );
  const dispatch = useDispatch();

  const logout = useCallback(() => dispatch(logoutAsync.request()), [dispatch]);

  return loadingLogout ? (
    <span>로딩중...</span>
  ) : (
    // eslint-disable-next-line
    <a onClick={logout}>로그아웃</a>
  );
};

export default LogoutButton;
