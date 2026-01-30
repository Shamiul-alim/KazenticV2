import { ChevronsUpDown } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"

export function TaskTable({
    columns,
    rows,
}: {
    columns: string[]
    rows: string[][]
}) {
    return (
        <div className="rounded-lg border overflow-hidden">
            <div className="overflow-x-auto">
                <Table>
                    <TableHeader>
                        <TableRow>
                            {columns.map((col) => (
                                <TableHead key={col} className="h-6 sm:h-8 text-[10px] sm:text-xs whitespace-nowrap">
                                    {col}
                                    <ChevronsUpDown className="ml-1 sm:ml-2 inline-block h-2.5 w-2.5 sm:h-3 sm:w-3 text-[#191F38]" />
                                </TableHead>
                            ))}
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {rows.map((row, i) => (
                            <TableRow key={i}>
                                {row.map((cell, j) => (
                                    <TableCell key={j} className="text-[10px] sm:text-xs py-2 sm:py-3 whitespace-nowrap">
                                        {cell}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}