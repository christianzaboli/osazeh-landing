type LogoSignalProps = {
  reducedMotion: boolean;
};

export function LogoSignal({ reducedMotion }: LogoSignalProps) {
  return (
    <div
      className={`signal-static signal-graphic${reducedMotion ? " reduced-motion" : ""}`}
      aria-hidden="true"
    >
      <div className="signal-glow" />
      {/* <div className="signal-dots" /> */}
      <svg
        className="signal-mark"
        viewBox="0 0 851.04 851.04"
        xmlns="http://www.w3.org/2000/svg"
        role="presentation"
        focusable="false"
      >
        <path d="M424.39,0c-.91,425.64,2.45,424.57,426.65,424.39C615.09,423,423,615.09,424.39,851,424.57,426.83,425.64,423.49,0,424.39,232.71,428.34,428.68,224.69,424.39,0Z" />
      </svg>
      {/* <span className="canvas-label">SIGNAL / ONLINE</span> */}
    </div>
  );
}
