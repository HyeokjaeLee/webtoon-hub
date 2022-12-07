import { NavBar, UpdateDaysBar } from "../../components";
interface DefaultLayoutProps {
  children: React.ReactNode;
}

export const DefaultLayout = ({ children }: DefaultLayoutProps) => {
  return (
    <main>
      <NavBar />
      <UpdateDaysBar />
      <section>{children}</section>
    </main>
  );
};
