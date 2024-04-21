# Models

The `models` directory contains a list of database models and repositories corresponding to the specific database layer.

## Sequelize

Models are defined as js classes. The model should be initialized with the correct columns to make it work. If you add a new model,
you have to also set it in the `configureModels.js` files. After this you can use this in your endpoints as `models.Modelnames`.
Convention is to use singular for the models, but export them from `configureModels` as a plural.

## TypeORM

In TypeORM there are multiple folders: `entities` are the separate database tables as classes, `repositories` add the functionality to them,
while we can change them safely through `migrations`.

### Entities

Entities are classes that define the columns of the table in simple data classes (no function should be defined here). TypeORM configures the
columns with annotations, e.g. `@Entity`, `@Column`. It is recommended to add a `@PrimaryGeneratedColumn` as id, and the `timestamps` for create
and soft delete tracking. For more information, see: [TypeORM documentation on Entities](https://typeorm.io/entities).

```ts
@Entity({ name: 'Modelname' })
export default class Modelname {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar' })
    name: string;

    // add more columns...

    @CreateDateColumn({ select: false })
    createdAt: Date;

    @UpdateDateColumn({ select: false })
    updatedAt: Date;

    @DeleteDateColumn({ nullable: true, select: false })
    deletedAt: Date | null;
}
```

### Repositories

Repositories add the functionality to the entities. Most of the time you can simply export `getRepository(Entity)`, and it attaches
the basic functions (e.g. `find`, `findAll`, `create`, `update` and `delete`). If you want to add custom functionality, use the `extend` function.
For more information see: [TypeORM documentation on Repositories](https://typeorm.io/custom-repository).

```ts
export default function createModelnamesRepo(dataSource: DataSource) {
    return dataSource.getRepository(Modelname).extends({
        // add custom funstions ...
    });
}
```

Convention is to use singular for the entity, and plural for the repository. Repositories should be configured in `configureModels.ts`,
and be used in the endpoints as `models.Modelnames`.

### Migrations

TypeORM supports [migrations](https://typeorm.io/migrations) out-of-the box. Migrations are classes with up and down functions,
which can change the database schema with arbitrary SQL queries to reach the desired schema and roll it back.

Migrations are rarely written by hand, instead they can be generated automatically. TypeORM introspects the database and discover
differences between the entities. It writes these files to the migrations directory, from which we can run them or roll back.

#### Usage

To create a new migration, first modify the entities (e.g. create a new entity, add new column, etc.). If there is a difference
between the database and the entities, we can run the `db:migrate:gen` command. It should be run with a single parameter that describes
the changes (e.g. `CreateNewEntity`, `AddNewColumn`).

```sh
npm run db:migrate:gen CreateNewEntity
```

This will create a file in `src/models/migrations/$TIMESTAMP-CreateNewEntity.ts`, which will contain all necessary SQL queries to change the
database between the states. It might be inspected manually, to be formatted or add some manual changes (e.g. adding data to new columns).

To apply the migrations, we can run `db:migrate`:

```sh
npm run db:migrate
```

A simple command that can be used on the first download of the project is `db:fresh` . It will reset the database, run all migrations from scratch,
and if it contains a seed, it fills the database with it. Be careful with this command, because it **deletes all existing data**.

```sh
npm run db:fresh
```

To drop down the low-level commands of [TypeORM migrations](https://typeorm.io/migrations), use `npm run typeorm`.
For example, to see the applied migrations:

```sh
npm run typeorm migration:show
```
