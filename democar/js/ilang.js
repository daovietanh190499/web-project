const slides = {
  imageDir: 'images/slider/',
  imageNum: 9
}

const lang = {
    en : {
        time: "7.00 AM  - 6.00 PM",
        logoLink: "images/logo/logo.png",
        phone: "(+84)987 216 007",
        hotline: "(+84)912 63 55 00",
        detailAddress: "Tòa nhà tập đoàn Thành Công ",
        address: "1st Lane, San Francisco, USA",
        email: "daovietanhsky@gmail.com",
        website: "http://daovietanh.github.io",
        productcode: "Product code",
        origin: "Origin",
        views: "Views",
        readmore: "Read more",
        detail: "Detail",
        block: {
            aboutus: "ABOUT US",
            quicklink: "QUICK LINK",
            products: "PRODUCTS",
            latestproduct: "LATEST PRODUCTS",
            tintuc: "NEWS",
            category: "CATEGORY",
            contactus: "Contact us",
            statistics: "REVENUE",
            revenue: "STATISTICS",
            contactinfor: "CONTACT INFORMATION",
            wherewelocated: "WHERE WE LOCATED",
            sendusmessage: "SEND US A MESSAGE",
            timeline: "TIMELINE",
            ourmission: "OUR MISSION",
            recentpost: "RECENT POST",
            productdetails: "PRODUCT DETAILS",
            relatedproduct: "RELATED PRODUCT",
            specifications: "SPECIFICATIONS"
        },
        offers: [
            {
              icon: "images/others/screw.svg",
              title: "TOP RATED",
              description: "On the other hand, we denounce with righteous indignation and dislike men who are so beguiled demoralized"
            },
            {
              icon: "images/others/wheel.svg",
              title: "BEST QUALITY",
              description: "On the other hand, we denounce with righteous indignation and dislike men who are so beguiled demoralized"
            },
            {
              icon: "images/others/phone.svg",
              title: "LOW COST",
              description: "On the other hand, we denounce with righteous indignation and dislike men who are so beguiled demoralized"
            }
        ],
        messageForm: {
            yourname: "Your Name*",
            youremail: "Your Email*",
            subject: "Subject*",
            message: "Message*",
            sendnow: "SEND NOW"
        }
    },
    vi: {
        time: "7.00 AM  - 6.00 PM",
        logoLink: "images/logo/logo.png",
        phone: "(+84)987 216 007",
        hotline: "(+84)912 63 55 00",
        detailAddress: "Tòa nhà Tập đoàn Thành Công ",
        address: "Dịch Vọng hậu, Cầu Giấy, Hà Nội, Việt Nam",
        email: "duan.doosanvietnam@gmail.com",
        website: "https://doosanthanhcong.com",
        productcode: "Mã sản phẩm",
        origin: "Xuất xứ",
        views: "Lượt xem",
        readmore: "XEM THÊM",
        detail: "Xem chi tiết",
        block: {
            aboutus: "GIỚI THIỆU CHUNG",
            quicklink: "ĐƯỜNG DẪN",
            latestproduct: "SẢN PHẨM NỔI BẬT",
            products: "CÁC SẢN PHẨM",
            tintuc: "TIN TỨC",
            category: "DANH MỤC",
            contactus: "Liên hệ với chúng tôi",
            statistics: "THỐNG KÊ",
            revenue: "DOANH THU",
            contactinfor: "THÔNG TIN LIÊN HỆ",
            wherewelocated: "BẢN ĐỒ CÔNG TY",
            sendusmessage: "GỬI TIN NHẮN CHO CHÚNG TÔI",
            timeline: "CHẶNG ĐƯỜNG PHÁT TRIỂN",
            ourmission: "TẦM NHÌN CHIẾN LƯỢC",
            recentpost: "TIN TỨC",
            productdetails: "THÔNG TIN SẢN PHẨM",
            relatedproduct: "SẢN PHẨM LIÊN QUAN",
            specifications: "THÔNG SỐ KỸ THUẬT"
        },
        slides: [
          "images/slider/1.jpg","images/slider/2.jpg","images/slider/3.jpg","images/slider/4.jpg"
        ],
        offers: [
            {
              icon: "images/others/screw.svg",
              title: "BẢO DƯỠNG",
              description: "Bảo dưỡng theo định kỳ nhà sản xuất vào các thời điểm máy làm việc được: 500h - 1700h - 3000h. Bảo dưỡng tại địa điểm máy làm việc"
            },
            {
              icon: "images/others/wheel.svg",
              title: "PHỤ TÙNG",
              description: "Chúng tôi không chỉ cung cấp phụ tùng cho công tác bảo hành, bảo dưỡng máy mới mà còn kinh doanh phụ tùng trên toàn quốc nên phụ tùng luôn sẵn có tại tổng kho Doosan của hãng. Đáp ứng 90% phụ tùng cho máy"
            },
            {
              icon: "images/others/phone.svg",
              title: "LIÊN HỆ",
              description: `Liên hệ: (+84)987 216 007`
            }
        ],
        messageForm: {
            yourname: "Tên của bạn*",
            youremail: "Email của bạn*",
            subject: "Chủ đề*",
            message: "Lời nhắn*",
            sendnow: "GỬI NGAY"
        }
    }
}

function ilang(reference, local) {
    return eval("lang" + '.' + local + '.' + reference)
}