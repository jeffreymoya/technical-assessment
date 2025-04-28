import { StatusUpdate } from "../../api/mock-data";
import { cn, formatTimestamp, statusStyles } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";

interface StatusCardProps {
  update: StatusUpdate;
}

/**
 * Renders a Card component displaying a single status update.
 * Applies dynamic styling based on the status (e.g., success, error).
 *
 * @param {StatusCardProps} props - The component props.
 * @param {StatusUpdate} props.update - The status update object to display.
 * @returns {JSX.Element} The rendered status card component.
 */
export function StatusCard({ update }: StatusCardProps) {
  const styles = statusStyles[update.status] || statusStyles.default;

  return (
    <Card className={cn("flex flex-col h-full border-l-4", styles.border)}>
      <CardHeader className="pb-2">
        <CardTitle className={cn("text-lg capitalize", styles.text)}>
          {update.status}
        </CardTitle>
      </CardHeader>
      <CardContent data-testid="status-card-content" className="flex-grow text-sm">
        {update.message}
      </CardContent>
      <CardFooter className="text-xs text-muted-foreground pt-2 justify-end">
        {formatTimestamp(update.timestamp)}
      </CardFooter>
    </Card>
  );
} 