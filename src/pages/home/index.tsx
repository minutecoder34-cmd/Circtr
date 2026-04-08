import { useEffect, useState } from "react";
import {
  Activity,
  Boxes,
  BrainCircuit,
  Download,
  Layers3,
  Microscope,
  Minus,
  ScanSearch,
  Sparkles,
  Square,
  Workflow,
  X,
} from "lucide-react";
import brandMark from "@/assets/circtr-mark.png";

const analysisMethods = [
  {
    icon: BrainCircuit,
    name: "Gradient Attribution",
    detail: "Score the layers and neurons that push a target behavior logit the hardest.",
  },
  {
    icon: ScanSearch,
    name: "Activation Patching",
    detail: "Swap activations against a baseline pass to surface components with causal leverage.",
  },
  {
    icon: Layers3,
    name: "Ablation Studies",
    detail: "Remove candidate components and measure how much the model degrades in response.",
  },
  {
    icon: Activity,
    name: "Attention Analysis",
    detail: "Inspect selective heads, entropy patterns, and transformer-specific routing behavior.",
  },
];

const workflowSteps = [
  "Stage a PyTorch vision model and compressed dataset in one workspace.",
  "Define a behavior with positive and negative image examples.",
  "Run the four analysis tracks in parallel and rank influential components.",
  "Inspect the strongest layers, heads, and neurons before exporting findings.",
];

const releaseChecklist = [
  "Custom installer icon generated from the provided project artwork.",
  "Frameless desktop shell with native-feeling custom window controls.",
  "Windows release pipeline ready to attach CIRCTR installers to GitHub Releases.",
];

const windowApi = window.circtr?.window;

const HomePage = () => {
  const [isMaximized, setIsMaximized] = useState(false);

  useEffect(() => {
    if (!windowApi) {
      return undefined;
    }

    let isMounted = true;
    windowApi.isMaximized().then((value) => {
      if (isMounted) {
        setIsMaximized(value);
      }
    });

    const unsubscribe = windowApi.onMaximizedChange((value) => {
      setIsMaximized(value);
    });

    return () => {
      isMounted = false;
      unsubscribe();
    };
  }, []);

  return (
    <div className="desktop-shell">
      <header className="titlebar">
        <div className="titlebar-brand">
          <img className="titlebar-logo" src={brandMark} alt="CIRCTR brand mark" />
          <div>
            <div className="titlebar-label">CIRCTR</div>
            <div className="titlebar-subtitle">Mechanistic interpretability desktop shell</div>
          </div>
        </div>

        <div className="titlebar-center">
          <span className="live-pill">
            <Sparkles size={14} />
            Release-ready preview
          </span>
        </div>

        <div className="window-controls">
          <button
            aria-label="Minimize window"
            className="window-control"
            onClick={() => windowApi?.minimize()}
            type="button"
          >
            <Minus size={16} />
          </button>
          <button
            aria-label={isMaximized ? "Restore window" : "Maximize window"}
            className="window-control"
            onClick={() => windowApi?.toggleMaximize()}
            type="button"
          >
            <Square size={14} />
          </button>
          <button
            aria-label="Close window"
            className="window-control window-control-close"
            onClick={() => windowApi?.close()}
            type="button"
          >
            <X size={16} />
          </button>
        </div>
      </header>

      <main className="shell">
        <section className="hero panel">
          <div className="hero-copy">
            <span className="eyebrow">Research Workbench</span>
            <h1>CIRCTR now ships like a desktop product instead of a demo shell.</h1>
            <p className="lead">
              The app icon now comes from your project artwork, the Electron chrome is
              replaced with a clean custom titlebar, and the landing surface is framed
              like a real analysis workspace.
            </p>

            <div className="hero-actions">
              <div className="button button-primary">
                <Download size={16} />
                GitHub installer distribution
              </div>
              <div className="button button-secondary">
                <Workflow size={16} />
                Frameless desktop shell
              </div>
            </div>

            <div className="hero-metrics">
              <article className="metric-card">
                <span className="metric-value">4</span>
                <span className="metric-label">Parallel analysis methods</span>
              </article>
              <article className="metric-card">
                <span className="metric-value">1</span>
                <span className="metric-label">Custom icon across installer and app shell</span>
              </article>
              <article className="metric-card">
                <span className="metric-value">0</span>
                <span className="metric-label">Visible Electron chrome left in the app frame</span>
              </article>
            </div>
          </div>

          <aside className="hero-preview">
            <div className="preview-frame">
              <div className="preview-glow" />
              <img className="preview-image" src={brandMark} alt="CIRCTR project mark" />
            </div>
            <div className="preview-copy">
              <div className="preview-label">Brand Asset</div>
              <h2>The provided screenshot now drives the app identity.</h2>
              <p>
                The installer and desktop runtime now use generated icon assets based on
                your uploaded artwork instead of the default Electron branding.
              </p>
            </div>
          </aside>
        </section>

        <section className="content-grid">
          <article className="panel section-panel">
            <div className="section-heading">
              <span className="section-kicker">Workflow</span>
              <h2>Interpretability pipeline</h2>
            </div>
            <ol className="step-list">
              {workflowSteps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          </article>

          <article className="panel section-panel">
            <div className="section-heading">
              <span className="section-kicker">Desktop Finish</span>
              <h2>What was polished</h2>
            </div>
            <ul className="step-list">
              {releaseChecklist.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ul>
          </article>
        </section>

        <section className="insight-grid">
          <article className="panel signal-panel">
            <div className="section-heading">
              <span className="section-kicker">Shell</span>
              <h2>Release posture</h2>
            </div>
            <div className="signal-list">
              <div className="signal-card">
                <Boxes size={18} />
                <div>
                  <h3>Packaged like an installable product</h3>
                  <p>
                    The desktop build now carries branded assets through the installer,
                    executable, and runtime window icon.
                  </p>
                </div>
              </div>
              <div className="signal-card">
                <Microscope size={18} />
                <div>
                  <h3>Focused on the research narrative</h3>
                  <p>
                    The surface frames CIRCTR as a mechanistic interpretability tool,
                    not a generic Electron container.
                  </p>
                </div>
              </div>
            </div>
          </article>

          <article className="panel methods-panel">
            <div className="section-heading">
              <span className="section-kicker">Methods</span>
              <h2>Analysis stack</h2>
            </div>
            <div className="card-grid">
              {analysisMethods.map((method) => {
                const Icon = method.icon;

                return (
                  <article className="method-card" key={method.name}>
                    <div className="method-icon">
                      <Icon size={18} />
                    </div>
                    <h3>{method.name}</h3>
                    <p>{method.detail}</p>
                  </article>
                );
              })}
            </div>
          </article>
        </section>
      </main>
    </div>
  );
};

export default HomePage;
