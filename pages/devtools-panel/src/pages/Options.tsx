import { useStorageSuspense } from "@humblebrag/shared";
import { userStorage } from "@humblebrag/storage";
import { useTheme } from "@src/components/theme-provider";
import { Avatar, AvatarFallback, AvatarImage } from "@src/components/ui/avatar";
import { Button } from "@src/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@src/components/ui/card";
import { Label } from "@src/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@src/components/ui/select";
import { handleAuth } from "@src/lib/auth";

export const Options: React.FC = () => {
  const user = useStorageSuspense(userStorage);
  const { setTheme, theme } = useTheme();

  return (
    <div className="flex-1 flex flex-col p-4 gap-8">
      <h2 className="text-2xl font-bold">Options</h2>

      <div className="grid gap-2">
        <Card className="p-4 flex flex-col gap-4">
          {user.id ? (
            <>
              <div className="flex items-center gap-4">
                <Avatar>
                  <AvatarFallback>{user.username[0]}</AvatarFallback>
                  <AvatarImage src={user.avatar_url} alt={user.username} />
                </Avatar>

                <div>
                  <p className="text-lg font-semibold">{user.username}</p>
                  <p className="text-muted-foreground">{user.email}</p>
                </div>
              </div>

              {user.subscription.plan === "none" && (
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Free Plan</p>
                    <p className="text-sm text-muted-foreground">
                      Your account is currently on the free plan. Upgrade to a
                      premium plan to unlock more features.
                    </p>
                  </div>
                  <Button variant="outline">Upgrade</Button>
                </div>
              )}
            </>
          ) : (
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">
                Sign in to view user details.
              </p>
              <Button
                onClick={() => {
                  handleAuth();
                }}
                variant="outline"
              >
                Sign in
              </Button>
            </div>
          )}
        </Card>
      </div>

      {user.id && user?.subscription?.plan !== "none" && (
        <div className="grid gap-2">
          <Card>
            <CardHeader>
              <CardTitle>Subscription</CardTitle>
              <CardDescription>
                Manage your subscription details.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="grid gap-2">
                <Label>Current Plan</Label>
                <div className="flex items-center justify-between">
                  <div>{user.subscription.plan}</div>
                  <Button variant="outline" size="sm">
                    Upgrade
                  </Button>
                </div>
              </div>
              <div className="grid gap-2">
                <Label>Billing Cycle</Label>
                <div>Monthly</div>
              </div>
              <div className="grid gap-2">
                <Label>Next Billing Date</Label>
                <div>June 15, 2024</div>
              </div>
              <div className="grid gap-2">
                <Label>Payment Method</Label>
                <div className="flex items-center justify-between">
                  <div>Visa ending in 1234</div>
                  <Button variant="outline" size="sm">
                    Update
                  </Button>
                </div>
              </div>
              <Button variant="secondary" size="sm">
                Cancel Subscription
              </Button>
            </CardContent>
          </Card>
        </div>
      )}

      <div className="grid gap-2">
        <Label htmlFor="page">Page</Label>

        <Card className="p-4 flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <div>
              <p className="text-lg font-semibold">Humblebrag</p>
              <p className="text-muted-foreground">Version 1.0.0 [Dev]</p>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <p className="text-sm font-medium w-full">Theme</p>
            <Select
              onValueChange={(e) => {
                switch (e) {
                  case "dark":
                    setTheme("dark");
                    break;
                  case "light":
                    setTheme("light");
                    break;
                  case "system":
                    setTheme("system");
                    break;
                }
              }}
              defaultValue={theme}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a theme" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="dark">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#333]" />
                    <div>Dark</div>
                  </div>
                </SelectItem>
                <SelectItem value="light">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#f2f2f2]" />
                    <div>Light</div>
                  </div>
                </SelectItem>
                <SelectItem value="system">
                  <div className="flex items-center gap-2">
                    <div>System</div>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </Card>
      </div>
    </div>
  );
};
