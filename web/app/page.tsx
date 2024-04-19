import DetailCard from "@/components/dashboard/DetailCard";
import NavBar from "@/components/dashboard/Header";
import RecentTab from "@/components/dashboard/RecentTab";


export default function Home() {
  return (
    <main className="bg-gray-200">
      <NavBar/>
      <h2>Welcome</h2>
      <DetailCard/>
      <RecentTab/>
      
    </main>
  );
}
