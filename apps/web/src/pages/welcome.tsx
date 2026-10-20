import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, LockKeyhole, Square } from 'lucide-react';
import { BrandMark } from '../brand-mark';
import { Ambient } from '../ambient';
import { config } from '../composition';
import { readEntry, writeEntry } from '../entry';
import { useApp } from '../store';
import './welcome.css';

const promises = [
  { icon: Eye, title: '本机优先', text: '不注册也会把学习记录留在这一台电脑上。' },
  { icon: LockKeyhole, title: '不做假登录', text: '不收手机号、验证码或人脸，也不发假凭证。' },
  { icon: Square, title: '随时可停', text: '每个讲解和共享流程都由你亲手结束。' },
] as const;

const loginState = config.apiMode === 'real'
  ? {
      title: '已连接远程业务服务',
      detail: '账号注册与设备绑定入口尚未开放，登录能力仍不可用；不会生成任何凭证。',
    }
  : {
      title: '当前是本机模式',
      detail: '账号服务没有接通，登录能力尚未开放；不会生成任何凭证。',
    };

export function WelcomePage() {
  const navigate = useNavigate();
  const reducedMotion = useApp(state => state.snapshot?.preferences.reducedMotion ?? false);
  const [loginOpen, setLoginOpen] = useState(false);
  const returning = readEntry() !== null;

  const enterAsGuest = () => {
    writeEntry('guest');
    navigate('/', { replace: true });
  };

  return <div className={'welcome' + (reducedMotion ? ' reduce-motion' : '')}>
    <Ambient variant="full" />
    <main className="welcome-main">
      <section className="welcome-intro">
        <p className="welcome-brand">
          <BrandMark className="welcome-mark" size={64} />
          <span><strong>暖伴</strong><small>陪你慢慢学会</small></span>
        </p>
        <h1>先坐一会儿，<br />我们慢慢开始。</h1>
        <p className="welcome-lead">不用注册也能用。笔记和待办只留在这一台电脑上，暖伴不会替你点任何按钮。</p>
        <ul className="welcome-promises">
          {promises.map(item => <li key={item.title}>
            <item.icon size={20} aria-hidden="true" />
            <div><strong>{item.title}</strong><p>{item.text}</p></div>
          </li>)}
        </ul>
      </section>

      <section className="welcome-card" aria-label="进入暖伴">
        <h2>{returning ? '欢迎回来' : '进入暖伴'}</h2>
        <p className="welcome-card-lead">{returning ? '上次是以游客身份进入的，可以继续。' : '选一种方式开始，之后随时可以换。'}</p>
        <button className="button primary full" type="button" onClick={enterAsGuest}>
          {returning ? '继续以游客身份进入' : '游客模式，直接进入'}
        </button>
        <button className="button secondary full" type="button" aria-expanded={loginOpen} onClick={() => setLoginOpen(open => !open)}>
          {loginOpen ? '收起登录说明' : '登录暖伴账号'}
        </button>
        {loginOpen && <div className="welcome-login" role="region" aria-label="账号服务状态">
          <strong>{loginState.title}</strong>
          <p>{loginState.detail}</p>
          <p className="welcome-login-safe">本页不收集手机号、验证码、人脸或任何登录凭证。</p>
          <Link to="/onboarding/login" className="welcome-login-link">查看账号服务状态</Link>
        </div>}
        <p className="welcome-note">游客模式不建立账号，资料保存在本机，可在「设置与隐私」里清空。</p>
      </section>
    </main>
    <footer className="welcome-foot">暖伴公益助手 · 本机资料 · 真实模型接口</footer>
  </div>;
}
