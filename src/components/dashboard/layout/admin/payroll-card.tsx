import { CircleDollarSign, Coins, CreditCard } from "lucide-react";
import CardContainer from "../../card-container";
import { SummaryCard } from "../../summary-card";

export default function PayrollCard() {
    return (
        <CardContainer className="col-span-1" title={<>Payroll <span className="text-xs font-light text-muted-foreground">(Monthly)</span></>}>
            <div className="grid grid-cols-2 gap-4 p-4">
                <SummaryCard
                    icon={<CircleDollarSign />}
                    label="Total Payment"
                    value={24}
                    iconClassName="bg-primary-dashboard/10 text-primary-dashboard border-primary-dashboard/60"
                />
                <SummaryCard
                    icon={<CreditCard />}
                    label="Total Paid"
                    value={24}
                    iconClassName="bg-success/10 text-success border-success/60"
                />
                <SummaryCard
                    icon={<Coins />}
                    label="Total Remaining"
                    value={2}
                    iconClassName="bg-destructive/10 text-destructive border-destructive/60"
                />
            </div>
        </CardContainer>

    )
}
