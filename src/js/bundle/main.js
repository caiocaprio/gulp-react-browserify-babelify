// var Main = {
//     init: function() {
//         var _self = this;
//         Menu.init();
//         Modal.init();
//         AcessibilityService.init();
//         // Search.init();

//         _self.addEventListeners();
//     },
//     addEventListeners: function() {
//         var _self = this;
//         console.log('addEventListeners', _self.$menuToogleButton);
//     },

// }

// var Search = {
//     $search: null,
//     init: function() {
//         var _self = this;

//         _self.$search = $('.search-field');
//         _self.$search.find('input[type=text]').on('click focusin', function() {
//             console.log(this.value);
//             if (this.value == 'Busca') {
//                 this.value = '';
//             }
//         });

//         _self.$search.find('input[type=text]').on('blur', function() {
//             if (this.value == '') {
//                 this.value = 'Busca';
//             }
//         });

//         _self.$search.find('input[type=text]').keypress(function(e) {
//             var $el = $(this);
//             if (e.which == 13) {
//                 console.log('aaaa, 13')
//                 Search.validate();
//             }
//         });

//         $('.ico-mobile-buscar').click(function() {
//             if ($('.box-search.mobile').hasClass('show')) {
//                 $('.box-search.mobile').removeClass('show')
//                 $('.nav-full-menu').removeClass('search-opened');
//             } else {
//                 $('.box-search.mobile').addClass('show')
//                 $('.nav-full-menu').addClass('search-opened');
//             }
//         });

//         _self.$search.find(".bt-search ").click(function(e) {
//             e.preventDefault();
//             console.log('click', e)
//             Search.validate();
//         })
//     },
//     validate: function() {
//         if ($(window).width() < 768) {
//             $txtBusca = $(".txt-search.mobile");
//         } else {
//             $txtBusca = $(".txt-search.desktop");
//         }


//         $maps = $("#target");
//         busca = $txtBusca.val();

//         console.log('validate', busca)

//         if ((busca == null || busca == undefined || busca.toLowerCase() == "busca" || busca == "")) {
//             //Só continua a validação caso o elemento em FOCO seja o Input de Busca ou BOTÃO  de pesquisar


//             if ($maps.length > 0) {
//                 if (document.activeElement.id == $maps.attr("id")) { //Verifica se o focus é o campo do mapa
//                     return false;
//                 } else {
//                     alert('Por favor, informe o texto a ser pesquisado!');
//                     return false;
//                 }
//             } else {
//                 alert('Por favor, informe o texto a ser pesquisado!');
//                 return false;
//             }
//         } else {
//             window.location = "/busca?q=" + busca;
//         }
//     }

// }

// var Menu = {
//     $bodyHtml: null,
//     $nav: null,
//     $menuToogleButton: null,
//     $navFullMenu: null,
//     heightMenu: 0,
//     init: function() {
//         var _self = this;
//         _self.$bodyHtml = $('body,html');
//         _self.$nav = $('.box-menu .navbar');
//         _self.$navFullMenu = $('.nav-full-menu');

//         _self.$menuToogleButton = _self.$nav.find('.navbar-toggle');
//         _self.addEventListeners();
//     },
//     addEventListeners: function() {
//         var _self = this;
//         _self.$menuToogleButton.click(function() {
//             var $e = $(this);
//             if ($(this).hasClass('collapsed')) {
//                 _self.fixMenuMobile();
//             } else {
//                 _self.unfixMenuMobile();
//             }
//         });
//     },
//     fixMenuMobile: function() {
//         var _self = this;
//         _self.heightMenu = $('header nav.navbar.navbar-default').height() + $("header .box-toolbar").height() + 1;
//         _self.$bodyHtml.removeClass('overflow-auto').addClass('overflow-hidden');
//         _self.$bodyHtml.stop().animate({ scrollTop: 0 }, 0, 'swing');
//         _self.$navFullMenu.addClass('fixed');
//         _self.$navFullMenu.css({ 'top': _self.heightMenu, 'height': "-moz-calc(100% - " + _self.heightMenu + "px)", 'height': "-webkit-calc(100% - " + _self.heightMenu + "px)", 'height': "calc(100% - " + _self.heightMenu + "px)" });
//     },
//     unfixMenuMobile: function() {
//         var _self = this;
//         _self.$navFullMenu.removeClass('fixed');
//         _self.$navFullMenu.css({ 'top': 'initial', 'height': 'auto' });
//         _self.$bodyHtml.removeClass('overflow-hidden').addClass('overflow-auto');
//     }
// }

// var Modal = {
//     props: null,
//     clearTime: null,
//     init: function() {
//         var _self = this;
//         this.addEventListeners();
//     },
//     addEventListeners: function() {
//         var _self = this;

//         var domModalLink = '<div class="modal fade modal-link" id="modalLink" tabindex="-1" role="dialog" aria-labelledby="modalLink" aria-hidden="true">' +
//             '<div class="modal-dialog" role="document">' +
//             '<div class="modal-content">' +
//             '<div class="modal-body">' +
//             '<button type="button" class="close" data-dismiss="modal" aria-label="Close">' +
//             '<span aria-hidden="true">&times;</span>' +
//             '</button>' +
//             '<!-- 16:9 aspect ratio -->' +
//             '<div class="spinner">' +
//             '<div class="bounce1"></div>' +
//             '<div class="bounce2"></div>' +
//             '<div class="bounce3"></div>' +
//             '</div>' +
//             '<div class="box-iframe">' +
//             '<iframe class="embed-responsive-item" src="" id="iframeLinkModal"  allowscriptaccess="always">></iframe>' +
//             '</div>' +
//             '</div>' +
//             '</div>' +
//             '</div>' +
//             '</div>';

//         $("body").append(domModalLink);
//         $('#modalLink').on('show.bs.modal', _self.openModal);
//         $('#modalLink').on('hide.bs.modal', _self.closeModal);
//     },
//     openModal: function(event) {
//         var _self = this;
//         var $modal = $(this)
//         var $button = $(event.relatedTarget)
//         clearTimeout(_self.clearTime);

//         _self.props = {
//             width: ($button.data('width') ? $button.data('width') : '400px'),
//             height: ($button.data('height') ? $button.data('height') : '300px'),
//             class: ($button.data('class') ? $button.data('class') : ''),
//             src: ($button.data('src') ? $button.data('src') : ''),
//         }
//         $modal.find('#iframeLinkModal').fadeOut(0);
//         $modal.find('#iframeLinkModal').attr('src', _self.props.src);
//         $modal.find('#iframeLinkModal').on("load", function() {
//             $modal.find('#iframeLinkModal').fadeIn(500);
//         });
//         $modal.find('.modal-dialog').css({ 'width': _self.props.width, 'height': _self.props.height });
//         // setTimeout(function() {  }, 500);

//     },
//     closeModal: function() {
//         var _self = this;
//         var $modal = $(this);
//         _self.clearTime = setTimeout(function() {
//             $modal.find('.modal-dialog').css({ 'width': 'auto', 'height': 'auto' });
//             $modal.removeClass(_self.props.class)
//             $("#iframeLinkModal").attr('src', '');
//         }, 1500)

//     }
// }

// var AcessibilityService = {
//     $html: null,
//     init: function() {
//         var _self = this;
//         console.log("AcessibilityService")
//         _self.$html = $("html");
//         $(".alto-contraste a").click(function() {
//             _self.toggleHighContrast();
//         });
//         $(".aumentar-fonte a").click(function() {
//             _self.increaseFontSize();
//         });
//         $(".diminuir-fonte a").click(function() {
//             _self.decreaseFontSize();
//         })
//         _self.loadPreferences();
//     },
//     toggleHighContrast: function() {
//         var _self = this;
//         if (_self.$html.hasClass("high-contrast")) {
//             _self.$html.removeClass("high-contrast");
//             _self.createCookie("high-contrast", false);
//         } else {
//             _self.$html.addClass("high-contrast");
//             _self.createCookie("high-contrast", true);
//         }
//     },

//     getActualFontSize: function() {
//         var _self = this;
//         var className = "";
//         _self.$html.removeClass(function(index, css) {
//             return className = (css.match(/(^|\s)size-[-]{0,1}\d+/g) || []).join("");
//         });
//         className = className.trim().split(" ")[0];
//         if (className == "") {
//             return 0;
//         }
//         return parseInt(className.match(/-([-]{0,1}\d+$)/)[1]);
//     },

//     increaseFontSize: function() {
//         var _self = this;
//         var size = _self.getActualFontSize();
//         if (size < 3) size++;
//         _self.applyFontSize(size);
//     },

//     decreaseFontSize: function() {
//         var _self = this;
//         var size = _self.getActualFontSize();
//         if (size > -1) size--;
//         _self.applyFontSize(size);
//     },

//     applyFontSize: function(size) {
//         var _self = this;
//         if (size == 0) {
//             _self.createCookie("font-size", "");
//             return;
//         }
//         _self.$html.addClass("size-" + size);
//         _self.createCookie("font-size", "size-" + size);
//     },

//     loadPreferences: function() {
//         var _self = this;
//         var fontSizeCookie = _self.readCookie("font-size");
//         if (fontSizeCookie != null) {
//             _self.$html.addClass(fontSizeCookie);
//         }

//         var highContrastCookie = _self.readCookie("high-contrast");

//         var highContrast;
//         try {
//             highContrast = JSON.parse(highContrastCookie.toLowerCase());
//         } catch (e) {
//             highContrast = false;
//         }

//         if (highContrast) {
//             _self.$html.addClass("high-contrast");
//         } else {
//             _self.$html.removeClass("high-contrast");
//         }
//     },


//     createCookie: function(name, value) {
//         if ($.cookie == null || window.bowser != undefined && (bowser.msie == true & parseFloat(bowser.version) < 9)) {
//             document.cookie = name + "=" + value;
//         } else {
//             $.cookie(name, value, { domain: getDomain(), path: "/" });
//         }
//     },

//     readCookie: function(name) {
//         try {
//             return $.cookie(name);
//         } catch (e) {
//             var nameEQ = name + "=";
//             var ca = document.cookie.split(';');
//             var value = null;
//             for (var i = 0; i < ca.length; i++) {
//                 var c = ca[i];
//                 while (c.charAt(0) == ' ') c = c.substring(1, c.length);
//                 if (c.indexOf(nameEQ) == 0)
//                     return value = c.substring(nameEQ.length, c.length);
//             }
//             return value;
//         }
//     }
// }

// $(document).ready(function() { Main.init(); });