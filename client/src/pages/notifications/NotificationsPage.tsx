import PageHeader from "@/components/common/PageHeader";
import EmptyState from "@/components/common/EmptyState";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  useMarkNotificationRead,
  useNotifications,
} from "@/features/notifications/queries";

function getNotificationMessage(payload: unknown): string {
  if (!payload) return "";
  if (typeof payload === "string") return payload;

  if (typeof payload === "object") {
    const record = payload as Record<string, unknown>;
    const candidates = [
      record.message,
      record.title,
      record.subject,
      record.reason,
      record.description,
    ];
    const firstString = candidates.find((c) => typeof c === "string") as
      | string
      | undefined;
    if (firstString) return firstString;

    try {
      const json = JSON.stringify(payload);
      return json.length > 120 ? `${json.slice(0, 120)}…` : json;
    } catch {
      return "";
    }
  }

  return "";
}

export default function NotificationsPage() {
  const { data: notifications, isLoading } = useNotifications();
  const { mutate: markRead, isPending } = useMarkNotificationRead();

  return (
    <div className="container mx-auto p-6 space-y-6">
      <PageHeader title="Notifications" subtitle="Updates and alerts" />

      <Card>
        <CardContent className="p-4">
          {isLoading ? (
            <div className="flex justify-center py-10">
              <Spinner />
            </div>
          ) : !notifications || notifications.length === 0 ? (
            <EmptyState
              title="No notifications"
              description="You're all caught up."
              variant="card"
              align="start"
            />
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Status</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Message</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {notifications.map((n) => {
                    const unread = !n.readAt;
                    const message = getNotificationMessage(n.payload);
                    return (
                      <TableRow key={n.id}>
                        <TableCell>
                          {unread ? (
                            <Badge variant="default">Unread</Badge>
                          ) : (
                            <Badge variant="secondary">Read</Badge>
                          )}
                        </TableCell>
                        <TableCell className="font-medium">{n.type}</TableCell>
                        <TableCell className="max-w-[420px] truncate">
                          {message || (
                            <span className="text-muted-foreground">—</span>
                          )}
                        </TableCell>
                        <TableCell>
                          {new Date(n.createdAt).toLocaleString()}
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            size="sm"
                            variant="outline"
                            disabled={!unread || isPending}
                            onClick={() => markRead(n.id)}
                          >
                            Mark read
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
