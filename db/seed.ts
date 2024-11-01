import { getCollection } from 'astro:content';
import { Costumers, db, Posts } from 'astro:db';

// https://astro.build/db/seed
export default async function seed() {
	// TODO
	await db.insert(Costumers).values([
		{ id: 1, name: "Sandra Liliana", age: 36, isActive: false },
		{ id: 2, name: "Isaac Julio", age: 18, isActive: true },
		{ id: 3, name: "Silvia America Esperanza", age: 15, isActive: true },
		{ id: 4, name: "Sandra Victoria", age: 12, isActive: true },
		{ id: 5, name: "Edmond Alfredo", age: 8, isActive: true },
	]);

	const posts = await getCollection('blog');

	await db.insert(Posts).values(
		posts.map( p => ({
			id: p.id,
			title: p.data.title,
			likes: Math.round( Math.random() * 100 )
		}))
	)

	console.log('Seed excuted');
}
