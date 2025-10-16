"use client";
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import request from "@/utils/request";
import { formatWaktu } from "@/utils/time";
import AddJournalCard from "@/components/journal/cardAddJournal";
import JournalCard from "@/components/journal/cardJournal";
import Navbar from "@/components/navbar/page";
import Breadcrumb from "@/components/breadcrumb/page";
import Modal from "@/components/modal/page";
import { HiOutlineDotsVertical } from "react-icons/hi";
import toast from "react-hot-toast";

const SmartJournaling = () => {
  const router = useRouter();
  const [fetchJournal, setFetchJournal] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [loading, setLoading] = useState(false);

  const onSelectedJournal = (id) => {
    setSelectedId(id);
    setOpenModal(true);
  };

  const onDeleteJournal = async (id = selectedId) => {
    try {
      await request.delete(`/journal/${id}`);
      toast.success("Jurnal berhasil dihapus");

      setFetchJournal((prev) => prev.filter((j) => j.journal_id !== id));
      fetchAllJournal();
    } catch (err) {
      toast.error("Jurnal gagal dihapus");
    } finally {
      setOpenModal(false);
      setSelectedId(null);
    }
  };

  const fetchAllJournal = useCallback(async () => {
    setLoading(true);
    try {
      const response = await request.get("/journal");
      const data = response.data.data.data;
      setFetchJournal(Array.isArray(data) ? data : data ? [data] : []);
    } catch (err) {
      if (err.response && err.response.status == 404) {
        setFetchJournal([]);
      } else {
        toast.error("Gagal mengambil data jurnal");
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAllJournal();
  }, [fetchAllJournal]);

  console.log("fetchJournal:", fetchJournal);

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
          <HiOutlineDotsVertical className="text-neut-950 font-6xl" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 min-h-[280px]">
          <AddJournalCard
            onClick={() => router.push("/smartJournaling/addJournal")}
          />
          {Array.isArray(fetchJournal) && fetchJournal.length > 0 ? (
            fetchJournal.map((journal) => (
              <JournalCard
                key={journal.journal_id}
                title={journal.title}
                description={journal.content}
                date={formatWaktu(journal.updatedAt, "date")}
                selected={selectedId === journal.journal_id}
                onSelect={() => onSelectedJournal(journal.journal_id)}
              />
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500">
              Belum ada jurnal.
            </p>
          )}
        </div>
      </div>
      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onConfirm={() => onDeleteJournal(selectedId)}
        title="Apakah Anda yakin ingin menghapus jurnal ini?"
        description="Jurnal ini akan dihapus secara permanen dan tidak dapat dipulihkan."
      />
    </div>
  );
};

export default SmartJournaling;
