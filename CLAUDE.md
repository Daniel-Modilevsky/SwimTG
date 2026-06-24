# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository layout

This is a monorepo with two independently git-tracked projects:

- `API/` — ASP.NET Core 10 Web API
- `client/` — Angular 22 SPA

The solution file `swim-tg.slnx` references only the API project.

## Commands

### API (`API/`)

```bash
dotnet run               # start the API (HTTP, localhost:5001)
dotnet build             # compile
dotnet ef database update   # apply pending EF Core migrations
dotnet ef migrations add <Name>   # generate a new migration
dotnet ef migrations remove       # drop the last unapplied migration
dotnet tool restore      # install dotnet-ef if EF commands are missing
```

### Client (`client/`)

```bash
npm start        # ng serve — dev server on localhost:4200
npm run build    # production build
npm test         # vitest unit tests
```

## Architecture

### API

ASP.NET Core 10 minimal-hosting model backed by SQLite via EF Core 9. No HTTPS redirect or auth middleware is wired up yet; the app runs plain HTTP in development.

- `Entities/` — plain C# domain models, no EF attributes (convention-based mapping)
- `Data/AppDbContext.cs` — single `DbContext`; add `DbSet<T>` here for new entities
- `Data/Migrations/` — always generated via CLI, never hand-edited
- `Controllers/` — `ControllerBase` controllers with `[Route("api/[controller]")]`
- SQLite file `swimtg.db` lives in `API/`; connection string is in `appsettings.Development.json`
- `WeatherForecastController` and `WeatherForecast` are template stubs — remove when real endpoints are added

### Client

Angular 22 standalone-component app with SCSS. No `HttpClient` or API integration is wired up yet — `app.config.ts` only provides the router.

- `src/app/app.ts` — root component (standalone, imports `RouterOutlet`)
- `src/app/app.config.ts` — application config (`provideRouter`)
- `src/app/app.routes.ts` — route definitions
- Component styles use SCSS (configured in `angular.json` schematics)
- Tests run with vitest (not Karma)
