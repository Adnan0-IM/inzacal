import type { LucideProps } from "lucide-react"

type StartsProps = {
    heading?: string
    description?: string
    stats : {
        value: string
        label: string
        icon: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>
    }[]
}
    

export default function StatsSection({ stats}: StartsProps) {
    return (
        <section className="">
            <div className="mx-auto max-w-5xl space-y-8 px-6 md:space-y-16">
                {/* <div className="relative z-10 mx-auto max-w-xl space-y-6 text-center">
                    <h2 className="text-3xl font-medium lg:text-4xl">{heading}</h2>
                    <p>{description}</p>
                </div> */}

                <div className="grid gap-12 divide-y *:text-center md:grid-cols-4 md:gap-2 md:divide-x md:divide-y-0">
                    {stats.map((stat, index) => (
                        <div className="space-y-4" key={index}>
                            <div className="text-3xl font-bold">{stat.value}</div>
                            <p>{stat.label}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
