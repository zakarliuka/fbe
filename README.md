# Test Drizzle ORM

Test drizzle ORM project

## Installation

1. Clone this repository to your local machine:

   ```bash
   git clone git@github.com:zakarliuka/fbe.git
   ```

2. Change into the project directory:

   ```bash
   cd fbe
   ```

3. Install dependencies using Yarn:

   ```bash
   yarn
   ```

## Usage

### Development

Run the following command to start the development server with nodemon:

```bash
yarn dev
```

This will watch for changes in the `./src` directory and restart the server accordingly.

### Building

To build the project, run the following command:

```bash
yarn build
```

This command will remove the `./dist` directory, transpile TypeScript files, and run `tsc-alias` to handle TypeScript path aliases.

### Running

To start the built application, use the following command:

```bash
yarn start
```

### Database Operations

#### Generating SQLite Database

To generate an SQLite database based on the schema defined in `./db/schema.ts`, run:

```bash
yarn db:g
```

#### Running Migrations

To run database migrations, execute the following command:

```bash
yarn db:m
```

This uses `ts-node` to run the migration script located at `./db/migrate.ts`.

## Scripts Overview

- `dev`: Start the development server with nodemon.
- `build`: Remove the `./dist` directory, transpile TypeScript files, and run `tsc-alias`.
- `start`: Start the built application.
- `db:g`: Generate an SQLite database using Drizzle Kit based on the schema in `./db/schema.ts`.
- `db:m`: Run database migrations using the migration script at `./db/migrate.ts`
