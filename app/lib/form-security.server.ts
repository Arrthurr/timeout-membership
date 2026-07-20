export function getClientIp(request: Request): string | undefined {
  const cfConnectingIp = request.headers.get("cf-connecting-ip");
  if (cfConnectingIp) return cfConnectingIp.trim();

  const xRealIp = request.headers.get("x-real-ip");
  if (xRealIp) return xRealIp.trim();

  const xForwardedFor = request.headers.get("x-forwarded-for");
  if (!xForwardedFor) return undefined;

  const firstIp = xForwardedFor.split(",")[0];
  return firstIp?.trim() || undefined;
}

export async function verifyTurnstileToken(
  token: string,
  remoteIp: string | undefined,
  secretKey: string,
): Promise<boolean> {
  const body = new URLSearchParams();
  body.set("secret", secretKey);
  body.set("response", token);
  if (remoteIp) {
    body.set("remoteip", remoteIp);
  }

  const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body,
  });

  if (!response.ok) {
    return false;
  }

  const payload = (await response.json()) as { success?: boolean };
  return payload.success === true;
}
