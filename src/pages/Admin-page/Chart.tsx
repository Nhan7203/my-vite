import Dashboard from "./ChartComponent/DashBoard";
import HeaderMain from "./components/Header-main";
import Sidebar from "./components/Sidebar";

const Chart = () => {
  return (
    <>
      <div>
        <input type="checkbox" id="nav-toggle" />
        <Sidebar />

        <div className="main-content"  style={{ paddingTop: '80px' }}>
          <HeaderMain searchQuery={""} displayed={[]} setSearchQuery={function (): void {
            throw new Error("Function not implemented.");
          } } />
          <Dashboard />
          <div></div>
        </div>
      </div>
    </>
  );
};

export default Chart;