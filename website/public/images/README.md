# Website images

This folder holds the images the site shows and the site's social preview.

- `placeholder.svg`: stands in for every screenshot slot. It is a plain wireframe, not a picture of the app.
- Screenshot slots: `src/config/content.ts` (`screenshots`) declares three slots, `home`, `notes` and `themes`. Each one points at `images/placeholder.svg` until a real capture exists.
- The real files will be `images/home.webp` (main menu), `images/notes.webp` (Notes demo) and `images/themes.webp` (Settings theme editor). Each is 1440 x 900 WebP.
- `../social.svg` is the source for `../social.png`, the 1200 x 630 image used in link previews.

## Making a screenshot

Captures come from the desktop app's dev capture harness, which is controlled by `APP_CAPTURE_*` environment variables (see the app's `CLAUDE.md`). Use a throwaway profile so that no personal data is captured. Show only demo content.

1. Start the app with a scratch user-data directory and the capture variables set, so it saves a PNG and quits.
2. Convert the PNG to WebP:

   ```bash
   cwebp -q 85 capture.png -o images/notes.webp
   ```

3. Point the matching `src` in `src/config/content.ts` at the new file, and update its `alt` text to describe what the picture shows.

## Social preview

`social.png` is rendered from `social.svg` with Inkscape:

```bash
inkscape website/public/social.svg --export-type=png --export-filename=website/public/social.png -w 1200 -h 630
```

Run it again after editing `social.svg`.
