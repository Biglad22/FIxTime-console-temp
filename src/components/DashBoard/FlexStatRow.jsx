
// FLEXER SINGLE STAT STAT 
// this is component for each row of user claim history table 
// it takes title, value, and any secondary information as addOn

function FlexerStat({title='test title', value ='test value', addOn}) {
    return(
        <tr className="h-fit capitalize font-medium text-high text-sm bg-surface">
            <td className=" w-[50%] md:w-[40%] xl:w-[30%] text-accent py-2 px-3 rounded-l-[0.22rem] border-none">
                {title}
            </td>
            <td className="py-1 px-3 rounded-r-[0.22rem] border-none">
                {value}
                {addOn && <span className="block text-xs text-medium font-normal">{addOn}</span>}
            </td>
        </tr>
    )
}
export default FlexerStat