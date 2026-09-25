import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { revalidateTag } from "next/cache";
import { CONTENT_TAG } from "@/lib/content/repository";

export async function GET() {
  try {
    const db = await getDb();
    const results: string[] = [];

    // 1. Hide "Desayunos" and "Mariscos" categories
    const cats = await db.query<{ id: string; data: any }>(
      `SELECT id, data FROM menu_categories WHERE data->'name'->>'es' IN ('Desayunos', 'Mariscos')`
    );
    for (const cat of cats) {
      await db.query(`UPDATE menu_categories SET visible = false WHERE id = $1`, [cat.id]);
      results.push(`Hidden category: ${cat.data.name.es} (${cat.id})`);
    }

    // 2. Move "Dedos de queso" to "Snacks" category
    const snacks = await db.query<{ id: string }>(
      `SELECT id FROM menu_categories WHERE data->'name'->>'es' ILIKE '%snack%' LIMIT 1`
    );
    if (snacks[0]) {
      const dedos = await db.query<{ id: string }>(
        `SELECT id FROM menu_items WHERE data->'name'->>'es' ILIKE '%dedo%queso%' LIMIT 1`
      );
      if (dedos[0]) {
        await db.query(`UPDATE menu_items SET category_id = $1 WHERE id = $2`, [snacks[0].id, dedos[0].id]);
        results.push(`Moved "Dedos de queso" (${dedos[0].id}) to Snacks (${snacks[0].id})`);
      } else {
        results.push("Item 'Dedos de queso' not found");
      }
    } else {
      results.push("Category 'Snacks' not found");
    }

    revalidateTag(CONTENT_TAG);
    return NextResponse.json({ ok: true, results });
  } catch (err) {
    return NextResponse.json({ ok: false, error: String(err) }, { status: 500 });
  }
}
