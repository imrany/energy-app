import { Link } from "react-router-dom"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import { ChartConfig, ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { useContext, useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { GlobalContext } from "@/context"

export default function Statistics(){
    const {API_URL}=useContext(GlobalContext)
    const [nationalSources,setNationalSources]=useState([{
        energy: "Energy Sources", wind: 0, solar: 0, gas: 0, coal: 0
    }])

    const chartConfig = {
        wind: {
          label: "Wind",
          color: "#2563eb",
        },
        solar: {
          label: "Solar",
          color: "#60a5f3",
        },
        gas: {
            label: "Gas",
            color: "#2563eb",
        },
        coal: {
            label: "Coal",
            color: "#60a5fa",
        },
    } satisfies ChartConfig

    async function getnationalSources(){
        try {
            let url=`${API_URL}/api/national-sources`
            const response=await fetch(url)
            const parseRes=await response.json()
            if(parseRes.error){
                console.log(parseRes.error)
            }else{
                const stats=parseRes.sources[0]
                setNationalSources([{
                    energy: "Energy Sources", 
                    wind: Math.round(stats.wind), 
                    solar: Math.round(stats.solar),
                    gas: Math.round(stats.gas), 
                    coal: Math.round(stats.coal)
                }])
            }
        } catch (error:any) {
            console.log(error.message)
        }
    }

    useEffect(()=>{
        getnationalSources()
    },[])
    return(
        <div className="h-screen flex flex-col my-2">
            <div className="flex flex-col pb-4 gap-2 w-full px-4 max-sm:px-3">
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link to="/">
                                My Locations
                            </Link>
                        </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                        <BreadcrumbPage>Statistics</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </div>
            <div className="flex flex-col gap-2 px-4 max-sm:px-3">
                <Card>
                    <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
                        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
                            <CardTitle>National energy statistics</CardTitle>
                            <CardDescription>
                                Showing total national energy sources
                            </CardDescription>
                        </div>
                        <div className="flex">
                            {["wind", "solar","gas","coal"].map((key) => {
                                const chart = key as keyof typeof chartConfig
                                return (
                                <button
                                    key={chart}
                                    className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
                                >
                                    <span className="text-xs text-muted-foreground">
                                    {chartConfig[chart].label}
                                    </span>
                                    <span className="text-lg font-bold leading-none sm:text-2xl">
                                        {nationalSources[0][chart]}
                                    </span>
                                </button>
                                )
                            })}
                        </div>
                    </CardHeader>
                    <CardContent className="px-2 sm:p-6">
                        <ChartContainer
                            config={chartConfig}
                            className="aspect-auto h-[250px] w-full"
                        >
                            <BarChart
                                accessibilityLayer
                                data={nationalSources}
                                margin={{
                                left: 12,
                                right: 12,
                                }}
                            >
                                <CartesianGrid vertical={false} />
                                <XAxis
                                    dataKey="energy"
                                    tickLine={false}
                                    tickMargin={10}
                                    axisLine={false}
                                    tickFormatter={(value) => value}
                                />
                                <ChartTooltip content={<ChartTooltipContent />} />
                                <ChartLegend content={<ChartLegendContent />} />
                                <Bar dataKey="wind" fill="var(--color-wind)" radius={4} />
                                <Bar dataKey="solar" fill="var(--color-solar)" radius={4} />
                                <Bar dataKey="gas" fill="var(--color-gas)" radius={4} />
                                <Bar dataKey="coal" fill="var(--color-coal)" radius={4} />
                            </BarChart>
                        </ChartContainer>
                    </CardContent>
                </Card>

                <Card className="my-2">
                    <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
                        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
                            <CardTitle>National energy consumption</CardTitle>
                            <CardDescription>
                                Showing national energy consumed by sources
                            </CardDescription>
                        </div>
                    </CardHeader>
                    <CardContent className="flex">
                        {["wind", "solar","gas","coal"].map((key) => {
                            const chart = key as keyof typeof chartConfig
                            return (
                                <div
                                    key={chart}
                                    className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
                                >
                                    <span className="text-xs text-muted-foreground">
                                        {chartConfig[chart].label}
                                    </span>
                                    <span className="text-sm leading-none">
                                        {nationalSources[0][chart]!==0?Math.round(nationalSources[0][chart]-2):nationalSources[0][chart]} WHs/day
                                    </span>
                                </div>
                            )
                        })}
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}