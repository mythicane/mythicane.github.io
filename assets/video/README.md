# Hero reel

Drop your action-shot reel here as `reel.mp4` and it will play automatically
behind the homepage hero — no code changes needed.

**Specs that work well:**
- Format: H.264 MP4, muted (the `<video>` tag is set to `muted autoplay loop playsinline` — browsers block autoplay-with-sound, so there's no audio track anyway)
- Aspect: landscape, ideally 16:9 or wider; it's cropped with `object-fit: cover`
- Length: 10–30s looping clip reads best; keep the file under ~15MB so it loads fast (compress with `ffmpeg -i in.mov -vcodec h264 -crf 28 -an reel.mp4`)
- Also add a `hero-poster.jpg` in `assets/img/` (a single representative frame) — it shows instantly while the video loads

`reel.mp4` is currently a 12 s placeholder (slowly moving earthy gradient with
"REEL PLACEHOLDER" written on it). Overwrite it with your reel under the same name.
It fills the whole screen behind "Embodied / Into the ...", cropped to fit.
