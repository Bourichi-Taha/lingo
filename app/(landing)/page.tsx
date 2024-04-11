import { Button } from "@/components/ui/button";

export default function Home() {
  
  return (
    <div className="flex flex-col max-w-[400px] gap-4 p-10">
      <Button>test</Button>
      <Button variant={"primary"}>test</Button>
      <Button variant={"primaryOutline"}>test</Button>
      <Button variant={"secondary"}>test</Button>
      <Button variant={"secondaryOutline"}>test</Button>
      <Button variant={"danger"}>test</Button>
      <Button variant={"dangerOutline"}>test</Button>
      <Button variant={"super"}>test</Button>
      <Button variant={"superOutline"}>test</Button>
      <Button variant={"ghost"}>test</Button>
      <Button variant={"sidebar"}>test</Button>
      <Button variant={"sidebarOutline"}>test</Button>
    </div>
  )
}
