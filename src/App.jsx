import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Camera,
  Check,
  Crown,
  Gem,
  Heart,
  MessageCircle,
  Play,
  Shield,
  Sparkles,
  Stars,
  Trees,
  
} from "lucide-react";

const heroRack = "/hero-rack.jpg";
const coralHero = "/coral.jpg";
const warriorDetail = "/warrior.jpg";
const socialHands = "/social-hands.jpg";
const logoSeal = "/logo.jpg";
const galleryCoral = coralHero;
const galleryWarrior = warriorDetail;
const galleryRack = heroRack;
const manifestoImage = socialHands;

const styles = `
  * { box-sizing: border-box; }
  html { scroll-behavior: smooth; }
  body { margin: 0; font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; background:#07100b; color:#fff; }
  a { color: inherit; text-decoration: none; }
  .page {
    min-height: 100vh;
    overflow-x: hidden;
    background:
      radial-gradient(circle at top, rgba(54,95,72,.12), transparent 24%),
      radial-gradient(circle at bottom right, rgba(171,120,71,.08), transparent 20%),
      linear-gradient(180deg, #08100c 0%, #060c09 52%, #050906 100%);
    color:#fff;
  }
  .overlay-bg {
    position: fixed;
    inset: 0;
    pointer-events: none;
    background:
      radial-gradient(circle at 10% 0%, rgba(255,224,180,.05), transparent 20%),
      radial-gradient(circle at 90% 16%, rgba(79,128,98,.06), transparent 24%),
      linear-gradient(90deg, transparent 0%, rgba(255,255,255,.012) 50%, transparent 100%);
    opacity:.95;
  }
  .container { width: min(1320px, calc(100% - 56px)); margin: 0 auto; }
  .hero {
    position: relative;
    min-height: 100vh;
    border-bottom: 1px solid rgba(255,255,255,.08);
    overflow: hidden;
  }
  .hero::after {
    content:"";
    position:absolute;
    inset:auto 0 0 0;
    height:140px;
    background:linear-gradient(180deg, transparent, rgba(5,9,6,.85));
    pointer-events:none;
  }
  .hero-bg, .hero-bg img { position:absolute; inset:0; width:100%; height:100%; object-fit:cover; }
  .hero-bg img { opacity:.32; transform:scale(1.035); filter:saturate(1.04) contrast(1.04) brightness(.92); }
  .hero-shade { position:absolute; inset:0; background:linear-gradient(180deg, rgba(5,8,6,.18), rgba(5,8,6,.60), rgba(5,8,6,.96)); }
  .hero-radial { position:absolute; inset:0; background:radial-gradient(circle at 60% 6%, rgba(244,222,191,.08), transparent 26%); }
  .hero-inner { position:relative; min-height:100vh; display:flex; flex-direction:column; padding:34px 0 64px; }
  .nav {
    display:flex; justify-content:space-between; align-items:center; gap:16px;
    padding:14px 22px; border:1px solid rgba(255,255,255,.09);
    background:linear-gradient(180deg, rgba(255,255,255,.065), rgba(255,255,255,.028));
    backdrop-filter: blur(22px);
    box-shadow:0 16px 40px rgba(0,0,0,.18), inset 0 1px 0 rgba(255,255,255,.05);
    border-radius:999px; margin-bottom:52px;
  }
  .brand { display:flex; align-items:center; gap:14px; }
  .brand img { width:46px; height:46px; border-radius:999px; object-fit:cover; border:1px solid rgba(255,255,255,.12); box-shadow:0 8px 18px rgba(0,0,0,.15); }
  .brand-title { font-family: Georgia, "Times New Roman", serif; font-size: 1.2rem; color:#f6ead7; letter-spacing:-.01em; }
  .brand-sub { font-size:.72rem; letter-spacing:.36em; text-transform:uppercase; color:rgba(255,255,255,.46); margin-top:4px; }
  .hero-grid { display:grid; grid-template-columns: 1.02fr .98fr; gap:44px; align-items:center; flex:1; }
  .badge {
    display:inline-flex; align-items:center; gap:8px; border-radius:999px; padding:11px 18px;
    border:1px solid rgba(226,204,170,.18);
    background:linear-gradient(180deg, rgba(226,204,170,.14), rgba(226,204,170,.06));
    color:#f0debf; font-size:.88rem; box-shadow:0 10px 24px rgba(0,0,0,.12);
  }
  .headline {
    font-family: Georgia, "Times New Roman", serif;
    font-size: clamp(3.4rem, 8vw, 7rem);
    line-height:.90; letter-spacing:-.045em; color:#f7eddc; margin:26px 0 0; max-width: 10ch;
    text-wrap:balance;
  }
  .lead { margin-top:28px; max-width:760px; color:rgba(255,255,255,.76); font-size:1.12rem; line-height:1.98; }
  .hero-actions { display:flex; flex-wrap:wrap; gap:16px; margin-top:34px; }
  .btn {
    display:inline-flex; align-items:center; justify-content:center; gap:10px; border:none; cursor:pointer;
    border-radius:999px; padding:15px 24px; font-weight:600; transition:.24s ease;
  }
  .btn:hover { transform:translateY(-2px); }
  .btn-primary {
    background:linear-gradient(180deg, #f2e0c1 0%, #dbc196 100%); color:#26180e;
    box-shadow:0 16px 32px rgba(0,0,0,.20), inset 0 1px 0 rgba(255,255,255,.6);
  }
  .btn-primary:hover { background:linear-gradient(180deg, #f5e6cb 0%, #e1c89e 100%); }
  .btn-dark {
    background:linear-gradient(180deg, rgba(255,255,255,.10), rgba(255,255,255,.06));
    color:#fff; backdrop-filter:blur(14px); border:1px solid rgba(255,255,255,.08);
  }
  .btn-dark:hover { background:rgba(255,255,255,.15); }
  .btn-ghost { background:transparent; color:#fff; border:1px solid rgba(255,255,255,.10); }
  .btn-ghost:hover { background:rgba(255,255,255,.10); }
  .pill {
    display:inline-flex; align-items:center; gap:10px; border:1px solid rgba(255,255,255,.09);
    background:linear-gradient(180deg, rgba(255,255,255,.06), rgba(255,255,255,.03));
    padding:15px 22px; border-radius:999px; color:rgba(255,255,255,.74); box-shadow:0 10px 24px rgba(0,0,0,.12);
  }
  .card {
    border:1px solid rgba(255,255,255,.08);
    background:linear-gradient(180deg, rgba(255,255,255,.055), rgba(255,255,255,.025));
    backdrop-filter: blur(18px);
    border-radius:32px; overflow:hidden; box-shadow:0 24px 60px rgba(0,0,0,.18);
  }
  .hero-card { border-radius:40px; background:rgba(0,0,0,.22); box-shadow:0 38px 100px rgba(0,0,0,.40); }
  .hero-card-pad { padding:22px; }
  .editorial { position:relative; min-height:620px; border-radius:34px; overflow:hidden; border:1px solid rgba(255,255,255,.08); }
  .editorial img { width:100%; height:620px; object-fit:cover; display:block; }
  .editorial-overlay { position:absolute; inset:0; opacity:.24; }
  .editorial-radial { position:absolute; inset:0; background:radial-gradient(circle at top, rgba(255,255,255,.12), transparent 24%); }
  .editorial-copy {
    position:absolute; left:28px; right:28px; bottom:28px; padding:26px;
    border-radius:30px; border:1px solid rgba(255,255,255,.08);
    background:linear-gradient(180deg, rgba(0,0,0,.28), rgba(0,0,0,.50)); backdrop-filter:blur(24px);
  }
  .eyebrow { text-transform:uppercase; letter-spacing:.36em; font-size:.70rem; color:rgba(255,255,255,.50); }
  .editorial-title { font-family: Georgia, "Times New Roman", serif; font-size:2.7rem; color:#f5ead9; margin-top:12px; letter-spacing:-.02em; }
  .editorial-text { margin-top:10px; color:rgba(255,255,255,.78); font-size:1rem; }
  .tags { margin-top:16px; display:flex; flex-wrap:wrap; gap:8px; }
  .tag { display:inline-flex; align-items:center; padding:8px 13px; border-radius:999px; border:1px solid rgba(255,255,255,.09); background:rgba(255,255,255,.08); color:rgba(255,255,255,.86); font-size:.86rem; }
  .luxury-strip { display:grid; grid-template-columns: repeat(4, 1fr); gap:16px; margin-top:34px; }
  .luxury-stat { padding:20px 20px 18px; border-radius:22px; border:1px solid rgba(255,255,255,.07); background:linear-gradient(180deg, rgba(255,255,255,.05), rgba(255,255,255,.02)); }
  .luxury-stat-kicker { font-size:.68rem; text-transform:uppercase; letter-spacing:.28em; color:rgba(255,255,255,.42); }
  .luxury-stat-title { margin-top:10px; font-family: Georgia, "Times New Roman", serif; font-size:1.35rem; color:#f3e4ca; letter-spacing:-.02em; }
  .luxury-stat-copy { margin-top:8px; font-size:.92rem; line-height:1.75; color:rgba(255,255,255,.62); }
  section.block { padding:110px 0; }
  .section-head { display:flex; justify-content:space-between; align-items:end; gap:24px; margin-bottom:46px; }
  .section-title { font-family: Georgia, "Times New Roman", serif; font-size: clamp(2.7rem, 4vw, 4rem); color:#f6ecdc; margin-top:12px; letter-spacing:-.03em; text-wrap:balance; }
  .section-copy { margin-top:12px; max-width:780px; color:rgba(255,255,255,.68); line-height:1.95; font-size:1rem; }
  .muted-pill { border:1px solid rgba(255,255,255,.09); background:rgba(255,255,255,.05); padding:11px 17px; border-radius:999px; color:rgba(255,255,255,.58); }
  .grid-4 { display:grid; grid-template-columns: repeat(4, 1fr); gap:22px; }
  .identity-card {
    border-radius:32px; overflow:hidden; border:1px solid rgba(255,255,255,.08);
    background:linear-gradient(180deg, rgba(255,255,255,.05), rgba(255,255,255,.025)); cursor:pointer; text-align:left; transition:.24s ease;
    box-shadow:0 18px 38px rgba(0,0,0,.10);
  }
  .identity-card.active { border-color:rgba(227,205,172,.32); background:linear-gradient(180deg, rgba(255,255,255,.10), rgba(255,255,255,.04)); transform:translateY(-2px); }
  .identity-card:hover { background:rgba(255,255,255,.08); transform:translateY(-5px); box-shadow:0 28px 58px rgba(0,0,0,.16); }
  .identity-image-wrap { position:relative; height:308px; overflow:hidden; }
  .identity-image-wrap img { width:100%; height:100%; object-fit:cover; display:block; transition:transform .55s ease; }
  .identity-card:hover img { transform:scale(1.06); }
  .identity-image-overlay { position:absolute; inset:0; opacity:.16; }
  .identity-body { padding:22px; }
  .identity-top { display:flex; justify-content:space-between; gap:12px; }
  .identity-name { font-family: Georgia, "Times New Roman", serif; font-size:2rem; color:#f4e7d2; letter-spacing:-.02em; }
  .identity-mood { margin-top:6px; text-transform:uppercase; letter-spacing:.26em; font-size:.72rem; color:rgba(255,255,255,.45); }
  .identity-desc { margin-top:16px; color:rgba(255,255,255,.68); line-height:1.86; font-size:.96rem; }
  .identity-line { margin-top:12px; color:#ebdcbe; font-size:.98rem; }
  .grid-split { display:grid; grid-template-columns: 1.14fr .86fr; gap:26px; }
  .ar-wrap { position:relative; border-radius:36px; overflow:hidden; border:1px solid rgba(255,255,255,.08); background:#0c120e; min-height:680px; box-shadow:0 34px 78px rgba(0,0,0,.24); }
  .ar-wrap::before { content:""; position:absolute; inset:0; background: radial-gradient(circle at top, rgba(62,110,84,.18), transparent 35%), radial-gradient(circle at bottom right, rgba(179,122,70,.14), transparent 30%); }
  .ar-bg { position:absolute; inset:0; width:100%; height:100%; object-fit:cover; opacity:.86; }
  .ar-dark { position:absolute; inset:0; background:linear-gradient(to bottom, rgba(0,0,0,.08), rgba(0,0,0,.18), rgba(0,0,0,.34)); }
  .ar-frame { pointer-events:none; position:absolute; inset:0; }
  .ar-oval-a { position:absolute; left:20%; right:20%; top:22%; height:42%; border-radius:999px; border:1px solid rgba(167,243,208,.25); }
  .ar-oval-b { position:absolute; left:16%; right:16%; top:18%; height:50%; border-radius:999px; border:1px dashed rgba(255,255,255,.10); }
  .ar-scan { position:absolute; left:0; right:0; height:1px; background:linear-gradient(to right, transparent, rgba(167,243,208,.60), transparent); }
  .ar-orbit { position:absolute; left:50%; top:52%; transform:translate(-50%, -50%); }
  .ar-label { position:absolute; left:22px; top:22px; border-radius:999px; border:1px solid rgba(255,255,255,.09); background:rgba(0,0,0,.34); padding:10px 16px; letter-spacing:.28em; text-transform:uppercase; font-size:.70rem; color:rgba(255,255,255,.70); backdrop-filter: blur(10px); }
  .ar-bottom { position:absolute; left:22px; right:22px; bottom:22px; border-radius:24px; border:1px solid rgba(255,255,255,.09); background:rgba(0,0,0,.38); backdrop-filter:blur(22px); padding:20px; }
  .ar-bottom-row { display:flex; justify-content:space-between; align-items:center; gap:16px; }
  .stack { display:grid; gap:24px; }
  .pad-24 { padding:28px; }
  .card-title { font-family: Georgia, "Times New Roman", serif; font-size:2.15rem; color:#f5eada; margin-top:10px; letter-spacing:-.02em; }
  .small { font-size:.96rem; line-height:1.88; color:rgba(255,255,255,.68); }
  .progress-track { height:8px; width:100%; background:rgba(255,255,255,.10); border-radius:999px; overflow:hidden; margin-top:16px; }
  .progress-fill { height:100%; background:linear-gradient(90deg, rgba(227,205,172,.9), rgba(255,255,255,.65)); border-radius:999px; }
  .triple { display:flex; justify-content:space-between; margin-top:12px; font-size:.72rem; letter-spacing:.22em; text-transform:uppercase; color:rgba(255,255,255,.45); }
  .grid-2 { display:grid; grid-template-columns: repeat(2, 1fr); gap:12px; }
  .select-card { border-radius:22px; border:1px solid rgba(255,255,255,.09); background:rgba(0,0,0,.18); padding:18px; text-align:left; cursor:pointer; transition:.2s ease; }
  .select-card:hover { background:rgba(255,255,255,.05); transform:translateY(-2px); }
  .select-card.active { border-color:rgba(227,205,172,.28); background:rgba(227,205,172,.10); }
  .icon-box { width:46px; height:46px; display:flex; align-items:center; justify-content:center; border-radius:16px; background:linear-gradient(135deg, #f4e6ca, #be9552); color:#2b190c; margin-bottom:12px; box-shadow:0 10px 24px rgba(0,0,0,.14); }
  .label { font-weight:600; color:#fff; }
  .label-sub { margin-top:4px; font-size:.72rem; letter-spacing:.22em; text-transform:uppercase; color:rgba(255,255,255,.45); }
  .social-grid { display:grid; grid-template-columns: .96fr 1.04fr; gap:26px; }
  .social-image-card { min-height:680px; }
  .social-image-card .img { position:relative; min-height:680px; }
  .social-image-card img { width:100%; height:100%; min-height:680px; object-fit:cover; display:block; }
  .social-image-card .shade { position:absolute; inset:0; background:linear-gradient(to top, rgba(0,0,0,.56), rgba(0,0,0,.18), rgba(0,0,0,.03)); }
  .social-copy { position:absolute; left:34px; right:34px; bottom:34px; }
  .quote-card { padding:28px; }
  .quote-title { font-family: Georgia, "Times New Roman", serif; font-size:2.25rem; color:#f5eada; letter-spacing:-.02em; }
  .quote-text { margin-top:16px; color:rgba(255,255,255,.72); line-height:2; font-size:1rem; }
  .artisan { background:linear-gradient(135deg, rgba(227,205,172,.12), rgba(18,27,21,.65), rgba(8,12,9,.96)); box-shadow:0 20px 60px rgba(0,0,0,.28); }
  .check-row { display:flex; gap:12px; align-items:flex-start; }
  .check-dot { margin-top:4px; width:24px; height:24px; border-radius:999px; display:flex; align-items:center; justify-content:center; background:#e3cdac; color:#24170e; flex:0 0 auto; }
  .gallery-grid { display:grid; grid-template-columns: 1.15fr .85fr .85fr; gap:18px; margin-top:24px; }
  .gallery-card { position:relative; min-height:250px; border-radius:30px; overflow:hidden; border:1px solid rgba(255,255,255,.08); box-shadow:0 18px 40px rgba(0,0,0,.14); }
  .gallery-card img { width:100%; height:100%; object-fit:cover; display:block; }
  .gallery-card.tall { min-height:518px; }
  .gallery-note { position:absolute; left:18px; right:18px; bottom:18px; border-radius:20px; padding:14px 16px; background:linear-gradient(180deg, rgba(0,0,0,.18), rgba(0,0,0,.44)); border:1px solid rgba(255,255,255,.08); backdrop-filter: blur(14px); }
  .gallery-note-title { font-family: Georgia, "Times New Roman", serif; font-size:1.42rem; color:#f4e7d2; letter-spacing:-.02em; }
  .gallery-note-copy { margin-top:6px; font-size:.92rem; line-height:1.68; color:rgba(255,255,255,.74); }
  .manifesto {
    display:grid; grid-template-columns: .9fr 1.1fr; gap:24px; align-items:stretch;
    margin-top:12px;
  }
  .manifesto-left, .manifesto-right {
    border-radius:34px; border:1px solid rgba(255,255,255,.08); overflow:hidden;
    background:linear-gradient(180deg, rgba(255,255,255,.05), rgba(255,255,255,.025));
  }
  .manifesto-left { padding:34px; display:flex; flex-direction:column; justify-content:space-between; }
  .manifesto-mark { font-family: Georgia, "Times New Roman", serif; font-size:4rem; color:#ecd8b4; line-height:1; }
  .manifesto-title { font-family: Georgia, "Times New Roman", serif; font-size:3rem; color:#f6ecdc; letter-spacing:-.03em; margin-top:18px; }
  .manifesto-copy { margin-top:16px; color:rgba(255,255,255,.7); line-height:1.95; font-size:1rem; max-width:560px; }
  .manifesto-sign { margin-top:28px; color:#ead6b2; letter-spacing:.18em; text-transform:uppercase; font-size:.74rem; }
  .manifesto-right img { width:100%; height:100%; min-height:460px; object-fit:cover; display:block; filter:saturate(1.02) contrast(1.02); }
  .cta { padding-top:22px; padding-bottom:96px; }
  .cta-card { border-radius:44px; border:1px solid rgba(227,205,172,.16); background:linear-gradient(145deg, rgba(227,205,172,.14), rgba(19,31,23,.72), rgba(7,10,8,1)); box-shadow:0 28px 84px rgba(0,0,0,.36); overflow:hidden; }
  .cta-inner { position:relative; padding:44px 48px; }
  .cta-inner::after { content:""; position:absolute; right:0; top:0; width:228px; height:228px; border-radius:999px; background:rgba(227,205,172,.10); filter:blur(54px); }
  .cta-grid { position:relative; display:grid; grid-template-columns: 1fr auto; gap:24px; align-items:center; }
  .cta-title { font-family: Georgia, "Times New Roman", serif; font-size: clamp(2.5rem, 4vw, 3.9rem); color:#f5eada; margin-top:12px; max-width:800px; letter-spacing:-.03em; text-wrap:balance; }
  .cta-text { margin-top:16px; max-width:840px; color:rgba(255,255,255,.74); line-height:2; }
  @media (max-width: 1180px) {
    .hero-grid, .grid-4, .grid-split, .social-grid, .cta-grid, .luxury-strip, .gallery-grid, .manifesto { grid-template-columns: 1fr; }
    .section-head, .ar-bottom-row { display:grid; gap:16px; }
  }
  @media (max-width: 720px) {
    .container { width:min(100% - 24px, 1320px); }
    .nav { border-radius:28px; align-items:flex-start; padding:14px; }
    .brand-title { font-size:1rem; }
    .hero-card-pad, .cta-inner, .pad-24, .quote-card, .manifesto-left { padding:20px; }
    .editorial-copy, .social-copy { left:18px; right:18px; bottom:18px; padding:18px; }
    .grid-2 { grid-template-columns: 1fr; }
    section.block { padding:84px 0; }
    .headline { max-width: none; }
    .manifesto-title { font-size:2.35rem; }
  }
`;

function ButtonBase({ children, href, onClick, className = "", blank = false, type = "button" }) {
  const cls = `btn ${className}`;
  if (href) {
    return (
      <a href={href} target={blank ? "_blank" : undefined} rel={blank ? "noreferrer" : undefined} className={cls}>
        {children}
      </a>
    );
  }
  return (
    <button type={type} onClick={onClick} className={cls}>
      {children}
    </button>
  );
}

function Card({ children, className = "" }) {
  return <div className={`card ${className}`}>{children}</div>;
}

function Badge({ children, className = "" }) {
  return <span className={`tag ${className}`}>{children}</span>;
}

function ProgressBar({ value }) {
  return (
    <div className="progress-track">
      <div className="progress-fill" style={{ width: `${value}%` }} />
    </div>
  );
}

const stones = [
  { id: "warrior", name: "The Warrior", stone: "Tiger’s Eye", vibe: "For courage, clarity, confidence, luck, and focus.", line: "You walked in. The room noticed.", mood: "Bold presence", color: "linear-gradient(to bottom, rgba(252,211,77,.40), rgba(180,83,9,.35), rgba(10,10,10,.9))", image: warriorDetail },
  { id: "heritage", name: "The Heritage", stone: "Natural Coral", vibe: "For wealth, womanhood, legacy, vitality, and culture.", line: "Some pieces are worn. This one is inherited.", mood: "Royal warmth", color: "linear-gradient(to bottom, rgba(253,186,116,.35), rgba(185,28,28,.30), rgba(10,10,10,.9))", image: coralHero },
  { id: "anchor", name: "The Anchor", stone: "Lava Stone", vibe: "For grounding, strength, emotional stability, and power.", line: "Strong. Grounded. Unmistakable.", mood: "Grounded calm", color: "linear-gradient(to bottom, rgba(214,211,209,.10), rgba(68,64,60,.25), rgba(10,10,10,.9))", image: heroRack },
  { id: "panther", name: "The Panther", stone: "Blue Agate", vibe: "For power, beauty, and presence.", line: "She doesn’t ask for attention. It finds her.", mood: "Electric elegance", color: "linear-gradient(to bottom, rgba(103,232,249,.30), rgba(29,78,216,.30), rgba(10,10,10,.9))", image: socialHands },
];

const charms = [
  { id: "crown", label: "Crown", meaning: "Authority", icon: Crown, symbol: "♛" },
  { id: "anchor", label: "Anchor", meaning: "Stability", icon: Shield, symbol: "⚓" },
  { id: "lion", label: "Lion", meaning: "Courage", icon: Sparkles, symbol: "🦁" },
  { id: "hamsa", label: "Hamsa", meaning: "Blessing", icon: Heart, symbol: "🪬" },
  { id: "buddha", label: "Buddha", meaning: "Peace", icon: Trees, symbol: "☸" },
  { id: "wolf", label: "Wolf", meaning: "Instinct", icon: Stars, symbol: "🐺" },
];

const editorialNotes = [
  "Hand-selected stones. Handmade one at a time.",
  "Crafted by nature. Finished by hand.",
  "No two pieces are ever identical.",
];

function OrbitalBracelet({ tone = "amber", symbols = [] }) {
  const palette = {
    amber: ["#8a5b24", "#6a3f17", "#d19a3a", "#3e2611"],
    coral: ["#d3562d", "#f08b66", "#b63a1f", "#7e2b18"],
    emerald: ["#195d46", "#3aa175", "#7bc5a6", "#0e2b22"],
    midnight: ["#12425f", "#2b7da8", "#4bb4d9", "#061521"],
  };
  const colors = palette[tone] || palette.amber;
  return (
    <div style={{ position: "relative", width: 360, height: 360 }}>
      <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 22, ease: "linear" }} style={{ position: "absolute", inset: 0 }}>
        {Array.from({ length: 18 }).map((_, i) => {
          const angle = (i / 18) * Math.PI * 2;
          const x = Math.cos(angle) * 132;
          const y = Math.sin(angle) * 108;
          return (
            <div
              key={i}
              style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                width: 28,
                height: 28,
                borderRadius: 999,
                border: "1px solid rgba(255,255,255,.15)",
                boxShadow: "0 12px 30px rgba(0,0,0,.25)",
                transform: `translate(${x}px, ${y}px) translate(-50%, -50%)`,
                background: `radial-gradient(circle at 32% 28%, rgba(255,255,255,.45), ${colors[i % colors.length]} 55%, rgba(0,0,0,.55) 100%)`,
              }}
            />
          );
        })}
      </motion.div>
      <motion.div animate={{ rotate: -360 }} transition={{ repeat: Infinity, duration: 26, ease: "linear" }} style={{ position: "absolute", inset: 0 }}>
        {Array.from({ length: 14 }).map((_, i) => {
          const angle = (i / 14) * Math.PI * 2;
          const x = Math.cos(angle) * 96;
          const y = Math.sin(angle) * 76;
          return (
            <div
              key={i}
              style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                width: 23,
                height: 23,
                borderRadius: 999,
                border: "1px solid rgba(255,255,255,.10)",
                boxShadow: "0 10px 25px rgba(0,0,0,.2)",
                transform: `translate(${x}px, ${y}px) translate(-50%, -50%)`,
                background: `radial-gradient(circle at 32% 28%, rgba(255,255,255,.40), ${colors[(i + 1) % colors.length]} 58%, rgba(0,0,0,.45) 100%)`,
              }}
            />
          );
        })}
      </motion.div>
      {symbols.slice(0, 3).map((symbol, idx) => (
        <motion.div
          key={`${symbol}-${idx}`}
          drag
          dragMomentum={false}
          whileHover={{ scale: 1.08 }}
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            width: 56,
            height: 56,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 18,
            border: "1px solid rgba(231,210,170,.35)",
            background: "linear-gradient(135deg, #f5e7cb, #bc9250)",
            color: "#2e1b0c",
            fontSize: 28,
            boxShadow: "0 18px 40px rgba(0,0,0,.35)",
            cursor: "grab",
            transform: `translate(${idx * 46 - 46}px, ${idx % 2 === 0 ? -18 : 26}px)`,
          }}
        >
          {symbol}
        </motion.div>
      ))}
      <div style={{ position: "absolute", insetInline: 48, insetBlock: 64, borderRadius: 999, border: "1px dashed rgba(255,255,255,.12)" }} />
      <div style={{ position: "absolute", inset: 0, borderRadius: 999, background: "radial-gradient(circle, rgba(255,255,255,.10), transparent 55%)", filter: "blur(24px)" }} />
    </div>
  );
}

function ARMirror({ activeTone, selectedSymbols, cameraOn, onToggleCamera }) {
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const [error, setError] = useState("");
  const [scan, setScan] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setScan((s) => (s + 2) % 100), 80);
    return () => clearInterval(id);
  }, []);

  useEffect(() => () => {
    if (streamRef.current) streamRef.current.getTracks().forEach((t) => t.stop());
  }, []);

  const handleToggle = async () => {
    if (cameraOn) {
      if (streamRef.current) streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
      setError("");
      onToggleCamera(false);
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "user" }, audio: false });
      streamRef.current = stream;
      if (videoRef.current) videoRef.current.srcObject = stream;
      setError("");
      onToggleCamera(true);
    } catch {
      setError("Camera access is unavailable in this preview, but the full AR illusion UI remains interactive.");
      onToggleCamera(false);
    }
  };

  return (
    <div className="ar-wrap">
      {cameraOn ? (
        <video ref={videoRef} autoPlay muted playsInline className="ar-bg" />
      ) : (
        <>
          <img src={socialHands} alt="AR preview background" className="ar-bg" />
          <div className="ar-dark" />
        </>
      )}
      <div className="ar-frame">
        <motion.div animate={{ opacity: [0.25, 0.55, 0.25] }} transition={{ repeat: Infinity, duration: 2.8 }} className="ar-oval-a" />
        <div className="ar-oval-b" />
        <div className="ar-scan" style={{ top: `${18 + scan * 0.38}%` }} />
        <div className="ar-orbit">
          <OrbitalBracelet tone={activeTone} symbols={selectedSymbols} />
        </div>
      </div>
      <div className="ar-label">AR Mirror • Wrist Tracking Illusion</div>
      <div className="ar-bottom">
        <div className="ar-bottom-row">
          <div>
            <div style={{ fontSize: 15, fontWeight: 600 }}>This is how it feels.</div>
            <div className="small" style={{ marginTop: 4 }}>Grounded. Present. Unmistakable. Your bracelet appears suspended over the wrist with cinematic depth.</div>
            {error && <div style={{ marginTop: 8, fontSize: 12, color: "rgba(253,230,138,.95)" }}>{error}</div>}
          </div>
          <ButtonBase onClick={handleToggle} className="btn-primary">
            <Camera size={16} /> {cameraOn ? "Hide Camera" : "Activate Camera"}
          </ButtonBase>
        </div>
      </div>
    </div>
  );
}

export default function EmysARJewelryExperience() {
  const [selectedStone, setSelectedStone] = useState(stones[0]);
  const [selectedCharmIds, setSelectedCharmIds] = useState(["crown", "lion"]);
  const [size, setSize] = useState("10mm");
  const [cameraOn, setCameraOn] = useState(false);
  const [ritualStep, setRitualStep] = useState(1);

  const selectedSymbols = useMemo(
    () => selectedCharmIds.map((id) => charms.find((c) => c.id === id)?.symbol).filter(Boolean),
    [selectedCharmIds]
  );

  const activeTone = useMemo(() => {
    if (selectedStone.id === "heritage") return "coral";
    if (selectedStone.id === "panther") return "midnight";
    if (selectedStone.id === "anchor") return "emerald";
    return "amber";
  }, [selectedStone.id]);

  const toggleCharm = (id) => {
    setSelectedCharmIds((prev) => prev.includes(id) ? prev.filter((item) => item !== id) : prev.length < 3 ? [...prev, id] : [...prev.slice(1), id]);
  };

  const whatsappHref = "https://wa.me/2348034102382?text=Hello%20Emy%E2%80%99s%20Bracelets%2C%20I%20want%20you%20to%20hand-craft%20this%20piece%20for%20me.";

  return (
    <div className="page">
      <style>{styles}</style>
      <div className="overlay-bg" />

      <section className="hero">
        <div className="hero-bg">
          <img src={heroRack} alt="Emy's Bracelets collection" />
          <div className="hero-shade" />
          <div className="hero-radial" />
        </div>

        <div className="container hero-inner">
          <div className="nav">
            <div className="brand">
              <img src={logoSeal} alt="Emy's Bracelets logo" />
              <div>
                <div className="brand-title">Emy’s Gemstone Bracelets</div>
                <div className="brand-sub">Luxury craft • Mother Nature</div>
              </div>
            </div>
            <ButtonBase href={whatsappHref} blank className="btn-primary">
              <MessageCircle size={16} /> Hand-Craft This For Me
            </ButtonBase>
          </div>

          <div className="hero-grid">
            <div style={{ maxWidth: 760 }}>
              <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
                <div className="badge">Some jewellery is bought. Some is felt.</div>
                <h1 className="headline">Wear the Art of Mother Nature</h1>
                <p className="lead">
                  Every piece tells a story. Now, see yours come to life — with cinematic styling, symbolic detail, and a virtual try-on experience designed to feel like luxury before it ever arrives at your door.
                </p>
                <div className="hero-actions">
                  <ButtonBase href="#identity" className="btn-dark">
                    <Play size={16} /> Begin Your Experience
                  </ButtonBase>
                  <div className="pill"><Heart size={16} color="#f0debf" /> Handmade with Love</div>
                </div>
                <div className="luxury-strip">
                  <div className="luxury-stat">
                    <div className="luxury-stat-kicker">Artisanal</div>
                    <div className="luxury-stat-title">Crafted one at a time</div>
                    <div className="luxury-stat-copy">Each bracelet is designed to feel intimate, considered, and unmistakably personal.</div>
                  </div>
                  <div className="luxury-stat">
                    <div className="luxury-stat-kicker">Emotional Luxury</div>
                    <div className="luxury-stat-title">Story before ornament</div>
                    <div className="luxury-stat-copy">The page now sells identity, mood, and symbolism before product details.</div>
                  </div>
                  <div className="luxury-stat">
                    <div className="luxury-stat-kicker">Visual Direction</div>
                    <div className="luxury-stat-title">Editorial polish</div>
                    <div className="luxury-stat-copy">More contrast, more depth, and more breathing room for a richer first impression.</div>
                  </div>
                  <div className="luxury-stat">
                    <div className="luxury-stat-kicker">Conversion</div>
                    <div className="luxury-stat-title">Private-order feel</div>
                    <div className="luxury-stat-copy">The flow now feels closer to a bespoke consultation than a standard online store.</div>
                  </div>
                </div>
              </motion.div>
            </div>

            <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }}>
              <Card className="hero-card">
                <div className="hero-card-pad">
                  <div className="editorial">
                    <img src={selectedStone.image} alt={selectedStone.name} />
                    <div className="editorial-overlay" style={{ background: selectedStone.color }} />
                    <div className="editorial-radial" />
                    <div className="editorial-copy">
                      <div className="eyebrow">Editorial spotlight</div>
                      <div className="editorial-title">{selectedStone.name}</div>
                      <div className="editorial-text">{selectedStone.line}</div>
                      <div className="tags">
                        <Badge>{selectedStone.stone}</Badge>
                        <Badge>{size === "8mm" ? "Refined 8mm" : "Bold 10mm"}</Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      <section id="identity" className="block container">
        <div className="section-head">
          <div>
            <div className="eyebrow" style={{ color: "rgba(167,243,208,.55)" }}>Choose your energy</div>
            <div className="section-title">Who are you today?</div>
            <div className="section-copy">This is not a product filter. It is an emotional entry point. Pick the mood that feels most like your presence.</div>
          </div>
          <div className="muted-pill">Quiet luxury. Strong identity.</div>
        </div>

        <div className="grid-4">
          {stones.map((stone) => (
            <button key={stone.id} className={`identity-card ${selectedStone.id === stone.id ? "active" : ""}`} onClick={() => setSelectedStone(stone)}>
              <div className="identity-image-wrap">
                <img src={stone.image} alt={stone.name} />
                <div className="identity-image-overlay" style={{ background: stone.color }} />
              </div>
              <div className="identity-body">
                <div className="identity-top">
                  <div>
                    <div className="identity-name">{stone.name}</div>
                    <div className="identity-mood">{stone.mood}</div>
                  </div>
                  {selectedStone.id === stone.id ? <Check size={20} color="#e8d4b1" /> : null}
                </div>
                <div className="identity-desc">{stone.vibe}</div>
                <div className="identity-line">“{stone.line}”</div>
              </div>
            </button>
          ))}
        </div>
      </section>

      <section className="block container" style={{ paddingTop: 24 }}>
        <div className="grid-split">
          <ARMirror activeTone={activeTone} selectedSymbols={selectedSymbols} cameraOn={cameraOn} onToggleCamera={setCameraOn} />

          <div className="stack">
            <Card>
              <div className="pad-24">
                <div className="eyebrow" style={{ color: "rgba(167,243,208,.55)" }}>Craft your talisman</div>
                <div className="card-title">A ritual, not a checkout.</div>
                <div className="small" style={{ marginTop: 12 }}>The most desirable luxury journeys feel personal. So this flow is designed like a private styling ritual — from stone to symbol to final presence.</div>
                <ProgressBar value={ritualStep * 33.33} />
                <div className="triple"><span>Stone</span><span>Symbol</span><span>Presence</span></div>
              </div>
            </Card>

            <Card>
              <div className="pad-24">
                <div style={{ display: "flex", justifyContent: "space-between", gap: 16, alignItems: "center" }}>
                  <div>
                    <div className="eyebrow">Step 1</div>
                    <div className="card-title">Choose your stone</div>
                  </div>
                  <ButtonBase onClick={() => setRitualStep(1)} className="btn-ghost">Edit</ButtonBase>
                </div>
                <div className="small" style={{ marginTop: 10 }}>{selectedStone.stone} • {selectedStone.vibe}</div>
              </div>
            </Card>

            <Card>
              <div className="pad-24">
                <div style={{ display: "flex", justifyContent: "space-between", gap: 16, alignItems: "center" }}>
                  <div>
                    <div className="eyebrow">Step 2</div>
                    <div className="card-title">Choose your power symbol</div>
                  </div>
                  <ButtonBase onClick={() => setRitualStep(2)} className="btn-ghost">Edit</ButtonBase>
                </div>
                <div className="grid-2" style={{ marginTop: 20 }}>
                  {charms.map((charm) => {
                    const Icon = charm.icon;
                    const active = selectedCharmIds.includes(charm.id);
                    return (
                      <button key={charm.id} className={`select-card ${active ? "active" : ""}`} onClick={() => toggleCharm(charm.id)}>
                        <div className="icon-box"><Icon size={20} /></div>
                        <div className="label">{charm.label}</div>
                        <div className="label-sub">{charm.meaning}</div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </Card>

            <Card>
              <div className="pad-24">
                <div style={{ display: "flex", justifyContent: "space-between", gap: 16, alignItems: "center" }}>
                  <div>
                    <div className="eyebrow">Step 3</div>
                    <div className="card-title">Choose your presence</div>
                  </div>
                  <ButtonBase onClick={() => setRitualStep(3)} className="btn-ghost">Edit</ButtonBase>
                </div>
                <div className="grid-2" style={{ marginTop: 20 }}>
                  {[
                    { id: "8mm", title: "Refined", desc: "Delicate elegance. Quiet, polished, precise." },
                    { id: "10mm", title: "Bold", desc: "Undeniable presence. Stronger visual authority." },
                  ].map((option) => (
                    <button key={option.id} className={`select-card ${size === option.id ? "active" : ""}`} onClick={() => setSize(option.id)}>
                      <div className="card-title" style={{ fontSize: "1.8rem", marginTop: 0 }}>{option.title}</div>
                      <div className="small" style={{ marginTop: 8 }}>{option.desc}</div>
                    </button>
                  ))}
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <section className="block container">
        <div className="social-grid">
          <Card className="social-image-card">
            <div className="img">
              <img src={socialHands} alt="Customers holding brochure and bracelets" />
              <div className="shade" />
              <div className="social-copy">
                <div className="eyebrow" style={{ color: "rgba(167,243,208,.55)" }}>Worn with confidence</div>
                <div className="section-title" style={{ fontSize: "clamp(2rem, 3vw, 3rem)" }}>Real hands. Real energy. Real desire.</div>
                <div className="section-copy" style={{ color: "rgba(255,255,255,.72)", maxWidth: 640 }}>The strongest form of social proof is not a quote. It is evidence of belonging. These pieces do not sit in catalogues. They move in the world, on real wrists, with real presence.</div>
              </div>
            </div>
          </Card>

          <div className="stack">
            {[
              { title: "The feeling first", quote: "I saw it and immediately knew it was not ordinary. It felt personal before I even wore it." },
              { title: "Crafted one at a time", quote: "That handmade finish changes everything. You can feel the difference in the details." },
              { title: "A quiet statement", quote: "It does not need to shout. It simply looks expensive, meaningful, and beautifully intentional." },
            ].map((item) => (
              <Card key={item.title}>
                <div className="quote-card">
                  <div className="quote-title">{item.title}</div>
                  <div className="quote-text">“{item.quote}”</div>
                </div>
              </Card>
            ))}

            <Card className="artisan">
              <div className="pad-24">
                <div className="eyebrow" style={{ color: "rgba(234,218,191,.70)" }}>Artisanal standard</div>
                <div className="stack" style={{ marginTop: 16 }}>
                  {editorialNotes.map((note) => (
                    <div key={note} className="check-row">
                      <div className="check-dot"><Check size={14} /></div>
                      <div className="small" style={{ color: "rgba(255,255,255,.76)" }}>{note}</div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <section className="block container" style={{ paddingTop: 0 }}>
        <div className="section-head" style={{ marginBottom: 24 }}>
          <div>
            <div className="eyebrow" style={{ color: "rgba(167,243,208,.55)" }}>Curated moments</div>
            <div className="section-title">A richer gallery for a more premium first impression.</div>
            <div className="section-copy">Clients judge quality in seconds. So the visual rhythm now feels more editorial — stronger image hierarchy, cleaner storytelling, and a sharper sense of luxury value.</div>
          </div>
        </div>
        <div className="gallery-grid">
          <div className="gallery-card tall">
            <img src={galleryRack} alt="Curated bracelet collection display" />
            <div className="gallery-note">
              <div className="gallery-note-title">The world of the brand</div>
              <div className="gallery-note-copy">A fuller sense of abundance, variety, and craftsmanship makes the brand feel established and worthy of trust.</div>
            </div>
          </div>
          <div className="gallery-card">
            <img src={galleryCoral} alt="Natural coral bracelet close-up" />
            <div className="gallery-note">
              <div className="gallery-note-title">Heritage luxury</div>
              <div className="gallery-note-copy">Warmer tones bring culture, femininity, and legacy into the visual story.</div>
            </div>
          </div>
          <div className="gallery-card">
            <img src={galleryWarrior} alt="Tiger's Eye warrior bracelet close-up" />
            <div className="gallery-note">
              <div className="gallery-note-title">Statement detail</div>
              <div className="gallery-note-copy">Close-up metalwork and bead texture increase perceived value instantly.</div>
            </div>
          </div>
          <div className="gallery-card">
            <img src={socialHands} alt="Emy's brochure held with bracelet pieces" />
            <div className="gallery-note">
              <div className="gallery-note-title">Human proof</div>
              <div className="gallery-note-copy">Real hands and real pieces create emotional trust faster than generic testimonials.</div>
            </div>
          </div>
          <div className="gallery-card">
            <img src={heroRack} alt="Bracelet rack arrangement" />
            <div className="gallery-note">
              <div className="gallery-note-title">Color abundance</div>
              <div className="gallery-note-copy">A richer palette helps the collection feel alive, expansive, and visually irresistible.</div>
            </div>
          </div>
        </div>
      </section>

      <section className="block container" style={{ paddingTop: 8, paddingBottom: 28 }}>
        <div className="manifesto">
          <div className="manifesto-left">
            <div>
              <div className="eyebrow" style={{ color: "rgba(167,243,208,.55)" }}>Brand manifesto</div>
              <div className="manifesto-mark">“</div>
              <div className="manifesto-title">Luxury that feels personal before it is owned.</div>
              <div className="manifesto-copy">
                Emy’s Bracelets should not feel like a typical product page. It should feel like a private presentation of meaning, craft, and beauty — where every stone carries emotional weight, every composition suggests rarity, and every section tells the client this brand is ready for a higher market position.
              </div>
              <div className="manifesto-copy">
                The goal is not to look busy. The goal is to look expensive, intentional, and unmistakably composed.
              </div>
            </div>
            <div className="manifesto-sign">Crafted by nature • finished by hand</div>
          </div>
          <div className="manifesto-right">
            <img src={manifestoImage} alt="Emy's bracelets with brochure in hand" />
          </div>
        </div>
      </section>

      <section className="cta container">
        <div className="cta-card">
          <div className="cta-inner">
            <div className="cta-grid">
              <div>
                <div className="eyebrow" style={{ color: "rgba(234,218,191,.72)" }}>Final couture moment</div>
                <div className="cta-title">We will handcraft this piece for you.</div>
                <div className="cta-text">
                  From the first stone to the final symbol, every bracelet is assembled with emotion, intention, and finish. This is not mass luxury. This is intimate luxury — selected by hand, made one at a time, and designed to feel like yours before it even arrives.
                </div>
                <div className="tags" style={{ marginTop: 20 }}>
                  <Badge>{selectedStone.stone}</Badge>
                  <Badge>{size}</Badge>
                  {selectedCharmIds.map((id) => {
                    const charm = charms.find((c) => c.id === id);
                    return charm ? <Badge key={id}>{charm.label}</Badge> : null;
                  })}
                </div>
              </div>
              <ButtonBase href={whatsappHref} blank className="btn-primary" style={{ height: 56 }}>
                <Sparkles size={18} /> Send Your Design to Emy <ArrowRight size={18} />
              </ButtonBase>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
