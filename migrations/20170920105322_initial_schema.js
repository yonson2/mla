exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable("Leagues", table => {
      table.increments("id");
      table
        .string("name")
        .notNullable()
        .unique();
      table.timestamp("created_at").defaultTo(knex.fn.now());
      // from https://stackoverflow.com/a/46106302
      // ONLY WORKS ON MYSQL, needs a trigger to work on pg and sqlite
      // table
      //   .timestamp("updated_at")
      //   .defaultTo(knex.raw("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"));
      table.string("password").notNullable();
      table.string("user_password").notNullable();
      table.string("email");
    }),

    knex.schema.createTable("Users", table => {
      table.increments("id");
      table.string("name").notNullable();
      table.integer("dci").notNullable();
      table
        .integer("league")
        .notNullable()
        .references("Leagues.id");
      table.index(["dci"], "User_ix_DCI");
    }),

    knex.schema.createTable("Matches", table => {
      table.increments("id");
      table
        .integer("user")
        .notNullable()
        .references("Users.id");
      table
        .integer("against")
        .notNullable()
        .references("Users.id");
      table.integer("win");
      table.integer("tie").notNullable();
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable("League"),
    knex.schema.dropTable("Users"),
    knex.schema.dropTable("Matches")
  ]);
};
