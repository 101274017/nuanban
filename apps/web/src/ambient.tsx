import './ambient.css';

/**
 * 纸纹流光背景层：一层静态纸纹 + 一道缓慢扫过的柔光。
 * 减少动态由全局 .reduce-motion / prefers-reduced-motion 规则接管，只保留静态纸纹。
 * 纯装饰，aria-hidden 且 pointer-events:none，不参与任何交互。
 */
export function Ambient({ variant = 'page' }: { variant?: 'page' | 'full' }) {
  return <div className={'ambient' + (variant === 'full' ? ' ambient--full' : '')} aria-hidden="true" />;
}
