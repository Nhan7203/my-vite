import { Navbar, Footer  } from "../../import/import-router";
import view from "../../assets/view.png";
import an from "../../assets/anya-cute.jpg";
import "./Blog.css";

const BlogDetails = () => {
  return (
    <div>
      <Navbar />
      <div className="body-blogdetails">
        <div>
          <div className="box-left-blogdetails">
            <div className="box-title-blogdetails">
              Review dòng sữa cao cấp Meiji: Chất lượng có xứng với giá tiền?
            </div>
            <div className="box-time-view">
              <div>05:36PM - thu sau </div>
              <div className="icon-blog">
                <img src={view} className="view" alt="view" />
                <div style={{ transform: "translateY(3px)" }}>0</div>
              </div>
            </div>
            <div className="content-blogdeatails">
              Thị trường phân phối sữa bột cho bé hiện đang ngày càng trở nên đa
              dạng. Vậy nên, các mẹ cũng trở nên khắt khe hơn trong vấn đề chọn
              sữa cho bé để đảm bảo đó phải là loại sữa bột tốt nhất, đáp ứng đủ
              các tiêu chí mẹ đề ra như phát triển trí não, chiều cao, cân nặng,
              có sức đề kháng tốt, hỗ trợ tiêu hoá khoẻ, tránh táo bón,... Những
              tiêu chí trên cũng chính là xu hướng khi chọn sữa cho bé của bất
              kỳ mẹ nào.\n\nVì lẽ đó mà sữa Nhật Meiji, với thành phần dinh
              dưỡng cân bằng, giúp trẻ phát triển toàn diện và ổn định từ thể
              chất tới trí não đã trở thành lựa chọn số 1 của các mẹ.Đặc biệt,
              sữa Nhật Meiji còn được chia theo từng giai đoạn phát triển của
              bé, bao gồm:\n\nMeiji Infant Formula (dành cho bé từ 0-1 tuổi):
              Tập trung đến sự phát triển não bộ của trẻ, chú trọng đến khả năng
              miễn dịch, cân nhắc đến tình trạng tiêu hoá và hấp thu để điều
              chỉnh tình trạng phân của bé.\nNhìn chung, sữa Nhật Meiji trở
              thành xu hướng là nhờ đáp ứng đúng nhu cầu mà các mẹ hướng đến khi
              chọn mua sữa bột cho bé yêu. Bên cạnh đó, Meiji còn mang đến những
              sản phẩm hết sức tiện dụng khiến các mẹ càng hài lòng hơn. Một khi
              con đường chinh phục trái tim các mẹ đã thành công thì giá tiền
              với mẹ không còn là vấn đề nữa, bởi lẽ người mẹ nào không muốn đem
              những điều tốt đẹp nhất trên đời dành cho bé cưng của mẹ?
            </div>
            <div className="author">Johnny D Vũ Lê</div>
            <div className="img-blogdetails"><img src={an} alt="Mô tả ảnh" /></div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BlogDetails;
