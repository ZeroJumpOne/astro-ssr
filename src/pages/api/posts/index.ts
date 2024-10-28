import type { APIRoute } from "astro";
import { getCollection } from "astro:content";

export const prerender = false;

export const GET: APIRoute = async ( { params, request } ) => {

    const url = new URL( request.url );
    const slug = url.searchParams.get('slug');

    console.log(slug);

    const posts = await getCollection('blog');
    const post  = posts.filter( item => (item.slug === slug));

    // console.log(posts);
    console.log(post);

    if (!slug) {
        return new Response(JSON.stringify(posts), { 
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            }
        });
    } else if (post.length > 0) {
        return new Response(JSON.stringify(post), { 
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            }
        });
    } else {
        return new Response(JSON.stringify({ msg: `Post ${slug} not found`}), { 
            status: 400,
            headers: {
                'Content-Type': 'application/json',
            }
        });
    }
}