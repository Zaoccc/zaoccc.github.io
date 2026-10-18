# ZaoSan | 顺自成章

赵弎的个人博客，使用 Jekyll 构建，通过 GitHub Pages 发布。

## 本地运行

```bash
bundle install
bundle exec jekyll serve
```

修改 `assets/css/sass/` 下的样式后，需要重新生成 `assets/css/main.css`：

```bash
npx sass assets/css/sass/main.scss assets/css/main.css
```

## 目录说明

- `_config.yml`：站点与作者配置
- `_layouts/`：页面骨架
- `_includes/`：可复用片段
- `_pages/`：关于、标签、书签页
- `_posts/`：文章
- `assets/`：样式、脚本、字体和图片

## 许可

GNU General Public License v3.0
