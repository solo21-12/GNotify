using Ocelot.DependencyInjection;
using Ocelot.Middleware;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

//configure ocelot

builder.Configuration.SetBasePath(builder.Environment.ContentRootPath)
.AddJsonFile("ocelot.json", optional: false, reloadOnChange: true)
.AddEnvironmentVariables();

builder.Services.AddOcelot(builder.Configuration);

var app = builder.Build();

// Configure the HTTP request pipeline.


await app.UseOcelot();

app.Run();

