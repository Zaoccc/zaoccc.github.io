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
});
