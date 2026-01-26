import CardContainer from '../../card-container'
import { FILES, FOLDERS } from '@/data/dashboard-data'
import { Card } from '../../ui/card'
import { cn } from '@/lib/utils'
import { FolderOpen, MoreHorizontal } from 'lucide-react'
import ImageIcon from '../../icons/image-icon'
import DocIcon from '../../icons/doc-icon'
import PDFIcon from '../../icons/pdf-icon'
import { Avatar, AvatarFallback, AvatarGroup, AvatarGroupCount, AvatarImage } from '../../ui/avatar'
import { Badge } from '@/components/sprint-report/ui/badge'
import { Button } from '@/components/ui/Button'

export default function MyStorageCard() {
    return (
        <CardContainer childrenClassName="text-sm" title={<>My Storage <span className="text-xs font-light text-muted-foreground">(Recent Uploaded Files &amp; Folders)</span></>}>
            <span className="text-muted-foreground">Folders</span>
            <div className="flex flex-wrap gap-3 mt-2">
                {/* Folder items */}
                {
                    FOLDERS.map((folder) => (
                        <Card className="flex flex-col items-stretch justify-baseline w-full min-[400px]:w-40" key={folder.id}>
                            <div className="flex flex-row items-start justify-between">
                                <div
                                    className={cn(
                                        "p-3 rounded-xl",
                                        folder.color === "green" && "bg-emerald-100",
                                        folder.color === "blue" && "bg-blue-100"
                                    )}
                                >
                                    <FolderOpen
                                        className={cn(
                                            "w-6 h-6",
                                            folder.color === "green" && "text-emerald-600",
                                            folder.color === "blue" && "text-blue-600"
                                        )}
                                    />
                                </div>

                                <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
                                    <MoreHorizontal className="w-5 h-5" />
                                </Button>

                            </div>

                            {/* Folder Info */}
                            <div>
                                <h3 className="font-semibold text-xs">{folder.name}</h3>
                                <p className="text-[11px] text-muted-foreground mt-1">
                                    {folder.filesCount} Files, {folder.size}
                                </p>
                            </div>
                        </Card>
                    ))
                }
            </div>
            <span className="mt-4 block text-muted-foreground">Files</span>
            <div className="grid grid-cols-1 min-[400px]:grid-cols-2 md:grid-cols-3 gap-3 mt-2">
                {/* File items */}
                {
                    FILES.map((file) => (
                        <Card className="relative flex flex-col items-stretch justify-baseline" key={file.id}>
                            <div className="flex flex-row items-start justify-between">
                                <div className="flex flex-row items-start justify-between">
                                    <div className="rounded-xl bg-secondary-dashboard/50">
                                        {file.type === "image" && <ImageIcon className="w-10 h-10 text-purple-600" />}
                                        {file.type === "doc" && <DocIcon className="w-10 h-10 text-green-600" />}
                                        {file.type === "pdf" && <PDFIcon className="w-10 h-10 text-red-600" />}
                                    </div>

                                    {/* File Info */}
                                    <div className="ml-1.5 space-y-2">
                                        <h3 className="font-semibold text-xs">{file.name}</h3>
                                        <p className="text-[11px] text-muted-foreground mt-1">
                                            {file.uploadedAt}
                                        </p>
                                    </div>
                                </div>

                                <Button variant="ghost" className="p-0 text-muted-foreground hover:bg-transparent">
                                    <MoreHorizontal className="w-5 h-5" />
                                </Button>
                            </div>

                            <span className="border-b border-border"></span>

                            {/* Shared Users */}
                            <div className="flex flex-col sm:flex-row justify-between text-xs mt-2 gap-2 sm:gap-0">
                                <div className="flex flex-col gap-2">
                                    <span className="text-muted-foreground">Shared Users</span>
                                    <div className="flex items-center space-x-1.5">
                                        <AvatarGroup>
                                            {file.sharedUsers.map((user) => (
                                                <Avatar size="sm" key={user.id}>
                                                    <AvatarImage
                                                        src={user.avatar}
                                                        alt={user.name}
                                                    />
                                                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                                                </Avatar>
                                            ))}
                                            <AvatarGroupCount className='text-[11px]'>+80</AvatarGroupCount>
                                        </AvatarGroup>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-2 items-stretch sm:items-end">
                                    <span className="text-muted-foreground">File Size</span>
                                    <Badge className="text-xs bg-primary-dashboard/10 text-primary-dashboard">{file.size}</Badge>
                                </div>
                            </div>
                        </Card>
                    ))
                }
            </div>
        </CardContainer>
    )
}
