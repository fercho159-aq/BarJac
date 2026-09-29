import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { revalidateTag } from "next/cache";
import { CONTENT_TAG } from "@/lib/content/repository";

export async function GET() {
  try {
    const db = await getDb();
    const results: string[] = [];

    const promos = await db.query<{ id: string; data: any }>(
      `SELECT id, data FROM promotions WHERE data->'title'->>'es' ILIKE ANY(ARRAY['%jueves%coctelería%', '%tríos%bar%jac%'])`
    );
    for (const p of promos) {
      await db.query(`UPDATE promotions SET visible = false WHERE id = $1`, [p.id]);
      results.push(`Hidden promotion: ${p.data.title.es} (${p.id})`);
    }

    if (results.length === 0) results.push("No matching promotions found");

    revalidateTag(CONTENT_TAG);
    return NextResponse.json({ ok: true, results });
  } catch (err) {
    return NextResponse.json({ ok: false, error: String(err) }, { status: 500 });
  }
}
