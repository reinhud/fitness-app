


export default function AccountSection ({header, buttons}) {
    return (
        <section className="flex flex-col space-y-4">
            <h2 className="text-2xl font-semibold">{header}</h2>
            <div className="flex flex-col space-y-2">
                {buttons}
            </div>
        </section>
    )
}