window.onload = function () {
	// initialize navigation bar
	initNav();

	// initialize homepage goods
	initGoods();

	// initialize category data
	initCategory();

	// initialize footer data
	initFooter();

	// back to top button hide & show
	initBackBtn();
}

function initNav() {
	// get elements
	let navBar = document.querySelector(".nav");
	let stickyNavBar = document.querySelector(".sticky-nav");

	// get navbar height
	let navHeight = navBar.offsetHeight;

	// monitor page scroll
	window.addEventListener("scroll",function () {
		// get scrolled value
		let offsetY = getPageScroll().y;
		// check if scrolled value is more than original navbar
		if(offsetY >= navHeight) {
			// show sticky navbar
			stickyNavBar.style.top = "0";
		}
		else {
			// hide sticky navbar
			stickyNavBar.style.top = "-100px";
		}
	});
}

function initGoods() {
	let obj = initJsonData();
	// use art-template JS template engine to render homepage data
	let mainIn = document.querySelector(".main-in");
	mainIn.innerHTML += template('items', obj);
	// waterfall layout
	waterfall();
	// initialize text rows restriction
	initTextRow(3);
}

function initCategory() {
	let obj2 = initCategoryJsonData();
	// use art-template JS template engine to render category data
	let mainIn = document.querySelector(".main-in");
	mainIn.innerHTML += template('category', obj2);
}

function initFooter() {
	let obj3 = initFooterJsonData();
	// use art-template JS template engine to render footer data
	let footerIn = document.querySelector(".footer-in");
	footerIn.innerHTML += template('footer', obj3);
}

function initBackBtn() {
	let backToTopBtn = document.querySelector(".back");
	window.addEventListener("scroll", function () {
		let offsetY = getPageScroll().y;
		if(offsetY >= 500) {
			backToTopBtn.style.display = "block";
		}
		else {
			backToTopBtn.style.display = "none";
		}
	});

	// back to top button onclick
	backToTopBtn.onclick = function () {
		window.scrollTo(0, 0);
	}
}

function initTextRow(x) {
	// get elements
	let description = document.querySelectorAll(".mask-description");
	for(let i = 0; i < description.length; i++) {
		$clamp(description[i], { clamp: x });
	}
}

function initJsonData() {
	let str = `{
  "list": [
    {
      "originW": 750,
      "originH": 750,
      "cover": "https://s5.mogucdn.com/mlcdn/c45406/190516_4c4lcfkh4f695k2d0jcei2fc4ihj1_750x750.jpg",
      "coverLink": "https://pc.mogu.com/content/detail/122nxxm?iid=122nxxm&acm=3.mce.1_19_1z5evt6.128238.85381.ecQMWrqHX9GVT.sd_130_115-mid_128238-t_ecQMXrqHX9GVj-pos_0-pm_077-lc_201",
      "itemNumbers": 2,
      "brandInfo": [
        {
          "brandName": "H&M",
          "brandLogo": "https://s3.mogucdn.com/mlcdn/0ffcd9/180831_34lig093i41jdh2j9jlg7d99dd9a3_197x202.png_200x200.jpg",
          "link": "https://pc.mogu.com/content/brand/1aaf7g?brandId=1aaf7g&stickyId=&acm=3.mce.1_5_1aaf7g.128238.85381.ecQMWrqHX9GVT.sd_130_115-t_ecQMXrqHX9GVj-pos_0-lb_1-lc_201-mid_128238-pm_077"
        }
      ],
      "content": "#不止爱你三千遍#“人鱼姬”这个词在这两年突然风靡起来人鱼姬眼影人鱼姬腮红人鱼姬口红等等一直在找好看的人鱼姬面料给你做成衣服出来当时看到这个面料的时候再一次被惊喜到而且颜色太太美了版型优xiu满fen穿过我家类似版型的吊带裙的宝宝应该都知道的啦按喜欢的码数直接入手就对了胸前细条压褶加小卷边设计透出满满的小女人甜感这件裙子谁穿谁美不骗人对于小个子的宝宝这条裙子简直是宝藏连衣裙",
      "cFav": 161,
      "isFaved": false,
      "isVideo": false
    },
    {
      "originW": 1080,
      "originH": 1542,
      "cover": "https://s11.mogucdn.com/mlcdn/c45406/190517_5h8g4523gjddg5959jh58k5h11afc_1080x1542.jpg",
      "coverLink": "https://pc.mogu.com/content/detail/122oo48?iid=122oo48&acm=3.mce.1_19_1z5flzs.128238.85381.ecQMWrqHX9GVT.sd_130_115-mid_128238-t_ecQMXrqHX9GVj-pos_0-pm_077-lc_201",
      "itemNumbers": 8,
      "brandInfo": [
        {
          "brandName": "Champion",
          "brandLogo": "https://s11.mogucdn.com/mlcdn/0ffcd9/180817_0hkj6d446dgh4jhhaaef2g72j6ded_153x134.png_200x200.jpg",
          "link": "https://pc.mogu.com/content/brand/1aaf9i?brandId=1aaf9i&stickyId=&acm=3.mce.1_5_1aaf9i.128238.85381.ecQMWrqHX9GVT.sd_130_115-t_ecQMXrqHX9GVj-pos_1-lb_1-lc_201-mid_128238-pm_077"
        },
        {
          "brandName": "BALENCIAGA",
          "brandLogo": "https://s5.mogucdn.com/mlcdn/c45406/190508_397a8e2g6hg52a8dj3739kiklf9a9_425x425.png",
          "link": "https://pc.mogu.com/content/brand/1aafr6?brandId=1aafr6&stickyId=&acm=3.mce.1_5_1aafr6.128238.85381.ecQMWrqHX9GVT.sd_130_115-t_ecQMXrqHX9GVj-pos_2-lb_1-lc_201-mid_128238-pm_077"
        },
        {
          "brandName": "BURBERRY",
          "brandLogo": "https://s5.mogucdn.com/mlcdn/c45406/190211_31kkhhhc4leefj9gj4c363ef7h0k5_1984x1984.jpg",
          "link": "https://pc.mogu.com/content/brand/1aafze?brandId=1aafze&stickyId=&acm=3.mce.1_5_1aafze.128238.85381.ecQMWrqHX9GVT.sd_130_115-t_ecQMXrqHX9GVj-pos_3-lb_1-lc_201-mid_128238-pm_077"
        }
      ],
      "content": "#短袖千千万，这件最好穿！#原地瘦十斤！！！的穿搭短袖酷酷女孩👧",
      "cFav": 19,
      "isFaved": false,
      "isVideo": true
    },
    {
      "originW": 2400,
      "originH": 3667,
      "cover": "https://s11.mogucdn.com/mlcdn/7f0491/190502_56034968k8lj1bja9df61je841g94_2400x3667.jpg",
      "coverLink": "https://pc.mogu.com/content/detail/122odcy?iid=122odcy&acm=3.mce.1_19_1z5fb8i.128238.85381.ecQMWrqHX9GVT.sd_130_115-mid_128238-t_ecQMXrqHX9GVj-pos_0-pm_077-lc_201",
      "itemNumbers": 31,
      "brandInfo": [ ],
      "content": "#显瘦什么的，请交给长裙搞定！#",
      "cFav": 7,
      "isFaved": false,
      "isVideo": false
    },
    {
      "originW": 1080,
      "originH": 1919,
      "cover": "https://s11.mogucdn.com/mlcdn/c45406/190516_1h0edcg3k8ij6045jldke38hhjcdc_1080x1919.jpg",
      "coverLink": "https://pc.mogu.com/content/detail/122oj7c?iid=122oj7c&acm=3.mce.1_19_1z5fh2w.128238.85381.ecQMWrqHX9GVT.sd_130_115-mid_128238-t_ecQMXrqHX9GVj-pos_0-pm_077-lc_201",
      "itemNumbers": 1,
      "brandInfo": [
        {
          "brandName": "PROS BY CH",
          "brandLogo": "https://s11.mogucdn.com/mlcdn/0ffcd9/180827_395l9jehli05jhaeg57313014ak31_255x255.jpg_200x200.jpg",
          "link": "https://pc.mogu.com/content/brand/1aafr0?brandId=1aafr0&stickyId=&acm=3.mce.1_5_1aafr0.128238.85381.ecQMWrqHX9GVT.sd_130_115-t_ecQMXrqHX9GVj-pos_0-lb_1-lc_201-mid_128238-pm_077"
        }
      ],
      "content": "#渣男最爱的工装风，少女也可#酷酷的男友风最近大热！粗腿的妹纸完全hold住哦～",
      "cFav": 7,
      "isFaved": false,
      "isVideo": false
    },
    {
      "originW": 1080,
      "originH": 1439,
      "cover": "https://s11.mogucdn.com/mlcdn/c45406/190516_67li33clkcgga4f6a76c2jhkfeidh_1080x1439.jpg",
      "coverLink": "https://pc.mogu.com/content/detail/122nx0k?iid=122nx0k&acm=3.mce.1_19_1z5euw4.128238.85381.ecQMWrqHX9GVT.sd_130_115-mid_128238-t_ecQMXrqHX9GVj-pos_0-pm_077-lc_201",
      "itemNumbers": 1,
      "brandInfo": [
        {
          "brandName": "Charles&Keith",
          "brandLogo": "https://s11.mogucdn.com/mlcdn/0ffcd9/180906_8g1l2bj6ichg7h25fdhe82dbf74e2_225x225.png_200x200.jpg",
          "link": "https://pc.mogu.com/content/brand/1aaf9a?brandId=1aaf9a&stickyId=&acm=3.mce.1_5_1aaf9a.128238.85381.ecQMWrqHX9GVT.sd_130_115-t_ecQMXrqHX9GVj-pos_0-lb_1-lc_201-mid_128238-pm_077"
        },
        {
          "brandName": "RANDA",
          "brandLogo": "https://s5.mogucdn.com/mlcdn/0ffcd9/190110_5he34fb4he35cehc01e6591008k5k_397x397.png_200x200.jpg",
          "link": "https://pc.mogu.com/content/brand/1aakti?brandId=1aakti&stickyId=&acm=3.mce.1_5_1aakti.128238.85381.ecQMWrqHX9GVT.sd_130_115-t_ecQMXrqHX9GVj-pos_1-lb_1-lc_201-mid_128238-pm_077"
        },
        {
          "brandName": "可可里小姐",
          "brandLogo": "https://s3.mogucdn.com/mlcdn/0ffcd9/180913_2kj4h9gih543k645i3fa82469k20a_272x272.png_200x200.jpg",
          "link": "https://pc.mogu.com/content/brand/1aagsk?brandId=1aagsk&stickyId=&acm=3.mce.1_5_1aagsk.128238.85381.ecQMWrqHX9GVT.sd_130_115-t_ecQMXrqHX9GVj-pos_2-lb_1-lc_201-mid_128238-pm_077"
        },
        {
          "brandName": "馨帮帮",
          "brandLogo": "https://s11.mogucdn.com/mlcdn/0ffcd9/180830_88k7afj72bhd75kac2ic982jbb404_310x310.png_200x200.jpg",
          "link": "https://pc.mogu.com/content/brand/1aah2m?brandId=1aah2m&stickyId=&acm=3.mce.1_5_1aah2m.128238.85381.ecQMWrqHX9GVT.sd_130_115-t_ecQMXrqHX9GVj-pos_3-lb_1-lc_201-mid_128238-pm_077"
        }
      ],
      "content": "#超显白穿搭让我秒变冷白皮！#白T+粉色半身裙 减龄又少女的穿搭 而且裙子高腰显腿长呀嘻嘻！😝 粉裙子可显白了！上身秒变冷白皮～男生最喜欢的女性穿搭 get起来！脱单就靠这套了呀哈哈",
      "cFav": 16,
      "isFaved": false,
      "isVideo": false
    },
    {
      "originW": 1080,
      "originH": 1439,
      "cover": "https://s11.mogucdn.com/mlcdn/c45406/190516_4j0fk567ai718g0i8dhf7fad57035_1080x1439.jpg",
      "coverLink": "https://pc.mogu.com/content/detail/122o9zo?iid=122o9zo&acm=3.mce.1_19_1z5f7v8.128238.85381.ecQMWrqHX9GVT.sd_130_115-mid_128238-t_ecQMXrqHX9GVj-pos_0-pm_077-lc_201",
      "itemNumbers": 3,
      "brandInfo": [
        {
          "brandName": "ook",
          "brandLogo": "https://s5.mogucdn.com/mlcdn/c45406/190321_7ab1b984gda1d8h892ee41ka56fg6_397x397.png",
          "link": "https://pc.mogu.com/content/brand/13t7vi?brandId=13t7vi&stickyId=&acm=3.mce.1_5_13t7vi.128238.85381.ecQMWrqHX9GVT.sd_130_115-t_ecQMXrqHX9GVj-pos_0-lb_1-lc_201-mid_128238-pm_077"
        },
        {
          "brandName": "Abbott VINTAGE",
          "brandLogo": "https://s11.mogucdn.com/mlcdn/0ffcd9/180917_6l81f649ld3k1bk15dh27720jl2fe_197x197.png_200x200.jpg",
          "link": "https://pc.mogu.com/content/brand/1aahme?brandId=1aahme&stickyId=&acm=3.mce.1_5_1aahme.128238.85381.ecQMWrqHX9GVT.sd_130_115-t_ecQMXrqHX9GVj-pos_1-lb_1-lc_201-mid_128238-pm_077"
        }
      ],
      "content": "南法的夏天，是亚麻的慵懒，是午后的茶歇，以及一份暖洋洋的浪漫心事～💛穿搭Tips一条茶歇裙是必备的，亚麻材质更有南法风情的自然慵懒感，泡泡袖和宽松系带遮手臂遮肚，很适合微胖女生。搭配编织感牛皮包和法式草帽，自然随性的感觉就出来了，另外复古耳饰和硬币项链也是法式风标配哦～💛拍照技巧选择暖色背景，配上放松自然的微笑！",
      "cFav": 1,
      "isFaved": false,
      "isVideo": false
    },
    {
      "originW": 1080,
      "originH": 1455,
      "cover": "https://s11.mogucdn.com/mlcdn/c45406/190517_83e7djh6f7680lgce8ca81k67l7db_1080x1455.jpg",
      "coverLink": "https://pc.mogu.com/content/detail/122on5o?iid=122on5o&acm=3.mce.1_19_1z5fl18.128238.85381.ecQMWrqHX9GVT.sd_130_115-mid_128238-t_ecQMXrqHX9GVj-pos_0-pm_077-lc_201",
      "itemNumbers": 2,
      "brandInfo": [
        {
          "brandName": "珍妮宇航局",
          "brandLogo": "https://s11.mogucdn.com/mlcdn/0ffcd9/181128_1i2kabe8jgbak25k04hf65122l4bc_2835x2835.jpg_200x200.jpg",
          "link": "https://pc.mogu.com/content/brand/1aahfc?brandId=1aahfc&stickyId=&acm=3.mce.1_5_1aahfc.128238.85381.ecQMWrqHX9GVT.sd_130_115-t_ecQMXrqHX9GVj-pos_0-lb_1-lc_201-mid_128238-pm_077"
        },
        {
          "brandName": "NIKE",
          "brandLogo": "https://s11.mogucdn.com/mlcdn/0ffcd9/180723_251aje33k834bd72g1232l401g4jk_634x566.png_200x200.jpg",
          "link": "https://pc.mogu.com/content/brand/1aaf5a?brandId=1aaf5a&stickyId=&acm=3.mce.1_5_1aaf5a.128238.85381.ecQMWrqHX9GVT.sd_130_115-t_ecQMXrqHX9GVj-pos_1-lb_1-lc_201-mid_128238-pm_077"
        }
      ],
      "content": "白色手机印花t恤，手机印花超级好看，有种日系复古的感觉，简约又不失时尚感，搭配黑色的阔腿束脚裤，修饰腿型显腿长，增加视觉效果，搭配百搭的白色低帮空军一号，超级好看哟~#短袖千千万，这件最好穿！#",
      "cFav": 144,
      "isFaved": false,
      "isVideo": false
    },
    {
      "originW": 1080,
      "originH": 1080,
      "cover": "https://s11.mogucdn.com/mlcdn/c45406/190516_8d5j6a56b91b87gcg3f55h64g05l1_1080x1080.jpg",
      "coverLink": "https://pc.mogu.com/content/detail/122o8ww?iid=122o8ww&acm=3.mce.1_19_1z5f6sg.128238.85381.ecQMWrqHX9GVT.sd_130_115-mid_128238-t_ecQMXrqHX9GVj-pos_0-pm_077-lc_201",
      "itemNumbers": 2,
      "brandInfo": [
        {
          "brandName": "CONVERSE",
          "brandLogo": "https://s11.mogucdn.com/mlcdn/0ffcd9/180920_2ifaljedeaadiig521f2jeie128a4_136x136.png_200x200.jpg",
          "link": "https://pc.mogu.com/content/brand/1aafb8?brandId=1aafb8&stickyId=&acm=3.mce.1_5_1aafb8.128238.85381.ecQMWrqHX9GVT.sd_130_115-t_ecQMXrqHX9GVj-pos_0-lb_1-lc_201-mid_128238-pm_077"
        },
        {
          "brandName": "initial",
          "brandLogo": "https://s3.mogucdn.com/mlcdn/0ffcd9/181025_53lk52a08e0h4a3kh702fd1f66e87_300x300.png_200x200.jpg",
          "link": "https://pc.mogu.com/content/brand/1aai44?brandId=1aai44&stickyId=&acm=3.mce.1_5_1aai44.128238.85381.ecQMWrqHX9GVT.sd_130_115-t_ecQMXrqHX9GVj-pos_1-lb_1-lc_201-mid_128238-pm_077"
        }
      ],
      "content": "#皮卡丘同款黄上身，萌神归你！#上衣：in Drawer全棉白T必须是四季必备的啦，然后中间这个鳄鱼图案真的有get到可爱的点。裤子：in Drawer这款工装裤本身是过脚踝的，建议姑娘们穿的时候一定要卷裤脚露脚踝，这是对付阔腿裤的秘诀哦！鞋子：CONVERSE和裤子一样选了一个浅色系中帮帆布鞋，颜色百搭炒鸡实穿。",
      "cFav": 27,
      "isFaved": false,
      "isVideo": false
    },
    {
      "originW": 1080,
      "originH": 1080,
      "cover": "https://s11.mogucdn.com/mlcdn/c45406/190516_4837f7971jlbg41525a989g68l7c2_1080x1080.jpg",
      "coverLink": "https://pc.mogu.com/content/detail/122nw6c?iid=122nw6c&acm=3.mce.1_19_1z5eu1w.128238.85381.ecQMWrqHX9GVT.sd_130_115-mid_128238-t_ecQMXrqHX9GVj-pos_0-pm_077-lc_201",
      "itemNumbers": 3,
      "brandInfo": [
        {
          "brandName": "SISISM",
          "brandLogo": "https://s11.mogucdn.com/mlcdn/0ffcd9/181109_7di01h1e1g1537e7017072gig1ega_482x482.png_200x200.jpg",
          "link": "https://pc.mogu.com/content/brand/1aaism?brandId=1aaism&stickyId=&acm=3.mce.1_5_1aaism.128238.85381.ecQMWrqHX9GVT.sd_130_115-t_ecQMXrqHX9GVj-pos_0-lb_1-lc_201-mid_128238-pm_077"
        },
        {
          "brandName": "MASHY CHIC",
          "brandLogo": "https://s11.mogucdn.com/mlcdn/0ffcd9/180830_7bl4fe8295k96el487fi5b4h2l17i_310x310.png_200x200.jpg",
          "link": "https://pc.mogu.com/content/brand/1aah36?brandId=1aah36&stickyId=&acm=3.mce.1_5_1aah36.128238.85381.ecQMWrqHX9GVT.sd_130_115-t_ecQMXrqHX9GVj-pos_1-lb_1-lc_201-mid_128238-pm_077"
        },
        {
          "brandName": "邪恶先生",
          "brandLogo": "https://s11.mogucdn.com/mlcdn/0ffcd9/181109_8fchl7lk27a95ge7i32eda90i6104_484x484.png_200x200.jpg",
          "link": "https://pc.mogu.com/content/brand/1aairs?brandId=1aairs&stickyId=&acm=3.mce.1_5_1aairs.128238.85381.ecQMWrqHX9GVT.sd_130_115-t_ecQMXrqHX9GVj-pos_2-lb_1-lc_201-mid_128238-pm_077"
        }
      ],
      "content": "永远都不会过时的赫本风 女孩子提升气质必备一条小黑裙哦💕#15s出街大挑战#",
      "cFav": 17,
      "isFaved": false,
      "isVideo": false
    },
    {
      "originW": 1080,
      "originH": 1440,
      "cover": "https://s11.mogucdn.com/mlcdn/c45406/190516_1ckfik21g57eh5979gl64a3l1dh52_1080x1440.jpg",
      "coverLink": "https://pc.mogu.com/content/detail/122nvp0?iid=122nvp0&acm=3.mce.1_19_1z5etkk.128238.85381.ecQMWrqHX9GVT.sd_130_115-mid_128238-t_ecQMXrqHX9GVj-pos_0-pm_077-lc_201",
      "itemNumbers": 6,
      "brandInfo": [
        {
          "brandName": "URBAN REVIVO",
          "brandLogo": "https://s11.mogucdn.com/mlcdn/0ffcd9/180920_8gfh25b4li3g6629h47hf72i20660_205x206.png_200x200.jpg",
          "link": "https://pc.mogu.com/content/brand/1aaf72?brandId=1aaf72&stickyId=&acm=3.mce.1_5_1aaf72.128238.85381.ecQMWrqHX9GVT.sd_130_115-t_ecQMXrqHX9GVj-pos_0-lb_1-lc_201-mid_128238-pm_077"
        },
        {
          "brandName": "FOREVER21",
          "brandLogo": "https://s11.mogucdn.com/mlcdn/0ffcd9/180920_0le7dc2gk6b01ai5lfg4h1ika29cd_305x304.png_200x200.jpg",
          "link": "https://pc.mogu.com/content/brand/1aafai?brandId=1aafai&stickyId=&acm=3.mce.1_5_1aafai.128238.85381.ecQMWrqHX9GVT.sd_130_115-t_ecQMXrqHX9GVj-pos_1-lb_1-lc_201-mid_128238-pm_077"
        }
      ],
      "content": "#自带桃花运的520脱单look#有点小性感的穿搭～木耳边的吊带夏天必备单品啊，天气热的最佳选择～搭配显瘦的牛仔裤，适合各种场合～提着复古包包，和镶钻的单鞋！完美！",
      "cFav": 100,
      "isFaved": false,
      "isVideo": false
    },
    {
      "originW": 750,
      "originH": 1334,
      "cover": "https://s3.mogucdn.com/mlcdn/c45406/190516_8daekg0il46bik32egd4be3bl6759_750x1334.jpg",
      "coverLink": "https://pc.mogu.com/content/detail/122ohj8?iid=122ohj8&acm=3.mce.1_19_1z5ffes.128238.85381.ecQMWrqHX9GVT.sd_130_115-mid_128238-t_ecQMXrqHX9GVj-pos_0-pm_077-lc_201",
      "itemNumbers": 1,
      "brandInfo": [
        {
          "brandName": "ZARA",
          "brandLogo": "https://s5.mogucdn.com/mlcdn/0ffcd9/190128_85477g4i45d022862gklj527dj52i_283x283.png_200x200.jpg",
          "link": "https://pc.mogu.com/content/brand/1aaf88?brandId=1aaf88&stickyId=&acm=3.mce.1_5_1aaf88.128238.85381.ecQMWrqHX9GVT.sd_130_115-t_ecQMXrqHX9GVj-pos_0-lb_1-lc_201-mid_128238-pm_077"
        }
      ],
      "content": "小姐姐说：只要瘦怎么穿都美～#藏肉显高，0出错套装值得拥有！#夏天来了，大家怎么减肥呀？",
      "cFav": 308,
      "isFaved": false,
      "isVideo": true
    },
    {
      "originW": 1080,
      "originH": 1620,
      "cover": "https://s11.mogucdn.com/mlcdn/c45406/190516_08lka93f363ief87ag2kk2c22ic9e_1080x1620.jpg",
      "coverLink": "https://pc.mogu.com/content/detail/122oigc?iid=122oigc&acm=3.mce.1_19_1z5fgbw.128238.85381.ecQMWrqHX9GVT.sd_130_115-mid_128238-t_ecQMXrqHX9GVj-pos_0-pm_077-lc_201",
      "itemNumbers": 1,
      "brandInfo": [
        {
          "brandName": "DEVIL BEAUTY",
          "brandLogo": "https://s3.mogucdn.com/mlcdn/0ffcd9/180914_3a9ee2bdli26le0ejdf49eg1kabeg_214x213.png_200x200.jpg_200x200.jpg_200x200.jpg",
          "link": "https://pc.mogu.com/content/brand/1aahc4?brandId=1aahc4&stickyId=&acm=3.mce.1_5_1aahc4.128238.85381.ecQMWrqHX9GVT.sd_130_115-t_ecQMXrqHX9GVj-pos_0-lb_1-lc_201-mid_128238-pm_077"
        }
      ],
      "content": "#藏肉显高，0出错套装值得拥有！#清爽明亮配色的格子西套装，半严肃半随意，0出错又符合多种场合",
      "cFav": 0,
      "isFaved": false,
      "isVideo": false
    },
    {
      "originW": 678,
      "originH": 950,
      "cover": "https://s5.mogucdn.com/mlcdn/c45406/190516_1eaekgg864e3a9gk0aedabi0lc6d1_678x950.jpg",
      "coverLink": "https://pc.mogu.com/content/detail/122oeji?iid=122oeji&acm=3.mce.1_19_1z5fcf2.128238.85381.ecQMWrqHX9GVT.sd_130_115-mid_128238-t_ecQMXrqHX9GVj-pos_0-pm_077-lc_201",
      "itemNumbers": 3,
      "brandInfo": [ ],
      "content": "#我的毕业旅行穿搭必须提前加购！#满满的旅行元素 清爽的颜色 必须提前加够！一款适用于日常多场合 多种穿着方式的裤子因为剪裁比较简洁随身 神奇地很好得修饰腿形但是又不是紧绷在身上 活动空间依旧充分九分长度 直筒裤型 恰好露出纤细的脚踝部分每个角度都显瘦 后面看也不会扁塌塌晴空蓝很温柔 自然又舒服的亲和氛围也可以和连衣裙做叠穿搭配通勤或是日常出街都非常适合好版型的裤子可遇不可求 值得入手",
      "cFav": 0,
      "isFaved": false,
      "isVideo": false
    },
    {
      "originW": 1080,
      "originH": 1620,
      "cover": "https://s11.mogucdn.com/mlcdn/c45406/190516_50jj9k1lc38glk08ff2e0jk97ejkh_1080x1620.jpg",
      "coverLink": "https://pc.mogu.com/content/detail/122ok2a?iid=122ok2a&acm=3.mce.1_19_1z5fhxu.128238.85381.ecQMWrqHX9GVT.sd_130_115-mid_128238-t_ecQMXrqHX9GVj-pos_0-pm_077-lc_201",
      "itemNumbers": 1,
      "brandInfo": [
        {
          "brandName": "相对纶",
          "brandLogo": "https://s11.mogucdn.com/mlcdn/0ffcd9/181130_4jl7k79f4igc4kh186gd09i8hf934_255x255.png_200x200.jpg",
          "link": "https://pc.mogu.com/content/brand/1aajj2?brandId=1aajj2&stickyId=&acm=3.mce.1_5_1aajj2.128238.85381.ecQMWrqHX9GVT.sd_130_115-t_ecQMXrqHX9GVj-pos_0-lb_1-lc_201-mid_128238-pm_077"
        }
      ],
      "content": "#小粗腿干货！夏日漂酿请看我#小棍每日穿搭 166/49这件衬衫裙特别有设计感，可以完美的遮盖胯宽，大屁股等缺点，修饰腿型，搭配小白包清新甜美",
      "cFav": 307,
      "isFaved": false,
      "isVideo": false
    },
    {
      "originW": 1080,
      "originH": 1620,
      "cover": "https://s11.mogucdn.com/mlcdn/c45406/190516_7dfeibb24hfhdl52jjl26f7ae2i0b_1080x1620.jpg",
      "coverLink": "https://pc.mogu.com/content/detail/122ohda?iid=122ohda&acm=3.mce.1_19_1z5ff8u.128238.85381.ecQMWrqHX9GVT.sd_130_115-mid_128238-t_ecQMXrqHX9GVj-pos_0-pm_077-lc_201",
      "itemNumbers": 3,
      "brandInfo": [
        {
          "brandName": "UNIQLO",
          "brandLogo": "https://s11.mogucdn.com/mlcdn/0ffcd9/180920_2fg382ebj1l93jdli5h8081k2ijbg_266x266.png_200x200.jpg",
          "link": "https://pc.mogu.com/content/brand/1aaf82?brandId=1aaf82&stickyId=&acm=3.mce.1_5_1aaf82.128238.85381.ecQMWrqHX9GVT.sd_130_115-t_ecQMXrqHX9GVj-pos_0-lb_1-lc_201-mid_128238-pm_077"
        },
        {
          "brandName": "CHAMOKA",
          "brandLogo": "https://s11.mogucdn.com/mlcdn/0ffcd9/190110_87ccdbf8j4kha30lakh47chh2l330_397x397.png",
          "link": "https://pc.mogu.com/content/brand/1aakuo?brandId=1aakuo&stickyId=&acm=3.mce.1_5_1aakuo.128238.85381.ecQMWrqHX9GVT.sd_130_115-t_ecQMXrqHX9GVj-pos_1-lb_1-lc_201-mid_128238-pm_077"
        }
      ],
      "content": "#超显白穿搭让我秒变冷白皮！#今天的画里画外，都是欢脱雀跃的漫画女孩～好爱这件t呀！淡淡的紫色很特别！搭配红色的桶包和粉色长裤， 温柔指数直线up ～",
      "cFav": 27,
      "isFaved": false,
      "isVideo": false
    },
    {
      "originW": 960,
      "originH": 1728,
      "cover": "https://s11.mogucdn.com/mlcdn/c45406/190516_0853jk2i78ebbcc7e7a86b5302896_960x1728.jpg",
      "coverLink": "https://pc.mogu.com/content/detail/122oj88?iid=122oj88&acm=3.mce.1_19_1z5fh3s.128238.85381.ecQMWrqHX9GVT.sd_130_115-mid_128238-t_ecQMXrqHX9GVj-pos_0-pm_077-lc_201",
      "itemNumbers": 32,
      "brandInfo": [ ],
      "content": "绝不撞衫的设计品牌Nicole red，你爱了吗？#网红绝美小裙几，谁顶得住啊#你们喜欢这种清爽性冷淡风格嘛？@杨文闻W",
      "cFav": 5,
      "isFaved": false,
      "isVideo": false
    },
    {
      "originW": 960,
      "originH": 1280,
      "cover": "https://s5.mogucdn.com/mlcdn/c45406/190516_48c798kfedbk5e9j9ia9h50gge4l6_960x1280.jpg",
      "coverLink": "https://pc.mogu.com/content/detail/122ohsg?iid=122ohsg&acm=3.mce.1_19_1z5ffo0.128238.85381.ecQMWrqHX9GVT.sd_130_115-mid_128238-t_ecQMXrqHX9GVj-pos_0-pm_077-lc_201",
      "itemNumbers": 56,
      "brandInfo": [
        {
          "brandName": "Rfactory",
          "brandLogo": "https://s11.mogucdn.com/mlcdn/0ffcd9/190103_1166lc91e0lki66b0807bbkleck2k_397x397.png_200x200.jpg",
          "link": "https://pc.mogu.com/content/brand/1aakm6?brandId=1aakm6&stickyId=&acm=3.mce.1_5_1aakm6.128238.85381.ecQMWrqHX9GVT.sd_130_115-t_ecQMXrqHX9GVj-pos_0-lb_1-lc_201-mid_128238-pm_077"
        },
        {
          "brandName": "TARA JARMON",
          "brandLogo": "https://s11.mogucdn.com/mlcdn/0ffcd9/181114_48k9hf03e6ee347c4c1gg37ge7j41_484x484.png_200x200.jpg",
          "link": "https://pc.mogu.com/content/brand/19a2eg?brandId=19a2eg&stickyId=&acm=3.mce.1_5_19a2eg.128238.85381.ecQMWrqHX9GVT.sd_130_115-t_ecQMXrqHX9GVj-pos_1-lb_1-lc_201-mid_128238-pm_077"
        }
      ],
      "content": "#夏日超美设计师鞋包品牌5.16上新#碎花衬衫领套装很有法式的感觉，慵懒里带了一点女人味，系带收腰恰到好处哦",
      "cFav": 151,
      "isFaved": false,
      "isVideo": false
    },
    {
      "originW": 1080,
      "originH": 1440,
      "cover": "https://s11.mogucdn.com/mlcdn/c45406/190517_1id394i2kaj3jaia8k71hh2dfajek_1080x1440.jpg",
      "coverLink": "https://pc.mogu.com/content/detail/122on80?iid=122on80&acm=3.mce.1_19_1z5fl3k.128238.85381.ecQMWrqHX9GVT.sd_130_115-mid_128238-t_ecQMXrqHX9GVj-pos_0-pm_077-lc_201",
      "itemNumbers": 7,
      "brandInfo": [ ],
      "content": "分享一套甜甜的裙子～我个人比较喜欢纯色系的裙子，这一身就很喜欢！裙子垂感很好，娃娃领上也有很精致的刺绣，再搭配一双百搭的棕色鞋子，非常可爱了～～",
      "cFav": 18,
      "isFaved": false,
      "isVideo": false
    },
    {
      "originW": 1080,
      "originH": 1080,
      "cover": "https://s5.mogucdn.com/mlcdn/c45406/190516_226c1gjlcc35ihijah2c146lgi4a0_1080x1080.jpg",
      "coverLink": "https://pc.mogu.com/content/detail/122omwk?iid=122omwk&acm=3.mce.1_19_1z5fks4.128238.85381.ecQMWrqHX9GVT.sd_130_115-mid_128238-t_ecQMXrqHX9GVj-pos_0-pm_077-lc_201",
      "itemNumbers": 4,
      "brandInfo": [
        {
          "brandName": "ASM ANNA",
          "brandLogo": "https://s11.mogucdn.com/mlcdn/0ffcd9/180827_19d75c7ca4ajjl5c3e14ge2c71eca_255x255.png_200x200.jpg",
          "link": "https://pc.mogu.com/content/brand/1aafpo?brandId=1aafpo&stickyId=&acm=3.mce.1_5_1aafpo.128238.85381.ecQMWrqHX9GVT.sd_130_115-t_ecQMXrqHX9GVj-pos_0-lb_1-lc_201-mid_128238-pm_077"
        },
        {
          "brandName": "百家好",
          "brandLogo": "https://s11.mogucdn.com/mlcdn/0ffcd9/180724_5i47k92khf0ckaif6843ddah17c36_116x114.png",
          "link": "https://pc.mogu.com/content/brand/1aaf7a?brandId=1aaf7a&stickyId=&acm=3.mce.1_5_1aaf7a.128238.85381.ecQMWrqHX9GVT.sd_130_115-t_ecQMXrqHX9GVj-pos_1-lb_1-lc_201-mid_128238-pm_077"
        }
      ],
      "content": "#藏肉显高，0出错套装值得拥有！#嗨今天是个小女人哟🌽🌽米饭的穿搭来了嘻嘻 这一套衣服好喜欢啊💕好清爽啊哇蓝色+白色连衣裙搭配豆豆鞋 还是蛮淑女的吧嘻嘻遮肉肉显高高 瞬间让你变得美美哒",
      "cFav": 27,
      "isFaved": false,
      "isVideo": false
    },
    {
      "originW": 1080,
      "originH": 1620,
      "cover": "https://s11.mogucdn.com/mlcdn/c45406/190517_7c5381l32bj1k57d6172ea8h383ij_1080x1620.jpg",
      "coverLink": "https://pc.mogu.com/content/detail/122onge?iid=122onge&acm=3.mce.1_19_1z5flby.128238.85381.ecQMWrqHX9GVT.sd_130_115-mid_128238-t_ecQMXrqHX9GVj-pos_0-pm_077-lc_201",
      "itemNumbers": 23,
      "brandInfo": [
        {
          "brandName": "adidas",
          "brandLogo": "https://s5.mogucdn.com/mlcdn/0ffcd9/180831_3gg2jb42b2a4cf2j70jhb05de91ld_240x240.png_200x200.jpg",
          "link": "https://pc.mogu.com/content/brand/1aaf6y?brandId=1aaf6y&stickyId=&acm=3.mce.1_5_1aaf6y.128238.85381.ecQMWrqHX9GVT.sd_130_115-t_ecQMXrqHX9GVj-pos_0-lb_1-lc_201-mid_128238-pm_077"
        }
      ],
      "content": "#短袖千千万，这件最好穿！#紫色阿迪达斯运动T搭配宽松阔腿运动裤夏日运动简约穿搭了解一下啊，好看又方便这个颜色很显白哦，爱偷懒的小姐妹可以这样穿.",
      "cFav": 209,
      "isFaved": false,
      "isVideo": false
    }
  ]
}
`;
	return JSON.parse(str);
}

function initCategoryJsonData() {
	let str = `{
  "cateList": [
    {
      "link": "https://list.mogu.com/book/clothing/50240?acm=3.mce.1_10_1llmw.128038.0.5Qe7Xrqx6dc8l.pos_0-m_503880-sd_119",
      "cateIcon": "https://s10.mogucdn.com/mlcdn/c45406/190509_1gbe37kgc9f21h53c5e4aed8905e1_224x224.png",
      "cateName": "上衣"
    },
    {
      "link": "https://list.mogu.com/book/skirt/50004?acm=3.mce.1_10_1llmy.128038.0.5Qe7Xrqx6dc8m.pos_1-m_503881-sd_119",
      "cateIcon": "https://s10.mogucdn.com/mlcdn/c45406/190509_330e6di9i5j0ljc5dcbk4b50ld14b_224x224.png",
      "cateName": "裙装"
    },
    {
      "link": "https://list.mogu.com/book/trousers/50020?acm=3.mce.1_10_1lln0.128038.0.5Qe7Xrqx6dc8n.pos_2-m_503882-sd_119",
      "cateIcon": "https://s10.mogucdn.com/mlcdn/c45406/190509_722gj5bfh264i38bgja715b239hfa_224x224.png",
      "cateName": "裤子"
    },
    {
      "link": "https://list.mogu.com/book/neiyi/50025?acm=3.mce.1_10_1lln2.128038.0.5Qe7Xrqx6dc8o.pos_3-m_503883-sd_119",
      "cateIcon": "https://s10.mogucdn.com/mlcdn/c45406/190509_5622i7e9k68l361128j5iba049j53_224x224.png",
      "cateName": "内衣"
    },
    {
      "link": "https://list.mogu.com/book/shoes/50330?acm=3.mce.1_10_1lln4.128038.0.5Qe7Xrqx6dc8p.pos_4-m_503884-sd_119",
      "cateIcon": "https://s10.mogucdn.com/mlcdn/c45406/190509_6l3eg395ig7f347b2c41jdidha119_224x224.png",
      "cateName": "女鞋"
    },
    {
      "link": "https://list.mogu.com/book/bags/50675?acm=3.mce.1_10_1lln6.128038.0.5Qe7Xrqx6dc8q.pos_5-m_503885-sd_119",
      "cateIcon": "https://s10.mogucdn.com/mlcdn/c45406/190509_7j1f72bifcl41b9ad7b3f8c8be1a7_224x224.png",
      "cateName": "包包"
    },
    {
      "link": "https://list.mogu.com/book/accessories/50797?acm=3.mce.1_10_1lln8.128038.0.5Qe7Xrqx6dc8r.pos_6-m_503886-sd_119",
      "cateIcon": "https://s10.mogucdn.com/mlcdn/c45406/190509_108463afa721cei1dgjdd57eleahb_224x224.png",
      "cateName": "配饰"
    },
    {
      "link": "https://list.mogu.com/book/boyfriend/51716?acm=3.mce.1_10_1llna.128038.0.5Qe7Xrqx6dc8s.pos_7-m_503887-sd_119",
      "cateIcon": "https://s10.mogucdn.com/mlcdn/c45406/190509_524f84905d4c13i4g331ca5hbde70_224x224.png",
      "cateName": "男友"
    },
    {
      "link": "https://list.mogu.com/book/magic/51894?acm=3.mce.1_10_1llnc.128038.0.5Qe7Xrqx6dc8t.pos_8-m_503888-sd_119",
      "cateIcon": "https://s10.mogucdn.com/mlcdn/c45406/190509_4eb2af5ge01g7bfe18ha7a0e7hk0k_224x224.png",
      "cateName": "美妆"
    },
    {
      "link": "https://list.mogu.com/book/baby/20000602?acm=3.mce.1_10_1llne.128038.0.5Qe7Xrqx6dc8u.pos_9-m_503889-sd_119",
      "cateIcon": "https://s10.mogucdn.com/mlcdn/c45406/190509_6648igef9ac7gekeaj2afjbbij8k0_224x224.png",
      "cateName": "母婴"
    },
    {
      "link": "https://list.mogu.com/book/home/51642?acm=3.mce.1_10_1llng.128038.0.5Qe7Xrqx6dc8v.pos_10-m_503890-sd_119",
      "cateIcon": "https://s10.mogucdn.com/mlcdn/c45406/190509_39g6c9e2a3ecceadab7l3i3b4efa2_224x224.png",
      "cateName": "家居"
    },
    {
      "link": "https://list.mogu.com/book/food/52014?acm=3.mce.1_10_1llni.128038.0.5Qe7Xrqx6dc8w.pos_11-m_503891-sd_119",
      "cateIcon": "https://s10.mogucdn.com/mlcdn/c45406/190509_08je0kcg12b46c2f46ahl9h79c713_224x224.png",
      "cateName": "食品"
    }
  ],
  "wordList": [
    {
      "link": "https://list.mogu.com/book/clothing/50243?acm=3.mce.1_10_1llkc.132494.0.5Qe7Xrqx6dc7b.pos_0-m_503834-sd_119",
      "word": "时尚套装"
    },
    {
      "link": "https://list.mogu.com/book/skirt/50045?acm=3.mce.1_10_1llke.132494.0.5Qe7Xrqx6dc7c.pos_1-m_503835-sd_119",
      "word": "连衣裙"
    },
    {
      "link": "https://list.mogu.com/book/clothing/10055729?acm=3.mce.1_10_1llkg.132494.0.5Qe7Xrqx6dc7d.pos_2-m_503836-sd_119",
      "word": "荷叶边雪纺衫"
    },
    {
      "link": "https://list.mogu.com/book/skirt/52140?acm=3.mce.1_10_1llki.132494.0.5Qe7Xrqx6dc7e.pos_3-m_503837-sd_119",
      "word": "波点裙装"
    },
    {
      "link": "https://list.mogu.com/book/skirt/50047?acm=3.mce.1_10_1llkk.132494.0.5Qe7Xrqx6dc7f.pos_4-m_503838-sd_119",
      "word": "半身裙"
    },
    {
      "link": "https://list.mogu.com/book/trousers/50206?acm=3.mce.1_10_1llkm.132494.0.5Qe7Xrqx6dc7g.pos_5-m_503839-sd_119",
      "word": "牛仔裤"
    },
    {
      "link": "https://list.mogu.com/book/shoes/51268?acm=3.mce.1_10_1llko.132494.0.5Qe7Xrqx6dc7h.pos_6-m_503840-sd_119",
      "word": "运动鞋"
    },
    {
      "link": "https://list.mogu.com/book/clothing/50244?acm=3.mce.1_10_1llkq.132494.0.5Qe7Xrqx6dc7i.pos_7-m_503841-sd_119",
      "word": "百搭T恤"
    },
    {
      "link": "https://list.mogu.com/book/clothing/20004110?acm=3.mce.1_10_1llks.132494.0.5Qe7Xrqx6dc7j.pos_8-m_503842-sd_119",
      "word": "小个子搭配"
    },
    {
      "link": "https://list.mogu.com/book/clothing/20004137?acm=3.mce.1_10_1llku.132494.0.5Qe7Xrqx6dc7k.pos_9-m_503843-sd_119",
      "word": "轻薄外套"
    }
  ]
}`;
	return JSON.parse(str);
}

function initFooterJsonData() {
	let str = `{
  "clos": [
    [
      {
        "isHeader": true,
        "link": "",
        "title": "新手帮助"
      },
      {
        "isHeader": false,
        "link": "https://cs.mogu.com/help/faq.html?acm=3.mce.1_10_19kyo.32260.0.5Qe7XrrEB5vdt.pos_1-m_223508-sd_119",
        "title": "常见问题"
      },
      {
        "isHeader": false,
        "link": "https://cs.mogu.com/help/selfservice.html?acm=3.mce.1_10_19kyk.32260.0.5Qe7XrrEB5vdu.pos_2-m_223506-sd_119",
        "title": "自助服务"
      },
      {
        "isHeader": false,
        "link": "https://cs.mogu.com/help/contactus.html?acm=3.mce.1_10_19kym.32260.0.5Qe7XrrEB5vdv.pos_3-m_223507-sd_119",
        "title": "联系客服"
      },
      {
        "isHeader": false,
        "link": "https://cs.mogu.com/help/feedback.html?acm=3.mce.1_10_19kyi.32260.0.5Qe7XrrEB5vdw.pos_4-m_223505-sd_119",
        "title": "意见反馈"
      }
    ],
    [
      {
        "isHeader": true,
        "link": "",
        "title": "权益保障"
      },
      {
        "isHeader": false,
        "link": "",
        "title": "全国包邮"
      },
      {
        "isHeader": false,
        "link": "",
        "title": "7天无理由退货"
      },
      {
        "isHeader": false,
        "link": "",
        "title": "退货运费补贴"
      },
      {
        "isHeader": false,
        "link": "",
        "title": "限时发货"
      }
    ],
    [
      {
        "isHeader": true,
        "link": "",
        "title": "支付方式"
      },
      {
        "isHeader": false,
        "link": "",
        "title": "微信支付"
      },
      {
        "isHeader": false,
        "link": "",
        "title": "支付宝"
      },
      {
        "isHeader": false,
        "link": "",
        "title": "白付美支付"
      }
    ],
    [
      {
        "image": "",
        "isHeader": true,
        "link": "",
        "title": "移动客户端下载"
      },
      {
        "image": "https://s10.mogucdn.com/mlcdn/c45406/190221_3l1eje914h3h6ch88ce2l6eh0jl17_260x260.png",
        "isHeader": false,
        "link": "",
        "title": "蘑菇街"
      },
      {
        "image": "https://s10.mogucdn.com/mlcdn/c45406/190221_60dd5ic9e009acbjb005c8c2k8k89_260x260.png",
        "isHeader": false,
        "link": "",
        "title": "美丽说"
      },
      {
        "image": "https://s10.mogucdn.com/mlcdn/c45406/181029_1e2kfd9la7jg28063eleikgj3k033_158x144.png",
        "isHeader": false,
        "link": "",
        "title": "uni引力"
      }
    ]
  ],
  "list": [
    {
      "link": "http://www.mogu-inc.com/home/home.html?acm=3.mce.1_10_19kz6.32163.0.5Qe7XrrEB5ve0.pos_0-m_223517-sd_119",
      "title": "关于我们"
    },
    {
      "link": "https://job.mogu.com?acm=3.mce.1_10_19kz8.32163.0.5Qe7XrrEB5ve1.pos_1-m_223518-sd_119",
      "title": "招聘信息"
    },
    {
      "link": "https://www.mogu.com/about?acm=3.mce.1_10_19kza.32163.0.5Qe7XrrEB5ve2.pos_2-m_223519-sd_119",
      "title": "联系我们"
    },
    {
      "link": "https://cycle.mogu.com/pc/zhaoshang?acm=3.mce.1_10_19kzg.32163.0.5Qe7XrrEB5ve3.pos_3-m_223522-sd_119",
      "title": "商家入驻"
    },
    {
      "link": "http://xd.mogu.com/work/home?acm=3.mce.1_10_19kzi.32163.0.5Qe7XrrEB5ve4.pos_4-m_223523-sd_119",
      "title": "商家后台"
    },
    {
      "link": "http://bbs.mogu.com?acm=3.mce.1_10_19kzm.32163.0.5Qe7XrrEB5ve5.pos_5-m_223525-sd_119",
      "title": "商家社区"
    },
    {
      "link": "https://cs.mogu.com/rule/index.html?acm=3.mce.1_10_1epzq.32163.0.5Qe7XrrEB5ve6.pos_6-m_343407-sd_119",
      "title": "规则中心"
    },
    {
      "link": "https://cs.mogu.com/rule/judgement.html?categoryId=1ng&acm=3.mce.1_10_1krsm.32163.0.5Qe7XrrEB5ve7.pos_7-m_484543-sd_119",
      "title": "规则众议院"
    },
    {
      "link": "https://securityreport.mogu.com/index?acm=3.mce.1_10_1fnr8.32163.0.5Qe7XrrEB5ve8.pos_8-m_365286-sd_119",
      "title": "有害信息举报"
    },
    {
      "link": "https://cs.mogu.com/rule/mogu.html?categoryId=1iq&ruleId=1536&acm=3.mce.1_10_1jtfw.32163.0.5Qe7XrrEB5ve9.pos_9-m_462282-sd_119",
      "title": "用户隐私保护"
    }
  ],
  "line": {
    "link": "",
    "title": "©2020 Mogu.com 杭州卷瓜网络有限公司"
  },
  "copyright1": [
    [
      {
        "link": "https://s10.mogucdn.com/mlcdn/c45406/181119_0a3j5l86651d5ciklai091dd78d41_1239x1753.jpg?acm=3.mce.1_10_19kyq.32170.0.5Qe7XrrEB5vdG.pos_0-m_223509-sd_119",
        "title": "营业执照：913301065526808764"
      },
      {
        "link": "https://s11.mogucdn.com/mlcdn/c45406/190318_221djea3k0eac043j80450ekk07f0.pdf?acm=3.mce.1_10_19kyu.32170.0.5Qe7XrrEB5vdH.pos_1-m_223511-sd_119",
        "title": "网络文化经营许可证：浙网文（2016）0349-219号"
      },
      {
        "link": "https://s10.mogucdn.com/mlcdn/c45406/171109_1ll0b37l83lj8e3i35h28a92g31i3_1239x1754.jpg?acm=3.mce.1_10_19kys.32170.0.5Qe7XrrEB5vdI.pos_2-m_223510-sd_119",
        "title": "增值电信业务经营许可证：浙B2-20110349"
      },
      {
        "link": "https://s16.mogucdn.com/p2/160831/upload_506h1d771b5k20j9148ldjj0kdaab_960x1344.jpg?acm=3.mce.1_10_19l02.32170.0.5Qe7XrrEB5vdJ.pos_3-m_223533-sd_119",
        "title": "安全责任书"
      }
    ],
    [
      {
        "link": "",
        "icon": "https://s3.mogucdn.com/mlcdn/c45406/190515_0gei4681dhlh0cf9ch0g33j97d88l_20x20.png",
        "title": "浙公网安备 33010602010221号"
      },
      {
        "link": "https://s3.mogucdn.com/mlcdn/c45406/180517_18k2jb35bgj4k7hc7jlkdaakb6haf.pdf?acm=3.mce.1_10_1i4u6.32170.0.5Qe7XrrEB5vdL.pos_5-m_423011-sd_119",
        "title": "互联网药品信息服务资格证书编号：（浙)-经营性-2018-0002"
      },
      {
        "link": "http://fw.zjfda.gov.cn/fda/info!detail.do?search['infoType']=30&search['xxgkGzdtType']=&id=59252&acm=3.mce.1_10_1i94i.32170.0.5Qe7XrrEB5vdM.pos_6-m_425789-sd_119",
        "title": "浙网食A33010003"
      },
      {
        "link": "https://s3.mogucdn.com/mlcdn/c45406/180622_7ad26gl9e679l0ilk6ic2bcdl2l0h.pdf?acm=3.mce.1_10_1ihmo.32170.0.5Qe7XrrEB5vdN.pos_7-m_431300-sd_119",
        "title": "出版物网络交易平台服务经营备案证"
      },
      {
        "link": "https://s3.mogucdn.com/mlcdn/c45406/180713_224e9f4ggdi3ic10lkck0989b4e03.pdf?acm=3.mce.1_10_1ineu.32170.0.5Qe7XrrEB5vdO.pos_8-m_435047-sd_119",
        "title": "（浙）网械平台备字[2018]第00006号"
      }
    ]
  ]
}`;
	return JSON.parse(str);
}

function waterfall() {
	// get elements
	let items = document.querySelectorAll(".item");
	let mainIn = document.querySelector(".main-in");

	// calculate column numbers
	let mainInWidth = mainIn.offsetWidth;
	let itemWidth = items[0].offsetWidth;
	let columns = Math.floor(mainInWidth / itemWidth);

	// create an array for rowHeight
	let rowHeight = [];

	// get all items
	for(let i = 0; i < items.length; i++) {
		// determine whether within first row
		if(i < columns) {
			// if yes, clear all absolute position
			items[i].style.position = "";
			// store its height into array
			rowHeight.push(items[i].offsetHeight);
		}
		else {
			// if not, compose by waterfall rule
			// find the element with smallest height
			let minHeight = Math.min(...rowHeight);
			// find the index of element with smallest height
			let minIndex = rowHeight.findIndex(value => value === minHeight);
			// get the element with smallest height by index
			let minItem = items[minIndex];
			// get offsetLeft and height of the element
			let minLeft = minItem.offsetLeft;
			// set offsetLeft and height to the current image
			items[i].style.position = "absolute";
			items[i].style.left = minLeft + "px";
			items[i].style.top = minHeight + 20 + "px";
			// modify the height of current column
			rowHeight[minIndex] += items[i].offsetHeight + 20;
		}
	}

	mainIn.style.height = Math.max(...rowHeight) + "px";
}