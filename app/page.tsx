import Header from "./Components/Header";
import Card1 from "./Components/Card1";
import Card2 from "./Components/Card2";

export default function Home() {
  return (
    <div className="flex flex-col gap-6 bg-blue-950">
      <Header/>
      <Card1/>
      <Card2/>


    </div>
  );
}
