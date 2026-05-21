"use client";
import React, { Suspense, useEffect, useRef, useState, useCallback } from "react";
import { Application, SPEObject, SplineEvent } from "@splinetool/runtime";
import gsap from "gsap";
import * as THREE from "three";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import dynamic from "next/dynamic";
import { Skill, SkillNames, SKILLS } from "@/data/constants";
import { sleep } from "@/lib/utils";
import { useMediaQuery } from "@/hooks/use-media-query";
import { usePreloader } from "./preloader";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { Section, getKeyboardState } from "./animated-background-config";
import { useSounds } from "./realtime/hooks/use-sounds";

gsap.registerPlugin(ScrollTrigger);

const SplineComponent = dynamic(() => import("@splinetool/react-spline"), {
  ssr: false,
  loading: () => null,
});

const PRELOAD_ASSETS = [
  "/assets/skills-keyboard.spline",
];

const preloadAssets = async () => {
  const promises = PRELOAD_ASSETS.map((url) => {
    return fetch(url, { cache: "force-cache" }).then((res) => {
      if (!res.ok) {
        console.warn(`Failed to preload ${url}`);
      }
    });
  });
  await Promise.allSettled(promises);
};

const AnimatedBackground = () => {
  const { isLoading, bypassLoading } = usePreloader();
  const { theme } = useTheme();
  const isMobile = useMediaQuery("(max-width: 767px)");
  const splineContainer = useRef<HTMLDivElement>(null);
  const [splineApp, setSplineApp] = useState<Application>();
  const selectedSkillRef = useRef<Skill | null>(null);

  const { playPressSound, playReleaseSound } = useSounds();

  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  const [activeSection, setActiveSection] = useState<Section>("hero");

  // Animation controllers refs
  const bongoAnimationRef = useRef<{ start: () => void; stop: () => void }>(null);
  const keycapAnimationsRef = useRef<{ start: () => void; stop: () => void }>(null);

  const [keyboardRevealed, setKeyboardRevealed] = useState(false);
  const [splineLoadFailed, setSplineLoadFailed] = useState(false);
  const [assetsPreloaded, setAssetsPreloaded] = useState(false);
  const router = useRouter();

  useEffect(() => {
    let isMounted = true;
    const preloadTimeout = setTimeout(() => {
      if (isMounted) {
        setAssetsPreloaded(true);
        console.warn("Preload timeout exceeded, proceeding without preload");
      }
    }, 3000);

    const preloadAndSetState = async () => {
      await preloadAssets();
      if (isMounted) {
        clearTimeout(preloadTimeout);
        setAssetsPreloaded(true);
      }
    };
    preloadAndSetState();
    return () => {
      isMounted = false;
      clearTimeout(preloadTimeout);
    };
  }, []);

  const resolveSkill = (objectName: string, target?: any): Skill | null => {
    // Direct match from SKILLS
    const direct = SKILLS[objectName as SkillNames];
    if (direct) return direct;
    // Walk up parent chain to find matching skill
    let node = target;
    while (node?.parent) {
      node = node.parent;
      const match = SKILLS[node.name as SkillNames];
      if (match) return match;
    }
    return null;
  };

  // --- Event Handlers ---

  const handleMouseHover = (e: SplineEvent) => {
    if (!splineApp) return;

    const skill = resolveSkill(e.target.name, e.target);

    if (!skill) {
      if (e.target.name === "body" || e.target.name === "platform") {
        if (selectedSkillRef.current) playReleaseSound();
        setSelectedSkill(null);
        selectedSkillRef.current = null;
        if (splineApp.getVariable("heading") && splineApp.getVariable("desc")) {
          splineApp.setVariable("heading", "");
          splineApp.setVariable("desc", "");
        }
      }
      return;
    }

    // Same skill — skip
    if (selectedSkillRef.current?.id === skill.id) return;

    // Different skill — play transition sounds
    if (selectedSkillRef.current) playReleaseSound();
    playPressSound();
    setSelectedSkill(skill);
    selectedSkillRef.current = skill;
  };

  const handleSplineInteractions = () => {
    if (!splineApp) return;

    const isInputFocused = () => {
      const activeElement = document.activeElement;
      return (
        activeElement &&
        (activeElement.tagName === "INPUT" ||
          activeElement.tagName === "TEXTAREA" ||
          (activeElement as HTMLElement).isContentEditable)
      );
    };

    splineApp.addEventListener("keyUp", () => {
      if (!splineApp || isInputFocused()) return;
      playReleaseSound();
      splineApp.setVariable("heading", "");
      splineApp.setVariable("desc", "");
    });
    splineApp.addEventListener("keyDown", (e) => {
      if (!splineApp || isInputFocused()) return;
      const skill = resolveSkill(e.target.name, e.target);
      if (skill) {
        playPressSound();
        setSelectedSkill(skill);
        selectedSkillRef.current = skill;
        splineApp.setVariable("heading", skill.label);
        splineApp.setVariable("desc", skill.shortDescription);
      }
    });
    splineApp.addEventListener("mouseHover", handleMouseHover);
  };

  // --- Animation Setup Helpers ---

  const createSectionTimeline = (
    triggerId: string,
    targetSection: Section,
    prevSection: Section,
    start: string = "top 50%",
    end: string = "bottom bottom"
  ) => {
    if (!splineApp) return;
    const kbd = splineApp.findObjectByName("keyboard");
    if (!kbd) return;

    gsap.timeline({
      scrollTrigger: {
        trigger: triggerId,
        start,
        end,
        scrub: true,
        onEnter: () => {
          setActiveSection(targetSection);
          const state = getKeyboardState({ section: targetSection, isMobile });
          gsap.to(kbd.scale, { ...state.scale, duration: 1 });
          gsap.to(kbd.position, { ...state.position, duration: 1 });
          gsap.to(kbd.rotation, { ...state.rotation, duration: 1 });
        },
        onLeaveBack: () => {
          setActiveSection(prevSection);
          const state = getKeyboardState({ section: prevSection, isMobile, });
          gsap.to(kbd.scale, { ...state.scale, duration: 1 });
          gsap.to(kbd.position, { ...state.position, duration: 1 });
          gsap.to(kbd.rotation, { ...state.rotation, duration: 1 });
        },
      },
    });
  };

  const setupScrollAnimations = () => {
    if (!splineApp || !splineContainer.current) return;
    const kbd = splineApp.findObjectByName("keyboard");
    if (!kbd) return;

    // Initial state
    const heroState = getKeyboardState({ section: "hero", isMobile });
    gsap.set(kbd.scale, heroState.scale);
    gsap.set(kbd.position, heroState.position);

    // Section transitions
    createSectionTimeline("#skills", "skills", "hero");
    createSectionTimeline("#projects", "projects", "skills", "top 70%");
    createSectionTimeline("#contact", "contact", "projects", "top 30%");
  };

  const getBongoAnimation = () => {
    const framesParent = splineApp?.findObjectByName("bongo-cat");
    const frame1 = splineApp?.findObjectByName("frame-1");
    const frame2 = splineApp?.findObjectByName("frame-2");

    if (!frame1 || !frame2 || !framesParent) {
      return { start: () => { }, stop: () => { } };
    }

    let interval: NodeJS.Timeout;
    const start = () => {
      let i = 0;
      framesParent.visible = true;
      interval = setInterval(() => {
        if (i % 2) {
          frame1.visible = false;
          frame2.visible = true;
        } else {
          frame1.visible = true;
          frame2.visible = false;
        }
        i++;
      }, 100);
    };
    const stop = () => {
      clearInterval(interval);
      framesParent.visible = false;
      frame1.visible = false;
      frame2.visible = false;
    };
    return { start, stop };
  };

  const getKeycapsAnimation = () => {
    if (!splineApp) return { start: () => { }, stop: () => { } };

    let tweens: gsap.core.Tween[] = [];
    const removePrevTweens = () => tweens.forEach((t) => t.kill());

    const start = () => {
      removePrevTweens();
      Object.values(SKILLS)
        .sort(() => Math.random() - 0.5)
        .forEach((skill, idx) => {
          const keycap = splineApp.findObjectByName(skill.name);
          if (!keycap) return;
          const t = gsap.to(keycap.position, {
            y: Math.random() * 200 + 200,
            duration: Math.random() * 2 + 2,
            delay: idx * 0.6,
            repeat: -1,
            yoyo: true,
            yoyoEase: "none",
            ease: "elastic.out(1,0.3)",
          });
          tweens.push(t);
        });
    };

    const stop = () => {
      removePrevTweens();
      Object.values(SKILLS).forEach((skill) => {
        const keycap = splineApp.findObjectByName(skill.name);
        if (!keycap) return;
        const t = gsap.to(keycap.position, {
          y: 0,
          duration: 4,
          repeat: 1,
          ease: "elastic.out(1,0.7)",
        });
        tweens.push(t);
      });
      setTimeout(removePrevTweens, 1000);
    };

    return { start, stop };
  };

  const updateKeyboardTransform = async () => {
    if (!splineApp) return;
    const kbd = splineApp.findObjectByName("keyboard");
    if (!kbd) return;

    kbd.visible = false;
    await sleep(400);
    kbd.visible = true;
    setKeyboardRevealed(true);

    const currentState = getKeyboardState({ section: activeSection, isMobile });
    gsap.fromTo(
      kbd.scale,
      { x: 0.01, y: 0.01, z: 0.01 },
      {
        ...currentState.scale,
        duration: 1.5,
        ease: "elastic.out(1, 0.6)",
      }
    );

    const allObjects = splineApp.getAllObjects();
    const keycaps = allObjects.filter((obj) => obj.name === "keycap");

    await sleep(900);

    if (isMobile) {
      const mobileKeyCaps = allObjects.filter((obj) => obj.name === "keycap-mobile");
      mobileKeyCaps.forEach((keycap) => { keycap.visible = true; });
    } else {
      const desktopKeyCaps = allObjects.filter((obj) => obj.name === "keycap-desktop");
      desktopKeyCaps.forEach(async (keycap, idx) => {
        await sleep(idx * 70);
        keycap.visible = true;
      });
    }

    keycaps.forEach(async (keycap, idx) => {
      keycap.visible = false;
      await sleep(idx * 70);
      keycap.visible = true;
      gsap.fromTo(
        keycap.position,
        { y: 200 },
        { y: 50, duration: 0.5, delay: 0.1, ease: "bounce.out" }
      );
    });
  };

  // Detect Spline loading timeout — when WASM fetch fails due to proxy, show fallback
  useEffect(() => {
    if (splineApp || splineLoadFailed) return;
    const timer = setTimeout(() => setSplineLoadFailed(true), 10000);
    return () => clearTimeout(timer);
  }, [splineApp, splineLoadFailed]);

  // --- Effects ---

  // Apply custom SVG icons to keycap legend meshes
  useEffect(() => {
    if (!splineApp) return;
    const scene = (splineApp as any)._scene;
    if (!scene?.isScene) return;

    // Spline scene name → skill.name mapping (only 24 keycaps exist)
    const splineNameMap: Record<string, string> = {
      taro: "vue",     // skill taro → Spline keycap "vue"
      canvas: "vim",   // skill canvas → Spline keycap "vim"
      webGL: "vercel", // skill webGL → Spline keycap "vercel"
    };

    const skills = Object.values(SKILLS);

    for (const skill of skills) {
      const splineName = splineNameMap[skill.name] || skill.name;
      const keycapGroup = scene.getObjectByName(splineName);
      if (!keycapGroup) continue; // skill not in Spline scene (e.g. Three, stablediffusion, comfyui, cursor, aitools)

      const hex = parseInt(skill.color.replace("#", ""), 16);

      let legendMesh: any = null;
      keycapGroup.traverse((node: any) => {
        if (!legendMesh && node.isMesh && node.name === "legend") legendMesh = node;
      });
      if (!legendMesh) { console.log(`[TexSwap] ${skill.name}: no legend mesh found`); continue; }

      const mat = legendMesh.material;
      if (!mat?.uniforms) continue;

      // Priority: nodeU0 (active legend texture) > any tex with image > first tex (aoMap)
      let textureUniformKey: string | null = null;
      for (const uKey of Object.keys(mat.uniforms)) {
        const val = mat.uniforms[uKey].value;
        if (!val?.isTexture) continue;
        if (uKey === "nodeU0") { textureUniformKey = uKey; break; }
        if (val.image && !textureUniformKey) textureUniformKey = uKey;
      }
      if (!textureUniformKey) {
        for (const uKey of Object.keys(mat.uniforms)) {
          if (mat.uniforms[uKey].value?.isTexture) { textureUniformKey = uKey; break; }
        }
      }
      if (!textureUniformKey) continue;

      // Brighten legend to white so icon shows at full intensity
      const colorUni = mat.uniforms["nodeU9"]?.value;
      if (colorUni?.isColor) { colorUni.r = 1; colorUni.g = 1; colorUni.b = 1; }

      // Draw white icon on transparent canvas (no background — keycap color shows through)
      const canvas = document.createElement("canvas");
      canvas.width = 256; canvas.height = 256;
      const ctx = canvas.getContext("2d")!;

      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => {
        // Convert colored icon to white silhouette via temp canvas
        const tmp = document.createElement("canvas");
        tmp.width = 256; tmp.height = 256;
        const tctx = tmp.getContext("2d")!;
        tctx.drawImage(img, 16, 16, 224, 224);
        tctx.globalCompositeOperation = "source-in";
        tctx.fillStyle = "#ffffff";
        tctx.fillRect(0, 0, 256, 256);
        // Draw white icon onto colored background
        ctx.drawImage(tmp, 0, 0);

        const tex = mat.uniforms[textureUniformKey!].value;
        tex.image = canvas;
        if (tex.source) tex.source.data = canvas;
        tex.needsUpdate = true;
      };
      img.onerror = () => console.warn(`[TexSwap] ${skill.name}: failed to load icon`);
      img.src = `/icons-keyboard/${skill.name}.svg`;
    }
  }, [splineApp, SKILLS]);

  // Initialize GSAP and Spline interactions
  useEffect(() => {
    if (!splineApp) return;
    handleSplineInteractions();
    setupScrollAnimations();
    bongoAnimationRef.current = getBongoAnimation();
    keycapAnimationsRef.current = getKeycapsAnimation();
    return () => {
      bongoAnimationRef.current?.stop()
      keycapAnimationsRef.current?.stop()
    }

  }, [splineApp, isMobile]);

  // Handle keyboard text visibility based on theme and section
  useEffect(() => {
    if (!splineApp) return;
    const textDesktopDark = splineApp.findObjectByName("text-desktop-dark");
    const textDesktopLight = splineApp.findObjectByName("text-desktop");
    const textMobileDark = splineApp.findObjectByName("text-mobile-dark");
    const textMobileLight = splineApp.findObjectByName("text-mobile");

    if (!textDesktopDark || !textDesktopLight || !textMobileDark || !textMobileLight) return;

    const setVisibility = (
      dDark: boolean,
      dLight: boolean,
      mDark: boolean,
      mLight: boolean
    ) => {
      textDesktopDark.visible = dDark;
      textDesktopLight.visible = dLight;
      textMobileDark.visible = mDark;
      textMobileLight.visible = mLight;
    };

    if (activeSection !== "skills") {
      setVisibility(false, false, false, false);
    } else if (theme === "dark") {
      isMobile
        ? setVisibility(false, false, false, true)
        : setVisibility(false, true, false, false);
    } else {
      isMobile
        ? setVisibility(false, false, true, false)
        : setVisibility(true, false, false, false);
    }
  }, [theme, splineApp, isMobile, activeSection]);

  useEffect(() => {
    if (!selectedSkill || !splineApp) return;
    splineApp.setVariable("heading", selectedSkill.label);
    splineApp.setVariable("desc", selectedSkill.shortDescription);
  }, [selectedSkill]);

  // Handle rotation and teardown animations based on active section
  useEffect(() => {
    if (!splineApp) return;

    let rotateKeyboard: gsap.core.Tween | undefined;
    let teardownKeyboard: gsap.core.Tween | undefined;

    const kbd = splineApp.findObjectByName("keyboard");

    if (kbd) {
      rotateKeyboard = gsap.to(kbd.rotation, {
        y: Math.PI * 2 + kbd.rotation.y,
        duration: 10,
        repeat: -1,
        yoyo: true,
        yoyoEase: true,
        ease: "back.inOut",
        delay: 2.5,
        paused: true, // Start paused
      });

      teardownKeyboard = gsap.fromTo(
        kbd.rotation,
        { y: 0, x: -Math.PI, z: 0 },
        {
          y: -Math.PI / 2,
          duration: 5,
          repeat: -1,
          yoyo: true,
          yoyoEase: true,
          delay: 2.5,
          immediateRender: false,
          paused: true,
        }
      );
    }

    const manageAnimations = async () => {
      // Reset text if not in skills
      if (activeSection !== "skills") {
        splineApp.setVariable("heading", "");
        splineApp.setVariable("desc", "");
      }

      // Handle Rotate/Teardown Tweens
      if (activeSection === "hero") {
        rotateKeyboard?.restart();
        teardownKeyboard?.pause();
      } else if (activeSection === "contact") {
        rotateKeyboard?.pause();
      } else {
        rotateKeyboard?.pause();
        teardownKeyboard?.pause();
      }

      // Handle Bongo Cat
      if (activeSection === "projects") {
        await sleep(300);
        bongoAnimationRef.current?.start();
      } else {
        await sleep(200);
        bongoAnimationRef.current?.stop();
      }

      // Handle Contact Section Animations
      if (activeSection === "contact") {
        await sleep(600);
        teardownKeyboard?.restart();
        keycapAnimationsRef.current?.start();
      } else {
        await sleep(600);
        teardownKeyboard?.pause();
        keycapAnimationsRef.current?.stop();
      }
    };

    manageAnimations();

    return () => {
      rotateKeyboard?.kill();
      teardownKeyboard?.kill();
    };
  }, [activeSection, splineApp]);

  // Reveal keyboard on load/route change
  useEffect(() => {
    const hash = activeSection === "hero" ? "#" : `#${activeSection}`;
    router.push("/" + hash, { scroll: false });

    if (!splineApp || isLoading || keyboardRevealed) return;
    updateKeyboardTransform();
  }, [splineApp, isLoading, activeSection]);

  return (
    <>
      {/* Fallback gradient background when Spline fails to load (e.g. proxy blocks WASM) */}
      {splineLoadFailed && (
        <div className="w-full h-full fixed bg-gradient-to-br from-gray-900 via-purple-900/60 to-gray-800" />
      )}
      <Suspense fallback={<div className="w-full h-full fixed bg-gradient-to-br from-gray-900 via-purple-900/60 to-gray-800" />}>
        {!splineLoadFailed && assetsPreloaded && (
          <SplineComponent
            className="w-full h-full fixed"
            ref={splineContainer}
            onLoad={(app: Application) => {
              setSplineApp(app);
              bypassLoading();
            }}
            scene="/assets/skills-keyboard.spline"
          />
        )}
      </Suspense>
    </>
  );
};

export default AnimatedBackground;
