// app/api/flipper/route.ts
import path from "path";
import { promises as fs } from "fs";

export const runtime = "nodejs"; // ensure Node runtime (needed for fs)

export async function GET() {
  const filePath = path.join(process.cwd(), "public", "Flipper.pdf");
  const file = await fs.readFile(filePath);
  return new Response(new Uint8Array(file), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": 'attachment; filename="Flipper.pdf"',
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
