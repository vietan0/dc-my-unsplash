### Todo List

- [x] npm i backend stuffs, frontend stuffs, eslint
- [x] choose deploy separately strategy:
  - [x] frontend on Firebase ✔️ / Vercel / Cloudflare Pages
  - [x] backend on Firebase / Vercel / Render ✔️
- [x] use Supabase as DB
- [x] modularize your frontend
- [x] get some placeholder images
- [x] add hover effect for buttons
- [x] use `@apply`
- [x] make header sticky/fixed
- [x] fix popup's absolute position
- [x] move `images` to Context
- [x] press `X` on image can delete label (`setImages`)
- [x] differentiate `Label` in `Popup` and `Label` in `Image`
- [x] make `Popup` reusable (`{children}`)
- [x] create image view popup
- [x] allow uploading from computer, store uploaded on and get url from Cloudinary
- [x] add pre upload file name indicator
- [x] search by hand (filter)
- [x] cleanup `mt` logic in Label
- [x] adjust default column numbers based on screen size
- [x] remove non-Tailwind classNames
- [x] find Tailwind ext. that handles classes format long lines
- [x] fix 'popup (`ImageView` only) close when column num changes'
- [x] add loading indicator
- [x] perf: lazy loading on scroll
- [ ] perf: right now I'm sending requests for images everytime the grid column count changes
- [ ] perf: improve layout shift
- [ ] add 'Done' icon in places
- [ ] another approach to masonry: use transform:translate()
- [x] fix: click delete image icon shouldn't open image view

### Must Use:

- [x] Tailwind
- [x] useEffect Clean Up
- [ ] animation (`Framer`)
- [ ] animate when masonry move around
- [ ] animate when new photo added
