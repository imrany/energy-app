import { useParams } from "react-router-dom"
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
import { useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function LocationStats(){
    const { id }=useParams()
    const chartData = [
        { energy: "Energy Sources", wind: 12, solar: 305, gas: 120, coal: 190 },
    ]  

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

    useEffect(()=>{

    },[])
    return(
        <div className="h-screen flex flex-col my-2">
            <div className="flex flex-col pb-4 gap-2 w-full px-4 max-sm:px-3">
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                        <BreadcrumbLink href="/">My Locations</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                        <BreadcrumbLink href="/">Statistics</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                        <BreadcrumbPage>{id}</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </div>
            <div className="flex flex-col gap-2 px-4 max-sm:px-3">
                <Card>
                    <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
                        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
                            <CardTitle>Bar Chart - Location statistics</CardTitle>
                            <CardDescription>
                                Showing total energy sources for location {id}
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
                                        {chartData[0][chart]}
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
                                data={chartData}
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
                            <CardTitle>Energy consumptiom</CardTitle>
                            <CardDescription>
                                Showing energy consumed by sources
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
                                        {chartData[0][chart]} WHs/day
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