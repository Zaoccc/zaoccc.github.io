$(function () {
  'use strict';

  var $flexContainer = $('.flex-container');
  var $searchBox = $('.search-box');
  var $searchInput = $('#search-input');

  // 侧边菜单：打开 / 关闭
  $('.menu-icon, .menu-icon-close').on('click', function (event) {
    event.preventDefault();
    event.stopPropagation();
    $flexContainer.toggleClass('active');
  });

  // 点击菜单以外的区域时收起菜单
  $flexContainer.on('click', function (event) {
    if ($flexContainer.hasClass('active') && !$(event.target).closest('a').length) {
      $flexContainer.removeClass('active');
    }
  });

  // Esc 优先关闭菜单，其次关闭搜索
  $(window).on('keydown', function (event) {
    if (event.key !== 'Escape') {
      return;
    }

    if ($flexContainer.hasClass('active')) {
      $flexContainer.removeClass('active');
    } else if ($searchBox.hasClass('search-active')) {
      $searchBox.removeClass('search-active');
    }
  });

  // 搜索面板
  $('.search-icon').on('click', function (event) {
    event.preventDefault();
    $searchBox.toggleClass('search-active');

    if ($searchBox.hasClass('search-active')) {
      $searchInput.trigger('focus');
    }
  });

  $('.search-icon-close').on('click', function (event) {
    event.preventDefault();
    $searchBox.removeClass('search-active');
  });

  // 分享链接：复制当前文章地址
  function copyText(text) {
    if (navigator.clipboard && navigator.clipboard.writeText && window.isSecureContext) {
      return navigator.clipboard.writeText(text);
    }

    return new Promise(function (resolve, reject) {
      var $textarea = $('<textarea>')
        .val(text)
        .attr('readonly', '')
        .css({ position: 'fixed', top: '-9999px', left: '-9999px' })
        .appendTo('body');

      $textarea[0].select();
      $textarea[0].setSelectionRange(0, text.length);

      try {
        document.execCommand('copy') ? resolve() : reject(new Error('copy failed'));
      } catch (error) {
        reject(error);
      } finally {
        $textarea.remove();
      }
    });
  }

  function showCopyToast(x, y, message) {
    var $toast = $('<span class="copy-toast" role="status"></span>')
      .text(message)
      .css({ left: x, top: y });

    $('body').append($toast);
    $toast.animate({ top: y - 50, opacity: 0 }, 1500, function () {
      $toast.remove();
    });
  }

  $('.share-link').on('click', function (event) {
    event.preventDefault();
    event.stopPropagation();

    var url = $(this).data('url') || window.location.href;
    var rect = this.getBoundingClientRect();
    var x = rect.left + window.pageXOffset;
    var y = rect.top + window.pageYOffset;

    copyText(url)
      .then(function () {
        showCopyToast(x, y, '链接已复制');
      })
      .catch(function () {
        showCopyToast(x, y, '复制失败，请手动复制');
      });
  });
});
