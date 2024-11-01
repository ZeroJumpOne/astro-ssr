import type { APIRoute } from "astro";
import { Costumers, db, eq } from "astro:db";

export const prerender = false;

export const GET: APIRoute = async ({ params, request }) => {

    const { id } = params ?? '';

    const costumers = await db.select().from(Costumers).where(eq(Costumers.id, +id!));

    if (costumers.length === 0) {
        return new Response(JSON.stringify({
            msg: `Client with id ${id} not found`,
        }), {
            status: 404,
            headers: {
                'Content-Type': 'application/json',
            }
        });
    }

    return new Response(JSON.stringify(costumers.at(0)), {
        status: 200,
        headers: {
            'Content-Type': 'application/json',
        }
    });
}

export const DELETE: APIRoute = async ({ params, request }) => {

    const id = params.id ?? '';

    const { rowsAffected } = await db.delete(Costumers).where(eq(Costumers.id, +id));

    if (rowsAffected) {
        return new Response(JSON.stringify({ msg: 'Deleted' }), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            }
        });
    }

    return new Response(JSON.stringify({ msg: `Record ${id} not found` }), {
        status: 404,
        headers: {
            'Content-Type': 'application/json',
        }
    });

}

export const PATCH: APIRoute = async ({ params, request }) => {

    const costumerId = params.id ?? '';
    // console.log(costumerId);

    try {
        const { id, ...body } = await request.json();
        // console.log(body);

        // update table campos condicion
        const result = await db.update(Costumers).set(body).where(eq(Costumers.id, +costumerId));
        const costumer = await db.select().from(Costumers).where(eq(Costumers.id, +costumerId));

        return new Response(JSON.stringify(costumer.at(0)), {
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
