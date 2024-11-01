import { z } from "astro/zod";
import { defineAction } from "astro:actions";
import { db, eq, Posts } from "astro:db";

export const getPostLikes = defineAction({
    accept: "json",
    input: z.string(),
    handler: async (postId) => {

        const posts = await db.select().from(Posts).where(eq(Posts.id, postId));
        // console.log({posts});

        return {
            likes: posts.at(0)?.likes ?? 0,
            isaac: 'ver si es cierto',
        };
    },
});
