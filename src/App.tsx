import Header from "./components/Header.tsx";
import TitleAdder from "./HOC/TitleAdder.tsx";

const App = () => {
  return (
    <main className="grid gap-[24px]">
      <Header />
    </main>
  );
};

export default TitleAdder(App, "Mohammad Kargar | محمد کارگر");
