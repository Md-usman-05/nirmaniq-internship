import Link from"next/link"
import{Button}from"@/components/ui/button"
export default function HomePage(){
return(<main className="container mx-auto flex min-h-screen flex-col items-center justify-center gap-6"><h1 className="text-4xl font-bold">NirmanIQ</h1><Button render={<Link href="/projects"/>}>View Projects</Button></main>)
}
