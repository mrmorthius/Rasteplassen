# Utvikling
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS development
WORKDIR /app
COPY . ./
RUN dotnet restore
ENV ASPNETCORE_URLS="http://0.0.0.0:5182"
CMD ["dotnet", "watch", "run", "--urls", "http://0.0.0.0:5182"]

# Produksjon
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /app
COPY . ./
RUN dotnet restore
RUN dotnet publish -c Release -o out

FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS production
WORKDIR /app
COPY --from=build /app/out .
ENV ASPNETCORE_URLS="http://0.0.0.0:5182"
ENTRYPOINT ["dotnet", "backend.dll"]