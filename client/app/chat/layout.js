export default function RootLayout({ children }) {
    return (
        <div>
            <div className="hidden bg-A bg-B bg-C bg-D bg-E bg-F bg-G bg-H bg-I bg-J bg-K bg-L bg-M bg-N bg-O bg-P bg-Q bg-R bg-S bg-T bg-U bg-V bg-W bg-X bg-Y bg-Z"></div>
            <div className="hidden text-A text-B text-C text-D text-E text-F text-G text-H text-I text-J text-K text-L text-M text-N text-O text-P text-Q text-R text-S text-T text-U text-V text-W text-X text-Y text-Z"></div>
            <div className="hidden border-A border-B border-C border-D border-E border-F border-G border-H border-I border-J border-K border-L border-M border-N border-O border-P border-Q border-R border-S border-T border-U border-V border-W border-X border-Y border-Z"></div>

            {children}
        </div>
    )
}
