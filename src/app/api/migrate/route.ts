import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { revalidateTag } from "next/cache";
import { CONTENT_TAG } from "@/lib/content/repository";

export async function GET() {
  try {
    const db = await getDb();
    const results: string[] = [];

    const allPromos = await db.query<{ id: string; visible: boolean; data: any }>(
      `SELECT id, visible, data FROM promotions ORDER BY sort_order`
    );
    for (const p of allPromos) {
      results.push(`[${p.visible ? "visible" : "hidden"}] ${p.data.title?.es ?? "no title"} (${p.id})`);
    }

    const jueves = allPromos.filter(p => /jueves/i.test(p.data.title?.es ?? ""));
    for (const p of jueves) {
      if (p.visible) {
        await db.query(`UPDATE promotions SET visible = false WHERE id = $1`, [p.id]);
        results.push(`>>> Hidden: ${p.data.title.es} (${p.id})`);
      }
    }

    revalidateTag(CONTENT_TAG);
    return NextResponse.json({ ok: true, results });
  } catch (err) {
    return NextResponse.json({ ok: false, error: String(err) }, { status: 500 });
  }
}
