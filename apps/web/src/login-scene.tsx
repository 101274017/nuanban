/**
 * 暖伴登录页场景插画：窗、暖阳、书桌、茶杯、盆栽和坐着的小桌宠。
 * 纯 SVG + CSS 微动效（阳光呼吸、蒸汽、尾巴、眨眼），不引入图片资源。
 * 装饰性内容：aria-hidden，不进入读屏与 tab 顺序。
 */
export function LoginScene() {
  return <svg className="login-scene" viewBox="0 0 640 340" aria-hidden="true" focusable="false">
    <g>
      <rect x="70" y="8" width="372" height="228" rx="22" fill="#FFF7E8" stroke="#E3D3BC" strokeWidth="2" />
      <rect x="92" y="30" width="328" height="184" rx="14" fill="#FDF1DD" />
      <circle className="scene-sun" cx="338" cy="96" r="38" fill="#F7C98F" />
      <path d="M92 190h328v24H92z" fill="#F6E7CE" />
      <path d="M170 112c15-20 40-20 55 0M234 106c12-14 30-14 42 0" fill="none" stroke="#D9B98E" strokeWidth="3" strokeLinecap="round" />
      <path d="M92 190h328" stroke="#E7D3B4" strokeWidth="2" />
    </g>

    <rect x="52" y="248" width="560" height="14" rx="7" fill="#E2CDAE" />
    <rect x="104" y="262" width="14" height="56" rx="5" fill="#D8BE9B" />
    <rect x="546" y="262" width="14" height="56" rx="5" fill="#D8BE9B" />

    <g>
      <rect x="430" y="188" width="60" height="60" rx="14" fill="#F3E3CA" stroke="#DCC6A6" strokeWidth="2" />
      <path d="M490 206c16 0 16 28 0 28" fill="none" stroke="#DCC6A6" strokeWidth="6" strokeLinecap="round" />
      <path className="scene-steam" d="M448 170c7-9-7-15 0-24" fill="none" stroke="#D9C3A2" strokeWidth="4" strokeLinecap="round" />
      <path className="scene-steam" d="M466 170c7-9-7-15 0-24" fill="none" stroke="#D9C3A2" strokeWidth="4" strokeLinecap="round" />
    </g>

    <g>
      <path d="M128 248v-40" stroke="#7E8F6B" strokeWidth="4" strokeLinecap="round" />
      <path d="M128 218c-18-5-25-21-20-32 14 0 25 12 27 27" fill="#9DAE87" />
      <path d="M128 210c18-7 22-23 17-34-14 2-23 14-23 30" fill="#84986F" />
      <rect x="108" y="242" width="40" height="28" rx="8" fill="#C98D66" />
      <rect x="108" y="242" width="40" height="8" rx="4" fill="#B87C58" />
    </g>

    <g transform="translate(250 152)">
      <ellipse cx="66" cy="94" rx="52" ry="9" fill="#503A23" opacity=".08" />
      <path className="scene-tail" d="M96 78c24 2 17-31 8-21" fill="none" stroke="#D98347" strokeWidth="13" strokeLinecap="round" />
      <path d="M34 78 24 100m74-22 11 21" stroke="#D98347" strokeWidth="12" strokeLinecap="round" />
      <path d="M30 48c0-31 70-32 70 0 0 18-15 29-35 29-22 0-35-10-35-29" fill="#D98347" />
      <path d="m18 38 5-29 20 17zm76-29 4 29 18-17z" fill="#D98347" />
      <ellipse cx="24" cy="58" rx="7" ry="4" fill="#ECAC86" opacity=".7" />
      <ellipse cx="106" cy="58" rx="7" ry="4" fill="#ECAC86" opacity=".7" />
      <g className="scene-eyes">
        <ellipse cx="52" cy="46" rx="4.5" ry="5.5" fill="#392A24" />
        <ellipse cx="78" cy="46" rx="4.5" ry="5.5" fill="#392A24" />
      </g>
      <path d="m59 57 6 4 6-4" fill="#754330" />
      <path d="M65 52v7m0 0q-8 8-15 0m15 0q8 8 15 0" fill="none" stroke="#754330" strokeWidth="2.8" strokeLinecap="round" />
    </g>
  </svg>;
}
