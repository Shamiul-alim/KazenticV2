import React from "react";
import Image from "next/image";
import leadsData from "@/data/crm/lead/leads-data.json";
import { ChevronDown, MoreHorizontal, ChevronsUpDown } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";

const getBadgeStyles = (theme: string) => {
  switch (theme) {
    case "green":
      return "bg-[#ECFDF5] text-[#10B981] border-[#05966980]";
    case "orange":
      return "bg-[#FFF7ED] text-[#F97316] border-[#FF781680]";
    default:
      return "bg-gray-100";
  }
};

const ListView = () => {
  const { listGroups } = leadsData;

  const columns = [
    "Lead Name",
    "Company Name",
    "Phone",
    "Email",
    "Lead Source",
    "Lead Owner",
    "Creation Date",
    "Follow up Date",
  ];

  return (
    <div className="w-full space-y-4 px-4 bg-[#FDFDFD]">
      {listGroups.map((group) => (
        <div key={group.id} className="flex flex-col">
          {/* Group Header */}
          <div className="flex items-center gap-2">
            <ChevronDown size={14} className="text-[#697588]" />
            <Badge className={` ${getBadgeStyles(group.theme)}`}>
              {group.title.toUpperCase()}
            </Badge>
            <Badge className={` ${getBadgeStyles(group.theme)}`}>
              {group.count}
            </Badge>
          </div>

          <Table>
            <TableHeader>
              <TableRow className="border-none">
                <TableCell className="w-[40px]">
                  <Checkbox className="w-3.5 h-3.5" />
                </TableCell>
                {columns.map((col) => (
                  <TableCell key={col} className=" font-semibold">
                    <div className="flex items-center gap-1">
                      {col} <ChevronsUpDown size={12} />
                    </div>
                  </TableCell>
                ))}
                <TableCell
                  className="w-[40px]"
                  children={undefined}
                ></TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {group.items.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <Checkbox className="w-3.5 h-3.5 border-[#EBEBEB]" />
                  </TableCell>
                  <TableCell>
                    <Link href={`/crm/lead/${item.id}`}>
                      <div className="flex items-center gap-2">
                        <Avatar className="w-5 h-5">
                          <AvatarImage src={item.avatar} />
                          <AvatarFallback>JD</AvatarFallback>
                        </Avatar>
                        <span className="truncate max-w-[100px]">
                          {item.name}
                        </span>
                      </div>
                    </Link>
                  </TableCell>
                  <TableCell className="text-[#697588]">
                    {item.company}
                  </TableCell>
                  <TableCell className="text-[#697588]">{item.phone}</TableCell>
                  <TableCell className="text-[#697588]">{item.email}</TableCell>
                  <TableCell className="text-[#697588]">
                    {item.source}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full bg-[#4157FE] flex items-center justify-center text-[8px] text-white font-bold">
                        P
                      </div>
                      <span className="text-[#697588]">{item.owner}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-[#697588]">
                    {item.creationDate}
                  </TableCell>
                  <TableCell className="text-[#697588]">
                    {item.followUp}
                  </TableCell>
                  <TableCell>
                    <MoreHorizontal
                      size={14}
                      className="text-[#9CA3AF] cursor-pointer"
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ))}
    </div>
  );
};

export default ListView;
