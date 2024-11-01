import type { APIRoute } from "astro";
import { Costumers, db } from "astro:db";

export const prerender = false;

export const GET: APIRoute = async ({ params, request }) => {

    const costumers = await db.select().from(Costumers);

    return new Response(JSON.stringify(costumers), {
        status: 200,
        headers: {
            'Content-Type': 'application/json',
        }
    });
}

export const POST: APIRoute = async ({ params, request }) => {
    try {
        const { id, ...body } = await request.json();

        const { lastInsertRowid } = await db.insert(Costumers).values(body);
        // console.log(rsp);

        return new Response(JSON.stringify({
            id: +lastInsertRowid!.toString(),
            ...body,
        }), {
            status: 201,
            headers: {
                'Content-Type': 'application/json',
            }
        });
    } catch (error) {
        return new Response(JSON.stringify({ msg: 'data empty' }), {
            status: 201,
            headers: {
                'Content-Type': 'application/json',
            }
        });
    }

}