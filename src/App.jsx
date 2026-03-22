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
  Trees
} from "lucide-react";

const heroRack = "data:image/webp;base64,UklGRvSCAQBXRUJQVlA4IOiCAQBQ9QadASqEAyoDPp1Am0ilo6MmLBKt+MATiU3JIP3wOa3EYOCNnsM/N8IfJbJUbozdP1i9C0evI/iPql91j/P38e4f+rz3/Xe9j/5PXf/PvUq6Gvnn8zL1X/0T0Mv+X17XpU+bH62H714WL/w/Pf8l/l/+v4W+g/kh6Q+Xv2T/T8z/6L+1sn7Nb6bain5//fPRWjBuI/ivKD/b9D/EM4qagj5Mf/V///Sr+kepD0/z+ZPtzJ0S4f53wdW/+1lAQakOXa7x5sA6XWWXa+snJTQlq/psvYZ8JwOhVDcaE5iYz/8lUs9HK80UrhTlGRiBmLDKdPp3YEdkLNmmLVxlTQ1ew9eVJrtaX+wV9LuSP58hWER01TF8yPVfq9QIeA5ptg3lb9/vzTiXOxg5ufrzIkGI24fzBGYImFDC93IPcnlj2hGOZ3ycGuN0R5mPdI+UdmWIb+AeUXD/heRVAcSReuygHU/fz2hDPt9RaYWtgAP8QWTJ56hhhoIeBwcSyODYiuJp/hWacZ+lXqV8XuGf53RqoViX3fNVSpbHZh51+Lt/5/eHge+pc1nxUm5x2HhMzlwIrkg2NRo6GwNnGAXYWCscLPXiFtQs/4fvM4TTt0W4nlfKhFEoAywoG331ShD1l9UrBbNot0xG6me8MnHM/tD93OJOpsetMBPmaERhZNOmSJGP69t7mp+e3R3mcd22q+/NgZtW2xMV0r7150AUdNjF70rNt0xomRmCzqDGfxGgcnyw8yLAI0MoC5X3t7mWqi0SRwnDTqHq8/RspzkoOCmrP5gVGs1n63AMGjzf44T12Dm+mjOOe4SdvWR7dnLcw4Cp9s+WnX9z3Sm8Xm01+F9ho5XAxRT2A/FiiYV/cf8GnK5aLn2EdtpIRbjZ9y91T3JGtYopkNIbfWZpQKXCUR4yAXf3RJXhgyS5/3mkB0Ds1BC7A+g7kpIjVjL3fM0w9vSojyc1ZL+7O0eGy7DwqGxph3glxkn4D8MPfZ37+rP3yZNrc7zOAdbBRXnBZxPrM4AO8lT1jlbRN7A76KH3q9ny3zM0HySLmf7Wn12VwE427mfbS6m+EljlwmPjXV+iuETXyxB1NYnM9mJq6VGifIYWIUhUve9w7nJfuZqwcxv2C1rQ8RQfMPRWu93Zs7KPKds+66ZwSEnl7bl1O4R/oadWQxjS+MMx78vYREYQ3iQdi2g2YzZ0hB0uhAiOQpK5/8M2aUuWIOlJV0gPTktCW7jVaD0M5C8YaHpb59Bx34Tyo8RxQgk1aRj8Tiynm3l7KIm0Rfrv9bWmIjE9NWSFagF8wPEl+4N0aTqL2y1Z4LUw+lGtVmXfQ5vvUrdmFBYkKh4u1pFoqWEWVg0xOL+Spq3LFrtQoOqGQqbGSz7pZMRkI5tP+M7uN6A2TYumxrf04k+V6ei6rO3p6nBT0N3FJ9If3N38ZP3q75Dth0J1YxSx/kigajT6k30I8QWl4K9MNuH05NwCvz5+7kW+gF0lclvKtiYSkItF0m9AikPHU0kJMWc+Yd2A6oymPzncW3Cj7YlJLiAB9P5VA9Jm0Ke7S30Omco4FUt8C9I1E7vh3RF8CK+iQ7q7SUpEUwOWmBWnJbM4H18jD5wJWt5u0GRIok3j7rth2S79aMrh8d+0WiNyR0OKmHnZQ9a8U1I5VNmcc5vD37ywGiMj4Bzqeo/CC6vMIW4ehAlSf/3XjC0SGxYHoWnW8mvxZW8ynvZ0HDpzNGyLeTSFTue99i/WvPN1wS8J8/g2xFdGu6fN8i/7JxthHyJ/UkVv6zNpdBfj0ZfT4rBUBwb+byCw4zcxvfpV9jBAgAA";
const coralHero = "data:image/webp;base64,UklGRqagAABXRUJQVlA4IJqgAACwKgGdASqEA4QDPm02mUskJCMhLQBOiSgB8A0AJaQAA3AA/vu1LF5hCHpKk2tdBPtk7FbQ4/fYG2a5NPiSL7fN9jS5F/2jEN0/MPk1LRe+oCulFDENxSH2U5FD6JdL3NKh3z40B0n7QZQrNmnB3PX+gY6jLEz4+4f+Y4g6nfwc5ezwXQgxKAHj5Q+G8uQ9kc/NGLy3b6gr5WrY7AHd69O0Nh5GtE6Fs7nQzO/0ph7qxX4GyQ5yUwWn7IQd9Hj5H89DVwA7qz5x5P2W1xF4jA2yjR0qRqqejQZXmMtaEZqUioeZ3sTGtD8m7MWUlaBFrSr/XAQYmuPwjglwmf6+6gYDL3aQYBQ8lhfowbDSm8ZQVkxYW6V4J+LIEY3JHQnBcsYwNLJ0dxqNv0viN4iYZSOeaoPtqQpgt1gRrE/lX4Qf+e8kVVmNUH6VY6XANR4DlycPHh8nz1cX0B+8upCaW6mQpWwz5h8S1or77e5K/GvjlqnG3tbkP6V1v7g4Wkn0+glPhZ0aJ0tVIBLPQf4dfO+lDk0HefzbDIOJ8loqKn6Hdhzfa3BNG9m0c6ym1cR6uvkbIcjMdou3OsM4Rr6JSYkNZNoV5gDCEf9wAylcIURdUPNQHjvVtAzc/4kq4pIhB1wDUbe3A7QSYbA+dcvR7+T9Q2gJkbaShwQJdGwFYs8i/JKlT0l0SgD7a8ryqI0i35VwP1if7wS3vhQxwY6dHb6FQqsC1BBXj/G6z0TXYpYg4LBTnJrnpD0DPMTnMknB8m4iL0bkr2WNvQy5g8slE44iVuzpxJ3ml8jI6C4QfHzN8w6So2K5vRSt3ekNzjEl5sHz3SzsA1B8j0Kz9shO0+2K7o1L9TeJ8/PN8Bcw3hQbP2Zk5f7gbqpbLK0AA";
const warriorDetail = "data:image/webp;base64,UklGRg4RAABXRUJQVlA4IAIRAAAwRwCdASqEA4MDPm02mUskJCMhK6YhoAgAJaQAATa6B44AAP7+/fP+0/wj+P8x+X9f7f2jdrPFf87fR8wPV7u6gkGpv6i++f9/5f+jX29V7/WQf8H7f/P4k/U/1H9l/X/3N+mP+7/2L8t/5f9L+L/0v5b/p/3v8U/J/0f+f/0v6v9P/sf1v9r/mv1P2T2yJbP+03P6Uce94i2zvZP3h8L2bWn4cOjc7nB3Zsn2CP+10I9Z1kC1uLecwJd8Q7gj7n2gSz4S06kJ0mHcFJ0s+1nxZm3mG90r+6JmLKtL9Oe5TvhmydU0J4H8Hm4PFBVtpZVn8E4xVqk5e9dZOU7vGcN8F1uBbjN2U5WwzJk3cd3Tn7gWqk7N6JpXSIe8GjxvZkA6rDJgPpG6T4l3qra2p5lxYQO7N8DgJe7HPmMPqqEkdwV7dyk+3qptlYXQ4nEFwK9XrSd8r6k5IGVC6Tf2xj12FqgN3JbWXylfpuN3j1k+pr6t5vlC3Uqv9qQ+2r7uWQ70Vw4b25jv2Q0QSM3FV8qXVW8qk0oLZ3eUyQ1WiyEcyO4C1h6D3+CeTr8W1VJd4HAg3WX1fzJm3z2t+6W18Ft+z1u7q4ZV+k23qW25Rxk90dP4g2M9eT2gwAq6xR2X9c2f1bK+JbZ6xKq8gcfv6mV7rE6gVgflO7jI0n5VnZk2b8v5uH2V+0n1V9lP/5L+r/8v+v/pv9D+V/6f83/3v8L/l/6v+9/8f+2/6f+o/2P+3/4v+7/9X9L/3P9v/4P2P5v9f/7f+v/if9n+z/0v7T9j+L/Zv5T+j/6r+8/4f+z/4f+N/5f/Jf0v+v8n/K/6P/X/0P8Ff6v8X/K/1f8L+g/9X/ef7f/jf+7/1v+z/3v9d/9n+9v5b/4v+N/6f/Vf8r+R/2v9v/L/5n+H/2/1v+T/4v+X/2v8T/1v9j/1f+f/8f+R/3v9T/5f+3/0P9P/qv7j/gAA";
const socialHands = "data:image/webp;base64,UklGRm6GAABXRUJQVlA4IFKGAADQMACdASqjA4QDPm02mUskJCMhLQBOiSgB8A0AJaQAA3AA/vu4X7g9I1q2x9EF0Qz1j7tzCWhY8+ndqzvF1s6KQz86Gm/K0V0Ckgxj4mF3vXYJ4qpdzQe0Wz6lYyQeAgVZ+8Vw5S0sS4zRxfvxVnI3Qe64dNt0xBrmcqA+NVgbF1KQ1xqF6a8lTXgRlwq0l+9tQ9k25qk7b4KBA8WZz8W6dG5oef4I0lQZPqVZkTy6V6w9eT2Dd6gkQ/1qfD9uX7D7beH0GxW2B3FCv4wxWjxz6Qt+5Ajv9esS4AKwBCxAr+Q8uYfJkQpT7m46G7gfrL0yU7bLZbFK9p0T7xU+19px1m7xYjB7T0C4mQIK1j4KxehEpoL3jkG03TAVb0Ab8hBQUK0yA0y7p3WkN9sWc1uIpxO2w7O/JrMcnNCWmU2m+PUpJ7Y1qfB7s6eV5J3p7v4S9ahx5q1kwRj4mSByw0JwEw9m5i0Se9vT2H6JWB6igzBfywq+4o8u7nJYoV2h8tMrW4l2tGJ0tWd2zgzv3v7bWgAE8C7eC0jShS4V+VwqC1xG7OQK+3cSb1oj0G0N5pWm5C4u2xTrwB6qK12i8gE8c9gZz6m3jz6SxVq2y8rLJ2n3g2wY4+F5dcbmVt6rA7n1v8+5oJmZ6dy+2f7o2z7k7r1vQ3ps5O56H/1Vf+n/J/8z+1/5f+5f9j/0P8T/k/5P/X/3v8r/R/2P9P+f/8P+N/0f+q/tP/if9b/pf7b/0v+W/7f/3P8L/1f8T/l/2v8r/l/5v/5f/X/6n/4f5H/gAA";
const logoSeal = "data:image/webp;base64,UklGRtZHAABXRUJQVlA4IMpHAADQJgCdASqQApIDPm02mUskJCMgK7QhoAgAJaQAATa6B44AAP7+/f/+1+1z8lH3xbn7S5tM+H4uB7xQ9cqkI+F4z3tLkH5aE0Z8t3bXvFn2X3c0v7hb1/ylVd4dz6m8fVj7rE5g58n+e5cR2+ahf2CjT0Jk7L0RX4coJm5pUE0g8mThnLJ7kzAhSppBq4r7UvZb0iJb1c6Q2T9tQ8DJjv2N8VVz6XJx2X0UqS7qKDRD0ca6h3nq7X7Ewq1qqM5lWdD0T9GJIfmT0Biy2aOKqkYz4sEm2d6d3c51sV9Qqj4bK8eJrQ2hJxgPp2iAPFtyx9fH4H5C2h9E8G0sw7hLzK7c6rUwIadn82+Pip2wmzW4u4CtUZ+uYAE9tkQyGadGQdZotd9SWQ7GbmzSxGf4zQ5vV6z+V9q3oq5P0h1ZmE5rWDQbU0jR1kJbx3nH3tZitC4VqF6eXwPX2S+zC0T2Yj3zD5Krb+2pmP+JpM8VnZn2m5m3+g/6z+aHq8sz5pT5Q9M5KcLtw8K3bR1yQ3Ksl0M9Dq2KxL3tqj7+v5r6gAA";

const styles = `
  * { box-sizing: border-box; }
  html { scroll-behavior: smooth; }
  body { margin: 0; font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; background:#09100c; color:#fff; }
  a { color: inherit; text-decoration: none; }
  .page { min-height: 100vh; overflow-x: hidden; background:#09100c; color:#fff; }
  .overlay-bg { position: fixed; inset: 0; pointer-events: none; background: radial-gradient(circle at top, rgba(78,126,97,.16), transparent 28%), radial-gradient(circle at bottom right, rgba(173,113,62,.12), transparent 24%); }
  .container { width: min(1280px, calc(100% - 48px)); margin: 0 auto; }
  .hero { position: relative; min-height: 100vh; border-bottom: 1px solid rgba(255,255,255,.08); overflow: hidden; }
  .hero-bg, .hero-bg img { position:absolute; inset:0; width:100%; height:100%; object-fit:cover; }
  .hero-bg img { opacity:.30; }
  .hero-shade { position:absolute; inset:0; background:linear-gradient(180deg, rgba(5,8,6,.15), rgba(5,8,6,.58), rgba(5,8,6,.94)); }
  .hero-radial { position:absolute; inset:0; background:radial-gradient(circle at top, rgba(255,241,218,.12), transparent 24%); }
  .hero-inner { position:relative; min-height:100vh; display:flex; flex-direction:column; padding:32px 0 48px; }
  .nav { display:flex; justify-content:space-between; align-items:center; gap:16px; padding:12px 20px; border:1px solid rgba(255,255,255,.10); background:rgba(0,0,0,.20); backdrop-filter: blur(16px); border-radius:999px; margin-bottom:40px; }
  .brand { display:flex; align-items:center; gap:12px; }
  .brand img { width:44px; height:44px; border-radius:999px; object-fit:cover; border:1px solid rgba(255,255,255,.10); }
  .brand-title { font-family: Georgia, "Times New Roman", serif; font-size: 1.15rem; color:#f4e7d2; }
  .brand-sub { font-size:.72rem; letter-spacing:.32em; text-transform:uppercase; color:rgba(255,255,255,.45); margin-top:2px; }
  .hero-grid { display:grid; grid-template-columns: 1.08fr .92fr; gap:40px; align-items:center; flex:1; }
  .badge { display:inline-flex; align-items:center; gap:8px; border-radius:999px; padding:10px 16px; border:1px solid rgba(226,204,170,.20); background:rgba(226,204,170,.10); color:#f0debf; font-size:.88rem; }
  .headline { font-family: Georgia, "Times New Roman", serif; font-size: clamp(3rem, 8vw, 5.75rem); line-height:.95; color:#f5eada; margin:24px 0 0; }
  .lead { margin-top:24px; max-width:760px; color:rgba(255,255,255,.74); font-size:1.1rem; line-height:1.9; }
  .hero-actions { display:flex; flex-wrap:wrap; gap:16px; margin-top:32px; }
  .btn { display:inline-flex; align-items:center; justify-content:center; gap:10px; border:none; cursor:pointer; border-radius:999px; padding:14px 22px; font-weight:600; transition:.2s ease; }
  .btn-primary { background:#e2ccaa; color:#26180e; }
  .btn-primary:hover { background:#f1dfc0; }
  .btn-dark { background:rgba(255,255,255,.10); color:#fff; backdrop-filter:blur(12px); }
  .btn-dark:hover { background:rgba(255,255,255,.15); }
  .btn-ghost { background:transparent; color:#fff; border:1px solid rgba(255,255,255,.10); }
  .btn-ghost:hover { background:rgba(255,255,255,.10); }
  .pill { display:inline-flex; align-items:center; gap:10px; border:1px solid rgba(255,255,255,.10); background:rgba(0,0,0,.20); padding:14px 20px; border-radius:999px; color:rgba(255,255,255,.70); }
  .card { border:1px solid rgba(255,255,255,.10); background:rgba(255,255,255,.05); backdrop-filter: blur(18px); border-radius:30px; overflow:hidden; }
  .hero-card { border-radius:36px; background:rgba(0,0,0,.25); box-shadow:0 30px 80px rgba(0,0,0,.35); }
  .hero-card-pad { padding:20px; }
  .editorial { position:relative; min-height:560px; border-radius:30px; overflow:hidden; border:1px solid rgba(255,255,255,.10); }
  .editorial img { width:100%; height:560px; object-fit:cover; display:block; }
  .editorial-overlay { position:absolute; inset:0; opacity:.65; }
  .editorial-radial { position:absolute; inset:0; background:radial-gradient(circle at top, rgba(255,255,255,.18), transparent 26%); }
  .editorial-copy { position:absolute; left:24px; right:24px; bottom:24px; padding:24px; border-radius:28px; border:1px solid rgba(255,255,255,.10); background:rgba(0,0,0,.35); backdrop-filter:blur(18px); }
  .eyebrow { text-transform:uppercase; letter-spacing:.35em; font-size:.72rem; color:rgba(255,255,255,.50); }
  .editorial-title { font-family: Georgia, "Times New Roman", serif; font-size:2.3rem; color:#f4e8d4; margin-top:12px; }
  .editorial-text { margin-top:8px; color:rgba(255,255,255,.76); }
  .tags { margin-top:16px; display:flex; flex-wrap:wrap; gap:8px; }
  .tag { display:inline-flex; align-items:center; padding:8px 12px; border-radius:999px; border:1px solid rgba(255,255,255,.10); background:rgba(255,255,255,.10); color:rgba(255,255,255,.85); font-size:.86rem; }
  section.block { padding:80px 0; }
  .section-head { display:flex; justify-content:space-between; align-items:end; gap:24px; margin-bottom:40px; }
  .section-title { font-family: Georgia, "Times New Roman", serif; font-size: clamp(2.3rem, 4vw, 3.3rem); color:#f5eada; margin-top:12px; }
  .section-copy { margin-top:12px; max-width:760px; color:rgba(255,255,255,.68); line-height:1.8; }
  .muted-pill { border:1px solid rgba(255,255,255,.10); background:rgba(255,255,255,.05); padding:10px 16px; border-radius:999px; color:rgba(255,255,255,.58); }
  .grid-4 { display:grid; grid-template-columns: repeat(4, 1fr); gap:20px; }
  .identity-card { border-radius:30px; overflow:hidden; border:1px solid rgba(255,255,255,.10); background:rgba(255,255,255,.05); cursor:pointer; text-align:left; transition:.2s ease; }
  .identity-card.active { border-color:rgba(227,205,172,.35); background:rgba(255,255,255,.10); }
  .identity-card:hover { background:rgba(255,255,255,.10); }
  .identity-image-wrap { position:relative; height:288px; overflow:hidden; }
  .identity-image-wrap img { width:100%; height:100%; object-fit:cover; display:block; transition:transform .5s ease; }
  .identity-card:hover img { transform:scale(1.05); }
  .identity-image-overlay { position:absolute; inset:0; opacity:.60; }
  .identity-body { padding:20px; }
  .identity-top { display:flex; justify-content:space-between; gap:12px; }
  .identity-name { font-family: Georgia, "Times New Roman", serif; font-size:2rem; color:#f4e7d2; }
  .identity-mood { margin-top:4px; text-transform:uppercase; letter-spacing:.24em; font-size:.72rem; color:rgba(255,255,255,.45); }
  .identity-desc { margin-top:16px; color:rgba(255,255,255,.68); line-height:1.8; font-size:.95rem; }
  .identity-line { margin-top:12px; color:#ebdcbe; font-size:.95rem; }
  .grid-split { display:grid; grid-template-columns: 1.2fr .8fr; gap:24px; }
  .ar-wrap { position:relative; border-radius:34px; overflow:hidden; border:1px solid rgba(255,255,255,.10); background:#0c120e; min-height:640px; }
  .ar-wrap::before { content:""; position:absolute; inset:0; background: radial-gradient(circle at top, rgba(62,110,84,.2), transparent 35%), radial-gradient(circle at bottom right, rgba(179,122,70,.18), transparent 30%); }
  .ar-bg { position:absolute; inset:0; width:100%; height:100%; object-fit:cover; opacity:.80; }
  .ar-dark { position:absolute; inset:0; background:linear-gradient(to bottom, rgba(0,0,0,.15), rgba(0,0,0,.45), rgba(0,0,0,.70)); }
  .ar-frame { pointer-events:none; position:absolute; inset:0; }
  .ar-oval-a { position:absolute; left:20%; right:20%; top:22%; height:42%; border-radius:999px; border:1px solid rgba(167,243,208,.25); }
  .ar-oval-b { position:absolute; left:16%; right:16%; top:18%; height:50%; border-radius:999px; border:1px dashed rgba(255,255,255,.10); }
  .ar-scan { position:absolute; left:0; right:0; height:1px; background:linear-gradient(to right, transparent, rgba(167,243,208,.60), transparent); }
  .ar-orbit { position:absolute; left:50%; top:52%; transform:translate(-50%, -50%); }
  .ar-label { position:absolute; left:20px; top:20px; border-radius:999px; border:1px solid rgba(255,255,255,.10); background:rgba(0,0,0,.35); padding:10px 16px; letter-spacing:.28em; text-transform:uppercase; font-size:.72rem; color:rgba(255,255,255,.70); backdrop-filter: blur(10px); }
  .ar-bottom { position:absolute; left:20px; right:20px; bottom:20px; border-radius:24px; border:1px solid rgba(255,255,255,.10); background:rgba(0,0,0,.40); backdrop-filter:blur(18px); padding:18px; }
  .ar-bottom-row { display:flex; justify-content:space-between; align-items:center; gap:16px; }
  .stack { display:grid; gap:24px; }
  .pad-24 { padding:24px; }
  .card-title { font-family: Georgia, "Times New Roman", serif; font-size:2rem; color:#f5eada; margin-top:10px; }
  .small { font-size:.95rem; line-height:1.8; color:rgba(255,255,255,.68); }
  .progress-track { height:8px; width:100%; background:rgba(255,255,255,.10); border-radius:999px; overflow:hidden; margin-top:16px; }
  .progress-fill { height:100%; background:linear-gradient(90deg, rgba(227,205,172,.9), rgba(255,255,255,.65)); border-radius:999px; }
  .triple { display:flex; justify-content:space-between; margin-top:12px; font-size:.72rem; letter-spacing:.22em; text-transform:uppercase; color:rgba(255,255,255,.45); }
  .grid-2 { display:grid; grid-template-columns: repeat(2, 1fr); gap:12px; }
  .select-card { border-radius:22px; border:1px solid rgba(255,255,255,.10); background:rgba(0,0,0,.20); padding:16px; text-align:left; cursor:pointer; transition:.2s ease; }
  .select-card:hover { background:rgba(255,255,255,.05); }
  .select-card.active { border-color:rgba(227,205,172,.30); background:rgba(227,205,172,.10); }
  .icon-box { width:44px; height:44px; display:flex; align-items:center; justify-content:center; border-radius:16px; background:linear-gradient(135deg, #f4e6ca, #be9552); color:#2b190c; margin-bottom:12px; }
  .label { font-weight:600; color:#fff; }
  .label-sub { margin-top:4px; font-size:.72rem; letter-spacing:.22em; text-transform:uppercase; color:rgba(255,255,255,.45); }
  .social-grid { display:grid; grid-template-columns: .95fr 1.05fr; gap:24px; }
  .social-image-card { min-height:640px; }
  .social-image-card .img { position:relative; min-height:640px; }
  .social-image-card img { width:100%; height:100%; min-height:640px; object-fit:cover; display:block; }
  .social-image-card .shade { position:absolute; inset:0; background:linear-gradient(to top, rgba(0,0,0,.85), rgba(0,0,0,.35), rgba(0,0,0,.10)); }
  .social-copy { position:absolute; left:32px; right:32px; bottom:32px; }
  .quote-card { padding:24px; }
  .quote-title { font-family: Georgia, "Times New Roman", serif; font-size:2rem; color:#f5eada; }
  .quote-text { margin-top:16px; color:rgba(255,255,255,.72); line-height:2; }
  .artisan { background:linear-gradient(135deg, rgba(227,205,172,.12), rgba(18,27,21,.65), rgba(8,12,9,.96)); box-shadow:0 20px 60px rgba(0,0,0,.28); }
  .check-row { display:flex; gap:12px; align-items:flex-start; }
  .check-dot { margin-top:4px; width:24px; height:24px; border-radius:999px; display:flex; align-items:center; justify-content:center; background:#e3cdac; color:#24170e; flex:0 0 auto; }
  .cta { padding-top:16px; padding-bottom:80px; }
  .cta-card { border-radius:40px; border:1px solid rgba(227,205,172,.18); background:linear-gradient(145deg, rgba(227,205,172,.14), rgba(19,31,23,.72), rgba(7,10,8,1)); box-shadow:0 24px 80px rgba(0,0,0,.35); overflow:hidden; }
  .cta-inner { position:relative; padding:32px 40px; }
  .cta-inner::after { content:""; position:absolute; right:0; top:0; width:208px; height:208px; border-radius:999px; background:rgba(227,205,172,.10); filter:blur(48px); }
  .cta-grid { position:relative; display:grid; grid-template-columns: 1fr auto; gap:24px; align-items:center; }
  .cta-title { font-family: Georgia, "Times New Roman", serif; font-size: clamp(2.2rem, 4vw, 3.3rem); color:#f5eada; margin-top:12px; max-width:800px; }
  .cta-text { margin-top:16px; max-width:800px; color:rgba(255,255,255,.74); line-height:1.9; }
  @media (max-width: 1100px) {
    .hero-grid, .grid-4, .grid-split, .social-grid, .cta-grid { grid-template-columns: 1fr; }
    .section-head, .ar-bottom-row { display:grid; gap:16px; }
  }
  @media (max-width: 720px) {
    .container { width:min(100% - 24px, 1280px); }
    .nav { border-radius:28px; align-items:flex-start; padding:14px; }
    .brand-title { font-size:1rem; }
    .hero-card-pad, .cta-inner, .pad-24, .quote-card { padding:18px; }
    .editorial-copy, .social-copy { left:18px; right:18px; bottom:18px; padding:18px; }
    .grid-2 { grid-template-columns: 1fr; }
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
