"use client";

import * as React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { parseClockToMinutes, formatMinutesToClock } from "../utils/time";

export type TimeOption = { mins: number; label: string };

export function TimePickerCell(props: {
  value: string;
  placeholder?: string;

  pillClassName: string;
  textClassName?: string;

  options: TimeOption[];
  onOpen?: () => void;

  onSelectLabel: (label: string) => void;
  renderRight?: (opt: TimeOption) => React.ReactNode;
  disabled?: boolean;
}) {
  const {
    value,
    placeholder = "—",
    pillClassName,
    textClassName = "text-xs font-medium text-[#191F38]",
    options,
    onOpen,
    onSelectLabel,
    renderRight,
    disabled = false,
  } = props;

  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return options;
    return options.filter((t) => t.label.toLowerCase().includes(q));
  }, [options, query]);

  const display = value?.trim() ? value : placeholder;

  return (
    <Popover
      open={open}
      onOpenChange={(v) => {
        if (!v) setQuery("");
        setOpen(v);
        if (v) onOpen?.();
      }}
      modal={false}
    >
      <PopoverTrigger asChild>
        <button
          type="button"
          disabled={disabled}
          className={[
            pillClassName,
            "flex items-center justify-center text-center",
            disabled ? "opacity-60 cursor-not-allowed" : "cursor-pointer",
          ].join(" ")}
          onMouseDown={(e) => e.stopPropagation()}
          onClick={(e) => e.stopPropagation()}
        >
          <span className={textClassName}>{display}</span>
        </button>
      </PopoverTrigger>

      <PopoverContent
        align="start"
        side="top"
        sideOffset={10}
        collisionPadding={12}
        className={[
          "z-[600] p-0 w-[230px]",
          "rounded-lg border border-[#EBEBEB]",
          "bg-[#FFFFFF] text-[#191F38] shadow-md overflow-hidden",
        ].join(" ")}
        onOpenAutoFocus={(e) => e.preventDefault()}
        onPointerDownOutside={() => {}}
      >
        <Command>
          <CommandInput
            value={query}
            onValueChange={setQuery}
            placeholder="Search time..."
            className="text-xs"
            onKeyDown={(e) => {
              if (e.key === "Escape") {
                e.preventDefault();
                setOpen(false);
                setQuery("");
              }
              if (e.key === "Enter") {
                const m = parseClockToMinutes(query);
                if (m != null) {
                  e.preventDefault();
                  onSelectLabel(formatMinutesToClock(m));
                  setOpen(false);
                  setQuery("");
                }
              }
            }}
          />

          <CommandList className="max-h-[200px] overflow-auto">
            <CommandEmpty>Nothing found</CommandEmpty>
            <CommandGroup>
              {filtered.map((t) => (
                <CommandItem
                  key={t.mins}
                  value={t.label}
                  onSelect={() => {
                    onSelectLabel(t.label);
                    setOpen(false);
                    setQuery("");
                  }}
                  className="text-[11px] font-medium"
                >
                  <div className="w-full flex items-center justify-between">
                    <span>{t.label}</span>
                    {renderRight ? (
                      <span className="text-[#697588]">{renderRight(t)}</span>
                    ) : null}
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
