import { AssignPermissionsCard } from "./assign-permissions-card";
import { PermissionList } from "./permission-list";

export default function PermissionsTab() {
    return (
        <div className="space-y-6 p-4 grow flex flex-col">
            <AssignPermissionsCard />
            <PermissionList />
        </div>
    )
}
