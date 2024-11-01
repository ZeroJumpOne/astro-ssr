import { column, defineDb, defineTable } from 'astro:db';

const Costumers = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    name: column.text(),
    age: column.number(),
    isActive: column.boolean(),
  }
})

const Posts = defineTable({
  columns: {
    id: column.text({ primaryKey: true}),
    title: column.text(),
    likes: column.number(),
  }
})


// https://astro.build/db/config
export default defineDb({
  tables: {
    Costumers,
    Posts,
  }
});
