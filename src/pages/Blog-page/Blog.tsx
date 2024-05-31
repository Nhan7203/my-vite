// import { Navbar, Footer } from "../../import/import-router";
// import { useState, useEffect  } from "react";
// import "./Blog.css";


// export interface Blog {
//   blogId: number;
//   title: string;
//   description: string;
//   imageBlog: string;
// }

// const getGridColumn = (index: number) => {
//   const gridColumnMap = ["1 / 4", "5 / 8", "9 / 12"];
//   return gridColumnMap[index % gridColumnMap.length];
// };

// const Blog = () => {

//   const [blogList, setBlogList] = useState<Blog[]>([]);

// //Get API blog
//   useEffect(() => {
//     const fetchData = async () => {
//       const result = ;
//       setBlogList(result);
//     };
//     fetchData();
//   }, []);

//   return (
//     <div>
//       <Navbar />

//       <div className="body-blog">
//         <div>
//           {blogList.map((blog, index) => (
//             <div
//               className="box-blog"
//               style={{
//                 gridColumn: getGridColumn(index),
//               }}
//             >
//               <div className="element-blog">
//                 <img src={} className="img-card" alt="" />
//                 <div>
//                   <p>icon View</p>
//                   <p>MM/DD/YY</p>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default Blog;
