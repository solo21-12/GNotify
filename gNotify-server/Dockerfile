# Build Stage
FROM mcr.microsoft.com/dotnet/sdk:6.0 as build-env
WORKDIR /app

EXPOSE 80
EXPOSE 443

COPY *.csproj ./
RUN dotnet restore

COPY . ./
RUN dotnet publish -c Release -o out

# Production Stage
FROM mcr.microsoft.com/dotnet/aspnet:6.0 as production-env
WORKDIR /app

COPY --from=build-env /app/out .

CMD ["dotnet", "gNotify-server.dll"]
