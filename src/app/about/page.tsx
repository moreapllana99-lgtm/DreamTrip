import { motion } from "framer-motion";
import Card from "@/components/ui/Card";

const team = [
  { name: "Alex Rivera", role: "CEO & Founder", avatar: "https://i.pravatar.cc/150?img=68", bio: "Former travel industry executive with a passion for AI." },
  { name: "Maya Chen", role: "CTO", avatar: "https://i.pravatar.cc/150?img=45", bio: "AI researcher turned travel tech builder." },
  { name: "James Okonkwo", role: "Head of Design", avatar: "https://i.pravatar.cc/150?img=33", bio: "Designing beautiful travel experiences." },
  { name: "Priya Sharma", role: "Head of Product", avatar: "https://i.pravatar.cc/150?img=23", bio: "Making travel planning accessible to everyone." },
];

export default function AboutPage() {
  return (
    <div className="min-h-[calc(100vh-4rem)]">
      <div className="bg-gradient-to-b from-blue-50 to-white dark:from-blue-950/20 dark:to-gray-950 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">About DreamTrip</h1>
          <p className="text-xl text-gray-500 dark:text-gray-400">We believe travel planning should be exciting, not stressful.</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Mission */}
        <Card className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">🌍 Our Mission</h2>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            At DreamTrip, we&apos;re on a mission to make travel planning effortless and enjoyable for everyone. 
            By combining artificial intelligence with human creativity, we create personalized travel experiences 
            that help you discover the world in ways you never imagined. We believe that the best trips are the 
            ones that feel personal — and our AI makes that possible at scale.
          </p>
        </Card>

        {/* Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {[
            { icon: "🤖", title: "AI-First", desc: "Leveraging cutting-edge AI to create truly personalized experiences." },
            { icon: "🌱", title: "Sustainable Travel", desc: "Promoting eco-friendly travel options and responsible tourism." },
            { icon: "🤝", title: "Community-Driven", desc: "Built by travelers, for travelers. Your feedback shapes our product." },
          ].map((v) => (
            <Card key={v.title} className="text-center">
              <span className="text-4xl block mb-4">{v.icon}</span>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{v.title}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">{v.desc}</p>
            </Card>
          ))}
        </div>

        {/* Team */}
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">Meet Our Team</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((member) => (
            <Card key={member.name} className="text-center">
              <img src={member.avatar} alt={member.name} className="w-20 h-20 rounded-full mx-auto mb-4 ring-4 ring-blue-100 dark:ring-blue-900" />
              <h3 className="font-semibold text-gray-900 dark:text-white">{member.name}</h3>
              <p className="text-xs text-blue-600 dark:text-blue-400 font-medium mb-2">{member.role}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">{member.bio}</p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
