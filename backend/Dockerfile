# Utvikling
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS development
WORKDIR /app
COPY *.csproj ./
RUN dotnet restore
COPY . ./
ENV ASPNETCORE_URLS="http://0.0.0.0:5182"
CMD ["dotnet", "watch", "run", "--urls", "http://0.0.0.0:5182"]

# Bygg
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app
# Copy everything and restore properly
COPY . ./
RUN dotnet restore
# Then publish
RUN dotnet publish -c Release -o out

#Produksjon
FROM mcr.microsoft.com/dotnet/aspnet:8.0-alpine AS production
WORKDIR /app
COPY --from=build /app/out .
RUN find . -name "*.pdb" -type f -delete
ENV ASPNETCORE_URLS="http://0.0.0.0:5182"
ENTRYPOINT ["dotnet", "backend.dll"]