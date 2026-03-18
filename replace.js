const fs = require('fs');
const path = require('path');

const cssPath = path.join(__dirname, 'src', 'App.css');
let css = fs.readFileSync(cssPath, 'utf8');

// Replace standard variables
css = css.replace(/--cyan/g, '--accent-main');
css = css.replace(/--purple/g, '--accent-alt');
css = css.replace(/--shadow-glow-purple/g, '--shadow-glow-alt');

// Replace selection rgba values
css = css.replace(/rgba\(0, 212, 255, 0\.3\)/g, 'rgba(232, 241, 242, 0.3)');
css = css.replace(/rgba\(0, 212, 255, 0\.1\)/g, 'rgba(232, 241, 242, 0.1)'); // glass border cyan?
css = css.replace(/rgba\(139, 92, 246, 0\.1\)/g, 'rgba(192, 192, 192, 0.1)'); // purple?

// Replace particle component hardcoded colors? Not here.

// Update the root variables definitions specifically for the new palette.
const rootRegex = /:root\s*\{[^}]+\}/;

const newRoot = `:root {
  --accent-main: #E8F1F2;
  --accent-alt: #C0C0C0;
  --gradient: linear-gradient(135deg, var(--accent-main), var(--accent-alt));
  --gradient-reverse: linear-gradient(135deg, var(--accent-alt), var(--accent-main));
  --bg-deep: #000B1E;
  --bg-section: #0A1931;
  --bg-card: rgba(255, 255, 255, 0.03);
  --glass: rgba(255, 255, 255, 0.05);
  --glass-hover: rgba(255, 255, 255, 0.08);
  --glass-border: rgba(255, 255, 255, 0.08);
  --glass-border-hover: rgba(255, 255, 255, 0.15);
  --text: #E8F1F2;
  --text-dim: #C0C0C0;
  --text-bright: #FFFFFF;
  --success: #10B981;
  --whatsapp: #25D366;
  --shadow-glow: 0 0 40px rgba(232, 241, 242, 0.15);
  --shadow-glow-alt: 0 0 40px rgba(192, 192, 192, 0.15);
  --radius: 16px;
  --radius-sm: 10px;
  --radius-lg: 24px;
  --transition: 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  --transition-slow: 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}`;

css = css.replace(rootRegex, newRoot);

// Save back
fs.writeFileSync(cssPath, css, 'utf8');
console.log('App.css updated successfully.');
