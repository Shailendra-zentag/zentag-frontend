import { useState } from "react";
import { Button } from "@/components/ui/button";
import Sidebar from "../layouts/dashboard/Sidebar";
import DashboardHeader from "../layouts/dashboard/DashboardHeader";
import StatsCard from "../layouts/dashboard/StatsCard";
import VideoCard from "../layouts/dashboard/VideoCard";
import { mockVideoData } from "../mocks/dashboard_mockData/mockVideos";
import { dashboardStats } from "../constants/DashboardPage";
import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import AddVideoFeedModal from "../containers/add-video/AddNewVideoModal";
import { useNavigate } from "react-router-dom";
import { SearchableSelect } from "@/components/ui/searchable-select";
import { limitOptions } from "@/constants/Filter";

const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [limitPerPage, setLimitPerPage] = useState("20");
  const navigate = useNavigate();

  return (
    <div className="flex h-screen bg-[#18191B] text-white">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <DashboardHeader
          title="Dashboard"
          onAddVideoFeed={() => setIsModalOpen(true)}
        />
        <AddVideoFeedModal open={isModalOpen} onOpenChange={setIsModalOpen} />

        {/* Main Content Area */}
        <main className="flex-1 overflow-auto p-6 scroll-smooth">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
            {dashboardStats.map((stat, index) => (
              <StatsCard
                key={index}
                label={stat.label}
                value={stat.value}
                iconType={stat.iconType}
                color={stat.color}
              />
            ))}
          </div>

          {/* Recent Videos Section */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Recent videos</h2>
              <div className="flex items-center gap-3">
                {/* Pagination */}
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-10 h-10 border border-[#252525] rounded-lg hover:bg-[#252525]"
                  >
                    <ChevronLeft className="w-4 h-4 text-white" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-10 h-10 bg-[#252525] border border-white rounded-lg"
                  >
                    <span className="text-white text-sm">1</span>
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-10 h-10 bg-[#252525] rounded-lg hover:bg-[#3A3B3E]"
                  >
                    <span className="text-white text-sm">...</span>
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-10 h-10 bg-[#252525] rounded-lg hover:bg-[#3A3B3E]"
                  >
                    <span className="text-white text-sm">135</span>
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-10 h-10 border border-[#252525] rounded-lg hover:bg-[#252525]"
                  >
                    <ChevronRight className="w-4 h-4 text-white" />
                  </Button>
                </div>
                {/* Limit Dropdown */}
                <SearchableSelect
                  value={limitPerPage}
                  onValueChange={setLimitPerPage}
                  options={limitOptions}
                  className="bg-[#252525] text-white w-20 h-11"
                />
              </div>
            </div>

            {/* Video Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
              {mockVideoData.map((video) => (
                <VideoCard
                  key={video.id}
                  video={video}
                  onClick={() => navigate("/clips")} />
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
