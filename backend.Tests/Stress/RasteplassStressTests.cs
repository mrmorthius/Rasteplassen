using NBomber.CSharp;
using NBomber.Contracts;
using System;
using System.Net.Http;
using System.Threading.Tasks;
using Xunit;

namespace backend.Tests.Stress
{
    public class RasteplassStressTests
    {
        private readonly string _baseUrl = "http://localhost:8080";
        private static readonly HttpClient _httpClient = new HttpClient() { Timeout = TimeSpan.FromSeconds(10) };

        [Fact(Skip = "Remove if you want to test")]
        public void RunSimpleConnectivityTest()
        {
            var scenario = Scenario.Create("connectivity_test", async context =>
            {
                try
                {
                    var response = await _httpClient.GetAsync($"{_baseUrl}/api/rasteplass");

                    return response.IsSuccessStatusCode 
                        ? Response.Ok() 
                        : Response.Fail();
                }
                catch (Exception ex)
                {
                    return Response.Fail();
                }
            })
            .WithLoadSimulations(
                Simulation.Inject(rate: 2, interval: TimeSpan.FromSeconds(1), during: TimeSpan.FromSeconds(30))
            );

            NBomberRunner
                .RegisterScenarios(scenario)
                .Run();
        }

        [Fact(Skip = "Remove if you want to test")]
        public void RunBasicLoadTest()
        {
            var scenario = Scenario.Create("get_all_rasteplasser", async context =>
            {
                try
                {
                    var response = await _httpClient.GetAsync($"{_baseUrl}/api/rasteplass");

                    return response.IsSuccessStatusCode 
                        ? Response.Ok() 
                        : Response.Fail();
                }
                catch (Exception ex)
                {
                    return Response.Fail();
                }
            })
            .WithLoadSimulations(
                Simulation.Inject(rate: 5, interval: TimeSpan.FromSeconds(1), during: TimeSpan.FromMinutes(1))
            );

            NBomberRunner
                .RegisterScenarios(scenario)
                .Run();
        }

        [Fact(Skip = "Remove if you want to test")]
        public void RunSpikeTest()
        {
            var scenario = Scenario.Create("get_rasteplass_by_id", async context =>
            {
                var randomId = Random.Shared.Next(1, 10);

                try
                {
                    var response = await _httpClient.GetAsync($"{_baseUrl}/api/rasteplass/{randomId}");

                    if (response.IsSuccessStatusCode || response.StatusCode == System.Net.HttpStatusCode.NotFound)
                    {
                        return Response.Ok();
                    }
                    else
                    {
                        return Response.Fail();
                    }
                }
                catch (Exception ex)
                {
                    return Response.Fail();
                }
            })
            .WithLoadSimulations(
                Simulation.Inject(rate: 2, interval: TimeSpan.FromSeconds(1), during: TimeSpan.FromSeconds(30)),
                Simulation.Inject(rate: 10, interval: TimeSpan.FromSeconds(1), during: TimeSpan.FromSeconds(15)),
                Simulation.Inject(rate: 2, interval: TimeSpan.FromSeconds(1), during: TimeSpan.FromSeconds(30))
            );

            NBomberRunner
                .RegisterScenarios(scenario)
                .Run();
        }

        [Fact(Skip = "Remove if you want to test")]
        public void RunMixedWorkloadTest()
        {
            var getAllScenario = Scenario.Create("get_all", async context =>
            {
                try
                {
                    var response = await _httpClient.GetAsync($"{_baseUrl}/api/rasteplass");
                    return response.IsSuccessStatusCode 
                        ? Response.Ok() 
                        : Response.Fail();
                }
                catch (Exception ex)
                {
                    return Response.Fail();
                }
            })
            .WithWeight(50)
            .WithLoadSimulations(
                Simulation.Inject(rate: 3, interval: TimeSpan.FromSeconds(1), during: TimeSpan.FromMinutes(1))
            );

            var getByKommuneScenario = Scenario.Create("get_by_kommune", async context =>
            {
                var kommuner = new[] { "Oslo", "Bergen", "Trondheim", "Stavanger" };
                var randomKommune = kommuner[Random.Shared.Next(kommuner.Length)];

                try
                {
                    var response = await _httpClient.GetAsync($"{_baseUrl}/api/rasteplass/kommune/{randomKommune}");
                    return response.IsSuccessStatusCode 
                        ? Response.Ok() 
                        : Response.Fail();
                }
                catch (Exception ex)
                {
                    return Response.Fail();
                }
            })
            .WithWeight(50)
            .WithLoadSimulations(
                Simulation.Inject(rate: 3, interval: TimeSpan.FromSeconds(1), during: TimeSpan.FromMinutes(1))
            );

            NBomberRunner
                .RegisterScenarios(getAllScenario, getByKommuneScenario)
                .Run();
        }

        [Fact(Skip = "Remove if you want to test")]
        public void RunRateLimitTest()
        {
            var scenario = Scenario.Create("rate_limit_test", async context =>
            {
                try
                {
                    var response = await _httpClient.GetAsync($"{_baseUrl}/api/rasteplass");

                    if (response.StatusCode == System.Net.HttpStatusCode.TooManyRequests)
                    {
                        return Response.Ok(statusCode: "429");
                    }
                    else if (response.IsSuccessStatusCode)
                    {
                        return Response.Ok();
                    }
                    else
                    {
                        return Response.Fail();
                    }
                }
                catch (Exception ex)
                {
                    return Response.Fail();
                }
            })
            .WithLoadSimulations(
                Simulation.Inject(rate: 8, interval: TimeSpan.FromSeconds(1), during: TimeSpan.FromSeconds(30))
            );

            NBomberRunner
                .RegisterScenarios(scenario)
                .Run();
        }

        [Fact(Skip = "Remove if you want to test")]
        public void RunEnduranceTest()
        {
            var scenario = Scenario.Create("endurance_test", async context =>
            {
                var endpoints = new[]
                {
                    "/api/rasteplass",
                    "/api/rasteplass/kommune/Oslo",
                    "/api/rasteplass/fylke/Oslo"
                };

                var randomEndpoint = endpoints[Random.Shared.Next(endpoints.Length)];

                try
                {
                    var response = await _httpClient.GetAsync($"{_baseUrl}{randomEndpoint}");
                    return response.IsSuccessStatusCode 
                        ? Response.Ok() 
                        : Response.Fail();
                }
                catch (Exception ex)
                {
                    return Response.Fail();
                }
            })
            .WithLoadSimulations(
                Simulation.Inject(rate: 5, interval: TimeSpan.FromSeconds(1), during: TimeSpan.FromMinutes(3))
            );

            NBomberRunner
                .RegisterScenarios(scenario)
                .Run();
        }
    }
}