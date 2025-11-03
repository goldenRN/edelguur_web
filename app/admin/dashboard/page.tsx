'use client';
import DashboardCard from '@/components/dashboard/DashboardCard';
import AnalyticsChart from '@/components/dashboard/AnalyticsChart';
import { FolderArchive, MessageCircle, Newspaper, DollarSignIcon, FolderMinus } from 'lucide-react';
import { useEffect, useState } from 'react';
import PieChartAnalytics from '@/components/dashboard/PieChartAnalytics';



interface SourceNewsCount {
  sc_status: number;
  news_count: number;
}

export default function DashboardLayout() {
  const [postsCount, setPostsCount] = useState<number | null>(null);
  const [catCount, setCatCount] = useState<number | null>(null);
  const [sourceCount, setSourceCount] = useState<number | null>(null);
  const [branchCount, setBranchCount] = useState<number | null>(null);
  const [wpCount, setWpCount] = useState<number | null>(null);
  const [svCount, setSvCount] = useState<number | null>(null);
  const [stats, setStats] = useState<{ status: string; count: number }[]>([]);

  useEffect(() => {
    const fetchCounts = async () => {
      const fetchStats = async () => {
        const res = await fetch('https://shdmonitoring.ub.gov.mn/api/posts/source-news-count');
        const data = await res.json();

        const statusMap: { [key: number]: string } = {
          1: 'Улсын',
          2: 'Нийслэлийн',
          3: 'Дүүргийн'
        };

        const formatted = (data as SourceNewsCount[]).map((item) => ({
          status: statusMap[item.sc_status] || 'Тодорхойгүй',
          count: item.news_count
        }));

        setStats(formatted);
      };

      await fetchStats();
      const postRes = await fetch('https://shdmonitoring.ub.gov.mn/api/posts/count');
      const postJson = await postRes.json();

      const catRes = await fetch('http://localhost:4000/api/category/count');
      const catJson = await catRes.json();

      const sourceRes = await fetch('https://shdmonitoring.ub.gov.mn/api/source/count');
      const sourceJson = await sourceRes.json();

      const branchRes = await fetch('https://shdmonitoring.ub.gov.mn/api/branch/count');
      const branchJson = await branchRes.json();

      const wpRes = await fetch('https://shdmonitoring.ub.gov.mn/api/workprogress/count');
      const wpJson = await wpRes.json();

      const svRes = await fetch('https://shdmonitoring.ub.gov.mn/api/supervisor/count');
      const svJson = await svRes.json();

      setPostsCount(postJson.totalPosts);
      setCatCount(catJson.totalCat);
      setSourceCount(sourceJson.totalsource);
      setBranchCount(branchJson.totalbranch);
      setSvCount(svJson.totals);
      setWpCount(wpJson.totalwp);
    };
    fetchCounts();
  }, [])
  const getCountByStatus = (statusName: string) => {
    return stats.find((item) => item.status === statusName)?.count ?? 0;
  };

  return (
    <>

      Удирдлагын хэсэг
      {/* <AnalyticsChart /> */}
      {/* <PieChartAnalytics /> */}
      <div className='flex flex-col md:flex-row gap-5 mb-5'>
        <div className="w-1/3 h-100 bg-orange-200 rounded"><DashboardCard
          title='НИЙТ БАРАА'
          count={156}
          icon={<FolderMinus className='text-slate-/800' size={30} />}
        /></div>
        <div className="w-1/3 h-100 bg-red-200  rounded"><DashboardCard
          title=' АНГИЛАЛ '
          count={catCount ?? 0}
          icon={<FolderMinus className='text-slate-800' size={30} />}
        /></div>
        <div className="w-1/3 h-100 bg-green-200 rounded"><DashboardCard
          title='CАЛБАР БҮРТГЭЛ'
          count={branchCount ?? 0}
          icon={<FolderMinus className='text-slate-800' size={0} />}
        /></div>
      </div>

      {/* <PostsTable title='Сүүлд нэмэгдсэн' limit={5} /> */}
    </>
  );
}


