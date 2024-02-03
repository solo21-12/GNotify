build:
	dotnet build
run:
	dotnet watch run
drun:
	docker run -p 8081:80 -e ASPNETCORE_URLS=http://+:80 goma
dbuild:
	docker build -t goma . 