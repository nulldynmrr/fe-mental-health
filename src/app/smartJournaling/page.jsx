"use client";
import { useRouter } from "next/navigation";
import AddJournalCard from "@/components/journal/cardAddJournal";
import JournalCard from "@/components/journal/cardJournal";
import Navbar from "@/components/navbar/page";
import Breadcrumb from "@/components/breadcrumb/page";
import { HiOutlineDotsVertical } from "react-icons/hi";

const journals = [
  {
    id: 1,
    title: "The Job Harder Than Expected: Lessons Learned the Hard Way",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod...",
    date: "22.09.2025",
  },
  {
    id: 2,
    title: "The job hard...",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod...",
    date: "22.09.2025",
  },
  {
    id: 3,
    title: "The job hard...",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod...",
    date: "22.09.2025",
  },
];

const SmartJournaling = () => {
  const router = useRouter();

  return (
    <div>
      <Navbar />
      <div className="p-6 md:px-20 md:py-12">
        <Breadcrumb
          items={[
            { label: "Dashboard", href: "/dashboard" },
            { label: "Jurnal Pintar" },
          ]}
        />

        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold mb-6">Jurnal Pintar</h1>
          <HiOutlineDotsVertical className="text-neut-900 font-4xl" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 min-h-[280px]">
          <AddJournalCard
            onClick={() => router.push("/smartJournaling/addJournal")}
          />
          {journals.map((journal) => (
            <JournalCard
              key={journal.id}
              title={journal.title}
              description={journal.description}
              date={journal.date}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SmartJournaling;
