(function ($) {
	$(document).ready(function () {
		var $locBtn = $('.locBtn');
		$locBtn.each(function () {
			let $this = $(this);
			let thisTxt = $this.closest('li').find('li.active').text();
			$this.find('.nowTab').text(thisTxt);
		});
		$locBtn.on('click', function () {
			let $navTarget = $(this).closest('li').find('div');
			if ($navTarget.is(':hidden')) {
				$(this).removeClass('active');
				$(this).closest('li').find('div').hide();
				$(this).addClass('active');
				$navTarget.slideDown();
			} else {
				$(this).removeClass('active');
				$navTarget.hide();
			}
		});
		$('.locationTab').on('mouseleave', function () {
			$(this).find($locBtn).removeClass('active');
			$(this).find('div').removeAttr('style');
		});
		$(window).resize(function () {
			if ($('.btnMoGnb').is(':hidden')) {
				$locBtn.closest('li').find('div').removeAttr('style');
			}
		});
		$('.btnShare').click(function () {
			$(this).closest('li').addClass('active');
			$('.shareList').css('display', 'flex');
		});
		$('.shareClose').on('click', function () {
			$('.btnShare').closest('li').removeClass('active');
			$('.shareList').fadeOut(200);
		});
		$('.btnPrint').click(function () {
			window.print();
		});

		// 상단 메뉴에서 포커스 벗어났을 시 처리
		$(document).on('focus', ':focusable', function (e) {
			if ($('.locationTab div').has(e.target).length === 0) {
				$('.locationTab').mouseleave();
			}
			if ($('.selectStyle').has(e.target).length === 0) {
				$('.selectStyle').mouseleave();
			}
		});

		// selectStyle Con
		var selectTarget = $('.selectbox select');
		selectTarget.each(function () {
			var select_name = $(this).children('option:selected').text();
			$(this).siblings('label').text(select_name);
		});
		selectTarget.change(function () {
			var select_name = $(this).children('option:selected').text();
			$(this).siblings('label').text(select_name);
		});
		// focus 가 되었을 때와 focus 를 잃었을 때
		selectTarget.on({
			'focus': function () {
				$(this).parent().addClass('focus');
			},
			'blur': function () {
				$(this).parent().removeClass('focus');
				$(this).parent().removeClass('active');
			}
		});

		// Table
		$('.scrollTable').before('<p class="tableDrag"><span>좌, 우로 드래그 하세요</span></p>').wrap('<div class="scrollTblWrap"></div>');


	});


})(jQuery);
