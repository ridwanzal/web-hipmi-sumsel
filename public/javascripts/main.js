window.lazySizesConfig = window.lazySizesConfig || {};
window.lazySizesConfig.init = false;
window.baseURL = $("body").data("baseurl");
window.fullURL = $("body").data("fullurl");

function setCookie(name, value, days) {
	const d = new Date();
	d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000);
	document.cookie = `${name}=${value};expires=${d.toUTCString()};path=/`;
}

function getCookie(name) {
	const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
	return match ? match[2] : null;
}

$(function () {
	const campaign1 = new bootstrap.Modal("#campaign1");
	const campaign2 = new bootstrap.Modal("#campaign2");

	if (!getCookie("hide_campaign1")) {
		campaign1.show();
	}

	$("#toCampaign2").one("click", function () {
		$("#campaign1").one("hidden.bs.modal", () => campaign2.show());
		campaign1.hide();
	});

	$(".js-close-perm-modal").on("click", function (e) {
		e.preventDefault();
		setCookie("hide_campaign1", "true", 365); // Sembunyikan selama 1 tahun
		campaign1.hide();
	});
});

var core = {
	init: function () {
		this.goTop();
		this.lazyloading();
		this.sticky();
		this.swiper();
		AOS.init();
		this.cookiesConsent();
	},
	lazyloading: function () {
		lazySizes.init();
	},
	cookiesConsent: function () {
		const banner = document.getElementById("cookie-consent-banner");
		const acceptBtn = document.getElementById("accept-cookies");
		const rejectBtn = document.getElementById("reject-cookies");

		// Check existing consent
		const userConsent = localStorage.getItem("cookieConsent");

		if (!userConsent) {
			banner.classList.remove("hidden");
		}

		acceptBtn.addEventListener("click", () => {
			localStorage.setItem("cookieConsent", "accepted");
			banner.classList.add("hidden");
			// You can trigger your analytics/init code here
			console.log("Cookies accepted");
		});

		rejectBtn.addEventListener("click", () => {
			localStorage.setItem("cookieConsent", "rejected");
			banner.classList.add("hidden");
			console.log("Cookies rejected");
		});
	},
	sticky: function () {
		if ($(".js-ads-lp").length > 0) {
			new Sticksy(".js-ads-lp", { topSpacing: 110 });
		}
	},
	goTop: function () {
		$(".js-gotop").on("click", function () {
			$("html, body").animate({
				scrollTop: $("html, body").offset().top,
			});
		});
	},
	swiper: function () {
		new Swiper(".mastheadSwiper", {
			spaceBetween: 0,
			loop: true,
			effect: "fade",
			fadeEffect: {
				crossFade: true,
			},
			speed: 1000, // smoother transition (in ms)
			autoplay: {
				disableOnInteraction: false,
				pauseOnMouseEnter: true,
			},
			lazy: {
				loadPrevNext: true,
				loadOnTransitionStart: true,
			},
			pagination: {
				el: ".swiper-pagination",
				clickable: true,
			},
			navigation: {
				nextEl: ".swiper-button-next",
				prevEl: ".swiper-button-prev",
			},
			grabCursor: true,
			breakpoints: {
				378: {
					slidesPerView: 1,
					spaceBetween: 0,
				},
				1024: {
					slidesPerView: 1,
					spaceBetween: 0,
				},
			},
		});

		new Swiper(".mySwiper", {
			loop: true,
			spaceBetween: 16,
			freeMode: true,
			speed: 2000, // smoother transition (in ms)
			autoplay: {
				disableOnInteraction: false,
				pauseOnMouseEnter: true,
				delay: 500,
			},
			pagination: {
				el: ".swiper-pagination",
				clickable: true,
			},
			breakpoints: {
				378: {
					slidesPerView: 1,
					spaceBetween: 16,
				},
				767: {
					slidesPerView: 1.1,
					spaceBetween: 16,
				},
				1200: {
					slidesPerView: 3,
					spaceBetween: 16,
				},
			},
		});

		new Swiper(".swiperTwocol", {
			loop: true,
			spaceBetween: 10,
			speed: 3400, // smoother transition (in ms)
			autoplay: {
				disableOnInteraction: false,
				pauseOnMouseEnter: true,
				delay: 1600,
			},
			freeMode: true,
			pagination: {
				el: ".swiper-pagination",
				clickable: true,
			},
			breakpoints: {
				378: {
					slidesPerView: 1,
					spaceBetween: 10,
				},
				767: {
					slidesPerView: 1.1,
					spaceBetween: 10,
				},
				1200: {
					slidesPerView: 1.1,
					spaceBetween: 10,
				},
			},
		});

		new Swiper(".mySwiperph", {
			loop: true,
			spaceBetween: 16,
			centeredSlides: true,
			slidesPerView: 3,
			freeMode: true,
			speed: 1000, // smoother transition (in ms)
			autoplay: {
				disableOnInteraction: false,
				pauseOnMouseEnter: true,
			},
			effect: "coverflow",
			coverflowEffect: {
				rotate: 50,
				stretch: 0,
				depth: 100,
				modifier: 1,
				slideShadows: true,
			},
			pagination: {
				el: ".swiper-pagination",
				clickable: true,
			},
			breakpoints: {
				1200: {
					slidesPerView: 3,
					spaceBetween: 16,
				},
			},
		});

		new Swiper(".mySwiper2", {
			spaceBetween: 16,
			autoplay: {
				delay: 2500,
			},
			freeMode: true,
			pagination: {
				el: ".swiper-pagination",
				clickable: true,
			},
			breakpoints: {
				378: {
					slidesPerView: 1.1,
					spaceBetween: 16,
				},
				1024: {
					slidesPerView: 4,
					spaceBetween: 16,
				},
			},
		});

		new Swiper(".mySwiper3", {
			spaceBetween: 16,
			loop: true,
			autoplay: {
				delay: 3000,
			},
			freeMode: true,
			pagination: {
				el: ".swiper-pagination",
				clickable: true,
			},
			breakpoints: {
				378: {
					slidesPerView: 1.1,
					spaceBetween: 16,
				},
				1024: {
					slidesPerView: 4,
					spaceBetween: 16,
				},
			},
		});

		new Swiper(".swiperTesti", {
			spaceBetween: 0,
			loop: true,
			autoplay: {
				delay: 3000,
			},
			loop: true,
			freeMode: true,
			pagination: {
				el: ".swiper-pagination",
				clickable: true,
			},
			breakpoints: {
				378: {
					slidesPerView: 1,
					spaceBetween: 16,
				},
				1024: {
					slidesPerView: 1,
					spaceBetween: 16,
				},
			},
		});

		new Swiper(".swiperProduct", {
			spaceBetween: 16,
			loop: false,
			freeMode: true,
			speed: 1500,
			centeredSlides: true,
			autoplay: {
				disableOnInteraction: false,
				pauseOnMouseEnter: true,
			},
			pagination: {
				el: ".swiper-pagination",
				clickable: true,
			},
			slidesPerView: 3,
			breakpoints: {
				378: {
					slidesPerView: 1.1,
					spaceBetween: 8,
				},
				1024: {
					slidesPerView: 3,
					spaceBetween: 16,
				},
			},
		});

		new Swiper(".swiperFooter", {
			spaceBetween: 16,
			loop: true,
			freeMode: true,
			speed: 2500,
			centeredSlides: true,
			autoplay: {
				disableOnInteraction: false,
				pauseOnMouseEnter: true,
			},
			pagination: {
				el: ".swiper-pagination",
				clickable: true,
			},
			slidesPerView: 3,
			breakpoints: {
				378: {
					slidesPerView: 1,
					spaceBetween: 8,
				},
				1024: {
					slidesPerView: 1,
					spaceBetween: 16,
				},
			},
		});
	},
};

$(function () {
	// Initialize
	core.init();
	$(window).on("scroll", function (e) {
		var scroll = $(this).scrollTop();
		if (scroll > $(".masthead__nav").outerHeight()) {
			// scrolling
			$("body").css("padding-top", $(".masthead__nav").outerHeight());
			$(".js-nav-container").addClass("sticky");
			$(".js-cta").removeClass("hide");
			$(".ttw").hide();
			$(".ttd").show();
			$(".js-nav").find(".nav-link").removeClass("text-white");
		} else {
			$("body").css("padding-top", 0);
			$(".js-nav-container").removeClass("sticky");
			$(".js-cta").addClass("hide");
			$(".llight").removeClass("d-none");
			$(".ttw").show();
			$(".ttd").hide();
			$(".js-nav").find(".nav-link").addClass("text-white");
		}
	});

	$(".js-match-height").matchHeight();

	$(document).ready(function () {
		let lastScrollTop = 0;

		$(window).scroll(function () {
			let currentScrollTop = $(this).scrollTop();

			lastScrollTop = currentScrollTop;

			if ($(this).scrollTop() > 50) {
				$(".navbar").addClass("navbar-scrolled");
				$(".navbar").addClass("whitebg");
			} else {
				$(".navbar").removeClass("navbar-scrolled");
				if (window.location.pathname == "/") {
					$(".navbar").removeClass("whitebg");
				}
			}
		});

		$(".navbar-toggler").on("click", function () {
			setTimeout(function () {
				$(".nav-link").each(function (index) {
					$(this).addClass("show");
				});
			}, 200);
		});

		$(".navbar-collapse").on("hidden.bs.collapse", function () {
			$(".nav-link").removeClass("show");
		});

		$(".js-megamenu").on("mouseenter", function () {
			$(".umroh-listing").stop(true, true).fadeIn(200);
		});

		$(".js-megamenu, .umroh-listing").on("mouseleave", function () {
			setTimeout(function () {
				if (
					!$(".js-megamenu:hover").length &&
					!$(".umroh-listing:hover").length
				) {
					$(".umroh-listing").stop(true, true).fadeOut(200);
				}
			}, 100);
		});
	});

	lightbox.option({
		resizeDuration: 200,
		wrapAround: true,
	});

	let $widget = $(".js-wa-widget");
	$(".js-whatsapp-float").on("click", function () {
		if ($widget.is(":visible")) {
			$widget.css({
				display: "none",
				"z-index": -1,
			});
		} else {
			$widget.css({
				display: "block",
				"z-index": 6,
			});
		}
	});

	$(".js-wa-back").on("click", function () {
		$widget.css({
			display: "none",
			"z-index": -1,
		});
	});

	$(".form-title-blog").on("input", function () {
		var title = $(this).val();
		var slug = title
			.toLowerCase()
			.trim()
			.replace(/[^a-z0-9\s-]/g, "")
			.replace(/\s+/g, "-")
			.replace(/-+/g, "-");

		$(".form-slug-blog").val(slug);
	});

	$(".js-campaign-contact").on("click", function (e) {
		const campaignName = $(this)
			.closest(".campaign-pict")
			.find("h6")
			.text()
			.trim();
		const campaignContext = $(this)
			.closest(".campaign-pict")
			.find("p")
			.text()
			.trim();

		$.ajax({
			url: window.baseURL + "/services/campaign/add",
			method: "POST",
			contentType: "application/json",
			data: JSON.stringify({
				context: campaignContext,
				name: campaignName,
			}),
			success: function (res) {
				console.log("Campaign interaction saved:", res);
			},
			error: function (xhr, status, error) {
				console.error("Error saving campaign:", error);
			},
		});
	});

	$('.js-article-title').on('input', function () {
		const title = $(this).val();
		const slug = title
			.toLowerCase()
			.trim()
			.replace(/[^\w\s-]/g, '')     // hapus karakter aneh
			.replace(/\s+/g, '-')         // ganti spasi dengan -
			.replace(/--+/g, '-')         // ganti double dash jadi satu
			.replace(/^-+|-+$/g, '');     // hapus dash di awal/akhir

		$('.form-slug-Artikel').val(slug);
	});


	new Swiper(".marquee-swiper", {
		slidesPerView: "auto",
		loop: true,
		loopAdditionalSlides: 10,
		speed: 5000,
		autoplay: {
			delay: 1,
			disableOnInteraction: false,
		},
		freeMode: true,
		freeModeMomentum: false,
		grabCursor: false,
	});

	function filterJobs() {
		var keyword = $(".js-karir-search").val().toLowerCase();
		var selectedEdu = $(".js-karir-jenjang").val().toLowerCase();
		var selectedLoc = $(".js-karir-domisili").val().toLowerCase();

		$(".karir-list .card-post").each(function () {
			var $card = $(this);
			var title = $card.data("title").toLowerCase();
			var edu = $card.data("edu").toLowerCase();
			var loc = $card.data("location").toLowerCase();

			var matchKeyword = keyword === "" || title.includes(keyword);
			var matchEdu =
				selectedEdu === "-- pilih jenjang" || edu.includes(selectedEdu);
			var matchLoc =
				selectedLoc === "-- pilih domisili" || loc.includes(selectedLoc);

			if (matchKeyword && matchEdu && matchLoc) {
				$card.closest(".col").show();
			} else {
				$card.closest(".col").hide();
			}
		});
	}

	$(".js-karir-search").on("input", filterJobs);
	$(".js-karir-jenjang, .js-karir-domisili").on("change", filterJobs);

	var swiper = new Swiper(".swiperTeam", {
		loop: true,
		spaceBetween: 10,
		slidesPerView: 6,
		freeMode: true,
		autoplay: {
			delay: 5200,
			disableOnInteraction: false,
		},
		watchSlidesProgress: true,
		breakpoints: {
			378: {
				slidesPerView: 3,
				spaceBetween: 16,
			},
			1024: {
				slidesPerView: 6,
				spaceBetween: 16,
			},
		},
	});

	var swiper2 = new Swiper(".swiperTeam2", {
		loop: true,
		spaceBetween: 10,
		autoplay: {
			delay: 5200,
			disableOnInteraction: false,
		},
		navigation: {
			nextEl: ".swiper-button-next",
			prevEl: ".swiper-button-prev",
		},
		thumbs: {
			swiper: swiper,
		},
	});

	function animateCounter(selector, target) {
		$({ Counter: 0 }).animate(
			{ Counter: target },
			{
				duration: 1500,
				easing: "swing",
				step: function (now) {
					$(selector).text(Math.floor(now));
				},
			}
		);
	}

	// Homepage counters
	animateCounter(".js-counter-1", 423);
	animateCounter(".js-counter-2", 8000);
	animateCounter(".js-counter-3", 20);
	animateCounter(".js-counter-4", 50);

	// About page counters
	animateCounter(".js-counterabout-1", 1500);
	animateCounter(".js-counterabout-2", 10);
	animateCounter(".js-counterabout-3", 20);
	animateCounter(".js-counterabout-4", 5);

	let lastScrollTop = 0;

	$(window).on("scroll", function () {
		let currentScroll = $(this).scrollTop();
		$('.navbar-toggler').addClass('collapsed');
		$('.navbar-collapse').removeClass('show');
		lastScrollTop = currentScroll;
	});


	$('#thumbnails').on('change', function () {
		const preview = $('#preview');
		preview.empty();

		$.each(this.files, function (index, file) {
			const reader = new FileReader();
			reader.onload = function (e) {
				const img = $('<img>', {
					src: e.target.result,
					class: 'rounded border me-2 mb-2',
					css: { height: '100px' }
				});
				preview.append(img);
			};
			reader.readAsDataURL(file);
		});
	});

	$('.js-datatable').DataTable();

	let phoneTimer;

	function showTempAlert(message, duration = 250) {
		// buat elemen alert sementara
		let alertBox = $('<div></div>')
			.text(message)
			.css({
				position: 'fixed',
				top: '20px',
				left: '50%',
				transform: 'translateX(-50%)',
				background: '#f44336',
				color: '#fff',
				padding: '10px 20px',
				borderRadius: '5px',
				zIndex: 9999
			})
			.appendTo('body');

		// hapus alert otomatis
		setTimeout(() => {
			alertBox.fadeOut(200, function () { $(this).remove(); });
		}, duration);
	}

	$('#telepon').on('input', function () {
		clearTimeout(phoneTimer);

		let phone = $(this).val().trim();

		if (phone.length < 8) {
			$('#phone-feedback').text('');
			return;
		}

		phoneTimer = setTimeout(function () {
			$.get('services/umrohgratis/checkphone', { phone }, function (response) {
				if (response.exists) {
					$('#phone-feedback')
						.text('⚠️ Nomor ini sudah terdaftar.')
						.css('color', 'red');

					setTimeout(function () {
						$('#telepon').val('');
						showTempAlert('Nomor ini sudah terdaftar, silakan gunakan nomor lain.', 250);
						$('#phone-feedback').text('');
					}, 750);

				} else {
					$('#phone-feedback')
						.text('✅ Nomor ini tersedia.')
						.css('color', 'green');
				}
			});
		}, 750); // debounce 250ms
	});

	$('#karirModal').on('show.bs.modal', function (event) {
		const button = $(event.relatedTarget); // tombol yang klik
		const modal = $(this);

		// ambil data-* dari tombol
		const nama = button.data('nama');
		const penempatan = button.data('penempatan');
		const status = button.data('status');
		const jenjang = button.data('jenjang');
		const kualifikasi = button.data('kualifikasi');

		// set ke modal
		modal.find('#modalNama').text(nama);
		modal.find('#modalPenempatan').text(penempatan);
		modal.find('#modalStatus').text(status);
		modal.find('#modalJenjang').text(jenjang);
		modal.find('#modalKualifikasi').text(kualifikasi || '-');
	});

	new TomSelect("#kotaList", {
		placeholder: "Pilih Kota/Kabupaten"
	});

	// End Initialize
});
