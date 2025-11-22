import gsap from 'gsap';

export const startCatAnimation = () => {
  const cat = '#cat',
    catShadow = '#catShadow',
    coinWaves = '#coinWaves',
    coinObject = '#coinObject',
    tongue = '#tongueObject',
    coinRect = '#coinRect',
    coinShadow = '#coinShadow',
    headObject = '#headObject',
    earTop = '#earObjectT',
    earTopChild = '#earObjectTChild',
    earBottom = '#earObjectB',
    earBottomChild = '#earObjectBChild',
    tail = '#tailObject',
    legTop = '#legObjectT',
    legBottom = '#legObjectB',
    eye = '#eyeObject';

  const S = 0.17;
  const WS = 0.3;

  const coinWavesNodes = document.querySelector('#coinWaves')?.children ?? [];

  let waveAnimDuration = 0;

  // --- Initial cat leg positions ---
  gsap.set(legTop, { x: 10, rotate: -20 });
  gsap.set(legBottom, { y: -4 });

  // --- Coin rotation ---
  const coinRectTl = gsap
    .timeline({ repeat: -1 })
    .to(coinRect, {
      duration: 0.4,
      rotate: '360_cw',
      transformOrigin: '50% 50%',
      ease: 'none',
    })
    .set(coinRect, { rotate: 0 });

  // --- Coin left-right motion ---
  const coinEllipseTl = gsap
    .timeline({ repeat: -1, defaults: { ease: 'none', duration: WS } })
    .to(coinObject, { x: 5 })
    .yoyo(true);

  // --- Coin shadow motion ---
  const coinShadowTl = gsap
    .timeline({
      repeat: -1,
      defaults: { transformOrigin: '50% 50%', ease: 'none', duration: WS },
    })
    .to(coinShadow, { x: 10 })
    .yoyo(true);

  // --- Coin waves wiggle ---
  const coinWavesArrTl = [...coinWavesNodes].map((node) => {
    waveAnimDuration += 0.1;
    return gsap
      .timeline({
        repeat: -1,
        defaults: {
          ease: 'none',
          duration: 0.05 + waveAnimDuration / 10,
        },
      })
      .to(node, { x: -1.2 })
      .yoyo(true);
  });

  const wavesXTl = gsap
    .timeline({ repeat: -1, defaults: { ease: 'none', duration: WS } })
    .to(coinWaves, { x: 5 })
    .yoyo(true);

  // --- Combine all coin animations ---
  const coinMainTl = gsap
    .timeline()
    .add(coinRectTl, 0)
    .add(coinEllipseTl, 0)
    .add(coinShadowTl, 0)
    .add(coinWavesArrTl, 0)
    .add(wavesXTl, 0);

  // --- Cat tongue ---
  const tongueTl = gsap
    .timeline({ repeat: -1, defaults: { duration: S, ease: 'none' }, delay: S })
    .set(tongue, { y: -4 })
    .to(tongue, { rotate: 8 })
    .yoyo(true);

  // --- Cat head bounce ---
  const headTl = gsap
    .timeline({
      repeat: -1,
      defaults: { transformOrigin: '50% 100%', ease: 'none', duration: S },
    })
    .to(headObject, { y: -2, rotate: -2 })
    .yoyo(true);

  // --- Top ear + child ---
  const earTopTl = gsap
    .timeline({
      repeat: -1,
      defaults: { transformOrigin: '0% 200%', ease: 'none', duration: S },
    })
    .to(earTop, { x: -2, rotate: -3 })
    .yoyo(true);

  const earTopChildTl = gsap
    .timeline({
      repeat: -1,
      defaults: { transformOrigin: '100% 0%', ease: 'none', duration: S },
    })
    .to(earTopChild, { rotate: -6 })
    .yoyo(true);

  const earTopMainTl = gsap.timeline().add(earTopTl, 0).add(earTopChildTl, 0);

  // --- Bottom ear + child ---
  const earBottomTl = gsap
    .timeline({
      repeat: -1,
      defaults: {
        transformOrigin: '100% 100%',
        ease: 'none',
        duration: S * 2,
      },
    })
    .to(earBottom, { x: -2, y: 2 })
    .yoyo(true);

  const earBottomChildTl = gsap
    .timeline({
      repeat: -1,
      defaults: { transformOrigin: '100% 0%', ease: 'none', duration: S * 2 },
    })
    .to(earBottomChild, { rotate: -2 })
    .yoyo(true);

  const earBottomMainTl = gsap
    .timeline()
    .add(earBottomTl, 0)
    .add(earBottomChildTl, 0);

  // --- Combine all head animations ---
  const headObjectMainTl = gsap
    .timeline()
    .add(tongueTl, 0)
    .add(headTl, 0)
    .add(earTopMainTl, 0)
    .add(earBottomMainTl, 0);

  // --- Tail ---
  const tailTl = gsap
    .timeline({
      repeat: -1,
      defaults: { transformOrigin: '100% 50%', ease: 'none', duration: S },
    })
    .to(tail, { rotate: 14 })
    .yoyo(true);

  // --- Cat body up-down motion ---
  const catRunYTl = gsap
    .timeline({
      repeat: -1,
      defaults: { transformOrigin: '100% -50%', ease: 'none', duration: S },
    })
    .to(cat, { y: 10 })
    .yoyo(true);

  // --- Leg Top ---
  const legTopTl = gsap
    .timeline({
      repeat: -1,
      defaults: { transformOrigin: '0% -12%', ease: 'none', duration: S * 2 },
    })
    .to(legTop, { rotate: 105 })
    .yoyo(true);

  // --- Leg Bottom ---
  const legBottomTl = gsap
    .timeline({
      repeat: -1,
      defaults: { transformOrigin: '100% 0', ease: 'none', duration: S * 2 },
    })
    .to(legBottom, { rotate: -110 })
    .yoyo(true);

  // --- Cat shadow stretch ---
  const catShadowTl = gsap
    .timeline({
      repeat: -1,
      defaults: { transformOrigin: '50% 50%', ease: 'none', duration: S },
    })
    .to(catShadow, { scaleX: 1.1 })
    .to(catShadow, { scaleX: 0.8 });

  // --- Eyes blink ---
  const eyeTl = gsap
    .timeline({
      repeat: -1,
      defaults: { ease: 'none', duration: S * 2 },
    })
    .to(eye, { scaleX: 1.1, scaleY: 1.1 })
    .yoyo(true);

  // --- Combine all CAT animations ---
  const catMainTl = gsap
    .timeline()
    .add(headObjectMainTl, 0)
    .add(tailTl, 0)
    .add(catRunYTl, 0)
    .add(legTopTl, 0)
    .add(legBottomTl, 0)
    .add(catShadowTl, 0)
    .add(eyeTl, 0);

  // --- Global timeline (cat + coin) ---
  gsap.timeline().add(coinMainTl, 0).add(catMainTl, 0);
};
