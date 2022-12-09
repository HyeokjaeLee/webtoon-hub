import { NavBar, UpdateDaysBar } from "../../components";
import scss from "./DefaultLayout.module.scss";

interface DefaultLayoutProps {
  children: React.ReactNode;
}

export const DefaultLayout = ({ children }: DefaultLayoutProps) => {
  return (
    <main className={scss["default-layout"]}>
      <NavBar />
      <UpdateDaysBar />
      <section>{children}</section>
    </main>
  );
};
