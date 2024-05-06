import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card"
// import { Progress } from "@/registry/default/ui/progress"

export default function Component() {
  return (
    <div className="grid grid-cols-2">
      <div>
    <Card className="ml-24">
      <CardHeader className="pb-2">
        <CardDescription>This Week</CardDescription>
        <CardTitle className="text-4xl">$1,329</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-xs text-muted-foreground">+25% from last week</div>
      </CardContent>
      <CardFooter>
        {/* <Progress value={25} aria-label="25% increase" /> */}
      </CardFooter>
    </Card>
    </div>

    <div>
      <Card className="ml-6 mr-6">
      <CardHeader className="pb-2">
        <CardDescription>This Week</CardDescription>
        <CardTitle className="text-4xl">$1,329</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-xs text-muted-foreground">+25% from last week</div>
      </CardContent>
      <CardFooter>
        {/* <Progress value={25} aria-label="25% increase" /> */}
      </CardFooter>
    </Card>

    </div>
    </div>
  )
}
