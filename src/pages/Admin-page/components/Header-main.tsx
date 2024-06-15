
const HeaderMain = () => {
  return (
    <div className="header-main">
            <h2>
              <label htmlFor="nav-toggle">
                <span className="las la-bars"></span>
              </label>
              Dashboard
            </h2>

              {/* <div className="search-wrapper">
                <span className="las la-search"></span>
                <input type="search" placeholder="Search here" />
              </div> */}

            <div className="user-wrapper">
              <img
                src="/src/assets/anya-cute.jpg"
                width="40px"
                height="40px"
                alt=""
              />
              <div>
                <h4>Datnt nt</h4>
                <small>Super admin</small>
              </div>
            </div>
          </div>
  )
}

export default HeaderMain