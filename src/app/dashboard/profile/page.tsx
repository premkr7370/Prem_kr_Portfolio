"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { UserCircle, Save, Camera, FileText, Lock, CheckCircle } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import { useAuth } from "@/components/auth-provider";

export default function ProfilePage() {
  const { user } = useAuth();
  const [saved, setSaved] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "Prem Kumar",
    email: user?.email || "kumarmehta7370@gmail.com",
    bio: "Full Stack Developer | MERN Stack Developer | Problem Solver",
    github: "https://github.com/premkr7370",
    linkedin: "https://www.linkedin.com/in/prem-kumar-079100244/",
    resume: "https://drive.google.com/file/d/1SbH8FFpKO0bm5HprseumKy2a2cotdDvi/view",
  });

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-dark-text flex items-center gap-2">
          <UserCircle className="text-primary" size={24} /> Profile Settings
        </h1>
        <p className="text-dark-text-secondary text-sm mt-1">Manage your personal information</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Avatar */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="p-6 rounded-2xl bg-dark-card border border-dark-border text-center">
          <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-3xl font-bold mx-auto mb-4">
            {formData.name.charAt(0)}
            <button className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-dark-card border border-dark-border flex items-center justify-center text-dark-text-muted hover:text-primary transition-colors">
              <Camera size={14} />
            </button>
          </div>
          <h3 className="font-semibold text-dark-text">{formData.name}</h3>
          <p className="text-xs text-dark-text-muted">{user?.role}</p>
          <p className="text-xs text-dark-text-secondary mt-1">{formData.email}</p>
        </motion.div>

        {/* Form */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="lg:col-span-2 p-6 rounded-2xl bg-dark-card border border-dark-border">
          <h3 className="text-sm font-semibold text-dark-text mb-6">Personal Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-medium text-dark-text-secondary mb-1.5">Full Name</label>
              <input value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}
                className="w-full px-4 py-2.5 rounded-xl bg-dark-bg border border-dark-border text-dark-text text-sm focus:outline-none focus:border-primary/50 transition-all" />
            </div>
            <div>
              <label className="block text-xs font-medium text-dark-text-secondary mb-1.5">Email</label>
              <input value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})}
                className="w-full px-4 py-2.5 rounded-xl bg-dark-bg border border-dark-border text-dark-text text-sm focus:outline-none focus:border-primary/50 transition-all" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-medium text-dark-text-secondary mb-1.5">Bio</label>
              <textarea value={formData.bio} onChange={e => setFormData({...formData, bio: e.target.value})} rows={3}
                className="w-full px-4 py-2.5 rounded-xl bg-dark-bg border border-dark-border text-dark-text text-sm focus:outline-none focus:border-primary/50 transition-all resize-none" />
            </div>
            <div>
              <label className="block text-xs font-medium text-dark-text-secondary mb-1.5 flex items-center gap-1"><GithubIcon size={12} /> GitHub</label>
              <input value={formData.github} onChange={e => setFormData({...formData, github: e.target.value})}
                className="w-full px-4 py-2.5 rounded-xl bg-dark-bg border border-dark-border text-dark-text text-sm focus:outline-none focus:border-primary/50 transition-all" />
            </div>
            <div>
              <label className="block text-xs font-medium text-dark-text-secondary mb-1.5 flex items-center gap-1"><LinkedinIcon size={12} /> LinkedIn</label>
              <input value={formData.linkedin} onChange={e => setFormData({...formData, linkedin: e.target.value})}
                className="w-full px-4 py-2.5 rounded-xl bg-dark-bg border border-dark-border text-dark-text text-sm focus:outline-none focus:border-primary/50 transition-all" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-medium text-dark-text-secondary mb-1.5 flex items-center gap-1"><FileText size={12} /> Resume URL</label>
              <input value={formData.resume} onChange={e => setFormData({...formData, resume: e.target.value})}
                className="w-full px-4 py-2.5 rounded-xl bg-dark-bg border border-dark-border text-dark-text text-sm focus:outline-none focus:border-primary/50 transition-all" />
            </div>
          </div>
          <div className="flex justify-end mt-6">
            <motion.button onClick={handleSave} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-medium text-sm">
              {saved ? <CheckCircle size={16} /> : <Save size={16} />}
              {saved ? "Saved!" : "Save Changes"}
            </motion.button>
          </div>

          {/* Change Password */}
          <div className="mt-8 pt-6 border-t border-dark-border">
            <h3 className="text-sm font-semibold text-dark-text mb-4 flex items-center gap-2"><Lock size={14} /> Change Password</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-medium text-dark-text-secondary mb-1.5">Current Password</label>
                <input type="password" placeholder="••••••••"
                  className="w-full px-4 py-2.5 rounded-xl bg-dark-bg border border-dark-border text-dark-text text-sm focus:outline-none focus:border-primary/50 transition-all" />
              </div>
              <div>
                <label className="block text-xs font-medium text-dark-text-secondary mb-1.5">New Password</label>
                <input type="password" placeholder="••••••••"
                  className="w-full px-4 py-2.5 rounded-xl bg-dark-bg border border-dark-border text-dark-text text-sm focus:outline-none focus:border-primary/50 transition-all" />
              </div>
            </div>
            <div className="flex justify-end mt-4">
              <button className="px-5 py-2.5 rounded-xl bg-dark-bg border border-dark-border text-dark-text-secondary font-medium text-sm hover:border-primary/30 transition-all">
                Update Password
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
