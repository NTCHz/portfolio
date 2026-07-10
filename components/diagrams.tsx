// Architecture schematics for the four featured systems, drawn from the real repos.
// Strokes carry pathLength=1 so the scroll-driven CSS can draw them in.

function Box({
  x,
  y,
  w,
  h,
  label,
  sub,
  red,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  label: string;
  sub?: string;
  red?: boolean;
}) {
  return (
    <g>
      <rect
        className={red ? "stroke red" : "stroke"}
        x={x}
        y={y}
        width={w}
        height={h}
        pathLength={1}
      />
      <text x={x + w / 2} y={y + (sub ? h / 2 - 2 : h / 2 + 4)} textAnchor="middle">
        {label}
      </text>
      {sub && (
        <text className="lbl" x={x + w / 2} y={y + h / 2 + 12} textAnchor="middle">
          {sub}
        </text>
      )}
    </g>
  );
}

function Flow({ d, red }: { d: string; red?: boolean }) {
  return <path className={red ? "flow red" : "flow"} d={d} pathLength={1} />;
}

export function MultiLlmChatDiagram() {
  return (
    <svg className="diagram" viewBox="0 0 560 150" role="img" aria-label="Multi-LLM Chat Platform architecture">
      <Box x={8} y={55} w={90} h={40} label="Next.js" sub="BFF" />
      <Box x={160} y={55} w={100} h={40} label="FastAPI" sub="async" />
      <Box x={322} y={8} w={110} h={34} label="Renderer" />
      <Box x={322} y={58} w={110} h={34} label="Reranker" />
      <Box x={322} y={108} w={110} h={34} label="PostgreSQL" />
      <Box x={470} y={55} w={82} h={40} label="LLM ×3" sub="oai·ant·gem" red />
      <Flow d="M98 75 H160" />
      <Flow d="M260 75 C290 75 292 25 322 25" />
      <Flow d="M260 75 H322" />
      <Flow d="M260 75 C290 75 292 125 322 125" />
      <Flow d="M432 75 H470" red />
    </svg>
  );
}

export function SmartMathDiagram() {
  return (
    <svg className="diagram" viewBox="0 0 560 150" role="img" aria-label="SmartMath architecture">
      <Box x={8} y={55} w={90} h={40} label="Next.js" sub="app+admin" />
      <Box x={150} y={55} w={100} h={40} label="Elysia" sub="bun api" />
      <Box x={300} y={8} w={100} h={34} label="RabbitMQ" sub="workers" red />
      <Box x={300} y={58} w={100} h={34} label="Redis" sub="throttle" />
      <Box x={300} y={108} w={100} h={34} label="MinIO" sub="pdf store" />
      <Box x={452} y={55} w={100} h={40} label="Pinecone" sub="rag+rerank" />
      <Flow d="M98 75 H150" />
      <Flow d="M250 75 C275 75 277 25 300 25" red />
      <Flow d="M250 75 H300" />
      <Flow d="M250 75 C275 75 277 125 300 125" />
      <Flow d="M400 25 C430 25 432 75 452 72" />
    </svg>
  );
}

export function RepairPlatformDiagram() {
  return (
    <svg className="diagram" viewBox="0 0 560 150" role="img" aria-label="Repair Service Platform architecture">
      <Box x={8} y={8} w={96} h={28} label="Admin" />
      <Box x={8} y={44} w={96} h={28} label="Superadmin" />
      <Box x={8} y={80} w={96} h={28} label="LIFF" />
      <Box x={8} y={116} w={96} h={28} label="Expo app" />
      <Box x={210} y={55} w={110} h={40} label="Bun API" sub="elysia · prisma" red />
      <Box x={432} y={8} w={110} h={34} label="PDF engine" />
      <Box x={432} y={58} w={110} h={34} label="PostgreSQL" />
      <Box x={432} y={108} w={110} h={34} label="S3 + push" />
      <Flow d="M104 22 C160 22 170 65 210 68" />
      <Flow d="M104 58 C160 58 170 70 210 72" />
      <Flow d="M104 94 C160 94 170 80 210 78" />
      <Flow d="M104 130 C160 130 170 85 210 82" />
      <Flow d="M320 75 C380 75 382 25 432 25" red />
      <Flow d="M320 75 H432" />
      <Flow d="M320 75 C380 75 382 125 432 125" />
    </svg>
  );
}

export function LogisticsOaDiagram() {
  return (
    <svg className="diagram" viewBox="0 0 560 150" role="img" aria-label="Logistics LINE OA Manager architecture">
      <Box x={8} y={55} w={90} h={40} label="LINE OA" sub="webhook" />
      <Box x={150} y={55} w={110} h={40} label="Next.js" sub="bot + admin" />
      <Box x={312} y={8} w={110} h={34} label="OpenAI" sub="intent" red />
      <Box x={312} y={58} w={110} h={34} label="Review loop" />
      <Box x={312} y={108} w={110} h={34} label="Broadcast" sub="carousel" />
      <Box x={464} y={55} w={88} h={40} label="Azure AD" sub="sso" />
      <Flow d="M98 75 H150" />
      <Flow d="M260 75 C285 75 287 25 312 25" red />
      <Flow d="M312 42 C300 50 300 50 312 58" />
      <Flow d="M260 75 C285 75 287 125 312 125" />
      <Flow d="M422 75 H464" />
    </svg>
  );
}

export const diagramBySlug: Record<string, () => React.JSX.Element> = {
  "multi-llm-chat": MultiLlmChatDiagram,
  smartmath: SmartMathDiagram,
  "repair-platform": RepairPlatformDiagram,
  "logistics-line-oa": LogisticsOaDiagram,
};
