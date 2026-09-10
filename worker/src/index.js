const course = {
  course: "IT",
  title: "情報技術科",
  message: "Hello Workers",
  status: "running",
  topics: ["Web制作", "プログラミング", "ネットワーク"]
};

const events = [
  { date: "2026-09-18", title: "Workers API入門" },
  { date: "2026-10-02", title: "PagesとAPIを接続する" },
  { date: "2026-10-16", title: "公開前セキュリティ確認" }
];

const fortunes = [
  { rank: "大吉", message: "小さく試したことが、大きな発見につながります。" },
  { rank: "中吉", message: "一つずつ確認すると、思いがけず早く進みます。" },
  { rank: "吉", message: "誰かに説明してみると、理解が深まります。" },
  { rank: "末吉", message: "焦らずログを読むことが、次の一手になります。" }
];

function corsOrigin(request, env) {
  const origin = request.headers.get("Origin");
  if (!origin) return "*";
  const configured = (env.ALLOWED_ORIGINS || "")
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean);
  const isLocal = /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin);
  const isPages = /^https:\/\/[-a-z0-9]+\.pages\.dev$/i.test(origin);
  return configured.includes(origin) || isLocal || isPages ? origin : "null";
}

function jsonResponse(data, request, env, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
      "Access-Control-Allow-Origin": corsOrigin(request, env),
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
      "Vary": "Origin"
    }
  });
}

export default {
  async fetch(request, env) {
    if (request.method === "OPTIONS") {
      return jsonResponse({}, request, env);
    }
    if (request.method !== "GET") {
      return jsonResponse({ error: "Method not allowed" }, request, env, 405);
    }

    const url = new URL(request.url);
    if (url.pathname === "/api") {
      return jsonResponse({ status: "ok", service: "ih13-osakiyosuke-api" }, request, env);
    }
    if (url.pathname === "/api/course") {
      return jsonResponse(course, request, env);
    }
    if (url.pathname === "/api/hello") {
      const name = (url.searchParams.get("name") || "").trim();
      if (!name || name.length > 50) {
        return jsonResponse({ error: "name is required" }, request, env, 400);
      }
      return jsonResponse({ message: `${name}さん、こんにちは！`, name }, request, env);
    }
    if (url.pathname === "/api/fortune") {
      const result = fortunes[Math.floor(Math.random() * fortunes.length)];
      return jsonResponse({ date: new Date().toISOString().slice(0, 10), ...result }, request, env);
    }
    if (url.pathname === "/api/events") {
      return jsonResponse({ events }, request, env);
    }
    return jsonResponse({ error: "Not found" }, request, env, 404);
  }
};