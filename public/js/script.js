$(document).ready(function(){$("#header").removeClass("fix"),$(window).scroll(function(){$(this).scrollTop()>$("#header").height()?($("#header").addClass("fix"),$("body").css("padding-top",$("#header").height())):($("#header").removeClass("fix"),$("body").css("padding-top",0))}),$('a[href^="#"]').on("click",function(e){e.preventDefault();var t=$(this);$("html, body").stop().animate({scrollTop:+$(t.attr("href")).offset().top-70},1e3)}),$(".nav_button").click(function(){$("#burger").toggleClass("active-sandwich"),$(".header__navigation").slideToggle()}),$(".form-select").each(function(){var e=$(this),t=$(this).children("option").length;e.addClass("select-hidden"),e.wrap('<div class="select"></div>'),e.after('<div class="select-styled"></div>');var s=e.next("div.select-styled");s.text(e.children("option").eq(0).text());for(var i=$("<ul />",{class:"select-options"}).insertAfter(s),o=0;o<t;o++)$("<li />",{text:e.children("option").eq(o).text(),rel:e.children("option").eq(o).val()}).appendTo(i);var n=i.children("li");s.on("click",function(e){e.stopPropagation(),$("div.select-styled.active").not(this).each(function(){$(this).removeClass("active").next("ul.select-options").hide()}),$(this).toggleClass("active").next("ul.select-options").toggle()}),n.on("click",function(t){t.stopPropagation(),s.text($(this).text()).removeClass("active"),s.addClass("selected"),e.val($(this).attr("rel")),i.hide()}),$(document).on("click",function(){s.removeClass("active"),i.hide()})}),$(".order__btn").hover(function(){$(this).closest(".order").addClass("hover")},function(){$(this).closest(".order").removeClass("hover")}),$(".image-slider").slick(),$(".review-slider__for").slick({slidesToShow:1,slidesToScroll:1,arrows:!1,dots:!0,asNavFor:".review-slider__nav",responsive:[{breakpoint:768,settings:{dots:!1}}]}),$(".review-slider__nav").slick({slidesToShow:1,slidesToScroll:1,asNavFor:".review-slider__for"}),$(".field_phone").mask("(000) 000-0000"),$(".form_jumb").on("submit",function(e){var t=$(this).find(".field_name"),s=$(this).find(".field_phone"),i=$(this).find(".field_select").parent(".select"),o=i.find(".select-styled");t.val()?t.next(".form-info").fadeOut(300):(e.preventDefault(),t.next(".form-info").fadeIn(300)),14!=s.val().length?(e.preventDefault(),s.next(".form-info").fadeIn(300)):s.next(".form-info").fadeOut(300),o.hasClass("selected")?i.next(".form-info").fadeOut(300):(e.preventDefault(),i.next(".form-info").fadeIn(300))})});