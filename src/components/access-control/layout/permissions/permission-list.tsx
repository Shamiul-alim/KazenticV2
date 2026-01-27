import { ChevronDown, ChevronDownCircle, ChevronsUpDown } from "lucide-react"
import { Button } from "../../ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../ui/table"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../../ui/accordion"
import { Fragment } from "react/jsx-runtime"

const data = [
    {
        module: "ORGANIZATION SETTINGS",
        permissions: [
            "View Organization Profile",
        ],
    },
    {
        module: "DASHBOARD",
        permissions: [
            "View Admin Dashboard",
            "View Employee Dashboard",
        ],
    },
    {
        module: "USERS",
        permissions: [
            "View User List",
            "View User Profile",
            "View Salary Information",
            "Manage Users",
        ],
    },
]

export function PermissionList() {
    return (
        <div className="rounded-xl border bg-card p-4 grow">
            <h2 className="text-sm font-semibold mb-4">Permission List</h2>

            <div className="overflow-hidden rounded-xl border border-[#EBEBEB]">
                <Table>
                    <colgroup>
                        <col style={{ width: "20%" }} />
                        <col style={{ width: "100%" }} />
                    </colgroup>
                    <TableHeader>
                        <TableRow>
                            <TableHead>
                                Module Name
                                <ChevronsUpDown className="ml-2 inline-block h-4 w-4 cursor-pointer text-[#697588]" />
                            </TableHead>
                            <TableHead>
                                Permission Name
                                <ChevronsUpDown className="ml-2 inline-block h-4 w-4 cursor-pointer text-[#697588]" />
                            </TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {data.map((item) => (
                            <TableRow key={item.module}>
                                <TableCell className="font-medium">
                                    {item.module}
                                </TableCell>

                                <TableCell className="space-y-2.5 w-full">
                                    <Accordion
                                        type="single"
                                        collapsible
                                        className="w-full bg-transparent border-0"
                                    >
                                        <AccordionItem value="shipping" className="w-full border-0 hover:border-0">
                                            <AccordionTrigger className="hover:no-underline">{item.permissions[0]}</AccordionTrigger>
                                            <AccordionContent>
                                                {item.permissions.map((p) => (
                                                    <p>What to show?</p>
                                                ))}
                                            </AccordionContent>
                                        </AccordionItem>

                                    </Accordion>
                                </TableCell>

                                {/* <TableCell className="text-right">
                                    <Button variant="ghost" size="icon">
                                        <ChevronDownCircle className="h-4 w-4" />
                                    </Button>
                                </TableCell> */}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div >
    )
}
