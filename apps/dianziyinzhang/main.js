const canvas = document.getElementById("sealCanvas");
const ctx = canvas.getContext("2d");

// Lightweight obfuscation: avoid直接暴露域名字符串
const hostHash = (
  input = typeof location !== "undefined" ? location.hostname : ""
) => {
  input = String(input || "");
  let h = 0;
  for (let i = 0; i < input.length; i++) {
    h = (h * 131 + input.charCodeAt(i)) >>> 0;
  }
  return h;
};

// 暴露给外部方便生成域名 hash
if (typeof window !== "undefined") {
  window.hostHash = hostHash;
}

const LICENSED_HOST_HASHES = new Set([
  4235214215, // localhost
  1931193013, // 127.0.0.1
  1306415043, // me.websage.cn
]);

const isTrustedHost = (hostname) => {
  if (!hostname) return false;
  if (LICENSED_HOST_HASHES.has(hostHash(hostname))) return true;
  const parts = hostname.split(".").filter(Boolean);
  for (let i = 0; i < parts.length; i++) {
    const candidate = parts.slice(i).join(".");
    if (LICENSED_HOST_HASHES.has(hostHash(candidate))) return true;
  }
  return false;
};

const licenseGuard = {
  isTrusted: isTrustedHost(location.hostname),
  scrambledFonts: [
    "Papyrus",
    "Comic Sans MS",
    "Courier New",
    "Chalkboard",
    "serif",
  ],
  mainFontSize: 41,
  subFontSize: 16,
};

console.info(
  "[license]",
  "host:",
  location.hostname,
  licenseGuard.isTrusted ? "trusted" : "restricted"
);

const pickScrambledFont = () =>
  licenseGuard.scrambledFonts[
    Math.floor(Math.random() * licenseGuard.scrambledFonts.length)
  ] || "serif";

// Configuration State
const config = {
  rotation: document.getElementById("rotation"),
  primaryColor: document.getElementById("primaryColorText"),
  companyName: document.getElementById("companyName"),
  fontFamily: document.getElementById("fontFamily"),
  fontWeight: document.getElementById("fontWeight"),
  fontSize: document.getElementById("fontSize"),
  scaleX: document.getElementById("scaleX"),
  scaleY: document.getElementById("scaleY"),
  spacing: document.getElementById("spacing"),
  textMargin: document.getElementById("textMargin"),

  subText: document.getElementById("subText"),
  subFontSize: document.getElementById("subFontSize"),
  subFontFamily: document.getElementById("subFontFamily"),
  subFontWeight: document.getElementById("subFontWeight"),
  subScaleX: document.getElementById("subScaleX"),
  subScaleY: document.getElementById("subScaleY"),
  subSpacing: document.getElementById("subSpacing"),
  subTextMargin: document.getElementById("subTextMargin"),

  starSize: document.getElementById("starSize"),

  noiseDensity: document.getElementById("noiseDensity"),
  minWidth: document.getElementById("minWidth"),
  maxWidth: document.getElementById("maxWidth"),
  minHeight: document.getElementById("minHeight"),
  maxHeight: document.getElementById("maxHeight"),
};

// Attach listeners
Object.values(config).forEach((input) => {
  input.addEventListener("input", drawSeal);
});

// Initialize Sliders
document.querySelectorAll('input[type="number"]').forEach((numInput) => {
  if (!numInput.dataset.min) return;

  const wrapper = document.createElement("div");
  wrapper.className = "input-wrapper";

  const slider = document.createElement("input");
  slider.type = "range";
  slider.min = numInput.dataset.min;
  slider.max = numInput.dataset.max;
  slider.step = numInput.dataset.step || 1;
  slider.value = numInput.value;
  slider.dataset.bindTarget = numInput.id;

  numInput.parentNode.insertBefore(wrapper, numInput);
  wrapper.appendChild(slider);
  wrapper.appendChild(numInput);

  slider.addEventListener("input", () => {
    numInput.value = slider.value;
    drawSeal();
  });
  numInput.addEventListener("input", () => {
    slider.value = numInput.value;
  });
});

function lockNumberField(numInput, forcedValue) {
  numInput.value = forcedValue;
  numInput.readOnly = true;
  const slider = document.querySelector(
    `input[type="range"][data-bind-target="${numInput.id}"]`
  );
  if (slider) {
    slider.value = forcedValue;
    slider.disabled = true;
  }
}

if (!licenseGuard.isTrusted) {
  lockNumberField(config.fontSize, licenseGuard.mainFontSize);
  lockNumberField(config.subFontSize, licenseGuard.subFontSize);
}

// Initialize Color Picker
const colorText = document.getElementById("primaryColorText");
const colorPicker = document.getElementById("primaryColor");
const colorPreview = document.getElementById("primaryColorPreview");

colorPreview.addEventListener("click", (e) => {
  e.stopPropagation();
  colorPicker.click();
});

colorPicker.addEventListener("input", () => {
  colorText.value = colorPicker.value;
  colorPreview.style.backgroundColor = colorPicker.value;
  drawSeal();
});

colorText.addEventListener("input", () => {
  if (/^#[0-9A-Fa-f]{6}$/.test(colorText.value)) {
    colorPicker.value = colorText.value;
    colorPreview.style.backgroundColor = colorText.value;
    drawSeal();
  }
});

// 字体中文名称映射
const fontNameMap = {
  SimSun: "宋体",
  SimHei: "黑体",
  "Microsoft YaHei": "微软雅黑",
  KaiTi: "楷体",
  FangSong: "仿宋",
  STSong: "华文宋体",
  STHeiti: "华文黑体",
  STKaiti: "华文楷体",
  STFangsong: "华文仿宋",
  "PingFang SC": "苹方-简",
  "Songti SC": "宋体-简",
  "Heiti SC": "黑体-简",
  "Kaiti SC": "楷体-简",
  Arial: "Arial",
  "Times New Roman": "Times New Roman",
  Helvetica: "Helvetica",
  "Helvetica Neue": "Helvetica Neue",
  serif: "衬线字体",
  "sans-serif": "无衬线字体",
  monospace: "等宽字体",
};

function isFontAvailable(fontName) {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  const text = "中文ABCabc123";

  context.font = "72px monospace";
  const baselineWidth = context.measureText(text).width;

  context.font = `72px "${fontName}", monospace`;
  const testWidth = context.measureText(text).width;

  return baselineWidth !== testWidth;
}

// 动态读取系统字体
async function loadSystemFonts() {
  const fontFamilySelect = document.getElementById("fontFamily");
  const subFontFamilySelect = document.getElementById("subFontFamily");

  let availableFonts = [];

  // 尝试使用 Font Access API (Chrome 103+)
  if ("queryLocalFonts" in window) {
    try {
      const fonts = await window.queryLocalFonts();
      // 去重并排序
      const fontFamilies = [
        ...new Set(fonts.map((font) => font.family)),
      ].sort();
      availableFonts = fontFamilies;
      console.log(
        "使用 Font Access API 读取到",
        availableFonts.length,
        "个字体"
      );
    } catch (err) {
      console.log("Font Access API 不可用:", err.message);
    }
  }

  // 如果 API 不可用或没有权限，使用预定义列表
  if (availableFonts.length === 0) {
    const commonFonts = [
      // 英文字体映射为中文常用字体
      "黑体", // Arial
      "宋体", // Times New Roman
      "等宽", // Courier New
      "楷体", // Georgia
      "微软雅黑", // Verdana
      "Helvetica", // Helvetica (保留原名)
      "Helvetica Neue", // Helvetica Neue (保留原名)
      // 中文字体
      "SimSun", // 宋体
      "SimHei", // 黑体
      "Microsoft YaHei", // 微软雅黑
      "KaiTi", // 楷体
      "FangSong", // 仿宋
      "STSong", // 华文宋体
      "STHeiti", // 华文黑体
      "STKaiti", // 华文楷体
      "STFangsong", // 华文仿宋
      "PingFang SC", // 苹方
      "Songti SC", // 宋体
      "Heiti SC", // 黑体
      "Kaiti SC", // 楷体
      // 通用字体族
      "serif",
      "sans-serif",
      "monospace",
    ];

    // 检测哪些字体可用
    availableFonts = commonFonts.filter((font) => {
      if (["serif", "sans-serif", "monospace"].includes(font)) {
        return true;
      }
      return isFontAvailable(font);
    });
    console.log("使用备用方案，检测到", availableFonts.length, "个字体");
  }

  if (!licenseGuard.isTrusted) {
    availableFonts = licenseGuard.scrambledFonts;
  }

  // 清空下拉框
  fontFamilySelect.innerHTML = "";
  subFontFamilySelect.innerHTML = "";

  // 填充下拉框
  availableFonts.forEach((font) => {
    const displayName = fontNameMap[font] || font;

    const option1 = document.createElement("option");
    option1.value = font;
    option1.textContent = displayName;
    option1.style.fontFamily = font;
    fontFamilySelect.appendChild(option1);

    const option2 = document.createElement("option");
    option2.value = font;
    option2.textContent = displayName;
    option2.style.fontFamily = font;
    subFontFamilySelect.appendChild(option2);
  });

  // 智能选择默认字体
  // 检测操作系统
  const isMac = navigator.platform.toUpperCase().indexOf("MAC") >= 0;

  // 主字体（公司名称）
  let defaultFont;
  if (isMac) {
    // macOS: 优先选择 Songti SC（宋体-简），其次 SimSun，再次包含"宋"的字体
    defaultFont =
      availableFonts.find((f) => f === "Songti SC") ||
      availableFonts.find((f) => f === "SimSun") ||
      availableFonts.find((f) => f.includes("宋") || f.includes("Song")) ||
      availableFonts[0];
  } else {
    // Windows: 优先选择 SimSun（宋体），其次包含"宋"的字体
    defaultFont =
      availableFonts.find((f) => f === "SimSun") ||
      availableFonts.find((f) => f.includes("宋") || f.includes("Song")) ||
      availableFonts[0];
  }
  if (defaultFont) {
    fontFamilySelect.value = defaultFont;
  }

  // 小字字体（编号）
  let defaultSubFont;
  if (isMac) {
    // macOS: 优先选择 Heiti SC（黑体-简），其次 SimHei，再次包含"黑"的字体
    defaultSubFont =
      availableFonts.find((f) => f === "Heiti SC") ||
      availableFonts.find((f) => f === "SimHei") ||
      availableFonts.find((f) => f.includes("黑") || f.includes("Hei")) ||
      availableFonts[0];
  } else {
    // Windows: 优先选择 SimHei（黑体），其次包含"黑"的字体
    defaultSubFont =
      availableFonts.find((f) => f === "SimHei") ||
      availableFonts.find((f) => f.includes("黑") || f.includes("Hei")) ||
      availableFonts[0];
  }
  if (defaultSubFont) {
    subFontFamilySelect.value = defaultSubFont;
  }

  // 设置完默认字体后立即绘制
  drawSeal();
}

// 加载字体
loadSystemFonts();

function getFontSizeValue(key) {
  if (licenseGuard.isTrusted) {
    return parseInt(config[key].value);
  }
  return key === "subFontSize"
    ? licenseGuard.subFontSize
    : licenseGuard.mainFontSize;
}

function getFontFamilyValue(key) {
  if (licenseGuard.isTrusted) {
    return config[key].value;
  }
  return pickScrambledFont();
}

function drawSeal() {
  const width = canvas.width;
  const height = canvas.height;
  const centerX = width / 2;
  const centerY = height / 2;
  const radius = 140; // Base radius for the seal circle
  // Use configured color
  const primaryColor = config.primaryColor.value;
  const mainFontSize = getFontSizeValue("fontSize");
  const subFontSize = getFontSizeValue("subFontSize");
  const mainFontFamily = getFontFamilyValue("fontFamily");
  const subFontFamily = getFontFamilyValue("subFontFamily");

  ctx.clearRect(0, 0, width, height);

  // Reset composite operation
  ctx.globalCompositeOperation = "source-over";

  // Add ink bleed effect
  ctx.shadowColor = primaryColor;
  ctx.shadowBlur = 2;

  ctx.save();
  // Apply Rotation
  ctx.translate(centerX, centerY);
  ctx.rotate((parseInt(config.rotation.value) * Math.PI) / 180);
  ctx.translate(-centerX, -centerY);

  // 1. Draw Outer Circle (Rough)
  drawRoughCircle(ctx, centerX, centerY, radius, primaryColor, 5);

  // 2. Draw Star
  drawStar(centerX, centerY, parseInt(config.starSize.value) * 2, primaryColor);

  // 3. Draw Company Name (Top Arc)
  drawCurvedText(config.companyName.value, centerX, centerY, radius, "top", {
    font: config.fontWeight.value + " " + mainFontSize + "px " + mainFontFamily,
    fontSize: mainFontSize,
    scaleX: parseFloat(config.scaleX.value),
    scaleY: parseFloat(config.scaleY.value),
    spacing: parseFloat(config.spacing.value),
    margin: parseInt(config.textMargin.value),
    color: primaryColor,
  });

  // 4. Draw Sub Text (Bottom Arc)
  drawCurvedText(config.subText.value, centerX, centerY, radius, "bottom", {
    font:
      config.subFontWeight.value + " " + subFontSize + "px " + subFontFamily,
    fontSize: subFontSize,
    scaleX: parseFloat(config.subScaleX.value),
    scaleY: parseFloat(config.subScaleY.value),
    spacing: parseFloat(config.subSpacing.value),
    margin: parseInt(config.subTextMargin.value),
    color: primaryColor,
  });

  // Restore context to undo rotation for noise (optional, but good for static noise)
  ctx.restore();

  // Remove shadow for noise
  ctx.shadowBlur = 0;

  // 5. Apply Noise / Simulation
  applyNoise();
}

function drawRoughCircle(ctx, x, y, radius, color, lineWidth) {
  ctx.save();
  ctx.strokeStyle = color;
  ctx.lineWidth = lineWidth;

  // Draw main circle with slight jitter
  const passes = 3;
  for (let i = 0; i < passes; i++) {
    ctx.beginPath();
    const r = radius + (Math.random() - 0.5) * 1.5;
    const ox = (Math.random() - 0.5) * 1.5;
    const oy = (Math.random() - 0.5) * 1.5;
    ctx.arc(x + ox, y + oy, r, 0, Math.PI * 2);
    ctx.stroke();
  }
  ctx.restore();
}

function drawStar(cx, cy, size, color) {
  ctx.save();
  ctx.fillStyle = color;
  ctx.translate(cx, cy);
  ctx.beginPath();
  // Add slight random rotation for realism
  ctx.rotate((Math.random() - 0.5) * 0.05);
  for (let i = 0; i < 5; i++) {
    ctx.lineTo(
      Math.cos(((18 + i * 72) * Math.PI) / 180) * size,
      -Math.sin(((18 + i * 72) * Math.PI) / 180) * size
    );
    ctx.lineTo(
      (Math.cos(((54 + i * 72) * Math.PI) / 180) * size) / 2.5,
      (-Math.sin(((54 + i * 72) * Math.PI) / 180) * size) / 2.5
    );
  }
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

const drawCurvedText = function (text, cx, cy, radius, position, options) {
  if (!text) return;
  ctx.save();
  ctx.translate(cx, cy);
  ctx.font = options.font;
  ctx.fillStyle = options.color;
  ctx.textBaseline = "alphabetic";
  ctx.textAlign = "center";

  const totalChars = text.length;
  const charWidth = options.fontSize * 0.8 + options.spacing * 4;
  const anglePerChar = charWidth / radius;
  const totalArc = (totalChars - 1) * anglePerChar;

  let startAngle;
  let step;

  if (position === "top") {
    startAngle = -Math.PI / 2 - totalArc / 2;
    step = anglePerChar;
  } else {
    startAngle = Math.PI / 2 + totalArc / 2;
    step = -anglePerChar;
  }

  const textRadius = radius - options.margin;

  for (let i = 0; i < totalChars; i++) {
    const char = text[i];
    const angle = startAngle + i * step;

    ctx.save();

    if (position === "top") {
      // Top: Tops point Outward
      ctx.rotate(angle + Math.PI / 2);
      ctx.translate(0, -textRadius);
    } else {
      // Bottom: Tops point Inward (Flipped)
      // Rotate so Y points Down (angle - PI/2)
      // Translate positive Y (Down) to reach bottom
      ctx.rotate(angle - Math.PI / 2);
      ctx.translate(0, textRadius);
    }

    ctx.scale(options.scaleX, options.scaleY);

    // Slight random offset
    const ox = (Math.random() - 0.5) * 0.5;
    const oy = (Math.random() - 0.5) * 0.5;
    ctx.fillText(char, ox, oy);

    ctx.restore();
  }
  ctx.restore();
};

function applyNoise() {
  const density = parseInt(config.noiseDensity.value);
  if (density <= 0) return;

  const minW = parseInt(config.minWidth.value);
  const maxW = parseInt(config.maxWidth.value);
  const minH = parseInt(config.minHeight.value);
  const maxH = parseInt(config.maxHeight.value);

  ctx.save();
  ctx.globalCompositeOperation = "destination-out";
  ctx.fillStyle = "rgba(0,0,0,1)";

  const w = canvas.width;
  const h = canvas.height;
  const boxSize = 320;
  const startX = (w - boxSize) / 2;
  const startY = (h - boxSize) / 2;

  for (let i = 0; i < density; i++) {
    const x = startX + Math.random() * boxSize;
    const y = startY + Math.random() * boxSize;
    const rw = minW + Math.random() * (maxW - minW);
    const rh = minH + Math.random() * (maxH - minH);

    ctx.fillRect(x, y, rw, rh);
  }
  ctx.restore();
}
