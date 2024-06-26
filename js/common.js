$(document).ready(function () {
	// skip nav
	$('.skipNav a').on('click', function () {
		var aAttr = $(this).attr('href');
		$(aAttr).attr('tabindex', '0');
	});
	$('#container').find('a, button').focus(function(){
		$('#container').removeAttr('tabindex');
	});
	$(document).find(':focusable').focus(function (e) {
		if ($('#container').has(e.target).length === 0) {
			$('#container').removeAttr('tabindex');
		}
	});
	
	// 상단메뉴
	var $header = $('.header');
	var $gnb = $('.gnbWrap');
	var $gnbList = $('.gnbList');
	var $gnbSub = $('.subMenu');
	var $moBtn = $('.btnMoGnb');
	var isOpen = false;
	if (!$moBtn.is(':hidden')) {
		$('.gnbList>li').find('>div').parent('li').addClass('opNav').children('a').attr('title', '하위메뉴 보기');
		$('.subMenu').find('div').parent('li').addClass('opNav').children('a').attr('title', '하위메뉴 보기');
	}
	$gnbList.find('>li').on('mouseenter', function (event) {
		event.stopPropagation();
		if ($moBtn.is(':hidden') && isOpen == false) {
			$('.header, .overlayBg').addClass('active');
			$gnbSub.stop().show();
			$gnbList.find('>li').removeClass('hover');
			$(this).addClass('hover');
		}
	});
	$header.on('mouseleave', function (event) {
		if ($moBtn.is(':hidden') && isOpen == false) {
			$('.header, .overlayBg').removeClass('active');
			$('.gnbList').find('>li').removeClass('hover');
			$gnbSub.stop().hide();
			//$('.opNav').removeClass('open').children('a').attr('title', '하위메뉴 보기');
			$('.gnbList').find('>div').hide();
		}
	});
	$gnbList.find('>li>a').on('focus', function () {
		$(this).closest('li').mouseenter();
	});
	$('.btnGnbAll').on('click', function () {
		if ($moBtn.is(':hidden')) {
			isOpen = true;
			$(this).css('visibility', 'hidden');
			$('.skipNav, #container, .footer').attr('inert', 'inert');
			$('.gnbClose').show();
			$('.header, .overlayBg').addClass('active');
			$gnbSub.stop().show();
		}
	});
	
	$moBtn.find('button').on('click', function () {
		$('body').css('overflow', 'hidden');
		$gnb.show("slide", {
			direction: "right"
		}, 600);
		$('.header, .overlayBg').addClass('active');
	});
	$gnb.find('.gnbClose button').click(function () {
		if ($moBtn.is(':hidden')) {
			isOpen = false;
			$('.gnbClose').hide();
			$('.btnGnbAll').removeAttr('style');
			$('.skipNav, #container, .footer').removeAttr('inert');
			$('.header, .overlayBg').removeClass('active');
			$gnbSub.removeAttr('style');
		}else {
			$gnb.hide();
			$('body').removeAttr('style');
			$('.header, .overlayBg').removeClass('active');
		}
	});
	$(document).on('click', '.opNav>a', function (event) {
		if ($moBtn.is(':visible')) {
			event.preventDefault();
			var target = $(this).closest('li').find('>div');
			if (target.is(':hidden')) {
				target.slideDown();
				$(this).attr('title', '하위메뉴 숨기기').closest('li').addClass('open');
			} else {
				target.hide();
				$(this).attr('title', '하위메뉴 보기').closest('li').removeClass('open');
				target.find('>div').hide();
				target.find('li.open').removeClass('open').find('a').attr('title', '하위메뉴 보기');
			}
			return false;
		}
	});
	
	// 통합검색
	$('.btnTotalSearch').on('click', function(){
		$('.totalSearch').slideDown();
	});
	$('.totalSearch').find('.btnClose>button').on('click', function(){
		$('.totalSearch').fadeOut();
	});
	
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
		if ($gnb.has(e.target).length === 0) {
			$header.mouseleave();
		}
		if ($('.locationTab div').has(e.target).length === 0) {
				$('.locationTab').mouseleave();
			}
		if ($('.selectStyle').has(e.target).length === 0) {
			$('.selectStyle').mouseleave();
		}
	});

	$(window).resize(function () {
		if ($moBtn.is(':hidden')) {
			$('.gnbList li.opNav').removeAttr('class').children('a').removeAttr('title');
			$('body').removeAttr("style");
			$gnb.removeAttr('style');
			$gnb.find('div').removeAttr('style');
			$('.opNav>a').attr('title', '하위메뉴 보기').closest('li').removeClass('open');
			$('.header, .overlayBg').removeClass('active');
			$('.btnGnbAll, .gnbClose').removeAttr('style');
			isOpen = false;
		} else {
			$('.gnbList>li').find('>div').parent('li').addClass('opNav').children('a').attr('title', '하위메뉴 보기');
			$('.subMenu').find('div').parent('li').addClass('opNav').children('a').attr('title', '하위메뉴 보기');
			$('.gnbClose').removeAttr('style');
			$('.header, .overlayBg').removeClass('active');
			$gnb.hide();
		}
	});
});

// 레이어 팝업 제어
var dialogOpen = false, lastFocus, dialog, okbutton, pagebackground;
var popId;
function showDialog(el, disView, popId) {
    lastFocus = el || document.activeElement;
    if(disView !== undefined) {
        if(popId !== undefined) {
            toggleDialog('show', disView, popId);
        } else {
            toggleDialog('show', disView, '');
        }
    } else {
        toggleDialog('show', '', '');
    }
}
function hideDialog(el, popId) {
    if(popId === undefined) {
        toggleDialog('hide');
    } else {
        toggleDialog('hide', '', popId);
    }
}
function toggleDialog(sh, disView, popId) {
	pop = popId;
    if(popId === '') {
        dialog = document.getElementById("layerPop");
    } else {
        dialog = document.getElementById(popId);
    }
    pagebackground = $(".skipNav, .overlayBg, .header, .locationVisual, .pageTit, .footer");
    if (sh == "show") {
        dialogOpen = true;
        // show the dialog
        dialog.style.display = disView;
        // 다이얼로그 표시 이후, 그 안의 요소에 포커스하기
		dialog.focus();
        // "숨겨질" 콘텐츠로에서 포커스가 나간 *후에* 배경을 숨깁니다.
        pagebackground.attr("aria-hidden","true");
    } else {
        dialogOpen = false;
        dialog.style.display = 'none';
        pagebackground.removeAttr("aria-hidden");
        lastFocus.focus();
    }
}
document.addEventListener("focus", function (event) {
    if (dialogOpen && !dialog.contains(event.target)) {
		let dialogEl = dialog.getAttribute("id");
        event.stopPropagation();
        document.getElementById(dialogEl).focus();
    }
}, true);
document.addEventListener("keydown", function (event) {
    if (dialogOpen && event.keyCode == 27) {
		let dialogEl = dialog.getAttribute("id");
        toggleDialog('hide', '', dialogEl);
    }
}, true);
        
