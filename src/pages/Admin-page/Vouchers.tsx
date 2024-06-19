import HeaderMain from "./components/Header-main";
import Sidebar from "./components/Sidebar";

const Vouchers = () => {
  return (
    <>
      <div>
        <input type="checkbox" id="nav-toggle" />
        <Sidebar />

        <div className="main-content">
          <HeaderMain
            searchQuery={""}
            displayed={[]}
            setSearchQuery={function (): void {
              throw new Error("Function not implemented.");
            }}
          />

          <div></div>
        </div>
      </div>
    </>
  );
};

export default Vouchers;
